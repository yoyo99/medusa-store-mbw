import { HttpTypes } from "@medusajs/types"
import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
const DEFAULT_REGION =
  (process.env.NEXT_PUBLIC_DEFAULT_REGION || "us").toLowerCase()

const regionMapCache: {
  regionMap: Map<string, HttpTypes.StoreRegion>
  regionMapUpdated: number
} = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: Date.now(),
}

async function getRegionMap(cacheId: string) {
  const { regionMap, regionMapUpdated } = regionMapCache

  if (!BACKEND_URL) {
    throw new Error(
      "Middleware.ts: Error fetching regions. Did you set up regions in your Medusa Admin and define a MEDUSA_BACKEND_URL environment variable? Note that the variable is no longer named NEXT_PUBLIC_MEDUSA_BACKEND_URL."
    )
  }

  // Si le cache est vide ou a plus d'1h, on refetch
  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - 3600 * 1000
  ) {
    const { regions } = await fetch(`${BACKEND_URL}/store/regions`, {
      headers: {
        "x-publishable-api-key": PUBLISHABLE_API_KEY!,
      },
      // Ces options sont celles du template Medusa Next, on les garde
      next: {
        revalidate: 3600,
        tags: [`regions-${cacheId}`],
      },
      cache: "force-cache",
    }).then(async (response) => {
      const json = await response.json()

      if (!response.ok) {
        throw new Error(json.message)
      }

      return json
    })

    if (!regions?.length) {
      throw new Error(
        "No regions found. Please set up regions in your Medusa Admin."
      )
    }

    // On reconstruit complètement la map
    regionMap.clear()
    regions.forEach((region: HttpTypes.StoreRegion) => {
      region.countries?.forEach((c) => {
        const code = (c.iso_2 || "").toLowerCase()
        if (code) {
          regionMap.set(code, region)
        }
      })
    })

    regionMapCache.regionMapUpdated = Date.now()
  }

  return regionMapCache.regionMap
}

/**
 * Détermine le code pays à utiliser.
 */
async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, HttpTypes.StoreRegion>
) {
  try {
    const vercelCountryCode =
      request.headers.get("x-vercel-ip-country")?.toLowerCase() || null

    const urlCountryCode =
      request.nextUrl.pathname.split("/")[1]?.toLowerCase() || null

    // 1. Si l'URL a déjà un code pays connu → on le garde
    if (urlCountryCode && regionMap.has(urlCountryCode)) {
      return urlCountryCode
    }

    // 2. Sinon on essaie avec le header Vercel (si présent et connu)
    if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
      return vercelCountryCode
    }

    // 3. Sinon on essaie la région par défaut (fr, chez toi)
    if (DEFAULT_REGION && regionMap.has(DEFAULT_REGION)) {
      return DEFAULT_REGION
    }

    // 4. Dernier fallback : le premier code de la map
    const firstKey = regionMap.keys().next().value as string | undefined
    if (firstKey) {
      return firstKey.toLowerCase()
    }

    return undefined
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "Middleware.ts: Error getting the country code. Did you set up regions in your Medusa Admin and define a MEDUSA_BACKEND_URL environment variable? Note that the variable is no longer named NEXT_PUBLIC_MEDUSA_BACKEND_URL."
      )
    }
    return undefined
  }
}

/**
 * Middleware pour gérer la sélection de région.
 */
export async function middleware(request: NextRequest) {
  // 0️⃣ On ignore les assets statiques
  if (request.nextUrl.pathname.includes(".")) {
    return NextResponse.next()
  }

  let cacheIdCookie = request.cookies.get("_medusa_cache_id")
  let cacheId = cacheIdCookie?.value || crypto.randomUUID()

  const regionMap = await getRegionMap(cacheId)
  const countryCode = await getCountryCode(request, regionMap)

  const pathSegments = request.nextUrl.pathname.split("/").filter(Boolean)
  const firstSegment = pathSegments[0]?.toLowerCase()

  const urlHasCountryCode =
    !!countryCode && !!firstSegment && firstSegment === countryCode

  // ✅ 1. Si l’URL contient déjà le code pays → PAS de redirection
  if (urlHasCountryCode) {
    const res = NextResponse.next()

    // On pose le cookie si absent
    if (!cacheIdCookie) {
      res.cookies.set("_medusa_cache_id", cacheId, {
        maxAge: 60 * 60 * 24,
      })
    }

    return res
  }

  // ✅ 2. Si l’URL ne contient pas le code pays mais qu’on en a un → on redirige UNE fois
  if (countryCode) {
    const redirectPath =
      request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname

    const queryString = request.nextUrl.search || ""

    const redirectUrl = `${request.nextUrl.origin}/${countryCode}${redirectPath}${queryString}`

    const res = NextResponse.redirect(redirectUrl, 307)

    res.cookies.set("_medusa_cache_id", cacheId, {
      maxAge: 60 * 60 * 24,
    })

    return res
  }

  // ❌ 3. Aucun code pays valide → erreur claire
  return new NextResponse(
    "No valid regions configured. Please set up regions with countries in your Medusa Admin.",
    { status: 500 }
  )
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}

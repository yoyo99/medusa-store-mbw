"use client"

import { LOCALE_COOKIE, Locale } from "@lib/i18n/shared"
import { useRouter } from "next/navigation"
import { useMemo, useTransition } from "react"

type Props = {
  locale: Locale
}

export default function LanguageSwitch({ locale }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const nextLocale = useMemo<Locale>(() => (locale === "fr" ? "en" : "fr"), [locale])

  const onClick = () => {
    const maxAge = 60 * 60 * 24 * 365
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; Path=/; Max-Age=${maxAge}; SameSite=Lax`

    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      className="text-small-regular hover:text-mbwood-green-700 transition-colors"
      aria-label={locale === "fr" ? "Switch language to English" : "Passer la langue en français"}
    >
      {locale === "fr" ? "EN" : "FR"}
    </button>
  )
}

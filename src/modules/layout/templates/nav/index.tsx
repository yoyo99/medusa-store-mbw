import { Suspense } from "react"

import { getLocale, t } from "@lib/i18n"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import LanguageSwitch from "@modules/layout/components/language-switch"
import Image from "next/image"

export default async function Nav() {
  const locale = await getLocale()
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu
                regions={regions}
                labels={{
                  menu: t(locale, "nav.menu"),
                  home: t(locale, "side.home"),
                  store: t(locale, "side.store"),
                  account: t(locale, "side.account"),
                  cart: t(locale, "side.cart"),
                  shippingTo: t(locale, "shipping.to"),
                  rights: t(locale, "footer.rights"),
                }}
              />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
            >
              <Image
                src="/mbwood-logo.jpg"
                alt="MBWood Logo"
                width={150}
                height={40}
                className="object-contain h-12 w-auto"
                priority
              />
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-mbwood-green-700"
                href="/account"
                data-testid="nav-account-link"
              >
                {t(locale, "nav.account")}
              </LocalizedClientLink>
            </div>
            <div className="hidden small:flex items-center h-full">
              <LanguageSwitch locale={locale} />
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-mbwood-green-700 flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  {t(locale, "nav.cart")} (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}

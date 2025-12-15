import { getBaseURL } from "@lib/util/env"
import { getLocale } from "@lib/i18n"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function RootLayout(props: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  return (
    <html lang={locale} data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}

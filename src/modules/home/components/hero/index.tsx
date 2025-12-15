import { Button, Heading } from "@medusajs/ui"

import { getLocale, t } from "@lib/i18n"

const Hero = async () => {
  const locale = await getLocale()

  return (
    <section className="relative w-full border-b border-ui-border-base overflow-hidden min-h-[calc(100vh-4rem)] flex items-stretch">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/70" />
      </div>

      <div className="relative content-container py-20 small:py-28 flex items-center w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-white/90 backdrop-blur-sm border border-white/15">
            <span className="text-small-regular">{t(locale, "hero.kicker.wood")}</span>
            <span className="mx-2 text-white/40">•</span>
            <span className="text-small-regular">{t(locale, "hero.kicker.garden")}</span>
          </div>

          <Heading
            level="h1"
            className="mt-5 text-4xl small:text-5xl md:text-6xl leading-tight text-white font-bold tracking-tight"
          >
            {t(locale, "hero.title.before")} {" "}
            <span className="text-mbwood-green-400">{t(locale, "hero.title.highlight")}</span>
          </Heading>

          <Heading
            level="h2"
            className="mt-4 text-large-regular md:text-xl text-white/85 max-w-2xl"
          >
            {t(locale, "hero.subtitle")}
          </Heading>

          <div className="mt-8 flex flex-col small:flex-row gap-3">
            <a href="/store">
              <Button
                variant="secondary"
                className="bg-mbwood-green-600 hover:bg-mbwood-green-700 text-white border-none px-7 py-3 h-auto rounded-full font-medium shadow-lg shadow-black/20"
              >
                {t(locale, "hero.cta.primary")}
              </Button>
            </a>

            <a href="/store">
              <Button
                variant="transparent"
                className="text-white border border-white/25 hover:border-white/45 hover:bg-white/10 px-7 py-3 h-auto rounded-full font-medium"
              >
                {t(locale, "hero.cta.secondary")}
              </Button>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <a
              href="/store"
              className="inline-flex items-center rounded-full bg-white/10 hover:bg-white/15 text-white/90 px-4 py-2 border border-white/15 backdrop-blur-sm text-small-regular"
            >
              {t(locale, "hero.tag.pellets")}
            </a>
            <a
              href="/store"
              className="inline-flex items-center rounded-full bg-white/10 hover:bg-white/15 text-white/90 px-4 py-2 border border-white/15 backdrop-blur-sm text-small-regular"
            >
              {t(locale, "hero.tag.logs")}
            </a>
            <a
              href="/store"
              className="inline-flex items-center rounded-full bg-white/10 hover:bg-white/15 text-white/90 px-4 py-2 border border-white/15 backdrop-blur-sm text-small-regular"
            >
              {t(locale, "hero.tag.kindling")}
            </a>
            <a
              href="/store"
              className="inline-flex items-center rounded-full bg-white/10 hover:bg-white/15 text-white/90 px-4 py-2 border border-white/15 backdrop-blur-sm text-small-regular"
            >
              {t(locale, "hero.tag.garden")}
            </a>
            <a
              href="/store"
              className="inline-flex items-center rounded-full bg-white/10 hover:bg-white/15 text-white/90 px-4 py-2 border border-white/15 backdrop-blur-sm text-small-regular"
            >
              {t(locale, "hero.tag.deals")}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

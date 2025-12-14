import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <section className="relative w-full border-b border-ui-border-base overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/70" />
      </div>

      <div className="relative content-container py-20 small:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-white/90 backdrop-blur-sm border border-white/15">
            <span className="text-small-regular">Bois de chauffage</span>
            <span className="mx-2 text-white/40">•</span>
            <span className="text-small-regular">Jardinerie</span>
          </div>

          <Heading
            level="h1"
            className="mt-5 text-4xl small:text-5xl md:text-6xl leading-tight text-white font-bold tracking-tight"
          >
            Transformez votre jardin en <span className="text-mbwood-green-400">paradis vert</span>
          </Heading>

          <Heading
            level="h2"
            className="mt-4 text-large-regular md:text-xl text-white/85 max-w-2xl"
          >
            Votre expert en chauffage au bois & énergie durable. Livraison rapide en Île-de-France.
          </Heading>

          <div className="mt-8 flex flex-col small:flex-row gap-3">
            <a href="/store">
              <Button
                variant="secondary"
                className="bg-mbwood-green-600 hover:bg-mbwood-green-700 text-white border-none px-7 py-3 h-auto rounded-full font-medium shadow-lg shadow-black/20"
              >
                Acheter des produits
              </Button>
            </a>

            <a href="/store">
              <Button
                variant="transparent"
                className="text-white border border-white/25 hover:border-white/45 hover:bg-white/10 px-7 py-3 h-auto rounded-full font-medium"
              >
                Voir toutes les catégories
              </Button>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <a
              href="/store"
              className="inline-flex items-center rounded-full bg-white/10 hover:bg-white/15 text-white/90 px-4 py-2 border border-white/15 backdrop-blur-sm text-small-regular"
            >
              Pellets
            </a>
            <a
              href="/store"
              className="inline-flex items-center rounded-full bg-white/10 hover:bg-white/15 text-white/90 px-4 py-2 border border-white/15 backdrop-blur-sm text-small-regular"
            >
              Bûches
            </a>
            <a
              href="/store"
              className="inline-flex items-center rounded-full bg-white/10 hover:bg-white/15 text-white/90 px-4 py-2 border border-white/15 backdrop-blur-sm text-small-regular"
            >
              Bois d'allumage
            </a>
            <a
              href="/store"
              className="inline-flex items-center rounded-full bg-white/10 hover:bg-white/15 text-white/90 px-4 py-2 border border-white/15 backdrop-blur-sm text-small-regular"
            >
              Jardinerie
            </a>
            <a
              href="/store"
              className="inline-flex items-center rounded-full bg-white/10 hover:bg-white/15 text-white/90 px-4 py-2 border border-white/15 backdrop-blur-sm text-small-regular"
            >
              Promotions
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

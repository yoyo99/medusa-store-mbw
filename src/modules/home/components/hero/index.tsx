import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className="h-[85vh] w-full border-b border-ui-border-base relative bg-stone-900 overflow-hidden">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder for high-quality wood/garden image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-24d4c16419d0?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-8 px-4">
        <span className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <Heading
            level="h1"
            className="text-5xl md:text-7xl leading-tight text-white font-bold tracking-tight drop-shadow-lg"
          >
            L'Excellence du Bois <br />
            <span className="text-green-500">Pour Votre Extérieur</span>
          </Heading>
          
          <Heading
            level="h2"
            className="text-xl md:text-2xl leading-8 text-stone-200 font-light max-w-2xl mx-auto mt-4 drop-shadow-md"
          >
            Déstockage exclusif de bois de qualité supérieure. Terrasses, bardages et aménagements durables à prix direct dépôt.
          </Heading>
        </span>

        <div className="flex gap-4 mt-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          <a href="/store">
            <Button
              variant="secondary"
              className="bg-green-600 hover:bg-green-700 text-white border-none px-8 py-3 h-auto text-lg rounded-full font-medium transition-all shadow-lg shadow-green-900/20 hover:scale-105"
            >
              Voir les Offres
            </Button>
          </a>
          <a href="/about">
             <Button
              variant="transparent"
              className="text-white hover:text-green-400 border border-white/20 hover:border-green-400/50 hover:bg-white/5 px-8 py-3 h-auto text-lg rounded-full font-medium transition-all backdrop-blur-sm"
            >
              Notre Concept
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero

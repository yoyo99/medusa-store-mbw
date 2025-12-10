import { Github } from "@medusajs/icons";
import { Button, Heading } from "@medusajs/ui";

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-gradient-to-b from-stone-100 to-stone-200">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-5xl leading-tight text-green-900 font-bold mb-4"
          >
            Bienvenue chez MBWood
          </Heading>
          <Heading
            level="h2"
            className="text-2xl leading-10 text-stone-600 font-normal"
          >
            Votre expert en bois et aménagement extérieur
          </Heading>
        </span>
        <a href="/store">
          <Button
            variant="primary"
            className="bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg"
          >
            Découvrir nos produits
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Hero;

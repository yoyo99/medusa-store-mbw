import "server-only"

import { cookies } from "next/headers"

import { LOCALE_COOKIE, Locale } from "./i18n/shared"

type Dictionary = Record<string, string>

const dictionaries: Record<Locale, Dictionary> = {
  fr: {
    "nav.menu": "Menu",
    "nav.account": "Compte",
    "nav.cart": "Panier",

    "side.home": "Accueil",
    "side.store": "Boutique",
    "side.account": "Compte",
    "side.cart": "Panier",

    "shipping.to": "Livraison vers :",

    "hero.kicker.wood": "Bois de chauffage",
    "hero.kicker.garden": "Jardinerie",
    "hero.title.before": "Transformez votre jardin en",
    "hero.title.highlight": "paradis vert",
    "hero.subtitle":
      "Votre expert en chauffage au bois & énergie durable. Livraison rapide en Île-de-France.",
    "hero.cta.primary": "Acheter des produits",
    "hero.cta.secondary": "Voir toutes les catégories",
    "hero.tag.pellets": "Pellets",
    "hero.tag.logs": "Bûches",
    "hero.tag.kindling": "Bois d'allumage",
    "hero.tag.garden": "Jardinerie",
    "hero.tag.deals": "Promotions",

    "footer.categories": "Catégories",
    "footer.collections": "Collections",
    "footer.informations": "Informations",
    "footer.store": "Boutique",
    "footer.account": "Compte",
    "footer.cart": "Panier",
    "footer.rights": "Tous droits réservés.",
  },
  en: {
    "nav.menu": "Menu",
    "nav.account": "Account",
    "nav.cart": "Cart",

    "side.home": "Home",
    "side.store": "Store",
    "side.account": "Account",
    "side.cart": "Cart",

    "shipping.to": "Shipping to:",

    "hero.kicker.wood": "Firewood",
    "hero.kicker.garden": "Garden",
    "hero.title.before": "Turn your garden into a",
    "hero.title.highlight": "green paradise",
    "hero.subtitle":
      "Your expert in wood heating & sustainable energy. Fast delivery in Île-de-France.",
    "hero.cta.primary": "Shop products",
    "hero.cta.secondary": "Browse categories",
    "hero.tag.pellets": "Pellets",
    "hero.tag.logs": "Logs",
    "hero.tag.kindling": "Kindling",
    "hero.tag.garden": "Garden",
    "hero.tag.deals": "Deals",

    "footer.categories": "Categories",
    "footer.collections": "Collections",
    "footer.informations": "Information",
    "footer.store": "Store",
    "footer.account": "Account",
    "footer.cart": "Cart",
    "footer.rights": "All rights reserved.",
  },
}

export const getLocale = async (): Promise<Locale> => {
  try {
    const jar = await cookies()
    const value = jar.get(LOCALE_COOKIE)?.value
    if (value === "en" || value === "fr") {
      return value
    }
    return "fr"
  } catch {
    return "fr"
  }
}

export const t = (locale: Locale, key: string): string => {
  return dictionaries[locale][key] ?? dictionaries.fr[key] ?? key
}

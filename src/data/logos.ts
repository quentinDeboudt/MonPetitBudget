import type { Logo } from "@/interfaces/Logo.ts";

export const logos = [

  //Alimentation:
  { name: "Alimentation", path: "/logo_bank/epingle.png", props: { disabled: true}},
  
  { name: "Grande surface", path: "/logo_bank/supermarches.png", category: "alimentation" },
  { name: "Petit Commercant", path: "/logo_bank/epiceries.png", category: "alimentation"},
  { name: "Snack / Repas au travail", path: "/logo_bank/snack.png", category: "alimentation" },
  { name: "Marché", path: "/logo_bank/marche.png", category: "alimentation" },

  //vie quotidienne:
  { name: "vie quotidienne", path: "/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Coiffeur", path: "/logo_bank/coiffeur.png", category: "vie-quotidienne" },
  { name: "Soin du corp", path: "/logo_bank/soin-du-corp.png", category: "vie-quotidienne" },

  //shopping:
  { name: "Shopping", path: "/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Vêtements", path: "/logo_bank/shopping-en-ligne.png", category: "Shopping" },

  //Transport:
  { name: "Transport", path: "/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Taxi", path: "/logo_bank/taxi.png", category: "Transport" },
  { name: "transport en commain", path: "/logo_bank/bus-scolaire.png", category: "Transport" },


  //Enfant & scolarité:
  { name: "Enfant & Scolarité", path: "/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Activités extra-scolaires", path: "/logo_bank/activites-extra-scolaires.png", category: "Enfant-Scolarité" },
  { name: "Argent de poche", path: "/logo_bank/poche.png", category: "Enfant-Scolarité" },
  { name: "frais de scolarité", path: "/logo_bank/frais-de-scolarite.png", category: "Enfant-Scolarité" },
  { name: "Cantine", path: "/logo_bank/plateau-repas.png", category: "Enfant-Scolarité" },
  { name: "Garde", path: "/logo_bank/nursery.png", category: "Enfant-Scolarité" },
  { name: "Habillement", path: "/logo_bank/vetements-enfant.png", category: "Enfant-Scolarité" },
  { name: "Logement étudiant", path: "/logo_bank/etudiant.png", category: "Enfant-Scolarité" },
  { name: "Prêt étudiant", path: "/logo_bank/pret-etudiant.png", category: "Enfant-Scolarité" },

  //santé:
  { name: "Santé", path: "/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Mutuelle", path: "/logo_bank/mutuelle.png", category: "Santé" },
  { name: "Médecin", path: "/logo_bank/equipe-medicale.png", category: "Santé" },
  { name: "Pharmacie", path: "/logo_bank/pharmacie.png", category: "Santé" },
  { name: "Dentiste", path: "/logo_bank/dentiste.png", category: "Santé" },
  { name: "Opticien", path: "/logo_bank/opticien.png", category: "Santé" },
  { name: "Hôpital", path: "/logo_bank/batiment-de-lhopital.png", category: "Santé" },

  //Logement / Maison:
  { name: "Logement / Maison", path: "/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Loyer", path: "/logo_bank/loyer-de-la-maison.png", category: "Logement-Maison" },
  { name: "Charges", path: "/logo_bank/charges.png", category: "Logement-Maison" },
  { name: "Assurance habitation", path: "/logo_bank/assurance-habitation.png", category: "Logement-Maison" },
  { name: "Travaux", path: "/logo_bank/charpentier.png", category: "Logement-Maison" },
  { name: "Mobilier", path: "/logo_bank/Mobilier.png", category: "Logement-Maison" },
  { name: "Électroménager", path: "/logo_bank/electromenager.png", category: "Logement-Maison" },
  { name: "Décoration", path: "/logo_bank/decoration-de-la-maison.png", category: "Logement-Maison" },
  { name: "Jardinage", path: "/logo_bank/jardinage.png", category: "Logement-Maison" },

  //vehicule:
  { name: "Vehicule", path: "/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Assurance auto", path: "/logo_bank/assurance-voiture.png", category: "Vehicule" },
  { name: "Carburant", path: "/logo_bank/station-essence.png", category: "Vehicule" },
  { name: "Entretien", path: "/logo_bank/mecanicien.png", category: "Vehicule" },
  { name: "Réparation", path: "/logo_bank/accident-de-voiture.png", category: "Vehicule" },
  { name: "Parking", path: "/logo_bank/parking.png", category: "Vehicule" },
  { name: "Péage", path: "/logo_bank/peage.png", category: "Vehicule" },
  { name: "Amende", path: "/logo_bank/amende.png", category: "Vehicule" },
  { name: "Achat / crédit / Location", path: "/logo_bank/achat-auto.png", category: "Vehicule" },
  { name: "Crédit auto", path: "/logo_bank/credit-auto.png", category: "Vehicule" },


  //numérique:
  { name: "Numérique", path: "/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Achats high tech", path: "/logo_bank/high-tech.png", category: "Numérique" },
  { name: "Téléphone", path: "/logo_bank/telephone.png", category: "Numérique" },
  { name: "Internet", path: "/logo_bank/internet.png", category: "Numérique" },
  { name: "Télévision", path: "/logo_bank/television.png", category: "Numérique" },
  { name: "Informatique", path: "/logo_bank/informatique.png", category: "Numérique" },
  { name: "Jeux vidéo", path: "/logo_bank/Jeux-vidéo.png", category: "Numérique" },

  //loisire:
  { name: "Loisire", path: "/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Restaurant", path: "/logo_bank/restaurant.png", category: "Loisire" },
  { name: "Bar", path: "/logo_bank/bar.png", category: "Loisire" },
  { name: "Café", path: "/logo_bank/cafe.png", category: "Loisire" },
  { name: "Sortie", path: "/logo_bank/sortie.png", category: "Loisire" },
  { name: "Vacances", path: "/logo_bank/vacances.png", category: "Loisire" },
  { name: "Sports", path: "/logo_bank/sports.png", category: "Loisire" },
  { name: "Cinéma", path: "/logo_bank/cinema.png", category: "Loisire" },
  { name: "Théâtre", path: "/logo_bank/theatre.png", category: "Loisire" },
  { name: "Concert", path: "/logo_bank/concert.png", category: "Loisire" },
  { name: "Livre", path: "/logo_bank/livre.png", category: "Loisire" },
  { name: "Musée", path: "/logo_bank/musee.png", category: "Loisire" },
  { name: "Zoo", path: "/logo_bank/zoo.png", category: "Loisire" },
  { name: "Parc d'attraction", path: "/logo_bank/parc-dattractions.png", category: "Loisire" },

  //vacances:
  { name: "Vacances", path: "/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Hébergement", path: "/logo_bank/hotel.png", category: "Vacances" },
  { name: "Transport", path: "/logo_bank/transport.png", category: "Vacances" },
  { name: "Restauration", path: "/logo_bank/restauration.png", category: "Vacances" },
  { name: "Activité", path: "/logo_bank/Activite-vacances.png", category: "Vacances" },

  //annimeaux:
  { name: "Annimeaux", path: "/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Nourriture", path: "/logo_bank/alimentation-annimeaux.png", category: "Annimeaux" },
  { name: "Vétérinaire", path: "/logo_bank/Veterinaire.png", category: "Annimeaux" },
  { name: "Toilettage", path: "/logo_bank/toilettage-danimaux.png", category: "Annimeaux" },

  // Abonnements numériques :
  { name: "Abonnement numériques", path: "/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Netflix", path: "/logo_bank/netflix.png", category: "Abonnement" },
  { name: "Spotify", path: "/logo_bank/spotify.png", category: "Abonnement" },
  { name: "Disney+", path: "/logo_bank/disney.png", category: "Abonnement" },
  { name: "Amazon Prime", path: "/logo_bank/amazon.png", category: "Abonnement" },
  { name: "YouTube Premium", path: "/logo_bank/youtube.png", category: "Abonnement" },
  { name: "Icloud", path: "/logo_bank/Icloud.png", category: "Abonnement" },
  { name: "Apple Music", path: "/logo_bank/apple-music.png", category: "Abonnement" },
  { name: "HBO Max", path: "/logo_bank/hbo.png", category: "Abonnement" },
  { name: "Apple TV+", path: "/logo_bank/apple-tv.png", category: "Abonnement" },
  { name: "Xbox Game Pass", path: "/logo_bank/xbox.png", category: "Abonnement" },
  { name: "PlayStation Now", path: "/logo_bank/playStation.png", category: "Abonnement" },
  { name: "Nintendo Switch Online", path: "/logo_bank/nintendo.png", category: "Abonnement" },
  { name: "Steam", path: "/logo_bank/steam.png", category: "Abonnement" },


  //impot /taxes:
  { name: "Impots / Taxes", path: "/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Impôt sur le revenu", path: "/logo_bank/les-impots.png", category: "Impots-Taxes" },
  { name: "Taxe foncière", path: "/logo_bank/les-impots.png", category: "Impots-Taxes" },
  { name: "Taxe d'habitation", path: "/logo_bank/les-impots.png", category: "Impots-Taxes" },
  { name: "Taxe d'ordure ménagère", path: "/logo_bank/des-ordures.png", category: "Impots-Taxes" },

  //autre depense:
  { name: "Autre depense", path: "/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Cadeau", path: "/logo_bank/cadeau.png", category: "Autre" },
  { name: "dons caritatifs", path: "/logo_bank/don-caritatif.png", category: "Autre"  },
  { name: "Mariage", path: "/logo_bank/mariage.png", category: "Autre"  },
  { name: "Naissance", path: "/logo_bank/naissance.png", category: "Autre"  },
  { name: "Fête", path: "/logo_bank/fete.png", category: "Autre"  },

  //epargne:
  { name: "epargne", path: "/logo_bank/epingle.png", props: { disabled: true}},
  
  { name: "Epargne", path: "/logo_bank/epargne.png", category: "epargne"  },
];

export function getLogoByName(name: string):Logo {
  if (!name) {
    return DEFAULT_LOGO;
  } else{
    return logos.find((logo) => logo.name === name) || DEFAULT_LOGO;
  }
}


export const DEFAULT_LOGO = {
  name: "",
  path: "/logo_bank/point-dinterrogation.png",
  category: "Autre",
  props: { disabled: false },
};

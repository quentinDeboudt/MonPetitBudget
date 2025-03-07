import type { Logo } from "@/interfaces/Logo.ts";

export const logos = [

  //Alimentation:
  { name: "Alimentation", path: "/src/assets/logo_bank/epingle.png", props: { disabled: true}},
  
  { name: "Grande surface", path: "/src/assets/logo_bank/supermarches.png", category: "alimentation" },
  { name: "Petit Commercant", path: "/src/assets/logo_bank/epiceries.png", category: "alimentation"},
  { name: "Snack / Repas au travail", path: "/src/assets/logo_bank/snack.png", category: "alimentation" },
  { name: "Marché", path: "/src/assets/logo_bank/marche.png", category: "alimentation" },

  //vie quotidienne:
  { name: "vie quotidienne", path: "/src/assets/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Coiffeur", path: "/src/assets/logo_bank/coiffeur.png", category: "vie-quotidienne" },
  { name: "Soin du corp", path: "/src/assets/logo_bank/soin-du-corp.png", category: "vie-quotidienne" },

  //shopping:
  { name: "Shopping", path: "/src/assets/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Vêtements", path: "/src/assets/logo_bank/shopping-en-ligne.png", category: "Shopping" },

  //Transport:
  { name: "Transport", path: "/src/assets/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Taxi", path: "/src/assets/logo_bank/taxi.png", category: "Transport" },
  { name: "transport en commain", path: "/src/assets/logo_bank/bus-scolaire.png", category: "Transport" },


  //Enfant & scolarité:
  { name: "Enfant & Scolarité", path: "/src/assets/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Activités extra-scolaires", path: "/src/assets/logo_bank/activites-extra-scolaires.png", category: "Enfant-Scolarité" },
  { name: "Argent de poche", path: "/src/assets/logo_bank/poche.png", category: "Enfant-Scolarité" },
  { name: "frais de scolarité", path: "/src/assets/logo_bank/frais-de-scolarite.png", category: "Enfant-Scolarité" },
  { name: "Cantine", path: "/src/assets/logo_bank/plateau-repas.png", category: "Enfant-Scolarité" },
  { name: "Garde", path: "/src/assets/logo_bank/nursery.png", category: "Enfant-Scolarité" },
  { name: "Habillement", path: "/src/assets/logo_bank/vetements-enfant.png", category: "Enfant-Scolarité" },
  { name: "Logement étudiant", path: "/src/assets/logo_bank/etudiant.png", category: "Enfant-Scolarité" },
  { name: "Prêt étudiant", path: "/src/assets/logo_bank/pret-etudiant.png", category: "Enfant-Scolarité" },

  //santé:
  { name: "Santé", path: "/src/assets/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Mutuelle", path: "/src/assets/logo_bank/mutuelle.png", category: "Santé" },
  { name: "Médecin", path: "/src/assets/logo_bank/equipe-medicale.png", category: "Santé" },
  { name: "Pharmacie", path: "/src/assets/logo_bank/pharmacie.png", category: "Santé" },
  { name: "Dentiste", path: "/src/assets/logo_bank/dentiste.png", category: "Santé" },
  { name: "Opticien", path: "/src/assets/logo_bank/opticien.png", category: "Santé" },
  { name: "Hôpital", path: "/src/assets/logo_bank/batiment-de-lhopital.png", category: "Santé" },

  //Logement / Maison:
  { name: "Logement / Maison", path: "/src/assets/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Loyer", path: "/src/assets/logo_bank/loyer-de-la-maison.png", category: "Logement-Maison" },
  { name: "Charges", path: "/src/assets/logo_bank/charges.png", category: "Logement-Maison" },
  { name: "Assurance habitation", path: "/src/assets/logo_bank/assurance-habitation.png", category: "Logement-Maison" },
  { name: "Travaux", path: "/src/assets/logo_bank/charpentier.png", category: "Logement-Maison" },
  { name: "Mobilier", path: "/src/assets/logo_bank/Mobilier.png", category: "Logement-Maison" },
  { name: "Électroménager", path: "/src/assets/logo_bank/electromenager.png", category: "Logement-Maison" },
  { name: "Décoration", path: "/src/assets/logo_bank/decoration-de-la-maison.png", category: "Logement-Maison" },
  { name: "Jardinage", path: "/src/assets/logo_bank/jardinage.png", category: "Logement-Maison" },

  //vehicule:
  { name: "Vehicule", path: "/src/assets/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Assurance auto", path: "/src/assets/logo_bank/assurance-voiture.png", category: "Vehicule" },
  { name: "Carburant", path: "/src/assets/logo_bank/station-essence.png", category: "Vehicule" },
  { name: "Entretien", path: "/src/assets/logo_bank/mecanicien.png", category: "Vehicule" },
  { name: "Réparation", path: "/src/assets/logo_bank/accident-de-voiture.png", category: "Vehicule" },
  { name: "Parking", path: "/src/assets/logo_bank/parking.png", category: "Vehicule" },
  { name: "Péage", path: "/src/assets/logo_bank/peage.png", category: "Vehicule" },
  { name: "Amende", path: "/src/assets/logo_bank/amende.png", category: "Vehicule" },
  { name: "Achat / crédit / Location", path: "/src/assets/logo_bank/achat-auto.png", category: "Vehicule" },
  { name: "Crédit auto", path: "/src/assets/logo_bank/credit-auto.png", category: "Vehicule" },


  //numérique:
  { name: "Numérique", path: "/src/assets/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Achats high tech", path: "/src/assets/logo_bank/high-tech.png", category: "Numérique" },
  { name: "Téléphone", path: "/src/assets/logo_bank/telephone.png", category: "Numérique" },
  { name: "Internet", path: "/src/assets/logo_bank/internet.png", category: "Numérique" },
  { name: "Télévision", path: "/src/assets/logo_bank/television.png", category: "Numérique" },
  { name: "Informatique", path: "/src/assets/logo_bank/informatique.png", category: "Numérique" },
  { name: "Jeux vidéo", path: "/src/assets/logo_bank/Jeux-vidéo.png", category: "Numérique" },

  //loisire:
  { name: "Loisire", path: "/src/assets/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Restaurant", path: "/src/assets/logo_bank/restaurant.png", category: "Loisire" },
  { name: "Bar", path: "/src/assets/logo_bank/bar.png", category: "Loisire" },
  { name: "Café", path: "/src/assets/logo_bank/cafe.png", category: "Loisire" },
  { name: "Sortie", path: "/src/assets/logo_bank/sortie.png", category: "Loisire" },
  { name: "Vacances", path: "/src/assets/logo_bank/vacances.png", category: "Loisire" },
  { name: "Sports", path: "/src/assets/logo_bank/sports.png", category: "Loisire" },
  { name: "Cinéma", path: "/src/assets/logo_bank/cinema.png", category: "Loisire" },
  { name: "Théâtre", path: "/src/assets/logo_bank/theatre.png", category: "Loisire" },
  { name: "Concert", path: "/src/assets/logo_bank/concert.png", category: "Loisire" },
  { name: "Livre", path: "/src/assets/logo_bank/livre.png", category: "Loisire" },
  { name: "Musée", path: "/src/assets/logo_bank/musee.png", category: "Loisire" },
  { name: "Zoo", path: "/src/assets/logo_bank/zoo.png", category: "Loisire" },
  { name: "Parc d'attraction", path: "/src/assets/logo_bank/parc-dattractions.png", category: "Loisire" },

  //vacances:
  { name: "Vacances", path: "/src/assets/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Hébergement", path: "/src/assets/logo_bank/hotel.png", category: "Vacances" },
  { name: "Transport", path: "/src/assets/logo_bank/transport.png", category: "Vacances" },
  { name: "Restauration", path: "/src/assets/logo_bank/restauration.png", category: "Vacances" },
  { name: "Activité", path: "/src/assets/logo_bank/Activite-vacances.png", category: "Vacances" },

  //annimeaux:
  { name: "Annimeaux", path: "/src/assets/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Nourriture", path: "/src/assets/logo_bank/alimentation-annimeaux.png", category: "Annimeaux" },
  { name: "Vétérinaire", path: "/src/assets/logo_bank/Veterinaire.png", category: "Annimeaux" },
  { name: "Toilettage", path: "/src/assets/logo_bank/toilettage-danimaux.png", category: "Annimeaux" },

  // Abonnements numériques :
  { name: "Abonnement numériques", path: "/src/assets/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Netflix", path: "/src/assets/logo_bank/netflix.png", category: "Abonnement" },
  { name: "Spotify", path: "/src/assets/logo_bank/spotify.png", category: "Abonnement" },
  { name: "Disney+", path: "/src/assets/logo_bank/disney.png", category: "Abonnement" },
  { name: "Amazon Prime", path: "/src/assets/logo_bank/amazon.png", category: "Abonnement" },
  { name: "YouTube Premium", path: "/src/assets/logo_bank/youtube.png", category: "Abonnement" },
  { name: "Icloud", path: "/src/assets/logo_bank/Icloud.png", category: "Abonnement" },
  { name: "Apple Music", path: "/src/assets/logo_bank/apple-music.png", category: "Abonnement" },
  { name: "HBO Max", path: "/src/assets/logo_bank/hbo.png", category: "Abonnement" },
  { name: "Apple TV+", path: "/src/assets/logo_bank/apple-tv.png", category: "Abonnement" },
  { name: "Xbox Game Pass", path: "/src/assets/logo_bank/xbox.png", category: "Abonnement" },
  { name: "PlayStation Now", path: "/src/assets/logo_bank/playStation.png", category: "Abonnement" },
  { name: "Nintendo Switch Online", path: "/src/assets/logo_bank/nintendo.png", category: "Abonnement" },
  { name: "Steam", path: "/src/assets/logo_bank/steam.png", category: "Abonnement" },


  //impot /taxes:
  { name: "Impots / Taxes", path: "/src/assets/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Impôt sur le revenu", path: "/src/assets/logo_bank/les-impots.png", category: "Impots-Taxes" },
  { name: "Taxe foncière", path: "/src/assets/logo_bank/les-impots.png", category: "Impots-Taxes" },
  { name: "Taxe d'habitation", path: "/src/assets/logo_bank/les-impots.png", category: "Impots-Taxes" },
  { name: "Taxe d'ordure ménagère", path: "/src/assets/logo_bank/des-ordures.png", category: "Impots-Taxes" },

  //autre depense:
  { name: "Autre depense", path: "/src/assets/logo_bank/epingle.png", props: { disabled: true}},

  { name: "Cadeau", path: "/src/assets/logo_bank/cadeau.png", category: "Autre" },
  { name: "dons caritatifs", path: "/src/assets/logo_bank/don-caritatif.png", category: "Autre"  },
  { name: "Mariage", path: "/src/assets/logo_bank/mariage.png", category: "Autre"  },
  { name: "Naissance", path: "/src/assets/logo_bank/naissance.png", category: "Autre"  },
  { name: "Fête", path: "/src/assets/logo_bank/fete.png", category: "Autre"  },

  //epargne:
  { name: "epargne", path: "/src/assets/logo_bank/epingle.png", props: { disabled: true}},
  
  { name: "Epargne", path: "/src/assets/logo_bank/epargne.png", category: "epargne"  },

  //default:
  { name: "à définir", path: "/src/assets/logo_bank/point-dinterrogation.png"  },
];

export function getLogoByName(name: string):Logo {
  if (!name) {
    return DEFAULT_LOGO;
  } else{
    return logos.find((logo) => logo.name === name) || DEFAULT_LOGO;
  }
}


export const DEFAULT_LOGO = {
  name: "à définir",
  path: "/src/assets/logo_bank/point-dinterrogation.png",
  category: "Autre",
  props: { disabled: false },
};

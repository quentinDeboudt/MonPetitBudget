
export const category = [
  { name: "Alimentation", logo:'Grande surface', label: 'alimentation', averageSpending:{min: 0, max: 0}},
  { name: "vie quotidienn", logo:'Soin du corp', label: 'vie-quotidienne', averageSpending:{min: 0, max: 0}},
  { name: "Shopping", logo:'Vêtements', label: 'Shopping', averageSpending:{min: 5, max: 10}},
  { name: "Transport", logo:'Taxi', label: 'Transport', averageSpending:{min: 10, max: 15}},
  { name: "Enfant & Scolarité", logo:'Habillement', label: 'Enfant-Scolarité', averageSpending:{min: 0, max: 0}},
  { name: "Santé", logo:'', label: 'Pharmacie', averageSpending:{min: 0, max: 0}},
  { name: "Logement / Maison", logo:'Loyer', label: 'Logement-Maison', averageSpending:{min: 0, max: 0}},
  { name: "Vehicule", logo:'Entretien', label: 'Vehicule', averageSpending:{min: 0, max: 0}},
  { name: "Numérique", logo:'Achats high tech', label: 'Numérique', averageSpending:{min: 0, max: 0}},
  { name: "Loisire", logo:'Restaurant', label: 'Loisire', averageSpending:{min: 10, max: 15}},
  { name: "Vacances", logo:'Transport', label: 'Vacances', averageSpending:{min: 0, max: 0}},
  { name: "Annimeaux", logo:'Vétérinaire', label: 'Annimeaux', averageSpending:{min: 0, max: 0}},
  { name: "Abonnement numériques", logo:'Netflix', label: 'Abonnement', averageSpending:{min: 5, max: 10}},
  { name: "Impots / Taxes", logo:'Impôt sur le revenu', label: 'Impots-Taxes', averageSpending:{min: 0, max: 0}},
  { name: "Autre depense", logo:'Cadeau', label: 'Autre', averageSpending:{min: 0, max: 0}},
  { name: "epargne", logo:'Epargne', label: 'epargne', averageSpending:{min: 15, max: 20}},
];

export function getAllCategories() {
  return category;
}

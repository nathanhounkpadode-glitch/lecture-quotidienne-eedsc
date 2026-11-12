export interface PrayerRequest {
  id: string;
  author: string;
  location: string;
  title: string;
  content: string;
  category: "Délivrance" | "Famille" | "Santé" | "Études & Travail" | "Action de grâce";
  prayerCount: number;
  timeAgo: string;
}

export const INITIAL_PRAYERS: PrayerRequest[] = [
  {
    id: "p-1",
    author: "Frère Samuel",
    location: "Vêdoko, Cotonou",
    title: "Délivrance et percée dans mes démarches d'emploi",
    content: "Je demande le soutien de l'église en prière pour un entretien décisif ce jeudi et pour briser tout esprit de blocage et de stagnation.",
    category: "Études & Travail",
    prayerCount: 38,
    timeAgo: "Il y a 2h",
  },
  {
    id: "p-2",
    author: "Sœur Grâce",
    location: "Abomey-Calavi",
    title: "Action de grâce pour la guérison de ma mère",
    content: "Le Seigneur a fait de grandes choses ! Après une semaine d'hospitalisation et de prière, les médecins ont confirmé sa guérison totale. Gloire à Jésus !",
    category: "Action de grâce",
    prayerCount: 64,
    timeAgo: "Il y a 4h",
  },
  {
    id: "p-3",
    author: "Anonyme",
    location: "Cotonou",
    title: "Restauration et paix dans mon foyer",
    content: "Prions ensemble pour que l'amour, la réconciliation et la paix de Dieu règnent dans mon couple face aux incompréhensions.",
    category: "Famille",
    prayerCount: 52,
    timeAgo: "Il y a 6h",
  },
];

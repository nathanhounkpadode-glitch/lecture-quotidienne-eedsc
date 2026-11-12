export type ReadingMode = "linear" | "balanced";

export interface ReadingPlan {
  id: string;
  title: string;
  durationMonths: number;
  description: string;
  chaptersPerDay: string;
  recommendedFor: string;
  badge: string;
  color: string;
}

export const READING_PLANS: ReadingPlan[] = [
  {
    id: "plan-3-mois",
    title: "Immersion Réveil (3 Mois)",
    durationMonths: 3,
    description: "Une traversée intensive de toute la Bible en 90 jours pour un réveil spirituel profond.",
    chaptersPerDay: "~13 chapitres / jour",
    recommendedFor: "Vacances, jeûnes, retraite spirituelle",
    badge: "Intensif 🔥",
    color: "from-amber-500 to-red-600",
  },
  {
    id: "plan-6-mois",
    title: "Rythme Soutenu (6 Mois)",
    durationMonths: 6,
    description: "Finir toute la Bible en un semestre à un rythme stimulant et régulier.",
    chaptersPerDay: "~6 à 7 chapitres / jour",
    recommendedFor: "Jeunes et chrétiens engagés",
    badge: "Dynamique ⚡",
    color: "from-blue-600 to-indigo-700",
  },
  {
    id: "plan-9-mois",
    title: "Parcours Équilibré (9 Mois)",
    durationMonths: 9,
    description: "Un rythme idéal pour concilier vie active, études et approfondissement de la Parole.",
    chaptersPerDay: "~4 à 5 chapitres / jour",
    recommendedFor: "Étudiants et professionnels",
    badge: "Populaire 🌟",
    color: "from-emerald-600 to-teal-700",
  },
  {
    id: "plan-12-mois",
    title: "La Bible en 1 An (365 Jours)",
    durationMonths: 12,
    description: "Le plan classique de référence pour parcourir toute la Bible à raison de 3 chapitres par jour.",
    chaptersPerDay: "~3 chapitres / jour",
    recommendedFor: "Toute la famille et nouveaux fidèles",
    badge: "Classique 📖",
    color: "from-amber-600 to-yellow-600",
  },
];

export interface PassageItem {
  reference: string;
  book: string;
  chapter: number;
  category: "Ancien Testament" | "Psaumes & Sagesse" | "Nouveau Testament";
  completed: boolean;
  inProgress?: boolean;
}

export interface DayPortions {
  dayNumber: number;
  dateStr: string;
  theme: string;
  verseOfDay: {
    reference: string;
    text: string;
  };
  prayerTopic: string;
  // Mode 1: Linéaire (Genèse à Apocalypse)
  linearPassages: PassageItem[];
  // Mode 2: Équilibré (Ancien Testament + Psaume + Nouveau Testament)
  balancedPassages: PassageItem[];
}

// DYNAMIC DAILY CALCULATION ENGINE
export function getDayOfYear(date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.max(1, Math.min(365, Math.floor(diff / oneDay)));
}

export function formatDateFrench(date = new Date()): string {
  const f = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const parts = f.format(date);
  return "Aujourd'hui • " + parts.charAt(0).toUpperCase() + parts.slice(1);
}

// 66 books canon specification
const BIBLE_ORDER: [string, number, 'Ancien Testament' | 'Psaumes & Sagesse' | 'Nouveau Testament'][] = [
  ['Genèse', 50, 'Ancien Testament'], ['Exode', 40, 'Ancien Testament'], ['Lévitique', 27, 'Ancien Testament'],
  ['Nombres', 36, 'Ancien Testament'], ['Deutéronome', 34, 'Ancien Testament'],
  ['Josué', 24, 'Ancien Testament'], ['Juges', 21, 'Ancien Testament'], ['Ruth', 4, 'Ancien Testament'],
  ['1 Samuel', 31, 'Ancien Testament'], ['2 Samuel', 24, 'Ancien Testament'], ['1 Rois', 22, 'Ancien Testament'],
  ['2 Rois', 25, 'Ancien Testament'], ['1 Chroniques', 29, 'Ancien Testament'], ['2 Chroniques', 36, 'Ancien Testament'],
  ['Esdras', 10, 'Ancien Testament'], ['Néhémie', 13, 'Ancien Testament'], ['Esther', 10, 'Ancien Testament'],
  ['Job', 42, 'Psaumes & Sagesse'], ['Psaumes', 150, 'Psaumes & Sagesse'], ['Proverbes', 31, 'Psaumes & Sagesse'],
  ['Ecclésiaste', 12, 'Psaumes & Sagesse'], ['Cantique des Cantiques', 8, 'Psaumes & Sagesse'],
  ['Ésaïe', 66, 'Ancien Testament'], ['Jérémie', 52, 'Ancien Testament'], ['Lamentations', 5, 'Ancien Testament'],
  ['Ézéchiel', 48, 'Ancien Testament'], ['Daniel', 12, 'Ancien Testament'], ['Osée', 14, 'Ancien Testament'],
  ['Joël', 3, 'Ancien Testament'], ['Amos', 9, 'Ancien Testament'], ['Abdias', 1, 'Ancien Testament'],
  ['Jonas', 4, 'Ancien Testament'], ['Michée', 7, 'Ancien Testament'], ['Nahum', 3, 'Ancien Testament'],
  ['Habacuc', 3, 'Ancien Testament'], ['Sophonie', 3, 'Ancien Testament'], ['Aggée', 2, 'Ancien Testament'],
  ['Zacharie', 14, 'Ancien Testament'], ['Malachie', 4, 'Ancien Testament'],
  ['Matthieu', 28, 'Nouveau Testament'], ['Marc', 16, 'Nouveau Testament'], ['Luc', 24, 'Nouveau Testament'],
  ['Jean', 21, 'Nouveau Testament'], ['Actes', 28, 'Nouveau Testament'], ['Romains', 16, 'Nouveau Testament'],
  ['1 Corinthiens', 16, 'Nouveau Testament'], ['2 Corinthiens', 13, 'Nouveau Testament'], ['Galates', 6, 'Nouveau Testament'],
  ['Éphésiens', 6, 'Nouveau Testament'], ['Philippiens', 4, 'Nouveau Testament'], ['Colossiens', 4, 'Nouveau Testament'],
  ['1 Thessaloniciens', 5, 'Nouveau Testament'], ['2 Thessaloniciens', 3, 'Nouveau Testament'],
  ['1 Timothée', 6, 'Nouveau Testament'], ['2 Timothée', 4, 'Nouveau Testament'], ['Tite', 3, 'Nouveau Testament'],
  ['Philémon', 1, 'Nouveau Testament'], ['Hébreux', 13, 'Nouveau Testament'], ['Jacques', 5, 'Nouveau Testament'],
  ['1 Pierre', 5, 'Nouveau Testament'], ['2 Pierre', 3, 'Nouveau Testament'], ['1 Jean', 5, 'Nouveau Testament'],
  ['2 Jean', 1, 'Nouveau Testament'], ['3 Jean', 1, 'Nouveau Testament'], ['Jude', 1, 'Nouveau Testament'],
  ['Apocalypse', 22, 'Nouveau Testament']
];

const ALL_LINEAR_CHAPTERS: PassageItem[] = [];
const OT_CHAPTERS: PassageItem[] = [];
const WISDOM_CHAPTERS: PassageItem[] = [];
const NT_CHAPTERS: PassageItem[] = [];

for (const [name, count, cat] of BIBLE_ORDER) {
  for (let ch = 1; ch <= count; ch++) {
    const item: PassageItem = {
      reference: name + " " + ch,
      book: name,
      chapter: ch,
      category: cat,
      completed: false
    };
    ALL_LINEAR_CHAPTERS.push(item);
    if (cat === 'Ancien Testament') OT_CHAPTERS.push(item);
    else if (cat === 'Psaumes & Sagesse') WISDOM_CHAPTERS.push(item);
    else NT_CHAPTERS.push(item);
  }
}

// 30 Inspiriting Daily Verses and Themes rotation
const DAILY_THEMES_ROSTER = [
  {
    "ref": "Jean 8:36",
    "text": "Si donc le Fils vous affranchit, vous serez réellement libres.",
    "theme": "La Libération & La Victoire en Christ",
    "prayer": "Seigneur, établis ma liberté spirituelle dans ta vérité aujourd'hui."
  },
  {
    "ref": "Jérémie 29:11",
    "text": "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur.",
    "theme": "L'Espérance & L'Avenir Assuré",
    "prayer": "Père, j'aligne mes pensées sur tes plans de paix et de grâce."
  },
  {
    "ref": "Psaume 23:1",
    "text": "L'Éternel est mon berger: je ne manquerai de rien.",
    "theme": "La Provision & La Conduite Divine",
    "prayer": "Jésus, bon Berger, conduis mes pas vers tes sources d'eau vive."
  },
  {
    "ref": "Ésaïe 40:31",
    "text": "Ceux qui se confient en l'Éternel renouvellent leur force. Ils prennent le vol comme les aigles.",
    "theme": "Le Renouvellement Spirituel",
    "prayer": "Seigneur, renouvelle mes forces spirituelles, morales et physiques."
  },
  {
    "ref": "Philippiens 4:13",
    "text": "Je puis tout par celui qui me fortifie.",
    "theme": "L'Accomplissement par la Foi",
    "prayer": "Par ta force, je triomphe de chaque défi sur mon chemin."
  },
  {
    "ref": "Proverbes 3:5-6",
    "text": "Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse.",
    "theme": "La Sagesse & La Confiance",
    "prayer": "Garde mon cœur de l'orgueil et dirige mes décisions dans ta sainteté."
  },
  {
    "ref": "Romains 8:28",
    "text": "Toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.",
    "theme": "La Souveraineté de Dieu",
    "prayer": "Je reconnais que toute épreuve se transforme en bénédiction pour ma vie."
  },
  {
    "ref": "Josué 1:9",
    "text": "Ne t'ai-je pas donné cet ordre: Fortifie-toi et prends courage? Ne t'effraie point et ne t'épouvante point.",
    "theme": "Le Courage & L'Audace Surnaturelle",
    "prayer": "Bannis toute peur de mon esprit et accorde-moi l'audace du Saint-Esprit."
  },
  {
    "ref": "Psaume 91:1-2",
    "text": "Celui qui demeure sous l'abri du Très-Haut repose à l'ombre du Tout-Puissant.",
    "theme": "La Protection Absolue",
    "prayer": "Je m'abrite sous le sang de Jésus et sous l'ombre de tes ailes."
  },
  {
    "ref": "Ésaïe 41:10",
    "text": "Ne crains rien, car je suis avec toi; Ne promène pas des regards inquiets, car je suis ton Dieu.",
    "theme": "La Présence Rassurante",
    "prayer": "Merci pour ta présence constante qui dissipe toute angoisse."
  },
  {
    "ref": "Matthieu 6:33",
    "text": "Cherchez premièrement le royaume et la justice de Dieu; et toutes ces choses vous seront données par-dessus.",
    "theme": "Les Priorités Célestes",
    "prayer": "Que ton Royaume soit la priorité suprême de toutes mes actions."
  },
  {
    "ref": "Psaume 27:1",
    "text": "L'Éternel est ma lumière et mon salut: De qui aurais-je crainte?",
    "theme": "La Lumière dans les Ténèbres",
    "prayer": "Dissipe toute ombre sur ma route et illumine mes yeux de ta grâce."
  },
  {
    "ref": "Jean 14:6",
    "text": "Jésus lui dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.",
    "theme": "Le Salut Unique en Jésus",
    "prayer": "Seigneur Jésus, garde mes pas fermement ancrés dans ta sainte Voie."
  },
  {
    "ref": "Romains 12:2",
    "text": "Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l'intelligence.",
    "theme": "La Transformation de Pensée",
    "prayer": "Transforme mes désirs et purifie mes pensées par ta Parole sainte."
  },
  {
    "ref": "Galates 2:20",
    "text": "J'ai été crucifié avec Christ; et si je vis, ce n'est plus moi qui vis, c'est Christ qui vit en moi.",
    "theme": "La Vie Crucifiée et Glorifiée",
    "prayer": "Que Christ se manifeste puissamment à travers chaque acte de ma journée."
  },
  {
    "ref": "Éphésiens 6:10",
    "text": "Au reste, fortifiez-vous dans le Seigneur, et par sa force toute-puissante.",
    "theme": "L'Armure Spirituelle",
    "prayer": "Revêts-moi de ton armure de lumière pour tenir ferme dans le combat."
  },
  {
    "ref": "Psaume 119:105",
    "text": "Ta parole est une lampe à mes pieds, Et une lumière sur mon sentier.",
    "theme": "La Guidance par l'Écriture",
    "prayer": "Que chaque verset lu éclaire et sécurise mes décisions aujourd'hui."
  },
  {
    "ref": "2 Timothée 1:7",
    "text": "Car ce n'est pas un esprit de timidité que Dieu nous a donné, mais un esprit de force, d'amour et de sagesse.",
    "theme": "La Puissance de l'Esprit",
    "prayer": "Remplis-moi de force, d'amour charitable et d'un esprit de discernement."
  },
  {
    "ref": "1 Jean 4:18",
    "text": "La crainte n'est pas dans l'amour, mais l'amour parfait bannit la crainte.",
    "theme": "L'Amour Parfait",
    "prayer": "Inonde mon âme de ton amour divin qui chasse tout doute et toute peur."
  },
  {
    "ref": "Psaume 46:1",
    "text": "Dieu est pour nous un refuge et un appui, Un secours qui ne manque jamais dans la détresse.",
    "theme": "Le Secours Présent",
    "prayer": "Dans chaque défi de ce jour, je m'appuie sur ton inébranlable fidélité."
  },
  {
    "ref": "Jean 3:16",
    "text": "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point.",
    "theme": "La Grâce Incommensurable",
    "prayer": "Merci pour le sacrifice de la croix et le don de la vie éternelle."
  },
  {
    "ref": "Colossiens 3:2",
    "text": "Affectionnez-vous aux choses d'en haut, et non à celles qui sont sur la terre.",
    "theme": "L'Élévation Spirituelle",
    "prayer": "Élève mes regards au-dessus des réalités passagères vers l'éternité."
  },
  {
    "ref": "1 Pierre 5:7",
    "text": "Et déchargez-vous sur lui de tous vos soucis, car lui-même prend soin de vous.",
    "theme": "Le Repos du Cœur",
    "prayer": "Je dépose à tes pieds chaque fardeau de mon travail et de ma vie."
  },
  {
    "ref": "Psaume 103:2-3",
    "text": "Mon âme, bénis l'Éternel, Et n'oublie aucun de ses bienfaits! C'est lui qui pardonne toutes tes iniquités.",
    "theme": "La Reconnaissance & La Guérison",
    "prayer": "Mon cœur déborde de louange pour tes merveilles et tes guérisons."
  },
  {
    "ref": "Ésaïe 54:17",
    "text": "Toute arme forgée contre toi sera sans effet; Et toute langue qui s'élèvera en justice contre toi, tu la condamneras.",
    "theme": "L'Immunité Spirituelle",
    "prayer": "Nulle machination de l'ennemi ne prévaudra contre ma destinée en Christ."
  },
  {
    "ref": "Matthieu 11:28",
    "text": "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.",
    "theme": "Le Rafraîchissement Céleste",
    "prayer": "Jésus, accorde le repos profond à mon âme fatiguée."
  },
  {
    "ref": "Romains 8:31",
    "text": "Si Dieu est pour nous, qui sera contre nous?",
    "theme": "L'Assurance Triomphante",
    "prayer": "Puisque Dieu est mon bouclier, je marche d'un pas assuré sans trembler."
  },
  {
    "ref": "Psaume 37:4",
    "text": "Fais de l'Éternel tes délices, Et il te donnera ce que ton cœur désire.",
    "theme": "L'Allégresse en Dieu",
    "prayer": "Trouver ma joie en toi est mon plus grand trésor et ma force."
  },
  {
    "ref": "Éphésiens 3:20",
    "text": "À celui qui peut faire, par la puissance qui agit en nous, infiniment au-delà de tout ce que nous demandons ou pensons.",
    "theme": "L'Infinie Grandeur de Dieu",
    "prayer": "Dépasse toutes mes attentes et glorifie ton Nom dans ma vie."
  },
  {
    "ref": "Apocalypse 22:20",
    "text": "Celui qui atteste ces choses dit: Oui, je viens bientôt. Amen! Viens, Seigneur Jésus!",
    "theme": "L'Attente Glorieuse",
    "prayer": "Viens Seigneur Jésus, règne dans mon cœur et garde-moi prêt pour ton retour."
  }
];

export function getDayPortions(dayNum?: number, planDurationMonths = 12): DayPortions {
  const currentDay = dayNum ?? getDayOfYear();
  const totalDays = Math.round(planDurationMonths * 30.42);

  // Linear calculation
  const startLinear = Math.floor((currentDay - 1) * ALL_LINEAR_CHAPTERS.length / totalDays);
  const endLinear = Math.max(startLinear + 1, Math.floor(currentDay * ALL_LINEAR_CHAPTERS.length / totalDays));
  const linearPortions = ALL_LINEAR_CHAPTERS.slice(startLinear, endLinear).map(item => ({ ...item }));

  // Balanced calculation: OT + Wisdom + NT
  const otStart = Math.floor((currentDay - 1) * OT_CHAPTERS.length / totalDays);
  const otEnd = Math.max(otStart + 1, Math.floor(currentDay * OT_CHAPTERS.length / totalDays));
  const otSlice = OT_CHAPTERS.slice(otStart, otEnd);

  const wisdomIdx = (currentDay - 1) % WISDOM_CHAPTERS.length;
  const wisdomSlice = [WISDOM_CHAPTERS[wisdomIdx]];

  const ntStart = Math.floor((currentDay - 1) * NT_CHAPTERS.length / totalDays);
  const ntEnd = Math.max(ntStart + 1, Math.floor(currentDay * NT_CHAPTERS.length / totalDays));
  const ntSlice = NT_CHAPTERS.slice(ntStart, ntEnd);

  const balancedPortions = [...otSlice, ...wisdomSlice, ...ntSlice].map(item => ({ ...item }));

  // Universal Calendar Verse of the Day: Always rotates automatically every 24 hours based on the civil calendar date!
  const calendarDay = getDayOfYear();
  const themeObj = DAILY_THEMES_ROSTER[(calendarDay - 1) % DAILY_THEMES_ROSTER.length];

  return {
    dayNumber: currentDay,
    dateStr: formatDateFrench(),
    theme: themeObj.theme,
    verseOfDay: {
      reference: themeObj.ref,
      text: themeObj.text
    },
    prayerTopic: themeObj.prayer,
    linearPassages: linearPortions.length > 0 ? linearPortions : ALL_LINEAR_CHAPTERS.slice(0, 3),
    balancedPassages: balancedPortions.length > 0 ? balancedPortions : [OT_CHAPTERS[0], WISDOM_CHAPTERS[0], NT_CHAPTERS[0]]
  };
}

export const TODAY_PORTIONS_DATA: DayPortions = getDayPortions();


export const BIBLE_BOOKS_SUMMARY = [
  { section: "Pentateuque (La Loi)", books: ["Genèse", "Exode", "Lévitique", "Nombres", "Deutéronome"], count: "5 livres • 187 chapitres" },
  { section: "Livres Historiques", books: ["Josué", "Juges", "Ruth", "1 Samuel", "2 Samuel", "1 Rois", "2 Rois", "1 Chroniques", "2 Chroniques", "Esdras", "Néhémie", "Esther"], count: "12 livres • 249 chapitres" },
  { section: "Livres Poétiques & Sagesse", books: ["Job", "Psaumes", "Proverbes", "Ecclésiaste", "Cantique des Cantiques"], count: "5 livres • 243 chapitres" },
  { section: "Grands & Petits Prophètes", books: ["Ésaïe", "Jérémie", "Lamentations", "Ézéchiel", "Daniel", "Osée", "Joël", "Amos", "Abdias", "Jonas", "Michée", "Nahum", "Habacuc", "Sophonie", "Aggée", "Zacharie", "Malachie"], count: "17 livres • 250 chapitres" },
  { section: "Évangiles & Actes", books: ["Matthieu", "Marc", "Luc", "Jean", "Actes des Apôtres"], count: "5 livres • 117 chapitres" },
  { section: "Épîtres & Apocalypse", books: ["Romains", "1 & 2 Corinthiens", "Galates", "Éphésiens", "Philippiens", "Colossiens", "1 & 2 Thessaloniciens", "1 & 2 Timothée", "Tite", "Philémon", "Hébreux", "Jacques", "1 & 2 Pierre", "1, 2, 3 Jean", "Jude", "Apocalypse"], count: "22 livres • 143 chapitres" },
];

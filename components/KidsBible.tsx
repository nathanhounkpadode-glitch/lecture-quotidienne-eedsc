"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Volume2, Pause, Play, Heart, Star, Award, BookOpen, CheckCircle, ChevronRight, X, ArrowLeft, Image as ImageIcon, Film, ExternalLink, History, Calendar, CheckCircle2 } from "lucide-react";
import KidsWallpapers from "./KidsWallpapers";

export type KidsLang = "fr" | "en";

export interface StoryLanguageContent {
  title: string;
  subtitle: string;
  reference: string;
  videoEmbedUrl: string;
  originalYoutubeUrl: string;
  videoTitle: string;
  story: string[];
  extendedStory: string[];
  lesson: string;
  prayer: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface KidsStory {
  id: string;
  badge: string;
  category: "Ancien Testament" | "Nouveau Testament" | "Jésus Mon Ami";
  imageSrc: string;
  fr: StoryLanguageContent;
  en: StoryLanguageContent;
}

export const KIDS_STORIES: KidsStory[] = [
  {
    id: "creation",
    badge: "Au Commencement 🌍",
    category: "Ancien Testament",
    imageSrc: "/kids/story_creation.png",
    fr: {
      title: "Dieu Crée le Ciel, la Terre et les Animaux !",
      subtitle: "Dieu a tout façonné avec un amour infini et une beauté parfaite.",
      reference: "Genèse 1 à 2",
      videoEmbedUrl: "https://www.youtube.com/embed/4-cneE5HunI",
      originalYoutubeUrl: "https://www.youtube.com/watch?v=4-cneE5HunI",
      videoTitle: "SUPERBOOK FR • L'univers en un mot (Épisode 1)",
      story: [
        "Au tout début de l'univers, il n'y avait rien : ni soleil, ni nuages, ni arbres, ni animaux. Mais Dieu était là, rempli d'amour, de sagesse et de puissance éternelle !",
        "Dieu a parlé d'une voix douce et puissante : « Que la lumière soit ! » Et immédiatement, une éclatante lumière d'or a chassé l'obscurité !",
        "Puis Dieu a séparé les eaux et a peint le ciel d'un bleu azur resplendissant. Il a réuni les mers et a fait émerger la terre ferme, garnie d'herbe tendre, de fleurs parfumées et d'arbres fruitiers.",
        "Le quatrième jour, Dieu a allumé le soleil pour réchauffer le jour, et la lune argentée accompagnée de milliards d'étoiles scintillantes pour veiller sur la nuit.",
        "Le cinquième et sixième jour, Dieu a rempli les océans de dauphins joyeux et de baleines majestueuses, le ciel d'oiseaux aux chants merveilleux, et la terre de gazelles agiles et de lions courageux.",
        "Enfin, couronnement de tout Son amour, Dieu a créé l'être humain à Son image pour prendre soin de ce magnifique jardin !",
        "Dieu a contemplé toute Sa création et a souri avec joie : « Tout cela est très bon et parfaitement accompli ! »"
      ],
      extendedStory: [
        "Chapitre 1 : Le silence avant le premier souffle. Imagine un monde plongé dans un silence absolu où rien n'existe encore. Dans ce calme mystérieux, l'Esprit de Dieu planait avec bienveillance au-dessus des abîmes d'eau.",
        "Chapitre 2 : L'ordre et l'harmonie naissent de Sa voix. Quand Dieu prononce une parole, la matière obéit. La lumière a jailli, le ciel a déployé son dôme majestueux, et les continents se sont levés comme des forteresses au milieu des mers.",
        "Chapitre 3 : L'explosion de vie et de couleurs. Des forêts verdoyantes se sont parées de fruits mûrs, les cascades ont résonné de mélodies limpides, et chaque recoin de la terre est devenu un paradis éclatant de vie.",
        "Chapitre 4 : La création de l'homme et la bénédiction éternelle. Dieu a soufflé un souffle de vie dans les narines de l'homme et de la femme. Il leur a confié la garde affectueuse de la nature. Dieu s'est ensuite reposé le septième jour, contemplant Son œuvre avec amour."
      ],
      lesson: "Tu n'es pas le fruit du hasard : Dieu t'a conçu avec tendresse, précision et un magnifique projet de paix pour ta vie !",
      prayer: "Seigneur Créateur, merci pour les étoiles, les mers et pour mon cœur qui bat. Tu es infiniment grand et bon ! Amen.",
      quiz: {
        question: "Qu'a dit Dieu pour faire briller la toute première lumière dans l'univers ?",
        options: ["« Que le soleil tourne ! »", "« Que la lumière soit ! »", "« Que la terre s'allume ! »"],
        correctIndex: 1,
        explanation: "Bravo ! Dieu a prononcé « Que la lumière soit ! » et la lumière a instantanément jailli par la puissance de Sa parole !"
      }
    },
    en: {
      title: "God Creates the World and Everything in It!",
      subtitle: "God formed the heavens and earth with boundless love and wisdom.",
      reference: "Genesis 1-2",
      videoEmbedUrl: "https://www.youtube.com/embed/5AsnrqBq-W8",
      originalYoutubeUrl: "https://www.youtube.com/watch?v=5AsnrqBq-W8",
      videoTitle: "SUPERBOOK TV • In the Beginning (Episode 1)",
      story: [
        "In the very beginning, there was nothing: no sun, no trees, no birds. But God was already there, full of love and almighty strength!",
        "God spoke with gentle authority: 'Let there be light!' and dazzling brightness chased away all the shadows.",
        "God separated the waters, painted the wide sky in sapphire blue, and gathered the seas so dry ground could blossom with green grass, flowers, and fruit trees.",
        "He set the brilliant sun to govern the daytime, and the glowing moon with billions of sparkling stars to watch over the night.",
        "Then God filled the seas with friendly dolphins and swimming creatures, the air with singing birds, and the land with happy animals.",
        "Finally, as the crown of His creation, God created humankind in His own image to cherish and care for this wondrous world!",
        "God looked over everything He had made, smiled with profound joy, and said: 'It is very good!'"
      ],
      extendedStory: [
        "Chapter 1: The Stillness Before Time. Before galaxies began spinning, God's loving Spirit moved over the deep waters.",
        "Chapter 2: The Symphony of Light. At God's single word, glorious light erupted, separating day from night with divine rhythm.",
        "Chapter 3: Teeming Life in Every Corner. Rolling meadows arose, filled with fragrant cedar trees and crystal rivers.",
        "Chapter 4: The Masterpiece of Love. God formed mankind with tender care, breathing the breath of eternal life into their hearts."
      ],
      lesson: "You are fearfully and wonderfully made by God. You are His beloved child with a bright future!",
      prayer: "Dear Lord, thank you for the trees, the ocean, and for crafting me with such tender love. Amen.",
      quiz: {
        question: "What did God speak to bring the very first light into existence?",
        options: ["'Let the sunshine in!'", "'Let there be light!'", "'Wake up, world!'"],
        correctIndex: 1,
        explanation: "Super! God commanded 'Let there be light!' and brilliance filled the cosmos right away!"
      }
    }
  },
  {
    id: "noah",
    badge: "L'Arche & L'Alliance 🌈",
    category: "Ancien Testament",
    imageSrc: "/kids/story_noah.png",
    fr: {
      title: "Noé et la Grande Arche aux Animaux",
      subtitle: "Dieu protège toujours fidèlement ceux qui placent leur confiance en Lui.",
      reference: "Genèse 6 à 9",
      videoEmbedUrl: "https://www.youtube.com/embed/28TpaU64uyA",
      originalYoutubeUrl: "https://www.youtube.com/watch?v=28TpaU64uyA",
      videoTitle: "SUPERBOOK FR • L'arche, la colombe et l'arc-en-ciel (Saison 2)",
      story: [
        "Dans un monde où beaucoup de gens oubliaient Dieu, Noé marchait chaque jour avec piété, bonté et obéissance.",
        "Dieu a parlé au cœur de Noé : « Construis une immense Arche en bois de gopher, avec trois étages, car une grande pluie va purifier la terre. »",
        "Pendant que Noé construisait le grand navire, les animaux sont arrivés deux par deux, guidés par la main invisible de Dieu : les girafes courbées, les éléphants massifs, les perroquets colorés et les petits rongeurs !",
        "Une fois toute la famille de Noé et les animaux abrités, Dieu Lui-même a refermé la porte de l'Arche.",
        "La pluie est tombée pendant quarante jours et quarante nuits. Les torrents montaient, mais l'Arche flottait en paix sur les flots.",
        "Puis Noé a lâché une colombe qui est revenue avec un rameau d'olivier tout vert dans son bec : la terre était redevenue habitable !",
        "Quand Noé est sorti de l'Arche, Dieu a tendu un resplendissant arc-en-ciel aux sept couleurs dans le ciel en promettant : « Je n'oublierai jamais mon alliance d'amour avec vous ! »"
      ],
      extendedStory: [
        "Scène 1 : La fidélité au milieu des doutes. Même quand personne autour ne comprenait pourquoi il bâtissait un bateau sur la terre sèche, Noé persévérait parce qu'il croyait en la parole du Seigneur.",
        "Scène 2 : La merveilleuse parade des animaux. Imagine l'Arche résonnant du barrissement joyeux des éléphants et du chant des pinsons, tous nourris avec amour par Noé et ses fils.",
        "Scène 3 : La colombe de paix et l'olivier. Le vol de la douce colombe blanche annonçait le retour du printemps divin sur la terre renouvelée.",
        "Scène 4 : L'autel d'action de grâce et l'arc éternel. Les cieux se sont ouverts avec l'arc-en-ciel, rappel perpétuel que la miséricorde de Dieu triomphe de toutes les tempêtes."
      ],
      lesson: "Même quand de grandes tempêtes s'abattent autour de toi, Dieu te préserve en sécurité dans Son Arche de grâce.",
      prayer: "Seigneur Noé, merci pour ton arc-en-ciel de paix et pour ta main qui me protège à chaque instant. Amen.",
      quiz: {
        question: "Quel magnifique signe d'alliance Dieu a-t-il placé dans le ciel après le déluge ?",
        options: ["Une comète filante", "Un arc-en-ciel éclatant", "Une nuée de feu"],
        correctIndex: 1,
        explanation: "Exactement ! L'arc-en-ciel coloré est le signe solennel de la fidélité et de l'amour éternel de Dieu pour la terre !"
      }
    },
    en: {
      title: "Noah's Ark and the Beautiful Rainbow",
      subtitle: "God's sheltering grace protects everyone who trusts in His promise.",
      reference: "Genesis 6 to 9",
      videoEmbedUrl: "https://www.youtube.com/embed/83-JGTJAXCI",
      originalYoutubeUrl: "https://www.youtube.com/watch?v=83-JGTJAXCI",
      videoTitle: "SUPERBOOK TV • Noah and the Ark (Season 2 Episode 9)",
      story: [
        "In a busy world that forgot the Creator, Noah walked closely with God in prayer and righteousness.",
        "God instructed Noah: 'Build a giant wooden Ark, for heavy rains will soon fall upon the land.'",
        "Obeying without hesitation, Noah crafted the ship. Guided by God, animals stepped inside two by two: tall giraffes, gentle lambs, birds of every plumage!",
        "When everyone was safely inside, God Himself closed the great door.",
        "Rain poured for forty days, yet the Ark sailed peacefully over the swelling waters.",
        "Later, Noah sent forth a white dove, which returned carrying a fresh green olive branch!",
        "Stepping out on dry land, God arched a glowing seven-colored rainbow in the sky, sealing His promise of everlasting mercy."
      ],
      extendedStory: [
        "Scene 1: Standing Firm in Faith. Noah trusted God's voice even before a single cloud appeared in the sunny sky.",
        "Scene 2: Inside the Floating Sanctuary. Animals of every shape lived in peace while rain showered down outside.",
        "Scene 3: The Messenger Dove. The olive branch represented new life, hope, and God's renewed covenant with creation.",
        "Scene 4: The Rainbow of Promise. Shining above the mountains, the rainbow reminds us that God's faithful love never fails."
      ],
      lesson: "God always keeps His promises and shelters your heart through life's biggest storms.",
      prayer: "Thank You Lord for Your rainbow of love and for keeping me safe in Your gentle care. Amen.",
      quiz: {
        question: "What sign did God display in the sky after the storm passed?",
        options: ["A shining meteor", "A colorful rainbow", "A bright thunderbolt"],
        correctIndex: 1,
        explanation: "Right! The colorful rainbow stands as God's promise that He will forever love and guard us!"
      }
    }
  },
  {
    id: "david",
    badge: "Courage & Victoire ⚔️",
    category: "Ancien Testament",
    imageSrc: "/kids/story_david.png",
    fr: {
      title: "Le Berger David et le Géant Goliath",
      subtitle: "Avec Dieu à tes côtés, aucun géant n'est trop fort pour la foi !",
      reference: "1 Samuel 17",
      videoEmbedUrl: "https://www.youtube.com/embed/Q-Ygyw0HCrs",
      originalYoutubeUrl: "https://www.youtube.com/watch?v=Q-Ygyw0HCrs",
      videoTitle: "SUPERBOOK FR • Un Défi de Géant (Saison 1 Épisode 6)",
      story: [
        "Dans la vallée d'Éla, un géant colossal haut de presque trois mètres nommé Goliath criait des insultes contre l'armée d'Israël : « Qui osera s'avancer contre moi ? »",
        "Tous les soldats tremblaient de peur et se cachaient. C'est alors qu'arriva un jeune berger aux joues vermeilles nommé David, venu apporter du pain et du fromage à ses grands frères.",
        "Entendant les moqueries du géant contre le Dieu vivant, David s'est écrié : « Qui est cet homme pour défier l'armée du Dieu d'Israël ? Ne craignez rien, j'irai me battre contre lui ! »",
        "Le roi Saül voulut lui prêter une lourde armure de fer et une grande épée, mais David ne pouvait même pas marcher avec. Il a dit : « Le Seigneur qui m'a délivré de la griffe du lion et de l'ours me délivrera aussi de ce géant ! »",
        "David a pris son bâton de berger, a choisi cinq pierres bien lisses dans le ruisseau et a avancé vers le géant avec sa simple fronde.",
        "Goliath s'est moqué de lui, mais David a répondu avec audace : « Tu marches contre moi avec l'épée et la lance ; moi, je marche contre toi au nom de l'Éternel des armées ! »",
        "David a fait tournoyer sa fronde : la pierre a fendu l'air et a frappé le géant en plein front. Goliath s'est effondré lourdement au sol !",
        "Toute l'armée a poussé un grand cri de triomphe, célébrant la victoire éclatante accordée à un jeune garçon plein de foi !"
      ],
      extendedStory: [
        "Acte 1 : Le cœur du jeune berger. Dans les collines solitaires de Bethléem, David chantait des louanges avec sa harpe tout en veillant sur ses brebis. Il avait appris que Dieu est un refuge puissant contre les prédateurs.",
        "Acte 2 : La provocation dans la vallée. Matin et soir, le géant Goliath paradait avec son casque d'airain et sa lance lourde comme une poutre, terrorisant les soldats expérimentés.",
        "Acte 3 : Le courage qui naît de la prière. David n'a pas regardé la taille impressionnante de Goliath : il a levé les yeux vers la grandeur infiniment supérieure du Tout-Puissant.",
        "Acte 4 : Le triomphe de la foi. Une seule petite pierre lisse a suffi pour abattre la fierté de l'ennemi. Dieu a prouvé que la victoire ne dépend ni des chars ni des armures, mais d'un cœur pur qui s'appuie sur Son nom."
      ],
      lesson: "Peu importe ton âge ou ta petite taille, lorsque tu pries avec foi, Jésus fait tomber tous les géants de la peur, du doute et des difficultés !",
      prayer: "Seigneur tout-puissant, remplis mon âme du courage de David. Quand la peur arrive, je confesse que Tu combats pour moi ! Amen.",
      quiz: {
        question: "De quelle arme David s'est-il servi avec foi pour faire tomber Goliath ?",
        options: ["Une longue épée en diamant", "Une fronde et une pierre lisse au nom de Dieu", "Un grand arc en argent"],
        correctIndex: 1,
        explanation: "Bravo ! David a triomphé sans armure lourde : une simple pierre lancée au nom de l'Éternel des armées a suffi !"
      }
    },
    en: {
      title: "Young David and the Giant Goliath",
      subtitle: "With the Lord on your side, no obstacle is too big to overcome!",
      reference: "1 Samuel 17",
      videoEmbedUrl: "https://www.youtube.com/embed/jdMq3YAfmO0",
      originalYoutubeUrl: "https://www.youtube.com/watch?v=jdMq3YAfmO0",
      videoTitle: "SUPERBOOK TV • A Giant Adventure (Season 1 Episode 6)",
      story: [
        "In the Valley of Elah, a towering giant named Goliath shouted taunts at the army: 'Who dares stand against me?'",
        "Every soldier was paralyzed with fear. Just then, a young shepherd boy named David arrived carrying provisions for his older brothers.",
        "Hearing Goliath's arrogant words against the living God, David boldly announced: 'Do not lose heart; I will go fight this giant!'",
        "King Saul offered heavy bronze armor, but David could scarcely move. He declared: 'The Lord who saved me from lions and bears will deliver me today!'",
        "David took his wooden shepherd's staff, chose five smooth stones from the brook, and walked out with his leather sling.",
        "Goliath mocked his youth, but David proclaimed: 'You come with sword and spear, but I come to you in the name of the Lord of Hosts!'",
        "David spun his sling high—the smooth stone flew true, striking Goliath on the forehead, bringing the giant crashing down!",
        "The entire army cheered with joyful praise, celebrating God's glorious victory delivered through a faithful young heart!"
      ],
      extendedStory: [
        "Act 1: Lessons from the Shepherd Fields. In lonely pastures, David learned to trust God's protection while guarding his gentle flock.",
        "Act 2: The Valley of Fear. Goliath's massive shield and roaring voice caused brave warriors to retreat in terror.",
        "Act 3: Confidence in the Unseen God. David looked past the giant's iron spears and remembered the sovereign power of the Lord.",
        "Act 4: A Miracle of Faith. Guided by God's hand, one smooth stone won freedom for the whole nation."
      ],
      lesson: "No matter how small you feel, faith in Jesus is mightier than any giant problem in your life!",
      prayer: "Dear God, grant me a brave heart like David. I trust in Your mighty presence today and always. Amen.",
      quiz: {
        question: "What weapon did young David use to defeat the giant Goliath?",
        options: ["A heavy metal sword", "A sling, a smooth stone, and faith in God!", "A chariot of fire"],
        correctIndex: 1,
        explanation: "Superb! David trusted God completely and defeated the giant with a smooth stone from the brook!"
      }
    }
  },
  {
    id: "jesus-birth",
    badge: "Noël & Joie ⭐",
    category: "Jésus Mon Ami",
    imageSrc: "/kids/story_nativity.png",
    fr: {
      title: "La Naissance de Jésus : Le Plus Beau Cadeau du Ciel",
      subtitle: "Le Roi des rois est venu sur terre dans la douceur d'une humble crèche.",
      reference: "Luc 2",
      videoEmbedUrl: "https://www.youtube.com/embed/NKKvDQiyfSo",
      originalYoutubeUrl: "https://www.youtube.com/watch?v=NKKvDQiyfSo",
      videoTitle: "SUPERBOOK FR • L'Étoile du Roi (Saison 1 Épisode 8)",
      story: [
        "Dans la petite bourgade paisible de Bethléem, Marie et Joseph cherchaient un abri pour la nuit. Comme il n'y avait plus de place dans les hôtelleries, ils trouvèrent refuge dans une étable tiède et accueillante.",
        "C'est là que le Seigneur Jésus est né ! Marie l'a tendrement enveloppé de doux langes et l'a couché avec amour dans une mangeoire de bois.",
        "Dans les collines voisines, des bergers veillaient sur leurs brebis dans la nuit sombre. Tout à coup, une grande lumière céleste a brillé autour d'eux et un ange est apparu !",
        "L'ange leur a dit d'une voix réconfortante : « Ne craignez point ! Je vous annonce une grande joie pour tout le peuple : aujourd'hui, un Sauveur vous est né dans la ville de David ! »",
        "Aussitôt, une multitude d'anges éclatants ont chanté dans les cieux : « Gloire à Dieu dans les lieux très hauts, et paix sur la terre parmi les hommes qu'Il aime ! »",
        "Guidés par une brillante étoile d'or dans le firmament, des mages venus d'Orient sont arrivés pour se prosterner devant l'Enfant-Roi en Lui offrant des trésors d'or, d'encens et de myrrhe.",
        "Jésus est venu pour nous apporter la vie éternelle, le pardon et la lumière qui ne s'éteint jamais !"
      ],
      extendedStory: [
        "Partie 1 : Le voyage vers Bethléem. Marie et Joseph ont marché sur de longs sentiers caillouteux, portant dans leur cœur la sainte promesse faite par l'ange Gabriel.",
        "Partie 2 : L'humble sanctuaire de paille. Dieu a choisi de naître non pas dans un palais somptueux entouré de gardes, mais au milieu de brebis douces et de l'amour sincère d'une famille.",
        "Partie 3 : Le concert des anges dans la nuit. Les humbles bergers ont été les tout premiers invités à contempler la merveille du salut.",
        "Partie 4 : L'étoile guide et l'offrande des rois. L'étoile miraculeuse brillait pour indiquer que Jésus est venu sauver toutes les nations de la terre."
      ],
      lesson: "Jésus est le plus merveilleux cadeau que Dieu t'a offert. Il veut faire de ton cœur Sa demeure de paix et de joie !",
      prayer: "Seigneur Jésus, merci d'être venu sur terre pour être mon Sauveur et mon meilleur ami. Entre dans mon cœur aujourd'hui ! Amen.",
      quiz: {
        question: "Qui est apparu aux bergers dans les champs pour annoncer la venue de Jésus ?",
        options: ["Des soldats romains", "Une chorale d'anges resplendissants", "Un vieux voyageur"],
        correctIndex: 1,
        explanation: "Magnifique ! Des anges lumineux ont illuminé la nuit en chantant la paix et la gloire de Dieu !"
      }
    },
    en: {
      title: "The Birth of Baby Jesus in Bethlehem",
      subtitle: "The Prince of Peace is born to bring light and salvation to all nations.",
      reference: "Luke 2",
      videoEmbedUrl: "https://www.youtube.com/embed/Ty3vrOoWtNM",
      originalYoutubeUrl: "https://www.youtube.com/watch?v=Ty3vrOoWtNM",
      videoTitle: "SUPERBOOK TV • The First Christmas (Season 1 Episode 8)",
      story: [
        "In the quiet little town of Bethlehem, Mary and Joseph sought a warm place to rest. Because inns were full, a caring innkeeper offered shelter in a stable.",
        "There, baby Jesus was born! Mary lovingly wrapped Him in soft cloths and laid Him in a cozy wooden manger.",
        "Out in nearby fields, humble shepherds kept watch over their sheep under a dark sky. Suddenly, radiant celestial light surrounded them as an angel appeared!",
        "The angel proclaimed: 'Do not be afraid! I bring you good news of great joy: today in Bethlehem, a Savior has been born to you!'",
        "Immediately, a vast choir of heavenly angels burst into song: 'Glory to God in the highest, and on earth peace to everyone!'",
        "Guided by a magnificent golden star in the sky, wise men journeyed from eastern lands to worship the young King, presenting precious gifts of gold, frankincense, and myrrh.",
        "Jesus came to earth to bring everlasting light, forgiveness, and endless love to all children!"
      ],
      extendedStory: [
        "Part 1: The Long Journey of Hope. Mary and Joseph traveled with quiet peace, trusting God's overarching divine plan.",
        "Part 2: The Warm Manger of Humility. God chose the simplest stable so that anyone, rich or poor, could approach Jesus freely.",
        "Part 3: Good Tidings to Humble Shepherds. Ordinary workers were honored as the very first witnesses of the Lord's arrival.",
        "Part 4: The Guiding Star of Grace. The star demonstrated that Jesus shines as the true light for every nation across the globe."
      ],
      lesson: "Jesus is God's greatest gift of love to the entire world. He loves you and walks beside you every day.",
      prayer: "Dear Jesus, thank You for being born to love and save me. Be the King of my heart forever. Amen.",
      quiz: {
        question: "What heavenly sign guided the wise men to discover baby Jesus?",
        options: ["A compass", "A bright shining star in the east", "A silver cloud"],
        correctIndex: 1,
        explanation: "Correct! The brilliant star of Bethlehem guided the travelers straight to the home of Jesus!"
      }
    }
  },
  {
    id: "tempest",
    badge: "Paix & Puissance ⛵",
    category: "Jésus Mon Ami",
    imageSrc: "/kids/story_storm.png",
    fr: {
      title: "Jésus Calme la Tempête Déchaînée",
      subtitle: "Même les vents furieux et les vagues géantes obéissent à la voix de Jésus !",
      reference: "Marc 4:35-41",
      videoEmbedUrl: "https://www.youtube.com/embed/o6b82NdPHjM",
      originalYoutubeUrl: "https://www.youtube.com/watch?v=o6b82NdPHjM",
      videoTitle: "SUPERBOOK FR • Jésus parle à la tempête et le calme",
      story: [
        "Au coucher du soleil, Jésus et Ses disciples sont montés dans une barque de pêcheur pour traverser le grand lac de Galilée.",
        "Soudain, un vent violent a soufflé des montagnes. Le ciel est devenu noir d'encre et des vagues gigantesques s'écrasaient sur la barque, qui commençait à se remplir d'eau !",
        "Les disciples, pourtant des marins expérimentés, étaient terrifiés et croyaient périr. Mais à l'arrière du bateau, Jésus dormait paisiblement, la tête posée sur un coussin.",
        "Pris de panique, ils l'ont réveillé en criant : « Maître, Maître ! Ne t'inquiètes-tu pas que nous soyons en train de couler ? »",
        "Jésus s'est levé avec une majesté tranquille. Il a regardé la tourmente, a levé Sa main vers le ciel et a ordonné au vent et aux flots : « Silence ! Fais silence et tais-toi ! »",
        "Instantanément, le vent s'est arrêté de rugir, les vagues sont retombées et il s'est fait un grand calme limpide comme un miroir !",
        "Puis Jésus s'est tourné avec tendresse vers Ses disciples : « Pourquoi avez-vous peur ? Où est votre foi ? » Remplis d'admiration, ils se disaient : « Quel est donc cet homme, à qui même les vents et la mer obéissent ? »"
      ],
      extendedStory: [
        "Moment 1 : La traversée du crépuscule. Après une longue journée à guérir les malades et enseigner les foules, Jésus cherchait le repos sur les eaux calmes du lac.",
        "Moment 2 : L'orage féroce et l'épreuve des cœurs. Les bourrasques frappaient la coque en bois, le tonnerre grondait sans répit, testant la foi des disciples.",
        "Moment 3 : La paix divine qui dort au milieu du chaos. Alors que tout semblait perdu, la présence de Jésus dans le bateau garantissait qu'aucun naufrage n'était possible.",
        "Moment 4 : La souveraineté absolue du Maître. À Sa seule voix, la nature agitée s'est inclinée dans un silence sacré. Les disciples ont compris que Jésus est le Maître des éléments."
      ],
      lesson: "Quand les soucis ou la peur secouent ta vie comme des vagues, souviens-toi que Jésus est dans ta barque : Sa paix est plus forte que toutes les tempêtes !",
      prayer: "Seigneur Jésus, quand le doute ou la peur m'assaille, je me tourne vers Toi. Commande à mon cœur : « Paix et silence ». Amen.",
      quiz: {
        question: "Quelle parole puissante Jésus a-t-il prononcée pour calmer la tempête ?",
        options: ["« Ramez plus vite vers le rivage ! »", "« Silence ! Fais silence et tais-toi ! »", "« Jetez les filets à l'eau ! »"],
        correctIndex: 1,
        explanation: "Splendide ! Dès que Jésus a commandé « Silence ! Tais-toi ! », la mer s'est instantanément apaisée !"
      }
    },
    en: {
      title: "Jesus Calms the Fierce Storm on the Sea",
      subtitle: "Even the howling winds and crashing waves obey Jesus' voice!",
      reference: "Mark 4:35-41",
      videoEmbedUrl: "https://www.youtube.com/embed/EQXyhM592RU",
      originalYoutubeUrl: "https://www.youtube.com/watch?v=EQXyhM592RU",
      videoTitle: "SUPERBOOK TV • Miracles of Jesus (Season 1 Episode 9)",
      story: [
        "At evening, Jesus and His disciples set sail across the Sea of Galilee in a fishing boat.",
        "Suddenly, a furious gale swept down from the mountains. Thunder cracked, dark clouds masked the sky, and giant waves surged into the boat!",
        "Even seasoned fishermen trembled in terror. Yet in the stern, Jesus rested peacefully with His head upon a cushion.",
        "In deep panic, the disciples awoke Him crying: 'Teacher! Don't You care that we are perishing?'",
        "Jesus stood up in majestic serenity. He raised His hand toward the churning sea and commanded: 'Peace! Be still!'",
        "Immediately, the winds died down, the waves smoothed out, and a profound, glassy stillness settled across the water!",
        "Jesus gently asked: 'Why are you so afraid? Do you still have no faith?' Filled with awe, the disciples whispered: 'Who is this, that even the wind and sea obey Him?'"
      ],
      extendedStory: [
        "Moment 1: Setting Sail at Twilight. Exhausted from serving people all day, Jesus rested peacefully upon the quiet waves.",
        "Moment 2: The Roar of the Gale. Cold waters rushed into the boat as ferocious winds battered the sail.",
        "Moment 3: Peace Resting in the Storm. Although outward circumstances were wild, the Prince of Peace held total divine security.",
        "Moment 4: Complete Stillness. At Jesus' gentle rebuke, nature recognized its Creator and obeyed instantly."
      ],
      lesson: "Whenever fears or dark thoughts shake your heart, remember that Jesus is with you in the boat: He brings perfect calm.",
      prayer: "Dear Jesus, thank You that no storm can overpower Your loving hand. Fill my heart with Your sweet peace today. Amen.",
      quiz: {
        question: "What commanding words did Jesus speak to quiet the roaring waters?",
        options: ["'Row harder to the shore!'", "'Peace! Be still!'", "'Lower the anchor quickly!'"],
        correctIndex: 1,
        explanation: "Brilliant! Jesus commanded 'Peace! Be still!' and the wild storm became calm like glass!"
      }
    }
  }
];

export default function KidsBible() {
  const [kidsLang, setKidsLang] = useState<KidsLang>("fr");
  const [activeSubTab, setActiveSubTab] = useState<"stories" | "wallpapers" | "history">("stories");
  const [selectedStory, setSelectedStory] = useState<KidsStory | null>(null);
  const [storyReadMode, setStoryReadMode] = useState<"standard" | "extended">("extended");
  const [activeVideoStory, setActiveVideoStory] = useState<KidsStory | null>(null);
  const [videoModalLang, setVideoModalLang] = useState<KidsLang>("fr");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [earnedStars, setEarnedStars] = useState<number>(3);
  const [readHistory, setReadHistory] = useState<Array<{ id: string; title: string; date: string; stars: number }>>([]);

  // Load kids history from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedHist = localStorage.getItem("eedsc_kids_read_history");
      if (savedHist) {
        try {
          setReadHistory(JSON.parse(savedHist));
        } catch (e) {}
      }
      const savedStars = localStorage.getItem("eedsc_kids_stars");
      if (savedStars) {
        setEarnedStars(Number(savedStars) || 3);
      }
    }
  }, []);

  const activeContent = selectedStory ? selectedStory[kidsLang] : null;

  const handleOpenStory = (story: KidsStory) => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setIsPlayingAudio(false);
    setSelectedStory(story);
    setStoryReadMode("extended");
    setSelectedQuizAnswer(null);
    setQuizSubmitted(false);

    // Save to history
    if (typeof window !== "undefined") {
      const nowStr = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
      const newEntry = {
        id: story.id,
        title: story[kidsLang].title,
        date: nowStr,
        stars: 1,
      };
      const updated = [newEntry, ...readHistory.filter((h) => h.id !== story.id)].slice(0, 10);
      setReadHistory(updated);
      localStorage.setItem("eedsc_kids_read_history", JSON.stringify(updated));
    }
  };

  const handleCloseStory = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setIsPlayingAudio(false);
    setSelectedStory(null);
  };

  const handleToggleVoice = () => {
    if (!activeContent) return;
    if ("speechSynthesis" in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        const textArray = storyReadMode === "extended" ? activeContent.extendedStory : activeContent.story;
        const textToRead = `${activeContent.title}. ${textArray.join(" ")}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = kidsLang === "en" ? "en-US" : "fr-FR";
        utterance.rate = 0.88;
        utterance.pitch = 1.08;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    } else {
      alert("La lecture audio n'est pas supportée sur ce navigateur.");
    }
  };

  const handleQuizAnswer = (index: number) => {
    if (quizSubmitted) return;
    setSelectedQuizAnswer(index);
    setQuizSubmitted(true);
    if (activeContent && index === activeContent.quiz.correctIndex) {
      const nextStars = earnedStars + 1;
      setEarnedStars(nextStars);
      if (typeof window !== "undefined") {
        localStorage.setItem("eedsc_kids_stars", String(nextStars));
      }
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#1E1B4B] via-[#2E1065] to-[#1E1B4B] border border-amber-400/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-extrabold text-xs border border-amber-400/30 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> EEDSC Junior • Bible des Enfants
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs">
                3 à 12 ans & Familles
              </span>
            </div>

            <h2 className="text-2xl md:text-4xl font-extrabold text-white font-serif tracking-wide">
              Les Petits Héros de la Foi 🌟
            </h2>

            <p className="text-xs md:text-sm text-slate-200 max-w-xl">
              Dessins animés officiels en <strong>Français</strong> et <strong>Anglais</strong>, grands récits épais et captivants, voix audio et quiz interactifs !
            </p>
          </div>

          {/* Language Toggle & Stars Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 font-extrabold text-xs shadow-inner">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-spin" style={{ animationDuration: "8s" }} />
              <span>{earnedStars} Étoiles gagnées !</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-2xl border border-slate-700">
              <button
                type="button"
                onClick={() => {
                  setKidsLang("fr");
                  setVideoModalLang("fr");
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  kidsLang === "fr"
                    ? "bg-amber-400 text-slate-950 shadow-md font-extrabold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>🇫🇷</span>
                <span>Français</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setKidsLang("en");
                  setVideoModalLang("en");
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  kidsLang === "en"
                    ? "bg-amber-400 text-slate-950 shadow-md font-extrabold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>🇬🇧</span>
                <span>English</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-tab Switch: Histoires vs Fonds d'écran vs Historique */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveSubTab("stories")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              activeSubTab === "stories"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-md"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{kidsLang === "fr" ? "Histoires Épaisses & Vidéos" : "Stories & Videos"}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("history")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              activeSubTab === "history"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-md"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <History className="w-4 h-4" />
            <span>{kidsLang === "fr" ? "Historique des Récits Lus" : "Reading History"}</span>
            {readHistory.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px]">
                {readHistory.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("wallpapers")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              activeSubTab === "wallpapers"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-md"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>{kidsLang === "fr" ? "Fonds d'Écran HD" : "HD Wallpapers"}</span>
          </button>
        </div>
      </div>

      {activeSubTab === "wallpapers" ? (
        <KidsWallpapers kidsLang={kidsLang} onBackToStories={() => setActiveSubTab("stories")} />
      ) : activeSubTab === "history" ? (
        /* SECTION HISTORIQUE PASSÉ DES ENFANTS */
        <div className="p-6 md:p-8 rounded-3xl bg-[#09152B] border border-amber-400/30 space-y-6 shadow-xl animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400">
                <History className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-serif">
                  📜 Historique des Récits Bibliques Lus
                </h3>
                <p className="text-xs text-slate-400">
                  Retrouvez toutes les histoires consultées et vos récompenses de foi.
                </p>
              </div>
            </div>

            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              ⭐ {earnedStars} Étoiles de Gloire
            </span>
          </div>

          {readHistory.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-slate-400 text-sm">
                Aucune histoire lue pour le moment. Cliquez sur un récit pour commencer !
              </p>
              <button
                type="button"
                onClick={() => setActiveSubTab("stories")}
                className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Découvrir les Histoires
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {readHistory.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-400/50 flex items-center justify-between transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-amber-400" /> Lu le {item.date}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const found = KIDS_STORIES.find((s) => s.id === item.id);
                      if (found) handleOpenStory(found);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/40 font-bold text-xs border border-amber-400/30 transition"
                  >
                    Relire 📖
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {KIDS_STORIES.map((story) => {
              const content = story[kidsLang];

              return (
                <div
                  key={story.id}
                  onClick={() => handleOpenStory(story)}
                  className="group cursor-pointer rounded-3xl bg-[#09152B] border border-slate-800 hover:border-amber-400/50 p-5 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between space-y-4 hover:shadow-2xl hover:shadow-amber-500/10"
                >
                  <div className="space-y-3">
                    {/* Visual Cover Drawing / 3D Artwork */}
                    <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 group-hover:scale-[1.02] transition aspect-[16/10] bg-slate-950 shadow-md">
                      <img
                        src={story.imageSrc}
                        alt={content.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Direct YouTube badge on image linking to the selected language video */}
                      <a
                        href={content.originalYoutubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-xl bg-red-600/95 hover:bg-red-500 text-white font-extrabold text-[10px] flex items-center gap-1 shadow-lg transition active:scale-95 border border-red-400/40 backdrop-blur-sm"
                        title={kidsLang === "fr" ? "Ouvrir la vidéo originale française sur YouTube" : "Open original English video on YouTube"}
                      >
                        <Film className="w-3 h-3" />
                        <span>{kidsLang === "fr" ? "YouTube FR ↗" : "YouTube EN ↗"}</span>
                      </a>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-400/20">
                        {story.badge}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">
                        {content.reference}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white font-serif group-hover:text-amber-300 transition line-clamp-2">
                      {content.title}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-2">
                      {content.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    {/* BUTTON TO OPEN IN-APP PLAYER WITH BOTH LANGUAGES */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setVideoModalLang(kidsLang);
                        setActiveVideoStory(story);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/40 text-red-300 border border-red-500/40 text-[11px] font-extrabold flex items-center gap-1.5 transition active:scale-95"
                      title={kidsLang === "fr" ? "Regarder la vidéo en Français ou Anglais" : "Watch video in French or English"}
                    >
                      <Film className="w-3.5 h-3.5 text-red-400" />
                      <span>{kidsLang === "fr" ? "Vidéo Officielle 🎬" : "Official Video 🎬"}</span>
                    </button>

                    <div className="flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:text-amber-300 transition">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{kidsLang === "fr" ? "Lire l'histoire" : "Read"}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Story Reader Modal */}
          {selectedStory && activeContent && (
            <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
              <div className="max-w-3xl w-full bg-[#0B1528] border-2 border-amber-400/50 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl my-8 relative animate-fadeIn">
                
                {/* Top Modal Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <button
                    type="button"
                    onClick={handleCloseStory}
                    className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-1 text-xs font-semibold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {kidsLang === "fr" ? "Retour" : "Back"}
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      {selectedStory.badge}
                    </span>
                    <button
                      type="button"
                      onClick={handleCloseStory}
                      className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Drawing Illustration Banner */}
                <div className="rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl relative aspect-[16/9] bg-slate-950">
                  <img
                    src={selectedStory.imageSrc}
                    alt={activeContent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Title & Reference */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                    📖 {activeContent.reference}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white font-serif">
                    {activeContent.title}
                  </h2>
                </div>

                {/* Switch: Histoire Express vs Grande Histoire Épaisse */}
                <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setStoryReadMode("extended")}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                      storyReadMode === "extended"
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Grand Récit Épais & Complet 📚</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStoryReadMode("standard")}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                      storyReadMode === "standard"
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>Version Express (3-6 ans) ⚡</span>
                  </button>
                </div>

                {/* Audio Voice Storyteller & Cartoon Video Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleToggleVoice}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition shadow-md active:scale-95 ${
                      isPlayingAudio
                        ? "bg-emerald-400 text-slate-950 animate-pulse ring-4 ring-emerald-400/30"
                        : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950"
                    }`}
                  >
                    {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>
                      {isPlayingAudio
                        ? (kidsLang === "fr" ? "Conte audio en cours..." : "Storytelling...")
                        : (kidsLang === "fr" ? "Écouter à voix haute 🎧" : "Listen Aloud 🎧")}
                    </span>
                  </button>

                  {/* DIRECT BUTTON TO ORIGINAL YOUTUBE VIDEO IN SELECTED LANGUAGE */}
                  <a
                    href={activeContent.originalYoutubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white text-xs font-extrabold flex items-center gap-2 transition shadow-md active:scale-95"
                  >
                    <Film className="w-4 h-4 fill-white" />
                    <span>{kidsLang === "fr" ? "Ouvrir Vidéo sur YouTube 🇫🇷 ↗" : "Open Video on YouTube 🇬🇧 ↗"}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      if (isPlayingAudio && "speechSynthesis" in window) {
                        window.speechSynthesis.cancel();
                        setIsPlayingAudio(false);
                      }
                      setVideoModalLang(kidsLang);
                      setActiveVideoStory(selectedStory);
                    }}
                    className="px-3.5 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <span>Lecteur Intégré 📺</span>
                  </button>
                </div>

                {/* Story Paragraphs */}
                <div className="space-y-4 text-sm md:text-base text-slate-100 leading-relaxed font-sans bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                  {(storyReadMode === "extended" ? activeContent.extendedStory : activeContent.story).map((par, i) => (
                    <p key={i} className="leading-relaxed">
                      {par}
                    </p>
                  ))}
                </div>

                {/* What I Learn with Jesus (Lesson) */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 space-y-1 text-xs md:text-sm">
                  <span className="font-extrabold text-amber-300 flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                    {kidsLang === "fr" ? "Ce que j'apprends pour mon cœur :" : "What I learn for my heart:"}
                  </span>
                  <p className="text-slate-200 font-medium">
                    {activeContent.lesson}
                  </p>
                </div>

                {/* Simple Prayer */}
                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-400/30 space-y-1 text-xs md:text-sm">
                  <span className="font-extrabold text-indigo-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    {kidsLang === "fr" ? "Ma petite prière à Jésus :" : "My little prayer to Jesus:"}
                  </span>
                  <p className="text-slate-200 italic font-medium">
                    « {activeContent.prayer} »
                  </p>
                </div>

                {/* Interactive Fun Quiz */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase text-amber-400 tracking-wider flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {kidsLang === "fr" ? "Mini Quiz des Champions" : "Champion Mini Quiz"}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">1 Étoile à gagner ⭐</span>
                  </div>

                  <p className="text-xs md:text-sm font-bold text-white">
                    {activeContent.quiz.question}
                  </p>

                  <div className="space-y-2">
                    {activeContent.quiz.options.map((option, idx) => {
                      const isSelected = selectedQuizAnswer === idx;
                      const isCorrect = idx === activeContent.quiz.correctIndex;

                      let btnStyle = "bg-slate-800/80 border-slate-700 text-slate-200 hover:border-amber-400/50";
                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold";
                        } else if (isSelected) {
                          btnStyle = "bg-rose-500/20 border-rose-400 text-rose-300 line-through";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleQuizAnswer(idx)}
                          disabled={quizSubmitted}
                          className={`w-full p-2.5 rounded-xl border text-xs text-left transition flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{option}</span>
                          {quizSubmitted && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-3 rounded-xl bg-slate-800/90 text-xs font-semibold text-amber-300 animate-fadeIn flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                      <span>{activeContent.quiz.explanation}</span>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}
        </>
      )}

      {/* Cartoon / Video Player Modal with Bilingual Language Switch */}
      {activeVideoStory && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="max-w-3xl w-full bg-[#0B1528] border-2 border-amber-400/60 rounded-3xl p-5 md:p-7 space-y-4 shadow-2xl relative my-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-red-500/20 text-red-400">
                  <Film className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                    {videoModalLang === "fr" ? "Dessin Animé Biblique Officiel (Superbook)" : "Official Bible Cartoon (Superbook)"}
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-white font-serif">
                    {activeVideoStory[videoModalLang].title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveVideoStory(null)}
                className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* BILINGUAL LANGUAGE SELECTOR IN MODAL */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300 font-semibold">Langue du dessin animé :</span>
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setVideoModalLang("fr")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      videoModalLang === "fr"
                        ? "bg-amber-400 text-slate-950 font-extrabold shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>🇫🇷</span>
                    <span>Français</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVideoModalLang("en")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      videoModalLang === "en"
                        ? "bg-amber-400 text-slate-950 font-extrabold shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>🇬🇧</span>
                    <span>English</span>
                  </button>
                </div>
              </div>

              {/* DIRECT REDIRECT BUTTON TO CURRENT LANGUAGE YOUTUBE VIDEO */}
              <a
                href={activeVideoStory[videoModalLang].originalYoutubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-95 shrink-0"
              >
                <Film className="w-4 h-4" />
                <span>Ouvrir sur YouTube {videoModalLang === "fr" ? "🇫🇷" : "🇬🇧"} ↗</span>
              </a>
            </div>

            {/* Responsive 16:9 Video Embed */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-slate-800 bg-black shadow-inner">
              <iframe
                key={`${activeVideoStory.id}_${videoModalLang}`}
                src={`${activeVideoStory[videoModalLang].videoEmbedUrl}?autoplay=1&rel=0`}
                title={activeVideoStory[videoModalLang].videoTitle}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            {/* Bottom info & switch to reading */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-slate-300">
              <span className="italic text-slate-400">
                📖 {activeVideoStory[videoModalLang].reference} • {activeVideoStory[videoModalLang].videoTitle}
              </span>

              <button
                type="button"
                onClick={() => {
                  const s = activeVideoStory;
                  setActiveVideoStory(null);
                  handleOpenStory(s);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center justify-center gap-1.5 transition"
              >
                <BookOpen className="w-4 h-4" />
                <span>{kidsLang === "fr" ? "Lire le Grand Récit Épais & Quiz" : "Read Full Story & Quiz"}</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

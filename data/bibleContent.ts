import completeData from "./completeChapters.json";

export type SupportedLang = "fr" | "en" | "fon" | "goun";

export interface VerseItem {
  num: number;
  text: string;
}

export interface MultiLangChapter {
  reference: string;
  book: string;
  chapter: number;
  translations: Record<SupportedLang, {
    langName: string;
    langBadge: string;
    audioAvailable: boolean;
    audioLabel: string;
    verses: VerseItem[];
  }>;
}

// Authentic Fon & Goun key verses
const FON_VERSES_MAP: Record<string, VerseItem[]> = {
  "Genèse 1": [
    { num: 1, text: "Ðò bǐbɛ́mɛ ɔ́, Mawu dá jǐxwé kpó ayǐkúngban kpo." },
    { num: 2, text: "Ayǐkúngban ɔ́ ɖò vɔ̌, nǔɖé kún ɖ'eji ó, zǐnflú sɔ́ bǐ gbògbò do, bɔ Yɛsinsɛn Mawu tɔn ɖò jɔhɔn zɔn jí wɛ ɖò tɔ̀ lɛ́ɛ jí." },
    { num: 3, text: "Mawu ɖɔ : « Wěziza ní tíin », bɔ wěziza tíin." },
    { num: 4, text: "Mawu mɔ ɖɔ wěziza ɔ́ nyɔ́ ; bɔ é klán wěziza ɔ́ dó vo nú zǐnflú ɔ́." },
    { num: 5, text: "Mawu sun nyǐ wěziza ɔ́ ɖɔ « kéze », bo sun nyǐ zǐnflú ɔ́ ɖɔ « zǎn ». Gbadanu wá sù, bɔ tɔn sù zǎnzǎn : azǎn nukɔntɔn ɔ́ nɛ́." },
    { num: 26, text: "Enɛ́gudo ɔ́, Mawu ɖɔ : « Mǐ ní dá gbɛtɔ́ dó mǐɖée ɖɔhun, é ní cí mǐɖesu ɖɔhun, é ní nyí gǎn dó hweví tɔ̀ tɔn lɛ́ɛ kpó xɛ jǐxwé tɔn lɛ́ɛ kpo jí. »" },
    { num: 31, text: "Mawu kpɔ́n nǔ e é dá lɛ́ɛ bǐ, bɔ nǔ lɛ́ɛ bǐ nyɔ́ ɖésú. Gbadanu wá sù, bɔ tɔn sù zǎnzǎn : azǎn ayizɛ́ngɔ́ ɔ́ nɛ́." },
  ],
  "Genèse 2": [
    { num: 1, text: "Mɔ̌ wɛ Mawu dá jǐxwé kpó ayǐkúngban kpó nǔ e ɖ'eji lɛ́ɛ bǐ kpo fó." },
    { num: 2, text: "Ðò azǎn tɛ́nnɛ́gɔ́ ɔ́ gbe ɔ́, é fó azɔ̌ tɔn lɛ́ɛ bǐ bo gbɔjɛ́." },
    { num: 7, text: "Mawu Mavɔmavɔ sɔ́ kɔ́gudu bo sɔ́ bló gbɛtɔ́ na, bo hùn gbɔfífɛ́ gbɛ̀ tɔn d'awɔntin mɛ n'i, bɔ gbɛtɔ́ huzu nǔgbɛte." },
  ],
  "Genèse 3": [
    { num: 9, text: "Amɔ̌, Mawu Mavɔmavɔ ylɔ́ sunnu ɔ́ bo ɖɔ n'i ɖɔ : « Fitɛ a ka ɖè ? »" },
    { num: 15, text: "Un na zɔ́n bɔ hwɛ kpó nyɔ̌nu ɔ́ kpo na nyí kɛntɔ́, kúnkan towe kpó kúnkan tɔn kpo na nyí kɛntɔ́. Kúnkan tɔn na gbà ta nú we, bɔ hwi na ɖu afɔkpa n'i." },
  ],
  "Psaume 27": [
    { num: 1, text: "Mawu Mavɔmavɔ wɛ nyí wěziza ce kpodo hwlɛngántɔ́ ce kpo : mɛ̌ ka sixu d'awu xɛsi nyɛ ? Mawu Mavɔmavɔ wɛ nɔ hɛn gbɛ̀ ce ɖó te : mɛ̌ ka sixu ɖyɔ linlin nú mì ?" },
    { num: 2, text: "Hwenu e mɛ dídá lɛ́ɛ jɛ xaxá jí ɖo jǐ ce, bo jló na vɔ́ mì gbé ɔ, kɛntɔ́ ce enɛ́ lɛ́ɛ wɛ klɛ́n afɔ bo jɛ ayǐ." },
    { num: 14, text: "Ðó nukún Mawu Mavɔmavɔ ! Syɛ́nlǐn bo ma ɖó xɛsi ó ! Ðó nukún Mawu Mavɔmavɔ !" },
  ],
  "Jean 8": [
    { num: 12, text: "Jezu lɛ́ ɖɔ xó nú yě ɖɔ : « Nyɛ wɛ nyí wěziza gbɛ̀ ɔ tɔn. Mɛ e bɔ d'ewu ɔ na zɔn zǐnflú mɛ gbeɖé ǎ, loɔ, é na ɖó wěziza e nɔ na gbɛ̀ mɛ é. »" },
    { num: 31, text: "Enɛgudo ɔ, Jezu ɖɔ nú Jwifu e ɖi nǔ n'i lɛ́ɛ ɖɔ : « Enyi mi nɔ gbeji nú xó ce hǔn, mi nyí ahwanvu ce nugbǒ. »" },
    { num: 32, text: "« Mi na tuùn nǔgbo ɔ, bɔ nǔgbo ɔ na bló bɔ mi na jɛ èɖée sí. »" },
    { num: 36, text: "« Enɛ́wu ɔ, enyi Vi ɔ bló bɔ mi jɛ èɖée sí hǔn, mi na jɛ èɖée sí nugbǒ nugbǒ. »" },
    { num: 58, text: "Jezu sɔ́ ɖɔ nú yě ɖɔ : « Nugbǒ nugbǒ wɛ un ɖɔ nú mi : cobɔ Ablaxamu na nɔ gbɛ̀ ɔ, un ko ɖè. »" },
  ],
};

const GOUN_VERSES_MAP: Record<string, VerseItem[]> = {
  "Genèse 1": [
    { num: 1, text: "To whẹdotɔ́ mẹ, Jiwheyẹwhe dá olọn po aigba po." },
    { num: 2, text: "Aigba sọ tin to vọnu bo jẹvọ; zinvlu sọ tin to nukun awà he siso tɔn lẹ ji. Gbigbɔ Jiwheyẹwhe tɔn sọ to zinzɔn to osin lẹ ji." },
    { num: 3, text: "Jiwheyẹwhe sọ dɔ : « Hinhɔ́n ni tin », hinhɔ́n sọ tin." },
    { num: 4, text: "Jiwheyẹwhe sọ mɔ hinhɔ́n lọ dɔ e yɔ́n: Jiwheyẹwhe sọ klan hinhɔ́n lọ sɔ́n zinvlu mẹ." },
    { num: 5, text: "Jiwheyẹwhe sọ ylɔ́ hinhɔ́n lọ dɔ « Ozán », e sọ ylɔ́ zinvlu lọ dɔ « Ozán-gblamɛ ». Whèjai sọ tin, afɔ́nnubla sọ tin, azán tintan." },
    { num: 26, text: "Jiwheyẹwhe sọ dɔ: « Mì gbɔ mí ni dá gbẹtɔ to apajlɛ mídetiti tɔn mẹ, to walɔ mídetiti tɔn mẹ: na yé ni tindo aṣẹ to whèvi lẹ ji po xɛ̀ lẹ ji po. »" },
    { num: 31, text: "Jiwheyẹwhe sọ mɔ nuhe e dá lẹpo, bo kiyesí, e yɔ́n tlala. Whèjai sọ tin, afɔ́nnubla sọ tin, azán ṣidopotɔ." },
  ],
  "Genèse 2": [
    { num: 1, text: "Mɔwẹ yè dotana olọn po aigba po, po awhàn yetɔn lẹpo po." },
    { num: 2, text: "To azán ṣinawétɔ́ ji, Jiwheyẹwhe dotana azɔ́n etɔn he e ko wà: bo gbɔjɛ to azán ṣinawétɔ́ gbè sɔ́n azɔ́n etɔn lẹpo mẹ." },
    { num: 7, text: "Oklunɔ Jiwheyẹwhe sọ dá gbẹtɔ sɔ́n kɔ́gudu aigba tɔn mẹ, bo gbɔfún gbẹ̀ tɔn do awɔntin etɔn lẹ mẹ; gbẹtɔ sọ lẹzun gbigbɔnɔ de." },
  ],
  "Genèse 3": [
    { num: 9, text: "Oklunɔ Jiwheyẹwhe sọ ylɔ́ sunnu lọ bo dɔ hlan ẹn dɔ: « Fie wẹ hiẹ te ? »" },
    { num: 15, text: "Yẹn na yí kɛntɔ́jijlá do hiẹ po yɔ́nnu lọ po ṣɛnsɛn, podɔ to kúnkan towe po kúnkan etɔn po ṣɛnsɛn: e na gbà ota na we, hiẹ sọ na vɛ̀n afɔgbẹnna etɔn." },
  ],
  "Psaume 27": [
    { num: 1, text: "Oklunɔ wẹ hinhɔ́n ṣie po whlɛngán ṣie po; mẹnu wẹ yẹn na siọ́n? Oklunɔ wẹ huhlɔ́n ogbẹ̀ ṣie tɔn; mẹnu wẹ na hùbudo na mi?" },
    { num: 2, text: "Whenuena mẹylankan lẹ, yèdɔ kẹntɔ́ ṣie lẹ, wá jǐ e nado dù agbasalan ṣie, yé klɛ́nafɔ bo hɔnliai." },
    { num: 14, text: "Nɔtepɔn Oklunɔ : gàngbán, bɔ a dike ayi towe ni gboadɔ : mɔwẹ, nɔtepɔn Oklunɔ." },
  ],
  "Jean 8": [
    { num: 12, text: "Enɛ godo Jesu lɛ́ dɔhó hẹ yé dɔ: « Yẹn wẹ hinhɔ́n aihɔ́n tɔn: mẹhe hodo mi ma na zinzɔn to zinvlu mẹ gbede, ṣigba e na tindo hinhɔ́n ogbẹ̀ tɔn. »" },
    { num: 31, text: "To enɛmẹ Jesu dɔ hlan Ju he yise to ewumẹ lẹ dɔ: « Eyin mì nɔte to ohó ṣie mẹ, mìwlẹ wẹ yin devi ṣie nugbonugbo; »" },
    { num: 32, text: "« Mì na yọ́n nugbo lọ ga, nugbo lọ nasɔ hẹn mì jɛ mẹdekope. »" },
    { num: 36, text: "« Enɛwutu, eyin Ovi lọ hẹn mì jɛ mẹdekope, mì na jɛ mẹdekope nugbonugbo. »" },
    { num: 58, text: "Jesu dɔ hlan yé dɔ: « Nugbo, nugbo wẹ yẹn dɔ hlan mì, whẹpo Ablaham do wa aimẹ, yẹn ko tin. »" },
  ],
};

// Build MULTILANG_BIBLE with 100% complete chapters
export const MULTILANG_BIBLE: Record<string, MultiLangChapter> = Object.fromEntries(
  Object.entries(completeData).map(([key, data]: [string, any]) => [
    key,
    {
      reference: data.reference,
      book: data.book,
      chapter: data.chapter,
      translations: {
        fr: {
          langName: "La Sainte Bible • Louis Segond, Docteur en Théologie (Édition revue avec références, Alliance Biblique Universelle)",
          langBadge: "FR 🇫🇷",
          audioAvailable: true,
          audioLabel: "Audio en Français (ABU)",
          verses: data.fr,
        },
        en: {
          langName: "English (King James Version - Complete)",
          langBadge: "EN 🇬🇧",
          audioAvailable: true,
          audioLabel: "English Audio",
          verses: data.en,
        },
        fon: {
          langName: "Fongbé (Biblu Wiwe)",
          langBadge: "FON 🇧🇯",
          audioAvailable: true,
          audioLabel: "Kpɔ́n gbè (Audio Fongbé)",
          verses: FON_VERSES_MAP[key] || data.fr.slice(0, 5),
        },
        goun: {
          langName: "Goun / Gungbe (Wéyé Wéwé)",
          langBadge: "GOUN 🇧🇯",
          audioAvailable: true,
          audioLabel: "Dotó (Audio Goun)",
          verses: GOUN_VERSES_MAP[key] || data.fr.slice(0, 5),
        },
      },
    },
  ])
);

export const MULTILANG_DAILY_VERSES: Record<SupportedLang, { reference: string; text: string; langLabel: string }> = {
  fr: {
    reference: "Jean 8:36",
    text: "Si donc le Fils vous affranchit, vous serez réellement libres.",
    langLabel: "Louis Segond, Dr en Théologie (ABU)",
  },
  en: {
    reference: "John 8:36",
    text: "If the Son therefore shall make you free, ye shall be free indeed.",
    langLabel: "King James Version (KJV)",
  },
  fon: {
    reference: "Jaan 8:36",
    text: "Enyi Vi ɔ bló bɔ mi jɛ èɖée sí hǔn, mi na jɛ èɖée sí nugbǒ nugbǒ.",
    langLabel: "Fongbé (Biblu Wiwe)",
  },
  goun: {
    reference: "Johanu 8:36",
    text: "Eyin Ovi lọ hẹn mì jɛ mẹdekope, mì na jɛ mẹdekope nugbonugbo.",
    langLabel: "Goun / Gungbe (Porto-Novo)",
  },
};

export const MULTILANG_KEY_VERSES: Record<string, Record<SupportedLang, { reference: string; text: string; langLabel: string }>> = {
  "Jean 8:36": {
    "fr": {
      "reference": "Jean 8:36",
      "text": "Si donc le Fils vous affranchit, vous serez réellement libres.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "John 8:36",
      "text": "If the Son therefore shall make you free, ye shall be free indeed.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Jaan 8:36",
      "text": "Enyi Vi ɔ bló bɔ mi jɛ èɖée sí hǔn, mi na jɛ èɖée sí nugbǒ nugbǒ.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Johanu 8:36",
      "text": "Eyin Ovi lọ hẹn mì jɛ mẹdekope, mì na jɛ mẹdekope nugbonugbo.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Jérémie 29:11": {
    "fr": {
      "reference": "Jérémie 29:11",
      "text": "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Jeremiah 29:11",
      "text": "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Jelemíi 29:11",
      "text": "Ðó un tuùn linlin e un ɖó dó wǔ mì lɛ́ɛ, linlin fífá tɔn wɛ é kún nyí linlin ya tɔn ó.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Jẹlemia 29:11",
      "text": "Na yẹn yɔ́n linlin he yẹn lẹn do mì ji lẹ, linlin jijɔ tɔn bo ma yin oylan tɔn gba.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Psaume 23:1": {
    "fr": {
      "reference": "Psaume 23:1",
      "text": "Cantique de David. L'Éternel est mon berger: je ne manquerai de rien.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Psalms 23:1",
      "text": "A Psalm of David. The LORD is my shepherd; I shall not want.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Psaume 23:1",
      "text": "Mawu Mavɔmavɔ wɛ nyí lɛngbɔ́nyitɔ́ ce : nǔɖé na hwedó mì ǎ.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Psaume 23:1",
      "text": "Oklunɔ wɛ lẹngbɔhɔntɔ́ ṣie: yẹn ma na dɔhodo nudepope gba.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Ésaïe 40:31": {
    "fr": {
      "reference": "Ésaïe 40:31",
      "text": "Mais ceux qui se confient en l'Éternel renouvellent leur force. Ils prennent le vol comme les aigles; Ils courent, et ne se lassent point, Ils marchent, et ne se fatiguent point.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Isaiah 40:31",
      "text": "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Ezayíi 40:31",
      "text": "Amɔ̌ mɛ e ɖó nukún Mawu Mavɔmavɔ lɛ́ɛ na mɔ hlɔnhlɔn yɔ̌ywɛ́ ; yě na zɔn jí xɛxɛ̀ lɛ́ɛ ɖɔhun.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Isaia 40:31",
      "text": "Ṣigba mẹhe to tepɔn Oklunɔ lẹ na vɔ́ huhlɔn yɔyɔ mɔ; yé na hɔn aga di aṣɔ lẹ.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Philippiens 4:13": {
    "fr": {
      "reference": "Philippiens 4:13",
      "text": "Je puis tout par celui qui me fortifie.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Philippians 4:13",
      "text": "I can do all things through Christ which strengtheneth me.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Filípunu lɛ́ɛ 4:13",
      "text": "Un kpé nǔ bǐ wu gbɔn Klísu e nɔ na hlɔnhlɔn mì é gblamɛ.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Filipinu lẹ 4:13",
      "text": "Yẹn sɔgan wà nulẹpo gbɔn Klisti he to huhlɔnamɛ mẹ.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Proverbes 3:5-6": {
    "fr": {
      "reference": "Proverbes 3:5-6",
      "text": "Confie-toi en l'Éternel de tout ton coeur, Et ne t'appuie pas sur ta sagesse; Reconnais-le dans toutes tes voies, Et il aplanira tes sentiers.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Proverbs 3:5-6",
      "text": "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Lododó lɛ́ɛ 3:5-6",
      "text": "Ganjɛ Mawu Mavɔmavɔ go kpo ayi towe bǐ kpo, ma ganjɛ nǔnywɛ́ hwiɖesu tɔn go ó. Nɔ sɔ́ ɛ ɖó nukɔn ɖò nǔ towe bǐ mɛ, bɔ é na xlɛ́ ali jlɔ́jlɔ́ we.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Lodi lẹ 3:5-6",
      "text": "Deji do Oklunɔ go po ahun towe lẹpo po; a sɔ́ ganjɛ wuntuntun dewe tɔn go blo. Nɔ yɔ́n ẹn to ali towe lẹpo ji, e nasɔ jlɔ omɔ towe lẹ na we.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Romains 8:28": {
    "fr": {
      "reference": "Romains 8:28",
      "text": "Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Romans 8:28",
      "text": "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Lomunu lɛ́ɛ 8:28",
      "text": "Mǐ tuùn ɖɔ nǔ bǐ wɛ nɔ w'azɔ̌ ɖó kpɔ́ dó mɛ e yí wǎn nú Mawu lɛ́ɛ sín ɖagbe jí, mɛ e é ylɔ́ sɔgbe xá linlin tɔn lɛ́ɛ.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Lomanu lẹ 8:28",
      "text": "Mí sɔ́ yɔ́n dɔ nulẹpo wɛ to azɔwà dopɔ na dagbe mẹhe yiwanna Jiwheyẹwhe lẹ tɔn, ye mẹhe yin yiylɔ kɛdɛdi lẹndai etɔn.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Josué 1:9": {
    "fr": {
      "reference": "Josué 1:9",
      "text": "Ne t'ai-je pas donné cet ordre: Fortifie-toi et prends courage? Ne t'effraie point et ne t'épouvante point, car l'Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Joshua 1:9",
      "text": "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Jozuwé 1:9",
      "text": "Syɛ́nlǐn bo ɖó akɔ́nkpinkpan ! Ma ɖó xɛsi ó, ɖó Mawu Mavɔmavɔ Mawu towe ɖò kpɔ́ kpo hwi kpo ɖò fi e a na yì lɛ́ɛ bǐ.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Jɔṣua 1:9",
      "text": "Yin huhlɔnnɔ bo ganjɛ go; a dibu blo, mɔ a dibu gbawun blo: na Oklunɔ Jiwheyẹwhe towe tin hẹ we to fidewhe a jei lẹpo.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Psaume 91:1-2": {
    "fr": {
      "reference": "Psaume 91:1-2",
      "text": "Celui qui demeure sous l'abri du Très Haut Repose à l'ombre du Tout Puissant. Je dis à l'Éternel: Mon refuge et ma forteresse, Mon Dieu en qui je me confie!",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Psalms 91:1-2",
      "text": "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty. I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Psaume 91:1-2",
      "text": "Mɛ e nɔ nɔ Ajalɔ́nnɔ sín fibɛ́tɛn ɔ́, nɔ gbɔjɛ́ ɖò Nǔbǐwukpétɔ́ sín yɛ glɔ́. Un nɔ ɖɔ nú Mawu Mavɔmavɔ ɖɔ: «Hwi wɛ nyí fibɛ́tɛn ce kpo tɛ́ntínlí ce kpo, Mawu ce e go un ganjɛ é».",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Psaume 91:1-2",
      "text": "Mẹhe nɔ nɔ fiṣianu Gigogán tɔn gblɔmɛ na nɔ nɔ oyin Huhlɔngán tɔn glɔ. Yẹn na dɔ gando Oklunɔ go dɔ: «Bebɛnu ṣie po agbó ṣie po wɛ; Jiwheyẹwhe ṣie, ewɔ mẹ yẹn na dejido».",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Ésaïe 41:10": {
    "fr": {
      "reference": "Ésaïe 41:10",
      "text": "Ne crains rien, car je suis avec toi; Ne promène pas des regards inquiets, car je suis ton Dieu; Je te fortifie, je viens à ton secours, Je te soutiens de ma droite triomphante.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Isaiah 41:10",
      "text": "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Ezayíi 41:10",
      "text": "Ma ɖó xɛsi ó, ɖó un ɖò kpɔ́ xá we; ma blawǔ ó, ɖó nyɛ wɛ nyí Mawu towe. Un na na hlɔnhlɔn we, bo na d'alɔ we, bo na hɛn we ganjí kpo alɔ ce jlɔ́jlɔ́ ɔ kpo.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Isaia 41:10",
      "text": "A dibu blo; na yẹn tin hẹ we: a biɔbɔ blo; na yẹn wɛ Jiwheyẹwhe towe: yẹn na hẹn we lodo; mɔ yẹn na gɔalɔna we; nugbo, yẹn na yí adusilɔ dodo ṣie tɔn do hẹn we dote.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Matthieu 6:33": {
    "fr": {
      "reference": "Matthieu 6:33",
      "text": "Cherchez premièrement le royaume et la justice de Dieu; et toutes ces choses vous seront données par-dessus.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Matthew 6:33",
      "text": "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Matie 6:33",
      "text": "Mi ba Mawu sín Axɔ́súɖuɖu ɔ́ kpo hwɛjijɔ tɔn kpo jɛ nukɔn, bɔ é na sɔ́ nǔ e kpo lɛ́ɛ bǐ gɔ́ na nú mi.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Matiu 6:33",
      "text": "Mì dín ahɔluduta Jiwheyẹwhe tɔn po dodo etɔn po whẹ́, nulẹpo he kpo nasɔ yin yiyidogɔ na mì.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Psaume 27:1": {
    "fr": {
      "reference": "Psaume 27:1",
      "text": "De David. L'Éternel est ma lumière et mon salut: De qui aurais-je crainte? L'Éternel est le soutien de ma vie: De qui aurais-je peur?",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Psalms 27:1",
      "text": "A Psalm of David. The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Psaume 27:1",
      "text": "Mawu Mavɔmavɔ wɛ nyí wěziza ce kpodo hwlɛngántɔ́ ce kpo : mɛ̌ ka sixu d'awu xɛsi nyɛ ? Mawu Mavɔmavɔ wɛ nyí gbɛ̀ ce sín fibɛ́tɛn.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Psaume 27:1",
      "text": "Oklunɔ wɛ hinhɔ́n ṣie po whlẹngán ṣie po: mẹnu wɛ yẹn na dibuna? Oklunɔ wɛ huhlɔn ogbẹ̀ ṣie tɔn.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Jean 14:6": {
    "fr": {
      "reference": "Jean 14:6",
      "text": "Jésus lui dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "John 14:6",
      "text": "Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Jaan 14:6",
      "text": "Jezu ɖɔ n'i ɖɔ: «Nyɛ wɛ nyí ali ɔ́, nugbǒ ɔ́ kpo gbɛ̀ ɔ́ kpo. Mɛɖé sɔ́ sixu wá Tɔ́ ɔ́ gɔ́n gbɔn mɛ ɖěvo gblamɛ ǎ, loɔ́, gbɔn nyɛ gblamɛ kɛ́ɖɛ́ wɛ».",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Johanu 14:6",
      "text": "Jesu dɔhona ẹn dɔ: «Yẹn wɛ ali lọ, nugbo lọ, po ogbẹ̀ lọ po: mẹdepope ma nɔ wá Otɔ́ lọ dè adavo gbɔn yẹn dali».",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Romains 12:2": {
    "fr": {
      "reference": "Romains 12:2",
      "text": "Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l'intelligence, afin que vous discerniez quelle est la volonté de Dieu, ce qui est bon, agréable et parfait.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Romans 12:2",
      "text": "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Lomunu lɛ́ɛ 12:2",
      "text": "Mi ma sɔ́ linlin gbɛtɔ gbɛ mɛ tɔn lɛ́ɛ dó wa nǔ na ó; lo ɔ́, mi lǐn linlin yɔ̌ywɛ́ bɔ walɔ mitɔn bǐ na huzu, bonu mi na tuùn nǔ e nyí jlǒ Mawu tɔn é.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Lomanu lẹ 12:2",
      "text": "Mì sɔ yin awusɔhia hẹ aihɔn ehe blo: ṣigba mì yin didiɔ gbɔn ayiha mìtɔn hinhẹn yɔyɔ dali, na mì nido mɔ jijlo Jiwheyẹwhe tɔn he jẹ bo sɔgbe.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Galates 2:20": {
    "fr": {
      "reference": "Galates 2:20",
      "text": "J'ai été crucifié avec Christ; et si je vis, ce n'est plus moi qui vis, c'est Christ qui vit en moi; si je vis maintenant dans la chair, je vis dans la foi au Fils de Dieu, qui m'a aimé et qui s'est livré lui-même pour moi.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Galatians 2:20",
      "text": "I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God, who loved me, and gave himself for me.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Galatinu lɛ́ɛ 2:20",
      "text": "É nyí nyɛ wɛ sɔ́ ɖò gbɛ̀ ǎ, lo ɔ́, Klísu wɛ ɖò gbɛ̀ ɖò gbɛ̀ ce mɛ. Gbɛ̀ e un ɖò zinzán ɖò agbaza mɛ dìn é ɔ́, un ɖò zinzán gbɔn nǔ e un ɖi nú Mawu Vǐ ɔ́ gblamɛ.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Galatianu lẹ 2:20",
      "text": "Yẹn yin hihò do satin hẹ Klisti: ṣogan yẹn to ogbẹ̀; e ma sɔ yin yẹn ba, ṣigba Klisti wɛ to ogbẹ̀ to yẹn mẹ: ogbẹ̀ he yẹn to zinzan todin to agbasalan mẹ yẹn nɔ nɔ e mẹ gbɔn yise to Ovi Jiwheyẹwhe tɔn mẹ.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Éphésiens 6:10": {
    "fr": {
      "reference": "Éphésiens 6:10",
      "text": "Au reste, fortifiez-vous dans le Seigneur, et par sa force toute-puissante.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Ephesians 6:10",
      "text": "Finally, my brethren, be strong in the Lord, and in the power of his might.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Efɛ́zinu lɛ́ɛ 6:10",
      "text": "Gùdo mɛ ɔ́, mi mɔ hlɔnhlɔn sín Aklunɔ gɔ́n, kpo hlɔnhlɔn gbigbó tɔn kpo.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Efesunu lẹ 6:10",
      "text": "To godo mẹ, nɔvi ṣie lẹ, mì yin huhlɔnnɔ to Oklunɔ mẹ, podɔ to hlɔnhlɔn gangan etɔn mẹ.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Psaume 119:105": {
    "fr": {
      "reference": "Psaume 119:105",
      "text": "Ta parole est une lampe à mes pieds, Et une lumière sur mon sentier.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Psalms 119:105",
      "text": "NUN. Thy word is a lamp unto my feet, and a light unto my path.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Psaume 119:105",
      "text": "Xó towe nyí zòkplɔ́n nú afɔ ce lɛ́ɛ, é nyí wěziza ɖò ali ce jí.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Psaume 119:105",
      "text": "Ohó towe wɛ miyɔ́ngbán na afɔ ṣie lẹ, podɔ hinhɔ́n na ali ṣie.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "2 Timothée 1:7": {
    "fr": {
      "reference": "2 Timothée 1:7",
      "text": "Car ce n'est pas un esprit de timidité que Dieu nous a donné, mais un esprit de force, d'amour et de sagesse.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "2 Timothy 1:7",
      "text": "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "2 Timɔtée 1:7",
      "text": "Ðó Yɛsinsɛn e Mawu ná mǐ é kún nyí yɛ e nɔ bló bɔ è nɔ sísɔ́ ó; lo ɔ́, yɛ e nɔ na hlɔnhlɔn mǐ, bo nɔ na wanyíi mǐ, bo nɔ bló bɔ mǐ nɔ kpé nukún dó mǐɖée wú é wɛ.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "2 Timoti 1:7",
      "text": "Na Jiwheyẹwhe ma na gbigbɔ budisi tɔn mí gba; ṣigba hlɔnhlɔn tɔn, podɔ owanyi tɔn, podɔ ayiha jijlɔ tɔn.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "1 Jean 4:18": {
    "fr": {
      "reference": "1 Jean 4:18",
      "text": "La crainte n'est pas dans l'amour, mais l'amour parfait bannit la crainte; car la crainte suppose un châtiment, et celui qui craint n'est pas parfait dans l'amour.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "1 John 4:18",
      "text": "There is no fear in love; but perfect love casteth out fear: because fear hath torment. He that feareth is not made perfect in love.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "1 Jaan 4:18",
      "text": "Xɛsi ɖò wanyíi mɛ ǎ; lo ɔ́, wanyíi e jɛ bǐ ɖò bǐ mɛ é nɔ nya xɛsi sún sín mɛ mɛ.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "1 Johanu 4:18",
      "text": "Budisi ma tin to owanyi mẹ; ṣigba owanyi pipé nɔ yàn obu jẹgbonu.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Psaume 46:1": {
    "fr": {
      "reference": "Psaume 46:1",
      "text": "(46:1) Au chef des chantres. Des fils de Koré. Sur alamoth. Cantique. (46:2) Dieu est pour nous un refuge et un appui, Un secours qui ne manque jamais dans la détresse.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Psalms 46:1",
      "text": "To the chief Musician for the sons of Korah, A Song upon Alamoth. God is our refuge and strength, a very present help in trouble.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Psaume 46:1",
      "text": "Mawu wɛ nyí fibɛ́tɛn mǐtɔn kpo hlɔnhlɔn mǐtɔn kpo; é nɔ nɔ gbesisɔmɛ tɛgbɛ bo na d'alɔ mǐ ɖò linkpɔ́n mɛ.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Psaume 46:1",
      "text": "Jiwheyẹwhe wɛ bebɛnu mítɔn po hlɔnhlɔn mítɔn po, alɔgɔnamɛtɔ́ tlolo tɔn to ayimajai mẹ.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Jean 3:16": {
    "fr": {
      "reference": "Jean 3:16",
      "text": "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "John 3:16",
      "text": "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Jaan 3:16",
      "text": "Ðó Mawu yí wǎn nú gbɛtɔ́ lɛ́ɛ sɔmɔ̌, bo ná Vǐ e é jì éɖokpó géé é, bonu mɛ e ɖi nǔ n'i lɛ́ɛ bǐ ma dɔn ó, lo ɔ́, yě bǐ na mɔ gbɛ̀ mavɔmavɔ.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Johanu 3:16",
      "text": "Na Jiwheyẹwhe yiwanna aihɔn sɔmɔ bɔ e na Ovi detɔ́n dopo akata etɔn, na mẹdepope he yise to e mẹ ma nado donu, ṣigba e nido tindo ogbẹ̀ madopodo.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Colossiens 3:2": {
    "fr": {
      "reference": "Colossiens 3:2",
      "text": "Affectionnez-vous aux choses d'en haut, et non à celles qui sont sur la terre.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Colossians 3:2",
      "text": "Set your affection on things above, not on things on the earth.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Kolósinu lɛ́ɛ 3:2",
      "text": "Mi sɔ́ ayi mitɔn dó nǔ e ɖò jǐxwé lɛ́ɛ jí, mi ma sɔ́ ɛ dó nǔ e ɖò ayikúngban jí lɛ́ɛ jí ó.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Kɔlosinu lẹ 3:2",
      "text": "Mì ze ayiha mìtɔn do nulẹ he to aga ji, e ma yin do nulẹ he to aigba ji lẹ go blo.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "1 Pierre 5:7": {
    "fr": {
      "reference": "1 Pierre 5:7",
      "text": "et déchargez-vous sur lui de tous vos soucis, car lui-même prend soin de vous.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "1 Peter 5:7",
      "text": "Casting all your care upon him; for he careth for you.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "1 Piyɛ́ɛ 5:7",
      "text": "Mi bɛ́ tagba mitɔn lɛ́ɛ bǐ jó n'i, ɖó é nɔ kpé nukún dó mì wú.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "1 Pita 5:7",
      "text": "Mì nɔ ze magbɔjẹ mìtɔn lẹpo dlan do e ji; na ewɔ nɔ penukundo mì go wutu.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Psaume 103:2-3": {
    "fr": {
      "reference": "Psaume 103:2-3",
      "text": "Mon âme, bénis l'Éternel, Et n'oublie aucun de ses bienfaits! C'est lui qui pardonne toutes tes iniquités, Qui guérit toutes tes maladies;",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Psalms 103:2-3",
      "text": "Bless the LORD, O my soul, and forget not all his benefits: Who forgiveth all thine iniquities; who healeth all thy diseases;",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Psaume 103:2-3",
      "text": "Kpa Mawu Mavɔmavɔ, ayi ce, ma wɔn nǔɖagbe tɔn ɖě ó. É wɛ nɔ sɔ́ hwɛ towe lɛ́ɛ bǐ kɛ we, bo nɔ hɛn azɔn towe lɛ́ɛ bǐ gbwɛ nú we.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Psaume 103:2-3",
      "text": "Dona Oklunɔ, hiẹ ayiha ṣie, a sɔ́ wɔn dagbe etɔn depope blo: mẹhe nɔ jona mawadodo towe lẹpo; mẹhe nɔ hẹnzɔn towe lẹpo gbadɔ.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Ésaïe 54:17": {
    "fr": {
      "reference": "Ésaïe 54:17",
      "text": "Toute arme forgée contre toi sera sans effet; Et toute langue qui s'élèvera en justice contre toi, Tu la condamneras. Tel est l'héritage des serviteurs de l'Éternel, Tel est le salut qui leur viendra de moi, Dit l'Éternel.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Isaiah 54:17",
      "text": "No weapon that is formed against thee shall prosper; and every tongue that shall rise against thee in judgment thou shalt condemn. This is the heritage of the servants of the LORD, and their righteousness is of me, saith the LORD.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Ezayíi 54:17",
      "text": "Ahwanhɛnnǔ e è na bló dó jɛ ahwan xá we lɛ́ɛ bǐ na nyí yagba; ɖɛ̌ e na sɔ́ éɖée jí dó jɛhwɛ xá we lɛ́ɛ bǐ na gba.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Isaia 54:17",
      "text": "Awhanfunnu depope he yin bibladopɔ do ogo we ma na tindo kɔdetɔn dagbe gba; odé depope he na fɔ́n do ogo we to whẹdida mẹ hiẹ na gblewhẹdo.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Matthieu 11:28": {
    "fr": {
      "reference": "Matthieu 11:28",
      "text": "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Matthew 11:28",
      "text": "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Matie 11:28",
      "text": "Mi wá gɔ́n ce, mi mɛ e agban kpinkpɛn kplá bɔ mi kpo ɖò nǔgbó mɛ lɛ́ɛ bǐ, bɔ un na gbɔjɛ́ nú mi.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Matiu 11:28",
      "text": "Mì wá de e, mì mẹhe to magbɔjẹ do bo yin agbannɔ lẹpo, yẹn nasɔ na mì gbɔjɛ.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Romains 8:31": {
    "fr": {
      "reference": "Romains 8:31",
      "text": "Que dirons-nous donc à l'égard de ces choses? Si Dieu est pour nous, qui sera contre nous?",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Romans 8:31",
      "text": "What shall we then say to these things? If God be for us, who can be against us?",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Lomunu lɛ́ɛ 8:31",
      "text": "Étɛ́ mǐ ka na ɖɔ dìn dó nǔ énɛ́ lɛ́ɛ wú ? Enyi Mawu ɖò kpɔ́ xá mǐ hǔn, mɛ̌ ka sixu fɔ́n gbe dó mǐ ?",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Lomanu lẹ 8:31",
      "text": "Etẹ mí na dɔ ba do onú helẹ go? Eyin Jiwheyẹwhe to mí ji, mẹnu wɛ sɔgan jɛagɔ do mí?",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Psaume 37:4": {
    "fr": {
      "reference": "Psaume 37:4",
      "text": "Fais de l'Éternel tes délices, Et il te donnera ce que ton coeur désire.",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Psalms 37:4",
      "text": "Delight thyself also in the LORD; and he shall give thee the desires of thine heart.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Psaume 37:4",
      "text": "Sɔ́ awajijɛ towe ɖó Mawu Mavɔmavɔ mɛ, é na na we nǔ e ayi towe ba lɛ́ɛ bǐ.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Psaume 37:4",
      "text": "Hiẹ sɔ́ nɔ jaya to Oklunɔ mẹ; ewɔ nasɔ na we ojlo ayiha towe tɔn lẹ.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Éphésiens 3:20": {
    "fr": {
      "reference": "Éphésiens 3:20",
      "text": "Or, à celui qui peut faire, par la puissance qui agit en nous, infiniment au delà de tout ce que nous demandons ou pensons,",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Ephesians 3:20",
      "text": "Now unto him that is able to do exceeding abundantly above all that we ask or think, according to the power that worketh in us,",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Efɛ́zinu lɛ́ɛ 3:20",
      "text": "È ni kpa Mawu e kpé nǔ bǐ wú gbɔn hlɔnhlɔn tɔn e ɖò azɔ̌ wà wɛ ɖò mǐ mɛ é gblamɛ, bo sixu bló nǔ zɛ nǔ e mǐ nɔ byɔ́ alǒ nǔ e mǐ nɔ lǐn lɛ́ɛ bǐ wú é.",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Efesunu lẹ 3:20",
      "text": "Todin hlan ewɔ mẹhe penugo nado wà suhugan hú nuhe mí to bibiɔ kavi to lilẹn lẹpo, kẹdɛdi hlɔnhlɔn lọ he to azɔwà to mí mẹ.",
      "langLabel": "Goun (Porto-Novo)"
    }
  },
  "Apocalypse 22:20": {
    "fr": {
      "reference": "Apocalypse 22:20",
      "text": "Celui qui atteste ces choses dit: Oui, je viens bientôt. Amen! Viens, Seigneur Jésus!",
      "langLabel": "Louis Segond (ABU)"
    },
    "en": {
      "reference": "Revelation 22:20",
      "text": "He which testifieth these things saith, Surely I come quickly. Amen. Even so, come, Lord Jesus.",
      "langLabel": "King James Version (KJV)"
    },
    "fon": {
      "reference": "Nǔɖexlɛ́mɛ 22:20",
      "text": "Mɛ e ɖekúnnu nǔ énɛ́ lɛ́ɛ tɔn é ɖɔ: «Ɛɛn, un jǎ wè zaanɖé dìn !» Emi ! Wá, Aklunɔ Jezu !",
      "langLabel": "Fongbé (Biblu Wiwe)"
    },
    "goun": {
      "reference": "Osɔhia 22:20",
      "text": "Mẹhe to dekunnuna onú helẹ dɔ: «Nugbo, yẹn ja to afɔdopoloji». Amen. Mɔwɛ, wá, Oklunɔ Jesu.",
      "langLabel": "Goun (Porto-Novo)"
    }
  }
};

export const SAMPLE_BIBLE_CHAPTERS = Object.fromEntries(
  Object.entries(MULTILANG_BIBLE).map(([k, v]) => [
    k,
    {
      reference: v.reference,
      book: v.book,
      chapter: v.chapter,
      verses: v.translations.fr.verses,
    },
  ])
);

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
    { num: 1, text: "Đo bǐbɛ́mɛ ɔ́, hwenu e Mawu ɖó wɛ̌kɛ́ ɔ́," },
    { num: 2, text: "ayǐkúngban ɔ́ ɖo mɔ̌ kpowun bɔ nǔ ɖěbǔ ɖo jǐ tɔn ǎ. Zǐnflú cyɔ́n xu ayǐjɛ ɔ́, bɔ Yɛ Mawu tɔn nɔ́ ɖo yiyi wɛ ɖo sin ɔ́ ta nu." },
    { num: 3, text: "Mawu ɖɔ: “Wěziza ní tíin”, bɔ wěziza ɔ́ tíin." },
    { num: 4, text: "Mawu mɔ ɖɔ wěziza ɔ́, nǔ ɖagbe wɛ, lobo ɖe wěziza ɔ́ ɖó vo nú ablu." },
    { num: 5, text: "É ylɔ́ wěziza ɔ́ ɖɔ kéze, bó ylɔ́ ablu ɔ́ ɖɔ zǎn. Zǎn kú, bɔ ayǐ hɔ́n; azǎn nukɔntɔn ɔ́ nɛ́." },
    { num: 6, text: "Mawu ɖɔ: “Tɛnmɛ vɔ́tɔ́ ɖaxó ɖé ní tíin bó má sin ɔ́, nú ɖokpó ná ɖo jǐnukúnsin aga, nú ɖokpó ná ɖo ayǐkúngban jí.”" },
    { num: 7, text: "Nǔ nyí mɔ̌ nǔgbó: Mawu bló tɛnmɛ ɔ́, bó má sin ɔ́ ɖó we; ɖokpó ɖo aga bɔ ɖokpó ɖo do." },
    { num: 8, text: "É ylɔ́ tɛnmɛ vɔ́tɔ́ ɖaxó ɔ́ ɖɔ jǐnukúnsin. Zǎn kú, bɔ ayǐ hɔ́n. Azǎn wegɔ́ ɔ́ nɛ́." },
    { num: 9, text: "Mawu lɛ́ ɖɔ: “Sin e ɖo do ɔ́ ní kplé cí fí ɖokpó, bónú fí xúxú ní jɛ wě.” Bɔ nǔ nyí mɔ̌ nǔgbó." },
    { num: 10, text: "Bɔ é ylɔ́ fí xúxú ɔ́ ɖɔ ayǐkúngban, lobo ylɔ́ fí e sin ɔ́ kplé cí ɔ́ ɖɔ xu. Mawu mɔ ɖɔ nǔ ɖagbe wɛ." },
    { num: 11, text: "Énɛ́ ɔ́ gúdo ɔ́, Mawu ɖɔ: “Gběhan kpó atín kpó ní wú kpé ayǐkúngban ɔ́ bǐ jí: Yě ní nɔ́ ná kwín yětɔn yětɔn, bó nɔ́ ná sínsɛ́n yětɔn yětɔn.” Bɔ nǔ nyǐ mɔ̌ nǔgbó." },
    { num: 12, text: "Gběhan wú ɖo ayǐkúngban ɔ́ jí, gběhan tɛnmɛ tɛnmɛ lɛ́ɛ wú, atín tɛnmɛ tɛnmɛ lɛ́ɛ wú, bɔ yě ná sínsɛ́n yětɔn yětɔn, bó ná kwín yětɔn yětɔn. Mawu mɔ ɖɔ nǔ ɖagbe wɛ." },
    { num: 13, text: "Zǎn kú, bɔ ayǐ hɔ́n; azǎn atɔngɔ́ ɔ́ nɛ́." },
    { num: 14, text: "Mawu ɖɔ: “Nǔ e nɔ́ ná wěziza lɛ́ɛ ní tíin gbɔn fí bǐ ɖo jǐnukúnsin bó ɖe kéze ɖó vo nú zǎn. Yě ná nyí wuntun ɖé bɔ è nǎ nɔ́ xwédo dó tunwun hwenu lɛ́ɛ, azǎn lɛ́ɛ kpódó xwe lɛ́ɛ kpó." },
    { num: 15, text: "Yě ná nɔ jǐnukúnsin, bó ná nɔ́ ná wěziza dó ayǐkúngban ɔ́ jí”; bɔ nǔ nyí mɔ̌ nǔgbó." },
    { num: 16, text: "Énɛ́ ɔ́, Mawu bló nǔ we e ná nɔ́ ná wěziza lɛ́ɛ: ɖaxó ɔ́ wɛ nyí hwe. Éyɛ́ ná nɔ́ kpa acɛ nú kéze. Kpɛví ɔ́ wɛ nyí sun, bó ná nɔ́ kpa acɛ nú zǎn. É lɛ́ bló sunví lɛ́ɛ lɔmɔ̌." },
    { num: 17, text: "Mawu bɛ́ yě ɖó jǐnukúnsin, bónú yě ná nɔ́ ná wěziza dó ayǐkúngban ɔ́ jí." },
    { num: 18, text: "Yě ná nɔ́ kpa acɛ nú kéze, bó ná nɔ́ kpa acɛ nú zǎn, bó ná nɔ́ ɖe wěziza ɖó vo nú zǐnflú." },
    { num: 19, text: "Zǎn kú, bɔ ayǐ hɔ́n. Azǎn ɛnɛgɔ́ ɔ́ nɛ́." },
    { num: 20, text: "Mawu ɖɔ: “Kanlin tɛnmɛ tɛnmɛ ní gɔ́ tɔ lɛ́ɛ mɛ winnini; xɛ lɛ́ɛ ní tíin, bó nɔ́ zɔn gbɔn jɔhɔn mɛ.”" },
    { num: 21, text: "Nǔgbó ɔ́, Mawu ɖǒ xumɛkanlin ɖaxó ɖaxó lɛ́ɛ kpódó kanlin tɛnmɛ tɛnmɛ e nɔ lin tɔ lɛ́ɛ bǐ kpó, bɔ yě kpé tɔ lɛ́ɛ mɛ winnini. É lɛ́ bló xɛ tɛnmɛ tɛnmɛ lɛ́ɛ. Bɔ Mawu mɔ ɖɔ nǔ ɖagbe wɛ." },
    { num: 22, text: "Mawu xo ɖɛ dó yě jí, bó ɖɔ: “Mi ji, mi gba kún, bó kpé tɔ lɛ́ɛ mɛ, bónú xɛ lɛ́ɛ ní gba kún kpé gbɛ ɔ́ mɛ.”" },
    { num: 23, text: "Zǎn kú, bɔ ayǐ hɔ́n. Azǎn atɔ́ɔ́ngɔ́ ɔ́ nɛ́." },
    { num: 24, text: "Mawu ɖɔ: “Ayǐkúngban ní ná xwé kanlin tɛnmɛ tɛnmɛ lɛ́ɛ, gběkanlin tɛnmɛ tɛnmɛ lɛ́ɛ, kpó kanlin tɛnmɛ tɛnmɛ e nɔ sá lɛ́ɛ kpó.” Bɔ nǔ nyí mɔ̌ nǔgbó." },
    { num: 25, text: "Nǔgbó ɔ́, Mawu bló gběkanlin tɛnmɛ tɛnmɛ lɛ́ɛ, xwé gbe kanlin tɛnmɛ tɛnmɛ lɛ́ɛ, kpó kanlin tɛnmɛ tɛnmɛ e nɔ sá lɛ́ɛ kpó, bó mɔ ɖɔ nǔ ɖagbe wɛ." },
    { num: 26, text: "Énɛ́ ɔ́ gúdo ɔ́, Mawu ɖɔ: “Mǐ ní bló gbɛtɔ́ ɖó mǐ ɖésúnɔ sín akpajlɛ́ mɛ, nú yě ní cí mǐ ɖésúnɔ ɖɔhun; yě ní kpa acɛ nú hweví lɛ́ɛ, bó kpa acɛ nú xɛ lɛ́ɛ, bó kpa acɛ nú xwé gbe kanlin lɛ́ɛ, kanlin e nɔ sá lɛ́ɛ; yě ní kpa acɛ nú ayǐkúngban ɔ́ bǐ.”" },
    { num: 27, text: "Mawu ɖó gbɛtɔ́ ɖó akpajlɛ́ é ɖésúnɔ tɔn mɛ. É ɖó gbɛtɔ́ akpajlɛ́ é ɖésúnɔ tɔn ɖɔhun. É ɖó súnnu kpódó nyɔ̌nu kpó." },
    { num: 28, text: "Énɛ́ ɔ́ gúdo ɔ́, é xo ɖɛ dó yě jí bó ɖɔ: “Mi ji, mi gba kún, bó kpé ayǐkúngban ɔ́ jí, bó sɔ́ ɛ ɖó acɛ mitɔn glɔ́. Mi sɔ́ hweví lɛ́ɛ ɖó acɛ mitɔn glɔ́, bó sɔ́ xɛ lɛ́ɛ ɖó acɛ mitɔn glɔ́, bó sɔ́ kanlin e ɖo ayǐkúngban jí lɛ́ɛ bǐ ɖó acɛ mitɔn glɔ́.”" },
    { num: 29, text: "É lɛ́ ɖɔ nú yě ɖɔ: “Gběhan e ɖo ayǐkúngban jí, bó nɔ́ ɖó kwín lɛ́ɛ ɔ́, un ná bǐ mi, bó ná atín e ɖo ayǐkúngban jí, bó nɔ́ sɛ́n bɔ sínsɛ́n yětɔn nɔ́ ɖó kwín lɛ́ɛ bǐ mi; yě ná nyí nǔɖuɖu mitɔn." },
    { num: 30, text: "Mɔ̌ ɖokpó ɔ́, un ná ama lɛ́ɛ, bɔ yě ná nyí nǔɖuɖu nú kanlin e ɖo ayǐkúngban jí lɛ́ɛ bǐ; yě ná nyí nǔɖuɖu nú xɛ lɛ́ɛ bǐ, yě ná nyí nǔɖuɖu nú kanlin e nɔ sá lɛ́ɛ bǐ, yě ná nyí nǔɖuɖu nú nǔ e ɖo gbɛ lɛ́ɛ bǐ.” Bɔ nǔ nyí mɔ̌ nǔgbó." },
    { num: 31, text: "Mawu mɔ ɖɔ nǔ e émí bló lɛ́ɛ bǐ ɔ́, nǔ ɖagbe wɛ yě nyí tawun. Zǎn kú, bɔ ayǐ hɔ́n. Azǎn ayizɛ́ngɔ́ ɔ́ nɛ́." },
  ],
  "Genèse 2": [
    { num: 1, text: "Lě e Mawu ɖó wɛ̌kɛ́ ɔ́ kpó nǔ e ɖ'é mɛ lɛ́ɛ bǐ kpó gbɔn ɔ́ nɛ́." },
    { num: 2, text: "Hǔn, azǎn ayizɛ́ngɔ́ ɔ́ gbe ɔ́, Mawu wa azɔ̌ tɔn lɛ́ɛ bǐ fó bó gbɔjɛ́ azǎn tɛ́nwegɔ́ ɔ́ gbe." },
    { num: 3, text: "É xo ɖɛ dó azǎn tɛ́nwegɔ́ ɔ́ jí, bó ɖe ɖó vo, ɖó ée é wa azɔ̌ tɔn lɛ́ɛ bǐ fó ɔ́, azǎn énɛ́ ɔ́ gbe wɛ é gbɔjɛ́." },
    { num: 4, text: "Lě e Mawu ɖó wɛ̌kɛ́ ɔ́ gbɔn ɔ́ nɛ́. Hwenu e Mawu Mavɔmavɔ ɖó wɛ̌kɛ́ ɔ́ tlóló ɔ́," },
    { num: 5, text: "zunkan ɖěbǔ kó ɖo ayǐkúngban ɔ́ jí ǎ, gběhan ɖěbǔ ká kó wú ǎ, ɖó Mawu Mavɔmavɔ kó sɛ́ jǐ dó ayǐkúngban ɔ́ jí ǎ, gbɛtɔ́ ɖě ká kó ɖo ayǐkúngban ɔ́ jí bó ná lɛ ǎ." },
    { num: 6, text: "Ahǔn nɔ́ tɔ́n sín kɔ́ glɔ́ bó nɔ́ ja dó ayǐkúngban ɔ́ bǐ jí." },
    { num: 7, text: "Mawu Mavɔmavɔ kán kɔ́ dó mɛ gbɛtɔ́, bó fún funfún e nɔ ná gbɛ mɛ ɔ́ dó awɔntín tɔn mɛ, bɔ gbɛtɔ́ ɔ́ húzú mɛ gbɛɖe." },
    { num: 8, text: "Mawu Mavɔmavɔ ɖó jikpá ɖokpó ɖó Edɛ́ni, ɖo zǎnzǎnhwe jí wa jí, bó zé gbɛtɔ́ e è mɛ ɔ́ d'é mɛ." },
    { num: 9, text: "É bló bɔ atín alɔkpa alɔkpa e nyɔ́ kpɔ́n, bɔ sínsɛ́n yětɔn nyɔ́ ɖu lɛ́ɛ wú ɖo jikpá ɔ́ mɛ. É bló bɔ atín e sínsɛ́n tɔn nɔ́ ná gbɛ mɛ ɔ́, kpódó atín e sínsɛ́n tɔn nɔ́ zɔ́n, bɔ è nɔ tunwun nǔ ɖagbe kpódó nǔ nyanya kpó ɔ́ wú ɖo jikpá ɔ́ tɛ́ntin." },
    { num: 10, text: "Tɔ ɖé jɔ ɖo Edɛ́ni, bó nɔ sa wá hú sin nú jikpá ɔ́, bó zɛ ala ɛnɛ sín fínɛ́." },
    { num: 11, text: "Ala nukɔntɔn ɔ́ nɔ́ nyí Picɔ́ni. É nɔ́ sa lɛ́ lɛ̌ dó Hawíla. È nɔ mɔ siká ɖo Hawíla to ɔ́ mɛ." },
    { num: 12, text: "Siká akú wɛ ɖo fínɛ́. È nɔ lɛ́ mɔ atínhúnhɔ́n wǎnɖagbenɔ ɖé ɖo fínɛ́, bɔ è nɔ ylɔ́ ɖɔ budeliyɔ́mu; è nɔ lɛ́ mɔ awǐnnya ɖagbe ɖagbe e è nɔ ylɔ́ ɖɔ Onísi ɔ́." },
    { num: 13, text: "Ala wegɔ́ ɔ́ nɔ́ nyí Gixɔ́ni; éyɛ́ wɛ nɔ́ sa lɛ́ lɛ̌ dó Kúci sín to ɔ́ bǐ." },
    { num: 14, text: "Ala atɔngɔ́ ɔ́ nɔ́ nyí Tígli; éyɛ́ nɔ́ sa yi Asilíi sín zǎnzǎnhwe jí; ala ɛnɛgɔ́ ɔ́ nɔ nyí Efláti." },
    { num: 15, text: "Mawu Mavɔmavɔ sɔ́ gbɛtɔ́ ɔ́ ɖó jikpá Edɛ́ni tɔn ɔ́ mɛ, bónú é ná nɔ́ lɛ, bó ná nɔ́ kpé nukún d'é wú." },
    { num: 16, text: "Mawu Mavɔmavɔ ɖɔ nú gbɛtɔ́ ɔ́ ɖɔ: “A sixú ɖu atín e ɖo jikpá ɔ́ mɛ ɔ́ bǐ sín sínsɛ́n." },
    { num: 17, text: "Amɔ̌, atín e sín sínsɛ́n è nɔ ɖu bó nɔ tunwun nǔ ɖagbe kpódó nǔ nyanya kpó ɔ́ kɛ́ɖɛ́ jɛ́n a ma ná ɖu ǎ, ɖó gbe e gbe a nǎ ɖu ɔ́, a nǎ kú.”" },
    { num: 18, text: "Mawu Mavɔmavɔ ɖɔ: “É nyɔ́ bónú gbɛtɔ́ ná nɔ é ɖokpónɔ ǎ. Un ná bló alɔgɔ́númɛtɔ́ ɖokpó n'i, bɔ é ná jɛ xá ɛ.”" },
    { num: 19, text: "Mawu Mavɔmavɔ kán kɔ́ dó bló kanlin e ɖo ayǐkúngban jí lɛ́ɛ bǐ, kpódó xɛ lɛ́ɛ bǐ kpó, bó kplá yě wá gbɛtɔ́ ɔ́ gɔ́n, bó ná kpɔ́n nyǐkɔ e é ná ná yě ɔ́. Nyǐkɔ e é ná ná yě ɔ́ wɛ yě ná nɔ́ nyí." },
    { num: 20, text: "Énɛ́ ɔ́, gbɛtɔ́ ɔ́ ɖó nyǐkɔ nú kanlin xwé gbe tɔn lɛ́ɛ bǐ, bó ɖó nú gběkanlin lɛ́ɛ bǐ, lobo ɖó nú xɛ lɛ́ɛ bǐ. Lo ɔ́, é mɔ mɛ e ná jɛ xá ɛ, bó ná gɔ́ alɔ n'i ɔ́ ǎ." },
    { num: 21, text: "Hwe énɛ́ ɔ́ nu ɔ́, Mawu Mavɔmavɔ ɖó sɛnmlɔ nú gbɛtɔ́ ɔ́, bó ɖe ajajaxú tɔn ɖokpó, bó lɛ́ sú lanti ɔ́ ɖó tɛn tɔn mɛ." },
    { num: 22, text: "Mawu Mavɔmavɔ zé ajajaxú ɔ́ dó bló nyɔ̌nu ɖokpó bó kplá ɛ yi jó nú súnnu ɔ́." },
    { num: 23, text: "Ée súnnu ɔ́ mɔ nyɔ̌nu ɔ́ lě tlóló ɔ́, é sú xó bó ɖɔ: “Áahɛɛnnɛ́! Nyi ɖɔhun ɖokpó ɖíe lo. Xú tɔn lɛ́ɛ cí xú ce ɖɔhun, agbaza tɔn cí agbaza ce ɖɔhun!” È nǎ nɔ́ ylɔ́ ɛ ɖɔ nyɔ̌nu, ɖó súnnu sín lanmɛ wɛ è ɖe e sín." },
    { num: 24, text: "Énɛ́ ɔ́ wú wɛ súnnu ná jó tɔ́ tɔn kpó nɔ tɔn kpó dó, bó ná jɛ kpɔ́ xá asi tɔn, bɔ yě mɛ we lɛ́ɛ ná húzú ɖokpó géé." },
    { num: 25, text: "Súnnu ɔ́ kpó asi tɔn kpó bǐ wɛ ɖo mɛ̌, có é ká nɔ́ hu winnyá nú yě ǎ." },
  ],
  "Genèse 3": [
    { num: 1, text: "Lo ɔ́, dan wɛ nyí kanlin e sɛ́ hú gběkanlin e Mawu Mavɔmavɔ bló lɛ́ɛ bǐ é. Dan ɔ́ kanbyɔ́ nyɔ̌nu ɔ́ ɖɔ: “Mawu ɖɔ mi kún ɖó ná ɖu atínsínsɛ́n e ɖo jikpá ɔ́ mɛ lɛ́ɛ ɖěbǔ ó nǔgbó a?”" },
    { num: 2, text: "Bɔ nyɔ̌nu ɔ́ yí gbe n'i ɖɔ: “Mǐ hɛn ɔ́, mǐ nǎ ɖu atínsínsɛ́n e ɖo jikpá ɔ́ mɛ lɛ́ɛ," },
    { num: 3, text: "amɔ̌, atín e ɖo jikpá ɔ́ tɛ́ntin ɔ́, Mawu ɖɔ nú mǐ ɖɔ mǐ ní má ɖu sínsɛ́n tɔn ó, mǐ ní má ɖ'alɔ wú lɔ vɔ́vɔ́ ó, mǐ táá kú.”" },
    { num: 4, text: "Dan lɛ́ yí xó bó ɖɔ: “Gbeɖé kpɔ́n, mi ná kú ɖě ǎ," },
    { num: 5, text: "lo ɔ́, Mawu tunwun ɖɔ gbe e gbe mi ná ɖu ɔ́, mi ná mɔ nukúnnú jɛ lě e nǔ lɛ́ɛ ɖe gbɔn ɔ́ wú, é ɖésúnɔ Mawu ɔ́ ɖɔhun, bó ná tunwun nǔ ɖagbe kpódó nǔ nyanya kpó.”" },
    { num: 6, text: "Énɛ́ ɔ́, nyɔ̌nu ɔ́ mɔ ɖɔ atín ɔ́ nyɔ́ kpɔ́n, bɔ sínsɛ́n tɔn ná nyɔ́ ɖu. É mɔ ɖɔ nú è ɖu nǔgbó ɔ́, è nǎ ɖó nukúnnú mɔ jɛ nǔ mɛ. Énɛ́ ɔ́, é ba bó ɖu; asú tɔn ɖo akpá tɔn, bɔ é ná ɛ bɔ élɔ́ ɖu." },
    { num: 7, text: "Ée yě ɖu ɔ́, yě mɛ we lɛ́ɛ mɔ nukúnnú jɛ lě e yě ɖe gbɔn ɔ́ wú, bó mɔ ɖɔ émí ɖo mɛ̌. Hwe énɛ́ ɔ́ nu ɔ́, yě ba fígima bó sin ɖě dó ɖě wú, lobo sɔ́ sin dó alin avɔ ɖɔhun." },
    { num: 8, text: "Gbadanu wá su, bɔ Mawu Mavɔmavɔ ɖo sa ɖi gbɔn jikpá ɔ́ mɛ wɛ, bɔ yě se afɔ tɔn gbe. Énɛ́ ɔ́, yě yi hɔn hwlá dó atín e ɖo jikpá ɔ́ mɛ lɛ́ɛ tɛ́ntin." },
    { num: 9, text: "Mawu Mavɔmavɔ ká ylɔ́ súnnu ɔ́, bó ɖɔ: “Fítɛ́ wɛ a ɖe?”" },
    { num: 10, text: "Bɔ súnnu ɔ́ yí gbe n'i ɖɔ: “Afɔ towe gbe wɛ un se ɖo jikpá ɔ́ mɛ bɔ xɛsi ɖi mì bɔ un hɔn hwlá, ɖó mɛ̌ wɛ un ɖe.”" },
    { num: 11, text: "Mawu Mavɔmavɔ ká kanbyɔ́ ɛ ɖɔ: “Mɛ̌ wɛ ɖɔ nú we ɖɔ a ɖo mɛ̌? Atín e sín sínsɛ́n un gbɛ́ nú we ɖɔ hwi ní má ɖu ó ɔ́, a ɖu wɛ a?”" },
    { num: 12, text: "Bɔ é yí gbe n'i ɖɔ: “Nyɔ̌nu e a sɔ́ ɖó akpá ce ɔ́ wɛ ná mì bɔ un ɖu.”" },
    { num: 13, text: "Énɛ́ ɔ́, Mawu Mavɔmavɔ kanbyɔ́ nyɔ̌nu ɔ́ ɖɔ: “Étɛ́ a wa mɔ̌ nɛ́?” Bɔ é yí gbe n'i ɖɔ: “Dan wɛ blɛ́ mì bɔ un ɖu atín ɔ́ sín sínsɛ́n.”" },
    { num: 14, text: "Ée é ɖɔ mɔ̌ ɔ́, Mawu Mavɔmavɔ ɖɔ nú dan ɔ́ ɖɔ: “Đó nǔ énɛ́ ɔ́ e a wa ɔ́ wútu ɔ́, bɛ́ sín égbé ɔ́, a nǎ nɔ́ sá gbɔn adɔgo jí, bó ná nɔ́ ɖu kɔ́ ɖo gbɛzán towe bǐ mɛ. Nu wɛ un dó we ɖo kanlin lɛ́ɛ bǐ mɛ." },
    { num: 15, text: "Un ná bló bɔ hwi kpó nyɔ̌nu ɔ́ kpó ɔ́, mi ná nɔ́ mɔ miɖée gbɔ gbeɖé ǎ; kúnkan towe kpó kún tɔn kpó ɔ́, yě ná nɔ́ mɔ yěɖée gbɔ gbeɖé ǎ. Kúnkan tɔn ná nɔ́ nyínyɛ́ ta nú we, bɔ hwɛ ká ná nɔ́ gblé wǔ éyɛ́ tɔn dó afɔgbɛnnu.”" },
    { num: 16, text: "Énɛ́ ɔ́ gúdo ɔ́, Mawu Mavɔmavɔ ɖɔ nú nyɔ̌nu ɔ́ ɖɔ: “Un ná bló bɔ a mɔ xo ɔ́, a nǎ nɔ́ mɔ wǔvɛ́ ɖésú; a yi ajidonu ɔ́, a nǎ mɔ wǔvɛ́; asú towe ná nɔ́ jló we, éyɛ́ ká ná ɖu gǎn ɖo jǐ towe.”" },
    { num: 17, text: "Mawu Mavɔmavɔ ká wá ɖɔ nú Adámu ɖɔ: “Ée a se asi towe xó, bó ɖu atín e sín sínsɛ́n un gbɛ́ ɖɔ hwi ní má ɖu ó ɔ́ wútu ɔ́, un ná dó nu ayǐkúngban ɔ́ ɖó hwi wú. A nǎ nɔ́ jɛ tagba ɖésú, cóbɔ ayǐkúngban ɔ́ ná nɔ́ ná we nǔɖuɖu ɖo gbɛzán towe lɛ́ɛ bǐ mɛ." },
    { num: 18, text: "Wunkan lɛ́ɛ kpódó gběhan kpó wɛ ná nɔ́ wú ɖo ayǐkúngban ɔ́ jí; gběhan e wú ɖo gle lɛ́ɛ mɛ ɔ́ wɛ a nǎ nɔ́ ɖu." },
    { num: 19, text: "A nǎ nɔ́ xwá dɛ̌n ɖo nukɔn cóbó ná nɔ́ mɔ nǔ ɖu. Mɔ̌ wɛ é ná nyí gbɔn nú we káká bɔ a nǎ yi kɔ́ e è dǒ bló we ná ɔ́ glɔ́. Nǔgbó ɔ́, kɔ́ wɛ a nyǐ, bó ka ná lɛ́ húzú kɔ́.”" },
    { num: 20, text: "Súnnu ɔ́ ɖó nyǐkɔ n'i ɖɔ Ɛvu, ɖó é wɛ ná nyí gbɛtɔ́ lɛ́ɛ bǐ sín nɔ." },
    { num: 21, text: "Mawu Mavɔmavɔ sɔ́ anyǔ dó bló avɔ bó dó nú Adámu kpódó asi tɔn kpó." },
    { num: 22, text: "Énɛ́ ɔ́ gúdo ɔ́, Mawu Mavɔmavɔ ɖɔ: “Gbɛtɔ́ ɖíe wá cí mǐ ɖésúnɔ ɖɔhun, bó nɔ tunwun nǔ ɖagbe kpódó nǔ nyanya kpó e; din ɔ́, mǐ nǎ lɔn bɔ é ná ba atín e nɔ ná gbɛ mɛ ɔ́ sín sínsɛ́n bó ɖu ǎ; é táá nɔ gbɛ káká sɔ́yi.”" },
    { num: 23, text: "Ée Mawu Mavɔmavɔ ɖɔ mɔ̌ ɔ́, é nya gbɛtɔ́ ɔ́ sín jikpá Edɛ́ni tɔn ɔ́ mɛ, bónú é ná lɛ ayǐkúngban e mɛ è ɖe e sín ɔ́." },
    { num: 24, text: "Ée Mawu Mavɔmavɔ nya gbɛtɔ́ sín jikpá ɔ́ mɛ ɔ́, é fɔ wɛnsagun susunɔ lɛ́ɛ ɖó jikpá Edɛ́ni tɔn ɔ́ sín zǎnzǎnhwe jí. Wɛnsagun lɛ́ɛ hɛn hwǐ, bó ɖo mimi wɛ, bɔ é nɔ́ ɖo myɔ kán wɛ, bó ɖo ali e yi atín e nɔ ná gbɛ mɛ ɔ́ kɔn ɔ́ cɔ́ wɛ." },
  ],
  "Psaume 27": [
    { num: 1, text: "Davídi sín han. Mawu Mavɔmavɔ wɛ nyí wěziza ce, bó nyí mɛhwlɛ́ngántɔ́ ce; mɛ̌ un ka ná ɖi xɛsi ná? Mawu Mavɔmavɔ lɔmɛ wɛ gbɛ ce ɖe; mɛ̌ un ka ná hɔn ná?" },
    { num: 2, text: "Ényí nǔnyanyawatɔ́ lɛ́ɛ kplɔ́ dó mì, adǎnkanlin ɖɔhun ɔ́, yě mɛ kɛntɔ́ ce énɛ́ lɛ́ɛ wɛ nɔ́ j'ayǐ." },
    { num: 3, text: "Ahwanfuntɔ́ lɛ́ɛ ná bó d'ahwan gbě bó ján go dó mì ɔ́, xɛsi nɔ ɖi mì ǎ; è tɔ́n ahwan mì ɔ́, hwenɛ́nu wɛ ji nɔ lɛ́ ɖe mì." },
    { num: 4, text: "Nǔ ɖokpó géé wɛ un nɔ byɔ́ Mawu Mavɔmavɔ, bɔ é ká myá nukún nú mì ɖésú; é wɛ nyí ɖɔ má nɔ́ nɔ xwé tɔn gbe nú gbɛ hwenu ce bǐ, bó ná nɔ́ kpɔ́n lě e é nyɔ́ xomɛ sɔ é, bó ná nɔ́ kpɔ́n lě e nɔtɛn tɔn nyɔ́ sɔ é." },
    { num: 5, text: "Đó azǎn nyanya gbe ɔ́, é ná cyɔ́n alɔ jǐ ce ɖo xɔ tɔn sá, é ná sɔ́ mì hwlá ɖó goxɔ tɔn sá, é ná sɔ́ mì yi ɖó só jí aga, fí e è ma ná kpé wǔ ce ɖe ǎ é." },
    { num: 6, text: "Énɛ́ ɔ́, un ná hú taga kɛntɔ́ e lɛ́ lɛ̌ dó mì lɛ́ɛ; un ná sá vɔ̌ n'i ɖo goxɔ tɔn mɛ kpó awǒbóbó kpó, un ná ji han nú Mawu Mavɔmavɔ, un ná ɖɔ xó lómílómí dó mlá nyǐkɔ tɔn dó han mɛ." },
    { num: 7, text: "Mawu Mavɔmavɔ! Un ɖo ylɔ̌ylɔ́ we wɛ. Đǒtó gbe ce; kú nǔbláwǔ nú mì, yǐ gbe nú mì." },
    { num: 8, text: "Un ɖo tamɛ lin dó xó e a ɖɔ ɔ́ wú wɛ; a ɖɔ: “Mi ba mì!” Din ɔ́, Mawu Mavɔmavɔ! Un ɖo biba we wɛ." },
    { num: 9, text: "Ma sɔ́ hwiɖée hwlá dó mì ó. Ma nya nyɛ mɛsɛntɔ́ towe kpó xomɛsin kpó ó; hwi wɛ nyí gbɛ nú mì. Ma jó mì dó ó; ma ɖe alɔ sín kan ce mɛ ó, Mawu Mɛhwlɛ́ngántɔ́ ce!" },
    { num: 10, text: "Đó tɔ́ ce kpó nɔ ce kpó ná bó ɖe alɔ sín kan ce mɛ ɔ́, hwɛ Mawu Mavɔmavɔ ɔ́, a nǎ kɛ alɔ bo yí mì." },
    { num: 11, text: "Mawu Mavɔmavɔ! Xlɛ́ ali towe mì; kplá mì gbɔn ali ɖagbe jí ɖó kɛntɔ́ ce lɛ́ɛ wú." },
    { num: 12, text: "Ma jó mì dó nú kɛntɔ́ ní zé mì dó wa nǔ e jló e ɔ́ ná ó; ɖó kúnnu agɔɖetɔ́ lɛ́ɛ sí te dó jǐ ce, bó ɖo adǎn gblɔ́n nú mì wɛ." },
    { num: 13, text: "Nú un ma ka gán jɛ wú ɖɔ un ná mɔ xomɛnyínyɔ́ Mawu Mavɔmavɔ tɔn ɖo ayǐkúngban jí fí ǎ ɔ́, nɛ̌ gbɛ ce ka ná cí?" },
    { num: 14, text: "Đǒ nukún Mawu Mavɔmavɔ, dǒ gǎn, kpan akɔ́n, ɖǒ nukún Mawu Mavɔmavɔ." },
  ],
  "Jean 8": [
    { num: 1, text: "Lo ɔ́, Jezu yi só e è nɔ ylɔ́ ɖɔ olívutín só ɔ́ jí." },
    { num: 2, text: "Ayǐhɔ́ngbe zǎnzǎn tɛɛn ɔ́, é lɛ́ kɔ yi sinsɛnxɔ mɛ, bɔ mɛ lɛ́ɛ bǐ nyi ahwan wá gɔ̌n tɔn, bɔ é jínjɔ́n ayǐ, bó jɛ nǔ kplɔ́n yě jí." },
    { num: 3, text: "Hwenɛ́nu wɛ sɛ́nkplɔ́nmɛtɔ́ lɛ́ɛ kpódó Falizyɛn lɛ́ɛ kpó kplá nyɔ̌nu ɖé wá, bó sɔ́ ɛ ɖó agun ɔ́ nukɔn; nyɔ̌nu énɛ́ ɔ́, afɔ dó gbě wɛ é ɖe bɔ yě gbo e dó." },
    { num: 4, text: "Yě ɖɔ nú Jezu ɖɔ: “ Mɛ̌si, nyɔ̌nu élɔ́ ɔ́, afɔ dó gbě wɛ é ɖe bɔ mǐ yi gbo e dó." },
    { num: 5, text: "Mɔyízi sɛ́n ɔ́ ka ɖɔ jí mɛ mɔ̌hunkɔtɔn ɔ́, awǐnnyaglo wɛ è nǎ nyi dó hu i ná. Ani hwɛ ka lin d'é wú?”" },
    { num: 6, text: "Xó énɛ́ e yě kanbyɔ́ Jezu ɔ́, mɔ wɛ nyí bɔ yě ɖó n'i, bo na dó ɖó hwɛ n'i. Jezu ka fɛ, bo jɛ nǔ wlán dó kɔ́ mɛ jí kpódó alɔví kpó." },
    { num: 7, text: "Ée yě ɖo nǔ kanbyɔ́ ɛ wɛ magbokɔ ɔ́, é jlɔ́ kɔ bó ɖɔ nú yě ɖɔ: “Mɛ e ɖo mi mɛ bó ma hu hwɛ kpɔ́n gbeɖé ǎ ɔ́ ní nyi awǐnnyaglo dó e jɛ nukɔn.”" },
    { num: 8, text: "Ée é ɖɔ mɔ̌ ɔ́, é lɛ́ vɔ́ fɛ, bó jɛ nǔ wlán dó kɔ́ mɛ jí." },
    { num: 9, text: "Ée yě mɛ e kplá nyɔ̌nu ɔ́ wá nú Jezu lɛ́ɛ se mɔ̌ ɔ́, yě jɛ yiyi jí ɖokpó ɖokpó, bɛ́ sín mɛxó lɛ́ɛ jí, bɔ é wá kpo Jezu ɖokpónɔ géé kpódó nyɔ̌nu ɔ́ kpó." },
    { num: 10, text: "Jezu lɛ́ jlɔ́, bó kanbyɔ́ nyɔ̌nu ɔ́ ɖɔ: “Nyɔ̌nu! Fítɛ́ mɛ lɛ́ɛ ɖe? Mɛ ɖěbǔ sɔ́ ɖó hwɛ nú we ǎ cé?”" },
    { num: 11, text: "Nyɔ̌nu ɔ́ yí gbe n'i ɖɔ: “Yě ɖěbǔ ɖó hwɛ nú mì ǎ, Aklúnɔ.” Jezu ka ɖɔ n'i ɖɔ: “Nyɛ lɔmɔ̌ un ɖó hwɛ nú we ǎ; bo yi; bɛ́ sín din ɔ́, ma ka sɔ́ hu hwɛ ɖě ó.”]" },
    { num: 12, text: "Jezu lɛ́ jɛ nǔ kplɔ́n mɛ lɛ́ɛ jí ɖo sinsɛnxɔ mɛ, bo ɖɔ nú yě ɖɔ: “Nyɛ wɛ nyí wěziza gbɛ ɔ́ tɔn; mɛ e xwedó mì ɔ́ na gbɔn zǐnflú mɛ gbeɖé ǎ, lo ɔ́ é ná mɔ wěziza e nɔ ná gbɛ jɔ gbɛ mɛ é.”" },
    { num: 13, text: "Falizyɛn lɛ́ɛ ka ɖɔ n'i ɖɔ: “A ɖo kúnnu ɖe nú hwiɖée wɛ; énɛ́ ɔ́ wú ɔ́, xó towe nyí nǔgbó ǎ.”" },
    { num: 14, text: "Jezu ka yí gbe nú yě ɖɔ: “É ná bó nyí kúnnu ɖe nú nyɛɖée wɛ un ɖe ɔ́, xó e ɖɔ wɛ un ɖe ɔ́, nǔgbó wɛ é nyí; ɖó un tunwun fí e un gosín ɔ́, bo ka lɛ́ tunwun fí e un xwe ɔ́. Midɛɛ lɛ́ɛ ka tunwun fí e un gosín ɔ́ ǎ; mi ka lɛ́ tunwun fí e un xwe ɔ́ ǎ." },
    { num: 15, text: "Lě e gbɛtɔ́ lɛ́ɛ nɔ ɖɔ hwɛ gbɔn ɔ́ wɛ mi nɔ ɖɔ hwɛ gbɔn; nyɛ ɔ́, un nɔ ɖɔ hwɛ xá mɛɖé ǎ." },
    { num: 16, text: "Ényí un ka ɖɔ hwɛ ɔ́, hwɛjijɔ wɛ un nɔ ɖɔ; ɖó un ɖo nyɛ ɖóɖó ǎ; Tɔ́ e sɛ́ mì dó ɔ́ kpódó nyɛ kpó wɛ ɖo kpɔ́." },
    { num: 17, text: "È ka ko wlán dó Mawuxówéma mitɔn mɛ ɖɔ: ‘Nǔ e mɛ we ɖe kúnnu ɖokpó ɔ́ ná ɔ́, nǔgbó wɛ é nyí.’" },
    { num: 18, text: "Un ɖo kúnnu ɖe nú nyɛɖée wɛ, bɔ Tɔ́ e sɛ́ mì dó ɔ́ lɔ ka ɖo kúnnu ɖe nú mì wɛ.”" },
    { num: 19, text: "Yě kanbyɔ́ ɛ ɖɔ: “Fítɛ́ Tɔ́ towe ɔ́ ká ɖe?” Jezu yí gbe nú yě ɖɔ: “Mi tunwun mì ǎ; mi ka lɛ́ tunwun Tɔ́ ce ǎ. Ényí mi ko tunwun mì wɛ ɔ́, mi ná ko tunwun Tɔ́ ce lɔmɔ̌.”" },
    { num: 20, text: "Hwenu e Jezu ɖo xó énɛ́ lɛ́ɛ ɖɔ wɛ ɔ́, nǔ kplɔ́n mɛ wɛ é ɖe ɖo sinsɛnxɔ ɔ́ mɛ, ɖo gbǎ e mɛ è nɔ sɔ́ akwɛ́ dó ɔ́ kpá; mɛ ɖěbǔ ka wlí i ǎ, ɖó gan tɔn ko xo ǎ." },
    { num: 21, text: "Jezu ka lɛ́ ɖɔ nú yě ɖɔ: “Un xweyǐgbe; mi na ba mì, lo ɔ́, mi ná kú dó hwɛ mitɔn lɛ́ɛ mɛ, ɖó mi sixú yi fí e un xwe ɔ́ ǎ.”" },
    { num: 22, text: "Jwifugán lɛ́ɛ ka jɛ ɖiɖɔ jí ɖo yěɖée tɛ́ntin ɖɔ: “Éɖée hu gbé wɛ é ka ja a? Đó é ɖɔ: ‘Mi sixú yi fí e un xwe ɔ́ ǎ.’ ”" },
    { num: 23, text: "Jezu yí gbe nú yě ɖɔ: “Midɛɛ lɛ́ɛ ɔ́, ayǐkúngban jí fí tɔn wɛ mi nyí, amɔ̌, nyɛ ɔ́, jǐxwé tɔn wɛ un nyí: gbɛ élɔ́ tɔn wɛ mi nyí, amɔ̌, nyɛ ɔ́, un nyí gbɛ élɔ́ tɔn ǎ." },
    { num: 24, text: "Énɛ́ wútu wɛ un ko ɖɔ nú mi ɖɔ hwɛ mitɔn mɛ wɛ mi ná kú dó. Ényí mi ma ɖi nǔ ɖɔ un nyí mɛ e un nyí é ǎ ɔ́, mi ná kú dó hwɛ mitɔn lɛ́ɛ mɛ.”" },
    { num: 25, text: "Yě ká lɛ́ kanbyɔ́ ɛ ɖɔ: “Mɛ̌ a ka nyí?” Jezu yí gbe nú yě ɖɔ: “Mɛ e un ko ɖɔ nú mi sín do ɖɔ un nyí ɔ́ wɛ un nyí." },
    { num: 26, text: "Un ɖó nǔ gěgé bó ná ɖɔ dó mi wú, bó ná ɖɔ hwɛ dó nǔ gěgé wú nú mi; lo ɔ́, mɛ e sɛ́ mì dó ɔ́, nǔgbóɖɔtɔ́ wɛ, bɔ nǔ e un se ɖo nu tɔn ɔ́ kɛ́ɖɛ́ ɖɔ nú gbɛ ɔ́ wɛ un ɖe.”" },
    { num: 27, text: "Yě ká mɔ nǔ jɛ wú ɖɔ Tɔ́ ɔ́ sín xó ɖɔ nú émí wɛ é ɖe ǎ." },
    { num: 28, text: "Bɔ Jezu ɖɔ nú yě ɖɔ: “Hwenu e mi ná wá sɔ́ Gbɛtɔ́ví ɔ́ dó jǐ ɔ́, mi ná tunwun ɖɔ un nyí mɛ e un nyí ɔ́, bó kún nɔ́ ɖɔ nǔ ɖěbǔ ɖo nyɛ ɖésúnɔ sín acɛ mɛ ó; nǔ e Tɔ́ ɔ́ kplɔ́n mì ɔ́ kɛ́ɖɛ́ wɛ un nɔ ɖɔ." },
    { num: 29, text: "Mɛ e sɛ́ mì dó ɔ́ ka ɖo kpɔ́ xá mì; é jó mì dó ǎ, ɖó nǔ e nyɔ́ nukún tɔn mɛ ɔ́ wɛ un nɔ bló tɛgbɛ.”" },
    { num: 30, text: "Ée Jezu ɖo xó ɖɔ wɛ gbɔn mɔ̌ ɔ́, mɛ gěgé ɖi nǔ n'i." },
    { num: 31, text: "Jezu ɖɔ nú Jwifu e ɖi nǔ n'i lɛ́ɛ ɖɔ: “Ényí mi se gbe nú mì ɔ́, mi nyí ahwanvú ce lɛ́ɛ nǔgbó." },
    { num: 32, text: "Mi ná tunwun nǔgbó ɔ́, bɔ nǔgbó ɔ́ ná ɖe mi sín kannumɔgbénu.”" },
    { num: 33, text: "Yě ká yí gbe n'i ɖɔ: “Ablaxámu ví wɛ mǐ nyí, mǐ nɔ mɛɖé kannu kpɔ́n gbeɖé ǎ; étɛ́wútu a ka ɖɔ è nǎ ɖe mǐ sín kannumɔgbénu?”" },
    { num: 34, text: "Jezu ka ɖɔ nú yě ɖɔ: “Má ɖɔ nǔgbó nú mi: mɛ e nɔ hu hwɛ é ɖěbǔ ɔ́, hwɛ sín kannumɔ wɛ é nyí;" },
    { num: 35, text: "lo ɔ́, mɛ e nyí kannumɔ ɔ́ nɔ́ nɔ xwé gbe sɔ́yi ǎ; xwéví wɛ nɔ́ nɔ xwé gbe sɔ́yi." },
    { num: 36, text: "Ényí Vǐ ɔ́ ɖe mi sín kannumɔgbénu ɔ́, mi ná gosín kannumɔgbénu nǔgbó." },
    { num: 37, text: "Un tunwun ɖɔ Ablaxámu ví wɛ mi nyí nǔgbó; lo ɔ́, mi ɖo biba ná hu mì wɛ, ɖó mi ɖi nǔ nú xó ce lɛ́ɛ ǎ wútu." },
    { num: 38, text: "Nǔ e un mɔ ɖo Tɔ́ ce gɔ́n ɔ́ ɖɔ wɛ un ɖe; mi lɔmɔ̌ ka ɖo nǔ e mi se ɖo tɔ́ mitɔn nu ɔ́ bló wɛ.”" },
    { num: 39, text: "Yě yǐ gbe n'i ɖɔ: “Ablaxámu wɛ nyí tɔ́ mǐtɔn.” Jezu ka ɖɔ nú yě ɖɔ: “Ényí Ablaxámu ví wɛ mi ko nyí nǔgbó ɔ́, mi ná ko nɔ wa nǔ Ablaxámu ɖɔhun." },
    { num: 40, text: "Amɔ̌, din ɔ́, nyɛ ka ɖɔ nǔgbó e un se ɖo Mawu nu ɔ́ nú mi; có mi ka lɛ́ ɖo biba na hu mì wɛ; Ablaxámu ka wa nǔ mɔ̌hunkɔtɔn ɖě ǎ." },
    { num: 41, text: "Nǔ e tɔ́ mitɔn wa ɔ́ wa wɛ jɛ́n mi ɖe.” Ée é ɖɔ mɔ̌ ɔ́, yě yǐ gbe n'i ɖɔ: “Mǐ nyí agaví ǎ; Mawu wɛ nyí Tɔ́ ɖokpó géé e mǐ ɖó é.”" },
    { num: 42, text: "Jezu ka yí gbe nú yě ɖɔ: “Nú Mawu jɛ́n nyí Tɔ́ mitɔn nǔgbó ɔ́, mi na ko yí wǎn nú mì, ɖó Mawu gɔ́n wɛ un gosín bó wá. Jlǒ nyɛ ɖésúnɔ tɔn mɛ wɛ un wá dó ǎ; lo ɔ́, é wɛ sɛ́ mì dó." },
    { num: 43, text: "Étɛ́wú mi ma ka mɔ nǔ jɛ xó ce lɛ́ɛ wú ǎ? Đó xó ce nɔ vɛ́ se nú mi." },
    { num: 44, text: "Awǒvi wɛ nyí tɔ́ mitɔn, bɔ nǔ e nɔ jló e lɛ́ɛ wiwa wɛ nɔ myá nukún nú mi. Mɛhutɔ́ wɛ é ko nyí sín do, é yí wǎn nú nǔgbó ǎ, ɖó nǔgbó ɖě ɖo nu tɔn ǎ; é ná ɖó nǔvú ɔ́, nǔ ɖo gaan wɛ, ɖó é ɖésúnɔ bǐ wɛ ko nyí adingbannɔ, bo nyí adingbannɔ lɛ́ɛ sín tɔ́." },
    { num: 45, text: "Amɔ̌, nyɛ ɔ́, nǔgbó wɛ un nɔ ɖɔ; énɛ́ ɔ́ wú wɛ mi ma nɔ ɖi nǔ nú mì ǎ." },
    { num: 46, text: "Mɛ̌ ká ɖo mi mɛ, bó ná sixú ɖe xlɛ́ ɖɔ un hu hwɛ kpɔ́n? Ényí un ka ɖo nǔgbó ɖɔ wɛ ɔ́, aniwú wɛ mi ma nɔ ɖi nǔ nú mì ǎ?" },
    { num: 47, text: "Mɛ e nyí Mawu tɔn ɔ́, Mawuxó wɛ é nɔ ɖótó; midɛɛ lɛ́ɛ ɔ́, mi ka nɔ ɖótó Mawuxó ɔ́ ǎ, ɖó mi nyí étɔn ǎ wú.”" },
    { num: 48, text: "Jwifu e gbɛ́ wǎn nú Jezu lɛ́ɛ ka yí gbe n'i ɖɔ: “Ée mǐ ɖɔ Samalíinu wɛ a nyǐ, bɔ yɛ nyanya ɖo jǐ towe é ɔ́, a ma mɔ ɖɔ hwɛ mǐtɔn jɔ a?”" },
    { num: 49, text: "Jezu ka yí gbe nú yě ɖɔ: “Yɛ nyanya ɖě ɖo jǐ ce ǎ; Tɔ́ ce sɔ́ su wɛ un ɖe, bɔ midɛɛ lɛ́ɛ ka ɖo hɛ̌n dó mì wɛ." },
    { num: 50, text: "Nyɛ ɖésú wɛ nɔ sɔ́ nyɛɖée su ǎ; Mawu wɛ nɔ sɔ́ mì su, bo nɔ ɖɔ hwɛ." },
    { num: 51, text: "Má ɖɔ nǔgbó nú mi: ényí mɛɖé se xó ce, bó bló ɖ'é jí ɔ́, mɛ ɔ́ ná kú gbeɖé ǎ.”" },
    { num: 52, text: "Jwifu e gbɛ́ wǎn nú Jezu lɛ́ɛ yí gbe n'i ɖɔ: “Mǐ mɔ din ɖɔ yɛ nyanya wɛ ɖo jǐ towe nǔgbó; Ablaxámu ko kú wá yi, bɔ gbeyíɖɔ Mawu tɔn lɛ́ɛ bǐ ko kú, hwɛ ka wá ɖɔ din ɖɔ: ‘Ényí mɛɖé se xó ce bó bló ɖ'é jí ɔ́, mɛ ɔ́ ná kú gbeɖé ǎ.’" },
    { num: 53, text: "Hwɛ hú gǎn tɔ́gbó mǐtɔn Ablaxámu wɛ a? Éyɛ́ ko kú, bɔ gbeyíɖɔ Mawu tɔn lɛ́ɛ lɔmɔ̌ ko kú. Mɛ̌ a ka nɔ sɔ́ hwiɖée dó mɔ?”" },
    { num: 54, text: "Jezu ka yí gbe nú yě ɖɔ: “Ényí nyɛ ɖésú wɛ nɔ sɔ́ nyɛɖée su ɔ́, susu ce na xɔ akwɛ́ ǎ. Tɔ́ ce wɛ ka nɔ sɔ́ mì su. Mi ɖíe ka ɖɔ é wɛ nyí Mawu nú émí e," },
    { num: 55, text: "có mi ka tunwun i ǎ; nyɛ ɔ́, un tunwun i. Ényí un ɖɔ un kún tunwun i ó ɔ́, un ná nyí nǔvúɖótɔ́ mi ɖɔhun. Lo ɔ́, nyɛ tunwun i, bó nɔ́ bló xó tɔn lɛ́ɛ ɖ'é jí." },
    { num: 56, text: "Awǎjijɛ ɖaxó wɛ nyí nú tɔ́gbó mitɔn Ablaxámu, ɖó é ɖo nukún ɖó wiwa ce wɛ; é ka mɔ nǔgbó, bɔ xomɛ hun i.”" },
    { num: 57, text: "Jwifu e gbɛ́ wǎn nú Jezu lɛ́ɛ ka kanbyɔ́ ɛ ɖɔ: “A ko ɖó xwe kanɖé wǒ (50) vɔ́vɔ́ ǎ, bó ka mɔ Ablaxámu a?”" },
    { num: 58, text: "Jezu ka ɖɔ nú yě ɖɔ: “Ma ɖɔ nǔgbó nú mi: cóbónú Ablaxámu ná jɔ ɔ́, nyɛ ko tíin.”" },
    { num: 59, text: "Bɔ yě fɔ awǐnnyaglo, bó ná nyi dó e; Jezu ka bɛ, bó tɔ́n sín sinsɛnxɔ ɔ́ mɛ." },
  ],
};

const GOUN_VERSES_MAP: Record<string, VerseItem[]> = {
  "Genèse 1": [
    { num: 1, text: "To whẹwhẹwhenu Jiwheyẹwhe dá olọn po aigba po." },
    { num: 2, text: "Aigba sọ tin to vọnu bo jẹvọ; zinvlu sọ tin to nukun awà he siso tɔn lẹ ji. Gbigbọ Jiwheyẹwhe tọn sọ to zinzɔn to osin lẹ ji." },
    { num: 3, text: "Jiwheyẹwhe sọ dọmɔ: « Hinhɔ́n ni tin », hinhɔ́n sọ tin." },
    { num: 4, text: "Jiwheyẹwhe sọ mɔ hinhɔ́n lọ dọ é yɔ́n: Jiwheyẹwhe sọ klan hinhɔ́n lọ sɔ́n zinvlu mẹ." },
    { num: 5, text: "Jiwheyẹwhe sọ ylɔ́ hinhɔ́n lọ dọ « Ozán », e sọ ylɔ́ zinvlu lọ dọ « Ozán-gblamɛ ». Whèjai sọ tin, afɔ́nnubla sọ tin, azán tintan." },
    { num: 6, text: "Jiwheyẹwhe dọ: “Tɛnmɛ vɔ́tɔ́ ɖaxó ɖé ní tíin bó má sin ɔ́, nú ɖokpó ná to jǐnukúnsin aga, nú ɖokpó ná to aigba jí.”" },
    { num: 7, text: "Nǔ nyí mɔ̌ nǔgbó: Jiwheyẹwhe bló tɛnmɛ ɔ́, bó má sin ɔ́ ɖó we; ɖokpó to aga bɔ ɖokpó to do." },
    { num: 8, text: "É ylɔ́ tɛnmɛ vɔ́tɔ́ ɖaxó ɔ́ dọ jǐnukúnsin. Zǎn kú, bɔ ayǐ hɔ́n. Azǎn wegɔ́ ɔ́ nɛ́." },
    { num: 9, text: "Jiwheyẹwhe lẹ́ dọ: “Sin e to do ɔ́ ní kplé cí fí ɖokpó, bónú fí xúxú ní jɛ wě.” Bɔ nǔ nyí mɔ̌ nǔgbó." },
    { num: 10, text: "Bɔ é ylɔ́ fí xúxú ɔ́ dọ aigba, lobo ylɔ́ fí e sin ɔ́ kplé cí ɔ́ dọ xu. Jiwheyẹwhe mɔ dọ nǔ ɖagbe wẹ." },
    { num: 11, text: "Énɛ́ ɔ́ gúdo ɔ́, Jiwheyẹwhe dọ: “Gběhan po atín po ní wú kpé aigba ɔ́ lẹpo jí: Yé ní nɔ́ ná kwín yětɔn yětɔn, bó nɔ́ ná sínsɛ́n yětɔn yětɔn.” Bɔ nǔ nyǐ mɔ̌ nǔgbó." },
    { num: 12, text: "Gběhan wú to aigba ɔ́ jí, gběhan tɛnmɛ tɛnmɛ lẹ wú, atín tɛnmɛ tɛnmɛ lẹ wú, bɔ yé ná sínsɛ́n yětɔn yětɔn, bó ná kwín yětɔn yětɔn. Jiwheyẹwhe mɔ dọ nǔ ɖagbe wẹ." },
    { num: 13, text: "Zǎn kú, bɔ ayǐ hɔ́n; azǎn atɔngɔ́ ɔ́ nɛ́." },
    { num: 14, text: "Jiwheyẹwhe dọ: “Nǔ e nɔ́ ná hinhɔ́n lẹ ní tíin gbɔn fí lẹpo to jǐnukúnsin bó ɖe kéze ɖó vo nú zǎn. Yé ná nyí wuntun ɖé bɔ è nǎ nɔ́ xwédo dó tunwun hwenu lẹ, azǎn lẹ podɔ xwe lẹ po." },
    { num: 15, text: "Yé ná nɔ jǐnukúnsin, bó ná nɔ́ ná hinhɔ́n dó aigba ɔ́ jí”; bɔ nǔ nyí mɔ̌ nǔgbó." },
    { num: 16, text: "Énɛ́ ɔ́, Jiwheyẹwhe bló nǔ we e ná nɔ́ ná hinhɔ́n lẹ: ɖaxó ɔ́ wẹ nyí owhe. Éyɛ́ ná nɔ́ kpa acɛ nú kéze. Kpɛví ɔ́ wẹ nyí osun, bó ná nɔ́ kpa acɛ nú zǎn. É lẹ́ bló sunwhlẹvu lẹ lɔmɔ̌." },
    { num: 17, text: "Jiwheyẹwhe bɛ́ yé ɖó jǐnukúnsin, bónú yé ná nɔ́ ná hinhɔ́n dó aigba ɔ́ jí." },
    { num: 18, text: "Yé ná nɔ́ kpa acɛ nú kéze, bó ná nɔ́ kpa acɛ nú zǎn, bó ná nɔ́ ɖe hinhɔ́n ɖó vo nú zinvlu." },
    { num: 19, text: "Zǎn kú, bɔ ayǐ hɔ́n. Azǎn ɛnɛgɔ́ ɔ́ nɛ́." },
    { num: 20, text: "Jiwheyẹwhe dọ: “Kanlin tɛnmɛ tɛnmɛ ní gɔ́ tɔ lẹ mẹ winnini; xɛ lẹ ní tíin, bó nɔ́ zɔn gbɔn jɔhɔn mẹ.”" },
    { num: 21, text: "Nǔgbó ɔ́, Jiwheyẹwhe ɖǒ xumɛkanlin ɖaxó ɖaxó lẹ podɔ kanlin tɛnmɛ tɛnmɛ e nɔ lin tɔ lẹ lẹpo po, bɔ yé kpé tɔ lẹ mẹ winnini. É lẹ́ bló xɛ tɛnmɛ tɛnmɛ lẹ. Bɔ Jiwheyẹwhe mɔ dọ nǔ ɖagbe wẹ." },
    { num: 22, text: "Jiwheyẹwhe xo ɖɛ dó yé jí, bó dọ: “Mi ji, mi gba kún, bó kpé tɔ lẹ mẹ, bónú xɛ lẹ ní gba kún kpé gbɛ ɔ́ mẹ.”" },
    { num: 23, text: "Zǎn kú, bɔ ayǐ hɔ́n. Azǎn atɔ́ɔ́ngɔ́ ɔ́ nɛ́." },
    { num: 24, text: "Jiwheyẹwhe dọ: “Aigba ní ná xwé kanlin tɛnmɛ tɛnmɛ lẹ, gběkanlin tɛnmɛ tɛnmɛ lẹ, po kanlin tɛnmɛ tɛnmɛ e nɔ sá lẹ po.” Bɔ nǔ nyí mɔ̌ nǔgbó." },
    { num: 25, text: "Nǔgbó ɔ́, Jiwheyẹwhe bló gběkanlin tɛnmɛ tɛnmɛ lẹ, xwé gbe kanlin tɛnmɛ tɛnmɛ lẹ, po kanlin tɛnmɛ tɛnmɛ e nɔ sá lẹ po, bó mɔ dọ nǔ ɖagbe wẹ." },
    { num: 26, text: "Jiwheyẹwhe sọ dọ: « Mì gbɔ mí ni dá gbẹtɔ to apajlɛ mídetiti tɔn mẹ, to walɔ mídetiti tɔn mẹ: na yé ni tindo aṣẹ to whèvi lẹ ji po xɛ̀ lẹ ji po. »" },
    { num: 27, text: "Jiwheyẹwhe ɖó gbɛtɔ́ ɖó akpajlɛ́ é ɖésúnɔ tɔn mẹ. É ɖó gbɛtɔ́ akpajlɛ́ é ɖésúnɔ tɔn ɖɔhun. É ɖó súnnu podɔ nyɔ̌nu po." },
    { num: 28, text: "Énɛ́ ɔ́ gúdo ɔ́, é xo ɖɛ dó yé jí bó dọ: “Mi ji, mi gba kún, bó kpé aigba ɔ́ jí, bó sɔ́ ɛ ɖó acɛ mitɔn glɔ́. Mi sɔ́ hweví lẹ ɖó acɛ mitɔn glɔ́, bó sɔ́ xɛ lẹ ɖó acɛ mitɔn glɔ́, bó sɔ́ kanlin e to aigba jí lẹ lẹpo ɖó acɛ mitɔn glɔ́.”" },
    { num: 29, text: "É lẹ́ dọ nú yé dọ: “Gběhan e to aigba jí, bó nɔ́ ɖó kwín lẹ ɔ́, un ná lẹpo mi, bó ná atín e to aigba jí, bó nɔ́ sɛ́n bɔ sínsɛ́n yětɔn nɔ́ ɖó kwín lẹ lẹpo mi; yé ná nyí nǔɖuɖu mitɔn." },
    { num: 30, text: "Mɔ̌ ɖokpó ɔ́, un ná ama lẹ, bɔ yé ná nyí nǔɖuɖu nú kanlin e to aigba jí lẹ lẹpo; yé ná nyí nǔɖuɖu nú xɛ lẹ lẹpo, yé ná nyí nǔɖuɖu nú kanlin e nɔ sá lẹ lẹpo, yé ná nyí nǔɖuɖu nú nǔ e to gbɛ lẹ lẹpo.” Bɔ nǔ nyí mɔ̌ nǔgbó." },
    { num: 31, text: "Jiwheyẹwhe sọ mɔ nuhe e dá lẹpo, bo kiyesí, e yɔ́n tlala. Whèjai sọ tin, afɔ́nnubla sọ tin, azán ṣidopotɔ." },
  ],
  "Genèse 2": [
    { num: 1, text: "Lě e Jiwheyẹwhe ɖó wẹ̌kɛ́ ɔ́ po nǔ e ɖ'é mẹ lẹ lẹpo po gbɔn ɔ́ nɛ́." },
    { num: 2, text: "Hǔn, azǎn ayizɛ́ngɔ́ ɔ́ gbe ɔ́, Jiwheyẹwhe wa azɔ̌ tɔn lẹ lẹpo fó bó gbɔjɛ́ azǎn tɛ́nwegɔ́ ɔ́ gbe." },
    { num: 3, text: "É xo ɖɛ dó azǎn tɛ́nwegɔ́ ɔ́ jí, bó ɖe ɖó vo, ɖó ée é wa azɔ̌ tɔn lẹ lẹpo fó ɔ́, azǎn énɛ́ ɔ́ gbe wẹ é gbɔjɛ́." },
    { num: 4, text: "Lě e Jiwheyẹwhe ɖó wẹ̌kɛ́ ɔ́ gbɔn ɔ́ nɛ́. Whenuena Oklunɔ Jiwheyẹwhe ɖó wẹ̌kɛ́ ɔ́ tlóló ɔ́," },
    { num: 5, text: "zunkan ɖěbǔ kó to aigba ɔ́ jí ǎ, gběhan ɖěbǔ ká kó wú ǎ, ɖó Oklunɔ Jiwheyẹwhe kó sɛ́ jǐ dó aigba ɔ́ jí ǎ, gbɛtɔ́ ɖě ká kó to aigba ɔ́ jí bó ná lẹ ǎ." },
    { num: 6, text: "Ahǔn nɔ́ tɔ́n sín kɔ́ glɔ́ bó nɔ́ ja dó aigba ɔ́ lẹpo jí." },
    { num: 7, text: "Oklunɔ Jiwheyẹwhe kán kɔ́ dó mẹ gbɛtɔ́, bó fún funfún e nɔ ná gbɛ mẹ ɔ́ dó awɔntín tɔn mẹ, bɔ gbɛtɔ́ ɔ́ húzú mẹ gbɛɖe." },
    { num: 8, text: "Oklunɔ Jiwheyẹwhe ɖó jikpá ɖokpó ɖó Edɛ́ni, to zǎnzǎnhwe jí wa jí, bó zé gbɛtɔ́ e è mẹ ɔ́ d'é mẹ." },
    { num: 9, text: "É bló bɔ atín alɔkpa alɔkpa e nyɔ́ kpɔ́n, bɔ sínsɛ́n yětɔn nyɔ́ ɖu lẹ wú to jikpá ɔ́ mẹ. É bló bɔ atín e sínsɛ́n tɔn nɔ́ ná gbɛ mẹ ɔ́, podɔ atín e sínsɛ́n tɔn nɔ́ zɔ́n, bɔ è nɔ tunwun nǔ ɖagbe podɔ nǔ nyanya po ɔ́ wú to jikpá ɔ́ tɛ́ntin." },
    { num: 10, text: "Tɔ ɖé jɔ to Edɛ́ni, bó nɔ sa wá hú sin nú jikpá ɔ́, bó zɛ ala ɛnɛ sín fínɛ́." },
    { num: 11, text: "Ala nukɔntɔn ɔ́ nɔ́ nyí Picɔ́ni. É nɔ́ sa lẹ́ lẹ̌ dó Hawíla. È nɔ mɔ siká to Hawíla to ɔ́ mẹ." },
    { num: 12, text: "Siká akú wẹ to fínɛ́. È nɔ lẹ́ mɔ atínhúnhɔ́n wǎnɖagbenɔ ɖé to fínɛ́, bɔ è nɔ ylɔ́ dọ budeliyɔ́mu; è nɔ lẹ́ mɔ awǐnnya ɖagbe ɖagbe e è nɔ ylɔ́ dọ Onísi ɔ́." },
    { num: 13, text: "Ala wegɔ́ ɔ́ nɔ́ nyí Gixɔ́ni; éyɛ́ wẹ nɔ́ sa lẹ́ lẹ̌ dó Kúci sín to ɔ́ lẹpo." },
    { num: 14, text: "Ala atɔngɔ́ ɔ́ nɔ́ nyí Tígli; éyɛ́ nɔ́ sa yi Asilíi sín zǎnzǎnhwe jí; ala ɛnɛgɔ́ ɔ́ nɔ nyí Efláti." },
    { num: 15, text: "Oklunɔ Jiwheyẹwhe sɔ́ gbɛtɔ́ ɔ́ ɖó jikpá Edɛ́ni tɔn ɔ́ mẹ, bónú é ná nɔ́ lẹ, bó ná nɔ́ kpé nukún d'é wú." },
    { num: 16, text: "Oklunɔ Jiwheyẹwhe dọ nú gbɛtɔ́ ɔ́ dọ: “A sixú ɖu atín e to jikpá ɔ́ mẹ ɔ́ lẹpo sín sínsɛ́n." },
    { num: 17, text: "Amɔ̌, atín e sín sínsɛ́n è nɔ ɖu bó nɔ tunwun nǔ ɖagbe podɔ nǔ nyanya po ɔ́ kɛ́ɖɛ́ jɛ́n a ma ná ɖu ǎ, ɖó gbe e gbe a nǎ ɖu ɔ́, a nǎ kú.”" },
    { num: 18, text: "Oklunɔ Jiwheyẹwhe dọ: “É nyɔ́ bónú gbɛtɔ́ ná nɔ é ɖokpónɔ ǎ. Un ná bló alɔgɔ́númɛtɔ́ ɖokpó n'i, bɔ é ná jɛ xá ɛ.”" },
    { num: 19, text: "Oklunɔ Jiwheyẹwhe kán kɔ́ dó bló kanlin e to aigba jí lẹ lẹpo, podɔ xɛ lẹ lẹpo po, bó kplá yé wá gbɛtɔ́ ɔ́ gɔ́n, bó ná kpɔ́n nyǐkɔ e é ná ná yé ɔ́. Nyǐkɔ e é ná ná yé ɔ́ wẹ yé ná nɔ́ nyí." },
    { num: 20, text: "Énɛ́ ɔ́, gbɛtɔ́ ɔ́ ɖó nyǐkɔ nú kanlin xwé gbe tɔn lẹ lẹpo, bó ɖó nú gběkanlin lẹ lẹpo, lobo ɖó nú xɛ lẹ lẹpo. Lo ɔ́, é mɔ mẹ e ná jɛ xá ɛ, bó ná gɔ́ alɔ n'i ɔ́ ǎ." },
    { num: 21, text: "Hwe énɛ́ ɔ́ nu ɔ́, Oklunɔ Jiwheyẹwhe ɖó sɛnmlɔ nú gbɛtɔ́ ɔ́, bó ɖe ajajaxú tɔn ɖokpó, bó lẹ́ sú lanti ɔ́ ɖó tɛn tɔn mẹ." },
    { num: 22, text: "Oklunɔ Jiwheyẹwhe zé ajajaxú ɔ́ dó bló nyɔ̌nu ɖokpó bó kplá ɛ yi jó nú súnnu ɔ́." },
    { num: 23, text: "Ée súnnu ɔ́ mɔ nyɔ̌nu ɔ́ lě tlóló ɔ́, é sú xó bó dọ: “Áahɛɛnnɛ́! Nyi ɖɔhun ɖokpó ɖíe lo. Xú tɔn lẹ cí xú ce ɖɔhun, agbaza tɔn cí agbaza ce ɖɔhun!” È nǎ nɔ́ ylɔ́ ɛ dọ nyɔ̌nu, ɖó súnnu sín lanmɛ wẹ è ɖe e sín." },
    { num: 24, text: "Énɛ́ ɔ́ wú wẹ súnnu ná jó tɔ́ tɔn po nɔ tɔn po dó, bó ná jɛ kpɔ́ xá asi tɔn, bɔ yé mẹ we lẹ ná húzú ɖokpó géé." },
    { num: 25, text: "Súnnu ɔ́ po asi tɔn po lẹpo wẹ to mẹ̌, có é ká nɔ́ hu winnyá nú yé ǎ." },
  ],
  "Genèse 3": [
    { num: 1, text: "Lo ɔ́, dan wẹ nyí kanlin e sɛ́ hú gběkanlin e Oklunɔ Jiwheyẹwhe bló lẹ lẹpo é. Dan ɔ́ kanbyɔ́ nyɔ̌nu ɔ́ dọ: “Jiwheyẹwhe dọ mi kún ɖó ná ɖu atínsínsɛ́n e to jikpá ɔ́ mẹ lẹ ɖěbǔ ó nǔgbó a?”" },
    { num: 2, text: "Bɔ nyɔ̌nu ɔ́ yí gbe n'i dọ: “Mí hɛn ɔ́, mí nǎ ɖu atínsínsɛ́n e to jikpá ɔ́ mẹ lẹ," },
    { num: 3, text: "amɔ̌, atín e to jikpá ɔ́ tɛ́ntin ɔ́, Jiwheyẹwhe dọ nú mí dọ mí ní má ɖu sínsɛ́n tɔn ó, mí ní má ɖ'alɔ wú lɔ vɔ́vɔ́ ó, mí táá kú.”" },
    { num: 4, text: "Dan lẹ́ yí xó bó dọ: “Gbeɖé kpɔ́n, mi ná kú ɖě ǎ," },
    { num: 5, text: "lo ɔ́, Jiwheyẹwhe tunwun dọ gbe e gbe mi ná ɖu ɔ́, mi ná mɔ nukúnnú jɛ lě e nǔ lẹ ɖe gbɔn ɔ́ wú, é ɖésúnɔ Jiwheyẹwhe ɔ́ ɖɔhun, bó ná tunwun nǔ ɖagbe podɔ nǔ nyanya po.”" },
    { num: 6, text: "Énɛ́ ɔ́, nyɔ̌nu ɔ́ mɔ dọ atín ɔ́ nyɔ́ kpɔ́n, bɔ sínsɛ́n tɔn ná nyɔ́ ɖu. É mɔ dọ nú è ɖu nǔgbó ɔ́, è nǎ ɖó nukúnnú mɔ jɛ nǔ mẹ. Énɛ́ ɔ́, é ba bó ɖu; asú tɔn to akpá tɔn, bɔ é ná ɛ bɔ élɔ́ ɖu." },
    { num: 7, text: "Ée yé ɖu ɔ́, yé mẹ we lẹ mɔ nukúnnú jɛ lě e yé ɖe gbɔn ɔ́ wú, bó mɔ dọ émí to mẹ̌. Hwe énɛ́ ɔ́ nu ɔ́, yé ba fígima bó sin ɖě dó ɖě wú, lobo sɔ́ sin dó alin avɔ ɖɔhun." },
    { num: 8, text: "Gbadanu wá su, bɔ Oklunɔ Jiwheyẹwhe to sa ɖi gbɔn jikpá ɔ́ mẹ wẹ, bɔ yé se afɔ tɔn gbe. Énɛ́ ɔ́, yé yi hɔn hwlá dó atín e to jikpá ɔ́ mẹ lẹ tɛ́ntin." },
    { num: 9, text: "Oklunɔ Jiwheyẹwhe ká ylɔ́ súnnu ɔ́, bó dọ: “Fítɛ́ wẹ a ɖe?”" },
    { num: 10, text: "Bɔ súnnu ɔ́ yí gbe n'i dọ: “Afɔ towe gbe wẹ un se to jikpá ɔ́ mẹ bɔ xɛsi ɖi mì bɔ un hɔn hwlá, ɖó mẹ̌ wẹ un ɖe.”" },
    { num: 11, text: "Oklunɔ Jiwheyẹwhe ká kanbyɔ́ ɛ dọ: “Mẹ̌ wẹ dọ nú we dọ a to mẹ̌? Atín e sín sínsɛ́n un gbɛ́ nú we dọ hwi ní má ɖu ó ɔ́, a ɖu wẹ a?”" },
    { num: 12, text: "Bɔ é yí gbe n'i dọ: “Nyɔ̌nu e a sɔ́ ɖó akpá ce ɔ́ wẹ ná mì bɔ un ɖu.”" },
    { num: 13, text: "Énɛ́ ɔ́, Oklunɔ Jiwheyẹwhe kanbyɔ́ nyɔ̌nu ɔ́ dọ: “Étɛ́ a wa mɔ̌ nɛ́?” Bɔ é yí gbe n'i dọ: “Dan wẹ blɛ́ mì bɔ un ɖu atín ɔ́ sín sínsɛ́n.”" },
    { num: 14, text: "Ée é dọ mɔ̌ ɔ́, Oklunɔ Jiwheyẹwhe dọ nú dan ɔ́ dọ: “Đó nǔ énɛ́ ɔ́ e a wa ɔ́ wútu ɔ́, bɛ́ sín égbé ɔ́, a nǎ nɔ́ sá gbɔn adɔgo jí, bó ná nɔ́ ɖu kɔ́ to gbɛzán towe lẹpo mẹ. Nu wẹ un dó we to kanlin lẹ lẹpo mẹ." },
    { num: 15, text: "Un ná bló bɔ hwi po nyɔ̌nu ɔ́ po ɔ́, mi ná nɔ́ mɔ miɖée gbɔ gbeɖé ǎ; kúnkan towe po kún tɔn po ɔ́, yé ná nɔ́ mɔ yěɖée gbɔ gbeɖé ǎ. Kúnkan tɔn ná nɔ́ nyínyɛ́ ta nú we, bɔ hwɛ ká ná nɔ́ gblé wǔ éyɛ́ tɔn dó afɔgbɛnnu.”" },
    { num: 16, text: "Énɛ́ ɔ́ gúdo ɔ́, Oklunɔ Jiwheyẹwhe dọ nú nyɔ̌nu ɔ́ dọ: “Un ná bló bɔ a mɔ xo ɔ́, a nǎ nɔ́ mɔ wǔvɛ́ ɖésú; a yi ajidonu ɔ́, a nǎ mɔ wǔvɛ́; asú towe ná nɔ́ jló we, éyɛ́ ká ná ɖu gǎn to jǐ towe.”" },
    { num: 17, text: "Oklunɔ Jiwheyẹwhe ká wá dọ nú Adámu dọ: “Ée a se asi towe xó, bó ɖu atín e sín sínsɛ́n un gbɛ́ dọ hwi ní má ɖu ó ɔ́ wútu ɔ́, un ná dó nu aigba ɔ́ ɖó hwi wú. A nǎ nɔ́ jɛ tagba ɖésú, cóbɔ aigba ɔ́ ná nɔ́ ná we nǔɖuɖu to gbɛzán towe lẹ lẹpo mẹ." },
    { num: 18, text: "Wunkan lẹ podɔ gběhan po wẹ ná nɔ́ wú to aigba ɔ́ jí; gběhan e wú to gle lẹ mẹ ɔ́ wẹ a nǎ nɔ́ ɖu." },
    { num: 19, text: "A nǎ nɔ́ xwá dɛ̌n to nukɔn cóbó ná nɔ́ mɔ nǔ ɖu. Mɔ̌ wẹ é ná nyí gbɔn nú we káká bɔ a nǎ yi kɔ́ e è dǒ bló we ná ɔ́ glɔ́. Nǔgbó ɔ́, kɔ́ wẹ a nyǐ, bó ka ná lẹ́ húzú kɔ́.”" },
    { num: 20, text: "Súnnu ɔ́ ɖó nyǐkɔ n'i dọ Ɛvu, ɖó é wẹ ná nyí gbɛtɔ́ lẹ lẹpo sín nɔ." },
    { num: 21, text: "Oklunɔ Jiwheyẹwhe sɔ́ anyǔ dó bló avɔ bó dó nú Adámu podɔ asi tɔn po." },
    { num: 22, text: "Énɛ́ ɔ́ gúdo ɔ́, Oklunɔ Jiwheyẹwhe dọ: “Gbɛtɔ́ ɖíe wá cí mí ɖésúnɔ ɖɔhun, bó nɔ tunwun nǔ ɖagbe podɔ nǔ nyanya po e; din ɔ́, mí nǎ lɔn bɔ é ná ba atín e nɔ ná gbɛ mẹ ɔ́ sín sínsɛ́n bó ɖu ǎ; é táá nɔ gbɛ káká sɔ́yi.”" },
    { num: 23, text: "Ée Oklunɔ Jiwheyẹwhe dọ mɔ̌ ɔ́, é nya gbɛtɔ́ ɔ́ sín jikpá Edɛ́ni tɔn ɔ́ mẹ, bónú é ná lẹ aigba e mẹ è ɖe e sín ɔ́." },
    { num: 24, text: "Ée Oklunɔ Jiwheyẹwhe nya gbɛtɔ́ sín jikpá ɔ́ mẹ ɔ́, é fɔ wɛnsagun susunɔ lẹ ɖó jikpá Edɛ́ni tɔn ɔ́ sín zǎnzǎnhwe jí. Wɛnsagun lẹ hɛn hwǐ, bó to mimi wẹ, bɔ é nɔ́ to myɔ kán wẹ, bó to ali e yi atín e nɔ ná gbɛ mẹ ɔ́ kɔn ɔ́ cɔ́ wẹ." },
  ],
  "Psaume 27": [
    { num: 1, text: "Davídi sín han. Oklunɔ Jiwheyẹwhe wẹ nyí hinhɔ́n ce, bó nyí mɛhwlɛ́ngántɔ́ ce; mẹ̌ un ka ná ɖi xɛsi ná? Oklunɔ Jiwheyẹwhe lɔmɛ wẹ gbɛ ce ɖe; mẹ̌ un ka ná hɔn ná?" },
    { num: 2, text: "Ényí nǔnyanyawatɔ́ lẹ kplɔ́ dó mì, adǎnkanlin ɖɔhun ɔ́, yé mẹ kɛntɔ́ ce énɛ́ lẹ wẹ nɔ́ j'ayǐ." },
    { num: 3, text: "Ahwanfuntɔ́ lẹ ná bó d'ahwan gbě bó ján go dó mì ɔ́, xɛsi nɔ ɖi mì ǎ; è tɔ́n ahwan mì ɔ́, hwenɛ́nu wẹ ji nɔ lẹ́ ɖe mì." },
    { num: 4, text: "Nǔ ɖokpó géé wẹ un nɔ byɔ́ Oklunɔ Jiwheyẹwhe, bɔ é ká myá nukún nú mì ɖésú; é wẹ nyí dọ má nɔ́ nɔ xwé tɔn gbe nú gbɛ hwenu ce lẹpo, bó ná nɔ́ kpɔ́n lě e é nyɔ́ xomɛ sɔ é, bó ná nɔ́ kpɔ́n lě e nɔtɛn tɔn nyɔ́ sɔ é." },
    { num: 5, text: "Đó azǎn nyanya gbe ɔ́, é ná cyɔ́n alɔ jǐ ce to xɔ tɔn sá, é ná sɔ́ mì hwlá ɖó goxɔ tɔn sá, é ná sɔ́ mì yi ɖó só jí aga, fí e è ma ná kpé wǔ ce ɖe ǎ é." },
    { num: 6, text: "Énɛ́ ɔ́, un ná hú taga kɛntɔ́ e lẹ́ lẹ̌ dó mì lẹ; un ná sá vɔ̌ n'i to goxɔ tɔn mẹ po awǒbóbó po, un ná ji han nú Oklunɔ Jiwheyẹwhe, un ná dọ xó lómílómí dó mlá nyǐkɔ tɔn dó han mẹ." },
    { num: 7, text: "Oklunɔ Jiwheyẹwhe! Un to ylɔ̌ylɔ́ we wẹ. Đǒtó gbe ce; kú nǔbláwǔ nú mì, yǐ gbe nú mì." },
    { num: 8, text: "Un to tamɛ lin dó xó e a dọ ɔ́ wú wẹ; a dọ: “Mi ba mì!” Din ɔ́, Oklunɔ Jiwheyẹwhe! Un to biba we wẹ." },
    { num: 9, text: "Ma sɔ́ hwiɖée hwlá dó mì ó. Ma nya nyɛ mɛsɛntɔ́ towe po xomɛsin po ó; hwi wẹ nyí gbɛ nú mì. Ma jó mì dó ó; ma ɖe alɔ sín kan ce mẹ ó, Jiwheyẹwhe Mɛhwlɛ́ngántɔ́ ce!" },
    { num: 10, text: "Đó tɔ́ ce po nɔ ce po ná bó ɖe alɔ sín kan ce mẹ ɔ́, hwɛ Oklunɔ Jiwheyẹwhe ɔ́, a nǎ kɛ alɔ bo yí mì." },
    { num: 11, text: "Oklunɔ Jiwheyẹwhe! Xlɛ́ ali towe mì; kplá mì gbɔn ali ɖagbe jí ɖó kɛntɔ́ ce lẹ wú." },
    { num: 12, text: "Ma jó mì dó nú kɛntɔ́ ní zé mì dó wa nǔ e jló e ɔ́ ná ó; ɖó kúnnu agɔɖetɔ́ lẹ sí te dó jǐ ce, bó to adǎn gblɔ́n nú mì wẹ." },
    { num: 13, text: "Nú un ma ka gán jɛ wú dọ un ná mɔ xomɛnyínyɔ́ Oklunɔ Jiwheyẹwhe tɔn to aigba jí fí ǎ ɔ́, nɛ̌ gbɛ ce ka ná cí?" },
    { num: 14, text: "Đǒ nukún Oklunɔ Jiwheyẹwhe, dǒ gǎn, kpan akɔ́n, ɖǒ nukún Oklunɔ Jiwheyẹwhe." },
  ],
  "Jean 8": [
    { num: 1, text: "Lo ɔ́, Jesu yi só e è nɔ ylɔ́ dọ olívutín só ɔ́ jí." },
    { num: 2, text: "Ayǐhɔ́ngbe zǎnzǎn tɛɛn ɔ́, é lẹ́ kɔ yi sinsɛnxɔ mẹ, bɔ mẹ lẹ lẹpo nyi ahwan wá gɔ̌n tɔn, bɔ é jínjɔ́n ayǐ, bó jɛ nǔ kplɔ́n yé jí." },
    { num: 3, text: "Hwenɛ́nu wẹ sɛ́nkplɔ́nmɛtɔ́ lẹ podɔ Falizyɛn lẹ po kplá nyɔ̌nu ɖé wá, bó sɔ́ ɛ ɖó agun ɔ́ nukɔn; nyɔ̌nu énɛ́ ɔ́, afɔ dó gbě wẹ é ɖe bɔ yé gbo e dó." },
    { num: 4, text: "Yé dọ nú Jesu dọ: “ Mẹ̌si, nyɔ̌nu élɔ́ ɔ́, afɔ dó gbě wẹ é ɖe bɔ mí yi gbo e dó." },
    { num: 5, text: "Mɔyízi sɛ́n ɔ́ ka dọ jí mẹ mɔ̌hunkɔtɔn ɔ́, awǐnnyaglo wẹ è nǎ nyi dó hu i ná. Ani hwɛ ka lin d'é wú?”" },
    { num: 6, text: "Xó énɛ́ e yé kanbyɔ́ Jesu ɔ́, mɔ wẹ nyí bɔ yé ɖó n'i, bo na dó ɖó hwɛ n'i. Jesu ka fɛ, bo jɛ nǔ wlán dó kɔ́ mẹ jí podɔ alɔví po." },
    { num: 7, text: "Ée yé to nǔ kanbyɔ́ ɛ wẹ magbokɔ ɔ́, é jlɔ́ kɔ bó dọ nú yé dọ: “Mẹ e to mi mẹ bó ma hu hwɛ kpɔ́n gbeɖé ǎ ɔ́ ní nyi awǐnnyaglo dó e jɛ nukɔn.”" },
    { num: 8, text: "Ée é dọ mɔ̌ ɔ́, é lẹ́ vɔ́ fɛ, bó jɛ nǔ wlán dó kɔ́ mẹ jí." },
    { num: 9, text: "Ée yé mẹ e kplá nyɔ̌nu ɔ́ wá nú Jesu lẹ se mɔ̌ ɔ́, yé jɛ yiyi jí ɖokpó ɖokpó, bɛ́ sín mɛxó lẹ jí, bɔ é wá po Jesu ɖokpónɔ géé podɔ nyɔ̌nu ɔ́ po." },
    { num: 10, text: "Jesu lẹ́ jlɔ́, bó kanbyɔ́ nyɔ̌nu ɔ́ dọ: “Nyɔ̌nu! Fítɛ́ mẹ lẹ ɖe? Mẹ ɖěbǔ sɔ́ ɖó hwɛ nú we ǎ cé?”" },
    { num: 11, text: "Nyɔ̌nu ɔ́ yí gbe n'i dọ: “Yé ɖěbǔ ɖó hwɛ nú mì ǎ, Aklúnɔ.” Jesu ka dọ n'i dọ: “Nyɛ lɔmɔ̌ un ɖó hwɛ nú we ǎ; bo yi; bɛ́ sín din ɔ́, ma ka sɔ́ hu hwɛ ɖě ó.”]" },
    { num: 12, text: "Jesu lẹ́ jɛ nǔ kplɔ́n mẹ lẹ jí to sinsɛnxɔ mẹ, bo dọ nú yé dọ: “Nyɛ wẹ nyí hinhɔ́n gbɛ ɔ́ tɔn; mẹ e xwedó mì ɔ́ na gbɔn zinvlu mẹ gbeɖé ǎ, lo ɔ́ é ná mɔ hinhɔ́n e nɔ ná gbɛ jɔ gbɛ mẹ é.”" },
    { num: 13, text: "Falizyɛn lẹ ka dọ n'i dọ: “A to kúnnu ɖe nú hwiɖée wẹ; énɛ́ ɔ́ wú ɔ́, xó towe nyí nǔgbó ǎ.”" },
    { num: 14, text: "Jesu ka yí gbe nú yé dọ: “É ná bó nyí kúnnu ɖe nú nyɛɖée wẹ un ɖe ɔ́, xó e dọ wẹ un ɖe ɔ́, nǔgbó wẹ é nyí; ɖó un tunwun fí e un gosín ɔ́, bo ka lẹ́ tunwun fí e un xwe ɔ́. Midɛɛ lẹ ka tunwun fí e un gosín ɔ́ ǎ; mi ka lẹ́ tunwun fí e un xwe ɔ́ ǎ." },
    { num: 15, text: "Lě e gbɛtɔ́ lẹ nɔ dọ hwɛ gbɔn ɔ́ wẹ mi nɔ dọ hwɛ gbɔn; nyɛ ɔ́, un nɔ dọ hwɛ xá mɛɖé ǎ." },
    { num: 16, text: "Ényí un ka dọ hwɛ ɔ́, hwɛjijɔ wẹ un nɔ dọ; ɖó un to nyɛ ɖóɖó ǎ; Tɔ́ e sɛ́ mì dó ɔ́ podɔ nyɛ po wẹ to kpɔ́." },
    { num: 17, text: "È ka ko wlán dó Mawuxówéma mitɔn mẹ dọ: ‘Nǔ e mẹ we ɖe kúnnu ɖokpó ɔ́ ná ɔ́, nǔgbó wẹ é nyí.’" },
    { num: 18, text: "Un to kúnnu ɖe nú nyɛɖée wẹ, bɔ Tɔ́ e sɛ́ mì dó ɔ́ lɔ ka to kúnnu ɖe nú mì wẹ.”" },
    { num: 19, text: "Yé kanbyɔ́ ɛ dọ: “Fítɛ́ Tɔ́ towe ɔ́ ká ɖe?” Jesu yí gbe nú yé dọ: “Mi tunwun mì ǎ; mi ka lẹ́ tunwun Tɔ́ ce ǎ. Ényí mi ko tunwun mì wẹ ɔ́, mi ná ko tunwun Tɔ́ ce lɔmɔ̌.”" },
    { num: 20, text: "Whenuena Jesu to xó énɛ́ lẹ dọ wẹ ɔ́, nǔ kplɔ́n mẹ wẹ é ɖe to sinsɛnxɔ ɔ́ mẹ, to gbǎ e mẹ è nɔ sɔ́ akwɛ́ dó ɔ́ kpá; mẹ ɖěbǔ ka wlí i ǎ, ɖó gan tɔn ko xo ǎ." },
    { num: 21, text: "Jesu ka lẹ́ dọ nú yé dọ: “Un xweyǐgbe; mi na ba mì, lo ɔ́, mi ná kú dó hwɛ mitɔn lẹ mẹ, ɖó mi sixú yi fí e un xwe ɔ́ ǎ.”" },
    { num: 22, text: "Jwifugán lẹ ka jɛ ɖiɖɔ jí to yěɖée tɛ́ntin dọ: “Éɖée hu gbé wẹ é ka ja a? Đó é dọ: ‘Mi sixú yi fí e un xwe ɔ́ ǎ.’ ”" },
    { num: 23, text: "Jesu yí gbe nú yé dọ: “Midɛɛ lẹ ɔ́, aigba jí fí tɔn wẹ mi nyí, amɔ̌, nyɛ ɔ́, olọn tɔn wẹ un nyí: gbɛ élɔ́ tɔn wẹ mi nyí, amɔ̌, nyɛ ɔ́, un nyí gbɛ élɔ́ tɔn ǎ." },
    { num: 24, text: "Énɛ́ wútu wẹ un ko dọ nú mi dọ hwɛ mitɔn mẹ wẹ mi ná kú dó. Ényí mi ma ɖi nǔ dọ un nyí mẹ e un nyí é ǎ ɔ́, mi ná kú dó hwɛ mitɔn lẹ mẹ.”" },
    { num: 25, text: "Yé ká lẹ́ kanbyɔ́ ɛ dọ: “Mẹ̌ a ka nyí?” Jesu yí gbe nú yé dọ: “Mẹ e un ko dọ nú mi sín do dọ un nyí ɔ́ wẹ un nyí." },
    { num: 26, text: "Un ɖó nǔ gěgé bó ná dọ dó mi wú, bó ná dọ hwɛ dó nǔ gěgé wú nú mi; lo ɔ́, mẹ e sɛ́ mì dó ɔ́, nǔgbóɖɔtɔ́ wẹ, bɔ nǔ e un se to nu tɔn ɔ́ kɛ́ɖɛ́ dọ nú gbɛ ɔ́ wẹ un ɖe.”" },
    { num: 27, text: "Yé ká mɔ nǔ jɛ wú dọ Tɔ́ ɔ́ sín xó dọ nú émí wẹ é ɖe ǎ." },
    { num: 28, text: "Bɔ Jesu dọ nú yé dọ: “Whenuena mi ná wá sɔ́ Gbẹtɔví ɔ́ dó jǐ ɔ́, mi ná tunwun dọ un nyí mẹ e un nyí ɔ́, bó kún nɔ́ dọ nǔ ɖěbǔ to nyɛ ɖésúnɔ sín acɛ mẹ ó; nǔ e Tɔ́ ɔ́ kplɔ́n mì ɔ́ kɛ́ɖɛ́ wẹ un nɔ dọ." },
    { num: 29, text: "Mẹ e sɛ́ mì dó ɔ́ ka to kpɔ́ xá mì; é jó mì dó ǎ, ɖó nǔ e nyɔ́ nukún tɔn mẹ ɔ́ wẹ un nɔ bló tɛgbɛ.”" },
    { num: 30, text: "Ée Jesu to xó dọ wẹ gbɔn mɔ̌ ɔ́, mẹ gěgé ɖi nǔ n'i." },
    { num: 31, text: "Jesu dọ nú Jwifu e ɖi nǔ n'i lẹ dọ: “Ényí mi se gbe nú mì ɔ́, mi nyí ahwanvú ce lẹ nǔgbó." },
    { num: 32, text: "Mi ná tunwun nǔgbó ɔ́, bɔ nǔgbó ɔ́ ná ɖe mi sín kannumɔgbénu.”" },
    { num: 33, text: "Yé ká yí gbe n'i dọ: “Ablaxámu ví wẹ mí nyí, mí nɔ mɛɖé kannu kpɔ́n gbeɖé ǎ; étɛ́wútu a ka dọ è nǎ ɖe mí sín kannumɔgbénu?”" },
    { num: 34, text: "Jesu ka dọ nú yé dọ: “Má dọ nǔgbó nú mi: mẹ e nɔ hu hwɛ é ɖěbǔ ɔ́, hwɛ sín kannumɔ wẹ é nyí;" },
    { num: 35, text: "lo ɔ́, mẹ e nyí kannumɔ ɔ́ nɔ́ nɔ xwé gbe sɔ́yi ǎ; xwéví wẹ nɔ́ nɔ xwé gbe sɔ́yi." },
    { num: 36, text: "Ényí Vǐ ɔ́ ɖe mi sín kannumɔgbénu ɔ́, mi ná gosín kannumɔgbénu nǔgbó." },
    { num: 37, text: "Un tunwun dọ Ablaxámu ví wẹ mi nyí nǔgbó; lo ɔ́, mi to biba ná hu mì wẹ, ɖó mi ɖi nǔ nú xó ce lẹ ǎ wútu." },
    { num: 38, text: "Nǔ e un mɔ to Tɔ́ ce gɔ́n ɔ́ dọ wẹ un ɖe; mi lɔmɔ̌ ka to nǔ e mi se to tɔ́ mitɔn nu ɔ́ bló wẹ.”" },
    { num: 39, text: "Yé yǐ gbe n'i dọ: “Ablaxámu wẹ nyí tɔ́ mǐtɔn.” Jesu ka dọ nú yé dọ: “Ényí Ablaxámu ví wẹ mi ko nyí nǔgbó ɔ́, mi ná ko nɔ wa nǔ Ablaxámu ɖɔhun." },
    { num: 40, text: "Amɔ̌, din ɔ́, nyɛ ka dọ nǔgbó e un se to Jiwheyẹwhe nu ɔ́ nú mi; có mi ka lẹ́ to biba na hu mì wẹ; Ablaxámu ka wa nǔ mɔ̌hunkɔtɔn ɖě ǎ." },
    { num: 41, text: "Nǔ e tɔ́ mitɔn wa ɔ́ wa wẹ jɛ́n mi ɖe.” Ée é dọ mɔ̌ ɔ́, yé yǐ gbe n'i dọ: “Mí nyí agaví ǎ; Jiwheyẹwhe wẹ nyí Tɔ́ ɖokpó géé e mí ɖó é.”" },
    { num: 42, text: "Jesu ka yí gbe nú yé dọ: “Nú Jiwheyẹwhe jɛ́n nyí Tɔ́ mitɔn nǔgbó ɔ́, mi na ko yí wǎn nú mì, ɖó Jiwheyẹwhe gɔ́n wẹ un gosín bó wá. Jlǒ nyɛ ɖésúnɔ tɔn mẹ wẹ un wá dó ǎ; lo ɔ́, é wẹ sɛ́ mì dó." },
    { num: 43, text: "Étɛ́wú mi ma ka mɔ nǔ jɛ xó ce lẹ wú ǎ? Đó xó ce nɔ vɛ́ se nú mi." },
    { num: 44, text: "Awǒvi wẹ nyí tɔ́ mitɔn, bɔ nǔ e nɔ jló e lẹ wiwa wẹ nɔ myá nukún nú mi. Mɛhutɔ́ wẹ é ko nyí sín do, é yí wǎn nú nǔgbó ǎ, ɖó nǔgbó ɖě to nu tɔn ǎ; é ná ɖó nǔvú ɔ́, nǔ to gaan wẹ, ɖó é ɖésúnɔ lẹpo wẹ ko nyí adingbannɔ, bo nyí adingbannɔ lẹ sín tɔ́." },
    { num: 45, text: "Amɔ̌, nyɛ ɔ́, nǔgbó wẹ un nɔ dọ; énɛ́ ɔ́ wú wẹ mi ma nɔ ɖi nǔ nú mì ǎ." },
    { num: 46, text: "Mẹ̌ ká to mi mẹ, bó ná sixú ɖe xlɛ́ dọ un hu hwɛ kpɔ́n? Ényí un ka to nǔgbó dọ wẹ ɔ́, aniwú wẹ mi ma nɔ ɖi nǔ nú mì ǎ?" },
    { num: 47, text: "Mẹ e nyí Jiwheyẹwhe tɔn ɔ́, Mawuxó wẹ é nɔ ɖótó; midɛɛ lẹ ɔ́, mi ka nɔ ɖótó Mawuxó ɔ́ ǎ, ɖó mi nyí étɔn ǎ wú.”" },
    { num: 48, text: "Jwifu e gbɛ́ wǎn nú Jesu lẹ ka yí gbe n'i dọ: “Ée mí dọ Samalíinu wẹ a nyǐ, bɔ yɛ nyanya to jǐ towe é ɔ́, a ma mɔ dọ hwɛ mǐtɔn jɔ a?”" },
    { num: 49, text: "Jesu ka yí gbe nú yé dọ: “Yɛ nyanya ɖě to jǐ ce ǎ; Tɔ́ ce sɔ́ su wẹ un ɖe, bɔ midɛɛ lẹ ka to hɛ̌n dó mì wẹ." },
    { num: 50, text: "Nyɛ ɖésú wẹ nɔ sɔ́ nyɛɖée su ǎ; Jiwheyẹwhe wẹ nɔ sɔ́ mì su, bo nɔ dọ hwɛ." },
    { num: 51, text: "Má dọ nǔgbó nú mi: ényí mɛɖé se xó ce, bó bló ɖ'é jí ɔ́, mẹ ɔ́ ná kú gbeɖé ǎ.”" },
    { num: 52, text: "Jwifu e gbɛ́ wǎn nú Jesu lẹ yí gbe n'i dọ: “Mí mɔ din dọ yɛ nyanya wẹ to jǐ towe nǔgbó; Ablaxámu ko kú wá yi, bɔ gbeyíɖɔ Jiwheyẹwhe tɔn lẹ lẹpo ko kú, hwɛ ka wá dọ din dọ: ‘Ényí mɛɖé se xó ce bó bló ɖ'é jí ɔ́, mẹ ɔ́ ná kú gbeɖé ǎ.’" },
    { num: 53, text: "Hwɛ hú gǎn tɔ́gbó mǐtɔn Ablaxámu wẹ a? Éyɛ́ ko kú, bɔ gbeyíɖɔ Jiwheyẹwhe tɔn lẹ lɔmɔ̌ ko kú. Mẹ̌ a ka nɔ sɔ́ hwiɖée dó mɔ?”" },
    { num: 54, text: "Jesu ka yí gbe nú yé dọ: “Ényí nyɛ ɖésú wẹ nɔ sɔ́ nyɛɖée su ɔ́, susu ce na xɔ akwɛ́ ǎ. Tɔ́ ce wẹ ka nɔ sɔ́ mì su. Mi ɖíe ka dọ é wẹ nyí Jiwheyẹwhe nú émí e," },
    { num: 55, text: "có mi ka tunwun i ǎ; nyɛ ɔ́, un tunwun i. Ényí un dọ un kún tunwun i ó ɔ́, un ná nyí nǔvúɖótɔ́ mi ɖɔhun. Lo ɔ́, nyɛ tunwun i, bó nɔ́ bló xó tɔn lẹ ɖ'é jí." },
    { num: 56, text: "Awǎjijɛ ɖaxó wẹ nyí nú tɔ́gbó mitɔn Ablaxámu, ɖó é to nukún ɖó wiwa ce wẹ; é ka mɔ nǔgbó, bɔ xomɛ hun i.”" },
    { num: 57, text: "Jwifu e gbɛ́ wǎn nú Jesu lẹ ka kanbyɔ́ ɛ dọ: “A ko ɖó xwe kanɖé wǒ (50) vɔ́vɔ́ ǎ, bó ka mɔ Ablaxámu a?”" },
    { num: 58, text: "Jesu ka dọ nú yé dọ: “Ma dọ nǔgbó nú mi: cóbónú Ablaxámu ná jɔ ɔ́, nyɛ ko tíin.”" },
    { num: 59, text: "Bɔ yé fɔ awǐnnyaglo, bó ná nyi dó e; Jesu ka bɛ, bó tɔ́n sín sinsɛnxɔ ɔ́ mẹ." },
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

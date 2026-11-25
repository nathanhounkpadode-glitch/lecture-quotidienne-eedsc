import { NextRequest, NextResponse } from "next/server";

// Standard mapping of French and English book names to 3-letter USFM codes
const USFM_MAP: Record<string, string> = {
  // Ancien Testament
  "genese": "GEN", "genesis": "GEN",
  "exode": "EXO", "exodus": "EXO",
  "levitique": "LEV", "leviticus": "LEV",
  "nombres": "NUM", "numbers": "NUM",
  "deuteronome": "DEU", "deuteronomy": "DEU",
  "josue": "JOS", "joshua": "JOS",
  "juges": "JDG", "judges": "JDG",
  "ruth": "RUT",
  "1 samuel": "1SA", "2 samuel": "2SA",
  "1 rois": "1KI", "2 rois": "2KI",
  "1 chroniques": "1CH", "2 chroniques": "2CH",
  "esdras": "EZR", "ezra": "EZR",
  "nehemie": "NEH", "nehemiah": "NEH",
  "esther": "EST",
  "job": "JOB",
  "psaumes": "PSA", "psaume": "PSA", "psalms": "PSA", "psalm": "PSA",
  "proverbes": "PRO", "proverbs": "PRO",
  "ecclesiaste": "ECC", "ecclesiastes": "ECC",
  "cantique des cantiques": "SNG", "song of solomon": "SNG",
  "esaie": "ISA", "isaiah": "ISA",
  "jeremie": "JER", "jeremiah": "JER",
  "lamentations": "LAM",
  "ezechiel": "EZK", "ezekiel": "EZK",
  "daniel": "DAN",
  "osee": "HOS", "hosea": "HOS",
  "joel": "JOL",
  "amos": "AMO",
  "abdias": "OBA", "obadiah": "OBA",
  "jonas": "JON", "jonah": "JON",
  "michee": "MIC", "micah": "MIC",
  "nahum": "NAM",
  "habacuc": "HAB", "habakkuk": "HAB",
  "sophonie": "ZEP", "zephaniah": "ZEP",
  "aggee": "HAG", "haggai": "HAG",
  "zacharie": "ZEC", "zechariah": "ZEC",
  "malachie": "MAL", "malachi": "MAL",

  // Nouveau Testament
  "matthieu": "MAT", "matthew": "MAT",
  "marc": "MRK", "mark": "MRK",
  "luc": "LUK", "luke": "LUK",
  "jean": "JHN", "john": "JHN",
  "actes": "ACT", "acts": "ACT",
  "romains": "ROM", "romans": "ROM",
  "1 corinthiens": "1CO", "1 corinthians": "1CO",
  "2 corinthiens": "2CO", "2 corinthians": "2CO",
  "galates": "GAL", "galatians": "GAL",
  "ephesiens": "EPH", "ephesians": "EPH",
  "philippiens": "PHP", "philippians": "PHP",
  "colossiens": "COL", "colossians": "COL",
  "1 thessaloniciens": "1TH", "1 thessalonians": "1TH",
  "2 thessaloniciens": "2TH", "2 thessalonians": "2TH",
  "1 timothee": "1TI", "1 timothy": "1TI",
  "2 timothee": "2TI", "2 timothy": "2TI",
  "tite": "TIT", "titus": "TIT",
  "philemon": "PHM",
  "hebreux": "HEB", "hebrews": "HEB",
  "jacques": "JAS", "james": "JAS",
  "1 pierre": "1PE", "1 peter": "1PE",
  "2 pierre": "2PE", "2 peter": "2PE",
  "1 jean": "1JN", "1 john": "1JN",
  "2 jean": "2JN", "2 john": "2JN",
  "3 jean": "3JN", "3 john": "3JN",
  "jude": "JUD",
  "apocalypse": "REV", "revelation": "REV"
};

// Filesets by language on Bible Brain (Faith Comes By Hearing)
const FILESETS_BY_LANG: Record<string, string[]> = {
  fon: ["FONBSBN2DA", "FONBSBN1DA"],
  goun: ["GUWBSBN2DA", "GUWBSBN1DA", "GUWDPBN2DA", "GUWDPBN1DA"],
  fr: ["FRABLSN2DA", "FRABLSN1DA"],
  en: ["ENGKJVN2DA", "ENGKJVN1DA"]
};

// Local static studio MP3 files bundled in /public
const LOCAL_MP3_MAP: Record<string, string> = {
  "fr_Genèse_1": "/audio_genese_1_fr.mp3",
  "fr_Genèse_2": "/audio_genese_2_fr.mp3",
  "fr_Genèse_3": "/audio_genese_3_fr.mp3",
  "fr_Psaume_27": "/audio_psaume_27_fr.mp3",
  "fr_Jean_8": "/audio_jean_8_fr.mp3",
  "en_Jean_8": "/audio_jean8_36_en.mp3",
  "en_John_8": "/audio_jean8_36_en.mp3",
};

function normalizeName(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lang = (searchParams.get("lang") || "fr").toLowerCase();
  const bookParam = searchParams.get("book") || "";
  const chapterParam = searchParams.get("chapter") || "1";

  if (!bookParam) {
    return NextResponse.json({ error: "Paramètre 'book' manquant" }, { status: 400 });
  }

  // 1. Check local MP3 files first
  const localKey = `${lang}_${bookParam}_${chapterParam}`;
  if (LOCAL_MP3_MAP[localKey]) {
    return NextResponse.json({
      success: true,
      available: true,
      source: "local",
      audioUrl: LOCAL_MP3_MAP[localKey],
      lang,
      book: bookParam,
      chapter: chapterParam
    });
  }

  // 2. Identify USFM Book Code
  const normalizedBook = normalizeName(bookParam);
  const usfmCode = USFM_MAP[normalizedBook] || bookParam.toUpperCase();

  // 3. Check for Bible Brain API Key
  const apiKey = process.env.BIBLE_BRAIN_KEY || process.env.NEXT_PUBLIC_BIBLE_BRAIN_KEY;
  if (!apiKey) {
    return NextResponse.json({
      success: false,
      available: false,
      source: "pending_key",
      message: "Clé API Bible Brain en cours de configuration. Enregistrez-vous sur 4.dbt.io/api_key/request",
      lang,
      book: bookParam,
      usfmCode,
      chapter: chapterParam
    });
  }

  // 4. Query Bible Brain for the audio fileset
  const filesets = FILESETS_BY_LANG[lang] || [];
  for (const filesetId of filesets) {
    try {
      const url = `https://4.dbt.io/api/bibles/filesets/${filesetId}/${usfmCode}/${chapterParam}?v=4&key=${apiKey}`;
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0 && json.data[0].path) {
          return NextResponse.json({
            success: true,
            available: true,
            source: "biblebrain",
            filesetId,
            audioUrl: json.data[0].path,
            lang,
            book: bookParam,
            usfmCode,
            chapter: chapterParam
          });
        }
      }
    } catch (err) {
      console.error(`BibleBrain query error for ${filesetId}:`, err);
    }
  }

  return NextResponse.json({
    success: false,
    available: false,
    source: "not_found",
    message: `Aucun fichier audio trouvé pour ${bookParam} ${chapterParam} en ${lang}`,
    lang,
    book: bookParam,
    usfmCode,
    chapter: chapterParam
  });
}

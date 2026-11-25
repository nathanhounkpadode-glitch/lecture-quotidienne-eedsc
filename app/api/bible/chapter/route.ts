import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Mapping French book names to keys in JSON files
const BOOK_MAP: Record<string, { lsg: string; kjv: string }> = {
  "Genèse": { lsg: "Genesis", kjv: "Genesis" },
  "Exode": { lsg: "Exodus", kjv: "Exodus" },
  "Lévitique": { lsg: "Leviticus", kjv: "Leviticus" },
  "Nombres": { lsg: "Numbers", kjv: "Numbers" },
  "Deutéronome": { lsg: "Deuteronomy", kjv: "Deuteronomy" },
  "Josué": { lsg: "Joshua", kjv: "Joshua" },
  "Juges": { lsg: "Judges", kjv: "Judges" },
  "Ruth": { lsg: "Ruth", kjv: "Ruth" },
  "1 Samuel": { lsg: "I Samuel", kjv: "1 Samuel" },
  "2 Samuel": { lsg: "II Samuel", kjv: "2 Samuel" },
  "1 Rois": { lsg: "I Kings", kjv: "1 Kings" },
  "2 Rois": { lsg: "II Kings", kjv: "2 Kings" },
  "1 Chroniques": { lsg: "I Chronicles", kjv: "1 Chronicles" },
  "2 Chroniques": { lsg: "II Chronicles", kjv: "2 Chronicles" },
  "Esdras": { lsg: "Ezra", kjv: "Ezra" },
  "Néhémie": { lsg: "Nehemiah", kjv: "Nehemiah" },
  "Esther": { lsg: "Esther", kjv: "Esther" },
  "Job": { lsg: "Job", kjv: "Job" },
  "Psaumes": { lsg: "Psalms", kjv: "Psalms" },
  "Psaume": { lsg: "Psalms", kjv: "Psalms" },
  "Proverbes": { lsg: "Proverbs", kjv: "Proverbs" },
  "Ecclésiaste": { lsg: "Ecclesiastes", kjv: "Ecclesiastes" },
  "Cantique des Cantiques": { lsg: "Song of Solomon", kjv: "Song of Solomon" },
  "Ésaïe": { lsg: "Isaiah", kjv: "Isaiah" },
  "Jérémie": { lsg: "Jeremiah", kjv: "Jeremiah" },
  "Lamentations": { lsg: "Lamentations", kjv: "Lamentations" },
  "Ézéchiel": { lsg: "Ezekiel", kjv: "Ezekiel" },
  "Daniel": { lsg: "Daniel", kjv: "Daniel" },
  "Osée": { lsg: "Hosea", kjv: "Hosea" },
  "Joël": { lsg: "Joel", kjv: "Joel" },
  "Amos": { lsg: "Amos", kjv: "Amos" },
  "Abdias": { lsg: "Obadiah", kjv: "Obadiah" },
  "Jonas": { lsg: "Jonah", kjv: "Jonah" },
  "Michée": { lsg: "Micah", kjv: "Micah" },
  "Nahum": { lsg: "Nahum", kjv: "Nahum" },
  "Habacuc": { lsg: "Habakkuk", kjv: "Habakkuk" },
  "Sophonie": { lsg: "Zephaniah", kjv: "Zephaniah" },
  "Aggée": { lsg: "Haggai", kjv: "Haggai" },
  "Zacharie": { lsg: "Zechariah", kjv: "Zechariah" },
  "Malachie": { lsg: "Malachi", kjv: "Malachi" },
  "Matthieu": { lsg: "Matthew", kjv: "Matthew" },
  "Marc": { lsg: "Mark", kjv: "Mark" },
  "Luc": { lsg: "Luke", kjv: "Luke" },
  "Jean": { lsg: "John", kjv: "John" },
  "Actes": { lsg: "Acts", kjv: "Acts" },
  "Actes des Apôtres": { lsg: "Acts", kjv: "Acts" },
  "Romains": { lsg: "Romans", kjv: "Romans" },
  "1 Corinthiens": { lsg: "I Corinthians", kjv: "1 Corinthians" },
  "2 Corinthiens": { lsg: "II Corinthians", kjv: "2 Corinthians" },
  "Galates": { lsg: "Galatians", kjv: "Galatians" },
  "Éphésiens": { lsg: "Ephesians", kjv: "Ephesians" },
  "Philippiens": { lsg: "Philippians", kjv: "Philippians" },
  "Colossiens": { lsg: "Colossians", kjv: "Colossians" },
  "1 Thessaloniciens": { lsg: "I Thessalonians", kjv: "1 Thessalonians" },
  "2 Thessaloniciens": { lsg: "II Thessalonians", kjv: "2 Thessaloniciens" },
  "1 Timothée": { lsg: "I Timothy", kjv: "1 Timothy" },
  "2 Timothée": { lsg: "II Timothy", kjv: "2 Timothy" },
  "Tite": { lsg: "Titus", kjv: "Titus" },
  "Philémon": { lsg: "Philemon", kjv: "Philemon" },
  "Hébreux": { lsg: "Hebrews", kjv: "Hebrews" },
  "Jacques": { lsg: "James", kjv: "James" },
  "1 Pierre": { lsg: "I Peter", kjv: "1 Peter" },
  "2 Pierre": { lsg: "II Peter", kjv: "2 Peter" },
  "1 Jean": { lsg: "I John", kjv: "1 John" },
  "2 Jean": { lsg: "II John", kjv: "2 John" },
  "3 Jean": { lsg: "III John", kjv: "3 John" },
  "Jude": { lsg: "Jude", kjv: "Jude" },
  "Apocalypse": { lsg: "Revelation of John", kjv: "Revelation" }
};

let lsgCache: any = null;
let kjvCache: any = null;

function loadData() {
  if (!lsgCache) {
    const lsgPath = path.join(process.cwd(), "data", "bible_source", "lsg.json");
    if (fs.existsSync(lsgPath)) {
      lsgCache = JSON.parse(fs.readFileSync(lsgPath, "utf-8"));
    }
  }
  if (!kjvCache) {
    const kjvPath = path.join(process.cwd(), "data", "bible_source", "kjv.json");
    if (fs.existsSync(kjvPath)) {
      kjvCache = JSON.parse(fs.readFileSync(kjvPath, "utf-8"));
    }
  }
}

export async function GET(req: NextRequest) {
  try {
    loadData();
    const { searchParams } = new URL(req.url);
    const ref = searchParams.get("ref") || "";
    let book = searchParams.get("book") || "";
    let chapterStr = searchParams.get("chapter") || "";

    if (ref && (!book || !chapterStr)) {
      const parts = ref.trim().split(" ");
      chapterStr = parts.pop() || "1";
      book = parts.join(" ");
    }

    const chapterNum = parseInt(chapterStr, 10) || 1;
    const cleanBook = book.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    const mapping =
      BOOK_MAP[book] ||
      Object.entries(BOOK_MAP).find(([k]) => k.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() === cleanBook)?.[1] ||
      Object.entries(BOOK_MAP).find(([k]) => cleanBook.startsWith(k.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()))?.[1];

    if (!mapping) {
      return NextResponse.json({ error: "Livre non reconnu" }, { status: 404 });
    }

    const lsgBookData = lsgCache?.books?.[mapping.lsg]?.[String(chapterNum)] || {};
    const kjvBookData = kjvCache?.[mapping.kjv]?.[String(chapterNum)] || {};

    const frVerses = Object.entries(lsgBookData).map(([num, text]) => ({
      num: parseInt(num, 10),
      text: String(text).trim()
    })).sort((a, b) => a.num - b.num);

    const enVerses = Object.entries(kjvBookData).map(([num, text]) => ({
      num: parseInt(num, 10),
      text: String(text).trim()
    })).sort((a, b) => a.num - b.num);

    return NextResponse.json({
      reference: `${book} ${chapterNum}`,
      book,
      chapter: chapterNum,
      fr: frVerses,
      en: enVerses
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

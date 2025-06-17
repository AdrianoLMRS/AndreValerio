/*
    This script translates the contents of a JSON file containing localization strings
    using the LibreTranslate API. It reads the base language file, translates its contents
    into multiple target languages, and writes the translated content to new JSON files.
    Use the docker image `libretranslate/libretranslate` to run the LibreTranslate service locally.
*/

import fs from 'fs/promises';
import fetch from 'node-fetch';

import { fileURLToPath } from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.resolve(__dirname, './locales/');

import { locales, defaultLang } from './ui.ts';

const baseLang = defaultLang;
const targetLangs = locales;
const endpoint = 'http://localhost:5000/translate';

type TranslatableObject = {
    [key: string]: string | TranslatableObject;
};

type TranslatedObject<T = unknown> = {
    [K in keyof T]: T[K] extends string
      ? string
      : T[K] extends object
      ? TranslatedObject<T[K]>
      : never;
};

// Translate text using the LibreTranslate service
async function translateText(text: string, target: string): Promise<string> {
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            q: text,
            source: baseLang,
            target,
            format: 'text',
        }),
    });

    const json = await res.json();
    return json.translatedText;
}

// Recursively translate an object, translating all string values
async function translateObject<T extends TranslatableObject>(
    obj: T,
    target: string
): Promise<TranslatedObject<T>> {
    const translated = {} as TranslatedObject<T>;
    for (const key in obj) {
        const value = obj[key];
        translated[key] = typeof value === 'string' ? await translateText(value, target) as TranslatedObject<T>[typeof key] : await translateObject(value as TranslatableObject, target) as TranslatedObject<T>[typeof key];
    }
    return translated;
}

async function run() {
    const d = { // Decoration for console output
        color: '\x1b[32m', // Green
        color2: '\x1b[33m', // Yellow
        underscore: '\x1b[4m', // Underline
        reset: '\x1b[0m', // Reset
        bright: '\x1b[1m', // Bright
    } as const;
    const baseRaw = await fs.readFile(`${basePath}/en.json`, 'utf-8');
    const baseJson = JSON.parse(baseRaw) as TranslatableObject;

    for (const lang of targetLangs) {
        if (lang === baseLang) continue;

        const translated = await translateObject(baseJson, lang);
        await fs.writeFile(`${basePath}/${lang}.json`, JSON.stringify(translated, null, 2), 'utf-8');
        console.log(`${d.color}%s${d.reset}`, `✔  Translation to ${d.underscore + d.bright + d.color2}${lang}${d.reset + d.color} generated with success!.`);
    }
}

export { run as translateAll };
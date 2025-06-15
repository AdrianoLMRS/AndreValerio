/*
    This script translates the contents of a JSON file containing localization strings
    using the LibreTranslate API. It reads the base language file, translates its contents
    into multiple target languages, and writes the translated content to new JSON files.
    Use the docker image `libretranslate/libretranslate` to run the LibreTranslate service locally.
*/

import fs from 'fs/promises';
import fetch from 'node-fetch';

const baseLang = 'en';
const basePath= './src/i18n/locales/';
const targetLangs = ['pt', 'pt-br', 'es', 'de', 'fr'];
const endpoint = 'http://localhost:5000/translate';

// Translate text using the LibreTranslate service
async function translateText(text, target) {
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
async function translateObject(obj, target) {
    const translated = {};
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            translated[key] = await translateText(obj[key], target);
        } else if (typeof obj[key] === 'object') {
            translated[key] = await translateObject(obj[key], target);
        }
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
    };
    const baseRaw = await fs.readFile(`${basePath}en.json`, 'utf-8');
    const baseJson = JSON.parse(baseRaw);

    for (const lang of targetLangs) {
        const translated = await translateObject(baseJson, lang);
        await fs.writeFile(`${basePath}${lang}.json`, JSON.stringify(translated, null, 2), 'utf-8');
        console.log(`${d.color}%s${d.reset}`, `✔  Translation to ${d.underscore + d.bright + d.color2}${lang}${d.reset + d.color} generated with success!.`);
    }
}

run().catch(console.error);

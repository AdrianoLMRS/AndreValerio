// * This script is for generating SEO metadata in JSON format for a website.  (Need this because internationalization)

import fs from 'fs/promises';
import path from 'path';
import { author } from '../data/author.js';

const PATH = new URL('./locales/en.json', import.meta.url);
const DIR = path.dirname(PATH.pathname);

// Will generate a JSON file with SEO data for the website
const seo = {
    __seo: {
        home: {
            title: `${author.name} - ${author.job}`,
            description: `${author.name} Oficial website, ${author.job}. Discover my music, videos, and more.`,
            imgAlt: `${author.name} official banner`,
        },
        about: {
            title: `About – ${author.name}`,
            description: `Learn more about ${author.name}, his background as a musician and creative journey.`,
        },
        songs: {
            title: `Songs & Albums – ${author.name}`,
            description: `Explore the music of ${author.name}, including his latest songs and albums.`,
            albumName: `${author.name} Latest Releases & Songs`,
        },
        videos: {
            title: `Videos & Movies – ${author.name}`,
            description: `Explore a collection of videos and movies featuring ${author.name}.`,
            videoName: `${author.name} Video Gallery`,
        },
        contact: {
            title: `Contact – ${author.name}`,
            description: `Get in touch with ${author.name} for collaborations, inquiries, or just to say hello.`,
        },
        shared: {       
            imgAlt: `${author.name} portrait`,
        },
    },
};

// Write the merged data back to the file
async function main() {
    try {
        await fs.mkdir(DIR, { recursive: true });
    
        let existingData = {};
        existingData = await fs.readFile(PATH, 'utf-8').then(JSON.parse).catch(err => (err.code === 'ENOENT' ? {} : Promise.reject(err)));
        // Merge existing data with new SEO data
        const merged = { ...existingData, ...seo };
    
        await fs.writeFile(PATH, JSON.stringify(merged, null, 2), 'utf-8');
    
    } catch (error) {
        console.error('Error generating SEO JSON file:', error);
    }
}
  
main()
    .then(() => {
        console.log('SEO JSON file generated successfully at:', PATH.href);
    })
    .catch((error) => {
        console.error('Error generating SEO JSON file:', error);
    });
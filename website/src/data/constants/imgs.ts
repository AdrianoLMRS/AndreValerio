import Banner from '@assets/img/Andre-Valerio-Banner.webp';
import Banner2 from '@assets/img/Andre-Valerio-Banner-2.webp';
import Banner3 from '@assets/img/Andre-Valerio-Banner-3.webp';
import Banner4 from '@assets/img/Andre-Valerio-Banner-4.webp';

const n : number = 48;
const size : string = String(n);
export const socialSize : string = String(92);
const logoSize : string = size + 'x' + size;
// const backgroundSize : string = '1920x1080';

const Imgs = {
    local: {
        menu: '@assets/menu.svg',
        banner: Banner,
        banner2: Banner2,
        banner3: Banner3,
        banner4: Banner4,
    },
    cdn: {
        menu: `https://img.icons8.com/ios-filled/${size}/menu--v6.png`,
        logo: `https://placehold.jp/FFFAFA/333333/${logoSize}.png?text=Logo&css=%7B%22border-radius%22%3A%2215px%22%7D`,
        phone: `https://img.icons8.com/ios-filled/${socialSize}/phone.png`,
        email: `https://img.icons8.com/ios-filled/${socialSize}/new-post.png`,
        whatsapp: `https://img.icons8.com/ios-filled/${socialSize}/whatsapp--v1.png`,
        spotify: 'https://img.icons8.com/ios-glyphs/24/spotify.png',
        linktree: `https://img.icons8.com/pulsar-gradient/${socialSize}/linktree.png`,
        instagram: `https://img.icons8.com/fluency/${socialSize}/instagram-new.png`,
        instagramBlack: `https://img.icons8.com/ios-filled/${socialSize}/instagram-new--v1.png`,
        facebook: `https://img.icons8.com/office/${socialSize}/facebook.png`,
        youtube: `https://img.icons8.com/color/${socialSize}/youtube-play.png`,
        spotify96: `https://img.icons8.com/fluency/${socialSize}/spotify.png`,
        applemusic: `https://img.icons8.com/color/${socialSize}/apple-music.png`,
        soundslice: 'https://iili.io/3R0u0Bt.webp',
        twitter: `https://img.icons8.com/ios/${socialSize}/twitterx--v1.png`,
        twitterFilled: `https://img.icons8.com/ios-filled/${socialSize}/twitterx--v1.png`,
    },
    videos: {
        intro: 'PwFLA4nb74I',
    },
    audio: {
        tempestuoso: '/Tempestuoso-Tio-Chorinho.mp3'
    },
} as const;

export default Imgs;
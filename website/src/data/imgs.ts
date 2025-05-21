import Banner from '@/../public/banner.jpg';
import Banner2 from '@/../public/banner2.jpg';

const n : number = 48;
const size : string = String(n);
export const socialSize : string = String(92);
const logoSize : string = size + 'x' + size;
// const backgroundSize : string = '1920x1080';

const Imgs = {
    local: {
        menu: '@assets/menu.svg',
        banner: {
            url: new URL('/banner.jpg', import.meta.env.SITE),
            PB: '/banner.jpg',
            format: Banner.format,
            height: Banner.height,
            width: Banner.width,
        },
        banner2: {
            url: new URL('/banner2.jpg', import.meta.env.SITE),
            PB: '/banner2.jpg',
            format: Banner2.format,
            height: Banner2.height,
            width: Banner2.width,
        },
    },
    cdn: {
        background: 'https://iili.io/3KXmjWP.webp',
        backgroundMobile: 'https://andrevalerio.com/wp-content/uploads/2023/10/Sambado_Quartet_credits_Alfredo_Alves-11.jpeg',
        pic: 'https://iili.io/3cJZ2dF.jpg',
        banner: 'https://iili.io/3Wgfqzu.webp',
        banner2: 'https://iili.io/3vQM8es.webp',
        banner3: 'https://iili.io/3LuKib9.webp',
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
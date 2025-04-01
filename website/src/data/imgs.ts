const n : number = 48;
const size : string = String(n);
const socialSize : string = String(n * 2);
const logoSize : string = size + 'x' + size;
// const backgroundSize : string = '1920x1080';

const Imgs = {
    local: {
        menu: '@assets/menu.svg',
    },
    cdn: {
        background: 'https://iili.io/3KXmjWP.webp',
        backgroundMobile: 'https://andrevalerio.com/wp-content/uploads/2023/10/Sambado_Quartet_credits_Alfredo_Alves-11.jpeg',
        photo: 'https://andrevalerio.com/wp-content/uploads/2019/04/Andre_headshot-687x1024.jpg',
        menu: `https://img.icons8.com/ios-filled/${size}/menu--v6.png`,
        logo: `https://placehold.jp/FFFAFA/333333/${logoSize}.png?text=Logo&css=%7B%22border-radius%22%3A%2215px%22%7D`,
        spotify: 'https://img.icons8.com/ios-glyphs/24/spotify.png',
        guitar: 'https://iili.io/3nKNq8u.webp',
        linktree: `https://img.icons8.com/pulsar-gradient/${socialSize}/linktree.png`,
        instagram: `https://img.icons8.com/fluency/${socialSize}/instagram-new.png`,
        facebook: `https://img.icons8.com/office/${socialSize}/facebook.png`,
        youtube: `https://img.icons8.com/color/${socialSize}/youtube-play.png`,
        soundslice: 'https://iili.io/3R0u0Bt.webp',
    },
    videos: {
        intro: 'PwFLA4nb74I',
    },
};

export default Imgs;
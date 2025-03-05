const size : string = '48';
const logoSize : string = size + 'x' + size;
const backgroundSize : string = '2500x1660';

const Imgs = {
    local: {
        menu: '@assets/menu.svg',
    },
    cdn: {
        background: `https://placehold.jp/64/3d4070/D4CDF4/${backgroundSize}.png?text=Background%20Photo%20(Andr%C3%A9%20Val%C3%A9rio)&css=%7B%22background%22%3A%22%20linear-gradient(to%20bottom%2C%20%230A0A0A%2C%20%23333333)%22%7D`,
        menu: `https://img.icons8.com/ios-filled/${size}/menu--v6.png`,
        logo: `https://placehold.jp/FFFAFA/333333/${logoSize}.png?text=Logo&css=%7B%22border-radius%22%3A%2215px%22%7D`,
    },
};

export default Imgs;
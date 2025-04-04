export default function lockScroll(lock: boolean) {
    const html = document.documentElement;
    const body = document.body;

    if (lock) {
        const scrollY = window.scrollY;
        body.style.overflow = 'hidden';
        html.style.overflow = 'hidden';
        body.dataset.scrollY = scrollY.toString();
    } else {
        const scrollY = body.dataset.scrollY || '0';
        body.style.overflow = '';
        html.style.overflow = '';
        window.scrollTo(0, parseInt(scrollY));
        delete body.dataset.scrollY;
    }
}
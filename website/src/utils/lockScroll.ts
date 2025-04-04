export default function lockScroll(lock: boolean) {
    const html = document.documentElement;
    const body = document.body;

    if (lock) {
        body.style.overflow = 'hidden';
        html.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
        html.style.overflow = '';
    }
}
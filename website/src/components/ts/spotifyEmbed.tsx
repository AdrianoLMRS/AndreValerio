import { useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
    html: string;
    wrapperClass?: string;
    loading: ReactNode;
};

const defaultLoading = <div className="fallback">Loading...</div>;

export default function SpotifyEmbed({ html, wrapperClass='spotify-embed', loading = defaultLoading }: Props) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!wrapperRef.current) return;

        const container = wrapperRef.current;
        container.innerHTML = '';

        const temp = document.createElement('div');
        temp.innerHTML = html;

        const iframe = temp.querySelector('iframe');
        if (iframe) {
            iframe.style.display = 'none'; // Hide until loads...
            container.appendChild(iframe);

            const observer = new MutationObserver(() => {
                if (iframe && iframe.contentWindow) {
                    setLoaded(true);
                    iframe.style.display = 'block';
                    observer.disconnect();
                }
            });

            observer.observe(iframe, { attributes: true, childList: true, subtree: true });

            // fallback: ativa o loading manualmente após 2 segundos
            setTimeout(() => {
                if (!loaded) {
                    iframe.style.display = 'block';
                    setLoaded(true);
                    observer.disconnect();
                }
            }, 2000);
        }
    }, [html]);

    // TODO: Make these <div>'s only display: contents
    return (
        <div className={`${wrapperClass}`}>
            {!loaded && loading}
            <div
                ref={wrapperRef}
                style={{ display: loaded ? 'contents' : 'none' }}
            />
        </div>
    );
}

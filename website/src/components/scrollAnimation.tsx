import React, { useEffect, useRef, useState } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  repeat?: boolean;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children, className = 'animated', threshold = 0.1, repeat = false }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [rendered, setRendered] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        setRendered(true);

        const target = container.querySelector('astro-slot')?.firstElementChild ?? container.firstElementChild;
        if (!(target instanceof HTMLElement)) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting || (!repeat && isVisible));
        }, { threshold });

        observer.observe(target);
        return () => observer.disconnect();
    }, [threshold, repeat, isVisible]);

    return (
        <div
        ref={containerRef}
        style={{ display: "contents" }}
        className={`${className} ${isVisible ? 'visible' : 'hidden'} ${rendered ? "rendered" : undefined}`}>
            {children}
        </div>
    );
};

export default ScrollAnimation;

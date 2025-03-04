/*
    * Component for adding an class to children with intersectionObserver
*/

import React, { useEffect, useRef, useState } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  repeat?: boolean;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children, className, threshold, repeat=false }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [rendered, setRendered] = useState(false);
    
    useEffect(() => {
        if (!ref.current) return;

        setRendered(true);

        const current : HTMLDivElement = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    current?.classList.add('visible');
                    current?.classList.remove('hidden');
                } else if (repeat) {
                    current?.classList.add('hidden');
                    current?.classList.remove('visible');
                }
            },
            { threshold: threshold || 0.1 } // Active when 10% of the element is visible
        );

        if (current) observer.observe(current);

        return () => {
            if (current) observer.unobserve(current);
        };
    }, [repeat, threshold]);

    return (
        <div ref={ref} className={`${rendered ? 'rendered' : ''} ${className || 'animated'}`}>
            {children}
        </div>
    );
};

export default ScrollAnimation;
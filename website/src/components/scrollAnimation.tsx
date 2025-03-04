/*
    * Component for adding an class to children 
*/

import React, { useEffect, useRef } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  repeat?: boolean;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children, className, threshold, repeat=false }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        if (!ref.current) return;

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
        <div ref={ref} className={`${className || 'scroll-fade'}`}>
            {children}
        </div>
    );
};

export default ScrollAnimation;
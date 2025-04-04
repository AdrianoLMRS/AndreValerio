import React, { useState } from 'react';
import '@styles/_components/Carousel.scss';

type CarouselProps = {
    children: React.ReactNode; // * Has to have a class="item" inside
    totalSlides: number; // Need for css
};

const Carousel: React.FC<CarouselProps> = ({ children, totalSlides }) => {
    const [current, setCurrent] = useState(0);
    console.debug(totalSlides, current);

    const slideWidth = 100 / totalSlides;

    const prev = () => setCurrent(prev => (prev - 1 + totalSlides) % totalSlides);
    const next = () => setCurrent(prev => (prev + 1) % totalSlides);

    return (
        <div className="carousel" style={{ overflow: 'hidden', position: 'relative' }}>
            <div
                className="items-container"
                style={{
                    width: `${totalSlides * 100}%`,
                    transform: `translateX(-${current * slideWidth}%)`,
                    transition: 'transform 0.5s ease-in-out',
                    display: 'flex'
                }}
            >
                {children}
            </div>
            <div className="controls">
                <button type='button' onClick={prev}>Prev</button>
                <button type='button' onClick={next}>Next</button>
            </div>
        </div>
    );
};

export default Carousel;

import React from 'react';
import Imgs from '@data/imgs';

const size : string = '48px';

const Logo: React.FC = () => {
    return (
        <div className="logo hide-title" itemScope itemType="https://schema.org/Organization">
            <img 
                src={Imgs.cdn.logo}
                title="Website Logo" 
                aria-label="Website Logo" 
                itemType="https://schema.org/image" 
                itemProp="logo" 
                style={{height: size, width: size}}
                alt="Logo André Valério"
            />
        </div>
    );
};

export default Logo;
const size : string = '48px';

const Logo: React.FC = () => {
    return (
        <div className="logo hide-title" itemScope itemType="https://schema.org/Organization">
            <img 
                src="https://placehold.jp/48x48.png" 
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
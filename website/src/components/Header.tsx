import Pages from '@data/pages';
import { useToggleMenu } from '@hooks/useToggleMenu';
import Logo from '@components/Logo';
import UrlLink from '@components/nav/urlLink';
import NavBtn from '@components/nav/navBtn';
import '@styles/_components/Navbar.scss';

const Header: React.FC = () => {
    const { menuOpen, toggleMenu } = useToggleMenu();

    return (
        <header data-style="Header" itemScope itemType="https://schema.org/WPHeader">
            <div>
                <a title="Home Page - André Valério" href={Pages.home} 
                    rel="noopener noreferrer" itemProp="url">
                    <Logo />
                </a>

                <nav id="navbar" aria-label="Main navigation" 
                    itemScope itemType="https://schema.org/SiteNavigationElement"
                    className={menuOpen ? 'visible' : ''}>
                    <ul aria-label="Navigation list" title="Navigation list" className="nav-list hide-title">
                        <hr />
                        <UrlLink 
                            href={Pages.home} 
                            title="Home Page - André Valério" 
                            ariaLabel="Home"
                            toggleMenu={toggleMenu} // For Open/Closing Navbar
                        >
                            Home
                        </UrlLink>
                        <hr />
                        <UrlLink 
                            href={Pages.about} 
                            title="About section - André Valério" 
                            ariaLabel="About"
                            toggleMenu={toggleMenu} // For Open/Closing Navbar
                        >
                            About
                        </UrlLink>
                        <hr />
                        <UrlLink 
                            href={Pages.songs} 
                            title="Songs/Albums Page - André Valério" 
                            ariaLabel="Songs/Albums" 
                            target="_blank"
                            toggleMenu={toggleMenu} // For Open/Closing Navbar
                        >
                            Songs/Albums
                        </UrlLink>
                        <hr />
                        <UrlLink 
                            href={Pages.contact} 
                            title="Contact Page - André Valério" 
                            ariaLabel="Contact" 
                            target="_blank"
                            toggleMenu={toggleMenu} // For Open/Closing Navbar
                        >
                            Contact
                        </UrlLink>
                        <hr />
                        <UrlLink 
                            href={Pages.shop} 
                            title="Shop/Merchant Page - André Valério" 
                            ariaLabel="Shop" 
                            target="_blank"
                            toggleMenu={toggleMenu} // For Open/Closing Navbar
                        >
                            Shop
                        </UrlLink>
                        <hr />
                    </ul>
                </nav>

                {/* toggleMenu hook to button */}
                <NavBtn menuOpen={menuOpen} toggleMenu={toggleMenu} />
            </div>
        </header>
    );
};

export default Header;
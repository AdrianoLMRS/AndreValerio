import { useState } from 'react';
import Logo from '@components/Logo';
import Pages from '@data/pages';
import UrlLink from '@components/urlLink';
import '@styles/_components/Navbar.scss';

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    
    const toggleMenu = () => setMenuOpen(prev => !prev);

    // useEffect(() => {
    //     const links = document.querySelectorAll(".nav-link");
    //     links.forEach(link => {
    //         link.addEventListener("click", () => {
    //             links.forEach(l => l.classList.remove("last-clicked"));
    //             link.classList.add("last-clicked");
    //         });
    //     });
    // }, []);

    // useEffect(() => {
    //     const linksAria = document.querySelectorAll(".aria-link");
    //     linksAria.forEach(link => {
    //         link.addEventListener("click", () => {
    //             linksAria.forEach(l => l.removeAttribute("aria-current"));
    //             link.setAttribute("aria-current", "page");
    //         });
    //     });
    // }, []);

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
                        >
                            Home
                        </UrlLink>
                        <hr />
                        <UrlLink 
                            href={Pages.about} 
                            title="About section - André Valério" 
                            ariaLabel="About" 
                        >
                            About
                        </UrlLink>
                        <hr />
                        <UrlLink 
                            href={Pages.songs} 
                            title="Songs/Albums Page - André Valério" 
                            ariaLabel="Songs/Albums" 
                            target="_blank"
                        >
                            Songs/Albums
                        </UrlLink>
                        <hr />
                        <UrlLink 
                            href={Pages.contact} 
                            title="Contact Page - André Valério" 
                            ariaLabel="Contact" 
                            target="_blank"
                        >
                            Contact
                        </UrlLink>
                        <hr />
                        <UrlLink 
                            href={Pages.shop} 
                            title="Shop/Merchant Page - André Valério" 
                            ariaLabel="Shop" 
                            target="_blank"
                        >
                            Shop
                        </UrlLink>
                        <hr />
                    </ul>
                </nav>

                <button tabIndex={0} onClick={toggleMenu} className="menu-btn" 
                    type="button" aria-controls="navbar" aria-expanded={menuOpen} 
                    aria-label="Open/Close Navigation bar" title="Open/Close navbar">
                    <span className="sr-only">Open/Close Navigation bar</span>
                    {menuOpen ? '✖' : '☰'}
                </button>
            </div>
        </header>
    );
};

export default Header;
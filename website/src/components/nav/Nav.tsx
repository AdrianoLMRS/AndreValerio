// * Maybe a Nav.tsx component be useful in future...

/*

import React from 'react';
import Pages from '@data/pages';
import { useToggleMenu } from '@hooks/useToggleMenu';
import UrlLink from '@components/nav/urlLink';

const Nav: React.FC = () => {
    const { menuOpen, toggleMenu } = useToggleMenu();

    return(
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
    );
};

export default Nav;

*/
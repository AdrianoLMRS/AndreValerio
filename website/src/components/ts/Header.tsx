import React, { useEffect, useState, type ReactNode } from 'react';
import { useToggleMenu } from '@hooks/useToggleMenu';
import { handleScroll } from '@utils/handleScroll';
import lockScroll from '@utils/lockScroll';
import Pages from '@data/pages';
import AuthorHeader from '@components/ts/authorHeader';
import UrlLink from '@components/nav/urlLink';
import NavBtn from '@components/nav/navBtn';
import '@styles/_components/Navbar.scss';

const scrollPosition : number = 950;

interface HeaderProps {
    anime?: boolean; // Default: false
    logo: ReactNode;
    social: ReactNode;
}

export default function Header({ anime = false, logo, social }: HeaderProps) {
    const { menuOpen, toggleMenu } = useToggleMenu();
    const [ isScrolled, setIsScrolled ] = useState(false);

    useEffect(() => {
        if (anime) {
            const cleanup = handleScroll(scrollPosition, () => setIsScrolled(true), () => setIsScrolled(false));
            return cleanup;
        }
    }, [anime]);

    useEffect(() => {
        lockScroll(menuOpen);
    }, [menuOpen]);    

    return (
        <header id='navbar-header' data-style="Header" className={isScrolled || menuOpen ? 'scrolled' : ''}
            itemScope itemType="https://schema.org/WPHeader">
            <div>
                <a title="Home Page - André Valério" href={Pages.home} 
                    rel="noopener noreferrer" itemProp="url">
                    {logo} {/* Logo .astro component */}
                </a>
                <AuthorHeader style={menuOpen ? { left: '20px' } : { left: '-150%' } } id="author" />
                <nav id="navbar" aria-label="Main navigation" 
                    itemScope itemType="https://schema.org/SiteNavigationElement"
                    className={menuOpen ? 'visible' : ''}
                >
                    <menu aria-label="Navigation list" title="Navigation list" className="nav-list hide-title">
                        <hr />
                        <div className="part-1">
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
                        </div>
                        <hr />
                        {/*
                        <div className="separator author">
                            { author.name }
                        </div>
                        */}
                        <div className="part-2">
                            <UrlLink
                                href={Pages.videos}
                                title="Videos Page - André Valério"
                                ariaLabel="Videos"
                                target="_blank"
                                toggleMenu={toggleMenu} // For Open/Closing Navbar
                            >
                                Videos
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
                                href={Pages.teach}
                                title="Teach Page - André Valério"
                                ariaLabel="Teach"
                                target="_blank"
                                toggleMenu={toggleMenu} // For Open/Closing Navbar
                            >
                                Teach
                            </UrlLink>
                        </div>
                        <hr />
                        <div>
                            {social} {/* Social .astro component */}
                        </div>
                    </menu>
                </nav>

                {/* toggleMenu hook to button */}
                <NavBtn menuOpen={menuOpen} toggleMenu={toggleMenu} />
            </div>
        </header>
    );
};
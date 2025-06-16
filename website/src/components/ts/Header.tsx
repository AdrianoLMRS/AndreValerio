import { useEffect, useState, type ReactNode } from 'react';
import { useToggleMenu } from '@hooks/useToggleMenu';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { handleScroll } from '@utils/handleScroll';
import { getCssVariable } from '@utils/getCssVariable';
import lockScroll from '@utils/lockScroll';
import Pages from '@data/constants/pages';
import AuthorHeader from '@components/ts/authorHeader';
import UrlLink from '@components/nav/urlLink';
import NavBtn from '@components/nav/navBtn';
import '@styles/_components/Navbar.scss';


interface HeaderProps {
    anime?: boolean; // Default: false
    logo: ReactNode;
    social: ReactNode;
    scrollPosition?: number; // Default: 950
}

export default function Header({ anime = false, logo, social, scrollPosition = 950 }: HeaderProps) {
    const { menuOpen, toggleMenu } = useToggleMenu();
    const [ isScrolled, setIsScrolled ] = useState(false);
    const [navBreakpoint, setNavBreakpoint] = useState<string | null>(null);
    const scrollNumber : number = scrollPosition;

    // Getting the --navbar-breakpoint CSS variable
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const value = getCssVariable('--navbar-breakpoint');
        setNavBreakpoint(value);
    }, []);

    const isMobile = useMediaQuery(
        navBreakpoint ? `(max-width: ${navBreakpoint})` : null
    );

    // Scroll animation - background Header
    useEffect(() => {
        if (anime) {
            const cleanup = handleScroll(scrollNumber, () => setIsScrolled(true), () => setIsScrolled(false));
            return cleanup;
        }
    }, [anime]);

    // Locks scroll when mobile menu is open (true)
    useEffect(() => {
        lockScroll(menuOpen);
        if (menuOpen && !isMobile) toggleMenu(); 
    }, [menuOpen, isMobile]);

    const handleLink = () => {
        if (isMobile) toggleMenu();
    };

    return (
        <header id='navbar-header' data-style="Header" className={isScrolled || menuOpen ? 'scrolled' : ''}
            itemScope itemType="https://schema.org/WPHeader">
            <div>
                <a title="Home Page - André Valério" href={Pages.home} 
                    rel="noopener noreferrer">
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
                                toggleMenu={handleLink} // For Open/Closing Navbar
                            >
                                Home
                            </UrlLink>
                            <hr />
                            <UrlLink
                                href={Pages.about}
                                title="About section - André Valério"
                                ariaLabel="About"
                                toggleMenu={handleLink} // For Open/Closing Navbar
                            >
                                About
                            </UrlLink>
                            <hr />
                            <UrlLink
                                href={Pages.songs}
                                title="Songs/Albums Page - André Valério"
                                ariaLabel="Songs/Albums"
                                toggleMenu={handleLink} // For Open/Closing Navbar
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
                                toggleMenu={handleLink} // For Open/Closing Navbar
                            >
                                Videos
                            </UrlLink>
                            <hr />
                            <UrlLink
                                href={Pages.contact}
                                title="Contact Page - André Valério"
                                ariaLabel="Contact"
                                toggleMenu={handleLink} // For Open/Closing Navbar
                            >
                                Contact
                            </UrlLink>
                            <hr />
                            <UrlLink
                                href={Pages.teach}
                                title="Teach Page - André Valério"
                                ariaLabel="Teach"
                                target="_blank"
                                toggleMenu={handleLink} // For Open/Closing Navbar
                            >
                                Lessons
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
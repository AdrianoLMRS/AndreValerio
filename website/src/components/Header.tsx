import { useState, useEffect } from "react";
import Logo from "@components/Logo"
import Pages from "@data/pages";
import "@styles/_components/Navbar.scss"

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    useEffect(() => {
        const links = document.querySelectorAll(".nav-link");
        links.forEach(link => {
            link.addEventListener("click", () => {
                links.forEach(l => l.classList.remove("last-clicked"));
                link.classList.add("last-clicked");
            });
        });
    }, []);

    useEffect(() => {
        const linksAria = document.querySelectorAll(".aria-link");
        linksAria.forEach(link => {
            link.addEventListener("click", () => {
                linksAria.forEach(l => l.removeAttribute("aria-current"));
                link.setAttribute("aria-current", "page");
            });
        });
    }, []);

    return (
        <header itemScope itemType="https://schema.org/WPHeader">
            <div>
                <a title="Home Page - André Valério" className="aria-link" href={Pages.home} 
                    rel="noopener noreferrer" aria-current="page" itemProp="url">
                    <Logo />
                </a>

                <nav id="navbar" aria-label="Main navigation" 
                    itemScope itemType="https://schema.org/SiteNavigationElement"
                    className={menuOpen ? "visible" : ""}>
                    <ul aria-label="Navigation list" title="Navigation list" className="nav-list hide-title">
                        <hr />
                        <li className="nav-item">
                            <a href={Pages.home} className="nav-link aria-link" 
                                onClick={toggleMenu} rel="noopener noreferrer" 
                                aria-current="page" title="Home Page - André Valério" 
                                itemProp="url">Home</a>
                        </li>
                        <hr />
                        <li className="nav-item">
                            <a href={Pages.about} className="nav-link aria-link" 
                                onClick={toggleMenu} rel="noopener noreferrer" 
                                title="About section - André Valério" 
                                itemProp="url">About</a>
                        </li>
                        <hr />
                        <li className="nav-item">
                            <a href={Pages.songs} className="nav-link aria-link" 
                                onClick={toggleMenu} target="_blank" rel="noopener noreferrer" 
                                title="Songs/Albums Page - André Valério" 
                                itemProp="url">Songs/Albums</a>
                        </li>
                        <hr />
                        <li className="nav-item">
                            <a href={Pages.contact} className="nav-link aria-link" 
                                onClick={toggleMenu} target="_blank" rel="noopener noreferrer" 
                                title="Contact Page - André Valério" 
                                itemProp="url">Contact</a>
                        </li>
                        <hr />
                        <li className="nav-item">
                            <a href={Pages.shop} className="nav-link aria-link" 
                                onClick={toggleMenu} target="_blank" rel="noopener noreferrer" 
                                title="Shop/Merchant Page - André Valério" 
                                itemProp="url">Shop</a>
                        </li>
                        <hr />
                    </ul>
                </nav>

                <button tabIndex={0} onClick={toggleMenu} className="menu-btn" 
                    type="button" aria-controls="navbar" aria-expanded={menuOpen} 
                    aria-label="Open/Close Navigation bar" title="Open/Close navbar">
                    <span className="sr-only">Open/Close Navigation bar</span>
                    {menuOpen ? "✖" : "☰"}
                </button>
            </div>
        </header>
    );
};

export default Header;
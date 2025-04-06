/*
    Component returns <a> element with interactions
    Use in Navbar/Footer
*/

import React, { useCallback, useRef } from 'react';

interface UrlLinkProps {
  href: string;
  title: string;
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  toggleMenu?: () => void;
}

const UrlLink: React.FC<UrlLinkProps> = ({ href, title, ariaLabel, children, target, rel, className, toggleMenu = () => {}, ...rest }) => {
    const linkRef = useRef<HTMLAnchorElement | null>(null);

    const handleClick = useCallback(() => {
        // Remove all .last-clicked
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('last-clicked'));
        linkRef.current?.classList.add('last-clicked'); // Add class to the link clicked

        // Remove all aria-current
        document.querySelectorAll('.aria-link').forEach(link => link.removeAttribute('aria-current'));
        linkRef.current?.setAttribute('aria-current', 'page'); // Add aria to the link clicked

        toggleMenu(); // Closes/Open sidebar
    }, [toggleMenu]);

  
    return (
        <li className="nav-item">
            <a 
                href={href} 
                className={className || 'nav-link aria-link pseudo-link' }
                onClick={handleClick} 
                target={target} 
                rel={rel || 'noopener noreferrer'} 
                aria-label={ariaLabel} 
                title={title}
                ref={linkRef}
                itemProp="url"
                { ...rest } // Aditional atributes
            >
                {children}
            </a>
        </li>
    );
};

export default UrlLink;

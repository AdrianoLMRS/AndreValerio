/*
    Button for opening the sidebar
*/

import React from 'react';
import type { ComponentProps } from '@hooks/useToggleMenu';

const NavBtn: React.FC<ComponentProps> = ({ menuOpen, toggleMenu }) => {
    return (
        <button 
            tabIndex={0} 
            onClick={toggleMenu} 
            className="menu-btn" 
            type="button" 
            aria-controls="navbar" 
            aria-expanded={menuOpen} 
            aria-label="Open/Close Navigation bar" 
            title="Open/Close navbar"
        >
            <span className="sr-only">Open/Close Navigation bar</span>
            {menuOpen ? '✖' : '☰'}
        </button>
    );
};

export default NavBtn;

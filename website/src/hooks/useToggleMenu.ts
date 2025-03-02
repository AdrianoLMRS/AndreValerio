import { useState, useCallback } from 'react';

// Type for function + other Components
interface ComponentProps {
    menuOpen: boolean;
    toggleMenu: () => void;
}

// Hook useToggleMenu
const useToggleMenu = (): ComponentProps => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);

    return { menuOpen, toggleMenu };
};

export { useToggleMenu };
export type { ComponentProps };
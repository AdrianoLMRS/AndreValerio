export const handleScroll = (
    scrollPosition: number, 
    action: () => void, 
    callback: () => void,
    axis: 'y' | 'x' = 'y' // Default: y axis (vertical)
) => {
    const handleScrollEvent = () => {
        const currentScroll = axis === 'y' ? window.scrollY : window.scrollX; // Get Current Scroll position
        currentScroll >= scrollPosition ? action() : callback(); // Call the correct function
    };

    // Add event listener for scroll
    window.addEventListener('scroll', handleScrollEvent);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('scroll', handleScrollEvent);
};
import { useState, useEffect } from 'react';

/**
 * Custom hook to detect scroll direction
 * Returns true when scrolling down, false when scrolling up or at top
 */
export function useScrollDirection() {
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Only change state if scroll position changed significantly (threshold: 5px)
            // This prevents flickering on small scroll movements
            if (Math.abs(currentScrollY - lastScrollY) < 5) {
                return;
            }

            // Scrolling down: current position > last position
            // Scrolling up: current position < last position
            setIsScrollingDown(currentScrollY > lastScrollY && currentScrollY > 10);
            setLastScrollY(currentScrollY);
        };

        // Throttle scroll events for better performance
        let ticking = false;
        const throttledHandleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', throttledHandleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', throttledHandleScroll);
        };
    }, [lastScrollY]);

    return isScrollingDown;
}


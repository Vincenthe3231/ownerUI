import { useEffect, useRef } from 'react';

/**
 * Custom hook to track AppBar height and update CSS variable
 * @param {boolean} enabled - Whether to track height (default: true)
 * @param {string} cssVariable - CSS variable name (default: '--app-bar-height')
 */
export function useAppBarHeight(enabled = true, cssVariable = '--app-bar-height') {
    const elementRef = useRef(null);

    useEffect(() => {
        if (!enabled || !elementRef.current) return;

        const updateHeight = () => {
            if (elementRef.current) {
                const height = elementRef.current.offsetHeight;
                document.documentElement.style.setProperty(cssVariable, `${height}px`);
            }
        };

        // Initial calculation
        updateHeight();

        // Update on window resize
        window.addEventListener('resize', updateHeight);
        
        // Use ResizeObserver for more accurate tracking
        const resizeObserver = new ResizeObserver(updateHeight);
        resizeObserver.observe(elementRef.current);

        return () => {
            window.removeEventListener('resize', updateHeight);
            resizeObserver.disconnect();
        };
    }, [enabled, cssVariable]);

    return elementRef;
}


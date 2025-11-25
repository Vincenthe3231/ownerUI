import { useState, useEffect } from 'react';

export function useAppBarHeight() {
    const [appBarHeight, setAppBarHeight] = useState(64); // Default height

    useEffect(() => {
        const updateAppBarHeight = () => {
            // Get the CSS variable value, with fallback
            const cssValue = getComputedStyle(document.documentElement).getPropertyValue('--app-bar-height').trim();
            const height = cssValue ? parseFloat(cssValue) : 64;
            setAppBarHeight(height);
        };

        // Initial calculation - wait a bit for AppBar to mount
        const initialTimeout = setTimeout(updateAppBarHeight, 100);

        // Update on window resize with debouncing
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateAppBarHeight, 50);
        };
        window.addEventListener('resize', handleResize);
        
        // Also listen for CSS variable changes
        const observer = new MutationObserver(() => {
            updateAppBarHeight();
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['style'],
        });

        // Periodic check to ensure sync (in case of timing issues)
        const syncInterval = setInterval(updateAppBarHeight, 500);

        return () => {
            clearTimeout(initialTimeout);
            clearTimeout(resizeTimeout);
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
            clearInterval(syncInterval);
        };
    }, []);

    return appBarHeight;
}


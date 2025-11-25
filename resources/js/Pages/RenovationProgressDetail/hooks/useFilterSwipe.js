import { useRef } from 'react';

export function useFilterSwipe(contentSectionRef, filterChips, activeFilter, setActiveFilter) {
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const touchEndX = useRef(0);
    const touchEndY = useRef(0);
    const touchStartTime = useRef(0);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
        touchStartTime.current = Date.now();
    };

    const handleTouchMove = (e) => {
        if (touchStartX.current !== 0) {
            touchEndX.current = e.touches[0].clientX;
            touchEndY.current = e.touches[0].clientY;
        }
    };

    const handleTouchEnd = (e) => {
        if (touchStartX.current === 0) return;
        
        const swipeThreshold = 60;
        const maxVerticalSwipe = 100;
        const maxSwipeTime = 600;
        
        const horizontalDiff = touchStartX.current - touchEndX.current;
        const verticalDiff = Math.abs(touchStartY.current - touchEndY.current);
        const timeDiff = Date.now() - touchStartTime.current;
        
        // Check if touch ended on an interactive element
        const endTarget = e.target;
        const isInteractiveEnd = endTarget?.closest('button, a, input, select, textarea, [role="button"], [role="switch"]');
        
        const touch = e.changedTouches[0];
        const elementAtEnd = document.elementFromPoint(touch.clientX, touch.clientY);
        const isInteractiveAtEnd = elementAtEnd?.closest('button, a, input, select, textarea, [role="button"], [role="switch"]');
        
        const isInteractive = isInteractiveEnd || isInteractiveAtEnd;
        if (isInteractive) {
            if (Math.abs(horizontalDiff) < 40 && verticalDiff < 40) {
                touchStartX.current = 0;
                touchStartY.current = 0;
                touchEndX.current = 0;
                touchEndY.current = 0;
                touchStartTime.current = 0;
                return;
            }
        }
        
        // Only trigger swipe if conditions are met
        if (
            Math.abs(horizontalDiff) > swipeThreshold &&
            verticalDiff < maxVerticalSwipe &&
            timeDiff < maxSwipeTime &&
            Math.abs(horizontalDiff) > verticalDiff * 1.5
        ) {
            if (!(isInteractive && Math.abs(horizontalDiff) < 50 && verticalDiff < 50)) {
                // Check if touch started inside content section
                const contentSection = contentSectionRef.current;
                const touchStartYPos = touchStartY.current;
                const touchEndYPos = touch.clientY;
                
                let isInsideContent = false;
                if (contentSection) {
                    const contentRect = contentSection.getBoundingClientRect();
                    isInsideContent = (
                        (touchStartYPos >= contentRect.top && touchStartYPos <= contentRect.bottom) ||
                        (touchEndYPos >= contentRect.top && touchEndYPos <= contentRect.bottom)
                    );
                }
                
                if (isInsideContent && filterChips.length > 0) {
                    // Swipe inside content section - switch filter chips
                    const currentFilterIndex = filterChips.findIndex(chip => chip === activeFilter);
                    if (horizontalDiff > 0) {
                        // Swipe left - next filter
                        if (currentFilterIndex < filterChips.length - 1) {
                            setActiveFilter(filterChips[currentFilterIndex + 1]);
                        }
                    } else {
                        // Swipe right - previous filter
                        if (currentFilterIndex > 0) {
                            setActiveFilter(filterChips[currentFilterIndex - 1]);
                        }
                    }
                }
            }
        }
        
        // Reset touch state
        touchStartX.current = 0;
        touchStartY.current = 0;
        touchEndX.current = 0;
        touchEndY.current = 0;
        touchStartTime.current = 0;
    };

    return {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    };
}


import { useRef } from 'react';
import { TABS, FILTER_CHIPS_CONFIG } from '../utils/constants';

export function useFilterSwipe(contentSectionRef, filterChips, activeFilter, handleFilterChange, activeTab, switchToTab) {
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
                            // Move to next filter
                            handleFilterChange(filterChips[currentFilterIndex + 1]);
                        } else {
                            // At last filter - check if we need to loop to first tab and first filter
                            const currentTabIndex = TABS.findIndex(tab => tab.id === activeTab);
                            const isLastTab = currentTabIndex === TABS.length - 1;
                            
                            if (isLastTab) {
                                // At last tab and last filter - switch to first tab
                                // The switchToTab function will automatically reset filter to 'r1' for 'room' tab
                                switchToTab(TABS[0].id, 'left');
                            } else {
                                // Not at last tab - just loop to first filter of current tab
                                handleFilterChange(filterChips[0]);
                            }
                        }
                    } else {
                        // Swipe right - previous filter
                        if (currentFilterIndex > 0) {
                            // Move to previous filter
                            handleFilterChange(filterChips[currentFilterIndex - 1]);
                        } else {
                            // At first filter - check if we need to loop to last tab and last filter
                            const currentTabIndex = TABS.findIndex(tab => tab.id === activeTab);
                            const isFirstTab = currentTabIndex === 0;
                            
                            if (isFirstTab) {
                                // At first tab and first filter - switch to last tab and last filter
                                const lastTab = TABS[TABS.length - 1];
                                const lastTabFilters = FILTER_CHIPS_CONFIG[lastTab.id] || FILTER_CHIPS_CONFIG.default;
                                const lastFilter = lastTabFilters.length > 0 ? lastTabFilters[lastTabFilters.length - 1] : null;
                                
                                switchToTab(lastTab.id, 'right');
                                // Set the last filter after tab switch completes
                                if (lastFilter) {
                                    setTimeout(() => {
                                        handleFilterChange(lastFilter);
                                    }, 350); // Wait for tab transition to complete (300ms + buffer)
                                }
                            } else {
                                // Not at first tab - just loop to last filter of current tab
                                handleFilterChange(filterChips[filterChips.length - 1]);
                            }
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


import { useRef } from 'react';
import { QUOTATION_OVERVIEW_CONFIG } from '../constants';

/**
 * Custom hook to handle swipe gestures for tab navigation
 * @param {Array} tabs - Array of tab objects
 * @param {string} activeTab - Currently active tab ID
 * @param {Function} switchToTab - Function to switch tabs
 * @param {boolean} isTransitioning - Whether a transition is in progress
 * @returns {Object} - Object containing touch handlers
 */
export function useSwipeGestures(tabs, activeTab, switchToTab, isTransitioning) {
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const touchEndX = useRef(0);
    const touchEndY = useRef(0);
    const touchStartTime = useRef(0);

    const getCurrentTabIndex = () => {
        return tabs.findIndex(tab => tab.id === activeTab);
    };

    const handleSwipeLeft = () => {
        const currentIndex = getCurrentTabIndex();
        // Circular navigation: if at last tab, loop to first tab
        const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        switchToTab(tabs[nextIndex].id, 'left');
    };

    const handleSwipeRight = () => {
        const currentIndex = getCurrentTabIndex();
        // Circular navigation: if at first tab, loop to last tab
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        switchToTab(tabs[prevIndex].id, 'right');
    };

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

        const { SWIPE_THRESHOLD, MAX_VERTICAL_SWIPE, MAX_SWIPE_TIME } = QUOTATION_OVERVIEW_CONFIG;
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

        if (
            Math.abs(horizontalDiff) > SWIPE_THRESHOLD &&
            verticalDiff < MAX_VERTICAL_SWIPE &&
            timeDiff < MAX_SWIPE_TIME &&
            Math.abs(horizontalDiff) > verticalDiff * 1.5
        ) {
            if (!(isInteractive && Math.abs(horizontalDiff) < 50 && verticalDiff < 50)) {
                if (horizontalDiff > 0) {
                    handleSwipeLeft();
                } else {
                    handleSwipeRight();
                }
            }
        }

        // Reset
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


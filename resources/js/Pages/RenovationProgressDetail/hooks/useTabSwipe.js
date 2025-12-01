import { useRef } from 'react';
import { TABS } from '../utils/constants';

const SWIPE_THRESHOLD = 60;
const MAX_VERTICAL_SWIPE = 100;
const MAX_SWIPE_TIME = 600;

/**
 * Custom hook to handle swipe gestures for tab navigation
 * Swipes outside the content area will switch between tabs
 * @param {string} activeTab - Currently active tab ID
 * @param {Function} switchToTab - Function to switch tabs with direction
 * @param {boolean} isTransitioning - Whether a transition is in progress
 * @param {Object} contentSectionRef - Ref to the content section to detect if swipe is outside
 * @returns {Object} - Object containing touch handlers
 */
export function useTabSwipe(activeTab, switchToTab, isTransitioning, contentSectionRef) {
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const touchEndX = useRef(0);
    const touchEndY = useRef(0);
    const touchStartTime = useRef(0);

    const getCurrentTabIndex = () => {
        return TABS.findIndex(tab => tab.id === activeTab);
    };

    const handleSwipeLeft = () => {
        const currentIndex = getCurrentTabIndex();
        if (currentIndex < TABS.length - 1) {
            switchToTab(TABS[currentIndex + 1].id, 'left');
        }
    };

    const handleSwipeRight = () => {
        const currentIndex = getCurrentTabIndex();
        if (currentIndex > 0) {
            switchToTab(TABS[currentIndex - 1].id, 'right');
        }
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
        if (touchStartX.current === 0 || isTransitioning) return;

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

        // Check if swipe started outside the content section
        const touchStartElement = document.elementFromPoint(touchStartX.current, touchStartY.current);
        const touchEndElement = document.elementFromPoint(touch.clientX, touch.clientY);
        
        const isOutsideContent = contentSectionRef?.current && (
            (!contentSectionRef.current.contains(touchStartElement) && 
             !touchStartElement?.closest('[data-content-section]')) ||
            (!contentSectionRef.current.contains(touchEndElement) && 
             !touchEndElement?.closest('[data-content-section]'))
        );

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

        // Only handle tab swipes if outside content area
        if (
            isOutsideContent &&
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


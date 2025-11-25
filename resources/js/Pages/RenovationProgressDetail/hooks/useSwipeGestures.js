import { useRef } from 'react';

export function useSwipeGestures(changeItemStatus, getItemStatus, setSelectedItem) {
    const itemSwipeStartX = useRef(0);
    const itemSwipeStartY = useRef(0);
    const itemSwipeEndX = useRef(0);
    const itemSwipeEndY = useRef(0);
    const itemSwipeStartTime = useRef(0);
    const currentSwipeItem = useRef(null);

    const handleItemTouchStart = (e, item, index) => {
        e.stopPropagation();
        const touch = e.touches[0];
        itemSwipeStartX.current = touch.clientX;
        itemSwipeStartY.current = touch.clientY;
        itemSwipeStartTime.current = Date.now();
        currentSwipeItem.current = { item, index };
    };

    const handleItemTouchMove = (e) => {
        if (itemSwipeStartX.current !== 0) {
            e.stopPropagation();
            const touch = e.touches[0];
            itemSwipeEndX.current = touch.clientX;
            itemSwipeEndY.current = touch.clientY;
        }
    };

    const handleItemTouchEnd = (e) => {
        if (itemSwipeStartX.current === 0 || !currentSwipeItem.current) {
            // Reset if no valid start
            itemSwipeStartX.current = 0;
            itemSwipeStartY.current = 0;
            itemSwipeEndX.current = 0;
            itemSwipeEndY.current = 0;
            itemSwipeStartTime.current = 0;
            currentSwipeItem.current = null;
            return;
        }
        
        e.stopPropagation();
        
        const swipeThreshold = 40;
        const maxVerticalSwipe = 50;
        const maxSwipeTime = 600;
        const tapThreshold = 20;
        const tapTimeThreshold = 300;
        
        const horizontalDiff = itemSwipeStartX.current - itemSwipeEndX.current;
        const verticalDiff = Math.abs(itemSwipeStartY.current - itemSwipeEndY.current);
        const timeDiff = Date.now() - itemSwipeStartTime.current;
        
        // Check if it's a horizontal swipe
        if (
            Math.abs(horizontalDiff) > swipeThreshold &&
            verticalDiff < maxVerticalSwipe &&
            timeDiff < maxSwipeTime &&
            Math.abs(horizontalDiff) > verticalDiff * 1.5
        ) {
            e.preventDefault();
            const { item, index } = currentSwipeItem.current;
            if (horizontalDiff > 0) {
                // Swipe left - next status
                changeItemStatus(item, index, 'left');
            } else {
                // Swipe right - previous status
                changeItemStatus(item, index, 'right');
            }
        } else if (Math.abs(horizontalDiff) < tapThreshold && verticalDiff < tapThreshold && timeDiff < tapTimeThreshold) {
            // Tap - open bottom sheet immediately
            e.preventDefault();
            const { item, index } = currentSwipeItem.current;
            setSelectedItem({ ...item, index, status: getItemStatus(item, index) });
        }
        
        // Reset
        itemSwipeStartX.current = 0;
        itemSwipeStartY.current = 0;
        itemSwipeEndX.current = 0;
        itemSwipeEndY.current = 0;
        itemSwipeStartTime.current = 0;
        currentSwipeItem.current = null;
    };

    return {
        handleItemTouchStart,
        handleItemTouchMove,
        handleItemTouchEnd,
        isSwipeActive: () => itemSwipeStartX.current !== 0,
    };
}


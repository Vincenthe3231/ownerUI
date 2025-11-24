import { useState } from 'react';

/**
 * Custom hook to handle swipe down gesture for closing bottom sheet
 * @param {Function} onSwipeDown - Callback when swipe down threshold is reached
 * @param {number} threshold - Minimum drag distance to trigger callback (default: 50)
 * @returns {Object} - Object containing drag handlers and transform value
 */
export function useSwipeDown(onSwipeDown, threshold = 50) {
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [currentY, setCurrentY] = useState(0);

    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartY(e.touches[0].clientY);
        setCurrentY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const newY = e.touches[0].clientY;
        setCurrentY(newY);
        
        // Only allow downward drag
        if (newY > startY) {
            e.preventDefault();
        }
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;
        
        const dragDistance = currentY - startY;
        
        if (dragDistance > threshold && onSwipeDown) {
            onSwipeDown();
        }
        
        setIsDragging(false);
        setStartY(0);
        setCurrentY(0);
    };

    // Calculate transform based on drag
    const dragTransform = isDragging && currentY > startY 
        ? `translateY(${Math.max(0, currentY - startY)}px)` 
        : 'translateY(0)';

    return {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        dragTransform,
    };
}


import { useEffect } from 'react';

/**
 * Custom hook to lock/unlock body scroll
 * @param {boolean} enabled - Whether to lock scroll (default: true)
 */
export function useBodyScrollLock(enabled = true) {
    useEffect(() => {
        if (enabled) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        return () => {
            document.body.style.overflow = '';
        };
    }, [enabled]);
}


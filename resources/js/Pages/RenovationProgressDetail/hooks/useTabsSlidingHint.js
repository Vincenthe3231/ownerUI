import { useEffect } from 'react';

export function useTabsSlidingHint(tabsContainerRef) {
    useEffect(() => {
        const container = tabsContainerRef.current;
        if (!container) return;

        let slidingInterval = null;
        let hasUserScrolled = false;
        let isAnimating = false;
        let originalScrollLeft = 0;

        const checkScrollable = () => {
            const isScrollable = container.scrollWidth > container.clientWidth;
            if (isScrollable) {
                container.classList.add('scrollable-tabs');
                if (!hasUserScrolled) {
                    startSlidingHint();
                }
            } else {
                container.classList.remove('scrollable-tabs');
                if (slidingInterval) {
                    clearTimeout(slidingInterval);
                }
            }
        };

        const startSlidingHint = () => {
            if (hasUserScrolled || isAnimating || !container) return;
            
            const timeoutId = setTimeout(() => {
                if (hasUserScrolled || isAnimating || !container) return;
                
                originalScrollLeft = container.scrollLeft;
                const tabWidth = container.children[0]?.offsetWidth || 80;
                const slideWidth = tabWidth * 0.8;
                
                isAnimating = true;
                
                container.scrollTo({
                    left: originalScrollLeft + slideWidth,
                    behavior: 'smooth'
                });
                
                setTimeout(() => {
                    if (!hasUserScrolled && container) {
                        container.scrollTo({
                            left: originalScrollLeft,
                            behavior: 'smooth'
                        });
                    }
                    isAnimating = false;
                }, 1200);
                
                slidingInterval = setTimeout(() => {
                    if (!hasUserScrolled) {
                        startSlidingHint();
                    }
                }, 5000);
            }, 2500);

            return () => clearTimeout(timeoutId);
        };

        const handleScroll = () => {
            if (!isAnimating && container.scrollLeft !== originalScrollLeft) {
                hasUserScrolled = true;
                if (slidingInterval) {
                    clearTimeout(slidingInterval);
                }
                container.classList.remove('scrollable-tabs');
            }
        };

        checkScrollable();
        window.addEventListener('resize', checkScrollable);
        container.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('resize', checkScrollable);
            container.removeEventListener('scroll', handleScroll);
            if (slidingInterval) {
                clearTimeout(slidingInterval);
            }
        };
    }, [tabsContainerRef]);
}


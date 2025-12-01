import { useState, useRef } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { getGlossyChipStyle } from '../../utils/getGlossyChipStyle';

export default function PaymentInvoicesCard({
    invoices,
    invoiceFilter,
    setInvoiceFilter,
    isExpanded,
    hasBeenExpanded,
    onToggle,
}) {
    const [isFilterTransitioning, setIsFilterTransitioning] = useState(false);
    const [filterSlideOffset, setFilterSlideOffset] = useState(0);
    const filterOrder = ['all', 'paid', 'overdue', 'top5'];
    
    // Swipe gesture refs
    const contentSectionRef = useRef(null);
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const touchEndX = useRef(0);
    const touchEndY = useRef(0);
    const touchStartTime = useRef(0);
    
    // Filter invoices based on selected filter
    const getFilteredInvoices = () => {
        let filteredInvoices = [...invoices];
        
        if (invoiceFilter === 'paid') {
            filteredInvoices = invoices.filter(inv => inv.status === 'paid');
        } else if (invoiceFilter === 'overdue') {
            filteredInvoices = invoices.filter(inv => inv.status === 'overdue');
        } else if (invoiceFilter === 'top5') {
            filteredInvoices = [...invoices]
                .sort((a, b) => parseFloat(b.amount || 0) - parseFloat(a.amount || 0))
                .slice(0, 5);
        }
        
        return filteredInvoices;
    };

    const filteredInvoices = getFilteredInvoices();
    
    // Handle filter change with animation
    const handleFilterChange = (newFilter) => {
        // Handle toggle behavior: if clicking the same filter, toggle to 'all'
        const targetFilter = newFilter === invoiceFilter ? 'all' : newFilter;
        
        if (targetFilter === invoiceFilter || isFilterTransitioning) return;
        
        const currentIndex = filterOrder.indexOf(invoiceFilter);
        const newIndex = filterOrder.indexOf(targetFilter);
        const direction = newIndex > currentIndex ? 'left' : 'right';
        
        setIsFilterTransitioning(true);
        
        // When sliding left (next filter), new content comes from right (100%)
        // When sliding right (previous filter), new content comes from left (-100%)
        if (direction === 'left') {
            setFilterSlideOffset(100); // New content starts from right
        } else {
            setFilterSlideOffset(-100); // New content starts from left
        }
        
        setInvoiceFilter(targetFilter);
        
        requestAnimationFrame(() => {
            setFilterSlideOffset(0); // Slide to center
        });
        
        setTimeout(() => {
            setIsFilterTransitioning(false);
        }, 300);
    };
    
    // Swipe gesture handlers
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
        touchStartTime.current = Date.now();
        
        // Check if touch started inside content section and stop propagation
        const contentSection = contentSectionRef.current;
        if (contentSection && isExpanded) {
            const contentRect = contentSection.getBoundingClientRect();
            const touchY = e.touches[0].clientY;
            if (touchY >= contentRect.top && touchY <= contentRect.bottom) {
                e.stopPropagation();
            }
        }
    };
    
    const handleTouchMove = (e) => {
        if (touchStartX.current !== 0) {
            touchEndX.current = e.touches[0].clientX;
            touchEndY.current = e.touches[0].clientY;
            
            // Stop propagation if moving within content area
            const contentSection = contentSectionRef.current;
            if (contentSection && isExpanded) {
                const contentRect = contentSection.getBoundingClientRect();
                const touchY = e.touches[0].clientY;
                if (touchY >= contentRect.top && touchY <= contentRect.bottom) {
                    e.stopPropagation();
                }
            }
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
                
                if (isInsideContent && isExpanded) {
                    // Swipe inside content section - switch filter
                    const currentFilterIndex = filterOrder.indexOf(invoiceFilter);
                    let filterChanged = false;
                    
                    if (horizontalDiff > 0) {
                        // Swipe left - next filter
                        if (currentFilterIndex < filterOrder.length - 1) {
                            handleFilterChange(filterOrder[currentFilterIndex + 1]);
                            filterChanged = true;
                        }
                    } else {
                        // Swipe right - previous filter
                        if (currentFilterIndex > 0) {
                            handleFilterChange(filterOrder[currentFilterIndex - 1]);
                            filterChanged = true;
                        }
                    }
                    
                    // Stop event propagation to prevent tab switching
                    if (filterChanged) {
                        e.stopPropagation();
                        e.preventDefault();
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

    return (
        <div 
            className="bg-white rounded-lg"
            style={{
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                transformOrigin: 'center',
            }}
        >
            <button
                onClick={onToggle}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Payment Invoices
                    </h3>
                </div>
                <div className="flex items-center">
                    {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                </div>
            </button>

            {/* Expandable Invoice List */}
            <div
                ref={contentSectionRef}
                className={`expandable-content ${isExpanded ? 'expanded' : ''}`}
                style={{
                    maxHeight: isExpanded ? '2000px' : '0',
                    opacity: isExpanded ? 1 : 0,
                    transition: 'max-height 0.4s ease-in-out, opacity 0.3s ease-in-out, padding 0.4s ease-in-out',
                    overflow: isExpanded ? 'visible' : 'hidden',
                    position: 'relative',
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="border-t border-gray-100">
                    {/* Filter Chips - Sticky */}
                    <div 
                        className="flex flex-wrap gap-2 px-4 pt-3 pb-2 sticky z-20"
                        style={{
                            top: 'calc(var(--app-bar-height, 3.5rem) + 4.0rem)',
                            isolation: 'isolate',
                            backgroundColor: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                        }}
                    >
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleFilterChange('all');
                            }}
                            className="px-3 py-1.5 text-xs font-semibold rounded-full relative overflow-hidden transition-all"
                            style={{
                                ...getGlossyChipStyle(invoiceFilter === 'all' ? 'red' : 'gray'),
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                                opacity: invoiceFilter === 'all' ? 1 : 0.6,
                            }}
                        >
                            <div 
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
                                    borderRadius: '9999px',
                                }}
                            />
                            <span className="relative z-10">All</span>
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleFilterChange('paid');
                            }}
                            className="px-3 py-1.5 text-xs font-semibold rounded-full relative overflow-hidden transition-all"
                            style={{
                                ...getGlossyChipStyle('green', invoiceFilter === 'paid'),
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                                opacity: invoiceFilter === 'paid' ? 1 : 0.6,
                            }}
                        >
                            <div 
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
                                    borderRadius: '9999px',
                                }}
                            />
                            <span className="relative z-10">Paid</span>
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleFilterChange('overdue');
                            }}
                            className="px-3 py-1.5 text-xs font-semibold rounded-full relative overflow-hidden transition-all"
                            style={{
                                ...getGlossyChipStyle('pink', invoiceFilter === 'overdue'),
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                                opacity: invoiceFilter === 'overdue' ? 1 : 0.6,
                            }}
                        >
                            <div 
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
                                    borderRadius: '9999px',
                                }}
                            />
                            <span className="relative z-10">Overdue</span>
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleFilterChange('top5');
                            }}
                            className="px-3 py-1.5 text-xs font-semibold rounded-full relative overflow-hidden transition-all"
                            style={{
                                ...getGlossyChipStyle('teal', invoiceFilter === 'top5'),
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                                opacity: invoiceFilter === 'top5' ? 1 : 0.6,
                            }}
                        >
                            <div 
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
                                    borderRadius: '9999px',
                                }}
                            />
                            <span className="relative z-10">Top 5</span>
                        </button>
                    </div>

                    {/* Filtered Invoices */}
                    <div className="px-4 pb-2 pt-2 space-y-4 relative overflow-hidden">
                        <div
                            key={invoiceFilter}
                            style={{
                                ...(isFilterTransitioning ? {
                                    transform: `translate3d(${filterSlideOffset}%, 0, 0)`,
                                    transition: 'transform 0.3s ease-in-out',
                                    opacity: filterSlideOffset !== 0 ? 0.7 : 1,
                                    willChange: 'transform',
                                } : {
                                    transform: 'translate3d(0, 0, 0)',
                                    transition: 'none',
                                    opacity: 1,
                                    willChange: 'auto',
                                }),
                            }}
                        >
                            {filteredInvoices.length === 0 ? (
                                <div className="text-center py-8 text-gray-500 text-sm">
                                    No invoices found.
                                </div>
                            ) : (
                                filteredInvoices.map((invoice, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 rounded-lg p-4 hover:scale-105 cursor-pointer"
                                    style={{
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid rgba(0, 0, 0, 0.08)',
                                        transformOrigin: 'center',
                                        transition: 'transform 0.15s ease-out',
                                        transitionDelay: '0s',
                                    }}
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-10 h-10 flex items-center justify-center relative">
                                                <svg
                                                    className="w-10 h-10 text-blue-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 2L21 7L21 17L12 22L3 17L3 7L12 2Z"
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-4 h-4 bg-blue-200 rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="text-sm font-semibold text-blue-900">
                                                    {invoice.invoice_no}
                                                </div>
                                                {invoice.status === 'paid' ? (
                                                    <span 
                                                        className="px-2 py-1 text-xs font-semibold rounded-full relative overflow-hidden"
                                                        style={{
                                                            ...getGlossyChipStyle('green'),
                                                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                                                        }}
                                                    >
                                                        <div 
                                                            className="absolute inset-0 pointer-events-none"
                                                            style={{
                                                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
                                                                borderRadius: '9999px',
                                                            }}
                                                        />
                                                        <span className="relative z-10">Paid</span>
                                                    </span>
                                                ) : invoice.status === 'overdue' ? (
                                                    <span 
                                                        className="px-2 py-1 text-xs font-semibold rounded-full relative overflow-hidden"
                                                        style={{
                                                            ...getGlossyChipStyle('pink'),
                                                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                                                        }}
                                                    >
                                                        <div 
                                                            className="absolute inset-0 pointer-events-none"
                                                            style={{
                                                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
                                                                borderRadius: '9999px',
                                                            }}
                                                        />
                                                        <span className="relative z-10">Overdue</span>
                                                    </span>
                                                ) : (
                                                    <span 
                                                        className="px-2 py-1 text-xs font-semibold rounded-full relative overflow-hidden"
                                                        style={{
                                                            ...getGlossyChipStyle('gray'),
                                                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                                                        }}
                                                    >
                                                        <div 
                                                            className="absolute inset-0 pointer-events-none"
                                                            style={{
                                                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
                                                                borderRadius: '9999px',
                                                            }}
                                                        />
                                                        <span className="relative z-10">{invoice.status}</span>
                                                    </span>
                                                )}
                                            </div>

                                            <div className="text-sm text-gray-600 mb-1">
                                                Amount:{' '}
                                                <span className="font-semibold text-gray-900">
                                                    RM{' '}
                                                    {parseFloat(invoice.amount).toLocaleString(
                                                        'en-US',
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        }
                                                    )}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Due Date:{' '}
                                                <span className="font-semibold text-gray-900">
                                                    {invoice.due_date}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


import { Head, Link } from '@inertiajs/react';
import { useState, useRef } from 'react';
import Modal from '@/Components/Modal';
import BottomSheet from '@/Components/BottomSheet';
import BottomNavigation from '@/Components/BottomNavigation';
import AppBar from '@/Components/AppBar';
import Tabs from '@/Components/Tabs';
import { ChevronRight, ChevronDown } from 'lucide-react';

export default function UnreleasedQuotation({ quotation, invoices = [], packages = [] }) {
    const [activeTab, setActiveTab] = useState('quotation-order');
    const [swipeDirection, setSwipeDirection] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [slideOffset, setSlideOffset] = useState(0);
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const touchEndX = useRef(0);
    const touchEndY = useRef(0);
    const touchStartTime = useRef(0);
    const contentRef = useRef(null);
    const [installmentMonths, setInstallmentMonths] = useState(36);
    const [paymentMethod, setPaymentMethod] = useState('Full Payment');
    const [isPaymentSummaryExpanded, setIsPaymentSummaryExpanded] = useState(false);
    const [isQuoteDetailsExpanded, setIsQuoteDetailsExpanded] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [expandedPackages, setExpandedPackages] = useState({});
    const [enabledPackages, setEnabledPackages] = useState({});
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [acknowledgeRisk, setAcknowledgeRisk] = useState(false);
    const [showPaymentDetails, setShowPaymentDetails] = useState(false);
    
    const tabs = [
        { id: 'quotation-order', label: <>Quotation <br /> Order</> },
        { id: 'terms', label: 'T&C' },
    ];
    
    const getCurrentTabIndex = () => {
        return tabs.findIndex(tab => tab.id === activeTab);
    };
    
    const switchToTab = (tabId, direction = null) => {
        if (isTransitioning) return;
        
        const newIndex = tabs.findIndex(tab => tab.id === tabId);
        const currentIndex = getCurrentTabIndex();
        
        if (newIndex === currentIndex) return;
        
        setIsTransitioning(true);
        if (direction) {
            setSwipeDirection(direction);
            if (direction === 'left') {
                setSlideOffset(100);
            } else {
                setSlideOffset(-100);
            }
            
            setActiveTab(tabId);
            
            requestAnimationFrame(() => {
                setSlideOffset(0);
            });
        } else {
            setSlideOffset(0);
            setActiveTab(tabId);
        }
        
        setTimeout(() => {
            setIsTransitioning(false);
            setSwipeDirection(null);
        }, 300);
    };
    
    const handleSwipeLeft = () => {
        const currentIndex = getCurrentTabIndex();
        if (currentIndex < tabs.length - 1) {
            switchToTab(tabs[currentIndex + 1].id, 'left');
        }
    };
    
    const handleSwipeRight = () => {
        const currentIndex = getCurrentTabIndex();
        if (currentIndex > 0) {
            switchToTab(tabs[currentIndex - 1].id, 'right');
        }
    };
    
    // Swipe gesture handlers
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
            Math.abs(horizontalDiff) > swipeThreshold &&
            verticalDiff < maxVerticalSwipe &&
            timeDiff < maxSwipeTime &&
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
        
        touchStartX.current = 0;
        touchStartY.current = 0;
        touchEndX.current = 0;
        touchEndY.current = 0;
        touchStartTime.current = 0;
    };
    
    // Toggle package enabled state (for optional add-on packages)
    const togglePackageEnabled = (packageId) => {
        setEnabledPackages(prev => ({
            ...prev,
            [packageId]: !prev[packageId]
        }));
    };
    
    // Get enabled state for a package
    const isPackageEnabled = (pkg) => {
        if (pkg.type === 'optional') {
            return enabledPackages[pkg.id] !== undefined ? enabledPackages[pkg.id] : (pkg.enabled || false);
        }
        return true;
    };
    
    // Render package products table
    const renderPackageTable = (pkg) => {
        if (!pkg || !pkg.products || pkg.products.length === 0) {
            return (
                <div className="p-4 text-center text-gray-500">
                    No products available for this package.
                </div>
            );
        }

        return (
            <div className="p-4">
                <div className="mb-4">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">{pkg.name}</h3>
                    {pkg.description && (
                        <p className="text-sm text-gray-600">{pkg.description}</p>
                    )}
                    <div className="mt-2">
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                            Quantity: x{pkg.quantity}
                        </span>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900">Products</h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">S.o.W</th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">Product</th>
                                    <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pkg.products.map((product, idx) => (
                                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-3 px-4 text-gray-900">{product.sow}</td>
                                        <td className="py-3 px-4">
                                            <div className="font-semibold text-gray-900 mb-1">{product.product}</div>
                                            {product.description && (
                                                <div className="text-xs text-gray-600">{product.description}</div>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-right text-gray-900">{product.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    // Calculate payment amounts based on enabled packages
    const calculateTotalRenovation = () => {
        // Default Total Renovation
        return 22959.00;
    };

    const calculateEnabledAddOnTotal = () => {
        let total = 0;
        
        // Add enabled optional packages with specific prices
        const enabledOptionalPackages = packages.filter(pkg => 
            pkg.type === 'optional' && isPackageEnabled(pkg)
        );
        
        enabledOptionalPackages.forEach(pkg => {
            // Map package names to specific prices
            if (pkg.name && pkg.name.includes('ROI-MAX')) {
                total += 8750.00 * (pkg.quantity || 1);
            } else if (pkg.name && pkg.name.includes('Air Conditioning')) {
                total += 1575.00 * (pkg.quantity || 1);
            } else {
                total += parseFloat(pkg.price || pkg.amount || 0) * (pkg.quantity || 1);
            }
        });
        
        return total;
    };

    const totalRenovation = calculateTotalRenovation();
    const enabledAddOnTotal = calculateEnabledAddOnTotal();
    const discount = 600.00; // Fixed discount
    const totalQuotationAmount = totalRenovation + enabledAddOnTotal - discount;
    
    // Balance payment = 10% of total quotation amount (covered by tenants)
    const balancePayment = Math.round(totalQuotationAmount * 0.1 * 100) / 100;
    // Initial down payment = 90% of total quotation amount
    const initialDownPayment = Math.round(totalQuotationAmount * 0.9 * 100) / 100;
    
    // Get enabled optional packages for display
    const enabledOptionalPackages = packages.filter(pkg => 
        pkg.type === 'optional' && isPackageEnabled(pkg)
    );

    // Calculate page title based on active tab
    const pageTitle =
        activeTab === 'quotation-order'
            ? 'Quotation Order'
            : activeTab === 'terms'
                ? 'Terms & Conditions'
                : 'Quotation Order';

    return (
        <>
            <Head title={pageTitle} />

            <div 
                className="min-h-screen bg-gray-100 pb-20"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="px-4 py-4 space-y-4 my-12">
                    {/* App Bar */}
                    <AppBar title={pageTitle} backHref="/quotations" />

                    {/* 2. Tabs Section Card */}
                    <Tabs
                        className="rounded-2xl"
                        activeTab={activeTab}
                        onTabChange={(tabId) => switchToTab(tabId)}
                        tabs={tabs}
                    />

                    {/* Content with swipe support */}
                    <div 
                        ref={contentRef}
                        className="relative"
                    >
                        <div 
                            key={activeTab}
                            className="space-y-4"
                            style={{
                                transform: `translate3d(${slideOffset}%, 0, 0)`,
                                transition: isTransitioning ? 'transform 0.3s ease-in-out' : 'none',
                                opacity: isTransitioning && slideOffset !== 0 ? 0.7 : 1,
                                willChange: isTransitioning ? 'transform' : 'auto',
                            }}
                        >
                            {activeTab === 'quotation-order' && (
                                <div className="space-y-4">
                                    {/* Quote Details Card - Expandable */}
                                    <div className="bg-white rounded-lg shadow-sm">
                                        <button
                                            onClick={() => setIsQuoteDetailsExpanded(!isQuoteDetailsExpanded)}
                                            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex-1 text-left">
                                                <div className="text-sm text-gray-600 mb-1">
                                                    Quote: <span className="font-semibold text-gray-900">{quotation?.quotation_id || 'QUO-2500002'}</span>
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Date: <span className="font-semibold text-gray-900">{quotation?.date || '06 Nov 2025'}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {quotation?.status === 'Unreleased' && (
                                                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                                        Unreleased
                                                    </span>
                                                )}
                                                <svg
                                                    className={`w-5 h-5 text-gray-400 transition-transform ${isQuoteDetailsExpanded ? 'rotate-90' : ''}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </div>
                                        </button>

                                        {/* Expandable Content */}
                                        <div className={`expandable-content ${isQuoteDetailsExpanded ? 'expanded' : ''}`}>
                                            <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
                                                <div className="grid grid-cols-2 gap-3 pt-3">
                                                    <div>
                                                        <div className="text-xs text-gray-600 mb-1">Name:</div>
                                                        <div className="text-sm font-semibold text-gray-900">{quotation?.property_name || quotation?.name || 'Meta City'}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-gray-600 mb-1">Unit:</div>
                                                        <div className="text-sm font-semibold text-gray-900">{quotation?.unit || 'A-22-12'}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-gray-600 mb-1">Unit Type:</div>
                                                        <div className="text-sm font-semibold text-gray-900">{quotation?.unit_type || 'B'}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-gray-600 mb-1">Partition:</div>
                                                        <div className="text-sm font-semibold text-gray-900">{quotation?.partition || 'Yes'}</div>
                                                    </div>
                                                </div>
                                                <div className="pt-2">
                                                    <div className="text-xs text-gray-600 mb-1">Address:</div>
                                                    <div className="text-sm font-semibold text-gray-900">{quotation?.address || 'Jln Atmosphere Utama 2, 43400, Seri Kembangan, Selangor'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Card */}
                                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm sticky top-20 sm:top-32 z-10 border-b border-[#d81e43]">
                                        {/* Payment Method Selector */}
                                        <div className="px-3 pt-3 pb-2 sm:px-4 sm:pt-4 sm:pb-3">
                                            <div className="flex items-center space-x-1.5 sm:space-x-2 mb-2 sm:mb-3">
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                </svg>
                                                <button
                                                    onClick={() => setShowPaymentDetails(true)}
                                                    className="flex items-center justify-between w-full px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
                                                >
                                                    <span className="text-gray-700 truncate">RenoNow PayLater</span>
                                                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0 ml-1" />
                                                </button>
                                            </div>
                                            
                                            {/* Kickstart Message */}
                                            <div className="mb-2 sm:mb-3">
                                                <p className="text-sm sm:text-base text-gray-900 leading-tight sm:leading-normal">
                                                    Kickstart <span className="font-bold text-[#d81e43]">NOW</span> by just paying <span className="font-bold text-[#d81e43]">RM {initialDownPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                                </p>
                                                <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-tight">
                                                    Remaining RM {balancePayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} covered by tenants
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {/* View Details Link */}
                                        <div className="px-3 pb-3 sm:px-4 sm:pb-4 text-right">
                                            <button
                                                onClick={() => setShowPaymentDetails(!showPaymentDetails)}
                                                className="text-xs sm:text-sm text-[#d81e43] hover:text-[#d81e43]/80 underline font-medium"
                                            >
                                                {showPaymentDetails ? 'Hide Details' : 'View Details'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Packages Header */}
                                    <div className="flex items-center space-x-2 mb-4">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                        <h2 className="text-lg font-bold text-blue-900">Packages</h2>
                                    </div>

                                    {/* Standard Packages */}
                                    {packages && packages.filter(pkg => pkg.type === 'standard').map((pkg) => (
                                        <div key={pkg.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                            <div className="p-4">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1">
                                                        <div className="text-base font-bold text-gray-900 mb-1">
                                                            {pkg.name}
                                                        </div>
                                                        {pkg.description && (
                                                            <div className="text-sm text-gray-600 line-clamp-2">
                                                                {pkg.description}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded ml-4 flex-shrink-0">
                                                        x{pkg.quantity}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => setSelectedPackage(pkg)}
                                                    className="w-full py-2 px-4 text-sm font-medium text-[#d81e43] border border-[#d81e43] rounded-lg hover:bg-[#d81e43] hover:text-white transition-colors"
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Optional Add-On Packages */}
                                    {packages && packages.filter(pkg => pkg.type === 'optional').length > 0 && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <div className="flex items-center space-x-2 mb-4">
                                                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                                </svg>
                                                <h3 className="text-base font-bold text-gray-900">OPTIONAL ADD-ON PACKAGES:</h3>
                                            </div>

                                            {packages.filter(pkg => pkg.type === 'optional').map((pkg) => {
                                                const isEnabled = isPackageEnabled(pkg);
                                                const isConfirmed = quotation?.status === 'Sale' || quotation?.status === 'Confirmed' || !quotation?.status;
                                                return (
                                                    <div
                                                        key={pkg.id}
                                                        className={`bg-white rounded-lg shadow-sm overflow-hidden mb-4 last:mb-0 hover:shadow-md transition-shadow ${isEnabled ? 'border-2 border-[#d81e43]' : 'border border-gray-200'}`}
                                                    >
                                                        <div className="p-4">
                                                            <div className="flex items-start justify-between mb-3">
                                                                <div className="flex-1">
                                                                    <div className="text-base font-bold text-gray-900 mb-1">{pkg.name}</div>
                                                                    {pkg.description && (
                                                                        <div className="text-sm text-gray-600 line-clamp-2">{pkg.description}</div>
                                                                    )}
                                                                </div>

                                                                <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            if (!isConfirmed) {
                                                                                togglePackageEnabled(pkg.id);
                                                                            }
                                                                        }}
                                                                        type="button"
                                                                        role="switch"
                                                                        aria-checked={isEnabled}
                                                                        disabled={isConfirmed}
                                                                        className={`relative inline-flex flex-shrink-0 h-6 w-12 border-2 rounded-full transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 ${isConfirmed
                                                                            ? 'bg-gray-200 border-gray-200 cursor-not-allowed opacity-50'
                                                                            : isEnabled
                                                                                ? 'bg-[#d81e43] border-[#d81e43]'
                                                                                : 'bg-gray-300 border-gray-300'
                                                                            }`}
                                                                    >
                                                                        <span
                                                                            className={`transform transition-transform duration-200 ease-in-out inline-block h-5 w-5 bg-white rounded-full shadow ${isEnabled ? 'translate-x-6' : 'translate-x-0'}`}
                                                                        />
                                                                    </button>

                                                                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                                                                        x{pkg.quantity}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            
                                                            <button
                                                                onClick={() => setSelectedPackage(pkg)}
                                                                className="w-full py-2 px-4 text-sm font-medium text-[#d81e43] border border-[#d81e43] rounded-lg hover:bg-[#d81e43] hover:text-white transition-colors"
                                                            >
                                                                View Details
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            {/* Agreement Section */}
                                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mt-6">
                                                <div className="space-y-4">
                                                    {/* Terms and Conditions Checkbox */}
                                                    <label className="flex items-start space-x-3 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={agreeTerms}
                                                            onChange={(e) => setAgreeTerms(e.target.checked)}
                                                            className="mt-1 w-4 h-4 text-[#d81e43] border-gray-300 rounded focus:ring-[#d81e43] focus:ring-2"
                                                        />
                                                        <span className="text-sm text-gray-700">
                                                            I have read and accept the{' '}
                                                            <button
                                                                type="button"
                                                                onClick={() => setActiveTab('terms')}
                                                                className="text-[#d81e43] hover:text-[#d81e43]/80 underline"
                                                            >
                                                                Terms and Conditions
                                                            </button>
                                                        </span>
                                                    </label>

                                                    {/* Risk Acknowledgment Checkbox */}
                                                    <label className="flex items-start space-x-3 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={acknowledgeRisk}
                                                            onChange={(e) => setAcknowledgeRisk(e.target.checked)}
                                                            className="mt-1 w-4 h-4 text-[#d81e43] border-gray-300 rounded focus:ring-[#d81e43] focus:ring-2"
                                                        />
                                                        <span className="text-sm text-gray-700">
                                                            I understand and acknowledge the risk of Partitioning
                                                        </span>
                                                    </label>

                                                    {/* Agree Button */}
                                                    <div className="pt-2">
                                                        <button
                                                            type="button"
                                                            disabled={!agreeTerms || !acknowledgeRisk}
                                                            onClick={() => {
                                                                // Handle agreement submission
                                                                alert('Quotation Order Agreed!');
                                                            }}
                                                            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                                                                agreeTerms && acknowledgeRisk
                                                                    ? 'bg-[#d81e43] hover:bg-[#d81e43]'
                                                                    : 'bg-gray-300 cursor-not-allowed'
                                                            }`}
                                                        >
                                                            Agree Quotation Order
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'terms' && (
                                <div className="bg-white rounded-lg shadow-sm p-4">
                                    
                                    <p className="text-gray-600">Terms & Conditions content will be displayed here.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <BottomNavigation active="quotations" />

            {/* Payment Details Bottom Sheet */}
            <BottomSheet
                show={showPaymentDetails}
                onClose={() => setShowPaymentDetails(false)}
                title="Payment Details"
                lockScroll={false}
            >
                <div className="p-4 space-y-6">
                    {/* Total Renovation */}
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <div className="text-base font-semibold text-gray-900">Total Renovation:</div>
                        <div className="text-base font-semibold text-gray-900">
                            RM {totalRenovation.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>

                    {/* Enabled Add-on Packages Total */}
                    {enabledAddOnTotal > 0 && (
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                            <div className="text-base font-semibold text-gray-900">Total Enabled Add-on Packages:</div>
                            <div className="text-base font-semibold text-gray-900">
                                RM {enabledAddOnTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                        </div>
                    )}

                    {/* Discount */}
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <div className="text-lg font-extrabold text-green-800">Discount:</div>
                        <div className="text-lg font-extrabold text-green-800">
                            - RM {discount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>

                    {/* Total Quotation Amount */}
                    <div className="flex justify-between items-center pb-3 border-b-2 border-gray-300">
                        <div className="text-base font-semibold text-gray-900">Total Quotation Amount:</div>
                        <div className="text-base font-semibold text-gray-900">
                            RM {totalQuotationAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>

                    {/* Payment Terms */}
                    <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                        <div>
                            <div className="text-base font-semibold text-gray-900 mb-1">Payment Terms:</div>
                            <div className="flex items-center text-xs text-gray-500">
                                <span>(Terms & Conditions)</span>
                                <button
                                    onClick={() => setShowTermsModal(true)}
                                    className="ml-1"
                                >
                                    <svg
                                        className="w-4 h-4 text-yellow-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="text-base font-semibold text-gray-900">RenoNow PayLater</div>
                    </div>

                    {/* Initial Down Payment */}
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <div className="text-base font-semibold text-gray-900">Initial Down Payment:</div>
                        <div className="text-base font-semibold text-gray-900">
                            RM {initialDownPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>

                    {/* Balance Payment */}
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <div className="text-base font-semibold text-gray-900">Balance Payment:</div>
                        <div className="text-base font-semibold text-gray-900">
                            RM {balancePayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>
                    <div className="text-sm text-gray-600 -mt-3 text-right">Pay through RPM</div>

                    {/* Enabled Optional Packages */}
                    {enabledOptionalPackages.length > 0 && (
                        <div className="pt-3">
                            <h3 className="text-base font-semibold text-gray-900 mb-3">Enabled Add-on Packages:</h3>
                            <div className="space-y-3">
                                {enabledOptionalPackages.map((pkg) => {
                                    // Calculate price based on package name
                                    let packagePrice = 0;
                                    if (pkg.name && pkg.name.includes('ROI-MAX')) {
                                        packagePrice = 8750.00 * (pkg.quantity || 1);
                                    } else if (pkg.name && pkg.name.includes('Air Conditioning')) {
                                        packagePrice = 1575.00 * (pkg.quantity || 1);
                                    } else {
                                        packagePrice = parseFloat(pkg.price || pkg.amount || 0) * (pkg.quantity || 1);
                                    }
                                    
                                    return (
                                        <div key={pkg.id} className="bg-gray-50 rounded-lg p-3 border-2 border-[#d81e43]">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1">
                                                    <div className="text-sm font-semibold text-gray-900">{pkg.name}</div>
                                                    {pkg.description && (
                                                        <div className="text-xs text-gray-600 mt-1">{pkg.description}</div>
                                                    )}
                                                </div>
                                                <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded ml-2">
                                                    x{pkg.quantity}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-700">
                                                RM {packagePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </BottomSheet>

            {/* Terms & Conditions Modal */}
            <Modal show={showTermsModal} onClose={() => setShowTermsModal(false)} maxWidth="2xl">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Payment Information</h2>
                        <button
                            onClick={() => setShowTermsModal(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-4 text-sm text-gray-700 max-h-96 overflow-y-auto">
                        <div>
                            <p className="font-semibold mb-2">3.</p>
                            <p>
                                The Company shall not be obliged to commence or continue with the Works until the Milestone Payment is received in full.
                                Any delay in payment shall entitle the Company to suspend the Works, extend the Renovation Period without penalty,
                                and reschedule the activities on a best-effort basis.
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold mb-2">4.</p>
                            <p className="mb-2">
                                If the Owner fails to make any payment due under this Quotation within three (3) working days after receiving
                                notification from the Company, the Company shall be entitled to:
                            </p>
                            <ol className="list-decimal list-inside space-y-1 ml-4">
                                <li>Suspend all on-site works without any liability whatsoever;</li>
                                <li>Impose compensation for idle manpower, material storage, or project rescheduling costs;</li>
                                <li>Recover from the Owner any additional expenses, damages, or losses arising directly or indirectly from such delay.</li>
                            </ol>
                        </div>

                        <div>
                            <p className="font-semibold mb-2">5.</p>
                            <p>
                                All payments made by the Owner to the Company shall be deemed fully earned and are strictly non-refundable,
                                particularly in cases of cancellation, withdrawal, or termination by the Owner after preparatory or renovation
                                works have commenced.
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold mb-2">6.</p>
                            <p>
                                Payment shall be made by bank transfer, FPX, or credit/debit card. A two percent (2%) administrative fee
                                shall apply for credit/debit card transactions. All bank, gateway, or financing charges (including Easy
                                Payment Plan or similar schemes) shall be borne solely by the Owner.
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold mb-2">7. (Default Interest Rate)</p>
                            <p>
                                Any overdue payment shall accrue interest at eight percent (8%) per annum from the due date until full settlement.
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold mb-2">8. (Retention of Title)</p>
                            <p>
                                Ownership and legal title to all furniture, fixtures, fittings, and materials supplied or installed under
                                this Quotation shall remain exclusively ith the Company until full and final settlement of all sums due and
                                payable under this Quotation.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setShowTermsModal(false)}
                            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Package Details Bottom Sheet */}
            <BottomSheet
                show={selectedPackage !== null}
                onClose={() => setSelectedPackage(null)}
                title={selectedPackage ? selectedPackage.name : 'Package Details'}
                lockScroll={false}
            >
                {selectedPackage && renderPackageTable(selectedPackage)}
            </BottomSheet>
        </>
    );
}


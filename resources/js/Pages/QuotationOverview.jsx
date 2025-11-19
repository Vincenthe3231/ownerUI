import { Head, Link } from '@inertiajs/react';
import { useState, useRef } from 'react';
import Modal from '@/Components/Modal';
import BottomSheet from '@/Components/BottomSheet';
import BottomNavigation from '@/Components/BottomNavigation';
import AppBar from '@/Components/AppBar';
import Tabs from '@/Components/Tabs';
import { ChevronRight, ChevronDown } from 'lucide-react';

export default function QuotationOverview({ quotation, invoices = [], packages = [] }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [swipeDirection, setSwipeDirection] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [slideOffset, setSlideOffset] = useState(0);
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const touchEndX = useRef(0);
    const touchEndY = useRef(0);
    const touchStartTime = useRef(0);
    const contentRef = useRef(null);
    
    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'quotation-order', label: 'Quotation Order' },
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
            // Set initial offset for slide animation based on direction
            if (direction === 'left') {
                setSlideOffset(100); // Slide in from right (swipe left = next tab)
            } else {
                setSlideOffset(-100); // Slide in from left (swipe right = previous tab)
            }
            
            // Change tab immediately
            setActiveTab(tabId);
            
            // Animate to center
            requestAnimationFrame(() => {
                setSlideOffset(0);
            });
        } else {
            // Direct click - no animation
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
    
    // Swipe gesture handlers - work everywhere on the page, but prevent on interactive elements
    const handleTouchStart = (e) => {
        // Always track the touch start position
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
        touchStartTime.current = Date.now();
    };
    
    const handleTouchMove = (e) => {
        // Update touch position during move
        if (touchStartX.current !== 0) {
            touchEndX.current = e.touches[0].clientX;
            touchEndY.current = e.touches[0].clientY;
        }
    };
    
    const handleTouchEnd = (e) => {
        if (touchStartX.current === 0) return; // No valid touch start
        
        const swipeThreshold = 60; // Minimum horizontal distance for swipe (reduced for better responsiveness)
        const maxVerticalSwipe = 100; // Maximum vertical movement (increased to allow more flexibility)
        const maxSwipeTime = 600; // Maximum time for a swipe (ms)
        
        const horizontalDiff = touchStartX.current - touchEndX.current;
        const verticalDiff = Math.abs(touchStartY.current - touchEndY.current);
        const timeDiff = Date.now() - touchStartTime.current;
        
        // Check if touch ended on an interactive element
        const endTarget = e.target;
        const isInteractiveEnd = endTarget?.closest('button, a, input, select, textarea, [role="button"], [role="switch"]');
        
        // Also check the changedTouches for more accurate end position
        const touch = e.changedTouches[0];
        const elementAtEnd = document.elementFromPoint(touch.clientX, touch.clientY);
        const isInteractiveAtEnd = elementAtEnd?.closest('button, a, input, select, textarea, [role="button"], [role="switch"]');
        
        // If touch ended on an interactive element, check if it was actually a click
        const isInteractive = isInteractiveEnd || isInteractiveAtEnd;
        if (isInteractive) {
            // If the movement was very small, it's likely a click - don't swipe
            if (Math.abs(horizontalDiff) < 40 && verticalDiff < 40) {
                touchStartX.current = 0;
                touchStartY.current = 0;
                touchEndX.current = 0;
                touchEndY.current = 0;
                touchStartTime.current = 0;
                return;
            }
        }
        
        // Only trigger swipe if:
        // 1. Horizontal movement is significant
        // 2. Vertical movement is reasonable (not excessive scrolling)
        // 3. Movement was reasonably quick (swipe, not slow drag)
        // 4. Horizontal movement is greater than vertical (primarily horizontal swipe)
        if (
            Math.abs(horizontalDiff) > swipeThreshold &&
            verticalDiff < maxVerticalSwipe &&
            timeDiff < maxSwipeTime &&
            Math.abs(horizontalDiff) > verticalDiff * 1.5 // Horizontal movement is at least 1.5x vertical (less strict)
        ) {
            // Don't swipe if it was clearly a button click (very small movement on interactive element)
            if (!(isInteractive && Math.abs(horizontalDiff) < 50 && verticalDiff < 50)) {
                if (horizontalDiff > 0) {
                    // Swipe left
                    handleSwipeLeft();
                } else {
                    // Swipe right
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
    const [installmentMonths, setInstallmentMonths] = useState(36);
    const [isQuoteDetailsExpanded, setIsQuoteDetailsExpanded] = useState(false);
    const [isPaymentSummaryExpanded, setIsPaymentSummaryExpanded] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [isPaymentInvoicesExpanded, setIsPaymentInvoicesExpanded] = useState(false);
    const [hasPaymentInvoicesBeenExpanded, setHasPaymentInvoicesBeenExpanded] = useState(false);
    const [expandedPackages, setExpandedPackages] = useState({}); // Track which packages are expanded
    const [enabledPackages, setEnabledPackages] = useState({}); // Track which optional packages are enabled
    const [invoiceFilter, setInvoiceFilter] = useState('all'); // Filter for invoices: 'all', 'paid', 'overdue', 'top5'
    const [selectedPackage, setSelectedPackage] = useState(null); // Track which package is shown in bottom sheet

    // Calculate invoice statistics for status chips
    const totalInvoices = invoices.length;
    const paidInvoices = invoices.filter(inv => inv.status === 'paid').length;
    const overdueInvoices = invoices.filter(inv => inv.status === 'overdue').length;
    const pendingInvoices = invoices.filter(inv => inv.status !== 'paid' && inv.status !== 'overdue').length;

    // Calculate payment amounts from invoices to match QuotationStatistics.jsx
    const totalAmount = invoices.reduce((sum, inv) => sum + parseFloat(inv.amount || 0), 0);
    const monthlyPayment = installmentMonths === 36
        ? totalAmount / 36
        : totalAmount / 60;
    const initialDownPayment = Math.round(totalAmount / 2);
    const balancePayment = totalAmount - initialDownPayment;


    // const pageTitle = activeTab === 'quotation-order' ? 'Quotation Order' : 'Quotation Overview';
    const pageTitle =
        activeTab === 'quotation-order'
            ? 'Quotation Order'
            : activeTab === 'terms'
                ? 'Terms & Conditions'
                : 'Quotation Overview';


    // Toggle package expansion (show/hide products list)
    const togglePackage = (packageId) => {
        setExpandedPackages(prev => ({
            ...prev,
            [packageId]: !prev[packageId]
        }));
    };

    // Toggle package enabled state (for optional add-on packages)
    const togglePackageEnabled = (packageId) => {
        setEnabledPackages(prev => ({
            ...prev,
            [packageId]: !prev[packageId]
        }));
    };

    // Get enabled state for a package (check component state first, then fallback to package prop)
    const isPackageEnabled = (pkg) => {
        if (pkg.type === 'optional') {
            return enabledPackages[pkg.id] !== undefined ? enabledPackages[pkg.id] : (pkg.enabled || false);
        }
        return true; // Standard packages are always enabled
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
                    {/* 1. App Bar Card - Title and Back Navigation */}
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
                                transform: `translateX(${slideOffset}%)`,
                                transition: isTransitioning ? 'transform 0.3s ease-in-out' : 'none',
                                opacity: isTransitioning && slideOffset !== 0 ? 0.7 : 1,
                            }}
                        >
                    {activeTab === 'overview' && (
                        <>
                            {/* 3. Invoice Status Chips Section Card */}
                            <div className="bg-white rounded-lg shadow-sm">
                                <div className="px-4 py-4">
                                    <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            {totalInvoices > 0 && (
                                                <span className="px-2 py-1 text-[0.7rem] font-medium bg-gray-100 text-gray-800 rounded-full">
                                                    Total: {totalInvoices}
                                                </span>
                                            )}
                                            {paidInvoices > 0 && (
                                                <span className="px-3 py-1 text-[0.7rem] font-medium bg-green-100 text-green-800 rounded-full">
                                                    Paid: {paidInvoices}
                                                </span>
                                            )}
                                            {overdueInvoices > 0 && (
                                                <span className="px-3 py-1 text-[0.7rem] font-medium bg-pink-100 text-pink-800 rounded-full">
                                                    Overdue: {overdueInvoices}
                                                </span>
                                            )}
                                            {pendingInvoices > 0 && (
                                                <span className="px-3 py-1 text-[0.7rem] font-medium bg-gray-100 text-gray-800 rounded-full">
                                                    Pending: {pendingInvoices}
                                                </span>
                                            )}
                                        </div>
                                        {quotation?.id && (
                                            <Link
                                                href={route('quotation.statistics', quotation.id)}
                                                className="flex items-center gap-1 text-sm font-medium underline text-[#d81e43] hover:text-[#d81e43] border-0 bg-transparent p-0 cursor-pointer"
                                            >
                                                View Statistic
                                                <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Quote Details Card - Expandable */}
                            <div className="bg-white rounded-lg shadow-sm">
                                <button
                                    onClick={() => setIsQuoteDetailsExpanded(!isQuoteDetailsExpanded)}
                                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex-1 text-left">
                                        <div className="text-sm text-gray-600 mb-1">
                                            Quote: <span className="font-semibold text-gray-900">{quotation?.quotation_id || 'QUO-2500001'}</span>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Date: <span className="font-semibold text-gray-900">{quotation?.date || '06 Nov 2025'}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {(quotation?.status === 'Sale' || quotation?.status === 'Confirmed') && (
                                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                {quotation?.status || 'Confirmed'}
                                            </span>
                                        )}
                                        {quotation?.status === 'Unreleased' && (
                                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                                Unreleased
                                            </span>
                                        )}
                                        {!quotation?.status && (
                                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                Confirmed
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
                                                <div className="text-sm font-semibold text-gray-900">{quotation?.name || 'Meta City'}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-600 mb-1">Unit:</div>
                                                <div className="text-sm font-semibold text-gray-900">{quotation?.unit || 'A-30-12'}</div>
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

                            {/* Payment Summary Card - Expandable */}
                            <div className="bg-white rounded-lg shadow-sm">
                                <div className="p-4">
                                    {/* Payment Method - Disabled */}
                                    <div className="mb-3">
                                        <label className="block text-xs text-gray-600 mb-1">Payment Method &#128179;</label>
                                        <div className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed">
                                            Full Payment
                                        </div>
                                    </div>

                                    {/* Installment Months Dropdown - Disabled */}
                                    <div className="mb-4">
                                        <label className="block text-xs text-gray-600 mb-1">Installment Period &#9203;</label>
                                        <select
                                            value={installmentMonths}
                                            onChange={(e) => setInstallmentMonths(Number(e.target.value))}
                                            disabled
                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                                        >
                                            <option value={36}>36 months</option>
                                            <option value={60}>60 months</option>
                                        </select>
                                    </div>

                                    {/* Monthly Payment Info */}
                                    <div className="mb-3">
                                        <div className="text-sm text-gray-900 mb-1">
                                            <span className="text-red-600 font-bold">
                                                RM {parseFloat(monthlyPayment.toFixed(2)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </span>
                                            <span className="text-gray-600">/month for {installmentMonths} months</span>
                                        </div>
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

                                    {/* One-time Payment Option */}
                                    <div className="text-sm text-gray-600 mb-4">
                                        Or pay one-time: <span className="font-semibold text-gray-900">RM {totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>

                                    {/* View Details Button */}
                                    <div className="text-right">
                                        <button
                                            onClick={() => setIsPaymentSummaryExpanded(!isPaymentSummaryExpanded)}
                                            className="text-sm text-[#d81e43] hover:text-[#d81e43] font-medium underline"
                                        >
                                            {isPaymentSummaryExpanded ? 'Hide Details' : 'View Details'}
                                        </button>
                                    </div>
                                </div>

                                {/* Expandable Payment Details */}
                                <div className={`expandable-content ${isPaymentSummaryExpanded ? 'expanded' : ''}`}>
                                    <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
                                        {/* Total Renovation */}
                                        <div className="flex justify-between items-center pt-3">
                                            <div className="text-sm text-gray-600">Total Renovation</div>
                                            <div className="text-sm font-semibold text-gray-900">RM {totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                        </div>

                                        <div className="border-t border-gray-200"></div>

                                        {/* Total Quotation Amount */}
                                        <div className="flex justify-between items-center">
                                            <div className="text-sm font-semibold text-gray-900">Total Quotation Amount:</div>
                                            <div className="text-sm font-semibold text-gray-900">RM {totalAmount.toLocaleString()}</div>
                                        </div>

                                        {/* Payment Terms */}
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900 mb-1">Payment Terms:</div>
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
                                            <div className="text-sm font-semibold text-gray-900">Full Payment</div>
                                        </div>

                                        <div className="border-t border-gray-200"></div>

                                        {/* Initial Down Payment */}
                                        <div className="flex justify-between items-center">
                                            <div className="text-sm font-semibold text-gray-900">Initial Down Payment:</div>
                                            <div className="text-sm font-semibold text-gray-900">RM {initialDownPayment.toLocaleString()}</div>
                                        </div>

                                        {/* Balance Payment */}
                                        <div className="flex justify-between items-center">
                                            <div className="text-sm font-semibold text-gray-900">Balance Payment:</div>
                                            <div className="text-sm font-semibold text-gray-900">RM {balancePayment.toLocaleString()}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Invoices Card - Accordion */}
                            <div className="bg-white rounded-lg shadow-sm">
                                <button
                                    onClick={() => {
                                        setIsPaymentInvoicesExpanded(!isPaymentInvoicesExpanded);
                                        if (!hasPaymentInvoicesBeenExpanded && !isPaymentInvoicesExpanded) {
                                            setHasPaymentInvoicesBeenExpanded(true);
                                        }
                                    }}
                                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors mb-10"
                                >
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Payment Invoices
                                        </h3>
                                        {/* {!hasPaymentInvoicesBeenExpanded && (
                                            <span
                                                className="w-2 h-2 rounded-full -mt-5 -ms-1"
                                                style={{ backgroundColor: '#d81e43' }}
                                                aria-label="Expandable section"
                                            />
                                        )} */}
                                    </div>
                                    <div className="flex items-center">
                                        {isPaymentInvoicesExpanded ? (
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <ChevronRight className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                </button>

                                {/* Expandable Invoice List */}
                                {isPaymentInvoicesExpanded && (
                                    <div className="px-4 pb-2 space-y-4 border-t border-gray-100">
                                        {/* Filter Chips */}
                                        <div className="flex flex-wrap gap-2 pt-3 pb-2">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setInvoiceFilter('all');
                                                }}
                                                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                                                    invoiceFilter === 'all'
                                                        ? 'bg-[#d81e43] text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            >
                                                All
                                            </button>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setInvoiceFilter('paid');
                                                }}
                                                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                                                    invoiceFilter === 'paid'
                                                        ? 'bg-green-600 text-white'
                                                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                                                }`}
                                            >
                                                Paid
                                            </button>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setInvoiceFilter('overdue');
                                                }}
                                                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                                                    invoiceFilter === 'overdue'
                                                        ? 'bg-pink-600 text-white'
                                                        : 'bg-pink-100 text-pink-800 hover:bg-pink-200'
                                                }`}
                                            >
                                                Overdue
                                            </button>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setInvoiceFilter('top5');
                                                }}
                                                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                                                    invoiceFilter === 'top5'
                                                        ? 'bg-[#3cc0bd] text-white'
                                                        : 'bg-[#3cc0bd]/50 text-white hover:bg-[#3cc0bd] hover:text-white'
                                                }`}
                                            >
                                                Top 5
                                            </button>
                                        </div>

                                        {/* Filtered Invoices */}
                                        {(() => {
                                            let filteredInvoices = [...invoices];
                                            
                                            if (invoiceFilter === 'paid') {
                                                filteredInvoices = invoices.filter(inv => inv.status === 'paid');
                                            } else if (invoiceFilter === 'overdue') {
                                                filteredInvoices = invoices.filter(inv => inv.status === 'overdue');
                                            } else if (invoiceFilter === 'top5') {
                                                // Sort by amount descending and take top 5
                                                filteredInvoices = [...invoices]
                                                    .sort((a, b) => parseFloat(b.amount || 0) - parseFloat(a.amount || 0))
                                                    .slice(0, 5);
                                            }

                                            return filteredInvoices.length === 0 ? (
                                                <div className="text-center py-8 text-gray-500 text-sm">
                                                    No invoices found.
                                                </div>
                                            ) : (
                                                filteredInvoices.map((invoice, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm"
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
                                                                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                                        Paid
                                                                    </span>
                                                                ) : invoice.status === 'overdue' ? (
                                                                    <span className="px-2 py-1 text-xs font-medium bg-pink-100 text-pink-800 rounded-full">
                                                                        Overdue
                                                                    </span>
                                                                ) : (
                                                                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                                                        {invoice.status}
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
                                            );
                                        })()}
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {activeTab === 'quotation-order' && (
                        <div className="space-y-4">
                            {/* Packages Header */}
                            <div className="flex items-center space-x-2 mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                <h2 className="text-lg font-bold text-blue-900">Packages</h2>
                            </div>

                            {/* Standard Packages */}
                            {packages.filter(pkg => pkg.type === 'standard').map((pkg) => (
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
                            {packages.filter(pkg => pkg.type === 'optional').length > 0 && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                        </svg>
                                        <h3 className="text-base font-bold text-gray-900">OPTIONAL ADD-ON PACKAGES:</h3>
                                    </div>

                                    {/* ✅ Package list */}
                                    {packages.filter(pkg => pkg.type === 'optional').map((pkg) => {
                                        const isEnabled = isPackageEnabled(pkg);
                                        const isConfirmed = quotation?.status === 'Sale' || quotation?.status === 'Confirmed' || !quotation?.status;
                                        return (
                                            <div
                                                key={pkg.id}
                                                className="bg-white rounded-lg shadow-sm overflow-hidden mb-4 last:mb-0 hover:shadow-md transition-shadow"
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
                                                            {/* Switch button */}
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
                                                                className={`relative inline-flex flex-shrink-0 h-6 w-12 border-2 rounded-full transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isConfirmed
                                                                    ? 'bg-gray-200 border-gray-200 cursor-not-allowed opacity-50'
                                                                    : isEnabled
                                                                        ? 'bg-blue-600 border-blue-600'
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

                                    {/* ✅ Progressive Payment Table moved OUTSIDE package loop */}
                                    {packages.some(pkg => pkg.type === 'optional' && pkg.progressive_payment) && (
                                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mt-6">
                                            <div className="flex items-center space-x-2 mb-3">
                                                <svg
                                                    className="w-5 h-5 text-gray-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <h4 className="text-sm font-semibold text-gray-900">
                                                    Progressive Payment of the Contract Sum
                                                </h4>
                                            </div>

                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm">
                                                    <thead>
                                                        <tr className="border-b border-gray-200">
                                                            <th className="text-left py-2 text-gray-600 font-medium">Description</th>
                                                            <th className="text-center py-2 text-gray-600 font-medium">%</th>
                                                            <th className="text-right py-2 text-gray-600 font-medium">Amount (RM)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {packages
                                                            .filter(pkg => pkg.type === 'optional' && pkg.progressive_payment)
                                                            .flatMap(pkg => pkg.progressive_payment)
                                                            .map((payment, idx) => {
                                                                // Calculate amount based on totalAmount and percentage
                                                                const calculatedAmount = (totalAmount * payment.percentage) / 100;
                                                                return (
                                                                    <tr key={idx} className="border-b border-gray-100">
                                                                        <td className="py-2 text-gray-900">{payment.description}</td>
                                                                        <td className="text-center py-2 text-gray-900">{payment.percentage}%</td>
                                                                        <td className="text-right py-2 text-gray-900 font-semibold">
                                                                            {calculatedAmount.toLocaleString('en-US', {
                                                                                minimumFractionDigits: 2,
                                                                                maximumFractionDigits: 2,
                                                                            })}
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        <tr className="font-bold">
                                                            <td className="py-2 text-gray-900">Total</td>
                                                            <td className="text-center py-2 text-gray-900">100%</td>
                                                            <td className="text-right py-2 text-gray-900">
                                                                {totalAmount.toLocaleString('en-US', {
                                                                    minimumFractionDigits: 2,
                                                                    maximumFractionDigits: 2,
                                                                })}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
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
                                this Quotation shall remain exclusively with the Company until full and final settlement of all sums due and
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

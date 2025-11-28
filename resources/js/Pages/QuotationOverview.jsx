import { Head } from '@inertiajs/react';
import { useState, useRef } from 'react';
import Modal from '@/Components/Modal';
import BottomSheet from '@/Components/BottomSheet';
import BottomNavigation from '@/Components/BottomNavigation';
import AppBar from '@/Components/AppBar';
import Tabs from '@/Components/Tabs';
import { QUOTATION_OVERVIEW_CONFIG, PAGE_TITLES } from './QuotationOverview/constants';
import { useSwipeGestures } from './QuotationOverview/hooks/useSwipeGestures';
import { useProgressAnimation } from './QuotationOverview/hooks/useProgressAnimation';
import { usePackageState } from './QuotationOverview/hooks/usePackageState';
import { calculateInvoiceStats } from './QuotationOverview/utils/invoiceCalculations';
import { calculatePaymentAmounts } from './QuotationOverview/utils/paymentCalculations';
import ProgressChartCard from './QuotationOverview/components/OverviewTab/ProgressChartCard';
import QuoteDetailsCard from './QuotationOverview/components/OverviewTab/QuoteDetailsCard';
import PaymentSummaryCard from './QuotationOverview/components/OverviewTab/PaymentSummaryCard';
import PaymentInvoicesCard from './QuotationOverview/components/OverviewTab/PaymentInvoicesCard';
import PackageTable from './QuotationOverview/components/QuotationOrderTab/PackageTable';
import StandardPackageCard from './QuotationOverview/components/QuotationOrderTab/StandardPackageCard';
import OptionalPackageCard from './QuotationOverview/components/QuotationOrderTab/OptionalPackageCard';

export default function QuotationOverview({ quotation, invoices = [], packages = [] }) {
    // Tab state
    const [activeTab, setActiveTab] = useState('overview');
    const [swipeDirection, setSwipeDirection] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [slideOffset, setSlideOffset] = useState(0);
    const contentRef = useRef(null);
    
    // Additional state
    const [installmentMonths, setInstallmentMonths] = useState(QUOTATION_OVERVIEW_CONFIG.DEFAULT_INSTALLMENT_MONTHS);
    const [isQuoteDetailsExpanded, setIsQuoteDetailsExpanded] = useState(false);
    const [isPaymentSummaryExpanded, setIsPaymentSummaryExpanded] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [isPaymentInvoicesExpanded, setIsPaymentInvoicesExpanded] = useState(false);
    const [hasPaymentInvoicesBeenExpanded, setHasPaymentInvoicesBeenExpanded] = useState(false);
    const [invoiceFilter, setInvoiceFilter] = useState('all');
    const [selectedPackage, setSelectedPackage] = useState(null);

    // Tab switching logic (must be defined before useSwipeGestures hook)
    const getCurrentTabIndex = () => {
        return QUOTATION_OVERVIEW_CONFIG.TABS.findIndex(tab => tab.id === activeTab);
    };

    const switchToTab = (tabId, direction = null) => {
        if (isTransitioning) return;
        
        const newIndex = QUOTATION_OVERVIEW_CONFIG.TABS.findIndex(tab => tab.id === tabId);
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
        }, QUOTATION_OVERVIEW_CONFIG.TRANSITION_DURATION);
    };

    // Custom hooks
    const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipeGestures(
        QUOTATION_OVERVIEW_CONFIG.TABS,
        activeTab,
        switchToTab,
        isTransitioning
    );

    // Calculations
    const invoiceStats = calculateInvoiceStats(invoices);
    const paymentAmounts = calculatePaymentAmounts(invoices, installmentMonths);
    
    // Progress animation hook
    const {
        circularProgress,
        animatedPercentage,
    } = useProgressAnimation(
        invoiceStats.progressPercentage,
        invoiceStats.totalInvoices,
        invoiceStats.paidInvoices,
        invoiceStats.overdueInvoices
    );

    // Package state hook
    const {
        togglePackageEnabled,
        isPackageEnabled,
    } = usePackageState();

    const pageTitle = PAGE_TITLES[activeTab] || PAGE_TITLES['overview'];

    return (
        <>
            <Head title={pageTitle} />

            <div 
                className="min-h-screen pb-20 w-full"
                style={{
                    background: `
                        linear-gradient(to bottom, rgba(243, 244, 246, 0.9), transparent),
                        linear-gradient(to top left, rgba(209, 213, 219, 0.7), transparent),
                        linear-gradient(to top right, rgba(229, 231, 235, 0.8), transparent)
                    `,
                    backgroundBlendMode: 'screen',
                    backgroundAttachment: 'fixed',
                    backgroundColor: '#F3F4F6',
                    minHeight: '100vh',
                    overflowX: 'clip',
                    maxWidth: '100vw',
                    position: 'relative',
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="px-4 py-4 space-y-4 my-12">
                    {/* App Bar Card */}
                    <AppBar title={pageTitle} backHref="/quotations" />

                    {/* Tabs Section Card */}
                    <Tabs
                        className="rounded-2xl"
                        activeTab={activeTab}
                        onTabChange={(tabId) => switchToTab(tabId)}
                        tabs={QUOTATION_OVERVIEW_CONFIG.TABS}
                    />

                    {/* Content with swipe support */}
                    <div 
                        ref={contentRef}
                        className="relative w-full"
                        style={{
                            overflowX: 'clip',
                            maxWidth: '100%',
                            contain: 'style',
                        }}
                    >
                        <div 
                            key={activeTab}
                            className="space-y-4 w-full"
                            style={{
                                ...(isTransitioning && slideOffset !== 0 ? {
                                    transform: `translate3d(${slideOffset}%, 0, 0)`,
                                    transition: 'transform 0.3s ease-in-out',
                                    opacity: 0.7,
                                    willChange: 'transform',
                                } : {
                                    transform: 'none',
                                    transition: 'none',
                                    opacity: 1,
                                    willChange: 'auto',
                                }),
                                maxWidth: '100%',
                                boxSizing: 'border-box',
                            }}
                        >
                            {activeTab === 'overview' && (
                                <>
                                    <ProgressChartCard
                                        quotation={quotation}
                                        totalInvoices={invoiceStats.totalInvoices}
                                        paidInvoices={invoiceStats.paidInvoices}
                                        overdueInvoices={invoiceStats.overdueInvoices}
                                        circularProgress={circularProgress}
                                        animatedPercentage={animatedPercentage}
                                    />

                                    <QuoteDetailsCard
                                        quotation={quotation}
                                        isExpanded={isQuoteDetailsExpanded}
                                        onToggle={() => setIsQuoteDetailsExpanded(!isQuoteDetailsExpanded)}
                                    />

                                    <PaymentSummaryCard
                                        installmentMonths={installmentMonths}
                                        setInstallmentMonths={setInstallmentMonths}
                                        monthlyPayment={paymentAmounts.monthlyPayment}
                                        totalAmount={paymentAmounts.totalAmount}
                                        initialDownPayment={paymentAmounts.initialDownPayment}
                                        balancePayment={paymentAmounts.balancePayment}
                                        isExpanded={isPaymentSummaryExpanded}
                                        onToggle={() => setIsPaymentSummaryExpanded(!isPaymentSummaryExpanded)}
                                        onShowTermsModal={() => setShowTermsModal(true)}
                                    />

                                    <PaymentInvoicesCard
                                        invoices={invoices}
                                        invoiceFilter={invoiceFilter}
                                        setInvoiceFilter={setInvoiceFilter}
                                        isExpanded={isPaymentInvoicesExpanded}
                                        hasBeenExpanded={hasPaymentInvoicesBeenExpanded}
                                        onToggle={() => {
                                            setIsPaymentInvoicesExpanded(!isPaymentInvoicesExpanded);
                                            if (!hasPaymentInvoicesBeenExpanded && !isPaymentInvoicesExpanded) {
                                                setHasPaymentInvoicesBeenExpanded(true);
                                            }
                                        }}
                                    />
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
                                        <StandardPackageCard
                                            key={pkg.id}
                                            pkg={pkg}
                                            onViewDetails={() => setSelectedPackage(pkg)}
                                        />
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

                                            {packages.filter(pkg => pkg.type === 'optional').map((pkg) => {
                                                const isEnabled = isPackageEnabled(pkg);
                                                const isConfirmed = quotation?.status === 'Sale' || quotation?.status === 'Confirmed' || !quotation?.status;
                                                return (
                                                    <OptionalPackageCard
                                                        key={pkg.id}
                                                        pkg={pkg}
                                                        isEnabled={isEnabled}
                                                        isConfirmed={isConfirmed}
                                                        onToggleEnabled={() => togglePackageEnabled(pkg.id)}
                                                        onViewDetails={() => setSelectedPackage(pkg)}
                                                    />
                                                );
                                            })}

                                            {/* Progressive Payment Table */}
                                            {packages.some(pkg => pkg.type === 'optional' && pkg.progressive_payment) && (
                                                <div 
                                                    className="bg-white rounded-lg p-4 mt-6 hover:scale-105"
                                                    style={{
                                                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
                                                        border: '1px solid rgba(0, 0, 0, 0.08)',
                                                        transformOrigin: 'center',
                                                        transition: 'transform 0.15s ease-out',
                                                        transitionDelay: '0s',
                                                    }}
                                                >
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
                                                                        const calculatedAmount = (paymentAmounts.totalAmount * payment.percentage) / 100;
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
                                                                        {paymentAmounts.totalAmount.toLocaleString('en-US', {
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
                {selectedPackage && <PackageTable pkg={selectedPackage} />}
            </BottomSheet>
        </>
    );
}

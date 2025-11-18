import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import BottomNavigation from '@/Components/BottomNavigation';
import { ChevronRight, ChevronDown } from 'lucide-react';

export default function QuotationOverview({ quotation, invoices = [], packages = [] }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [installmentMonths, setInstallmentMonths] = useState(36);
    const [isQuoteDetailsExpanded, setIsQuoteDetailsExpanded] = useState(false);
    const [isPaymentSummaryExpanded, setIsPaymentSummaryExpanded] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [isPaymentInvoicesExpanded, setIsPaymentInvoicesExpanded] = useState(false);
    const [hasPaymentInvoicesBeenExpanded, setHasPaymentInvoicesBeenExpanded] = useState(false);
    const [expandedPackages, setExpandedPackages] = useState({}); // Track which packages are expanded
    const [enabledPackages, setEnabledPackages] = useState({}); // Track which optional packages are enabled

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

    return (
        <>
            <Head title={pageTitle} />

            <div className="min-h-screen bg-gray-100 pb-20">
                <div className="px-4 py-4 space-y-4">
                    {/* 1. App Bar Card - Title and Back Navigation */}
                    <div className="bg-[#d81e43] rounded-lg shadow-sm">
                        <div className="fixed top-0 left-0 w-full bg-[#d81e43] text-white shadow-lg z-50 pt-4 pb-6 px-4">
                            <div className="flex items-center">
                                <Link
                                    href="/quotations"
                                    className="mr-3 text-white hover:text-gray-900"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </Link>
                                <h1 className="text-xl font-semibold text-white">
                                    {pageTitle}
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* 2. Tabs Section Card */}
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="px-4 py-4 mt-[4.5rem]">
                            <div className="flex space-x-1">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeTab === 'overview'
                                        ? 'bg-[#d81e43] text-white'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    Overview
                                </button>
                                <button
                                    onClick={() => setActiveTab('quotation-order')}
                                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeTab === 'quotation-order'
                                        ? 'bg-[#d81e43] text-white'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    Quotation Order
                                </button>
                                <button
                                    onClick={() => setActiveTab('terms')}
                                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeTab === 'terms'
                                        ? 'bg-[#d81e43] text-white'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    T&C
                                </button>
                            </div>
                        </div>
                    </div>

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

                    {/* Content */}
                    <div className="space-y-4">
                    {activeTab === 'overview' && (
                        <>

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
                                {isQuoteDetailsExpanded && (
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
                                )}
                            </div>

                            {/* Payment Summary Card - Expandable */}
                            <div className="bg-white rounded-lg shadow-sm">
                                <div className="p-4">
                                    {/* Payment Method - Read-only */}
                                    <div className="mb-3">
                                        <label className="block text-xs text-gray-600 mb-1">Payment Method &#128179;</label>
                                        <div className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-300 text-gray-700">
                                            Full Payment
                                        </div>
                                    </div>

                                    {/* Installment Months Dropdown */}
                                    <div className="mb-4">
                                        <label className="block text-xs text-gray-600 mb-1">Installment Period &#9203;</label>
                                        <select
                                            value={installmentMonths}
                                            onChange={(e) => setInstallmentMonths(Number(e.target.value))}
                                            className="input-cycling-border w-full px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-0 bg-white"
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
                                <div className={`expandable-content border-t border-gray-100 ${isPaymentSummaryExpanded ? 'expanded' : ''}`}>
                                    <div className="px-4 space-y-3">
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
                                        {!hasPaymentInvoicesBeenExpanded && (
                                            <span
                                                className="w-2 h-2 rounded-full -mt-5 -ms-1"
                                                style={{ backgroundColor: '#d81e43' }}
                                                aria-label="Expandable section"
                                            />
                                        )}
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
                                        {invoices.length === 0 ? (
                                            <div className="text-center py-8 text-gray-500 text-sm">
                                                No invoices found.
                                            </div>
                                        ) : (
                                            invoices.map((invoice, index) => (
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
                                        )}
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
                                    <button
                                        onClick={() => togglePackage(pkg.id)}
                                        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex-1 text-left">
                                            <div className="text-base font-bold text-gray-900 mb-1">
                                                {pkg.name}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {pkg.description}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 ml-4">
                                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                                                x{pkg.quantity}
                                            </span>
                                            <svg
                                                className={`w-5 h-5 text-gray-400 transition-transform ${expandedPackages[pkg.id] ? 'rotate-90' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </button>

                                    {/* Expandable Products List */}
                                    {expandedPackages[pkg.id] && (
                                        <div className="px-4 pb-4 border-t border-gray-100">
                                            <h3 className="text-sm font-semibold text-gray-900 mt-4 mb-3">Products</h3>
                                            <div className="grid grid-cols-12 gap-2 border-b border-gray-200 pb-2 mb-2 text-xs font-semibold text-gray-700 uppercase">
                                                <div className="col-span-3">S.o.W</div>         {/* <-- ADDED */}
                                                <div className="col-span-6">Product</div>       {/* <-- ADDED */}
                                                <div className="col-span-3 text-right">Quantity</div> {/* <-- ADDED */}
                                            </div>
                                            <div className="space-y-0">
                                                {pkg.products?.map((product, idx) => (
                                                    <div key={idx} className="border-b border-gray-100 last:border-b-0 py-3">
                                                        <div className="grid grid-cols-12 gap-2 items-start">
                                                            <div className="col-span-3">
                                                                <div className="text-xs text-gray-600">{product.sow}</div>
                                                            </div>
                                                            <div className="col-span-6">
                                                                <div className="text-sm font-semibold text-gray-900 mb-1">
                                                                    {product.product}
                                                                </div>
                                                                <div className="text-xs text-gray-600">
                                                                    {product.description}
                                                                </div>
                                                            </div>
                                                            <div className="col-span-3 text-right">
                                                                <div className="text-xs text-gray-600">{product.quantity}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
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
                                                className="bg-white rounded-lg shadow-sm overflow-hidden mb-4 last:mb-0 cursor-pointer hover:shadow-md transition-shadow"
                                                onClick={() => togglePackage(pkg.id)}
                                            >
                                                <div className="p-4">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div className="flex-1">
                                                            <div className="text-base font-bold text-gray-900 mb-1">{pkg.name}</div>
                                                            {pkg.description && (
                                                                <div className="text-sm text-gray-600">{pkg.description}</div>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center space-x-2 ml-4">
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

                                                            <div className="text-gray-400">
                                                                <svg
                                                                    className={`w-5 h-5 transform transition-transform ${expandedPackages[pkg.id] ? 'rotate-90' : ''}`}
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Expanded product list */}
                                                {expandedPackages[pkg.id] && (
                                                    <div className="bg-gray-50 border-t border-gray-200 px-4 pb-4">
                                                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mt-3">
                                                            <h3 className="text-sm font-semibold text-gray-900 mb-3">Products</h3>
                                                            <div className="grid grid-cols-12 gap-2 border-b border-gray-200 pb-2 mb-2 text-xs font-semibold text-gray-700 uppercase">
                                                                <div className="col-span-3">S.o.W</div>
                                                                <div className="col-span-6">Product</div>
                                                                <div className="col-span-3 text-right">Quantity</div>
                                                            </div>
                                                            <div className="space-y-0">
                                                                {pkg.products?.map((product, idx) => (
                                                                    <div key={idx} className="border-b border-gray-100 last:border-b-0 py-3">
                                                                        <div className="grid grid-cols-12 gap-2 items-start">
                                                                            <div className="col-span-3">
                                                                                <div className="text-xs text-gray-600">{product.sow}</div>
                                                                            </div>
                                                                            <div className="col-span-6">
                                                                                <div className="text-sm font-semibold text-gray-900 mb-1">
                                                                                    {product.product}
                                                                                </div>
                                                                                <div className="text-xs text-gray-600">{product.description}</div>
                                                                            </div>
                                                                            <div className="col-span-3 text-right">
                                                                                <div className="text-xs text-gray-600">{product.quantity}</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
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
        </>
    );
}

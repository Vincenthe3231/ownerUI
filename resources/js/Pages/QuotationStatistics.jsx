import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { Smile, Frown, Clock } from 'lucide-react';
import BottomNavigation from '@/Components/BottomNavigation';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function QuotationStatistics({ quotation, invoices = [] }) {
    const [animatedProgress, setAnimatedProgress] = useState({
        paid: false,
        overdue: false,
        pending: false,
    });
    const [showLabels, setShowLabels] = useState({
        paid: false,
        overdue: false,
        pending: false,
    });
    const [visibleInvoices, setVisibleInvoices] = useState(new Set());
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isObserverReady, setIsObserverReady] = useState(false);
    const progressRefs = useRef({});
    const invoiceRefs = useRef({});
    // Calculate invoice statistics
    const totalInvoices = invoices.length;
    const paidInvoices = invoices.filter(inv => inv.status === 'paid').length;
    const overdueInvoices = invoices.filter(inv => inv.status === 'overdue').length;
    const pendingInvoices = invoices.filter(inv => inv.status !== 'paid' && inv.status !== 'overdue').length;
    
    // Calculate amounts
    const totalAmount = invoices.reduce((sum, inv) => sum + parseFloat(inv.amount || 0), 0);
    const paidAmount = invoices
        .filter(inv => inv.status === 'paid')
        .reduce((sum, inv) => sum + parseFloat(inv.amount || 0), 0);
    const overdueAmount = invoices
        .filter(inv => inv.status === 'overdue')
        .reduce((sum, inv) => sum + parseFloat(inv.amount || 0), 0);
    const pendingAmount = invoices
        .filter(inv => inv.status !== 'paid' && inv.status !== 'overdue')
        .reduce((sum, inv) => sum + parseFloat(inv.amount || 0), 0);

    const paidPercentage = totalInvoices > 0 ? (paidInvoices / totalInvoices) * 100 : 0;
    const overduePercentage = totalInvoices > 0 ? (overdueInvoices / totalInvoices) * 100 : 0;
    const pendingPercentage = totalInvoices > 0 ? (pendingInvoices / totalInvoices) * 100 : 0;

    // Detect scroll start
    useEffect(() => {
        const handleScroll = () => {
            if (!hasScrolled) {
                setHasScrolled(true);
                // When scrolling starts, mark all currently visible invoices
                const visibleSet = new Set();
                Object.entries(invoiceRefs.current).forEach(([index, ref]) => {
                    if (ref) {
                        const rect = ref.getBoundingClientRect();
                        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                        if (isVisible) {
                            visibleSet.add(parseInt(index));
                        }
                    }
                });
                setVisibleInvoices(visibleSet);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasScrolled]);

    // Intersection Observer for progress bars and invoices
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1, // Lower threshold to trigger earlier
        };

        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const key = entry.target.getAttribute('data-progress-key');
                    if (key) {
                        setAnimatedProgress((prev) => ({ ...prev, [key]: true }));
                        // Show labels after progress bar animation completes (1000ms delay)
                        setTimeout(() => {
                            setShowLabels((prev) => ({ ...prev, [key]: true }));
                        }, 1000);
                    }
                }
            });
        }, observerOptions);

        const invoiceObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.getAttribute('data-invoice-index') || '0');
                    setVisibleInvoices((prev) => {
                        const newSet = new Set(prev);
                        newSet.add(index);
                        return newSet;
                    });
                }
            });
        }, observerOptions);

        // Use a delay to ensure refs are populated, then check initial visibility
        const timeoutId = setTimeout(() => {
            // Observe progress bars
            Object.entries(progressRefs.current).forEach(([key, ref]) => {
                if (ref) {
                    // Check if already in view
                    const rect = ref.getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                    if (isVisible) {
                        setAnimatedProgress((prev) => ({ ...prev, [key]: true }));
                        // Show labels after progress bar animation completes (1000ms delay)
                        setTimeout(() => {
                            setShowLabels((prev) => ({ ...prev, [key]: true }));
                        }, 1000);
                    }
                    progressObserver.observe(ref);
                }
            });

            // Observe invoice cards - only check visibility if user has scrolled
            Object.entries(invoiceRefs.current).forEach(([index, ref]) => {
                if (ref) {
                    // Only check initial visibility if user has scrolled
                    if (hasScrolled) {
                        const rect = ref.getBoundingClientRect();
                        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                        if (isVisible) {
                            setVisibleInvoices((prev) => {
                                const newSet = new Set(prev);
                                newSet.add(parseInt(index));
                                return newSet;
                            });
                        }
                    }
                    invoiceObserver.observe(ref);
                }
            });
            
            setIsObserverReady(true);
        }, 300);

        return () => {
            clearTimeout(timeoutId);
            progressObserver.disconnect();
            invoiceObserver.disconnect();
        };
    }, [invoices.length, hasScrolled]);

    return (
        <AuthenticatedLayout header={null} hideNavigation={true}>
            <Head title="Quotation Statistics" />
            <div className="min-h-screen bg-gray-100 pb-20">
                {/* Header */}
                <div className="bg-[#d81e43] shadow-sm">
                    <div className="px-4 py-4">
                        <div className="flex items-center mb-2">
                            <Link
                                href={route('quotation.overview', quotation?.id)}
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
                                Quotation Statistics
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-4 py-4 space-y-4">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <div className="text-sm text-gray-600 mb-1">Total Invoices</div>
                            <div className="text-2xl font-bold text-gray-900">{totalInvoices}</div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            <div className="text-sm text-gray-600 mb-1">Total Amount <span className="text-bold font-bold">(RM)</span></div>
                            <div className="text-2xl font-bold text-gray-900">
                                 {totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>

                    {/* Status Breakdown */}
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Breakdown</h2>
                        
                        {/* Paid */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span 
                                        className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full flex items-center gap-1 transition-all duration-[2000ms] ease-out"
                                        style={{
                                            opacity: showLabels.paid ? 1 : 0,
                                            transform: showLabels.paid ? 'translateY(0)' : 'translateY(-10px)',
                                        }}
                                    >
                                        <Smile className="w-4 h-4" />
                                        Paid
                                    </span>
                                    <span className="text-sm text-gray-600">{paidInvoices} invoices</span>
                                </div>
                                <span className="text-sm font-bold text-gray-900">
                                    {paidPercentage.toFixed(1)}%
                                </span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    ref={(el) => (progressRefs.current['paid'] = el)}
                                    data-progress-key="paid"
                                    className="h-full bg-green-500 transition-all duration-[1000ms] ease-out"
                                    style={{
                                        width: animatedProgress.paid ? `${paidPercentage}%` : '0%',
                                    }}
                                ></div>
                            </div>
                            <div className="text-xs font-bold mt-1">
                                RM {paidAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                        </div>

                        {/* Overdue */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span 
                                        className="px-3 py-1 text-xs font-medium bg-pink-100 text-pink-800 rounded-full flex items-center gap-1 transition-all duration-[2000ms] ease-out"
                                        style={{
                                            opacity: showLabels.overdue ? 1 : 0,
                                            transform: showLabels.overdue ? 'translateY(0)' : 'translateY(-10px)',
                                        }}
                                    >
                                        <Frown className="w-4 h-4" />
                                        Overdue
                                    </span>
                                    <span className="text-sm text-gray-600">{overdueInvoices} invoices</span>
                                </div>
                                <span className="text-sm font-bold text-gray-900">
                                    {overduePercentage.toFixed(1)}%
                                </span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    ref={(el) => (progressRefs.current['overdue'] = el)}
                                    data-progress-key="overdue"
                                    className="h-full bg-pink-500 transition-all duration-1000 ease-out"
                                    style={{
                                        width: animatedProgress.overdue ? `${overduePercentage}%` : '0%',
                                    }}
                                ></div>
                            </div>
                            <div className="text-xs font-bold mt-1">
                                RM {overdueAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                        </div>

                        {/* Pending */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span 
                                        className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full flex items-center gap-1 transition-all duration-[2000ms] ease-out"
                                        style={{
                                            opacity: showLabels.pending ? 1 : 0,
                                            transform: showLabels.pending ? 'translateY(0)' : 'translateY(-10px)',
                                        }}
                                    >
                                        <Clock className="w-4 h-4" />
                                        Pending
                                    </span>
                                    <span className="text-sm text-gray-600">{pendingInvoices} invoices</span>
                                </div>
                                <span className="text-sm font-bold text-gray-900">
                                    {pendingPercentage.toFixed(1)}%
                                </span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    ref={(el) => (progressRefs.current['pending'] = el)}
                                    data-progress-key="pending"
                                    className="h-full bg-gray-500 transition-all duration-1000 ease-out"
                                    style={{
                                        width: animatedProgress.pending ? `${pendingPercentage}%` : '0%',
                                    }}
                                ></div>
                            </div>
                            <div className="text-xs font-bold mt-1">
                                RM {pendingAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>

                    {/* Invoice List */}
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">All Invoices</h2>
                        <div className="space-y-3">
                            {invoices.length === 0 ? (
                                <div className="text-center py-8 text-gray-500 text-sm">
                                    No invoices found.
                                </div>
                            ) : (
                                invoices.map((invoice, index) => {
                                    // Only show invoice if user has scrolled AND it's visible
                                    const shouldShow = hasScrolled && visibleInvoices.has(index);
                                    return (
                                        <div
                                            key={index}
                                            ref={(el) => {
                                                if (el) {
                                                    invoiceRefs.current[index] = el;
                                                }
                                            }}
                                            data-invoice-index={index}
                                            className="bg-gray-50 border border-gray-100 rounded-lg p-3 transition-all duration-[2000ms] ease-out"
                                            style={{
                                                transform: shouldShow
                                                    ? 'translateX(0)'
                                                    : 'translateX(-30px)',
                                                opacity: shouldShow ? 1 : 0,
                                            }}
                                        >
                                        <div className="flex items-center justify-between mb-2">
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
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Amount:</span>
                                            <span className="font-semibold text-gray-900">
                                                RM {parseFloat(invoice.amount).toLocaleString('en-US', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm mt-1">
                                            <span className="text-gray-600">Due Date:</span>
                                            <span className="font-semibold text-gray-900">
                                                {invoice.due_date}
                                            </span>
                                        </div>
                                    </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <BottomNavigation active="quotations" />
        </AuthenticatedLayout>
    );
}

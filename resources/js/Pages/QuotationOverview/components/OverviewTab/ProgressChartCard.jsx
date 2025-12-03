import { useState, useEffect } from 'react';

export default function ProgressChartCard({ 
    quotation, 
    totalInvoices, 
    paidInvoices, 
    overdueInvoices, 
    circularProgress, 
    animatedPercentage,
    invoices = []
}) {
    // Calculate amounts
    const totalAmount = invoices.reduce((sum, inv) => sum + parseFloat(inv.amount || 0), 0);
    const paidAmount = invoices
        .filter(inv => inv.status === 'paid')
        .reduce((sum, inv) => sum + parseFloat(inv.amount || 0), 0);
    
    // Animated counter values
    const [animatedTotal, setAnimatedTotal] = useState(0);
    const [animatedPaid, setAnimatedPaid] = useState(0);
    const [animatedOverdue, setAnimatedOverdue] = useState(0);
    const [animatedTotalAmount, setAnimatedTotalAmount] = useState(0);
    const [animatedPaidAmount, setAnimatedPaidAmount] = useState(0);
    
    // Animation duration in milliseconds
    const ANIMATION_DURATION = 1500;
    
    // Counter animation function
    useEffect(() => {
        const animateValue = (start, end, setter, delay = 0, isDecimal = false) => {
            const startTime = Date.now() + delay;
            const duration = ANIMATION_DURATION;
            
            const animate = () => {
                const now = Date.now();
                const elapsed = now - startTime;
                
                if (elapsed < 0) {
                    requestAnimationFrame(animate);
                    return;
                }
                
                if (elapsed >= duration) {
                    setter(end);
                    return;
                }
                
                const progress = elapsed / duration;
                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = isDecimal 
                    ? start + (end - start) * easeOut
                    : Math.floor(start + (end - start) * easeOut);
                setter(current);
                
                requestAnimationFrame(animate);
            };
            
            animate();
        };
        
        if (totalInvoices > 0) {
            animateValue(0, totalInvoices, setAnimatedTotal, 0);
        }
        if (paidInvoices > 0) {
            animateValue(0, paidInvoices, setAnimatedPaid, 200);
        }
        if (overdueInvoices > 0) {
            animateValue(0, overdueInvoices, setAnimatedOverdue, 400);
        }
        if (totalAmount > 0) {
            animateValue(0, totalAmount, setAnimatedTotalAmount, 0, true);
        }
        if (paidAmount > 0) {
            animateValue(0, paidAmount, setAnimatedPaidAmount, 200, true);
        }
    }, [totalInvoices, paidInvoices, overdueInvoices, totalAmount, paidAmount]);
    return (
        <div 
            className="rounded-2xl relative p-6"
            style={{
                background: 'linear-gradient(135deg, rgba(245, 131, 61, 0.05) 0%, rgba(255, 255, 255, 0.98) 100%)',
                boxShadow: '0 8px 20px -5px rgba(245, 131, 61, 0.15), 0 4px 6px -2px rgba(245, 131, 61, 0.05)',
                backdropFilter: 'blur(10px)',
            }}
        >
            {/* Status Label - Top Left */}
            <div className="absolute top-4 left-4">
                <span className="text-sm font-semibold text-gray-900">Status</span>
            </div>
            
            {/* Progress Chart Section Card */}
            <div className="pt-8 flex flex-row items-start gap-6">
                {/* Left Side: Progress Indicator and Amount Cards */}
                <div className="flex flex-col items-center gap-3" style={{ flex: '0 0 45%', maxWidth: '200px' }}>
                    {/* Circular Progress Indicator - Smooth Ring */}
                    <div className="relative" style={{ width: '140px', height: '140px' }}>
                        <svg width="140" height="140" viewBox="0 0 140 140" className="transform -rotate-90">
                            <g transform="translate(70, 70)">
                                {/* Background ring */}
                                <circle
                                    cx="0"
                                    cy="0"
                                    r="55"
                                    fill="none"
                                    stroke="#e5e7eb"
                                    strokeWidth="10"
                                />
                                {/* Progress ring */}
                                <circle
                                    cx="0"
                                    cy="0"
                                    r="55"
                                    fill="none"
                                    stroke="#d81e43"
                                    strokeWidth="10"
                                    strokeDasharray={`${2 * Math.PI * 55}`}
                                    strokeDashoffset={`${2 * Math.PI * 55 * (1 - circularProgress / 100)}`}
                                    strokeLinecap="round"
                                    style={{
                                        transition: 'stroke-dashoffset 0.5s ease-out',
                                    }}
                                />
                            </g>
                        </svg>
                        {/* Stronger glossy mask overlay - multiple layers for enhanced effect */}
                        <div 
                            className="absolute inset-0 pointer-events-none rounded-full"
                            style={{
                                background: 'linear-gradient(315deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 30%, transparent 60%)',
                                borderRadius: '50%',
                            }}
                        />
                        <div 
                            className="absolute inset-0 pointer-events-none rounded-full"
                            style={{
                                background: 'radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.4) 0%, transparent 50%)',
                                borderRadius: '50%',
                            }}
                        />
                        {/* Percentage text in center - Animated */}
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <span 
                                className="text-3xl font-bold text-gray-900"
                                style={{
                                    transition: 'opacity 0.3s ease-in-out',
                                }}
                            >
                                {Math.round(animatedPercentage)}%
                            </span>
                        </div>
                    </div>

                    {/* Amount Cards - Below Progress Indicator (Vertical Layout) */}
                    <div className="flex flex-col gap-3 w-full">
                        {/* Paid Amount Card */}
                        <div 
                            className="flex flex-col p-4 rounded-lg cursor-pointer status-card"
                            style={{
                                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(255, 255, 255, 0.4) 100%)',
                                backdropFilter: 'blur(20px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                border: '1px solid rgba(255, 255, 255, 0.5)',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                                animation: 'slideInRight 0.6s ease-out forwards',
                                opacity: 1,
                                minHeight: '70px',
                                transformOrigin: 'center',
                                transition: 'transform 0.2s ease-out',
                            }}
                        >
                            <span className="text-2xl font-bold text-gray-900">
                                RM {animatedPaidAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            <span className="text-sm text-gray-600">Paid Amount</span>
                        </div>
                        
                        {/* Total Amount Card */}
                        <div 
                            className="flex flex-col p-4 rounded-lg cursor-pointer status-card"
                            style={{
                                background: `linear-gradient(135deg, rgba(60, 192, 189, 0.15) 0%, rgba(255, 255, 255, 0.4) 100%)`,
                                backdropFilter: 'blur(20px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                border: '1px solid rgba(255, 255, 255, 0.5)',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                                animation: 'slideInRight 0.6s ease-out 0.2s forwards',
                                opacity: 1,
                                minHeight: '70px',
                                transformOrigin: 'center',
                                transition: 'transform 0.2s ease-out',
                            }}
                        >
                            <span className="text-2xl font-bold text-gray-900">
                                RM {animatedTotalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            <span className="text-sm text-gray-600">Total Amount</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Status Metrics */}
                <div 
                    className="flex flex-col gap-3" 
                    style={{ 
                        flex: '1 1 55%',
                        paddingTop: '1rem',
                        paddingBottom: '1rem',
                    }}
                >
                    {totalInvoices > 0 && (
                        <div 
                            className="flex flex-col p-4 rounded-lg cursor-pointer status-card"
                            style={{
                                background: 'linear-gradient(135deg, rgba(107, 114, 128, 0.1) 0%, rgba(255, 255, 255, 0.4) 100%)',
                                backdropFilter: 'blur(20px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                border: '1px solid rgba(255, 255, 255, 0.5)',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                                animation: 'slideInRight 0.6s ease-out forwards',
                                opacity: 1,
                                minHeight: '70px',
                                transformOrigin: 'center',
                                transition: 'transform 0.2s ease-out',
                            }}
                        >
                            <span className="text-2xl font-bold text-gray-900">{animatedTotal}</span>
                            <span className="text-sm text-gray-600">Total</span>
                        </div>
                    )}
                    {paidInvoices > 0 && (
                        <div 
                            className="flex flex-col p-4 rounded-lg cursor-pointer status-card"
                            style={{
                                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(255, 255, 255, 0.4) 100%)',
                                backdropFilter: 'blur(20px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                border: '1px solid rgba(255, 255, 255, 0.5)',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                                animation: 'slideInRight 0.6s ease-out 0.2s forwards',
                                opacity: 1,
                                minHeight: '70px',
                                transformOrigin: 'center',
                                transition: 'transform 0.2s ease-out',
                            }}
                        >
                            <span className="text-2xl font-bold text-gray-900">{animatedPaid}</span>
                            <span className="text-sm text-gray-600">Paid</span>
                        </div>
                    )}
                    {overdueInvoices > 0 && (
                        <div 
                            className="flex flex-col p-4 rounded-lg cursor-pointer status-card"
                            style={{
                                background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(255, 255, 255, 0.4) 100%)',
                                backdropFilter: 'blur(20px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                border: '1px solid rgba(255, 255, 255, 0.5)',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                                animation: 'slideInRight 0.6s ease-out 0.4s forwards',
                                opacity: 1,
                                minHeight: '70px',
                                transformOrigin: 'center',
                                transition: 'transform 0.2s ease-out',
                            }}
                        >
                            <span className="text-2xl font-bold text-gray-900">{animatedOverdue}</span>
                            <span className="text-sm text-gray-600">Overdue</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


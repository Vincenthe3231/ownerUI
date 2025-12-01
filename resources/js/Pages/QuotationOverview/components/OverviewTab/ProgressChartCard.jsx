import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { BarChart3 } from 'lucide-react';
import { getGlossyChipStyle } from '../../utils/getGlossyChipStyle';

export default function ProgressChartCard({ 
    quotation, 
    totalInvoices, 
    paidInvoices, 
    overdueInvoices, 
    circularProgress, 
    animatedPercentage 
}) {
    // Animated counter values
    const [animatedTotal, setAnimatedTotal] = useState(0);
    const [animatedPaid, setAnimatedPaid] = useState(0);
    const [animatedOverdue, setAnimatedOverdue] = useState(0);
    
    // Animation duration in milliseconds
    const ANIMATION_DURATION = 1500;
    
    // Counter animation function
    useEffect(() => {
        const animateValue = (start, end, setter, delay = 0) => {
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
                const current = Math.floor(start + (end - start) * easeOut);
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
    }, [totalInvoices, paidInvoices, overdueInvoices]);
    return (
        <div 
            className="rounded-2xl hover:scale-[1.02] relative p-6"
            style={{
                background: 'linear-gradient(135deg, rgba(245, 131, 61, 0.1) 0%, rgba(255, 255, 255, 0.9) 100%)',
                boxShadow: '0 8px 20px -5px rgba(245, 131, 61, 0.25), 0 4px 6px -2px rgba(245, 131, 61, 0.1)',
                backdropFilter: 'blur(10px)',
                transformOrigin: 'center',
                transition: 'transform 0.15s ease-out',
                transitionDelay: '0s',
            }}
        >
            {/* Status Label - Top Left */}
            <div className="absolute top-4 left-4">
                <span className="text-sm font-semibold text-gray-900">Status</span>
            </div>
            
            {/* Progress Chart Section Card */}
            <div className="pt-8 flex flex-row items-center gap-6">
                {/* Circular Progress Indicator with Segments - Left Side */}
                <div className="relative flex-shrink-0" style={{ width: '140px', height: '140px' }}>
                    <svg width="140" height="140" viewBox="0 0 140 140" className="transform -rotate-90">
                        <g transform="translate(70, 70)">
                            {Array.from({ length: 100 }).map((_, index) => {
                                const isFilled = index < circularProgress;
                                const segmentAngle = (360 / 100) * (Math.PI / 180);
                                const startAngle = (index * 360 / 100 - 90) * (Math.PI / 180);
                                const endAngle = startAngle + segmentAngle;
                                
                                const radius = 60;
                                const innerRadius = 50;
                                
                                const x1 = Math.cos(startAngle) * innerRadius;
                                const y1 = Math.sin(startAngle) * innerRadius;
                                const x2 = Math.cos(startAngle) * radius;
                                const y2 = Math.sin(startAngle) * radius;
                                const x3 = Math.cos(endAngle) * radius;
                                const y3 = Math.sin(endAngle) * radius;
                                const x4 = Math.cos(endAngle) * innerRadius;
                                const y4 = Math.sin(endAngle) * innerRadius;
                                
                                const largeArc = segmentAngle > Math.PI ? 1 : 0;
                                
                                return (
                                    <path
                                        key={index}
                                        d={`M ${x1} ${y1} L ${x2} ${y2} A ${radius} ${radius} 0 ${largeArc} 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1} ${y1} Z`}
                                        fill={isFilled ? '#d81e43' : '#e5e7eb'}
                                        style={{
                                            transition: 'fill 0.1s ease-out',
                                            transitionDelay: `${index * 0.01}s`,
                                        }}
                                    />
                                );
                            })}
                        </g>
                    </svg>
                    {/* Percentage text in center - Animated */}
                    <div className="absolute inset-0 flex items-center justify-center">
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

                {/* Status Metrics - Right Side */}
                <div className="flex-1 flex flex-col gap-3">
                    {totalInvoices > 0 && (
                        <div 
                            className="flex flex-col p-4 rounded-lg"
                            style={{
                                background: 'rgba(255, 255, 255, 0.25)',
                                backdropFilter: 'blur(20px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                                animation: 'slideInRight 0.6s ease-out',
                                transform: 'translateX(0)',
                                opacity: 1,
                            }}
                        >
                            <span className="text-2xl font-bold text-gray-900">{animatedTotal}</span>
                            <span className="text-sm text-gray-600">Total</span>
                        </div>
                    )}
                    {paidInvoices > 0 && (
                        <div 
                            className="flex flex-col p-4 rounded-lg"
                            style={{
                                background: 'rgba(255, 255, 255, 0.25)',
                                backdropFilter: 'blur(20px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                                animation: 'slideInRight 0.6s ease-out 0.2s both',
                                transform: 'translateX(0)',
                                opacity: 1,
                            }}
                        >
                            <span className="text-2xl font-bold text-gray-900">{animatedPaid}</span>
                            <span className="text-sm text-gray-600">Paid</span>
                        </div>
                    )}
                    {overdueInvoices > 0 && (
                        <div 
                            className="flex flex-col p-4 rounded-lg"
                            style={{
                                background: 'rgba(255, 255, 255, 0.25)',
                                backdropFilter: 'blur(20px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                                animation: 'slideInRight 0.6s ease-out 0.4s both',
                                transform: 'translateX(0)',
                                opacity: 1,
                            }}
                        >
                            <span className="text-2xl font-bold text-gray-900">{animatedOverdue}</span>
                            <span className="text-sm text-gray-600">Overdue</span>
                        </div>
                    )}
                    
                    {/* Statistic Button - Inline with Statistic Cards */}
                    {quotation?.id && (
                        <Link
                            href={route('quotation.statistics', quotation.id)}
                            className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90 hover:scale-105 cursor-pointer shadow-md text-center flex items-center justify-center gap-2"
                            style={{
                                background: '#d81e43',
                                boxShadow: '0 4px 12px rgba(216, 30, 67, 0.3), 0 2px 4px rgba(216, 30, 67, 0.2)',
                            }}
                        >
                            <BarChart3 className="w-4 h-4" />
                            Statistic
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}


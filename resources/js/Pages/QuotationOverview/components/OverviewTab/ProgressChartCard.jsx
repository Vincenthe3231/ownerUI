import { Link } from '@inertiajs/react';
import { getGlossyChipStyle } from '../../utils/getGlossyChipStyle';

export default function ProgressChartCard({ 
    quotation, 
    totalInvoices, 
    paidInvoices, 
    overdueInvoices, 
    circularProgress, 
    animatedPercentage 
}) {
    return (
        <div 
            className="rounded-2xl hover:scale-[1.02]"
            style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.08),
                    0 4px 16px rgba(0, 0, 0, 0.06),
                    0 2px 8px rgba(0, 0, 0, 0.04),
                    inset 0 1px 0 rgba(255, 255, 255, 0.9),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                `,
                transformOrigin: 'center',
                transition: 'transform 0.15s ease-out',
                transitionDelay: '0s',
            }}
        >
            {/* Progress Chart Section Card */}
            <div className="px-4 py-6 flex flex-col items-center">
                {/* Circular Progress Indicator with Segments */}
                <div className="relative mb-6" style={{ width: '140px', height: '140px' }}>
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
                                        fill={isFilled ? '#22c55e' : '#e5e7eb'}
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

                {/* Status Chips - Centered */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                    {totalInvoices > 0 && (
                        <span 
                            className="px-3 py-1.5 text-xs font-semibold rounded-full relative overflow-hidden"
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
                            <span className="relative z-10">Total: {totalInvoices}</span>
                        </span>
                    )}
                    {paidInvoices > 0 && (
                        <span 
                            className="px-3 py-1.5 text-xs font-semibold rounded-full relative overflow-hidden"
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
                            <span className="relative z-10">Paid: {paidInvoices}</span>
                        </span>
                    )}
                    {overdueInvoices > 0 && (
                        <span 
                            className="px-3 py-1.5 text-xs font-semibold rounded-full relative overflow-hidden"
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
                            <span className="relative z-10">Overdue: {overdueInvoices}</span>
                        </span>
                    )}
                </div>

                {/* View Statistic Button - Centered */}
                {quotation?.id && (
                    <Link
                        href={route('quotation.statistics', quotation.id)}
                        className="px-4 py-2 text-sm font-medium text-[#e91e3d] underline rounded-lg transition-colors hover:opacity-90"
                    >
                        View Statistic
                    </Link>
                )}
            </div>
        </div>
    );
}


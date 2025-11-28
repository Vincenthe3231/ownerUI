import { getGlossyChipStyle } from '../../utils/getGlossyChipStyle';

export default function QuoteDetailsCard({ quotation, isExpanded, onToggle }) {
    return (
        <div 
            className="bg-white rounded-lg hover:scale-105 cursor-pointer"
            style={{
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                transformOrigin: 'center',
                transition: 'transform 0.15s ease-out',
                transitionDelay: '0s',
            }}
        >
            <button
                onClick={onToggle}
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
                            <span className="relative z-10">{quotation?.status || 'Confirmed'}</span>
                        </span>
                    )}
                    {quotation?.status === 'Unreleased' && (
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
                            <span className="relative z-10">Unreleased</span>
                        </span>
                    )}
                    {!quotation?.status && (
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
                            <span className="relative z-10">Confirmed</span>
                        </span>
                    )}
                    <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
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
            <div className={`expandable-content ${isExpanded ? 'expanded' : ''}`}>
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
    );
}


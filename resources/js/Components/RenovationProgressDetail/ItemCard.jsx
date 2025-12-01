import { getStatusBadgeStyle, getIconStyle } from '@/Pages/RenovationProgressDetail/utils/statusHelpers';

export default function ItemCard({ 
    item, 
    index, 
    status, 
    activeTabIcon: ActiveTabIcon,
    isBlinking = false,
    onTap,
}) {
    return (
        <div
            onClick={onTap}
            className="bg-gray-50 rounded-lg p-4 transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
            style={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                transformOrigin: 'center',
            }}
        >
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 flex items-center justify-center relative">
                        <div 
                            className="w-10 h-10 flex items-center justify-center rounded-full relative overflow-hidden"
                            style={{
                                ...getIconStyle(),
                            }}
                        >
                            {/* Glossy highlight effect */}
                            <div 
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, transparent 55%)',
                                    borderRadius: '50%',
                                }}
                            />
                            <ActiveTabIcon 
                                className="w-6 h-6 text-white relative z-10" 
                                style={{
                                    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-semibold text-blue-900">
                            {item.name}
                        </div>
                        <div 
                            className={`px-3 py-1.5 text-xs font-semibold rounded-full flex-shrink-0 relative overflow-hidden ${isBlinking ? 'animate-blink' : ''}`}
                            style={{
                                ...getStatusBadgeStyle(status),
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                                position: 'relative',
                            }}
                        >
                            {/* Glossy highlight effect */}
                            <div 
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                                    borderRadius: '9999px',
                                }}
                            />
                            <span className="relative z-10">{status}</span>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        Last updated: {item.last_updated_at || item.updated_date || 'N/A'}
                    </div>
                </div>
            </div>
        </div>
    );
}


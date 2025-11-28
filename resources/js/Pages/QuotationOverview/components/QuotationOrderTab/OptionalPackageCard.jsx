export default function OptionalPackageCard({ 
    pkg, 
    isEnabled, 
    isConfirmed,
    onToggleEnabled,
    onViewDetails 
}) {
    return (
        <div
            className="bg-white rounded-lg overflow-hidden mb-4 last:mb-0 hover:scale-105 cursor-pointer"
            style={{
                boxShadow: isEnabled 
                    ? '0 4px 16px rgba(216, 30, 67, 0.2), 0 2px 4px rgba(216, 30, 67, 0.15)'
                    : '0 4px 16px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
                border: isEnabled ? '2px solid #d81e43' : '1px solid rgba(0, 0, 0, 0.08)',
                transformOrigin: 'center',
                transition: 'transform 0.15s ease-out',
                transitionDelay: '0s',
            }}
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
                                    onToggleEnabled();
                                }
                            }}
                            type="button"
                            role="switch"
                            aria-checked={isEnabled}
                            disabled={isConfirmed}
                            className={`relative inline-flex flex-shrink-0 h-6 w-12 border-2 rounded-full transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                isConfirmed
                                    ? 'bg-gray-200 border-gray-200 cursor-not-allowed opacity-50'
                                    : isEnabled
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'bg-gray-300 border-gray-300'
                            }`}
                        >
                            <span
                                className={`transform transition-transform duration-200 ease-in-out inline-block h-5 w-5 bg-white rounded-full shadow ${
                                    isEnabled ? 'translate-x-6' : 'translate-x-0'
                                }`}
                            />
                        </button>

                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                            x{pkg.quantity}
                        </span>
                    </div>
                </div>
                
                <button
                    onClick={onViewDetails}
                    className="w-full py-2 px-4 text-sm font-medium text-[#d81e43] border border-[#d81e43] rounded-lg hover:bg-[#d81e43] hover:text-white transition-colors"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}


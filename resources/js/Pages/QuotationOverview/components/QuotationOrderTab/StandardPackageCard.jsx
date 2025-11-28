export default function StandardPackageCard({ pkg, onViewDetails }) {
    return (
        <div 
            className="bg-white rounded-lg overflow-hidden hover:scale-105 cursor-pointer"
            style={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                transformOrigin: 'center',
                transition: 'transform 0.15s ease-out',
                transitionDelay: '0s',
            }}
        >
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
                    onClick={onViewDetails}
                    className="w-full py-2 px-4 text-sm font-medium text-[#d81e43] border border-[#d81e43] rounded-lg hover:bg-[#d81e43] hover:text-white transition-colors"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}


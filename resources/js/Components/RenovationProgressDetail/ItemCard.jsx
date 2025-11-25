import { getStatusBadgeColor } from '@/Pages/RenovationProgressDetail/utils/statusHelpers';

export default function ItemCard({ 
    item, 
    index, 
    status, 
    activeTabIcon: ActiveTabIcon,
    onTap,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
}) {
    return (
        <div
            onClick={onTap}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="bg-gray-50 rounded-lg p-4 transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
            style={{
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                transformOrigin: 'center',
                touchAction: 'pan-y',
            }}
        >
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 flex items-center justify-center relative">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#d81e43]">
                            <ActiveTabIcon className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-semibold text-blue-900">
                            {item.name}
                        </div>
                        <div className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${getStatusBadgeColor(status)}`}>
                            {status}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


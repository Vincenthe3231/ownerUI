import { SKELETON_CONFIG } from './constants';

/**
 * Reusable skeleton table component
 * Used for tables, lists, or row-like skeletons
 */
export default function SkeletonTable({ 
    rows = 9,
    columns = 3,
    showHeader = false,
    className = '',
}) {
    return (
        <div className={`bg-white rounded-2xl shadow-sm p-4 ${className}`}>
            {showHeader && (
                <div className={`h-6 ${SKELETON_CONFIG.colors.primary} rounded w-40 mb-4 ${SKELETON_CONFIG.animation}`}></div>
            )}
            <div className="space-y-3">
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div key={rowIndex} className="flex items-center space-x-4">
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <div 
                                key={colIndex}
                                className={colIndex === 0 
                                    ? `h-4 ${SKELETON_CONFIG.colors.primary} rounded flex-1 ${SKELETON_CONFIG.animation}`
                                    : `h-4 ${SKELETON_CONFIG.colors.primary} rounded w-24 ${SKELETON_CONFIG.animation}`
                                }
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}


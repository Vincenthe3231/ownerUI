import { SKELETON_CONFIG } from './constants';

/**
 * Reusable skeleton tabs component
 * Used for navigation tabs or tab-like skeletons
 */
export default function SkeletonTabs({ 
    count = 6,
    className = '',
}) {
    return (
        <div className={`bg-white rounded-2xl shadow-sm ${className}`}>
            <div className="flex border-b border-gray-200">
                {Array.from({ length: count }).map((_, i) => (
                    <div 
                        key={i} 
                        className={`flex-1 h-12 ${SKELETON_CONFIG.colors.primary} ${SKELETON_CONFIG.animation}`}
                    />
                ))}
            </div>
        </div>
    );
}


import { SKELETON_CONFIG } from './constants';

/**
 * Reusable skeleton progress component
 * Used for progress indicators, stages, or step-like skeletons
 */
export default function SkeletonProgress({ 
    stages = 3,
    showHeader = true,
    className = '',
}) {
    return (
        <div className={`bg-white rounded-2xl shadow-sm p-4 ${className}`}>
            {showHeader && (
                <div className="flex items-center space-x-2 mb-4">
                    <div className={`${SKELETON_CONFIG.sizes.icon.small} ${SKELETON_CONFIG.colors.primary} rounded ${SKELETON_CONFIG.animation}`}></div>
                    <div className={`h-5 ${SKELETON_CONFIG.colors.primary} rounded w-40 ${SKELETON_CONFIG.animation}`}></div>
                </div>
            )}
            <div className="flex items-start justify-between relative">
                {Array.from({ length: stages }).map((_, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                        <div className={`w-10 h-10 ${SKELETON_CONFIG.colors.primary} rounded-full ${SKELETON_CONFIG.animation} mb-3`}></div>
                        <div className={`h-4 ${SKELETON_CONFIG.colors.primary} rounded w-20 mb-1 ${SKELETON_CONFIG.animation}`}></div>
                        <div className={`h-3 ${SKELETON_CONFIG.colors.primary} rounded w-16 mb-1 ${SKELETON_CONFIG.animation}`}></div>
                        <div className={`h-3 ${SKELETON_CONFIG.colors.primary} rounded w-12 ${SKELETON_CONFIG.animation}`}></div>
                    </div>
                ))}
            </div>
        </div>
    );
}


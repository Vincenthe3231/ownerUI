import SkeletonBar from '../SkeletonBar';
import SkeletonCard from '../SkeletonCard';
import SkeletonTabs from '../SkeletonTabs';
import SkeletonProgress from '../SkeletonProgress';
import SkeletonTable from '../SkeletonTable';
import { SKELETON_CONFIG } from '../constants';

/**
 * Page-specific skeleton layout for Renovation Progress Detail page
 * Composes reusable skeleton components into a complete page layout
 */
export default function RenovationProgressSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="px-4 py-4 space-y-4 my-12">
                {/* Skeleton AppBar */}
                <SkeletonBar />

                {/* Skeleton Navigation Tabs */}
                <SkeletonTabs count={6} />

                {/* Skeleton Project Card */}
                <SkeletonCard>
                    <div className="flex items-center space-x-4">
                        <div className={`${SKELETON_CONFIG.sizes.icon.large} ${SKELETON_CONFIG.colors.primary} rounded-lg ${SKELETON_CONFIG.animation}`}></div>
                        <div className="flex-1 space-y-2">
                            <div className={`h-5 ${SKELETON_CONFIG.colors.primary} rounded w-3/4 ${SKELETON_CONFIG.animation}`}></div>
                        </div>
                        <div className={`${SKELETON_CONFIG.sizes.icon.small} ${SKELETON_CONFIG.colors.primary} rounded ${SKELETON_CONFIG.animation}`}></div>
                    </div>
                </SkeletonCard>

                {/* Skeleton Progress Stages */}
                <SkeletonProgress stages={3} showHeader={true} />

                {/* Skeleton Agreement Banner */}
                <div className={`${SKELETON_CONFIG.colors.primary} rounded-2xl p-4 ${SKELETON_CONFIG.animation}`}>
                    <div className="flex items-start space-x-3">
                        <div className={`${SKELETON_CONFIG.sizes.icon.medium} ${SKELETON_CONFIG.colors.secondary} rounded ${SKELETON_CONFIG.animation}`}></div>
                        <div className="flex-1 space-y-2">
                            <div className={`h-5 ${SKELETON_CONFIG.colors.secondary} rounded w-48 ${SKELETON_CONFIG.animation}`}></div>
                            <div className={`h-4 ${SKELETON_CONFIG.colors.secondary} rounded w-full ${SKELETON_CONFIG.animation}`}></div>
                            <div className={`h-9 ${SKELETON_CONFIG.colors.secondary} rounded w-32 ${SKELETON_CONFIG.animation}`}></div>
                        </div>
                    </div>
                </div>

                {/* Skeleton Room & Furnitures Table */}
                <SkeletonTable rows={9} columns={3} showHeader={true} />
            </div>
        </div>
    );
}


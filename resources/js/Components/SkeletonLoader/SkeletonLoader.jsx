import RenovationProgressSkeleton from './layouts/RenovationProgressSkeleton';
import BottomNavigation from '@/Components/BottomNavigation';

/**
 * Main SkeletonLoader component - composable and flexible
 * Supports different variants and optional navigation
 */
export default function SkeletonLoader({ 
    variant = 'renovation-progress',
    showNavigation = true,
    navigationActive = 'reno-progress',
    children,
}) {
    // If children are provided, use them (fully composable)
    if (children) {
        return (
            <>
                {children}
                {showNavigation && <BottomNavigation active={navigationActive} />}
            </>
        );
    }

    // Otherwise, use predefined layouts based on variant
    const renderSkeleton = () => {
        switch (variant) {
            case 'renovation-progress':
                return <RenovationProgressSkeleton />;
            default:
                return <RenovationProgressSkeleton />;
        }
    };

    return (
        <>
            {renderSkeleton()}
            {showNavigation && <BottomNavigation active={navigationActive} />}
        </>
    );
}


import { SKELETON_CONFIG } from './constants';

/**
 * Reusable skeleton card component
 * Used for cards, containers, or any card-like skeleton
 */
export default function SkeletonCard({ 
    children,
    className = '',
    padding = SKELETON_CONFIG.sizes.card.padding,
    rounded = SKELETON_CONFIG.sizes.card.rounded,
}) {
    return (
        <div className={`bg-white ${rounded} shadow-sm ${padding} ${className}`}>
            {children}
        </div>
    );
}


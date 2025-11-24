import { SKELETON_CONFIG } from './constants';

/**
 * Reusable skeleton bar component
 * Used for AppBar, headers, or any horizontal bar skeleton
 */
export default function SkeletonBar({ 
    height = SKELETON_CONFIG.sizes.bar.default,
    className = '',
    rounded = 'rounded-lg',
}) {
    return (
        <div 
            className={`${height} ${SKELETON_CONFIG.colors.primary} ${rounded} ${SKELETON_CONFIG.animation} ${className}`}
        />
    );
}


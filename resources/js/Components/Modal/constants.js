/**
 * Configuration constants for Modal component
 */
export const MAX_WIDTH_CLASSES = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
};

/**
 * Get max width class based on maxWidth prop
 * @param {string} maxWidth - Max width value
 * @returns {string} - CSS classes for max width
 */
export const getMaxWidthClass = (maxWidth) => {
    return MAX_WIDTH_CLASSES[maxWidth] || MAX_WIDTH_CLASSES['2xl'];
}


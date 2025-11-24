/**
 * Configuration constants for Dropdown component
 */
export const ALIGNMENT_CLASSES = {
    default: 'origin-top',
    left: 'ltr:origin-top-left rtl:origin-top-right start-0',
    right: 'ltr:origin-top-right rtl:origin-top-left end-0',
};

export const WIDTH_CLASSES = {
    '48': 'w-48',
};

/**
 * Get alignment classes based on align prop
 * @param {string} align - Alignment value ('left', 'right', or default)
 * @returns {string} - CSS classes for alignment
 */
export const getAlignmentClasses = (align) => {
    return ALIGNMENT_CLASSES[align] || ALIGNMENT_CLASSES.default;
};

/**
 * Get width classes based on width prop
 * @param {string} width - Width value
 * @returns {string} - CSS classes for width
 */
export const getWidthClasses = (width) => {
    return WIDTH_CLASSES[width] || '';
};


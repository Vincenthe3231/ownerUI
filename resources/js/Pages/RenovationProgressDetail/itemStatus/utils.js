/**
 * Utility functions for item status management
 */

/**
 * Generate a unique key for an item status
 * @param {Object} item - The item object
 * @param {number} index - The index of the item
 * @param {string} activeTab - The currently active tab
 * @param {string} activeFilter - The currently active filter
 * @param {boolean} hasFilters - Whether the active tab uses filters
 * @returns {string} The unique key for the item status
 */
export function getItemStatusKey(item, index, activeTab, activeFilter, hasFilters) {
    if (hasFilters) {
        return `${item.name}-${activeTab}-${activeFilter}-${index}`;
    }
    return `${item.name}-${activeTab}-${index}`;
}


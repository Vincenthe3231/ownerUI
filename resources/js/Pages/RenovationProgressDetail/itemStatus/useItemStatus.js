import { useState } from 'react';
import { router } from '@inertiajs/react';
import { normalizeStatus } from '../utils/statusHelpers';
import { STATUS_ORDER, FILTER_CHIPS_CONFIG } from '../utils/constants';
import { getItemStatusKey } from './utils';

/**
 * Hook for managing item statuses in the renovation progress detail page.
 * 
 * Provides functionality to:
 * - Get the current status of an item
 * - Change item status (next/previous in status order)
 * - Track blinking animations for status changes
 * 
 * @param {Object} project - The project object
 * @param {string} activeTab - The currently active tab
 * @param {string} activeFilter - The currently active filter
 * @returns {Object} Object containing getItemStatus, changeItemStatus, and isItemBlinking functions
 */
export function useItemStatus(project, activeTab, activeFilter) {
    const [itemStatuses, setItemStatuses] = useState({});
    const [blinkingItems, setBlinkingItems] = useState(new Set());

    // Check if the active tab uses filters
    const hasFilters = FILTER_CHIPS_CONFIG[activeTab] && FILTER_CHIPS_CONFIG[activeTab].length > 0;

    /**
     * Get the current status of an item
     * @param {Object} item - The item object
     * @param {number} index - The index of the item
     * @returns {string} The normalized status
     */
    const getItemStatus = (item, index) => {
        const itemKey = getItemStatusKey(item, index, activeTab, activeFilter, hasFilters);
        
        if (itemStatuses[itemKey]) {
            return itemStatuses[itemKey];
        }
        
        // For tabs with filters (room, bath), use the filter property
        // For tabs without filters (dining, kitchen, electrical, living), use status property
        const rawStatus = hasFilters ? item[activeFilter] : item.status;
        return normalizeStatus(rawStatus);
    };

    /**
     * Change the status of an item
     * @param {Object} item - The item object
     * @param {number} index - The index of the item
     * @param {string} direction - 'next' to move to next status, 'previous' to move to previous status
     */
    const changeItemStatus = (item, index, direction) => {
        const itemKey = getItemStatusKey(item, index, activeTab, activeFilter, hasFilters);
        const currentStatus = getItemStatus(item, index);
        const currentIndex = STATUS_ORDER.indexOf(currentStatus);
        
        let newIndex;
        if (direction === 'next') {
            // Move to next status
            newIndex = currentIndex < STATUS_ORDER.length - 1 ? currentIndex + 1 : 0;
        } else if (direction === 'previous') {
            // Move to previous status
            newIndex = currentIndex > 0 ? currentIndex - 1 : STATUS_ORDER.length - 1;
        } else {
            // Invalid direction, return early
            return;
        }
        
        const newStatus = STATUS_ORDER[newIndex];
        
        // Update local state immediately
        setItemStatuses(prev => ({
            ...prev,
            [itemKey]: newStatus
        }));
        
        // Trigger blink animation
        setBlinkingItems(prev => new Set(prev).add(itemKey));
        setTimeout(() => {
            setBlinkingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(itemKey);
                return newSet;
            });
        }, 600); // Blink duration
        
        // Save to database
        if (project?.id) {
            // For tabs with filters, send the activeFilter value
            // For tabs without filters, send null for filter
            const filterValue = hasFilters ? activeFilter : null;
            
            router.post(route('renovation-progress.update-item-status'), {
                project_id: project.id,
                item_name: item.name,
                filter: filterValue,
                status: newStatus,
                tab: activeTab,
            }, {
                preserveScroll: true,
                preserveState: true,
                only: [],
                onError: (errors) => {
                    console.error('Failed to update status:', errors);
                    // Revert on error
                    setItemStatuses(prev => ({
                        ...prev,
                        [itemKey]: currentStatus
                    }));
                },
            });
        }
    };

    /**
     * Check if an item is currently blinking (status change animation)
     * @param {Object} item - The item object
     * @param {number} index - The index of the item
     * @returns {boolean} True if the item is blinking
     */
    const isItemBlinking = (item, index) => {
        const itemKey = getItemStatusKey(item, index, activeTab, activeFilter, hasFilters);
        return blinkingItems.has(itemKey);
    };

    return { itemStatuses, getItemStatus, changeItemStatus, isItemBlinking };
}


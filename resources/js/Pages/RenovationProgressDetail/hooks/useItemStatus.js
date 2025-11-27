import { useState } from 'react';
import { router } from '@inertiajs/react';
import { normalizeStatus } from '../utils/statusHelpers';
import { STATUS_ORDER, FILTER_CHIPS_CONFIG } from '../utils/constants';

export function useItemStatus(project, activeTab, activeFilter) {
    const [itemStatuses, setItemStatuses] = useState({});
    const [blinkingItems, setBlinkingItems] = useState(new Set());

    // Check if the active tab uses filters
    const hasFilters = FILTER_CHIPS_CONFIG[activeTab] && FILTER_CHIPS_CONFIG[activeTab].length > 0;

    const getItemStatus = (item, index) => {
        // Include filter in key for tabs with filters to track each variant separately
        const itemKey = hasFilters 
            ? `${item.name}-${activeTab}-${activeFilter}-${index}`
            : `${item.name}-${activeTab}-${index}`;
        if (itemStatuses[itemKey]) {
            return itemStatuses[itemKey];
        }
        // For tabs with filters (room, bath), use the filter property
        // For tabs without filters (dining, kitchen, electrical, living), use status property
        const rawStatus = hasFilters ? item[activeFilter] : item.status;
        return normalizeStatus(rawStatus);
    };

    const changeItemStatus = (item, index, direction) => {
        // Include filter in key for tabs with filters to track each variant separately
        const itemKey = hasFilters 
            ? `${item.name}-${activeTab}-${activeFilter}-${index}`
            : `${item.name}-${activeTab}-${index}`;
        const currentStatus = getItemStatus(item, index);
        const currentIndex = STATUS_ORDER.indexOf(currentStatus);
        
        let newIndex;
        if (direction === 'left') {
            // Swipe left - next status
            newIndex = currentIndex < STATUS_ORDER.length - 1 ? currentIndex + 1 : 0;
        } else {
            // Swipe right - previous status
            newIndex = currentIndex > 0 ? currentIndex - 1 : STATUS_ORDER.length - 1;
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

    const isItemBlinking = (item, index) => {
        const itemKey = hasFilters 
            ? `${item.name}-${activeTab}-${activeFilter}-${index}`
            : `${item.name}-${activeTab}-${index}`;
        return blinkingItems.has(itemKey);
    };

    return { itemStatuses, getItemStatus, changeItemStatus, isItemBlinking };
}


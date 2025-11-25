import { useState } from 'react';
import { router } from '@inertiajs/react';
import { normalizeStatus } from '../utils/statusHelpers';
import { STATUS_ORDER } from '../utils/constants';

export function useItemStatus(project, activeTab, activeFilter) {
    const [itemStatuses, setItemStatuses] = useState({});

    const getItemStatus = (item, index) => {
        const itemKey = `${item.name}-${index}`;
        if (itemStatuses[itemKey]) {
            return itemStatuses[itemKey];
        }
        const rawStatus = item[activeFilter];
        return normalizeStatus(rawStatus);
    };

    const changeItemStatus = (item, index, direction) => {
        const itemKey = `${item.name}-${index}`;
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
        
        // Save to database
        if (project?.id) {
            router.post(route('renovation-progress.update-item-status'), {
                project_id: project.id,
                item_name: item.name,
                filter: activeFilter,
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

    return { itemStatuses, getItemStatus, changeItemStatus };
}


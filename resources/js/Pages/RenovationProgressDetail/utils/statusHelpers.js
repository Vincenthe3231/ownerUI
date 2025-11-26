export const getStatusBadgeColor = (status) => {
    switch (status) {
        case 'Applied':
            return 'bg-green-100 text-green-800';
        case 'On Hold':
            return 'bg-yellow-300 text-yellow-900 border-2 border-yellow-500';
        case 'Not Applicable':
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export const getStatusBadgeStyle = (status) => {
    switch (status) {
        case 'Applied':
            return {
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', // Vibrant green gradient
                color: '#ffffff',
                boxShadow: `
                    0 4px 12px rgba(34, 197, 94, 0.4),
                    0 2px 4px rgba(34, 197, 94, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                `,
                border: 'none',
            };
        case 'On Hold':
            return {
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', // Vibrant yellow/orange gradient
                color: '#ffffff',
                boxShadow: `
                    0 4px 12px rgba(251, 191, 36, 0.4),
                    0 2px 4px rgba(251, 191, 36, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                `,
                border: 'none',
            };
        case 'Not Applicable':
        default:
            return {
                // background: 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)', // Gray gradient
                background: 'linear-gradient(135deg, #9ca3af 0%, #b8bdc6 100%)', // Gray gradient
                color: '#ffffff',
                boxShadow: `
                    0 4px 12px rgba(156, 163, 175, 0.3),
                    0 2px 4px rgba(156, 163, 175, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                `,
                border: 'none',
            };
    }
};

export const normalizeStatus = (status) => {
    if (!status) return 'Not Applicable';
    const statusLower = status.toLowerCase().trim();
    if (statusLower === 'applied') return 'Applied';
    if (statusLower === 'on hold' || statusLower === 'on_hold' || statusLower === 'onhold') return 'On Hold';
    return 'Not Applicable';
};

export const getStatusColor = (status) => {
    switch (status) {
        case 'completed':
            return 'text-green-600';
        case 'in_progress':
            return 'text-yellow-600';
        case 'not_started':
            return 'text-gray-400';
        default:
            return 'text-gray-400';
    }
};

export const getStatusBgColor = (status) => {
    switch (status) {
        case 'completed':
            return 'bg-green-500';
        case 'in_progress':
            return 'bg-yellow-500';
        case 'not_started':
            return 'bg-gray-300';
        default:
            return 'bg-gray-300';
    }
};

export const getProgressBarColor = (segmentIndex, currentStageIndex) => {
    // segmentIndex 0 = between stage 1 and 2, segmentIndex 1 = between stage 2 and 3
    // When a stage is in_progress, the segment leading TO it is completed (green)
    // and the segment FROM it to the next stage is in progress (yellow)
    if (segmentIndex < currentStageIndex) {
        return 'bg-green-500';
    } else if (segmentIndex === currentStageIndex) {
        return 'bg-yellow-500';
    } else {
        return 'bg-gray-300';
    }
};

export const getProgressNodeStyle = (status) => {
    switch (status) {
        case 'completed':
            return {
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', // Vibrant green gradient
                color: '#ffffff',
                boxShadow: `
                    0 4px 12px rgba(34, 197, 94, 0.4),
                    0 2px 4px rgba(34, 197, 94, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                `,
                border: 'none',
            };
        case 'in_progress':
            return {
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', // Vibrant yellow/orange gradient
                color: '#ffffff',
                boxShadow: `
                    0 4px 12px rgba(251, 191, 36, 0.4),
                    0 2px 4px rgba(251, 191, 36, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                `,
                border: 'none',
            };
        case 'not_started':
        default:
            return {
                // background: 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)', // Gray gradient
                background: 'linear-gradient(135deg, #9ca3af 0%, #b8bdc6 100%)', // Gray gradient
                color: '#ffffff',
                boxShadow: `
                    0 4px 12px rgba(156, 163, 175, 0.3),
                    0 2px 4px rgba(156, 163, 175, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                `,
                border: 'none',
            };
    }
};

export const getIconStyle = () => {
    return {
        background: 'linear-gradient(135deg, #e91e3d 0%, #c81a33 100%)', // Vibrant red gradient
        color: '#ffffff',
        boxShadow: `
            0 4px 12px rgba(216, 30, 67, 0.4),
            0 2px 4px rgba(216, 30, 67, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1)
        `,
        border: 'none',
    };
};


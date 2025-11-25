export const getStatusBadgeColor = (status) => {
    switch (status) {
        case 'Applied':
            return 'bg-green-100 text-green-800';
        case 'On Hold':
            return 'bg-yellow-100 text-yellow-800';
        case 'Not Applicable':
        default:
            return 'bg-gray-100 text-gray-800';
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
    if (segmentIndex < currentStageIndex) {
        return 'bg-green-500';
    } else if (segmentIndex === currentStageIndex) {
        return 'bg-yellow-500';
    } else {
        return 'bg-gray-300';
    }
};


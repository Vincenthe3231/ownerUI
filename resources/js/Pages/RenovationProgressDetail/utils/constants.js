import { Home, Droplet, UtensilsCrossed, ChefHat, Zap, Sofa } from 'lucide-react';

export const TABS = [
    { id: 'room', label: 'Room', icon: Home },
    { id: 'bath', label: 'Bath', icon: Droplet },
    { id: 'dining', label: 'Dining', icon: UtensilsCrossed },
    { id: 'kitchen', label: 'Kitchen', icon: ChefHat },
    { id: 'electrical', label: 'Electrical', icon: Zap },
    { id: 'living', label: 'Living', icon: Sofa },
];

export const STATUS_ORDER = ['Not Applicable', 'On Hold', 'Applied'];

export const FILTER_CHIPS_CONFIG = {
    room: ['r1', 'r2', 'r3', 'r4', 'pr', 'studio'],
    bath: ['r1', 'r2', 'r3'],
    default: [],
};

export const DEFAULT_PROGRESS_STAGES = [
    {
        id: 1,
        name: 'Sales',
        status: 'completed',
        statusText: 'Completed',
        date: '10/11/2025',
        color: 'green',
    },
    {
        id: 2,
        name: 'Defect & Permit',
        status: 'in_progress',
        statusText: 'In Progress',
        date: 'N/A',
        color: 'yellow',
    },
    {
        id: 3,
        name: 'Renovation',
        status: 'not_started',
        statusText: 'Not Started',
        date: 'N/A',
        color: 'gray',
    },
    {
        id: 4,
        name: 'Owner Handover',
        status: 'not_started',
        statusText: 'Not Started',
        date: 'N/A',
        color: 'gray',
    },
];


export const getFilteredItems = (project, activeTab) => {
    if (!project) return [];
    
    switch (activeTab) {
        case 'room':
            return project.room_furnitures || [];
        case 'bath':
            return project.bath_furnitures || [];
        case 'dining':
            return project.dining_furnitures || [];
        case 'kitchen':
            return project.kitchen_furnitures || [];
        case 'electrical':
            return project.electrical_furnitures || [];
        case 'living':
            return project.living_furnitures || [];
        default:
            return [];
    }
};

export const filterItemsBySearch = (items, searchQuery) => {
    if (!searchQuery.trim()) return items;
    return items.filter(item => 
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
};


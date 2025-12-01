import { HelpCircle } from 'lucide-react';
import SearchBar from './SearchBar';
import ItemCard from './ItemCard';

export default function ContentSection({
    title,
    items,
    searchQuery,
    onSearchChange,
    onSearchClear,
    activeTabIcon,
    getItemStatus,
    isItemBlinking,
    onItemTap,
    onHelpClick,
    searchInputRef,
}) {
    return (
        <div 
            className="bg-white rounded-2xl p-4"
            style={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
            }}
        >
            <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                <button
                    onClick={onHelpClick}
                    className="p-1 text-[#d81e43] hover:text-[#c01a38] transition-colors"
                >
                    <HelpCircle className="w-5 h-5 text-[#d81e43]" />
                </button>
            </div>
            
            <SearchBar
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                onSearchClear={onSearchClear}
                searchInputRef={searchInputRef}
            />
            
            <div className="space-y-3">
                {items.length > 0 ? (
                    items.map((item, index) => {
                        const status = getItemStatus(item, index);
                        const isBlinking = isItemBlinking ? isItemBlinking(item, index) : false;
                        return (
                            <ItemCard
                                key={index}
                                item={item}
                                index={index}
                                status={status}
                                activeTabIcon={activeTabIcon}
                                isBlinking={isBlinking}
                                onTap={() => onItemTap(item, index, status)}
                            />
                        );
                    })
                ) : (
                    <div className="py-8 text-center text-sm text-gray-500">
                        No items available
                    </div>
                )}
            </div>
        </div>
    );
}


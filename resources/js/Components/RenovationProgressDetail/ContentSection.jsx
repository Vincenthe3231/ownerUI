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
    onItemTap,
    onItemTouchStart,
    onItemTouchMove,
    onItemTouchEnd,
    onHelpClick,
    searchInputRef,
    contentSectionRef,
}) {
    return (
        <div 
            ref={contentSectionRef}
            className="bg-white rounded-2xl shadow-sm p-4 border-[#d81e43] border"
        >
            <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                <button
                    onClick={onHelpClick}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <HelpCircle className="w-5 h-5" />
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
                        return (
                            <ItemCard
                                key={index}
                                item={item}
                                index={index}
                                status={status}
                                activeTabIcon={activeTabIcon}
                                onTap={() => onItemTap(item, index, status)}
                                onTouchStart={(e) => onItemTouchStart(e, item, index)}
                                onTouchMove={onItemTouchMove}
                                onTouchEnd={onItemTouchEnd}
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


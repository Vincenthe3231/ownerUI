import { Search, X } from 'lucide-react';

export default function SearchBar({ searchQuery, onSearchChange, onSearchClear, searchInputRef }) {
    return (
        <div className="relative mb-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search item name..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onFocus={(e) => {
                        if (e.target.value === '') {
                            setTimeout(() => {
                                e.target.setSelectionRange(0, 0);
                            }, 0);
                        }
                    }}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d81e43] focus:border-transparent search-input"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                />
                {searchQuery && (
                    <button
                        onClick={onSearchClear}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
}


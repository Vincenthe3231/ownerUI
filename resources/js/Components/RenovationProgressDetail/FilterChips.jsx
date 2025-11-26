export default function FilterChips({ chips, activeFilter, onFilterChange, appBarHeight }) {
    if (chips.length === 0) return null;

    return (
        <div 
            className="flex gap-1.5 overflow-x-auto scrollbar-hide py-2 sticky z-40 bg-white shadow-sm rounded-sm p-2"
            style={{
                top: `${appBarHeight + 80}px`,
                transition: 'top 0.2s ease-in-out',
                position: 'sticky',
            }}
        >
            {chips.map((chip) => (
                <button
                    key={chip}
                    onClick={() => onFilterChange(chip)}
                    type="button"
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === chip
                        ? 'bg-[#d81e43] text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-[#d81e43]'
                        }`}
                >
                    {chip.toUpperCase()}
                </button>
            ))}
        </div>
    );
}


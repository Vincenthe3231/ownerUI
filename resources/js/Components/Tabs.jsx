export default function Tabs({ activeTab, onTabChange, tabs = [], className = '' }) {
    return (
        <div className={`bg-white rounded-2xl shadow-sm ${className}`}>
            <div className="flex border-b border-gray-200">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
                                isActive
                                    ? 'text-[#d81e43]'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            {tab.label}
                            {isActive && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d81e43]" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}


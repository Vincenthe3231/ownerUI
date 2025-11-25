export default function NavigationTabs({ tabs, activeTab, onTabChange, appBarHeight, tabsContainerRef, onFilterReset }) {
    return (
        <div 
            className="sticky z-40 backdrop-blur-md bg-white/60 shadow-sm"
            style={{
                top: `${appBarHeight}px`,
                transition: 'top 0.2s ease-in-out',
                position: 'sticky',
            }}
        >
            <div className="px-2 pb-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20">
                    <div 
                        ref={tabsContainerRef}
                        className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide drag-hint-container tab-slider"
                        style={{
                            scrollSnapType: 'x mandatory',
                            WebkitOverflowScrolling: 'touch',
                            width: '100%',
                            maxWidth: '100vw',
                        }}
                    >
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        onTabChange(tab.id);
                                        // Reset filter when switching tabs
                                        if (tab.id === 'room' || tab.id === 'bath') {
                                            onFilterReset('r1');
                                        }
                                    }}
                                    className={`px-4 py-3 text-sm font-medium transition-colors relative whitespace-nowrap flex flex-col items-center gap-1 flex-shrink-0 tab-button ${isActive
                                        ? 'text-[#d81e43]'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    style={{
                                        scrollSnapAlign: 'start',
                                        scrollSnapStop: 'always',
                                        minWidth: 'fit-content',
                                        paddingLeft: 'clamp(0.75rem, 2vw, 1rem)',
                                        paddingRight: 'clamp(0.75rem, 2vw, 1rem)',
                                        fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                                    }}
                                >
                                    <div 
                                        className={`rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-[#d81e43] text-white' : 'bg-gray-100 text-gray-600'
                                        }`}
                                        style={{
                                            width: 'clamp(1.75rem, 5vw, 2rem)',
                                            height: 'clamp(1.75rem, 5vw, 2rem)',
                                        }}
                                    >
                                        <Icon 
                                            className="w-4 h-4"
                                            style={{
                                                width: 'clamp(0.875rem, 3vw, 1rem)',
                                                height: 'clamp(0.875rem, 3vw, 1rem)',
                                            }}
                                        />
                                    </div>
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}


import { Head } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import AppBar from '@/Components/AppBar';
import BottomNavigation from '@/Components/BottomNavigation';
import SkeletonLoader from '@/Components/SkeletonLoader';
import NavigationTabs from '@/Components/RenovationProgressDetail/NavigationTabs';
import ProjectInfoCard from '@/Components/RenovationProgressDetail/ProjectInfoCard';
import ProgressStages from '@/Components/RenovationProgressDetail/ProgressStages';
import AgreementNotification from '@/Components/RenovationProgressDetail/AgreementNotification';
import FilterChips from '@/Components/RenovationProgressDetail/FilterChips';
import ContentSection from '@/Components/RenovationProgressDetail/ContentSection';
import CoachMark from '@/Components/RenovationProgressDetail/CoachMark';
import TaskDetailSheet from '@/Components/RenovationProgressDetail/TaskDetailSheet';
import { useAppBarHeight } from './RenovationProgressDetail/hooks/useAppBarHeight';
import { useItemStatus } from './RenovationProgressDetail/hooks/useItemStatus';
import { useSwipeGestures } from './RenovationProgressDetail/hooks/useSwipeGestures';
import { useTabsSlidingHint } from './RenovationProgressDetail/hooks/useTabsSlidingHint';
import { useCoachMark as useCoachMarkHook } from './RenovationProgressDetail/hooks/useCoachMark';
import { useFilterSwipe } from './RenovationProgressDetail/hooks/useFilterSwipe';
import { TABS, FILTER_CHIPS_CONFIG } from './RenovationProgressDetail/utils/constants';
import { getFilteredItems, filterItemsBySearch } from './RenovationProgressDetail/utils/dataHelpers';

const CONTENT_SECTION_TITLES = {
    room: 'Room & Furnitures',
    bath: 'Bathroom Section',
    dining: 'Dining, Yard, Foyer',
    kitchen: 'Kitchen',
    electrical: 'Electrical Appliances',
    living: 'Living',
};

export default function RenovationProgressDetail({ project, loading = false, projectId }) {
    const [activeTab, setActiveTab] = useState('room');
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [activeFilter, setActiveFilter] = useState('r1');
    const [isProjectInfoExpanded, setIsProjectInfoExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    
    const tabsContainerRef = useRef(null);
    const searchInputRef = useRef(null);
    const contentSectionRef = useRef(null);
    
    const appBarHeight = useAppBarHeight();
    const { getItemStatus, changeItemStatus, isItemBlinking } = useItemStatus(project, activeTab, activeFilter);
    const { showCoachMark, coachMarkSlide, openCoachMark, closeCoachMark, nextSlide, previousSlide } = useCoachMarkHook();
    const { handleItemTouchStart, handleItemTouchMove, handleItemTouchEnd } = useSwipeGestures(
        changeItemStatus, getItemStatus, setSelectedItem
    );
    
    useTabsSlidingHint(tabsContainerRef);
    
    // Get filter chips
    const filterChips = FILTER_CHIPS_CONFIG[activeTab] || FILTER_CHIPS_CONFIG.default;
    
    // Get filter swipe handlers
    const { handleTouchStart, handleTouchMove, handleTouchEnd } = useFilterSwipe(
        contentSectionRef, filterChips, activeFilter, setActiveFilter
    );
    
    // Get active tab icon
    const activeTabData = TABS.find(tab => tab.id === activeTab);
    const ActiveTabIcon = activeTabData ? activeTabData.icon : TABS[0].icon;
    
    // Get filtered items
    const allItems = getFilteredItems(project, activeTab);
    const filteredItems = filterItemsBySearch(allItems, searchQuery);

    useEffect(() => {
        const timer = setTimeout(() => setShowSkeleton(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        setSearchQuery('');
    }, [activeTab]);

    if (showSkeleton || !project) {
        return <SkeletonLoader />;
    }

    const handleItemTap = (item, index, status) => {
        setSelectedItem({ ...item, index, status });
    };

    return (
        <>
            <Head title="Reno Progress" />

            <div 
                className="min-h-screen bg-gray-50 pb-20 w-full"
                style={{
                    overflowX: 'clip',
                    maxWidth: '100vw',
                    position: 'relative',
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <NavigationTabs
                    tabs={TABS}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    appBarHeight={appBarHeight}
                    tabsContainerRef={tabsContainerRef}
                    onFilterReset={setActiveFilter}
                />

                <div 
                    className="px-4 py-4 space-y-4"
                    style={{
                        paddingTop: `${appBarHeight + 16}px`,
                        transition: 'padding-top 0.2s ease-in-out',
                    }}
                >
                    <AppBar title="Reno Progress" backHref="/renovation-progress" />
                    
                    <ProjectInfoCard
                        project={project}
                        isExpanded={isProjectInfoExpanded}
                        onToggle={() => setIsProjectInfoExpanded(!isProjectInfoExpanded)}
                    />
                    
                    <ProgressStages progressStages={project?.progress_stages} />
                    
                    {project?.hasAgreement && <AgreementNotification />}
                    
                    <FilterChips
                        chips={filterChips}
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                        appBarHeight={appBarHeight}
                    />

                    <ContentSection
                        title={CONTENT_SECTION_TITLES[activeTab] || 'Content'}
                        items={filteredItems}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        onSearchClear={() => setSearchQuery('')}
                        activeTabIcon={ActiveTabIcon}
                        getItemStatus={getItemStatus}
                        isItemBlinking={isItemBlinking}
                        onItemTap={handleItemTap}
                        onItemTouchStart={handleItemTouchStart}
                        onItemTouchMove={handleItemTouchMove}
                        onItemTouchEnd={handleItemTouchEnd}
                        onHelpClick={openCoachMark}
                        searchInputRef={searchInputRef}
                        contentSectionRef={contentSectionRef}
                    />
                </div>
            </div>

            <BottomNavigation active="reno-progress" />
            <CoachMark
                show={showCoachMark}
                slide={coachMarkSlide}
                onClose={closeCoachMark}
                onPrevious={previousSlide}
                onNext={nextSlide}
            />
            <TaskDetailSheet
                selectedItem={selectedItem}
                activeFilter={activeFilter}
                onClose={() => setSelectedItem(null)}
            />
        </>
    );
}

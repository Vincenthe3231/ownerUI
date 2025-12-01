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
import Snackbar from '@/Components/Snackbar';
import { useAppBarHeight } from './RenovationProgressDetail/hooks/useAppBarHeight';
import { useItemStatus } from './RenovationProgressDetail/itemStatus';
import { useTabsSlidingHint } from './RenovationProgressDetail/hooks/useTabsSlidingHint';
import { useCoachMark as useCoachMarkHook } from './RenovationProgressDetail/hooks/useCoachMark';
import { useFilterSwipe } from './RenovationProgressDetail/hooks/useFilterSwipe';
import { useTabSwipe } from './RenovationProgressDetail/hooks/useTabSwipe';
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
    const [isFilterTransitioning, setIsFilterTransitioning] = useState(false);
    const [filterSlideOffset, setFilterSlideOffset] = useState(0);
    const [filterDirection, setFilterDirection] = useState(null);
    const [isTabTransitioning, setIsTabTransitioning] = useState(false);
    const [tabSlideOffset, setTabSlideOffset] = useState(0);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const prevTabRef = useRef(activeTab);
    const prevFilterRef = useRef(activeFilter);
    
    const tabsContainerRef = useRef(null);
    const searchInputRef = useRef(null);
    const contentSectionRef = useRef(null);
    
    const appBarHeight = useAppBarHeight();
    const { getItemStatus, changeItemStatus, isItemBlinking } = useItemStatus(project, activeTab, activeFilter);
    const { showCoachMark, coachMarkSlide, openCoachMark, closeCoachMark, nextSlide, previousSlide } = useCoachMarkHook();
    
    useTabsSlidingHint(tabsContainerRef);
    
    // Handle tab change with animation
    const switchToTab = (tabId, direction = null) => {
        if (tabId === activeTab || isTabTransitioning) return;
        
        // Show snackbar with tab name
        const newTab = TABS.find(tab => tab.id === tabId);
        if (newTab) {
            setSnackbarMessage(newTab.label);
            setShowSnackbar(true);
        }
        
        setIsTabTransitioning(true);
        
        if (direction) {
            if (direction === 'left') {
                setTabSlideOffset(100);
            } else {
                setTabSlideOffset(-100);
            }
            
            setActiveTab(tabId);
            prevTabRef.current = tabId;
            // Reset filter when switching tabs
            if (tabId === 'room' || tabId === 'bath') {
                setActiveFilter('r1');
                prevFilterRef.current = 'r1';
            }
            
            requestAnimationFrame(() => {
                setTabSlideOffset(0);
            });
        } else {
            setTabSlideOffset(0);
            setActiveTab(tabId);
            prevTabRef.current = tabId;
            // Reset filter when switching tabs
            if (tabId === 'room' || tabId === 'bath') {
                setActiveFilter('r1');
                prevFilterRef.current = 'r1';
            }
        }
        
        setTimeout(() => {
            setIsTabTransitioning(false);
        }, 300);
    };
    
    // Get tab swipe handlers (for swipes outside content area)
    const { 
        handleTouchStart: handleTabTouchStart, 
        handleTouchMove: handleTabTouchMove, 
        handleTouchEnd: handleTabTouchEnd 
    } = useTabSwipe(activeTab, switchToTab, isTabTransitioning, contentSectionRef);
    
    // Get filter chips
    const filterChips = FILTER_CHIPS_CONFIG[activeTab] || FILTER_CHIPS_CONFIG.default;
    
    // Handle filter change with animation
    const handleFilterChange = (newFilter) => {
        if (newFilter === activeFilter || isFilterTransitioning) return;
        
        // Show snackbar with filter name (convert r1, r2, etc. to readable format)
        const filterLabel = newFilter.toUpperCase().replace(/^R/, 'R');
        setSnackbarMessage(filterLabel);
        setShowSnackbar(true);
        
        const currentIndex = filterChips.indexOf(activeFilter);
        const newIndex = filterChips.indexOf(newFilter);
        const direction = newIndex > currentIndex ? 'left' : 'right';
        
        setIsFilterTransitioning(true);
        setFilterDirection(direction);
        
        // When sliding left (next filter), new content comes from right (100%)
        // When sliding right (previous filter), new content comes from left (-100%)
        if (direction === 'left') {
            setFilterSlideOffset(100); // New content starts from right
        } else {
            setFilterSlideOffset(-100); // New content starts from left
        }
        
        setActiveFilter(newFilter);
        prevFilterRef.current = newFilter;
        
        requestAnimationFrame(() => {
            setFilterSlideOffset(0); // Slide to center
        });
        
        setTimeout(() => {
            setIsFilterTransitioning(false);
            setFilterDirection(null);
        }, 300);
    };
    
    // Show snackbar when tab changes via swipe
    useEffect(() => {
        if (activeTab !== prevTabRef.current && prevTabRef.current) {
            const currentTab = TABS.find(tab => tab.id === activeTab);
            if (currentTab) {
                setSnackbarMessage(currentTab.label);
                setShowSnackbar(true);
            }
        }
        prevTabRef.current = activeTab;
    }, [activeTab]);
    
    // Show snackbar when filter changes via swipe
    useEffect(() => {
        if (activeFilter !== prevFilterRef.current && prevFilterRef.current && filterChips.length > 0) {
            const filterLabel = activeFilter.toUpperCase().replace(/^R/, 'R');
            setSnackbarMessage(filterLabel);
            setShowSnackbar(true);
        }
        prevFilterRef.current = activeFilter;
    }, [activeFilter, filterChips]);
    
    // Get filter swipe handlers (for swipes inside content area)
    const { 
        handleTouchStart: handleFilterTouchStart, 
        handleTouchMove: handleFilterTouchMove, 
        handleTouchEnd: handleFilterTouchEnd 
    } = useFilterSwipe(
        contentSectionRef, filterChips, activeFilter, handleFilterChange
    );
    
    // Combine touch handlers - track touch position to determine if it's inside or outside content
    const combinedTouchStartX = useRef(0);
    const combinedTouchStartY = useRef(0);
    
    const handleTouchStart = (e) => {
        combinedTouchStartX.current = e.touches[0].clientX;
        combinedTouchStartY.current = e.touches[0].clientY;
        handleTabTouchStart(e);
        handleFilterTouchStart(e);
    };
    
    const handleTouchMove = (e) => {
        handleTabTouchMove(e);
        handleFilterTouchMove(e);
    };
    
    const handleTouchEnd = (e) => {
        // Check if swipe started outside content area for tab switching
        const touch = e.changedTouches[0];
        const touchStartElement = document.elementFromPoint(combinedTouchStartX.current, combinedTouchStartY.current);
        const isOutsideContent = contentSectionRef?.current && 
            !contentSectionRef.current.contains(touchStartElement) &&
            !touchStartElement?.closest('[data-content-section]');
        
        // Try tab swipe first if outside content, otherwise try filter swipe
        if (isOutsideContent) {
            handleTabTouchEnd(e);
            // Also call filter handler to reset its state
            handleFilterTouchEnd(e);
        } else {
            handleFilterTouchEnd(e);
            // Also call tab handler to reset its state
            handleTabTouchEnd(e);
        }
    };
    
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
                    onTabChange={(tabId) => switchToTab(tabId)}
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
                        onFilterChange={handleFilterChange}
                        appBarHeight={appBarHeight}
                    />

                    <div 
                        ref={contentSectionRef}
                        data-content-section
                        className="relative w-full"
                        style={{
                            overflowX: 'clip',
                            maxWidth: '100%',
                            contain: 'style',
                        }}
                    >
                        <div
                            key={`${activeTab}-${activeFilter}`}
                            style={{
                                ...(isTabTransitioning || isFilterTransitioning ? {
                                    transform: `translate3d(${isTabTransitioning ? tabSlideOffset : filterSlideOffset}%, 0, 0)`,
                                    transition: 'transform 0.3s ease-in-out',
                                    opacity: (isTabTransitioning && tabSlideOffset !== 0) || (isFilterTransitioning && filterSlideOffset !== 0) ? 0.7 : 1,
                                    willChange: 'transform',
                                } : {
                                    transform: 'translate3d(0, 0, 0)',
                                    transition: 'none',
                                    opacity: 1,
                                    willChange: 'auto',
                                }),
                                maxWidth: '100%',
                                boxSizing: 'border-box',
                            }}
                        >
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
                                onHelpClick={openCoachMark}
                                searchInputRef={searchInputRef}
                            />
                        </div>
                    </div>
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
            <Snackbar
                message={snackbarMessage}
                show={showSnackbar}
                onClose={() => setShowSnackbar(false)}
            />
        </>
    );
}

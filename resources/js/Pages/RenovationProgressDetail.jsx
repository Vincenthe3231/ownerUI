import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AppBar from '@/Components/AppBar';
import BottomNavigation from '@/Components/BottomNavigation';
import SkeletonLoader from '@/Components/SkeletonLoader';
import { ChevronRight, Calendar, FileCheck, CheckCircle2, Clock, XCircle, Home, Droplet, UtensilsCrossed, ChefHat, Zap, Sofa, HelpCircle } from 'lucide-react';

export default function RenovationProgressDetail({ project, loading = false }) {
    const [activeTab, setActiveTab] = useState('room');
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [activeFilter, setActiveFilter] = useState('r1');

    useEffect(() => {
        // Show skeleton for initial load simulation
        // This matches the sleep(2) in the controller
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // Show skeleton while loading or if project is not available
    if (showSkeleton || !project) {
        return <SkeletonLoader />;
    }

    const tabs = [
        { id: 'room', label: 'Room', icon: Home },
        { id: 'bath', label: 'Bath', icon: Droplet },
        { id: 'dining', label: 'Dining', icon: UtensilsCrossed },
        { id: 'kitchen', label: 'Kitchen', icon: ChefHat },
        { id: 'electrical', label: 'Electrical', icon: Zap },
        { id: 'living', label: 'Living', icon: Sofa },
    ];

    const progressStages = project?.progress_stages || [
        {
            id: 1,
            name: 'Sales',
            status: 'completed',
            statusText: 'Completed',
            date: 'N/A',
            color: 'green',
        },
        {
            id: 2,
            name: 'Defect & Permit',
            status: 'in_progress',
            statusText: 'In Progress',
            date: 'TBC',
            color: 'yellow',
        },
        {
            id: 3,
            name: 'Owner Handover',
            status: 'not_started',
            statusText: 'Not Started',
            date: 'TBC',
            color: 'gray',
        },
    ];

    const roomFurnitures = project?.room_furnitures || [];
    const bathFurnitures = project?.bath_furnitures || [];
    const diningFurnitures = project?.dining_furnitures || [];
    const kitchenFurnitures = project?.kitchen_furnitures || [];
    const electricalFurnitures = project?.electrical_furnitures || [];
    const livingFurnitures = project?.living_furnitures || [];
    
    // Filter chips configuration
    const getFilterChips = () => {
        switch (activeTab) {
            case 'room':
                return ['r1', 'r2', 'r3', 'r4', 'pr', 'studio'];
            case 'bath':
                return ['r1', 'r2', 'r3'];
            default:
                return [];
        }
    };

    const filterChips = getFilterChips();
    
    // Get items for the active tab and filter
    const getFilteredItems = () => {
        switch (activeTab) {
            case 'room':
                return roomFurnitures;
            case 'bath':
                return bathFurnitures;
            case 'dining':
                return diningFurnitures;
            case 'kitchen':
                return kitchenFurnitures;
            case 'electrical':
                return electricalFurnitures;
            case 'living':
                return livingFurnitures;
            default:
                return [];
        }
    };

    const filteredItems = getFilteredItems();

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'text-green-600';
            case 'in_progress':
                return 'text-yellow-600';
            case 'not_started':
                return 'text-gray-400';
            default:
                return 'text-gray-400';
        }
    };

    const getStatusBgColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-500';
            case 'in_progress':
                return 'bg-yellow-500';
            case 'not_started':
                return 'bg-gray-300';
            default:
                return 'bg-gray-300';
        }
    };

    const getProgressBarColor = (segmentIndex, currentStageIndex) => {
        // segmentIndex 0 = between stage 1 and 2, segmentIndex 1 = between stage 2 and 3
        if (segmentIndex < currentStageIndex) {
            return 'bg-green-500';
        } else if (segmentIndex === currentStageIndex) {
            return 'bg-yellow-500';
        } else {
            return 'bg-gray-300';
        }
    };

    const currentStageIndex = progressStages.findIndex(stage => stage.status === 'in_progress');
    // If no in_progress stage, use the last completed stage index
    const activeStageIndex = currentStageIndex >= 0 ? currentStageIndex : progressStages.length - 1;

    return (
        <>
            <Head title="Reno Progress" />

            <div className="min-h-screen bg-gray-50 pb-20">
                {/* Sticky Navigation Tabs with Glassmorphism */}
                <div className="sticky top-16 z-40 backdrop-blur-md bg-white/60 shadow-sm">
                    <div className="px-2 pb-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20">
                            <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
                                {tabs.map((tab) => {
                                    const isActive = activeTab === tab.id;
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => {
                                                setActiveTab(tab.id);
                                                // Reset filter when switching tabs
                                                if (tab.id === 'room') {
                                                    setActiveFilter('r1');
                                                } else if (tab.id === 'bath') {
                                                    setActiveFilter('r1');
                                                }
                                            }}
                                            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative whitespace-nowrap flex flex-col items-center gap-1 ${isActive
                                                ? 'text-[#d81e43]'
                                                : 'text-gray-600 hover:text-gray-900'
                                                }`}
                                        >
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-[#d81e43] text-white' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <span>{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-4 space-y-4 my-12">
                    <AppBar title="Reno Progress" backHref="/renovation-progress" />

                    {/* Project Information Card */}
                    {project && (
                        <div className="bg-white rounded-3xl p-2 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <div className="w-8 h-8 bg-[#d81e43] rounded-lg flex items-center justify-center">
                                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                            </svg>
                                        </div>
                                        {/* {project.hasNotification && (
                                            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#d81e43] rounded-full border-2 border-white"></div>
                                        )} */}
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900">
                                            {project.property_name} ({project.unit_id})
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    )}

                    {/* Reno Progress Stages */}
                    <div className="bg-white rounded-2xl shadow-sm p-4 border-[#d81e43] border">
                        <div className="flex items-center space-x-2 mb-4">
                            <Calendar className="w-5 h-5 text-gray-600" />
                            <h2 className="text-base font-semibold text-gray-900">Reno Progress Stages</h2>
                        </div>

                        {/* Progress Bar */}
                        <div className="relative mb-6">
                            <div className="flex items-start justify-between relative">
                                {/* Progress Line - positioned between circles */}
                                <div className="absolute top-5 left-[8.33%] right-[8.33%] h-1 flex z-0">
                                    <div className={`flex-1 ${getProgressBarColor(0, activeStageIndex)}`}></div>
                                    <div className={`flex-1 ${getProgressBarColor(1, activeStageIndex)}`}></div>
                                </div>

                                {progressStages.map((stage, index) => (
                                    <div key={stage.id} className="flex-1 flex flex-col items-center relative z-10">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${getStatusBgColor(stage.status)
                                                }`}
                                        >
                                            {stage.id}
                                        </div>
                                        <div className="mt-3 text-center">
                                            <div className="text-sm font-medium text-gray-900 mb-1">{stage.name}</div>
                                            <div className={`text-xs font-medium ${getStatusColor(stage.status)} mb-1`}>
                                                {stage.statusText}
                                            </div>
                                            <div className="text-xs text-gray-400">{stage.date}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Owner Handover Agreement Notification */}
                    {project?.hasAgreement && (
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                            <div className="flex items-start space-x-3">
                                <FileCheck className="w-6 h-6 text-[#d81e43] flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <div className="font-semibold text-[#d81e43] mb-1">Owner Handover Agreement</div>
                                    <div className="text-sm text-[#d81e43] mb-3">
                                        Agreement has been released and is pending your submission
                                    </div>
                                    <button className="bg-[#d81e43] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#c01a38] transition-colors">
                                        View Agreement
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Filter Chips */}
                    {filterChips.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2 sticky top-40 z-40 bg-white shadow-sm rounded-sm">
                            {filterChips.map((chip) => (
                                <button
                                    key={chip}
                                    onClick={() => setActiveFilter(chip)}
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
                    )}

                    {/* Content Section - Room & Furnitures */}
                    {activeTab === 'room' && (
                        <div className="bg-white rounded-2xl shadow-sm p-4 border-[#d81e43] border">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Room & Furnitures</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full border-separate border-spacing-0">
                                    <thead>
                                        <tr>
                                            <th className="text-left py-2 text-sm font-medium text-gray-700 border-b-2 border-gray-600">Item Name</th>
                                            <th className="text-center py-2 text-sm font-medium text-gray-700 border-b-2 border-gray-600">{activeFilter.toUpperCase()}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredItems.length > 0 ? (
                                            filteredItems.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="py-3 text-sm text-gray-900 border-b border-gray-300">{item.name}</td>
                                                    <td className="py-3 text-sm text-gray-500 text-center border-b border-gray-300">{item[activeFilter] || 'Not Applicable'}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2" className="py-8 text-center text-sm text-gray-500">
                                                    No items available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Content Section - Bath & Furnitures */}
                    {activeTab === 'bath' && (
                        <div className="bg-white rounded-2xl shadow-sm p-4 border-[#d81e43] border">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Bathroom Section</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full border-separate border-spacing-0">
                                    <thead>
                                        <tr>
                                            <th className="text-left py-2 text-sm font-medium text-gray-700 border-b-2 border-gray-600">Item Name</th>
                                            <th className="text-center py-2 text-sm font-medium text-gray-700 border-b-2 border-gray-600">{activeFilter.toUpperCase()}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredItems.length > 0 ? (
                                            filteredItems.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="py-3 text-sm text-gray-900 border-b border-gray-300">{item.name}</td>
                                                    <td className="py-3 text-sm text-gray-500 text-center border-b border-gray-300">{item[activeFilter] || 'Not Applicable'}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2" className="py-8 text-center text-sm text-gray-500">
                                                    No items available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Content Section - Dining, Yard, Foyer */}
                    {activeTab === 'dining' && (
                        <div className="bg-white rounded-2xl shadow-sm p-4 border-[#d81e43] border">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Dining, Yard, Foyer</h2>
                            <div className="space-y-3">
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item, index) => (
                                        <div key={index} className="rounded-lg p-4 border-b border-gray-200 last:border-b-0">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="font-semibold text-gray-900 mb-1">{item.name}</div>
                                                    <div className="text-xs text-gray-500">
                                                        Updated: {item.updated_date} by {item.updated_by}
                                                    </div>
                                                </div>
                                                <button className="flex items-center gap-2 px-2 py-1 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200 transition-colors">
                                                    <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <HelpCircle className="w-3 h-3 text-gray-600" />
                                                    </div>
                                                    <span className="text-xs text-gray-700">{item.status}</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-8 text-center text-sm text-gray-500">
                                        No items available
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Content Section - Kitchen */}
                    {activeTab === 'kitchen' && (
                        <div className="bg-white rounded-2xl shadow-sm p-4 border-[#d81e43] border">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Kitchen</h2>
                            <div className="space-y-3">
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item, index) => (
                                        <div key={index} className="rounded-lg p-4 border-b border-gray-200 last:border-b-0">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="font-semibold text-gray-900 mb-1">{item.name}</div>
                                                    <div className="text-xs text-gray-500">
                                                        Updated: {item.updated_date} by {item.updated_by}
                                                    </div>
                                                </div>
                                                <button className="flex items-center gap-2 px-2 py-1 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200 transition-colors">
                                                    <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <HelpCircle className="w-3 h-3 text-gray-600" />
                                                    </div>
                                                    <span className="text-xs text-gray-700">{item.status}</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-8 text-center text-sm text-gray-500">
                                        No items available
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Content Section - Electrical Appliances */}
                    {activeTab === 'electrical' && (
                        <div className="bg-white rounded-2xl shadow-sm p-4 border-[#d81e43] border">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Electrical Appliances</h2>
                            <div className="space-y-3">
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item, index) => (
                                        <div key={index} className="rounded-lg p-4 border-b border-gray-200 last:border-b-0">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="font-semibold text-gray-900 mb-1">{item.name}</div>
                                                    <div className="text-xs text-gray-500">
                                                        Updated: {item.updated_date} by {item.updated_by}
                                                    </div>
                                                </div>
                                                <button className="flex items-center gap-2 px-2 py-1 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200 transition-colors">
                                                    <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <HelpCircle className="w-3 h-3 text-gray-600" />
                                                    </div>
                                                    <span className="text-xs text-gray-700">{item.status}</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-8 text-center text-sm text-gray-500">
                                        No items available
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Content Section - Living */}
                    {activeTab === 'living' && (
                        <div className="bg-white rounded-2xl shadow-sm p-4 border-[#d81e43] border">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Living</h2>
                            <div className="space-y-3">
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item, index) => (
                                        <div key={index} className="rounded-lg p-4 border-b border-gray-200 last:border-b-0">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="font-semibold text-gray-900 mb-1">{item.name}</div>
                                                    <div className="text-xs text-gray-500">
                                                        Updated: {item.updated_date} by {item.updated_by}
                                                    </div>
                                                </div>
                                                <button className="flex items-center gap-2 px-2 py-1 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200 transition-colors">
                                                    <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <HelpCircle className="w-3 h-3 text-gray-600" />
                                                    </div>
                                                    <span className="text-xs text-gray-700">{item.status}</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-8 text-center text-sm text-gray-500">
                                        No items available
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Content for other tabs */}
                    {activeTab !== 'room' && activeTab !== 'bath' && activeTab !== 'dining' && activeTab !== 'kitchen' && activeTab !== 'electrical' && activeTab !== 'living' && (
                        <div className="bg-white rounded-2xl shadow-sm p-4">
                            <h2 className="text-base font-semibold text-gray-900 mb-4">
                                {tabs.find(t => t.id === activeTab)?.label} Content
                            </h2>
                            <p className="text-sm text-gray-500">Content for {tabs.find(t => t.id === activeTab)?.label} tab</p>
                        </div>
                    )}
                </div>
            </div>

            <BottomNavigation active="reno-progress" />
        </>
    );
}


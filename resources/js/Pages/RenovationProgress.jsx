import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import BottomNavigation from '@/Components/BottomNavigation';
import SkeletonLoader from '@/Components/SkeletonLoader';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function RenovationProgress({ projects = [] }) {
    const [isNavigating, setIsNavigating] = useState(false);

    const handleProjectClick = (e, projectId) => {
        e.preventDefault();
        setIsNavigating(true);
        
        // Navigate after a brief moment to show skeleton
        setTimeout(() => {
            router.visit(`/renovation-progress/${projectId}`);
        }, 50);
    };

    if (isNavigating) {
        return <SkeletonLoader />;
    }
    return (
        <>
            <Head title="Renovation Progress" />

            <div className="min-h-screen bg-gray-100 pb-32">
                {/* Header */}
                <div className="bg-white px-4 py-6">
                    {/* Logo */}
                    <div className="flex items-center mb-6">
                        <div className="flex items-center">
                            <ApplicationLogo className="h-8 w-auto mr-2" />
                        </div>
                    </div>

                    {/* Page Title */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Renovation Progress</h1>
                    <p className="text-gray-500 text-sm">Track the status of your renovation projects</p>
                </div>

                {/* Projects List */}
                <div className="px-4 py-6 space-y-4 pb-24">
                    {projects.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                            <p className="text-gray-500 text-sm">No renovation projects found.</p>
                        </div>
                    ) : (
                        projects.map((project) => (
                            <div
                                key={project.id}
                                onClick={(e) => handleProjectClick(e, project.id)}
                                className="block cursor-pointer"
                            >
                                <div className="unreleased-blink rounded-3xl p-4 transition-transform hover:scale-105">
                                    <div className="flex items-center space-x-4">
                                        {/* Building Icon with Notification */}
                                        <div className="relative flex-shrink-0">
                                            <div className="w-14 h-14 bg-[#d81e43] rounded-lg flex items-center justify-center">
                                                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                                </svg>
                                            </div>
                                            {project.hasNotification && (
                                                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#d81e43] rounded-full border-2 border-white"></div>
                                            )}
                                        </div>

                                        {/* Project Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="text-lg font-bold text-gray-900 mb-1">
                                                {project.unit_id || project.id}
                                            </div>
                                            <div className="text-sm text-gray-600 mb-2">
                                                {project.location || project.property_name}
                                            </div>
                                            <div className="text-sm font-medium text-[#d81e43]">
                                                {project.status}
                                            </div>
                                        </div>

                                        {/* Status Badge */}
                                        <div className="flex-shrink-0">
                                            <div className="bg-blue-100 rounded-full px-3 py-1.5 flex items-center space-x-1.5">
                                                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-xs font-medium text-gray-700">On Track</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Bottom Navigation */}
            <BottomNavigation active="reno-progress" />
        </>
    );
}


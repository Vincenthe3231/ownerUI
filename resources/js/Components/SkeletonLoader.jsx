import BottomNavigation from '@/Components/BottomNavigation';

export default function SkeletonLoader() {
    return (
        <>
            <div className="min-h-screen bg-gray-50 pb-20">
                <div className="px-4 py-4 space-y-4 my-12">
                    {/* Skeleton AppBar */}
                    <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>

                    {/* Skeleton Navigation Tabs */}
                    <div className="bg-white rounded-2xl shadow-sm">
                        <div className="flex border-b border-gray-200">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="flex-1 h-12 bg-gray-200 animate-pulse"></div>
                            ))}
                        </div>
                    </div>

                    {/* Skeleton Project Card */}
                    <div className="bg-white rounded-3xl p-4 shadow-sm">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                            </div>
                            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>

                    {/* Skeleton Progress Stages */}
                    <div className="bg-white rounded-2xl shadow-sm p-4">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-5 bg-gray-200 rounded w-40 animate-pulse"></div>
                        </div>
                        <div className="flex items-start justify-between relative">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex-1 flex flex-col items-center">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse mb-3"></div>
                                    <div className="h-4 bg-gray-200 rounded w-20 mb-1 animate-pulse"></div>
                                    <div className="h-3 bg-gray-200 rounded w-16 mb-1 animate-pulse"></div>
                                    <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skeleton Agreement Banner */}
                    <div className="bg-gray-200 rounded-2xl p-4 animate-pulse">
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-5 bg-gray-300 rounded w-48 animate-pulse"></div>
                                <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                                <div className="h-9 bg-gray-300 rounded w-32 animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Skeleton Room & Furnitures */}
                    <div className="bg-white rounded-2xl shadow-sm p-4">
                        <div className="h-6 bg-gray-200 rounded w-40 mb-4 animate-pulse"></div>
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                                <div key={i} className="flex items-center space-x-4">
                                    <div className="h-4 bg-gray-200 rounded flex-1 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <BottomNavigation active="reno-progress" />
        </>
    );
}


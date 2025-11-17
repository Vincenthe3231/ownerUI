import { Link } from '@inertiajs/react';

export default function BottomNavigation({ active = 'quotations' }) {
    const resolveRoute = (name, fallback) =>
        typeof route === 'function' ? route(name) : fallback;

    const homeHref = resolveRoute('home', '/home');
    const quotationsHref = resolveRoute('quotations.index', '/quotations');
    const profileHref = resolveRoute('profile.edit', '/profile');

    const navItems = [
        { id: 'home', label: 'Home', href: homeHref, icon: 'home' },
        { id: 'chat', label: 'Chat', href: '#', icon: 'chat' },
        { id: 'quotations', label: 'Quotations', href: quotationsHref, icon: 'document' },
        { id: 'reno-progress', label: 'Reno Progress', href: '#', icon: 'settings', badge: true },
        { id: 'profile', label: 'Profile', href: profileHref, icon: 'user' },
    ];

    // Determine which item is active to create the curved top edge
    const getActiveIndex = () => {
        return navItems.findIndex(item => item.id === active);
    };

    const activeIndex = getActiveIndex();

    const renderIcon = (iconType, isActive) => {
        const strokeColor = isActive ? '#d81e43' : 'currentColor';
        const strokeWidth = isActive ? 2.5 : 2;
        const iconClass = isActive ? 'h-7 w-7' : 'h-6 w-6';

        const icons = {
            home: (
                <svg className={iconClass} fill="none" stroke={strokeColor} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
            chat: (
                <svg className={iconClass} fill="none" stroke={strokeColor} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
            document: (
                <svg className={iconClass} fill="none" stroke={strokeColor} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            settings: (
                <svg className={iconClass} fill="none" stroke={strokeColor} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            user: (
                <svg className={iconClass} fill="none" stroke={strokeColor} viewBox="0 0 24 24" strokeWidth={strokeWidth}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
        };

        return icons[iconType];
    };

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-50"
        >
            <div className="relative bg-gradient-to-t from-white via-white to-gray-50/50 backdrop-blur-lg"
                style={{
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)',
                }}
            >
                {/* Curved top edge SVG overlay */}
                <svg
                    className="absolute top-0 left-0 w-full h-12 pointer-events-none"
                    style={{ height: '48px' }}
                    viewBox="0 0 100 48"
                    preserveAspectRatio="none"
                >
                    <path
                        d={`M 0,48 Q ${activeIndex * 20 + 10},${activeIndex === -1 ? 48 : 20} ${activeIndex * 20 + 10},48 L 100,48 L 100,0 L 0,0 Z`}
                        fill="white"
                    />
                </svg>

                <div className="relative grid grid-cols-5 items-center px-2 pt-2">
                    {/* Home */}
                    <Link
                        href={homeHref}
                        className={`flex flex-col items-center justify-center gap-1 py-2 text-sm transition-all duration-300 ${
                            active === 'home'
                                ? 'relative -mt-8'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                        aria-current={active === 'home' ? 'page' : undefined}
                    >
                        {active === 'home' ? (
                            <>
                                {/* Floating bubble background */}
                                <div
                                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center"
                                    style={{
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                    }}
                                >
                                    <svg
                                        className="h-7 w-7"
                                        fill="none"
                                        stroke="#d81e43"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                </div>
                                <span className="mt-8 text-[#d81e43] font-semibold text-xs">
                                    Home
                                </span>
                            </>
                        ) : (
                            <>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                                <span>Home</span>
                            </>
                        )}
                    </Link>

                    {/* Chat */}
                    <Link
                        href="#"
                        className={`flex flex-col items-center justify-center gap-1 py-2 text-sm transition-all duration-300 ${
                            active === 'chat'
                                ? 'relative -mt-8'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                        aria-current={active === 'chat' ? 'page' : undefined}
                    >
                        {active === 'chat' ? (
                            <>
                                <div
                                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center"
                                    style={{
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                    }}
                                >
                                    <svg
                                        className="h-7 w-7"
                                        fill="none"
                                        stroke="#d81e43"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                </div>
                                <span className="mt-8 text-[#d81e43] font-semibold text-xs">
                                    Chat
                                </span>
                            </>
                        ) : (
                            <>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                                <span>Chat</span>
                            </>
                        )}
                    </Link>

                    {/* Quotations */}
                    <Link
                        href={quotationsHref}
                        className={`flex flex-col items-center justify-center gap-1 py-2 text-sm transition-all duration-300 ${
                            active === 'quotations'
                                ? 'relative -mt-8'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                        aria-current={active === 'quotations' ? 'page' : undefined}
                    >
                        {active === 'quotations' ? (
                            <>
                                <div
                                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center"
                                    style={{
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                    }}
                                >
                                    <svg
                                        className="h-7 w-7"
                                        fill="none"
                                        stroke="#d81e43"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <span className="mt-8 text-[#d81e43] font-semibold text-xs">
                                    Quotations
                                </span>
                            </>
                        ) : (
                            <>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                <span>Quotations</span>
                            </>
                        )}
                    </Link>

                    {/* Reno Progress */}
                    <Link
                        href="#"
                        className={`relative flex flex-col items-center justify-center gap-1 py-2 text-sm transition-all duration-300 ${
                            active === 'reno-progress'
                                ? '-mt-8'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                        aria-current={active === 'reno-progress' ? 'page' : undefined}
                    >
                        {active === 'reno-progress' ? (
                            <>
                                <div
                                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center"
                                    style={{
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                    }}
                                >
                                    <svg
                                        className="h-7 w-7"
                                        fill="none"
                                        stroke="#d81e43"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <span className="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-[#d81e43]" />
                                </div>
                                <span className="mt-8 text-[#d81e43] font-semibold text-[0.6rem]">
                                    Progress
                                </span>
                            </>
                        ) : (
                            <>
                                <div className="relative">
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <span className="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-[#d81e43]" />
                                </div>
                                <span className="text-center">Progress</span>
                            </>
                        )}
                    </Link>

                    {/* Profile */}
                    <Link
                        href={profileHref}
                        className={`flex flex-col items-center justify-center gap-1 py-2 text-sm transition-all duration-300 ${
                            active === 'profile'
                                ? 'relative -mt-8'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                        aria-current={active === 'profile' ? 'page' : undefined}
                    >
                        {active === 'profile' ? (
                            <>
                                <div
                                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center"
                                    style={{
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                    }}
                                >
                                    <svg
                                        className="h-7 w-7"
                                        fill="none"
                                        stroke="#d81e43"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                <span className="mt-8 text-[#d81e43] font-semibold text-xs">
                                    Profile
                                </span>
                            </>
                        ) : (
                            <>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                <span>Profile</span>
                            </>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );
}

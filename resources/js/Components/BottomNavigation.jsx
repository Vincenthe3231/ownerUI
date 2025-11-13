import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function BottomNavigation({ active = 'quotations' }) {
    const [isHidden, setIsHidden] = useState(false);
    const [pressedItem, setPressedItem] = useState(null);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    const resolveRoute = (name, fallback) =>
        typeof route === 'function' ? route(name) : fallback;

    const homeHref = resolveRoute('home', '/home');
    const quotationsHref = resolveRoute('quotations.index', '/quotations');
    const profileHref = resolveRoute('profile.edit', '/profile');

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    const scrollingDown = currentScrollY > lastScrollY.current + 12;
                    const scrollingUp = currentScrollY < lastScrollY.current - 12;

                    if (scrollingDown && currentScrollY > 48) {
                        setIsHidden(true);
                    } else if (scrollingUp || currentScrollY <= 48) {
                        setIsHidden(false);
                    }

                    lastScrollY.current = currentScrollY;
                    ticking.current = false;
                });

                ticking.current = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navItems = [
        { id: 'home', label: 'Home', href: homeHref, icon: 'home' },
        { id: 'chat', label: 'Chat', href: '#', icon: 'chat' },
        { id: 'quotations', label: 'Quotations', href: quotationsHref, icon: 'document' },
        { id: 'reno-progress', label: 'Progress', href: '#', icon: 'settings', badge: true },
        { id: 'profile', label: 'Profile', href: profileHref, icon: 'user' },
    ];

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
            className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
                isHidden ? 'translate-y-full' : 'translate-y-0'
            }`}
        >
            <div className="relative bg-gradient-to-t from-white via-white to-gray-50/50 backdrop-blur-lg"
                style={{
                    paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
                    boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.08), 0 -1px 2px rgba(0, 0, 0, 0.04)',
                    borderTopLeftRadius: '24px',
                    borderTopRightRadius: '24px',
                }}
            >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                <div className="relative flex items-end justify-around px-4 pt-3 pb-2"
                    style={{ minHeight: '72px' }}
                >
                    {navItems.map((item, index) => {
                        const isActive = item.id === active;
                        const isPressed = pressedItem === item.id;

                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                onMouseDown={() => setPressedItem(item.id)}
                                onMouseUp={() => setPressedItem(null)}
                                onMouseLeave={() => setPressedItem(null)}
                                onTouchStart={() => setPressedItem(item.id)}
                                onTouchEnd={() => setPressedItem(null)}
                                className={`relative flex flex-col items-center transition-all duration-300 ease-out ${
                                    isActive ? '' : 'text-gray-500'
                                }`}
                                style={{
                                    minWidth: '64px',
                                    transform: isPressed && !isActive ? 'scale(0.92)' : 'scale(1)',
                                }}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {isActive ? (
                                    <>
                                        <div
                                            className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center transition-all duration-400 ease-out"
                                            style={{
                                                width: '68px',
                                                height: '68px',
                                                top: '-52px',
                                                background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
                                                borderRadius: '50%',
                                                boxShadow: '0 8px 24px rgba(216, 30, 67, 0.15), 0 4px 8px rgba(216, 30, 67, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
                                                border: '2px solid rgba(216, 30, 67, 0.1)',
                                            }}
                                        >
                                            <div className="relative">
                                                {renderIcon(item.icon, true)}
                                                {item.badge && (
                                                    <span
                                                        className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full animate-pulse"
                                                        style={{
                                                            background: 'linear-gradient(135deg, #d81e43 0%, #ff4d6d 100%)',
                                                            boxShadow: '0 0 0 2px white, 0 2px 4px rgba(216, 30, 67, 0.4)',
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <span
                                            className="font-semibold transition-all duration-300"
                                            style={{
                                                marginTop: '24px',
                                                fontSize: '11px',
                                                color: '#d81e43',
                                                letterSpacing: '0.02em',
                                            }}
                                        >
                                            {item.label}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className="relative rounded-2xl transition-all duration-200"
                                            style={{
                                                padding: '8px',
                                                backgroundColor: isPressed ? 'rgba(216, 30, 67, 0.08)' : 'transparent',
                                            }}
                                        >
                                            {renderIcon(item.icon, false)}
                                            {item.badge && (
                                                <span
                                                    className="absolute -top-0.5 -right-0.5 block h-2 w-2 rounded-full animate-pulse"
                                                    style={{
                                                        backgroundColor: '#d81e43',
                                                        boxShadow: '0 0 0 1.5px white, 0 1px 2px rgba(216, 30, 67, 0.3)',
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <span
                                            className="transition-all duration-200 mt-1"
                                            style={{
                                                fontSize: '11px',
                                                color: isPressed ? '#6b7280' : '#9ca3af',
                                                fontWeight: isPressed ? 600 : 500,
                                            }}
                                        >
                                            {item.label}
                                        </span>
                                    </>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

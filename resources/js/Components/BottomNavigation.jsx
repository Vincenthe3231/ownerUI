import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function BottomNavigation({ active = 'quotations' }) {
    const [isHidden, setIsHidden] = useState(false);
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

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-lg transition-transform duration-300 ease-out ${
                isHidden ? 'translate-y-full' : 'translate-y-0'
            }`}
        >
            <div className="flex items-center justify-around px-2 py-3">
                <Link
                    href={homeHref}
                    className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-sm ${
                        active === 'home'
                            ? 'bg-red-50 text-red-600'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                    aria-current={active === 'home' ? 'page' : undefined}
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                    </svg>
                    <span className={active === 'home' ? 'font-medium' : ''}>Home</span>
                </Link>

                <Link
                    href="#"
                    className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-sm ${
                        active === 'chat'
                            ? 'bg-red-50 text-red-600'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                    aria-current={active === 'chat' ? 'page' : undefined}
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                    <span className={active === 'chat' ? 'font-medium' : ''}>Chat</span>
                </Link>

                <Link
                    href={quotationsHref}
                    className={`flex flex-col items-center gap-1 rounded-xl px-4 py-2 text-sm ${
                        active === 'quotations'
                            ? 'bg-red-50 text-red-600'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                    aria-current={active === 'quotations' ? 'page' : undefined}
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    <span className={active === 'quotations' ? 'font-medium' : ''}>
                        Quotations
                    </span>
                </Link>

                <Link
                    href="#"
                    className={`relative flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-sm ${
                        active === 'reno-progress'
                            ? 'bg-red-50 text-red-600'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                    aria-current={active === 'reno-progress' ? 'page' : undefined}
                >
                    <div className="relative">
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
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
                        <span className="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-red-600" />
                    </div>
                    <span className={active === 'reno-progress' ? 'font-medium' : ''}>
                        Reno Progress
                    </span>
                </Link>

                <Link
                    href={profileHref}
                    className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-sm ${
                        active === 'profile'
                            ? 'bg-red-50 text-red-600'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                    aria-current={active === 'profile' ? 'page' : undefined}
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                    <span className={active === 'profile' ? 'font-medium' : ''}>
                        Profile
                    </span>
                </Link>
            </div>
        </div>
    );
}

import { Link } from '@inertiajs/react';
import { useAppBarHeight } from './AppBar/useAppBarHeight';
import { appBarStyles } from './AppBar/styles';

export default function AppBar({
    title,
    backHref = '/quotations',
    backLabel = 'Go back',
    trackHeight = true, // Make height tracking optional
}) {
    const appBarRef = useAppBarHeight(trackHeight);

    return (
        <div className="bg-[#d81e43] rounded-lg shadow-sm">
            <div
                ref={appBarRef}
                className="fixed top-0 left-0 w-full bg-[#d81e43] text-white shadow-lg z-50"
                style={appBarStyles.container}
            >
                <div className="flex items-center h-full">
                    <Link
                        href={backHref}
                        className="text-white hover:text-gray-900 flex-shrink-0"
                        style={appBarStyles.backButton}
                        aria-label={backLabel}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            style={appBarStyles.icon}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </Link>
                    <h1
                        className="text-xl font-semibold text-white truncate"
                        style={appBarStyles.title}
                    >
                        {title}
                    </h1>
                </div>
            </div>
        </div>
    );
}

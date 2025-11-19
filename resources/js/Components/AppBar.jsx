import { Link } from '@inertiajs/react';

export default function AppBar({ 
    title, 
    backHref = '/quotations',
    backLabel = 'Go back'
}) {
    return (
        <div className="bg-[#d81e43] rounded-lg shadow-sm">
            <div className="fixed top-0 left-0 w-full bg-[#d81e43] text-white shadow-lg z-50 pt-4 pb-6 px-4">
                <div className="flex items-center">
                    <Link
                        href={backHref}
                        className="mr-3 text-white hover:text-gray-900"
                        aria-label={backLabel}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </Link>
                    <h1 className="text-xl font-semibold text-white">
                        {title}
                    </h1>
                </div>
            </div>
        </div>
    );
}


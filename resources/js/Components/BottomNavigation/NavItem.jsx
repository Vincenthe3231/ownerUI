import { Link } from '@inertiajs/react';
import { NavIcon } from './navIcons';

export default function NavItem({ item, isActive }) {
    const baseClasses = 'flex flex-col items-center justify-center gap-0.5 sm:gap-1 py-1 sm:py-2 text-[0.65rem] sm:text-sm transition-all duration-300';
    const activeClasses = 'relative -mt-6 sm:-mt-8';
    const inactiveClasses = 'text-gray-500 hover:text-gray-700';
    
    return (
        <Link
            href={item.href}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
            style={{ overflow: 'visible' }}
            aria-current={isActive ? 'page' : undefined}
        >
            {isActive ? (
                <>
                    <div
                        className="absolute -top-5 sm:-top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white shadow-lg flex items-center justify-center"
                        style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
                    >
                        <NavIcon iconType={item.icon} isActive={true} className="h-5 w-5 sm:h-7 sm:w-7" />
                        {item.badge && (
                            <span className="absolute -top-1 -right-1 block h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#d81e43]" />
                        )}
                    </div>
                    <span className={`mt-6 sm:mt-8 text-[#d81e43] font-semibold text-[0.6rem] sm:text-xs ${item.id === 'reno-progress' ? 'text-center' : ''}`}>
                        {item.label}
                    </span>
                </>
            ) : (
                <>
                    <div className={item.badge ? 'relative' : ''}>
                        <NavIcon iconType={item.icon} isActive={false} className="h-5 w-5 sm:h-6 sm:w-6" />
                        {item.badge && (
                            <span className="absolute -top-1 -right-1 block h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#d81e43]" />
                        )}
                    </div>
                    <span className={`text-[0.65rem] sm:text-sm ${item.id === 'reno-progress' ? 'text-center' : ''}`}>{item.label}</span>
                </>
            )}
        </Link>
    );
}


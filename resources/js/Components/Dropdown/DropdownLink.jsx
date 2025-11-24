import { Link } from '@inertiajs/react';

/**
 * Dropdown Link component
 * A styled link for use within dropdown menus
 */
export default function DropdownLink({ className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ' +
                className
            }
        >
            {children}
        </Link>
    );
}


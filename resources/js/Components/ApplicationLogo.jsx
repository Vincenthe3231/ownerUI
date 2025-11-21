import { Link } from '@inertiajs/react';

export default function ApplicationLogo({ className = '', ...props }) {
    return (
        <Link href="/home">
            <img
                src="https://renoxpert.my/wp-content/uploads/2025/08/cropped-Logo_fit.png"
                alt="RenoXpert Logo"
                className={className || 'h-8 w-auto'}
                {...props}
            />
        </Link>
    );
}

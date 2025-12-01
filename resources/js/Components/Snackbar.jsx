import { useEffect, useState } from 'react';

export default function Snackbar({ message, show, onClose }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            setIsAnimating(true);
            
            // Auto-dismiss after 0.5s
            const timer = setTimeout(() => {
                setIsAnimating(false);
                setTimeout(() => {
                    setIsVisible(false);
                    if (onClose) onClose();
                }, 300); // Wait for exit animation
            }, 500);
            
            return () => clearTimeout(timer);
        } else {
            setIsAnimating(false);
            setTimeout(() => {
                setIsVisible(false);
            }, 300);
        }
    }, [show, onClose]);

    if (!isVisible) return null;

    return (
        <div
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none"
            style={{
                transition: 'opacity 0.3s ease-in-out',
            }}
        >
            <div
                className="px-4 py-3 rounded-2xl shadow-lg pointer-events-auto bg-white"
                style={{
                    transform: isAnimating ? 'translateY(0)' : 'translateY(-100%)',
                    opacity: isAnimating ? 1 : 0,
                    transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
                }}
            >
                <span className="text-sm font-semibold text-gray-900">
                    {message}
                </span>
            </div>
        </div>
    );
}


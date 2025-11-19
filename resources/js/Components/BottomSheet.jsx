import { useEffect, useRef, useState } from 'react';
import {
    Dialog,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { X } from 'lucide-react';

export default function BottomSheet({
    show = false,
    onClose = () => {},
    title = '',
    children,
    lockScroll = true,
}) {
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const sheetRef = useRef(null);
    const dragThreshold = 50; // Minimum drag distance to trigger close

    // Lock/unlock body scroll
    useEffect(() => {
        if (show && lockScroll) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [show, lockScroll]);

    // Handle touch start for swipe down (only from header/drag handle)
    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartY(e.touches[0].clientY);
        setCurrentY(e.touches[0].clientY);
    };

    // Handle touch move
    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const newY = e.touches[0].clientY;
        setCurrentY(newY);
        
        // Only allow downward drag
        if (newY > startY) {
            e.preventDefault();
        }
    };

    // Handle touch end
    const handleTouchEnd = () => {
        if (!isDragging) return;
        
        const dragDistance = currentY - startY;
        
        if (dragDistance > dragThreshold) {
            onClose();
        }
        
        setIsDragging(false);
        setStartY(0);
        setCurrentY(0);
    };

    // Calculate transform based on drag
    const dragTransform = isDragging && currentY > startY 
        ? `translateY(${Math.max(0, currentY - startY)}px)` 
        : 'translateY(0)';

    return (
        <Transition show={show} leave="duration-300">
            <Dialog
                as="div"
                className="fixed inset-0 z-50"
                onClose={onClose}
            >
                {/* Backdrop */}
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div 
                        className="fixed inset-0 bg-black/50"
                        onClick={onClose}
                    />
                </TransitionChild>

                {/* Bottom Sheet */}
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="translate-y-full"
                    enterTo="translate-y-0"
                    leave="ease-in duration-300"
                    leaveFrom="translate-y-0"
                    leaveTo="translate-y-full"
                >
                    <Dialog.Panel
                        ref={sheetRef}
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-[90vh] flex flex-col"
                        style={{ transform: dragTransform }}
                    >
                        {/* Drag Handle */}
                        <div 
                            data-drag-handle
                            className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing touch-none select-none"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                        </div>

                        {/* Header */}
                        <div 
                            data-drag-header
                            className="flex items-center justify-between px-4 py-3 border-b border-gray-200 touch-none select-none"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClose();
                                }}
                                onTouchStart={(e) => e.stopPropagation()}
                                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            {children}
                        </div>
                    </Dialog.Panel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
}


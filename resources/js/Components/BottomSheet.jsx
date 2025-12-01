import {
    Dialog,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useBodyScrollLock } from './BottomSheet/useBodyScrollLock';
import { useSwipeDown } from './BottomSheet/useSwipeDown';
import { BOTTOM_SHEET_CONFIG } from './BottomSheet/constants';

export default function BottomSheet({
    show = false,
    onClose = () => {},
    title = '',
    children,
    lockScroll = true,
    contentKey = null, // Key to track content changes for animation
}) {
    // Lock body scroll when sheet is open
    useBodyScrollLock(show && lockScroll);

    // Handle swipe down gesture
    const { handleTouchStart, handleTouchMove, handleTouchEnd, dragTransform } = useSwipeDown(
        onClose,
        BOTTOM_SHEET_CONFIG.DRAG_THRESHOLD
    );

    // Content transition animation
    const [contentSlideOffset, setContentSlideOffset] = useState(0);
    const [isContentTransitioning, setIsContentTransitioning] = useState(false);
    const prevContentKeyRef = useRef(contentKey);
    const prevShowRef = useRef(show);

    useEffect(() => {
        // Animate when content changes while sheet is open
        if (show && contentKey !== null && prevContentKeyRef.current !== null && prevContentKeyRef.current !== contentKey) {
            setIsContentTransitioning(true);
            setContentSlideOffset(100); // New content starts from right
            
            requestAnimationFrame(() => {
                setContentSlideOffset(0); // Slide to center
            });
            
            setTimeout(() => {
                setIsContentTransitioning(false);
            }, 300);
        }
        
        // Reset animation state when sheet closes
        if (!show && prevShowRef.current) {
            setContentSlideOffset(0);
            setIsContentTransitioning(false);
        }
        
        prevContentKeyRef.current = contentKey;
        prevShowRef.current = show;
    }, [contentKey, show]);

    return (
        <Transition show={show}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-hidden"
                onClose={onClose}
            >
                {/* Backdrop */}
                <TransitionChild
                    enter="transition-opacity ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-in duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div 
                        className={`fixed inset-0 ${BOTTOM_SHEET_CONFIG.BACKDROP_OPACITY} transition-opacity`}
                        onClick={onClose}
                    />
                </TransitionChild>

                {/* Bottom Sheet */}
                <TransitionChild
                    enter="transition-transform ease-out duration-300"
                    enterFrom="translate-y-full"
                    enterTo="translate-y-0"
                    leave="transition-transform ease-in duration-250"
                    leaveFrom="translate-y-0"
                    leaveTo="translate-y-full"
                >
                    <Dialog.Panel
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl flex flex-col"
                        style={{ 
                            ...(dragTransform ? { 
                                transform: dragTransform,
                                transition: 'none'
                            } : {}),
                            maxHeight: BOTTOM_SHEET_CONFIG.MAX_HEIGHT,
                        }}
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
                        <div className="flex-1 overflow-y-auto relative">
                            <div
                                key={contentKey || 'default'}
                                style={{
                                    ...(isContentTransitioning ? {
                                        transform: `translate3d(${contentSlideOffset}%, 0, 0)`,
                                        transition: 'transform 0.3s ease-in-out',
                                        opacity: contentSlideOffset !== 0 ? 0.7 : 1,
                                        willChange: 'transform',
                                    } : {
                                        transform: 'translate3d(0, 0, 0)',
                                        transition: 'none',
                                        opacity: 1,
                                        willChange: 'auto',
                                    }),
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    </Dialog.Panel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
}


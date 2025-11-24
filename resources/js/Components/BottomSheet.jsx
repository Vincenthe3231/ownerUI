import {
    Dialog,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { X } from 'lucide-react';
import { useBodyScrollLock } from './BottomSheet/useBodyScrollLock';
import { useSwipeDown } from './BottomSheet/useSwipeDown';
import { BOTTOM_SHEET_CONFIG } from './BottomSheet/constants';

export default function BottomSheet({
    show = false,
    onClose = () => {},
    title = '',
    children,
    lockScroll = true,
}) {
    // Lock body scroll when sheet is open
    useBodyScrollLock(show && lockScroll);

    // Handle swipe down gesture
    const { handleTouchStart, handleTouchMove, handleTouchEnd, dragTransform } = useSwipeDown(
        onClose,
        BOTTOM_SHEET_CONFIG.DRAG_THRESHOLD
    );

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
                        className={`fixed inset-0 ${BOTTOM_SHEET_CONFIG.BACKDROP_OPACITY}`}
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
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl flex flex-col"
                        style={{ 
                            transform: dragTransform,
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
                        <div className="flex-1 overflow-y-auto">
                            {children}
                        </div>
                    </Dialog.Panel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
}


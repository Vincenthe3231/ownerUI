import { X, Hand, ArrowLeft, ArrowRight, Layers } from 'lucide-react';

export default function CoachMark({ show, slide, onClose, onPrevious, onNext }) {
    if (!show) return null;

    const slides = [
        {
            icon: ArrowLeft,
            title: 'Swipe Left to Next Tab',
            description: 'Swipe left on the Project Info, Progress Stages, or Filter Chips area (outside the white content card) to switch to the next tab (Room → Bath → Dining → Kitchen → Electrical → Living)',
        },
        {
            icon: ArrowRight,
            title: 'Swipe Right to Previous Tab',
            description: 'Swipe right on the Project Info, Progress Stages, or Filter Chips area (outside the white content card) to switch to the previous tab (Living → Electrical → Kitchen → Dining → Bath → Room)',
        },
        {
            icon: Layers,
            title: 'Swipe to Switch Filters',
            description: 'Swipe left or right inside the white content card (where item cards are displayed) to switch between filter variations (R1, R2, R3, etc.)',
        },
        {
            icon: Hand,
            title: 'Tap to View Details',
            description: 'Tap on an item card inside the white content area to open the task detail bottom sheet where you can view comments and attachments',
        },
    ];

    const currentSlide = slides[slide];
    const Icon = currentSlide.icon;

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {slide + 1} / 4
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="text-center">
                        <div className="mb-4 flex justify-center">
                            <div className="w-20 h-20 bg-[#d81e43]/10 rounded-full flex items-center justify-center">
                                <Icon className="w-10 h-10 text-[#d81e43]" />
                            </div>
                        </div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">{currentSlide.title}</h4>
                        <p className="text-gray-600">{currentSlide.description}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 border-t border-gray-200">
                    <button
                        onClick={onPrevious}
                        className="px-4 py-2 sm:text-sm text-base text-[#d81e43] hover:text-[#c01a38]"
                    >
                        <span className="underline">{slide === 0 ? 'Skip' : 'Previous'}</span>
                    </button>
                    <div className="flex gap-2">
                        {[0, 1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`w-2 h-2 rounded-full ${slide === s ? 'bg-[#d81e43]' : 'bg-gray-300'}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={onNext}
                        className="px-4 py-2 bg-[#d81e43] text-white rounded-lg hover:bg-[#c01a38] transition-colors"
                    >
                        {slide === 3 ? 'Got it' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    );
}


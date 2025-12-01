import BottomSheet from '@/Components/BottomSheet';
import { User } from 'lucide-react';
import { getStatusBadgeStyle, normalizeStatus } from '@/Pages/RenovationProgressDetail/utils/statusHelpers';

export default function TaskDetailSheet({ selectedItem, activeFilter, onClose }) {
    return (
        <BottomSheet
            show={selectedItem !== null}
            onClose={onClose}
            title="Task Detail"
            lockScroll={false}
            contentKey={selectedItem ? `${selectedItem.name}-${selectedItem.index}-${activeFilter}` : null}
        >
            {selectedItem && (
                <div className="p-4 space-y-4">
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {activeFilter ? `${activeFilter.toUpperCase()} - ${selectedItem.name}` : selectedItem.name}
                            </h3>
                            <div 
                                className="px-3 py-1.5 text-xs font-semibold rounded-full flex-shrink-0 relative overflow-hidden animate-twinkle"
                                style={{
                                    ...getStatusBadgeStyle(normalizeStatus(selectedItem.status)),
                                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                                    position: 'relative',
                                }}
                            >
                                {/* Glossy highlight effect */}
                                <div 
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                                        borderRadius: '9999px',
                                    }}
                                />
                                <span className="relative z-10">{normalizeStatus(selectedItem.status)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <User className="w-5 h-5 text-gray-400" />
                            <h4 className="text-base font-semibold text-gray-900">To Owner</h4>
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Comment:</label>
                            <textarea
                                placeholder="No comment"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d81e43] focus:border-transparent resize-none"
                                rows="3"
                                defaultValue={selectedItem.comment || ''}
                                disabled
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Attachments:</label>
                            <div className="text-sm text-gray-500 italic">
                                No attachments available.
                            </div>
                        </div>
                    </div>

                    <div className="text-xs text-gray-500">
                        Last updated: {selectedItem.updated_date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </div>
                </div>
            )}
        </BottomSheet>
    );
}


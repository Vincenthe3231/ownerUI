import BottomSheet from '@/Components/BottomSheet';
import { HelpCircle, User } from 'lucide-react';

export default function TaskDetailSheet({ selectedItem, activeFilter, onClose }) {
    if (!selectedItem) return null;

    return (
        <BottomSheet
            show={selectedItem !== null}
            onClose={onClose}
            title="Task Detail"
            lockScroll={false}
        >
            <div className="p-4 space-y-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {activeFilter ? `${activeFilter.toUpperCase()} - ${selectedItem.name}` : selectedItem.name}
                    </h3>
                    
                    <button className="w-full px-4 py-3 bg-gray-100 rounded-lg flex items-center gap-2 text-left hover:bg-gray-200 transition-colors">
                        <HelpCircle className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">{selectedItem.status || 'Not Applicable'}</span>
                    </button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-4">
                        <User className="w-5 h-5 text-gray-400" />
                        <h4 className="text-base font-semibold text-gray-900">Details</h4>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Comment:</label>
                        <textarea
                            placeholder="No comment"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d81e43] focus:border-transparent resize-none"
                            rows="3"
                            defaultValue={selectedItem.comment || ''}
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
        </BottomSheet>
    );
}


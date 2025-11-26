import { FileCheck } from 'lucide-react';

export default function AgreementNotification() {
    return (
        <div 
            className="bg-red-50 border border-red-200 rounded-2xl p-4"
            style={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div className="flex items-start space-x-3">
                <FileCheck className="w-6 h-6 text-[#d81e43] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                    <div className="font-semibold text-[#d81e43] mb-1">Owner Handover Agreement</div>
                    <div className="text-sm text-[#d81e43] mb-3">
                        Agreement has been released and is pending your submission
                    </div>
                    <button className="bg-[#d81e43] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#c01a38] transition-colors">
                        View Agreement
                    </button>
                </div>
            </div>
        </div>
    );
}


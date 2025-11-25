import { Calendar } from 'lucide-react';
import { getStatusColor, getStatusBgColor, getProgressBarColor } from '@/Pages/RenovationProgressDetail/utils/statusHelpers';
import { DEFAULT_PROGRESS_STAGES } from '@/Pages/RenovationProgressDetail/utils/constants';

export default function ProgressStages({ progressStages = DEFAULT_PROGRESS_STAGES }) {
    const currentStageIndex = progressStages.findIndex(stage => stage.status === 'in_progress');
    const activeStageIndex = currentStageIndex >= 0 ? currentStageIndex : progressStages.length - 1;
    
    const calculateProgressLineStyle = () => {
        if (progressStages.length <= 1) return {};
        
        const stageWidth = 100 / progressStages.length;
        
        return {
            left: `${stageWidth / 2}%`,
            right: `${stageWidth / 2}%`,
            width: 'auto',
        };
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm p-4 border-[#d81e43] border">
            <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-5 h-5 text-gray-600" />
                <h2 className="text-base font-semibold text-gray-900">Reno Progress Stages</h2>
            </div>

            <div className="relative mb-6">
                <div className="flex items-start justify-between relative">
                    {progressStages.length > 1 && (
                        <div 
                            className="absolute top-5 h-1 flex z-0 progress-line"
                            style={calculateProgressLineStyle()}
                        >
                            {Array.from({ length: progressStages.length - 1 }).map((_, index) => (
                                <div 
                                    key={index}
                                    className={`flex-1 ${getProgressBarColor(index, activeStageIndex)}`}
                                ></div>
                            ))}
                        </div>
                    )}

                    {progressStages.map((stage) => {
                        const isActive = stage.status === 'in_progress';
                        return (
                            <div key={stage.id} className="flex-1 flex flex-col items-center relative z-10">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${getStatusBgColor(stage.status)} ${
                                        isActive ? 'progress-stage-blink' : ''
                                    }`}
                                >
                                    {stage.id}
                                </div>
                                <div className="mt-3 text-center">
                                    <div className="text-sm font-medium text-gray-900 mb-1">{stage.name}</div>
                                    <div className={`text-xs font-medium ${getStatusColor(stage.status)} mb-1`}>
                                        {stage.statusText}
                                    </div>
                                    <div className="text-xs text-gray-400">{stage.date}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}


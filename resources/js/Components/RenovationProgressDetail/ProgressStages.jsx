import { Calendar } from 'lucide-react';
import { getStatusColor, getProgressBarColor, getProgressNodeStyle } from '@/Pages/RenovationProgressDetail/utils/statusHelpers';
import { DEFAULT_PROGRESS_STAGES } from '@/Pages/RenovationProgressDetail/utils/constants';

export default function ProgressStages({ progressStages = DEFAULT_PROGRESS_STAGES }) {
    const currentStageIndex = progressStages.findIndex(stage => stage.status === 'in_progress');
    const activeStageIndex = currentStageIndex >= 0 ? currentStageIndex : 0;
    
    const calculateProgressLineStyle = () => {
        if (progressStages.length <= 1) return {};
        
        const stageWidth = 100 / progressStages.length;
        const firstNodeCenter = stageWidth / 2;
        const lastNodeCenter = 100 - (stageWidth / 2);
        const lineWidth = lastNodeCenter - firstNodeCenter;
        
        return {
            left: `${firstNodeCenter}%`,
            width: `${lineWidth}%`,
        };
    };

    const getSegmentStyle = (index) => {
        const stageWidth = 100 / progressStages.length;
        const firstNodeCenter = stageWidth / 2;
        const segmentStart = (stageWidth * index) + (stageWidth / 2);
        const segmentEnd = (stageWidth * (index + 1)) + (stageWidth / 2);
        // Calculate position relative to the progress line container
        const lineStart = firstNodeCenter;
        const lineWidth = (100 - (stageWidth / 2)) - firstNodeCenter;
        const relativeStart = ((segmentStart - lineStart) / lineWidth) * 100;
        const relativeWidth = ((segmentEnd - segmentStart) / lineWidth) * 100;
        return {
            left: `${relativeStart}%`,
            width: `${relativeWidth}%`,
        };
    };

    return (
        <div 
            className="bg-white rounded-2xl p-4"
            style={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
            }}
        >
            <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-5 h-5 text-gray-600" />
                <h2 className="text-base font-semibold text-gray-900">Reno Progress Stages</h2>
            </div>

            <div className="relative mb-6">
                <div className="flex items-start justify-between relative">
                    {progressStages.length > 1 && (
                        <>
                            {/* Background gray line */}
                            <div 
                                className="absolute top-5 h-1 z-0 bg-gray-300 rounded-full"
                                style={calculateProgressLineStyle()}
                            ></div>
                            {/* Colored segments overlay */}
                            <div 
                                className="absolute top-5 h-1 z-0 progress-line rounded-full overflow-hidden"
                                style={calculateProgressLineStyle()}
                            >
                                {Array.from({ length: progressStages.length - 1 }).map((_, index) => {
                                    const segmentColor = getProgressBarColor(index, activeStageIndex);
                                    const isYellowSegment = index === activeStageIndex;
                                    return (
                                        <div 
                                            key={index}
                                            className={`h-full absolute transition-colors duration-300 ${!isYellowSegment ? segmentColor : ''}`}
                                            style={{
                                                ...getSegmentStyle(index),
                                                ...(isYellowSegment ? {
                                                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                                                    boxShadow: '0 2px 4px rgba(251, 191, 36, 0.4)',
                                                } : {}),
                                            }}
                                        ></div>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    {progressStages.map((stage, index) => {
                        const isActive = stage.status === 'in_progress';
                        const nodeStyle = getProgressNodeStyle(stage.status);
                        return (
                            <div key={stage.id} className="flex-1 flex flex-col items-center relative z-10">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm relative overflow-hidden ${
                                        isActive ? 'progress-stage-blink' : ''
                                    }`}
                                    style={{
                                        ...nodeStyle,
                                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
                                    }}
                                >
                                    {/* Glossy highlight effect */}
                                    <div 
                                        className="absolute inset-0 pointer-events-none"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, transparent 55%)',
                                            borderRadius: '50%',
                                        }}
                                    />
                                    <span className="relative z-10">{stage.id}</span>
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


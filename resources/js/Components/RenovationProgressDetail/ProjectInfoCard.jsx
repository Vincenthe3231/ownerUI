import { ChevronRight, User, Phone } from 'lucide-react';

export default function ProjectInfoCard({ project, isExpanded, onToggle }) {
    if (!project) return null;

    return (
        <div 
            className="bg-white rounded-3xl"
            style={{
                paddingTop: '1rem',
                paddingBottom: '1rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
            }}
        >
            <button
                onClick={onToggle}
                className="w-full"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="w-8 h-8 bg-[#d81e43] rounded-lg flex items-center justify-center">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-gray-900">
                                {project.property_name} ({project.unit_id})
                            </div>
                        </div>
                    </div>
                    <ChevronRight 
                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} 
                    />
                </div>
            </button>
            
            <div className={`expandable-content ${isExpanded ? 'expanded' : ''}`}>
                {isExpanded && (
                    <>
                        <div className="border-t border-gray-200 mt-2 pt-4">
                            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide text-center mb-4">
                                OWNER DETAILS
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <User className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                    <div className="text-sm font-semibold text-gray-900">
                                        {project.owner_name || 'N/A'}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                    <div className="text-sm font-semibold text-gray-900">
                                        {project.owner_phone || 'N/A'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}


import { Head, Link } from '@inertiajs/react';
import BottomNavigation from '@/Components/BottomNavigation';

export default function UnreleasedQuotation({ quotation }) {
    return (
        <>
            <Head title="Unreleased Quotation" />

            <div className="min-h-screen bg-gray-100 pb-20">
                {/* Header */}
                <div className="bg-white shadow-sm">
                    <div className="px-4 py-4">
                        <div className="flex items-center mb-4">
                            <Link
                                href="/quotations"
                                className="mr-3 text-gray-600 hover:text-gray-900"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </Link>
                            <h1 className="text-xl font-semibold text-gray-900">
                                Quotation Details
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-4 py-6 space-y-4">
                    {/* Status Card */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Quotation Not Released</h2>
                            <p className="text-gray-600 text-sm mb-4">
                                This quotation has not been released yet. Please contact your sales representative for more information.
                            </p>
                            <div className="inline-block px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                                Status: Unreleased
                            </div>
                        </div>
                    </div>

                    {/* Quotation Info Card */}
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quotation Information</h3>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-600">Quote ID</div>
                                <div className="text-sm font-semibold text-gray-900">{quotation?.quotation_id || 'QUO-2500002'}</div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-600">Property Name</div>
                                <div className="text-sm font-semibold text-gray-900">{quotation?.property_name || 'Meta City'}</div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-600">Unit</div>
                                <div className="text-sm font-semibold text-gray-900">{quotation?.unit || 'A-22-12'}</div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-600">Date Created</div>
                                <div className="text-sm font-semibold text-gray-900">{quotation?.date || '06 Nov 2025'}</div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Card */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-gray-900 mb-1">Need Assistance?</h4>
                                <p className="text-sm text-gray-700">
                                    Please contact your sales representative to get this quotation released and activated.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <BottomNavigation active="quotations" />
        </>
    );
}


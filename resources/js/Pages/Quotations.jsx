import { Head, Link } from '@inertiajs/react';
import BottomNavigation from '@/Components/BottomNavigation';

export default function Quotations({ quotations = [] }) {
    return (
        <>
            <Head title="Quotations" />

            <div className="min-h-screen bg-gray-100 pb-32">
                {/* Header */}
                <div className="bg-white px-4 py-6">
                    {/* Logo */}
                    <div className="flex items-center mb-6">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center mr-2">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-red-600 font-bold text-lg">RenoXpert</div>
                                <div className="text-gray-400 text-xs">empowered by BeLive</div>
                            </div>
                        </div>
                    </div>

                    {/* Page Title */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Quotations</h1>
                    <p className="text-gray-500 text-sm">View and manage your property quotations</p>
                </div>

                {/* Quotations List */}
                <div className="px-4 py-6 space-y-4 pb-24">
                    {quotations.map((quotation, index) => (
                        <Link
                            key={index}
                            href={quotation.status === 'Unreleased' 
                                ? `/quotation/${quotation.id}/unreleased` 
                                : `/quotation/${quotation.id}/overview`}
                            className="block"
                        >
                            <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-start">
                                    {/* Icon */}
                                    <div className="flex-shrink-0 mr-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="text-base font-bold text-gray-900">
                                                {quotation.quotation_id}
                                            </div>
                                            {quotation.status === 'Sale' || quotation.status === 'Confirmed' ? (
                                                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                    {quotation.status}
                                                </span>
                                            ) : quotation.status === 'Unreleased' ? (
                                                <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                                    {quotation.status}
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                    {quotation.status}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex flex-col gap-1">
                                                <div className="text-xs text-gray-500">Property Name</div>
                                                <div className="text-sm font-semibold text-gray-900">{quotation.property_name}</div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="text-xs text-gray-500">Unit</div>
                                                <div className="text-sm font-semibold text-gray-900">{quotation.unit}</div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="text-xs text-gray-500">Amount</div>
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {quotation.show_amount ? (
                                                        `RM ${parseFloat(quotation.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                                    ) : (
                                                        <span className="italic text-gray-700">Click to see the amount</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom Navigation */}
                <BottomNavigation active="quotations" />
            </div>
        </>
    );
}

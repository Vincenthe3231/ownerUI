import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p className="mb-4">You're logged in!</p>
                            <div className="space-y-4">
                                <div>
                                    <p className="mb-2">
                                        <strong>View Quotations:</strong>
                                    </p>
                                    <Link 
                                        href="/quotations" 
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Go to Quotations
                                    </Link>
                                </div>
                                
                                <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                                    <p className="mb-1"><strong>Available routes:</strong></p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li><code className="bg-gray-100 px-1 rounded">/quotations</code> - List all quotations</li>
                                        <li><code className="bg-gray-100 px-1 rounded">/quotation/1/overview</code> - View quotation (Confirmed/Sale status)</li>
                                        <li><code className="bg-gray-100 px-1 rounded">/quotation/2/unreleased</code> - View unreleased quotation</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

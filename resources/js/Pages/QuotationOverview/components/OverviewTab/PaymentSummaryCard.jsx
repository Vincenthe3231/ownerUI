export default function PaymentSummaryCard({
    installmentMonths,
    setInstallmentMonths,
    monthlyPayment,
    totalAmount,
    initialDownPayment,
    balancePayment,
    isExpanded,
    onToggle,
    onShowTermsModal,
}) {
    return (
        <div 
            className="bg-white rounded-lg hover:scale-105"
            style={{
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                transformOrigin: 'center',
                transition: 'transform 0.15s ease-out',
                transitionDelay: '0s',
            }}
        >
            <div className="p-4">
                {/* Payment Method - Disabled */}
                <div className="mb-3">
                    <label className="block text-xs text-gray-600 mb-1">Payment Method &#128179;</label>
                    <div className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed">
                        Full Payment
                    </div>
                </div>

                {/* Installment Months Dropdown - Disabled */}
                <div className="mb-4">
                    <label className="block text-xs text-gray-600 mb-1">Installment Period &#9203;</label>
                    <select
                        value={installmentMonths}
                        onChange={(e) => setInstallmentMonths(Number(e.target.value))}
                        disabled
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                    >
                        <option value={36}>36 months</option>
                        <option value={60}>60 months</option>
                    </select>
                </div>

                {/* Monthly Payment Info */}
                <div className="mb-3">
                    <div className="text-sm text-gray-900 mb-1">
                        <span className="text-red-600 font-bold">
                            RM {parseFloat(monthlyPayment.toFixed(2)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className="text-gray-600">/month for {installmentMonths} months</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                        <span>(Terms & Conditions)</span>
                        <button
                            onClick={onShowTermsModal}
                            className="ml-1"
                        >
                            <svg
                                className="w-4 h-4 text-yellow-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* One-time Payment Option */}
                <div className="text-sm text-gray-600 mb-4">
                    Or pay one-time: <span className="font-semibold text-gray-900">RM {totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>

                {/* View Details Button */}
                <div className="text-right">
                    <button
                        onClick={onToggle}
                        className="text-sm text-[#d81e43] hover:text-[#d81e43] font-medium underline"
                    >
                        {isExpanded ? 'Hide Details' : 'View Details'}
                    </button>
                </div>
            </div>

            {/* Expandable Payment Details */}
            <div className={`expandable-content ${isExpanded ? 'expanded' : ''}`}>
                <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
                    {/* Total Renovation */}
                    <div className="flex justify-between items-center pt-3">
                        <div className="text-sm text-gray-600">Total Renovation</div>
                        <div className="text-sm font-semibold text-gray-900">RM {totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>

                    <div className="border-t border-gray-200"></div>

                    {/* Total Quotation Amount */}
                    <div className="flex justify-between items-center">
                        <div className="text-sm font-semibold text-gray-900">Total Quotation Amount:</div>
                        <div className="text-sm font-semibold text-gray-900">RM {totalAmount.toLocaleString()}</div>
                    </div>

                    {/* Payment Terms */}
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-sm font-semibold text-gray-900 mb-1">Payment Terms:</div>
                            <div className="flex items-center text-xs text-gray-500">
                                <span>(Terms & Conditions)</span>
                                <button
                                    onClick={onShowTermsModal}
                                    className="ml-1"
                                >
                                    <svg
                                        className="w-4 h-4 text-yellow-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="text-sm font-semibold text-gray-900">Full Payment</div>
                    </div>

                    <div className="border-t border-gray-200"></div>

                    {/* Initial Down Payment */}
                    <div className="flex justify-between items-center">
                        <div className="text-sm font-semibold text-gray-900">Initial Down Payment:</div>
                        <div className="text-sm font-semibold text-gray-900">RM {initialDownPayment.toLocaleString()}</div>
                    </div>

                    {/* Balance Payment */}
                    <div className="flex justify-between items-center">
                        <div className="text-sm font-semibold text-gray-900">Balance Payment:</div>
                        <div className="text-sm font-semibold text-gray-900">RM {balancePayment.toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}


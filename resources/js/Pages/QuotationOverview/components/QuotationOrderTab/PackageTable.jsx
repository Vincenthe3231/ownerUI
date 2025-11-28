export default function PackageTable({ pkg }) {
    if (!pkg || !pkg.products || pkg.products.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500">
                No products available for this package.
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="mb-4">
                <h3 className="text-base font-semibold text-gray-900 mb-1">{pkg.name}</h3>
                {pkg.description && (
                    <p className="text-sm text-gray-600">{pkg.description}</p>
                )}
                <div className="mt-2">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                        Quantity: x{pkg.quantity}
                    </span>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900">Products</h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">S.o.W</th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">Product</th>
                                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pkg.products.map((product, idx) => (
                                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-4 text-gray-900">{product.sow}</td>
                                    <td className="py-3 px-4">
                                        <div className="font-semibold text-gray-900 mb-1">{product.product}</div>
                                        {product.description && (
                                            <div className="text-xs text-gray-600">{product.description}</div>
                                        )}
                                    </td>
                                    <td className="py-3 px-4 text-right text-gray-900">{product.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


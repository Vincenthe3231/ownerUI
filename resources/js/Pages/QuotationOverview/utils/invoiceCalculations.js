/**
 * Calculate invoice statistics
 * @param {Array} invoices - Array of invoice objects
 * @returns {Object} - Object containing invoice statistics
 */
export function calculateInvoiceStats(invoices) {
    const totalInvoices = invoices.length;
    const paidInvoices = invoices.filter(inv => inv.status === 'paid').length;
    const overdueInvoices = invoices.filter(inv => inv.status === 'overdue').length;
    const pendingInvoices = invoices.filter(inv => inv.status !== 'paid' && inv.status !== 'overdue').length;
    const progressPercentage = totalInvoices > 0 ? (paidInvoices / totalInvoices) * 100 : 0;

    return {
        totalInvoices,
        paidInvoices,
        overdueInvoices,
        pendingInvoices,
        progressPercentage,
    };
}


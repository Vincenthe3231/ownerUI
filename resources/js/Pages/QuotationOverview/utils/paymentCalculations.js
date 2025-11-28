/**
 * Calculate payment amounts
 * @param {Array} invoices - Array of invoice objects
 * @param {number} installmentMonths - Number of installment months (36 or 60)
 * @returns {Object} - Object containing payment calculations
 */
export function calculatePaymentAmounts(invoices, installmentMonths) {
    const totalAmount = invoices.reduce((sum, inv) => sum + parseFloat(inv.amount || 0), 0);
    const monthlyPayment = installmentMonths === 36
        ? totalAmount / 36
        : totalAmount / 60;
    const initialDownPayment = Math.round(totalAmount / 2);
    const balancePayment = totalAmount - initialDownPayment;

    return {
        totalAmount,
        monthlyPayment,
        initialDownPayment,
        balancePayment,
    };
}


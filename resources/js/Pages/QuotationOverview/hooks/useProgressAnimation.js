import { useState, useEffect } from 'react';
import { QUOTATION_OVERVIEW_CONFIG } from '../constants';

/**
 * Custom hook to animate progress chart and invoice numbers
 * @param {number} progressPercentage - Progress percentage to animate to
 * @param {number} totalInvoices - Total number of invoices
 * @param {number} paidInvoices - Number of paid invoices
 * @param {number} overdueInvoices - Number of overdue invoices
 * @returns {Object} - Object containing animated values
 */
export function useProgressAnimation(progressPercentage, totalInvoices, paidInvoices, overdueInvoices) {
    const [circularProgress, setCircularProgress] = useState(0);
    const [animatedPercentage, setAnimatedPercentage] = useState(0);

    useEffect(() => {
        setCircularProgress(0);
        setAnimatedPercentage(0);

        const { ANIMATION_DURATION, ANIMATION_STEPS } = QUOTATION_OVERVIEW_CONFIG;
        const stepDuration = ANIMATION_DURATION / ANIMATION_STEPS;
        const increment = progressPercentage / ANIMATION_STEPS;

        let currentStep = 0;
        const progressTimer = setTimeout(() => {
            setCircularProgress(progressPercentage);
        }, 100);

        const percentageTimer = setInterval(() => {
            currentStep++;
            if (currentStep <= ANIMATION_STEPS) {
                setAnimatedPercentage(Math.min(increment * currentStep, progressPercentage));
            } else {
                setAnimatedPercentage(progressPercentage);
                clearInterval(percentageTimer);
            }
        }, stepDuration);

        return () => {
            clearTimeout(progressTimer);
            clearInterval(percentageTimer);
        };
    }, [progressPercentage]);

    return {
        circularProgress,
        animatedPercentage,
    };
}


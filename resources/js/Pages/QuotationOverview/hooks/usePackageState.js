import { useState } from 'react';

/**
 * Custom hook to manage package expansion and enabled state
 * @returns {Object} - Object containing package state and handlers
 */
export function usePackageState() {
    const [expandedPackages, setExpandedPackages] = useState({});
    const [enabledPackages, setEnabledPackages] = useState({});

    const togglePackage = (packageId) => {
        setExpandedPackages(prev => ({
            ...prev,
            [packageId]: !prev[packageId]
        }));
    };

    const togglePackageEnabled = (packageId) => {
        setEnabledPackages(prev => ({
            ...prev,
            [packageId]: !prev[packageId]
        }));
    };

    const isPackageEnabled = (pkg) => {
        if (pkg.type === 'optional') {
            return enabledPackages[pkg.id] !== undefined 
                ? enabledPackages[pkg.id] 
                : (pkg.enabled || false);
        }
        return true; // Standard packages are always enabled
    };

    return {
        expandedPackages,
        enabledPackages,
        togglePackage,
        togglePackageEnabled,
        isPackageEnabled,
    };
}


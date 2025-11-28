/**
 * Helper function to get glossy chip style based on color type
 * @param {string} colorType - Color type: 'green', 'pink', 'red', 'teal', 'gray'
 * @param {boolean} isActive - Whether the chip is in active state
 * @returns {Object} - Style object for the chip
 */
export function getGlossyChipStyle(colorType, isActive = false) {
    switch (colorType) {
        case 'green':
            return {
                background: isActive 
                    ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                    : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                color: '#ffffff',
                boxShadow: `
                    0 2px 6px rgba(34, 197, 94, 0.25),
                    0 1px 2px rgba(34, 197, 94, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                `,
                border: 'none',
            };
        case 'pink':
            return {
                background: isActive
                    ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
                    : 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
                color: '#ffffff',
                boxShadow: `
                    0 2px 6px rgba(236, 72, 153, 0.25),
                    0 1px 2px rgba(236, 72, 153, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                `,
                border: 'none',
            };
        case 'red':
            return {
                background: 'linear-gradient(135deg, #e91e3d 0%, #c81a33 100%)',
                color: '#ffffff',
                boxShadow: `
                    0 2px 6px rgba(216, 30, 67, 0.25),
                    0 1px 2px rgba(216, 30, 67, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                `,
                border: 'none',
            };
        case 'teal':
            return {
                background: isActive
                    ? 'linear-gradient(135deg, #3cc0bd 0%, #2a9d9a 100%)'
                    : 'linear-gradient(135deg, #5eead4 0%, #3cc0bd 100%)',
                color: '#ffffff',
                boxShadow: `
                    0 2px 6px rgba(60, 192, 189, 0.25),
                    0 1px 2px rgba(60, 192, 189, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                `,
                border: 'none',
            };
        case 'gray':
        default:
            return {
                background: 'linear-gradient(135deg, #9ca3af 0%, #b8bdc6 100%)',
                color: '#ffffff',
                boxShadow: `
                    0 2px 6px rgba(156, 163, 175, 0.2),
                    0 1px 2px rgba(156, 163, 175, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.15),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                `,
                border: 'none',
            };
    }
}


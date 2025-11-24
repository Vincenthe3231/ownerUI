/**
 * Responsive style configurations for AppBar
 */
export const appBarStyles = {
    container: {
        minHeight: 'clamp(3.5rem, 8vw, 4.5rem)',
        maxHeight: '100vh',
        paddingTop: 'clamp(0.75rem, 2vw, 1rem)',
        paddingBottom: 'clamp(1rem, 3vw, 1.5rem)',
        paddingLeft: 'clamp(0.75rem, 2vw, 1rem)',
        paddingRight: 'clamp(0.75rem, 2vw, 1rem)',
    },
    backButton: {
        marginRight: 'clamp(0.5rem, 1.5vw, 0.75rem)',
    },
    icon: {
        width: 'clamp(1.25rem, 4vw, 1.5rem)',
        height: 'clamp(1.25rem, 4vw, 1.5rem)',
    },
    title: {
        fontSize: 'clamp(1rem, 4vw, 1.25rem)',
    },
};
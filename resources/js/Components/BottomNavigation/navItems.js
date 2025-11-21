export const getNavItems = () => {
    const resolveRoute = (name, fallback) =>
        typeof route === 'function' ? route(name) : fallback;

    return [
        { id: 'home', label: 'Home', href: resolveRoute('home', '/home'), icon: 'home' },
        { id: 'chat', label: 'Chat', href: '#', icon: 'chat' },
        { id: 'quotations', label: 'Quotations', href: resolveRoute('quotations.index', '/quotations'), icon: 'document' },
        { id: 'reno-progress', label: 'Progress', href: resolveRoute('renovation-progress.index', '/renovation-progress'), icon: 'settings', badge: true },
        { id: 'profile', label: 'Profile', href: resolveRoute('profile.edit', '/profile'), icon: 'user' },
    ];
};


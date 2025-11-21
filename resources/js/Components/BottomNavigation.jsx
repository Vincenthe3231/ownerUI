import { getNavItems } from './BottomNavigation/navItems';
import NavItem from './BottomNavigation/NavItem';
import CurvedOverlay from './BottomNavigation/CurvedOverlay';
import { useScrollDirection } from './BottomNavigation/useScrollDirection';

const getContainerStyles = (zIndex) => ({
    transform: 'translateZ(0)',
    isolation: 'isolate',
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    overflow: 'visible',
    minWidth: '320px',
    zIndex: zIndex,
});

const innerContainerStyles = {
    paddingTop: '10px',
    paddingBottom: '10px',
    width: '100%',
    minWidth: '320px',
    maxWidth: '100%',
    overflow: 'visible',
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    WebkitTransform: 'translateZ(0)',
    transform: 'translateZ(0)',
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: `
        inset 0 2px 4px rgba(255, 255, 255, 0.9),
        inset 0 -2px 4px rgba(0, 0, 0, 0.05),
        0 -8px 24px rgba(255, 255, 255, 0.4),
        0 4px 12px rgba(255, 255, 255, 0.3)
    `,
};

const gridStyles = {
    width: '100%',
    minWidth: '320px',
    overflow: 'visible',
    boxSizing: 'border-box',
};

export default function BottomNavigation({ active = 'quotations' }) {
    const navItems = getNavItems();
    const activeIndex = navItems.findIndex(item => item.id === active);
    const isScrollingDown = useScrollDirection();
    
    // z-index: -1 when scrolling down, 50 when scrolling up or at top
    const zIndex = isScrollingDown ? -1 : 50;

    return (
        <div className="fixed bottom-0 left-0 right-0" style={getContainerStyles(zIndex)}>
            <div className="relative" style={innerContainerStyles}>
                <CurvedOverlay activeIndex={activeIndex} />
                <div 
                    className="relative grid grid-cols-5 items-center px-1 sm:px-2 pt-1 sm:pt-2"
                    style={gridStyles}
                >
                    {navItems.map((item) => (
                        <NavItem key={item.id} item={item} isActive={active === item.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

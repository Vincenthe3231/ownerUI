export default function CurvedOverlay({ activeIndex }) {
    return (
        <svg
            className="absolute top-0 left-0 w-full pointer-events-none"
            style={{ height: '40px', overflow: 'visible' }}
            viewBox="0 0 100 48"
            preserveAspectRatio="none"
        >
            <path
                d={`M 0,48 Q ${activeIndex * 20 + 10},${activeIndex === -1 ? 48 : 20} ${activeIndex * 20 + 10},48 L 100,48 L 100,0 L 0,0 Z`}
                fill="rgba(255, 255, 255, 0.8)"
            />
        </svg>
    );
}


import { useState } from 'react';

export function useCoachMark() {
    const [showCoachMark, setShowCoachMark] = useState(false);
    const [coachMarkSlide, setCoachMarkSlide] = useState(0);

    const openCoachMark = () => {
        setShowCoachMark(true);
        setCoachMarkSlide(0);
    };

    const closeCoachMark = () => {
        setShowCoachMark(false);
    };

    const nextSlide = () => {
        if (coachMarkSlide < 2) {
            setCoachMarkSlide(coachMarkSlide + 1);
        } else {
            closeCoachMark();
        }
    };

    const previousSlide = () => {
        if (coachMarkSlide > 0) {
            setCoachMarkSlide(coachMarkSlide - 1);
        } else {
            closeCoachMark();
        }
    };

    return {
        showCoachMark,
        coachMarkSlide,
        openCoachMark,
        closeCoachMark,
        nextSlide,
        previousSlide,
    };
}


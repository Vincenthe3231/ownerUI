import { useContext } from 'react';
import { DropDownContext } from './context';

/**
 * Dropdown Trigger component
 * Handles opening/closing the dropdown
 */
export default function Trigger({ children }) {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);

    return (
        <>
            <div onClick={toggleOpen}>{children}</div>

            {open && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpen(false)}
                ></div>
            )}
        </>
    );
}


import { useState } from 'react';
import { DropDownContext } from './context';
import Trigger from './Trigger';
import Content from './Content';
import DropdownLink from './DropdownLink';

/**
 * Main Dropdown component
 * Provides dropdown functionality with context
 */
const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

// Attach sub-components
Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;


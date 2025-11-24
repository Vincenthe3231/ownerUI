import { Transition } from '@headlessui/react';
import { useContext } from 'react';
import { DropDownContext } from './context';
import { getAlignmentClasses, getWidthClasses } from './constants';

/**
 * Dropdown Content component
 * Displays the dropdown menu content
 */
export default function Content({
    align = 'right',
    width = '48',
    contentClasses = 'py-1 bg-white',
    children,
}) {
    const { open, setOpen } = useContext(DropDownContext);

    const alignmentClasses = getAlignmentClasses(align);
    const widthClasses = getWidthClasses(width);

    return (
        <>
            <Transition
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div
                    className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
                    onClick={() => setOpen(false)}
                >
                    <div
                        className={
                            `rounded-md ring-1 ring-black ring-opacity-5 ` +
                            contentClasses
                        }
                    >
                        {children}
                    </div>
                </div>
            </Transition>
        </>
    );
}


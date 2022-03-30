import React from 'react'
import {BsPlusLg} from 'react-icons/bs'

export type FabProps = {
    /**
     * A JSX Element. This can be a JSX Element icon from a library like react-icons
     */
    icon: React.ReactNode;
    /**
     * The distance of the FAB from the top. To get the FAB closer to the bottom use window.innerHeight calculations
     */
    top: number | string;
    /**
     * The distance of the FAB from the left. To get the FAB closer to the right use window.innerWidht calculations
     */
    left: number | string;
    /**
     * An onclick event listener to configure the action to be taken when the FAB is clicked.
     */
    onClick: () => void;
}

export const FAB: React.FC<FabProps> = ({
    icon,
    top,
    left,
    onClick
}) => {

    



    return <button onClick={onClick} className="relic-fab" style={{top, left}}>
        {icon
            ? icon
            : <BsPlusLg/>
        }
        </button>
}

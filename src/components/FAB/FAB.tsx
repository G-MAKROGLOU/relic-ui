import React from 'react'
import {BsPlusLg} from 'react-icons/bs'
import {FabProps} from './FAB.types'


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

import React from 'react'
import {CardProps} from './Card.types'




export const Card: React.FC<CardProps> = ({
    imageSrc,
    title,
    description,
    footer,
    style
}:CardProps) => {

    return (
        <div className="relic-card" style={style}>
            <div>
                {
                    typeof imageSrc === 'string' 
                    ? <img src={imageSrc} alt="relic-card-image" className="relic-card-image"/> 
                    : typeof imageSrc === 'object'
                    ? imageSrc
                    : null
                }
            </div>
            <div className="relic-card-body">
                <h2 className="relic-card-header">{title}</h2>
                <p className="relic-card-description">{description}</p>
            </div>
            {footer}
        </div>
    )
}



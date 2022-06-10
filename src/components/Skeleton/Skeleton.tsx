import React from 'react'
import {SkeletonProps} from './Skeleton.types'

export const Skeleton = ({isVisible, width, repeat=1}:SkeletonProps) => {
    return (
      <>
           {new Array<number>(repeat).fill(0).map((sk:number, id:number) => (
            <div key={id} style={{display: isVisible ? 'block' : 'none', width: width!, marginTop: 10} as React.CSSProperties}>
                <div className="relic-skeleton-container" >
                    <div className="relic-skeleton-image"/>
                    <div className="relic-skeleton-line-wrapper">
                        <div className="relic-skeleton-line"/>
                        <div className="relic-skeleton-line"/>
                        <div className="relic-skeleton-line"/>
                    </div>
                </div>
                <div className="relic-skeleton-line"/>
                <div className="relic-skeleton-line"/>
            </div>
        ))}
        </>
    )
}


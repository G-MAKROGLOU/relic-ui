import React from 'react'
import {SkeletonProps} from './Skeleton.types'

export const Skeleton = ({isVisible, width, repeat=1}:SkeletonProps) => {
    return (
      <>
           {new Array<number>(repeat).fill(0).map((sk:number, id:number) => (
            <div key={id} style={{display: isVisible ? 'block' : 'none', width: width!, marginTop: 10} as React.CSSProperties}>
                <div className="container" >
                    <div className="test"/>
                    <div className="line-wrapper">
                        <div className="line"/>
                        <div className="line"/>
                        <div className="line"/>
                    </div>
                </div>
                <div className="line"/>
                <div className="line"/>
            </div>
        ))}
        </>
    )
}


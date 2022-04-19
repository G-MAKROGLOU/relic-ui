import React from 'react'
import {LoadingSpinnerProps} from './LoadingSpinner.types'



export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    isVisible,
    component,
    prompt
}) => {
    
    return (
        <div className={`relic-loading-spinner-mask ${isVisible ? 'relic-loading-spinner-visible' : 'relic-loading-spinner-invisible'}`} >
            <div className="relic-loading-spinner-wrapper">
                <div className="relic-loading-spinner">
                    {
                    component 
                    ? component 
                    : <>
                        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                            <div className="relic-loading-spinner-particle-1"/>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div className="relic-loading-spinner-particle-2"/>
                            <div className="relic-loading-spinner-particle-3"/>
                        </div>
                    </>
                    }
                </div>
                {
                !prompt 
                ? <h2 className="relic-loading-spinner-prompt">Loading...Please Wait</h2>
                : typeof prompt === 'string' 
                    ? <h2 className="relic-loading-spinner-prompt">{prompt}</h2>
                    : prompt
                 
                }
            </div>
        </div>
    )
}
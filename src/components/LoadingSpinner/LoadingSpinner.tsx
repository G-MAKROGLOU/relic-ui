import React from 'react'


export type LoadingSpinnerProps = {
    /**
     * Wether the spinner is visible or not. A value controlled through props or context
     */
    isVisible?: boolean;
    /**
     * A custom element to pass as the spinner. The styling of the element is up to you. The 
     * rotation animation is provided by Relic
     */
    component?: JSX.Element;
    /**
     * A custom message to show under the spinner. If ommited the default will be use. 
     * If it is a string the default styling is applied. If it is a JSX element they styling is up 
     * to you. 
     */
    prompt?: string | JSX.Element;
}


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
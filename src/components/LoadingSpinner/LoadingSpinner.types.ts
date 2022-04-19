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
     * A custom message to show under the spinner. If ommited the default will be used. 
     * If it is a string the default styling is applied. If it is a JSX element the styling is up 
     * to you. 
     */
    prompt?: string | JSX.Element;
}

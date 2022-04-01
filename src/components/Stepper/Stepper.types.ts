export type StepperProps = {
    /**
     * An array of JSON objects that contains the information for each step. 
     * {key, title, content, icon?, onStepChange?}. key, title and content are 
     * mandatory while icon and onStepChange are optional.
     */
    steps: Step[],
    /**
     * If set to true, change of the steps is taken care by the internal mechanism of the stepper
     * and a footer with  Previous and  Next buttons is rendered. If set to false you will have to
     * provide your own controls for the stepper and change of the steps is up to you. Relic Stepper
     * will only take care of the change animations.
     */
    isSelfContained?: boolean,
    /**
     * The key of the active step. When isSelfContained is set to false, this property will allow you to handle the change of 
     * the steps through custom controls. For example, in case of forms, you may want your Next button
     * to be the submit button of the form in order to first submit and then change the step. 
     */
    activeStep?: number
}

export type Step = {
    /**
     * The key of the step. This is used to index the steps and render
     * a number in the center of the circle
     */
    key: number,
    /**
     * The title of the step is displayed under the circle. Too long titles may break the UI
     */
    title?: string | React.ReactNode,
    /**
     * The content to be rendered for each step. In case of forms, set isSelfContained to false and provide
     * your own handles.
     */
    content: React.ReactNode,
    /**
     * An Icon to be rendered instead of the key inside the circle. The key will still be used to index
     * the steps
     */
    icon?: React.ReactNode | null,
    /**
     * An on change event listener that gives access to the current and next step properties. You can use this 
     * info to add conditional logic depending the step you are leaving from or going to. When isSelfContained is set to false
     * this property is overriden by your own logic
     */
    onStepChange?: (prevStep:Step, nextStep:Step) => void
}

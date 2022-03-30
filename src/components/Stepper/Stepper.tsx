import React from 'react'
import {Button} from '../Button/Button'

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


/**
 * A stepper component to add step logic to your UI. Used to break down bigger logics into smaller
 * chunks that perform a single thing at a time.
 */
export const Stepper =  React.forwardRef( ({
    steps, 
    isSelfContained = true,
    activeStep
    }: StepperProps, 
    ref: React.Ref<HTMLElement>
) => {
    
    const [containerWidth, setContainerWidth] = React.useState<number>();

    const [current, setCurrent] = React.useState<number>(1)
    const [nextDisabled, setNextDisabled] = React.useState(false)
    const [firstRender, setFirstRender] = React.useState(true)


    React.useEffect(() => {
        let container = document.querySelector('#relic-stepper-container') as HTMLDivElement;
        let {width} = container.getBoundingClientRect()
        setContainerWidth(width)
        let firstCircle;
        if(isSelfContained){
            firstCircle = document.querySelector(`#step-${current}`) as HTMLElement;
        }else{
            setFirstRender(false)
            firstCircle = document.querySelector(`#step-${activeStep}`) as HTMLElement;
        }

        firstCircle.classList.add('circle-active')
    }, [])


    React.useEffect(() => {
        if(!isSelfContained){
            if(activeStep) {
                if(firstRender && activeStep > steps.at(0)!.key){
                    steps.forEach((step, index) => {
                        if(step.key !== activeStep){
                            localOnNext()
                        }
                    })
                }else{
                    if(activeStep > current) localOnNext()
                    else localOnPrevious()
                }

                
            }
        }
    }, [activeStep])


    const localOnPrevious = () => {
        setNextDisabled(false)
        setCurrent((prev:any) => {
            let nValue = prev-1;

            if(nValue >= steps.at(0)!.key){

                let currentCircle = document.querySelector(`#step-${prev}`) as HTMLElement;
                let prevCircle = document.querySelector(`#step-${nValue}`) as HTMLElement;
                currentCircle.classList.remove('circle-active')
                currentCircle.classList.remove('circle-animation')

                prevCircle.classList.add('circle-active')
                prevCircle.classList.remove('circle-animation')

                let currentDivider = document.querySelector(`#relic-step-divider-${nValue}`) as HTMLElement;
                if(currentDivider) currentDivider.classList.remove('expand-relic-step-divider')
                

                steps.forEach((step:Step, index:number) => {
                    if(step.key === prev){
                        if(step.onStepChange) {
                            step.onStepChange(step, steps[index-1])
                        }
                    }
                })
                return nValue;
            }

            return prev;
        })
    }


    const localOnNext = () => {
        setCurrent((prev:number) => {
            let nValue = prev+1;

            if(nValue <= steps.at(-1)!.key){
                let nextCircle = document.querySelector(`#step-${nValue}`) as HTMLElement;
                nextCircle.classList.add('circle-active')
                
                let prevCircle = document.querySelector(`#step-${prev}`) as HTMLElement
                prevCircle.classList.add('circle-animation')

                let divider = document.querySelector(`#relic-step-divider-${prev}`) as HTMLElement;
                if(divider) divider.classList.add('expand-relic-step-divider')

                steps.forEach((step:Step, index:number) => {
                    if(step.key === prev){
                        if(step.onStepChange) {
                            step.onStepChange(step, steps[index+1])
                        }
                    }
                })

                return nValue;
            }

            if(nValue > steps.at(-1)!.key){
                let svg = document.querySelector(`#step-${prev}`) as HTMLElement
                svg.classList.add('circle-animation')
            }

            setNextDisabled(true)
            return prev;
        })

        
    }
    
    return (
        <div id="relic-stepper-container" className="relic-stepper-container">
            <div className="relic-stepper-steps">
                {steps.map((step:Step, index:number) => (
                    <div key={index} className="relic-step">
                        <div>
                            <svg height="60" width="60">
                                <circle id={`step-${step.key}`} cx="30" cy="38" r="20" />
                            </svg>
                            <div style={{position: 'relative', width: 40, bottom: 38, left: 10, textAlign: 'center'}}>
                                {step.icon ? step.icon : step.key}
                            </div>
                            <div style={{position: 'relative', bottom: 20, textAlign: 'center', fontSize: '0.9rem', color: '#424242'}}>{step.title}</div>
                        </div>
                        {
                            index < steps.length - 1
                            ? <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{width: (containerWidth! / steps.length) - ((steps.length * 40) / steps.length), height: 2, backgroundColor: '#c1c1c1', position: 'relative', bottom: 10}}/>
                                <div id={`relic-step-divider-${step.key}`} className="relic-step-divider" />
                             </div>
                            : null
                        }
                    </div>
                ))}
            </div>
            <div className="relic-stepper-body" style={{height: isSelfContained ? '70%': '85%'}}>
                {steps.map((step:Step, index:number) => (
                    <div key={index} style={{display: step.key === current ? 'block' : 'none', height: '100%'}}>
                        {step.content}
                    </div>
                ))}
            </div>
            {isSelfContained 
            ? <div className="relic-stepper-footer">
                <Button disabled={current === steps.at(0)!.key} onClick={localOnPrevious} style={{marginLeft: 10}} type="danger" content="Previous"/>
                <Button disabled={nextDisabled} onClick={localOnNext} style={{marginRight: 10}} type="primary" content="Next"/>
            </div>
            : null
            }
        </div>
    )
})



import React from 'react'
import {Button} from '../Button/Button'
import {Step, StepperProps} from './Stepper.types'


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



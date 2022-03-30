import React from "react";
import { Stepper, StepperProps, Step } from "../components/Stepper/Stepper";
import {Button} from '../components/Button/Button'
import { LoadingSpinner } from "../components/LoadingSpinner/LoadingSpinner";
import {AiFillApi} from 'react-icons/ai'

let steps = [
  {
      key: 1,
      title: 'Step 1',
      content: <>Content of Step 1</>,
      icon: <AiFillApi/>,
      onStepChange: (prev:Step, next:Step) => console.log(prev, next)
  },
  {
      key: 2,
      title: 'Step 2',
      content: <LoadingSpinner isVisible={true}/>,
      icon:  <AiFillApi/>,
      onStepChange: (prev:Step, next:Step) => console.log(prev, next)
  },
  {
      key: 3,
      title: 'Step 3',
      content: <>Content of Step 3</>,
      icon:  <AiFillApi/>,
      onStepChange: (prev:Step, next:Step) => console.log(prev, next)
  },
  {
      key: 4,
      title: 'Step 4',
      content: <>Content of Step 4</>,
      icon:  <AiFillApi/>,
      onStepChange: (prev:Step, next:Step) => console.log(prev, next)
  },
  {
      key: 5,
      title: 'Step 5',
      content: <>Content of Step 5</>,
      icon:  <AiFillApi/>,
      onStepChange: (prev:Step, next:Step) => console.log(prev, next)
  },
  {
      key: 6,
      title: 'Step 6',
      content: <>Content of Step 6</>,
      icon:  <AiFillApi/>,
      onChange: (prev:Step, next:Step) => console.log(prev, next)
  }
]


export default {
  title: "Stepper",
  component: Stepper,
  args: {
    steps
  }
};



export const BasicStepper = ({...args}:StepperProps) => {

  return (  
    <div style={{width: '100vw', height: '100vh'}}>
        <Stepper {...args}/>
    </div>
    
  )
}



export const ManagedStepper = () => {
  const [activeStep, setActiveStep] = React.useState(3);
  const [disabled, setDisabled] = React.useState(false)



  const nextStep = () => {
    setActiveStep(prev => {
      let nValue = prev+1;
      if(nValue > steps.at(-1)!.key) {
        setDisabled(true)
      }
      return nValue
    })
  }


  const prevStep = () => {
    setDisabled(false)
    setActiveStep(prev => {
      let nValue;
      //The below line fixes the inconsistency between the controlled state and inner state of the index
      //due to the animation effect. 
      if(prev > steps.at(-1)!.key) nValue = prev-2 
      else nValue = prev-1;
      if(nValue < steps.at(0)!.key) return prev
      return nValue;
    })
  }
  

  const steps =  [
    {
        key: 1,
        title: 'Step 1',
        content: <ExampleComponent1 
                    content="Content of Step 1" 
                    nextStep={nextStep}
                    prevStep={prevStep}
                    nextDisabled={disabled}
                    prevDisabled={activeStep === 1}
                  />,
        icon: null
    },
    {
        key: 2,
        title: 'Step 2',
        content: <ExampleComponent1 
                    content="Content of Step 2" 
                    nextStep={nextStep}
                    prevStep={prevStep}
                    nextDisabled={disabled}
                    prevDisabled={activeStep === 1}
                  />,
        icon: null
    },
    {
        key: 3,
        title: 'Step 3',
        content: <ExampleComponent1 
                    content="Content of Step 3" 
                    nextStep={nextStep}
                    prevStep={prevStep}
                    nextDisabled={disabled}
                    prevDisabled={activeStep === 1}
                  />,
        icon: null
    }
  ]


  

  return (  
    <div style={{width: '100vw', height: '100vh'}}>
        <Stepper 
          steps={steps}
          isSelfContained={false}
          activeStep={activeStep}
        />
    </div>
    
  )
}


const ExampleComponent1 = ({content, nextStep, prevStep, prevDisabled, nextDisabled}:any) => {
  const [time, setTime] = React.useState(1)
  const [isLoading, setLoading] = React.useState(false)


  React.useEffect(() => {
    if(content === 'Content of Step 1'){
      setTime(1000)
    }

    if(content === 'Content of Step 2'){
      setTime(2000)
    }

    if(content === 'Content of Step 3'){
      setTime(3000)
    }
  })

  const onNext = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      nextStep()
    }, time)
    
  }


  return (
    <div style={{height: '100%'}}>
      <div style={{height: '15%'}}>
        <h3 style={{ textAlign: 'center'}}>Async step change in {time/1000} seconds</h3>
        <h4 style={{ textAlign: 'center'}}>Simulating a network request or other async code execution</h4>
      </div>
      <div style={{height: '75%', textAlign: 'center'}}>{content}</div>
      <div style={{height: '10%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px'}}>
        <Button disabled={prevDisabled} loading={isLoading} onClick={prevStep} content="Previous" type="danger"/>
        <Button disabled={nextDisabled} loading={isLoading} onClick={onNext} content="Next" type="primary"/>
      </div>
    </div>
  )
}





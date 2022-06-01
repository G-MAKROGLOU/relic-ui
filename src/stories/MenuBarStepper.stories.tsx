import React from "react";
import {MenuBarProps} from "../components/MenuBar/MenuBar.types";
import {AiFillApi} from 'react-icons/ai'
import {Step} from '../components/Stepper/Stepper.types'
import {MenuBar} from '../components/MenuBar/MenuBar'
import { LoadingSpinner } from "../components/LoadingSpinner/LoadingSpinner";
import {Stepper} from '../components/Stepper/Stepper'
import {AiOutlineUser, AiOutlineTool, AiFillBell, AiFillExclamationCircle, AiFillFund, AiFillDashboard} from 'react-icons/ai'



export const MenuBarStepper = () => {

    let menuItems = [
        {
            key: 1,
            label: 'MenuItem 1',
            icon: <AiOutlineUser/>,
            children: []
        },
        {
            key: 2,
            label: 'MenuItem 2',
            icon: <AiOutlineTool/>,
        },
        {
            key: 3,
            label: 'MenuItem 3',
            icon: <AiFillBell/>,
            children: [
                {
                    key: 4,
                    label: 'SubItem 1',
                    icon: <AiFillExclamationCircle/>
                },
                {
                    key: 5,
                    label: 'SubItem 2',
                    icon: <AiFillFund/>
                }
            ]
        },
        {
            key: 6,
            label: 'MenuItem 4',
            icon: <AiFillDashboard/>,
        },
        {
            key: 7,
            label: 'MenuItem 2',
            icon: <AiOutlineTool/>,
        },
        {
            key: 8,
            label: 'MenuItem 2',
            icon: <AiOutlineTool/>,
        },
        {
            key: 9,
            label: 'MenuItem 2',
            icon: <AiOutlineTool/>,
        },
        {
            key: 10,
            label: 'MenuItem 2',
            icon: <AiOutlineTool/>,
        },
        {
            key: 11,
            label: 'MenuItem 2',
            icon: <AiOutlineTool/>,
        },
        {
            key: 12,
            label: 'MenuItem 2',
            icon: <AiOutlineTool/>,
        },
        {
            key: 13,
            label: 'MenuItem 2',
            icon: <AiOutlineTool/>,
        },
        {
            key: 14,
            label: 'MenuItem 2',
            icon: <AiOutlineTool/>,
        },
        {
            key: 15,
            label: 'MenuItem 2',
            icon: <AiOutlineTool/>,
        },
        {
            key: 16,
            label: 'MenuItem 2',
            icon: <AiOutlineTool/>,
        },
        {
            key: 17,
            label: 'MenuItem 2',
            icon: <AiOutlineTool/>,
        },
        {
            key: 18,
            label: 'MenuItem 2',
            icon: <AiOutlineTool/>,
        },
    ]

    let steps = [
        {
            key: 1,
            title: 'Step Title 1111',
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
      

    return  (
        <div style={{display: 'flex'}}>
            <div style={{width: 70, height: '100vh', zIndex: 5000}}>
                <MenuBar display="left" menuItems={menuItems}/>
            </div>
            <div style={{width: window.innerWidth - 70, height: '100vh'}}>
                <Stepper steps={steps}/>
            </div>
        </div>
    )
}


export default {
    title: "MenuBarStepper",
    component: MenuBarStepper,
};
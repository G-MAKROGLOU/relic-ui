import React from "react";
import { Story } from "@storybook/react";
import useState from 'storybook-addon-state';
import {MenuBar}  from "../components/MenuBar/MenuBar";
import { MenuBarProps, MenuItemProps } from "../components/MenuBar/MenuBar.types";
import {Button} from '../components/Button/Button'
import { useArgs } from '@storybook/client-api';
import {AiOutlineUser, AiOutlineTool, AiFillBell, AiFillExclamationCircle, AiFillFund, AiFillDashboard} from 'react-icons/ai'

export default {
  title: "MenuBar",
  component: MenuBar,
  args: {
    display: 'left',
    menuItems: [
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
    ],
    onItemClick: (item:MenuItemProps) => console.log(item) 
  }
};



export const BasicMenuBar = ({...args}:MenuBarProps) => <MenuBar {...args}/>

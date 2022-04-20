import React from "react";
import {   
    TabsProps,
    TabItemProps
} from "../components/Tabs/Tabs.types";

import {Tabs} from '../components/Tabs/Tabs'
import { useArgs } from '@storybook/client-api';
import {IconButton} from '../components/IconButton/IconButton'


let tabs:TabItemProps[] = [
    {
        key: 1,
        label: 'Tab 1',
        component: <></>
    },
    {
        key: 2,
        label: 'Tab 2',
        component: <></>
    },
    {
        key: 3,
        label: 'Tab 3',
        component: <></>
    },
    {
        key: 4,
        label: 'Tab 4',
        component: <></>
    }
]


export default {
    title: "Tabs",
    component: Tabs,
    args: {
        isEditable: true,
        tabStyle: "square",
        tabs,
        isLazy: true,
        extras: {
            position: "left",
            content: <></>
        },
        onAdd: () => alert("Add tab through a state update"),
        onClose: (tab: TabItemProps) => alert("Close tab through a state update. Tab to close => " + tab.label),
        onChange: (prevTab: TabItemProps, nextTab: TabItemProps) => alert(`Leaving from ${prevTab.key} => Going to ${nextTab.key}`)
    },
    parameters: {
        docs: { 
            source: { 
                type: 'code' 
            } 
        } 
    },
    argTypes: {
        // layout: {
        //   options: ['horizontal', 'vertical'],
        //   control: { type: 'radio' },
        // } 
    }
  };


export const BasicTabs = ({...args}:TabsProps) => <Tabs {...args}/>



export const TabsWithCommonItemAcrossAllTabs = ({children, ...args}:TabsProps) => {

    return (
        <Tabs {...args}>
            {/* Here content common across all tabs */}
            {children}
        </Tabs> 
    )
}




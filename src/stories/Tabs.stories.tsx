import React from "react";
import {   
    TabsProps,
    TabItemProps
} from "../components/Tabs/Tabs.types";

import {Tabs} from '../components/Tabs/Tabs'
import { useArgs } from '@storybook/client-api';
import {IconButton} from '../components/IconButton/IconButton'
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'

let tabs:TabItemProps[] = [
    {
        key: 1,
        label: 'Tab 1',
        component: <>Tab 1</>
    },
    {
        key: 2,
        label: 'Tab 2',
        component: <>Tab 2</>
    },
    {
        key: 3,
        label: 'Tab 3',
        component: <>Tab 3</>
    },
    {
        key: 4,
        label: 'Tab 4',
        component: <>Tab 4</>
    },
    {
        key: 5,
        label: 'Tab 5',
        component: <>Tab 5</>
    },
    {
        key: 6,
        label: 'Tab 6',
        component: <>Tab 6</>
    },
    {
        key: 7,
        label: 'Tab 7',
        component: <>Tab 7</>
    },
    {
        key: 8,
        label: 'Tab 8',
        component: <>Tab 8</>
    },
    {
        key: 9,
        label: 'Tab 9',
        component: <>Tab 9</>
    },
    {
        key: 10,
        label: 'Tab 10',
        component: <>Tab 10</>
    },
    {
        key: 11,
        label: 'Tab 11',
        component: <>Tab 11</>
    }
]


export default {
    title: "Tabs",
    component: Tabs,
    args: {
        isEditable: true,
        tabStyle: "square",
        tabs,
        maxVisibleTabs: 5,
        extras: {
            position: "left",
            content: <>
                        <IconButton 
                            type="primary"
                            icon={<AiOutlinePlus style={{fontSize: '1.5rem', fontWeight: 'bold'}} />}
                            style={{marginRight: 5}}
                            onClick={() => alert("Clicked tab extra 1")}
                        />
                        <IconButton 
                            type="danger"
                            icon={<AiOutlineMinus style={{fontSize: '1.5rem', fontWeight: 'bold'}} />}
                            onClick={() => alert("Clicked tab extra 2")}
                        />
                     </>
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



export const TabsWithCommonItemAcrossAllTabs = ({...args}:TabsProps) => {

    return (
        <Tabs {...args}>
            <div style={{backgroundColor: '#c1c1c1', padding: 10, marginBottom: 10}}>
                Some element that you might need to be common across all tabs.
                <br/>
                Any component is valid and you can style it as you want.
                <br/>
                i.e. {JSON.stringify({backgroundColor: '#c1c1c1', padding: 10, marginBottom: 10})}
            </div>
        </Tabs> 
    )
}




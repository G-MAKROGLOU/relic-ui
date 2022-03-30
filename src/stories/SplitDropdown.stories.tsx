import React from "react";
import { Story } from "@storybook/react";
import { SplitDropdown, SplitDropdownProps, DropdownItem } from "../components/SplitDropdown/SplitDropdown";


export default {
  title: "SplitDropdown",
  component: SplitDropdown,
};

const Template: Story<SplitDropdownProps> = args => <SplitDropdown {...args} />;

export const BasicSplitDropdown = Template.bind({});
BasicSplitDropdown.args = {
  items: [
        {
            key: '1', 
            title: 'Left 1',
            children: [
                {
                    key: '1-1',
                    parentKey: '1',
                    title: 'Child of 1',
                    children: [
                        {
                            key: '1-2-1',
                            parentKey: '1-1',
                            title: 'Child of 1-1'
                        }
                    ]
                },
                {
                    key: '1-2',
                    parentKey: '1',
                    title: 'Second Child of 1',
                    children: [
                        {
                            key: '1-2-1',
                            parentKey: '1-2',
                            title: 'Child of 1-2'
                        }
                    ]
                }
            ]
        },
        {
            key: '2', 
            title: 'Left 2',
            children: [
                {
                    key: '2-1',
                    parentKey: '2',
                    title: 'Child of 2',
                    children: [
                        {
                            key: '2-1-1',
                            parentKey: '2-1',
                            title: 'Child of 2-1',
                        }
                    ]
                }
            ]
        }
    ] ,
    onClick: (item:DropdownItem) => console.log(item)
};


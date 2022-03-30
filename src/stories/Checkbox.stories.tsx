import React from "react";
import { useArgs } from '@storybook/client-api';
import {   
    CheckboxItemProps,
    CheckboxProps,
    Checkbox,
} from "../components/Inputs/Inputs";


export default {
  title: "Inputs/Checkbox",
  component: Checkbox,
  args: {
    name:"weekDaysCheckbox",
    values: ["4"],
    onChange: (selected:CheckboxItemProps[]) => {},
    alignment: "vertical",
    alignLabel: "left",
    items: [
        {
            "key": "1",
            "value": "Monday"
        },
        {
            "key": "2",
            "value": "Tuesday"
        },
        {
            "key": "3",
            "value": "Wednesday"
        },
        {
            "key": "4",
            "value": "Thursday"
        },
        {
            "key": "5",
            "value": "Friday"
        },
        {
            "key": "6",
            "value": "Saturday",
            "disabled": true
        },
        {
            "key": "7",
            "value": "Sunday",
            "disabled": true
        }
    ]
  }
};

export const BasicCheckbox = ({onChange, ...args}:CheckboxProps) => {
    const [{values}, updateArgs] = useArgs();


    const handleOnChange = (selected:CheckboxItemProps[]) => updateArgs({values: selected});

    return <Checkbox {...args} onChange={handleOnChange} />
}


import React from "react";
import { useArgs } from '@storybook/client-api';
import {   
    Select,
} from "../components/Inputs/Inputs";

import {
    SelectProps,
    SelectItemProps
  } from '../components/Inputs/Inputs.types'


export default {
  title: "Inputs/Select",
  component: Select,
  args: {
    name:"weekDaysSelect",
    value: "4",
    onChange: (e:SelectItemProps) => {},
    disabled: false,
    label: "Week Day",
    layout: "vertical",
    id: "weekDaysSelect",
    customClass: "",
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
            "value": "Saturday"
        },
        {
            "key": "7",
            "value": "Sunday"
        }
    ]
  }
};

export const BasicSelect = ({onChange, ...args}:SelectProps) => {
    const [{value}, updateArgs] = useArgs();


    const handleOnChange = (e:SelectItemProps) => updateArgs({value: e.key});

    return <Select {...args} onChange={handleOnChange} />
}


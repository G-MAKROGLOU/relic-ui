import React from "react";
import { useArgs } from '@storybook/client-api';
import {   
    RadioResponse,
    RadioProps,
    Radio,
    Checkbox,
} from "../components/Inputs/Inputs";


export default {
  title: "Inputs/Radio",
  component: Radio,
  args: {
    name:"weekDaysRadio",
    value: "4",
    onChange: (e:RadioResponse) => {},
    alignment: "vertical",
    id: "weekDaysRadio",
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

export const BasicRadio = ({onChange, ...args}:RadioProps) => {
    const [{value}, updateArgs] = useArgs();


    const handleOnChange = (e:RadioResponse) => updateArgs({value: e.key});

    return <Radio {...args} onChange={handleOnChange} />
}


import React from "react";
import { useArgs } from '@storybook/client-api';
import {   
    NumberInputProps,
    NumberInput
} from "../components/Inputs/Inputs";


export default {
  title: "Inputs/NumberInput",
  component: NumberInput,
  args: {
    name:"age",
    value: "",
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => {},
    readOnly: false,
    disabled: false,
    label: "Age",
    placeholder: "i.e. 30",
    layout: "vertical",
    id: "age",
    customClass: ""
  }
};

export const BasicNumberInput = ({onChange, ...args}:NumberInputProps) => {
    const [{value}, updateArgs] = useArgs();


    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) => updateArgs({value: e.target.value});

    return <NumberInput {...args} onChange={handleOnChange} />
}


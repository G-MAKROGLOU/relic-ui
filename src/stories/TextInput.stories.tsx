import React from "react";
import { useArgs } from '@storybook/client-api';
import {  TextInput} from "../components/Inputs/Inputs";
import {
  TextInputProps
} from '../components/Inputs/Inputs.types'


export default {
  title: "Inputs/TextInput",
  component: TextInput,
  args: {
    name:"username",
    value: "",
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => {},
    readOnly: false,
    disabled: false,
    label: "Username",
    placeholder: "i.e. User1",
    layout: "vertical",
    id: "username",
    customClass: ""
  }
};

export const BasicTextInput = ({onChange, ...args}:TextInputProps) => {
    const [{value}, updateArgs] = useArgs();


    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) => updateArgs({value: e.target.value});

    return <TextInput {...args} onChange={handleOnChange} />
}


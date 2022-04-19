import React from "react";
import { useArgs } from '@storybook/client-api';
import {   
    PasswordInput
} from "../components/Inputs/Inputs";

import {
  PasswordInputProps
} from '../components/Inputs/Inputs.types'


export default {
  title: "Inputs/PasswordInput",
  component: PasswordInput,
  args: {
    name:"password",
    value: "",
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => {},
    readOnly: false,
    disabled: false,
    label: "Password",
    placeholder: "i.e. Password123!",
    layout: "vertical",
    id: "password",
    customClass: ""
  }
};

export const BasicPasswordInput = ({onChange, ...args}:PasswordInputProps) => {
    const [{value}, updateArgs] = useArgs();


    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) => updateArgs({value: e.target.value});

    return <PasswordInput {...args} onChange={handleOnChange} />
}


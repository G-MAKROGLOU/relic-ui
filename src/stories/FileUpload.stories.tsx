import React from "react";
import { useArgs } from '@storybook/client-api';
import {   
    FileUpload
} from "../components/Inputs/Inputs";

import {
  FileUploadProps
} from '../components/Inputs/Inputs.types'


export default {
  title: "Inputs/FileUpload",
  component: FileUpload,
  args: {
    onChange: (files:File[]) => {},
    allowMultiple: true,
    label: 'Select CSV',
    name: 'file-upload'
  }
};

export const BasicFileUpload = ({onChange, ...args}:FileUploadProps) => {
    const [{value}, updateArgs] = useArgs();


    const handleOnChange = (files:File[]) => {
        files.forEach(file => console.log(file))
    };

    return <FileUpload {...args} onChange={handleOnChange} />
}


import React from "react";
import {   
    FormProps,
    ValidationEmittedValue
} from "../components/Form/Form.types";

import {FormProvider, FormItem} from '../components/Form/Form'

import {Button} from '../components/Button/Button'



export default {
    title: "Form",
    component: FormProvider,
    args: {
      onSubmit: (data:any) => {
          console.log(data)
      },
      layout: "vertical"
    },
    parameters: {
        docs: { 
            source: { 
                type: 'code' 
            } 
        } 
    },
    argTypes: {
        layout: {
          options: ['horizontal', 'vertical'],
          control: { type: 'radio' },
        } 
    }
  };


  export const BasicForm = ({...args}:FormProps) => {

    let selectItems = [
        {key: '1', value: 'Item 1'},
        {key: '2', value: 'Item 2'}
    ]

    let checkboxItems = [
        {key: '1', value: 'Remember Me'},
        {key: '2', value: 'Log Out'}
    ]

    let radioItems = [
        {key: '1', value: 'Male'},
        {key: '2', value: 'Female'}
    ]


    const textInputValidation = (e:ValidationEmittedValue) => {
        let {target: {value}}:any = e 
        return new Promise((resolve, reject) => {
            if(/^[a-z]+$/.test(value)) resolve(true)
            reject("Only alphabetical characters")
        })
    }


    const numInputValidation = (e:ValidationEmittedValue) => {
        let {target: {value}}:any = e 
        return new Promise((resolve, reject) => {
            if(/^[0-9]{1,}(\.[0-9]+)?$/.test(value)) resolve(true)
            reject("Only numbers")
        })
    }


    const passInputValidation = (e:ValidationEmittedValue) => {
        let {target: {value}}:any = e 
        return new Promise((resolve, reject) => {
            if(/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/.test(value)) resolve(true)
            reject("At least 6 characters and must contain at least 1 upper case, 1 lower case and 1 number!")
        })
    }


    const selectValidation = (e:ValidationEmittedValue) => {
        let {target: {value}}:any = e 
        return new Promise((resolve, reject) => {
            if(value !== '') resolve(true)
            reject("An option is required!")
        })
    }


    const radioValidation = (e:ValidationEmittedValue) => {
        let {target: {value}}:any = e 
        return new Promise((resolve, reject) => {
            if(value !== '') resolve(true)
            reject("Gender is a required field!")
        })
    }


    const checkboxValidation = (e:ValidationEmittedValue):Promise<boolean> => {
        let {target: {value}}:any = e 
        let requiredValues:boolean[] = []
        return new Promise((resolve, reject) => {
            if(!value.length) reject("At least one option is required!")
            value.forEach((val:any) => {
                requiredValues.push(val)
            })
            resolve(true)
            
        })
    }



    const fileValidation = (e:ValidationEmittedValue):Promise<boolean> => {
        let {target: {value}}:any = e
        return new Promise((resolve, reject) => {
            if(!value || value.length === 0) reject("One or more files are required!")
            resolve(true)
        })
    }
    

    return <FormProvider {...args} >
            <div>
                <div style={{display: 'flex'}}>
                    <FormItem 
                        inputType="text"
                        label="Username" 
                        name="username" 
                        validation={textInputValidation}
                    />
                    <FormItem 
                        inputType="password"
                        label="Password" 
                        name="password" 
                        validation={passInputValidation}
                    />
                </div>
            </div>
            <div style={{display: 'flex'}}>
                <FormItem 
                    inputType="number"
                    label="Age" 
                    name="age" 
                    validation={numInputValidation}
                />
                <FormItem
                    inputType="select"
                    label="Option"
                    name="option"
                    items={selectItems}
                    validation={selectValidation}
                />
            </div>
            
            <FormItem
                inputType="checkbox"
                name="logoutOptions"
                items={checkboxItems}
                layout="horizontal"
                validation={checkboxValidation}
            />
            <FormItem
                inputType="radio"
                label="Gender"
                name="gender"
                items={radioItems}
                layout="horizontal"
                validation={radioValidation}
            />
            <FormItem
                inputType="file"
                label="Select File"
                name="fileUpload"
                validation={fileValidation}
                allowMultiple={false}
                allowDnD={true}
            />
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Button content="Submit" type="primary" buttonType="submit" />
            </div>
    </FormProvider>
}





export const BasicFormWithoutValidations = ({...args}:FormProps) => {

    let selectItems = [
        {key: '1', value: 'Item 1'},
        {key: '2', value: 'Item 2'}
    ]

    let checkboxItems = [
        {key: '1', value: 'Remember Me'},
        {key: '2', value: 'Log Out'}
    ]

    let radioItems = [
        {key: '1', value: 'Male'},
        {key: '2', value: 'Female'}
    ]



    return <FormProvider {...args} >
            <div>
                <div style={{display: 'flex'}}>
                    <FormItem 
                        inputType="text"
                        label="Username" 
                        name="username" 
                    />
                    <FormItem 
                        inputType="password"
                        label="Password" 
                        name="password" 
                    />
                </div>
            </div>
            <div style={{display: 'flex'}}>
                <FormItem 
                    inputType="number"
                    label="Age" 
                    name="age" 
                />
                <FormItem
                    inputType="select"
                    label="Option"
                    name="option"
                    items={selectItems}
                />
            </div>
            
            <FormItem
                inputType="checkbox"
                name="logoutOptions"
                items={checkboxItems}
                layout="horizontal"
            />
            <FormItem
                inputType="radio"
                label="Gender"
                name="gender"
                items={radioItems}
                layout="horizontal"
            />
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Button content="Submit" type="primary" buttonType="submit" />
            </div>
    </FormProvider>
}


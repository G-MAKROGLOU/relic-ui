import React from "react";
import {   
    FormProps,
    FormProvider,
    ValidationEmittedValue,
    FormItem
} from "../components/Form/Form";

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
        {key: '1', value: 'Remember me'},
        {key: '2', value: 'Log Out'}
    ]

    let radioItems = [
        {key: '1', value: 'Male'},
        {key: '2', value: 'Female'}
    ]


    const textInputValidation = (e:ValidationEmittedValue) => {
        let {target: {value}} = e 
        return new Promise((resolve, reject) => {
            if(/^[a-z]+$/.test(value)) resolve(true)
            reject("Only alphabetical characters")
        })
    }


    const numInputValidation = (e:ValidationEmittedValue) => {
        let {target: {value}} = e 
        return new Promise((resolve, reject) => {
            if(/^[0-9]+$/.test(value)) resolve(true)
            reject("Only numbers")
        })
    }


    const passInputValidation = (e:ValidationEmittedValue) => {
        let {target: {value}} = e 
        return new Promise((resolve, reject) => {
            if(/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/.test(value)) resolve(true)
            reject("At least 6 characters and must contain at least 1 upper case, 1 lower case and 1 number!")
        })
    }


    const selectValidation = (e:ValidationEmittedValue) => {
        let {target: {value}} = e 
        return new Promise((resolve, reject) => {
            if(value !== '') resolve(true)
            reject("An option is required!")
        })
    }


    const radioValidation = (e:ValidationEmittedValue) => {
        let {target: {value}} = e 
        return new Promise((resolve, reject) => {
            if(value !== '') resolve(true)
            reject("Gender is a required field!")
        })
    }


    const checkboxValidation = (e:ValidationEmittedValue):Promise<boolean> => {
        let {target: {value}} = e 
        let requiredValues:boolean[] = []
        return new Promise((resolve, reject) => {
            value.forEach((val:any) => {
                Object.values(val).forEach((v:any) => {
                    if(!v) requiredValues.push(v)
                })
            })
            if(requiredValues.length !== value.length) resolve(true)
            reject("One of Remember me or Log Out is required!")
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
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Button content="Submit" type="primary" buttonType="submit" />
            </div>
    </FormProvider>
}

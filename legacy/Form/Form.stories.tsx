// import React from "react";
// import { useArgs } from '@storybook/client-api';
// import {   
//     FormProps,
//     FormProvider,
//     FormItem,
//     useForm,
//     FormContext
// } from "../components/Form/Form";




// export default {
//   title: "Form",
//   component: FormProvider,
//   args: {
//     onSubmit: (data:any) => console.log(data),
//     buttonProps: {
//         content: "Submit Form",
//         fullWidth: true
//     }
//   }
// };

// export const BasicForm = ({...args}:FormProps) => {
//     const form = useForm()

//     console.log(form.formItemNames, form.validationRules, form.errors)
   
//     let selectItems = [
//         {key: '1', value: 'Item 1'},
//         {key: '2', value: 'Item 2'}
//     ]

//     let checkboxItems = [
//         {key: '1', value: 'Remember me'},
//         {key: '2', value: 'Log Out'}
//     ]

//     let radioItems = [
//         {key: '1', value: 'Male'},
//         {key: '2', value: 'Female'}
//     ]

//     return <FormProvider {...args} >
//             <FormItem 
//                 inputType="text"
//                 label="Username" 
//                 name="username" 
//                 validation={{
//                     required: {
//                         value: true,
//                         errorMessage: 'Username is required!', 
//                         successMessage: 'The username is valid'
//                     },
//                     regEx: {
//                         value: /^[a-z]+$/i,
//                         errorMessage: 'Username can contain alphabetical values only!', 
//                         successMessage: 'The username is valid!'
//                     }
//                 }}
//             />
//             <FormItem 
//                 inputType="password"
//                 label="Password" 
//                 name="password" 
//                 validation={{
//                     required: {
//                         value: true,
//                         errorMessage: 'Password is required!', 
//                         successMessage: 'The password is valid'
//                     },
//                     regEx: {
//                         value: /^[a-z]+[0-9]+[!@#$%^&*()]+$/i,
//                         errorMessage: 'Password can contain alphabetical values only!', 
//                         successMessage: 'The password is valid!'
//                     }
//                 }}
//             />
//             <FormItem 
//                 inputType="number"
//                 label="Age" 
//                 name="age" 
//                 validation={{
//                     required: {
//                         value: true,
//                         errorMessage: 'Age is required!', 
//                         successMessage: 'Age is valid'
//                     },
//                     regEx: {
//                         value: /^[0-9]+$/i,
//                         errorMessage: 'Age can contain numbers only!', 
//                         successMessage: 'Age is valid!'
//                     }
//                 }}
//             />
//             <FormItem
//                 inputType="select"
//                 label="Option"
//                 name="option"
//                 items={selectItems}
//                 validation={{
//                     required: {
//                         value: true,
//                         errorMessage: 'Option is required!', 
//                         successMessage: 'Option is valid'
//                     }
//                 }}
//             />
//             <FormItem
//                 inputType="checkbox"
//                 name="logoutOptions"
//                 items={checkboxItems}
//                 layout="horizontal"
//                 validation={{
//                     required: {
//                         value: true,
//                         errorMessage: 'Logout options are required!', 
//                         successMessage: 'Logout options are valid'
//                     }
//                 }}
//             />
//             <FormItem
//                 inputType="radio"
//                 label="Gender"
//                 name="gender"
//                 items={radioItems}
//                 layout="horizontal"
//                 validation={{
//                     required: {
//                         value: true,
//                         errorMessage: 'Gender is required!', 
//                         successMessage: 'Gender is valid'
//                     }
//                 }}
//             />
//     </FormProvider>
// }


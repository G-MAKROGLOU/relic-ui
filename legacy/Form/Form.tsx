import { CheckboxItemProps, RadioItemProps, SelectItemProps } from '../../src/components/Inputs/Inputs'
import {ButtonProps} from '../../src/components/Button/Button'


export type FormProps = {
    /**
     * The children of the form. If they are not FormItems nothing will actually happen when submitting the form.
     */
    children: React.ReactChildren | React.ReactChild[] | React.ReactChild,
    /**
     * The event listener for form submission. It gives access to a JSON object with
     * key-vale pairs of all the fields and their values.
     */
    onSubmit: (e:{}) => void,
    /**
     * Optional properties for the submission button. The submission button is attached to the Form and
     * you don't need to create it but you can customize it by passing any valid Button Prop
     */
    buttonProps: ButtonProps,
    /**
     * The layout of the form
     */
    layout: "horizontal" | "vertical"
}

export type Rule = {
    /**
     * The value of a rule can be a boolean for the required validation and a RegExp for the regEx validation.
     * Anything else will not work.
     */
    value: boolean | RegExp,
    /**
     * The success message of the rule
     */
    successMessage: string,
    /**
     * The error message of the rule
     */
    errorMessage: string
}

export type Validation = {
    /**
     * A validation rule to register a field as required.
     */
    required?: Rule,
    /**
     * A validation rule to test the field value against a RegEx. e.g /^[a-z]+$/i
     */
    regEx?: Rule
}


export type FormItemProps = {
    /**
     * A name for the corresponding input. It is required for the form to retrieve the field names
     * on submit
     */
    name: string;
    /**
     * The input type. The form item will render the corresponding input depending the type
     * that you will pass. Each form item accepts the properties of the underlying input. 
     */
    inputType: "text" | "number" | "radio" | "select" | "checkbox" | "password";
    /**
     * An object that describes the validation rules for the input. Select, Checkbox and Radio input types
     * will only adhere to the required rule.
     */
    validation?: Validation;
    /**
     * A label for the input. Checkbox and Radio will not render any label because they take their labels
     * from the json array that describes them.
     */
    label?: string;
    /**
     * The layout of the underlying input. For Checkbox and Radio this prop matches the alignment prop.
     */
    layout?: "vertical" | "horizontal";
    /**
     * Required only for Select, Checkbox, and Radio. Other inputs will ignore this prop.
     */
    items?: CheckboxItemProps[] | RadioItemProps[] | SelectItemProps[];
}



import React, { Ref } from 'react';
import {Button} from '../../src/components/Button/Button'
import * as Inputs from '../../src/components/Inputs/Inputs'


export const FormContext = React.createContext({})

export const FormProvider = React.forwardRef((props:FormProps, ref: Ref<HTMLFormElement>) => {

    const [formItemNames, setFormItemNames] = React.useState<any[]>([])
    const [validationRules, setValidationRules] = React.useState<any[]>([])
    const [errors, setErrors] = React.useState({})
    const [hasError, setHasError] = React.useState(false)

    React.useEffect(() => {
        // console.log(props.children)
        if(props?.children?.length){
            props.children.forEach((child:any) => {
                let name = child.props.name
                let rule = {
                    name,
                    validation: child.props.validation
                }
                setFormItemNames(prev => [...prev, child.props.name])
                setValidationRules(prev => [...prev, rule])
            })
        }else {
            let name = props.children.props.name;
            let rule = {
                name,
                validation: props.children.props.validation
            }
            setFormItemNames([props.children.props.name])
            setValidationRules([rule])
        }
            
        
       
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const localOnSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let target = e.target as HTMLFormElement;
        let formData = prepareFormData(target)
        if(isFormValid(formData)){ 
            if(props.onSubmit) await props.onSubmit(formData);
        }
    }


    const isFormValid = (formData:any) => {
        let nErrors = JSON.parse(JSON.stringify(errors))
        let canSubmit = 1;
        validationRules.forEach(rule => {
            if(rule.validation && rule.validation.required){
                if(rule.validation.required.value){

                    if(Array.isArray(formData[rule.name])){
                        let allValues:any[] = []
                        formData[rule.name].forEach((val:any) => {
                            allValues.push(...Object.values(val))
                        })
                        if(!allValues.includes(true)){
                            nErrors[rule.name].hasError = true;
                            nErrors[rule.name].message = rule.validation.required.errorMessage
                        }else{
                            nErrors[rule.name].hasError = false;
                            nErrors[rule.name].message = rule.validation.required.successMessage
                        }
                    }else{
                        if(formData[rule.name] === ''){
                            nErrors[rule.name].hasError = true;
                            nErrors[rule.name].message = rule.validation.required.errorMessage
                            canSubmit++;
                        }else{
                            nErrors[rule.name].hasError = false;
                            nErrors[rule.name].message = rule.validation.required.successMessage
                        }
                    }
                }
            }
        })
        setErrors(nErrors)
        setHasError(canSubmit === validationRules.length)
        setTimeout(() => setHasError(false), 500);
        return canSubmit === 1 ? true : validationRules.length === canSubmit;
        
    }


    const prepareFormData = (form:HTMLFormElement) => {
        let obj:any = {}
        formItemNames.forEach(name => {
            if(form[name].length && form[name][0].type === 'checkbox'){
                obj[name] = []
                form[name].forEach(item => {
                    if(item.type === 'checkbox'){
                        obj[name].push({[item.id]: item.checked})
                    }
                })
            }
            else if(form[name].type === 'checkbox')
                obj[name] = form[name].checked
            else
                obj[name] = form[name].value
        })
        return obj;
    }

    return (
        <FormContext.Provider value={{
            formItemNames, setFormItemNames,
            validationRules, setValidationRules,
            errors, setErrors,
        }}>
             <form ref={ref} className={hasError ? 'relic-form-error' : ''} style={{display: 'flex', flexDirection: props.layout === 'horizontal' ? 'row' : 'column', alignItems: 'center', justifyContent:  props.layout === 'vertical' ? 'flex-start' : ''}} onSubmit={localOnSubmit}>
                {props.children}
                <div style={{width: '100%'}}>
                    <Button {...props.buttonProps} buttonType="submit"/>
                </div>
            </form>  
        </FormContext.Provider>
    )
})

export const useForm = () => {
    let formContext = React.useContext(FormContext)
    if(!formContext) throw new Error("A form provider was not found")
    return formContext
}


export const FormItem = ({
    name,
    inputType,
    validation,
    label,
    layout,
    items
}:FormItemProps) => {
    const {setErrors, errors} = React.useContext(FormContext)
    const [hasError, setHasError] = React.useState(false)
    const [message, setMessage] = React.useState('')

    const styles = {
        inputMessage: {
            textAlign: 'center',
            maxWidth: 280, 
            color: hasError ? 'tomato' : 'lightgreen', 
            fontFamily: 'Open Sans, sans-serif', 
            fontSize: 12
        }
    }

    
    React.useEffect(() => {
        setErrors(prev => {
            let nValue = prev;
            nValue[name] = {
                hasError: false,
                message: '' 
            }
            return nValue;
        })
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        setHasError(errors[name].hasError)
        setMessage(errors[name].message)
    }, [errors])


   

    const localOnChange = e => {
        if(validation){
            if(validation.required){
                if(validation.required.value){
                    if(e.target){
                        if(e.target.value === ''){
                            setHasError(true)
                            setMessage(validation.required.errorMessage)
                            setErrors(prev => {
                                let nValue = prev;
                                nValue[name] = {
                                    hasError: true,
                                    message: validation.required.errorMessage 
                                }
                                return nValue;
                            })
                            return
                        }else{
                            setHasError(false)
                            setMessage(validation.required.successMessage)
    
                            setErrors(prev => {
                                let nValue = prev;
                                nValue[name] = {
                                    hasError: false,
                                    message: validation.required.successMessage
                                }
                                return nValue;
                            })
                        }
                        if(validation.regEx){
                            if(!validation.regEx.value.test(e.target.value)){
                                setHasError(true)
                                setMessage(validation.regEx.errorMessage)
        
                                setErrors(prev => {
                                    let nValue = prev;
                                    nValue[name] = {
                                        hasError: true,
                                        message: validation.regEx.errorMessage
                                    }
                                    return nValue;
                                })
                            }else{
                                setHasError(false)
                                setMessage(validation.regEx.successMessage)
        
                                setErrors(prev => {
                                    let nValue = prev;
                                    nValue[name] = {
                                        hasError: false,
                                        message: validation.regEx.successMessage
                                    }
                                    return nValue;
                                })
                            }
                        }
                    }
                    
                }
            }
        }
    }
    
    if(inputType === 'text'){
        return <div style={{margin: '10px 0'}}>
            <Inputs.TextInput 
                onChange={localOnChange} 
                name={name} 
                label={label} 
                layout={layout} 
            /> 
            <div style={styles.inputMessage}>{message}</div> 
        </div>
    }

    if(inputType === 'number'){
        return <div style={{margin: '10px 0'}}>
            <Inputs.NumberInput 
                onChange={localOnChange} 
                name={name} 
                label={label} 
                layout={layout} 
            />  
            <div style={styles.inputMessage}>{message}</div> 
        </div>
    }


    if(inputType === 'password'){
        return <div style={{margin: '10px 0'}}>
            <Inputs.PasswordInput 
                onChange={localOnChange} 
                name={name} 
                label={label} 
                layout={layout} 
            />  
            <div style={styles.inputMessage}>{message}</div> 
        </div>
    }

    if(inputType === 'select'){
        return <div style={{margin: '10px 0'}}>
            <Inputs.Select label={label} name={name} items={items} />
            <div style={styles.inputMessage}>{message}</div>
        </div>
    }


    if(inputType === 'checkbox'){
        return <div style={{margin: '10px 0'}}>
                <Inputs.Checkbox label={label} name={name} items={items} alignment={layout} />
                <div style={styles.inputMessage}>{message}</div>
            </div>
    }

    if(inputType === 'radio'){
        return <div style={{margin: '10px 0'}}>
                <Inputs.Radio label={label} name={name} items={items} alignment={layout} />
                <div style={styles.inputMessage}>{message}</div>
            </div>
    }

    return null;
}


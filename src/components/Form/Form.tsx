import { CheckboxItemProps, RadioItemProps, SelectItemProps } from '../Inputs/Inputs'
import {ButtonProps} from '../Button/Button'


export type FormProviderProps = {
    setFormItems?: (arr:string[]) => void;
    formValidations?: any[];
    addRefsToFormValidations?: (name:string, ref:React.Ref<any>) => void;
    errors?: {};
    setErrors?: (errors:any[]) => void;
    updateErrors?: (name:string) => void;
    hasErrors?: boolean;
    setHasErrors?: (hasErrors:boolean) => void;
    formItems?: any[];
    formItemNames?: string[]
    setFormItemsNames?: (names:string[]) => void;
    form?: React.Ref<HTMLFormElement>;
}


export type FormProps = {
    /**
     * The children of the form. Can be FormItems either directly put inside the FormProvider or nested inside other elements 
     * for custom form layouts. Doing this will override the layout prop.
     */
    children: React.ReactNode,
    /**
     * The event listener for form submission. It gives access to a JSON object with
     * key-vale pairs of all the fields and their values.
     */
    onSubmit: (e:{}) => void,
    /**
     * The layout of the form. Horizontal is ideal for small top page forms while vertical is more suited for forms inside drawers, modals etc.
     */
    layout: "horizontal" | "vertical"

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
     * A function that gives access to the value in order to validate as you want
     */
    validation?: (e:any) => Promise<any>;
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



export type ValidationEmittedValue = {
    target: {}
}


export type NameWithValidation = {
    name: string;
    validation: Function,
    ref?: React.Ref<any>
}

import React from 'react';
import * as Inputs from '../Inputs/Inputs'


export const FormContext = React.createContext<FormProviderProps>({})


/**
 * A Form with FormItems that can be nested and styled inside other elements for custom layout.
 * Relic uses the ContextAPI for the forms to communicate with their FormItems and vice-versa.
 * By default FormItems will try to reach the closes FormProvider they are in.
 * 
 * import {FormProvider, FormItem} from 'relic-ui'
 */
export class FormProvider extends React.Component<FormProps, FormProviderProps> {

    constructor(props:FormProps){
        super(props)
        
    }

    
    form = React.createRef<HTMLFormElement>()

    setFormItems = (items:React.ReactNode[]):void => {
        this.setState({formItems: items})
    }

    setHasErrors = (hasErrors:boolean):void => {
        this.setState({hasErrors})
    }



    addRefsToFormValidations = (name:string, ref: React.Ref<any>) => {
        this.setState((prev:any) => {
            let nValues = prev;
            nValues.formValidations.forEach((val:NameWithValidation) => {
                if(val.name === name) val.ref = ref;
            })
            return {formValidations: nValues.formValidations}
        })
    }


    setErrors = (errors:any[]):void => {
        if(errors.length === 0){
            this.setState({errors: {}})
            return
        }
        errors.forEach(err => {
            this.setState((prev:any) => {
                let nValues = prev;
                nValues.errors[err.name] = err.error
                return nValues
            })
        })
    }


    updateErrors = (name:string) => {
        this.setState((prev:any) => {
            let nValue = prev;
            nValue.errors[name] = ''
            return nValue;
        })
    }


    state:FormProviderProps = {
        setFormItems: this.setFormItems,
        formValidations: [],
        addRefsToFormValidations: this.addRefsToFormValidations,
        errors: {},
        setErrors: this.setErrors,
        updateErrors: this.updateErrors,
        hasErrors: false,
        setHasErrors: this.setHasErrors,
        formItems: [],
        formItemNames: [],
        form: this.form
    }
    


    componentDidMount(){
        let itemsArr:React.ReactNode[] = []
        let validationsArr:NameWithValidation[] = []
        let namesArr:string[] = []
        this.findFormItems(itemsArr, this.props.children)
        this.gatherValidations(validationsArr, itemsArr)
        this.findFormItemNames(namesArr, itemsArr);
        this.setState({formValidations: validationsArr})
        this.setState({formItemNames: namesArr})
    }


    localOnSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let target = e.target as HTMLFormElement;
        let formData = this.prepareFormData(target)
        try{
            let isValid = await this.isFormValid(formData)
            if(isValid){
                if(this.props.onSubmit) await this.props.onSubmit(formData);
                return
            }
            this.setState({hasErrors: true})
            
        }catch(err:any){
            this.setState({hasErrors: true})
        }
    }


    prepareFormData = (form:HTMLFormElement | null) => {
        if(form !== null){
            let obj:any = {}
            this.state?.formItemNames?.forEach(name => {
                if(form[name].length && form[name][0].type === 'checkbox'){
                    obj[name] = []
                    form[name].forEach((item:any) => {
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
        
    }


    isFormValid = async (formData:any):Promise<boolean> => {
        let data = this.prepareFormData(this.form.current);
        let promises:Promise<boolean>[] = []

        this.state!.formValidations!.forEach((nv:NameWithValidation) => {   
           promises.push(nv.validation.bind(this, {target: {value: data[nv.name]}}).call())
        })
        let errors:any[] = [];

        let results = await Promise.allSettled(promises)
        
        results.forEach((res, id) => {
            if(res.status === 'rejected'){
                if(this.state.formValidations){
                    errors.push({name: this.state.formValidations[id].name, error: res.reason})
                    this.setState({hasErrors: true})
                    if(this.state.formValidations[id].ref.current){
                        this.state.formValidations[id].ref.current.style.border = "1px solid tomato"
                        this.state.formValidations[id].ref.current.style.outline = "1px solid rgba(255, 0, 0, .3)"
                    }
                }
            }
        })
        this.setErrors(errors)
        
        return errors.length === 0
    }


    gatherValidations = (arr:NameWithValidation[], formItems:React.ReactNode[]) => {
        formItems.forEach((item:React.ReactNode) => {
            let nameValidation:NameWithValidation = {
                name: item!.props.name, 
                validation: item!.props.validation
            }
            arr.push(nameValidation)
        })
    }


    findFormItems = (arr:React.ReactNode[], children:React.ReactNode) => {
        if(Array.isArray(children)){
            for(let i = 0; i < children.length; i++){
                if(typeof children[i].type === 'string'){
                    this.findFormItems(arr, children[i].props.children)
                }else{
                    if(children[i].type.displayName === 'FormItem'){
                        arr.push(children[i])
                    }else{
                        this.findFormItems(arr, children[i].props.children)
                    }
                }
            }
        }
        else if(typeof children === 'object'){
            if(typeof children?.type === 'string'){
                this.findFormItems(arr, children.props.children)
            }else{
                if(children?.type.displayName === 'FormItem'){
                    arr.push(children)
                }else{
                    this.findFormItems(arr, children?.props.children)
                }
            }
        }
    }


    findFormItemNames = (namesArr:string[], formItems:React.ReactNode[]) => {
        formItems.forEach((item:React.ReactNode) => {
            namesArr.push(item!.props.name)
        })
    }


    render(){
        return (
            <FormContext.Provider value={this.state}>
                <form 
                    ref={this.form} 
                    onSubmit={this.localOnSubmit}
                    className={this.state.hasErrors ? 'relic-form-error' : ''} style={{display: 'flex', flexDirection: this.props.layout === 'horizontal' ? 'row' : 'column', alignItems: 'center', justifyContent:  this.props.layout === 'vertical' ? 'flex-start' : ''}}
                >
                    {this.props.children}
                </form>
            </FormContext.Provider>
        )
    }
}




export const FormItem = ({name, inputType, validation, label, layout, items}:FormItemProps) => {
    let context = React.useContext(FormContext)
    let ref = React.useRef<any>(null)

    const localOnChange = (e:any) => {
        if(context.setHasErrors){
            context.setHasErrors(false)
        }
        if(context.updateErrors){
            context.updateErrors(name)
        }
        if(context.formValidations){
            context.formValidations.forEach(fv => {
                if(fv.name === name && fv.ref.current){
                    fv.ref.current.style.border = ""
                    fv.ref.current.style.outline = ""
                }
            })
        }
    }

    const inputMessage = {
        opacity: context.hasErrors ? 1 : 0,
        textAlign: 'center',
        color: 'tomato', 
        fontFamily: 'Open Sans, sans-serif', 
        fontSize: 12,
        marginTop: 2,
        width: 300,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'no-wrap'
        
    }

    React.useEffect(() => {
        if(context.addRefsToFormValidations){
            context.addRefsToFormValidations(name, ref)
        }
    }, 
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [])

    if(inputType === 'text'){
        return <div style={{margin: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Inputs.TextInput 
                name={name} 
                label={label} 
                layout={layout} 
                onChange={localOnChange}
                ref={ref}
                
            /> 
            <div className="relic-form-item-error-message" style={inputMessage as React.CSSProperties}>{context!.errors[name]}</div> 
        </div>
    }

    if(inputType === 'number'){
        return <div style={{margin: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Inputs.NumberInput 
                name={name} 
                label={label} 
                layout={layout} 
                onChange={localOnChange}
                ref={ref}
            />  
            <div className="relic-form-item-error-message" style={inputMessage as React.CSSProperties}>{context!.errors[name]}</div> 
        </div>
    }


    if(inputType === 'password'){
        return <div style={{margin: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
            <Inputs.PasswordInput  
                name={name} 
                label={label} 
                layout={layout} 
                onChange={localOnChange}
                ref={ref}
            />  
            <div className="relic-form-item-error-message" style={inputMessage as React.CSSProperties}>{context!.errors[name]}</div>
        </div>
    }

    if(inputType === 'select'){
        return <div style={{margin: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Inputs.Select
                 label={label} 
                 name={name} 
                 items={items}
                 onChange={localOnChange} 
                 ref={ref}
            />
            <div className="relic-form-item-error-message" style={inputMessage as React.CSSProperties}>{context!.errors[name]}</div>
        </div>
    }


    if(inputType === 'checkbox'){
        return <div style={{margin: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Inputs.Checkbox 
                    label={label} 
                    name={name} 
                    items={items}
                    alignment={layout}
                    onChange={localOnChange}
                />
                <div className="relic-form-item-error-message" style={inputMessage as React.CSSProperties}>{context!.errors[name]}</div>
            </div>
    }

    if(inputType === 'radio'){
        return <div style={{margin: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <Inputs.Radio 
                    label={label} 
                    name={name} 
                    items={items} 
                    alignment={layout}
                    onChange={localOnChange} 
                />
                <div className="relic-form-item-error-message" style={inputMessage as React.CSSProperties}>{context!.errors[name]}</div>
            </div>
    }

    return null
}



    

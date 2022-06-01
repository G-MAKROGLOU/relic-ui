import {
    FormProviderProps,
    FormProps,
    NameWithValidation,
    FormItemProps
} from './Form.types'



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


    setFormValues = (name:string, e:any) => {
        this.setState((prev:any) => {
            let nValue = prev;
            if(Array.isArray(e)) nValue.formValues[name] = e
            if(e.target) nValue.formValues[name] = e.target.value
            if(e.value) nValue.formValues[name] = e.value
            console.log(nValue.formValues)
            return nValue;
        });
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
        form: this.form,
        formValues: {},
        setFormValues: this.setFormValues
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
        try{
            let isValid = await this.isFormValid()
            if(isValid){
                if(this.props.onSubmit) await this.props.onSubmit(this.state.formValues);
                return
            }
            this.setState({hasErrors: true})
            
        }catch(err:any){
            this.setState({hasErrors: true})
        }
    }



    isFormValid = async ():Promise<boolean> => {
        if(this!.state!.formValidations!.length === 0) return true;
        let data = this.state.formValues
        let promises:Promise<boolean>[] = []

        this.state!.formValidations!.forEach((nv:NameWithValidation) => {  
            let value = ''
            if(data[nv.name]) value = data[nv.name]
            promises.push(nv.validation.bind(this, {target: {value}}).call())
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
            if(React.isValidElement(item) && item.props.validation){
                let nameValidation:NameWithValidation = {
                    name: item!.props.name, 
                    validation: item!.props.validation
                }
                arr.push(nameValidation)
            }
        })
    }


    findFormItems = (arr:React.ReactNode[], children:React.ReactNode) => {
        React.Children.map(children, child => {
            if(React.isValidElement(child)){
                if(child.props.children){
                    this.findFormItems(arr, child.props.children)
                }else{
                    if(!child.props.buttonType)
                        arr.push(child)
                }
            }
        })
    }


    findFormItemNames = (namesArr:string[], formItems:React.ReactNode[]) => {
        formItems.forEach((item:React.ReactNode) => {
            if(React.isValidElement(item) && item.props.name !== undefined)
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




export const FormItem = ({name, inputType, validation, label, layout, items, allowDnD, allowMultiple}:FormItemProps) => {
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
        if(context.setFormValues){        
            context.setFormValues(name, e)
        }
    }

    const inputMessage = {
        opacity: context.hasErrors ? 1 : 0 
    }

    React.useEffect(() => {
        if(context.addRefsToFormValidations){
            context.addRefsToFormValidations(name, ref)
        }
    }, 
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [])

    if(inputType === 'text'){
        return <div className="relic-form-items">
            <Inputs.TextInput 
                name={name} 
                label={label} 
                layout={layout} 
                onChange={localOnChange}
                ref={ref}
                
            /> 
            <div className="relic-form-item-error-message" style={inputMessage as React.CSSProperties}>{context!.errors![name]}</div> 
        </div>
    }

    if(inputType === 'number'){
        return <div className="relic-form-items">
            <Inputs.NumberInput 
                name={name} 
                label={label} 
                layout={layout} 
                onChange={localOnChange}
                ref={ref}
            />  
            <div className="relic-form-item-error-message" style={inputMessage as React.CSSProperties}>{context!.errors![name]}</div> 
        </div>
    }


    if(inputType === 'password'){
        return <div className="relic-form-item-password">
            <Inputs.PasswordInput  
                name={name} 
                label={label} 
                layout={layout} 
                onChange={localOnChange}
                ref={ref}
            />  
            <div className="relic-form-item-error-message" style={inputMessage as React.CSSProperties}>{context!.errors![name]}</div>
        </div>
    }

    if(inputType === 'select'){
        return <div className="relic-form-items">
            <Inputs.Select
                 label={label} 
                 name={name} 
                 items={items}
                 onChange={localOnChange} 
                 ref={ref}
            />
            <div className="relic-form-item-error-message" style={inputMessage as React.CSSProperties}>{context.errors![name]}</div>
        </div>
    }


    if(inputType === 'checkbox'){
        return <div className="relic-form-items">
                <Inputs.Checkbox 
                    label={label} 
                    name={name} 
                    items={items}
                    alignment={layout}
                    onChange={localOnChange}
                />
                <div className="relic-form-item-error-message" style={inputMessage as React.CSSProperties}>{context.errors![name]}</div>
            </div>
    }

    if(inputType === 'radio'){
        return <div className="relic-form-items">
                <Inputs.Radio 
                    label={label} 
                    name={name} 
                    items={items} 
                    alignment={layout}
                    onChange={localOnChange} 
                />
                <div className="relic-form-item-error-message" style={inputMessage as React.CSSProperties}>{context.errors![name]}</div>
            </div>
    }



    if(inputType === 'file'){
        return <div className="relic-form-items">
            <Inputs.FileUpload 
                name={name} 
                label={label!} 
                onChange={localOnChange}
                ref={ref}
                allowDnD={allowDnD}
                allowMultiple={allowMultiple}
            />  
            <div className="relic-form-item-error-message" style={inputMessage as React.CSSProperties}>{context!.errors![name]}</div> 
        </div>
    }

    return null
}

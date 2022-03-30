import React from "react";
import {FaChevronDown, FaEyeSlash, FaEye} from 'react-icons/fa'

export type TextInputProps = {
    /**
     * An optional name for the input. In independent inputs it does not make any difference
     * but this prop is required in order to be passed down when the input is used in forms
     */
    name?:string;
    /**
     * The value of the input. This leads to a controlled input that requires an implementation
     * of the onChange event listener
     */
    value?: string;

    /**
     * The event listener to perform a certain action when the user types in the input. One of 
     * the actions has to be the update of the value
     */
    onChange?: (
        event: React.ChangeEvent<HTMLInputElement>
      ) => void;

      /**
       * A style to override the default 
       */
    style?: React.CSSProperties;

    /**
     * Turns the input into a read only field
     */
    readOnly?: boolean;

    /**
     * Disables the field
     */
    disabled?: boolean;

    /**
     * A label for the field. It is optional and it will change position according to the layout.
     */
    label?: string;

    /**
     * An optional placeholder for the input field
     */
    placeholder?: string;

    /**
     * The layout of the field when it has a label. If no label is provided then no noticable change will happen
     */
    layout?: "vertical" | "horizontal",

    /**
     * An optional id to pass directly to the input instead of controlling it through the state.
     * Suitable for uncontrolled inputs
     */
    id?: string;

    /**
     * An optional className to pass to the input to override its' style
     */
    customClass?: string;
}




export type PasswordInputProps = {
    /**
    * An optional name for the input. In independent inputs it does not make any difference
    * but this prop is required in order to be passed down when the input is used in forms
    */
    name?:string;
   /**
    * The value of the input. This leads to a controlled input that requires and implementation
    * of the onChange event listener
    */
   value?: string;

   /**
    * The event listener to perform a certain action when the user types in the input. One of 
    * the actions has to be the update of the value
    */
   onChange?: (
       event: React.ChangeEvent<HTMLInputElement>
     ) => void;

     /**
      * A style to override the default 
      */
   style?: React.CSSProperties;

   /**
    * Turns the input into a read only field
    */
   readOnly?: boolean;

   /**
    * Disables the field
    */
   disabled?: boolean;

   /**
    * A label for the field. It is optional and it will change position according to the layout.
    */
   label?: string;

   /**
    * An optional placeholder for the input field
    */
   placeholder?: string;

   /**
    * The layout of the field when it has a label. If no label is provided then no noticable change will happen
    */
   layout?: "vertical" | "horizontal";

   /**
    * An optional id to pass directly to the input instead of controlling it through the state.
    * Suitable for uncontrolled inputs
    */
   id?: string;

   /**
    * An optional className to pass to the input to override its' style
    */
   customClass?: string;

}



export type NumberInputProps = {
    /**
    * An optional name for the input. In independent inputs it does not make any difference
    * but this prop is required in order to be passed down when the input is used in forms
    */
     name?:string;
   /**
    * The value of the input. This leads to a controlled input that requires and implementation
    * of the onChange event listener
    */
   value?: number;

   /**
    * The event listener to perform a certain action when the user types in the input. One of 
    * the actions has to be the update of the value
    */
   onChange?: (
       event: React.ChangeEvent<HTMLInputElement>
     ) => void;

     /**
      * A style to override the default 
      */
   style?: Object;

   /**
    * Turns the input into a read only field
    */
   readOnly?: boolean;

   /**
    * Disables the field
    */
   disabled?: boolean;

   /**
    * A label for the field. It is optional and it will change position according to the layout.
    */
   label?: string;

   /**
    * An optional placeholder for the input field
    */
   placeholder?: string;

   /**
    * The layout of the field when it has a label. If no label is provided then no noticable change will happen
    */
   layout?: "vertical" | "horizontal";

    /**
    * An optional id to pass directly to the input instead of controlling it through the state.
    * Suitable for uncontrolled inputs
    */
    id?: string;

    /**
     * An optional className to pass to the input to override its' style
     */
    customClass?: string;
}



export type SelectItemProps = {
    key: string,
    value: string
}

export type SelectProps = {
    /**
     * An optional name for the input. In independent inputs it does not make any difference
     * but this prop is required in order to be passed down when the input is used in forms
     */
     name?:string;
    /**
     * The items to be passed to the select for rendering. 
     * An item should have the form of {key: '', value: ''}.
     * The value is for the rendering while the key for indexing.
     */
    items: SelectItemProps[];

    /**
     * The value of the selected element. This is going to be the key of an item
     * pointing to the value
     */
    value?: string | number;

    /**
     * The label of the select dropdown
     */
    label?: string;

    /**
     * An id ideal for uncontrolled variant. When using id with the select input 
     * the value can be retrieved through the innerText or innerHTML properties.
     */
    id?: string;

    /**
     * A custom class to change the looks of the input. The class has to contain the above three rules 
     * in order to display the arrow properly:
     * 1) display: flex;
     * 2) align-items: center;
     * 3) justify-content: space-between
     */
    customClass?: string;

    /**
     * An event listener to be passed in order to control the input through 
     * some kind of state or context. This gives access to the whole object
     * {key: '', value: ''} from which you can use the key to update the state
     * of the Select and the value to do anything you want with it.
     */
    onChange?: (
        event: SelectItemProps
      ) => void;


    /**
     *Wether the input should be disabled or not 
     */
    disabled?: boolean;

     /**
    * The layout of the field when it has a label. If no label is provided then no noticable change will happen
    */
    layout?: "horizontal" | "vertical";
}


export type RadioResponse = {
    key: number,
    value: string,
    disabled?: boolean
}

export type RadioItemProps = {
    key:string,
    value:string,
    disabled: boolean
}

export type RadioProps = {
    /**
     * The items to be passed to the radio group for rendering. 
     * An item should have the form of {key: '', value: ''}.
     * The value is for the rendering while the key for indexing.
     */
    items: RadioItemProps[];

    /**
     * The value of the checked element. This is going to be the key of an item
     * pointing to the value
     */
    value?: string | number;

    /**
     * An event listener to be passed in order to control the input through 
     * some kind of state or context. It gives access to the whole selected radio
     * item to use the key in order to update the state and the rest of the values 
     * for anything you might need.
     */
    onChange?: (
        event: RadioResponse
      ) => void;

    /**
     * How to layout the radio buttons
     */
    alignment?: "vertical" | "horizontal";

    /**
     * The name of the radio group.
     */
    name: string;

    /**
     * The alignment of the label of each radio button
     */
    alignLabel?: "left" | "right";
}





export type CheckboxItemProps = {
    key: string,
    value: string,
    disabled:boolean
}

export type CheckboxProps = {
    /**
     * The items to be passed to the checkbox group for rendering. 
     * An item should have the form of {key: '', value: ''}.
     * The value is for the rendering while the key for indexing.
     */
    items: CheckboxItemProps[];

    /**
     * The values of the selected element. This is going to be an array of keys of the checked items
     * pointing to their values
     */
    values?: any[];

    /**
    * An event listener to be passed in order to control the input through 
    * some kind of state or context
    */
    onChange?: (
        selected: CheckboxItemProps[]
      ) => void;

      
    /**
    * How to layout the checkobox group
    */
    alignment?: "vertical" | "horizontal";

    /**
    * The name of the checkbox group.
    */
    name: string;

    /**
    * The alignment of the label of each checkbox
    */
    alignLabel?: "left" | "right";
}



/**
 * A styled text input based on the native input type="text" HTML element
 */
export const TextInput = React.forwardRef(( {
    value,
    onChange,
    style,
    readOnly=false,
    disabled=false,
    label="",
    placeholder="",
    layout="horizontal",
    id,
    customClass,
    name
}: TextInputProps, ref: React.Ref<HTMLInputElement>) => {


    const inputProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> = {
        style: style ? style : {},
        type: 'text',
        placeholder,
        disabled,
        readOnly,
        id,
        className: customClass ? customClass : 
                   readOnly ? 'relic-input-read-only' : 
                   disabled ? 'relic-input-disabled' : 'relic-input',
        name: name ? name : ''
    }

    const localOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(onChange) onChange(e)
    }

    if(value === undefined){
        inputProps.onChange = localOnChange
    }


    if(value !== undefined){    
        inputProps.value = value
        inputProps.onChange = onChange
    }


    return (
        <div style={{display: 'flex', flexDirection: layout === 'vertical' ? 'column' : 'row', alignItems: layout === 'horizontal'? 'center' : '', justifyContent: 'space-between', width: 270}}>
            <label style={{fontSize: 13, marginRight: 5, fontFamily: 'Open Sans, sans-serif'}}>{label}</label>
            <input ref={ref} {...inputProps}/>
        </div>
    )
    
})

/**
 * A styled text input based on the native input type="text" HTML element
 */
export const PasswordInput = React.forwardRef(( {
    value,
    onChange,
    style,
    readOnly=false,
    disabled=false,
    label="",
    placeholder="",
    layout="horizontal",
    id,
    customClass,
    name
}: PasswordInputProps, ref: React.Ref<HTMLInputElement> ) => {
    const [isVisible, setVisible] = React.useState(false)

    const styles = {
        passwordWrapper: {
            display: 'flex', 
            alignItems: 'flex-end', 
            width: 270
        },
        formControl: {
            display: 'flex', 
            flexDirection: layout === 'vertical' ? 'column' : 'row', 
            alignItems: layout === 'horizontal'? 'center' : '', 
            fontFamily: 'Open Sans, sans-serif', 
            justifyContent: 'space-between'
        }
    }

    const inputProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> = {
        style: style ? style : {},
        type: isVisible ? 'text' : 'password',
        placeholder,
        disabled,
        readOnly,
        id,
        className: style ? '' : 
                   customClass ? customClass : 
                   readOnly ? 'relic-input-password-read-only' : 
                   disabled ? 'relic-input-password-disabled' : 'relic-input-password',
        name: name ? name : ''
    }

    const localOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(onChange) onChange(e)
    }

    if(value === undefined){
        inputProps.onChange = localOnChange
    }


    if(value !== undefined){    
        inputProps.value = value
        inputProps.onChange = onChange
    }


    return (
        <div style={styles.passwordWrapper}>
            <div style={styles.formControl as React.CSSProperties}>
                <label style={{fontSize: 13, marginRight: 5}}>{label}</label>
                <input ref={ref} {...inputProps}/>
            </div>
            <span onClick={() => setVisible(!isVisible)} style={{padding: 5, cursor: 'pointer'}}>
                {isVisible ? <FaEyeSlash className="relic-password-icon"/> : <FaEye className="relic-password-icon"/>}
            </span>
        </div>
    )
})


/**
 * A styled number input based on the native input type="number" HTML element
 */
export const NumberInput = React.forwardRef( ({
    value,
    onChange,
    style,
    readOnly=false,
    disabled=false,
    label="",
    placeholder="",
    layout="horizontal",
    id,
    customClass,
    name
}: NumberInputProps, ref: React.Ref<HTMLInputElement> ) => {

    const inputProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> = {
        style: style ? style : {},
        type: 'number',
        placeholder,
        disabled,
        readOnly,
        id,
        className: style ? '' : 
                   customClass ? customClass : 
                   readOnly ? 'relic-input-read-only' : 
                   disabled ? 'relic-input-disabled' : 'relic-input',
        name: name ? name : ''
    }

    const localOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(onChange) onChange(e)
    }

    if(value === undefined){
        inputProps.onChange = localOnChange
    }

    if(value !== undefined){
        inputProps.value = value
        inputProps.onChange = onChange
    }


    return (
        <div style={{display: 'flex', flexDirection: layout === 'vertical' ? 'column' : 'row', alignItems: layout === 'horizontal'? 'center' : '', fontFamily: 'Open Sans, sans-serif', justifyContent: 'space-between', width: 260}}>
            <label style={{fontSize: 13, marginRight: 5}}>{label}</label>
            <input ref={ref} {...inputProps}/>
        </div>
    )
    
})


/**
 * A custom select menu similar to native select HTML element but with styles
 */
export const Select = React.forwardRef( ({
    items,
    value,
    onChange,
    id,
    customClass,
    disabled,
    label,
    layout="horizontal",
    name
}: SelectProps, ref: React.Ref<HTMLDivElement>  ) => {
    const [activeClass, setActiveClass] = React.useState('relic-select')
    const [iconClass, setIconClass] = React.useState('')
    const [itemsContainerClass, setItemsContainerClass] = React.useState('')
    const [innerStateValue, setInnerStateValue] = React.useState('')
    const selectRef = React.useRef<any>()


    React.useEffect(() => {

        function handleClickAway(this:Document, e:MouseEvent) {
            let target = e.target as HTMLElement;
            if(selectRef.current && !selectRef.current.contains(target)){
                setActiveClass('relic-select')
                setIconClass('')
                setItemsContainerClass('')
            }
        }

        document.addEventListener('mousedown', handleClickAway)

        return () => {
            document.removeEventListener('mousedown', handleClickAway)
        }
    }, [])

    const onClick = (e:React.MouseEvent<HTMLDivElement>) => {
        if(!disabled){
            setActiveClass('relic-select-focus')
            setIconClass('relic-select-icon-rotate-up')
            setItemsContainerClass('relic-select-input-items-expand')
        }
    }

    const onItemClick = (e:any) => {
        let reactFiberNodeKey = Object.keys(e.target)[0]
        let itemKey = e.target[reactFiberNodeKey].key;
        items.forEach((item:any )=> {
            if(item.key.toString() === itemKey.toString()){
                setInnerStateValue(item.value)
                if(onChange) onChange(item)
                setActiveClass('relic-select')
                setIconClass('')
                setItemsContainerClass('')
            }
        })
    }
   
    const selectProps:any = {
        customClass,
        disabled
    }

    if(value !== undefined){
        selectProps.value = value;
        selectProps.onChange = onChange;
    }

    return (
        <div ref={selectRef} style={{display: 'flex', justifyContent: 'space-between', width: 260, flexDirection: layout === 'vertical' ? 'column' : 'row', alignItems: layout === 'horizontal' ? 'center' : 'flex-start'}}>
             <span style={{marginRight: 5, fontFamily: 'Open Sans, sans-serif', fontSize: 13}}>{label}</span>
            <div>
                <div ref={ref} onClick={onClick} className={disabled ? 'relic-select-disabled' : customClass ? customClass : activeClass} {...selectProps}>
                    <input name={name} className="relic-select-value-display" type="text" id={id} value={value && items.filter((item:any) => item.key === value)[0].value || innerStateValue} readOnly/>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <FaChevronDown className={disabled ? 'relic-select-icon-disabled' : `relic-select-icon ${iconClass}`}/>
                    </div>
                </div>
                <div className={`relic-select-input-items ${itemsContainerClass}`}>
                    {items && items.map((item:any) => (
                        <div onClick={onItemClick} className="relic-select-item" key={item?.key}>{item?.value}</div>
                    ))}
                </div>
            </div>
        </div>
        
    )
})



export const Radio = ({
    items,
    alignment="vertical",
    value,
    onChange,
    name,
    alignLabel="right",
}:RadioProps) => {
    const [stateValue, setStateValue] = React.useState<any>({})

    const localOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        //for controlled type
        if(value){
            items.forEach((item:any) => {
                if(item.value === e.target.id){
                    if(onChange) onChange(item)
                }
            })
            return
        }

        //for uncontrolled type
        setStateValue((prev:any) => {
            let newValue = prev;
            newValue[e.target.id] = e.target.checked;
            return newValue;
        })
        let checkedRadio:any = items.filter((item:any) => item.value === e.target.id)[0]

        if(onChange) onChange(checkedRadio)

    }


    React.useEffect(() => {
        if(!value){
            let localState:any = {}
            items.forEach((item:any) => {
                localState[item.value] = false;
            })
            setStateValue(localState)
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
       <div style={{width: 'max-content', margin: '0 auto'}}>
           <div style={{display: 'flex', flexDirection: alignment === 'horizontal' ? 'row' : 'column'}}>
                {items.map((item:any, index:number) => (
                    <div key={index} style={{display: 'flex', flexDirection: alignLabel === 'left' ? 'row' : 'row-reverse', marginRight: 5, alignItems: 'center', justifyContent: 'space-between'}}>
                        <label className="relic-radio-label" htmlFor={item.value}>{item.value}</label>
                        <input
                            checked={value ? item.key === value : stateValue[item.key]} 
                            name={name} 
                            key={item.key} 
                            type="radio" 
                            value={item.value}
                            id={item.value.replaceAll(' ', '')}
                            className={item.disabled ? 'relic-radio-button-disabled' : 'relic-radio-button'}
                            disabled={item.disabled}
                            onChange={localOnChange}
                        />
                    </div>
                ))}
            </div>
       </div>
    )
}



export const Checkbox = ({
    items,
    alignment="vertical",
    values,
    onChange,
    name,
    alignLabel="right",
}:CheckboxProps) => {
    const [previous, setPrevious] = React.useState<any[]>([])
    const [stateValue, setStateValue] = React.useState([])

    const localOnChange = (e:any) => {
        //for controlled type
        let newValues:any[] = [...previous];
        items.forEach((item:any) => {
            if(item.value === e.target.id){
                let key:any = item.key;
                if(e.target.checked){
                    newValues.push(key)
                }else{
                    newValues = newValues.filter(val => val !== item.key)
                } 
            }
        })
        setPrevious(newValues)
        if(onChange) onChange(newValues)
            
        //for uncontrolled type
        if(!values){
            setStateValue((prev:any) => {
                let newValue = prev;
                newValue[e.target.id] = e.target.checked;
                return newValue;
            })
        }
    }


    React.useEffect(() => {
        if(values){
            let newValues:any = [];
            values.forEach(val => {
                newValues.push(val)
            })
            setPrevious(newValues);
        }else{
            let localState:any = {}
            items.forEach((item:any) => {
                localState[item.value] = false;
            })
            setStateValue(localState)
        }
        
    }, [values])



    return (
       <div style={{width: 'max-content', margin: '0 auto'}}>
           <div style={{display: 'flex', flexDirection: alignment === 'horizontal' ? 'row' : 'column'}}>
                {items.map((item:any, index:number) => (
                    <div key={index} style={{display: 'flex', marginRight: 5, alignItems: 'center', flexDirection: alignLabel === 'left' ? 'row' : 'row-reverse', justifyContent: 'space-between'}}>
                        <label className="relic-checkbox-label" htmlFor={item.value}>{item.value}</label>
                        <input
                            checked={values ? previous.includes(item.key) : stateValue[item.key]} 
                            name={name} 
                            key={item.key} 
                            type="checkbox" 
                            value={item.value}
                            id={item.value.replaceAll(' ', '')}
                            className={item.disabled ? 'relic-checkbox-button-disabled' : 'relic-checkbox-button'}
                            disabled={item.disabled}
                            onChange={localOnChange}
                        />
                    </div>
                ))}
        </div>
       </div>
    )
}







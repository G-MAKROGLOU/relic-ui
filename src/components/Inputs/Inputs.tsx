import React from "react";
import {FaChevronDown, FaEyeSlash, FaEye} from 'react-icons/fa'
import {
    GrDocumentCsv, 
    GrDocumentTxt, 
    GrDocumentExcel, 
    GrDocumentPdf,  
    GrDocumentImage, 
    GrDocumentText, 
    GrDocumentWord, 
    GrDocumentZip
} from 'react-icons/gr'

import {
    TextInputProps,
    PasswordInputProps,
    NumberInputProps,
    SelectProps,
    RadioProps,
    CheckboxProps,
    FileUploadProps
} from './Inputs.types'


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
            alignItems: 'center',
            justifyContent: 'space-between', 
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
        className: customClass ? customClass : 
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
    className,
    name
}: NumberInputProps, ref: React.Ref<HTMLInputElement> ) => {

    const inputProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> = {
        style: style ? style : {},
        type: 'number',
        placeholder,
        disabled,
        readOnly,
        id,
        className: className ? className : 
                   readOnly ? 'relic-input-read-only' : 
                   disabled ? 'relic-input-disabled' : 'relic-input',
        name: name ? name : '',
        step: 'any'
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
                if(item.value.replaceAll(' ', '') === e.target.id){
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
       <div style={{width: 'max-content'}}>
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
    const [stateValue, setStateValue] = React.useState<{[key:string]:boolean}>({})

    const localOnChange = (e:any) => {
        //for controlled type
        let newValues:string[] = [...previous];
        items.forEach((item:any) => {
            if(item.value.replaceAll(' ', '') === e.target.id){
                let key:string = item.key;
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
       <div style={{width: 'max-content'}}>
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





export const FileUpload = React.forwardRef( ({
    allowMultiple=true,
    onChange,
    label="File Upload",
    name,
    allowDnD=false
}:FileUploadProps, ref: React.Ref<HTMLDivElement>) => {
    const [fileList, setFileList] = React.useState<JSX.Element[]>([])

    const previewListRenderer = (files:File[]) => {
        let previews:JSX.Element[] = []
        let promises:Promise<string>[] = []
        files.forEach(file => {
            
            let extension = file.name.split('.').at(-1)

            if(file.type.includes('image')){
                promises.push(imagePromise(file))
            }
            else if(extension === 'txt') {
                previews.push(<div className="relic-file-upload-preview"><GrDocumentTxt className="relic-file-upload-preview-icon"/></div>)
            }
            else if(extension === 'csv') previews.push(<div className="relic-file-upload-preview"><GrDocumentCsv className="relic-file-upload-preview-icon"/></div>)
            else if(extension === 'xlsx') previews.push(<div className="relic-file-upload-preview"><GrDocumentExcel className="relic-file-upload-preview-icon"/></div>)
            else if(extension === 'docx') previews.push(<div className="relic-file-upload-preview"><GrDocumentWord className="relic-file-upload-preview-icon"/></div>)
            else if(extension === 'pdf') previews.push(<div className="relic-file-upload-preview"><GrDocumentPdf className="relic-file-upload-preview-icon"/></div>)
            else if(extension === 'zip') previews.push(<div className="relic-file-upload-preview"><GrDocumentZip className="relic-file-upload-preview-icon"/></div>)
            else previews.push(<div className="relic-file-upload-preview"><GrDocumentText className="relic-file-upload-preview-icon"/></div>)
        })

        Promise.all(promises)
        .then(results => {
            results.forEach(res => {
                previews.push(<div className="relic-file-upload-preview"><img className="relic-file-upload-preview-image" alt="preview" src={res}/></div>)
            })
        })
        .catch(() => {
            previews.push(<div className="relic-file-upload-preview"><GrDocumentImage className="relic-file-upload-preview-icon"/></div>)
        })
        .finally(() => setFileList(previews))
    }

    const localOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        previewListRenderer(Array.from(e.target.files!))
        if(onChange) onChange(Array.from(e.target.files!))
    }


    const onClick = () => {
        let input = document.querySelector(`#${name}`)
        input?.dispatchEvent(new MouseEvent('click', {bubbles: false}))
    }


    const imagePromise = (file:File) => {
        return new Promise<string>((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = () => {
                let result:string = reader.result! as string
                resolve(result)
            }
            reader.onerror = () => {
                reject("Could not load file")
            }
            reader.readAsDataURL(file)
        })
    }


    const onDrop = React.useCallback(e => {
        e.preventDefault()
        if(allowDnD){
            let fileList:File[] = []
            if (e.dataTransfer.items) {
                for (let i = 0; i < e.dataTransfer.items.length; i++) {
                  if (e.dataTransfer.items[i].kind === 'file') {
                    let file = e.dataTransfer.items[i].getAsFile();
                    fileList.push(file)
                  }
                }
            } else {
                for (let i = 0; i < e.dataTransfer.files.length; i++) {
                    let file = e.dataTransfer.files[i]
                    fileList.push(file)
                }
            }
            previewListRenderer(fileList)
            if(onChange) onChange(fileList)
        }
    }, [allowDnD])



    const onDragOver = React.useCallback(e => {
        e.preventDefault()
    }, [allowDnD])

    return (
        <div ref={ref} onDragOver={onDragOver} onDrop={onDrop} className="relic-file-upload" onClick={onClick}>
            <label className="relic-file-upload-label" htmlFor={name}>{label} {allowDnD && 'or drop a file from your computer'}</label>
            <input hidden onChange={localOnChange} id={name} type="file" multiple={allowMultiple}/>
            <div className="relic-file-upload-preview-list">
                {fileList.map((item, id) => (<div key={id}>{item}</div>))}
            </div>
        </div>
    )
})



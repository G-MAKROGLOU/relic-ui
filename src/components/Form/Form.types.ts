export type FormProviderProps = {
    setFormItems?: (arr:string[]) => void;
    formValidations?: any[];
    addRefsToFormValidations?: (name:string, ref:React.Ref<any>) => void;
    errors?: Error;
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
     * Required only for Select, Checkbox, and Radio. Other inputs will ignore this prop. In each case
     * you'll need a list with JSON that corresponds to the items prop of the underlying component
     */
    items?: any;
}



export type ValidationEmittedValue = {
    target: {}
}


export type NameWithValidation = {
    name: string;
    validation: Function,
    ref?: React.Ref<any>
}


export type Error = {
    [key: string]: string
}
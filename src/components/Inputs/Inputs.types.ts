import React from "react";

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
    className?: string;
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
     * A property used only when Radio is rendered as a FormItem. The label is drilled down
     * by Relic internally so the FormProvider can access the FormItem name
     */
    label?: string
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
     * A property used only when Radio is rendered as a FormItem. The label is drilled down
     * by Relic internally so the FormProvider can access the FormItem name
     */
      label?: string
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
        selected: string[]
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




export type FileUploadProps = {
    /**
     * When allowDnD is false and the upload depends on the user click, allowMultiple allows configuration
     * of a file upload input for single files or multiple files. The emitted value of onChange remains a list
     * regardless.
     */
    allowMultiple?: boolean;
    /**
     * An onChange listener that gives immediate access to an iterable list of files instead of the native event.
     * Inside onChange you can implement your network request in case a direct upload is needed. If the file upload
     * is used in a form the file list will be returned in the same JSON structure as the rest of the form values.
     */
    onChange: (files: File[]) => void;
    /**
     * The content of the label. This is what is shown inside the box instead of the input.
     */
    label: string;
    /**
     * The name of the input to be matched with the label.
     */
    name: string;
    /**
     * This overrides allowMultiple. If allowDnD is true, drop of multiple files is allowed anyway
     */
    allowDnD?: boolean;
}

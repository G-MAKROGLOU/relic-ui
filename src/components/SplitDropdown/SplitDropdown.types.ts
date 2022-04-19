export type SplitDropdownProps = {
   
    /**
     * A JSON hierarchical structure describing the items of each dropdown.
     * Check the code examples in Docs for more.
     */
     items:Object[];
 
     /**
      * Returns the selected final element from the right split in the following form.
      * {key: 'string', title: 'string'}
      */
     onClick: (item:DropdownItem) => void;
 }
 
 export type DropdownItem = {
     key: string,
     title: string
 }
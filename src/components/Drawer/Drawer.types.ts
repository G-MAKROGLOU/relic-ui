export type DrawerProps = {
    /**
     * The content of the drawer. Can be an array resulting from a map() function
     * or hardcoded elements.
     */
    children?: React.ReactChildren | React.ReactChild;
    /**
     * A string or JSX element containing the title of the drawer. In case of element the 
     * styling is up to you.
     */
    title?: string | React.ReactNode;
    /**
     * Wether the drawer is open or not. A state or context controlled value througn props
     */
    isOpen?: boolean;
    /**
     * The event listener to control the closing of the drawer.
     */
    onClose?: () => void;
    /**
     * The position of the drawer in the screen. (top, bottom, left, right)
     */
    anchor: "left" | "right" | "top" | "bottom";
    /**
     * Wether you want the drawer to close when you click outside of the drawer apart from 
     * when you click on the close button.
     */
    clickAwayClose?:boolean
}
export type ModalProps = {
    /**
     * The content of the Modal. It follows the usual React way of declaring children inside a component
     */
    children?: React.ReactNode;
    /**
     * The dimensions of the modal [width, height]
     */
    dimensions?: number[];
    /**
     * Whether the modal has a footer with buttons or not. Default is true. If set to false, onOk is not needed and onCancel will be attached to the close icon.
     * When set to false, okText and cancelText are not required as well. When set to true you can configure the text of each button through okText and cancelText props,
     * onOk is bind to the Ok button, and onCancel is bound both to the Cancel button and close icon.
     */
    hasFooter?: boolean;
    /**
     * The text of the Ok button when hasFooter is true
     */
    okText?: string;
    /**
     * The text of the Cancel button when hasFooter is true
     */
    cancelText?: string;
    /**
     * An event listener to be bound to the Ok button when hasFooter is true
     */
    onOk?: () => void;
    /**
     * An event listener that is bound to: 1)the Cancel button when hasFooter is true, 2) the close icon regardless of the footer 3) to the backdrop when hasBackdrop is true 
     */
    onCancel?: () => void;
    /**
     * Whether the modal is visible or not. A state or context controlled boolean value
     */
    isVisible?: boolean;
    /**
     * Whether the modal has a backdrop or not. Default is true. If true, then a backdrop that covers the area behind the modal is displayed,
     * that when clicked closes the modal.
     */
    hasBackdrop?:boolean;
    /**
     * The title of the modal
     */
    title?: string;
}
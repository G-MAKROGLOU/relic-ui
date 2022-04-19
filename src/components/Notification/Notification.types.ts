export type NotificationProviderProps = {
    children?: React.ReactNode
}


export type NotificationContextProps = {
    /**
     * Extracted from useNotifications() hook. See Docs for usage examples.
     */
    notify: (notification:NotificationProps) => void;
}


export type NotificationProps = {
    /**
     * A unique identifier for the Notification. Usefule for the closing of the Notification
     */
    id: string,
    /**
     * Whether a close icon will be shown or not. If set to true you will be able to close the notification before the duration expires
     */
    closable: boolean, 
    /**
     * A duration is milliseconds after which the Notification will close automatically.
     */
    duration: number,
    /**
     * The title of the Notification
     */
    title: string,
    /**
     * The type of the Notification. Can be any of the following values.
     */
    type: 'info' | 'success' | 'error' | 'warning',
    /**
     * The position of the Notification in the viewport. Can be any of the following values.
     */
    position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left',
    /**
     * The description of the Notification. Too long descriptions are clipped to prevent overflowing.
     */
    description: string
}


export type NotificationComponentProps = {
    notification: NotificationProps; 
    onClose: () => void;
}
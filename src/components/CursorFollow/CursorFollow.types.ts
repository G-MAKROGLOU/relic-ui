
export type CursorFollowProps = {
    /**
     * The color of the border of the circle
     */
    color?: string;
    /**
     * If true the circle will have a pulsing effect. Can be a state or context controlled boolean
     */
    isPulsing?: boolean;
    /**
     * The width of the circle border. Only numbers allowed that translate to pixels. Can be a state or context controlled number
     */
    strokeWidth?: number;
    /**
     * Whether the circle around your cursor is enabled or not. Can be a state or context controlled boolean
     */
    isEnabled?: boolean;
    /**
     * Whether the circle has a spinning animation or not. Can be a state or context controlled boolean
     */
    isSpinning?: boolean;
    /**
     * The border style. Can be any valid CSS border style value i.e. sold, dotted, dashed, ridge. Can be a state or context controlled string
     */
    borderStyle?: string;
    /**
     * The components that will have access to the cursor follow functionality. Works just like any other React Context Provider. 
     */
    children?: React.ReactNode;
}



export type CursorFollowContextProps = {
    color?: string;
    isPulsing?: boolean;
    strokeWidth?: number;
    isEnabled: boolean;
    setColor: (color:string) => void;
    setPulsing: (isPulsing:boolean) => void;
    setStrokeWidth: (strokeWidth:number) => void;
    setEnabled: (isEnabled:boolean) => void;
    setBorderStyle: (borderStyle:string) => void;
    setSpinning: (isSpinning:boolean) => void;
}
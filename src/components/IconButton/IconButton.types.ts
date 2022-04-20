export type IconButtonProps = {
    /**
     * The button type
     */
    type: "primary" | "danger" | "success" | "warning" | "info" | "secondary" | "outlined";
    
    shape?: "square" | "round" 
  
    /**
     * Optional click handler
     */
    onClick?: (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
  
    /**
     * A custom style to override the default style of the button
     */
    style?: Object;
  
    /**
     * Wether the button is disabled or not
     */
    disabled?: boolean;
  
    /**
     * An icon component from an icon library such as react-icons
     */
    icon?: React.ReactNode;
  
    /**
     * If set to true, a loading spinner will appear that will override any icon
     * or text and the button will be slightly masked to prevent further clicks
     */
    loading?: boolean;
  };
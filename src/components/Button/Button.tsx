import React from "react";

let initialState = {
  "enabled": true
}

export type ButtonProps = {
    /**
     * The button type
     */
    type: "primary" | "danger" | "success" | "warning" | "info" | "link" | "secondary" | "outlined";
    
    /**
     * The size of the button
     */
    size?: "small" | "medium" | "large";
    /**
     * Button contents
     */
     content: string;
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
     * The type of the button. Type submit is suitable for forms
     */
    buttonType?: "button" | "submit";
  
    /**
     * If set to true, a loading spinner will appear that will override any icon
     * or text and the button will be slightly masked to prevent further clicks
     */
    loading?: boolean;

    fullWidth?: boolean
  };
  

/**
 * A button component with different variants to implement click events
 */
export const Button: React.FC<ButtonProps> = ({
  disabled,
  type = "primary",
  size = "medium",
  onClick,
  content = "Button",
  style,
  icon,
  buttonType = "button",
  loading=false,
  fullWidth=false
}) => {
  
  return (
    <button
      disabled={disabled}
      type={buttonType}
      style={style ? {...style as React.CSSProperties} : {}}
      className={disabled ? `relic-btn relic-btn-${size}` : loading ? `relic-btn relic-btn-${size} relic-btn-${type} relic-btn-loading` : `relic-btn relic-btn-${type} relic-btn-${size}`}
      onClick={onClick}
    >
      {!loading 
      ? <>
          {icon && <span style={{marginRight: 5}}>{icon}</span>}
          {content}
        </>
      : "Loading..."
      }

      
    </button>
  );
};

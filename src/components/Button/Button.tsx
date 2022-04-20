import React from "react";
import {ButtonProps} from './Button.types'
import ButtonLoadingSpinner from "../Internals/ButtonLoadingSpinner";
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
  loading=false
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
      : <ButtonLoadingSpinner/>
      }

      
    </button>
  );
};

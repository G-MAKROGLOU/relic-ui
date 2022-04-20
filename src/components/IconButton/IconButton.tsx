import React from "react";
import {IconButtonProps} from './IconButton.types'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import ButtonLoadingSpinner from "../Internals/ButtonLoadingSpinner";

/**
 * A button component with different variants to implement click events
 */
export const IconButton: React.FC<IconButtonProps> = ({
  disabled,
  type = "primary",
  onClick,
  style,
  icon,
  loading=false,
  shape="square"
}) => {
  
  return (
    <button
      disabled={disabled}
      style={style ? {...style as React.CSSProperties} : {}}
      className={disabled 
                    ? `relic-icon-btn relic-icon-btn-${shape}` 
                    : loading 
                        ? `relic-icon-btn relic-icon-btn-${type} relic-icon-btn-loading relic-icon-btn-${shape}` 
                        : `relic-icon-btn relic-icon-btn-${type} relic-icon-btn-${shape}`
                    }
      onClick={onClick}
    >
      {!loading 
        ?   <>
                {icon && icon}
            </>
        : <ButtonLoadingSpinner/>
      }
    </button>
  );
};

import React from "react";
import {TypographyProps} from './Typography.types'


  


/**
 * A versatile Typography component that can render text in various sizes 
 */
 export const Typography: React.FC<TypographyProps> = ({
  type = "header",
  color = "#000",
  content,
}) => {
  
    const sizeMap = {
        "header": 46,
        "subtitle": 38,
        "title": 24,
        "regular": 22,
        "text": 16,
        "note": 14,
        "details": 12
    }


    const weightMap = {
        "header": 800,
        "subtitle": 700,
        "title": 700,
        "regular": 400,
        "text": 400,
        "note": 400,
        "details": 400
    }

  return (
    <div
      style={{color: color, fontSize: sizeMap[type], fontWeight: weightMap[type], fontFamily: 'Open Sans, sans-serif'}}
    >
      {content}
    </div>
  );
};

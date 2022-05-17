import React from 'react'
import { TooltipProps } from './Tooltip.types'

export function Tooltip({
    children,
    placement="right",
    content=""
}: TooltipProps){
    const tooltip = React.useRef<HTMLDivElement>(null)
    const tooltipWrapper = React.useRef<HTMLDivElement>(null)


    const onMouseOver = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let target = tooltipWrapper.current as HTMLDivElement;
        
        let {width, height} = tooltip!.current!.getBoundingClientRect();
        let targetRect = target.getBoundingClientRect();
        
        if(placement === 'top'){
            tooltip!.current!.style.bottom =  targetRect.height + 5 + "px"
        }

        if(placement === 'right'){
            tooltip!.current!.style.bottom = (targetRect.height / 2) - (height / 2) + "px"
            tooltip!.current!.style.left = targetRect.width + 5 + "px"
        }


        if(placement === 'bottom'){
            tooltip!.current!.style.top = targetRect.height + 5 + "px"
        }


        if(placement === 'left'){
            tooltip!.current!.style.bottom = (targetRect.height / 2) - (height / 2) + "px"
            tooltip!.current!.style.left =  -width - 5 + "px"
        }
        
        tooltip!.current!.style.opacity = "1";
        
        
    }



    const onMouseLeave = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        tooltip!.current!.style.opacity = "0";
    }


    return (
        <div ref={tooltipWrapper} className="relic-tooltip-wrapper" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
            {children}
            <div className={`relic-tooltip relic-tooltip-${placement}`} ref={tooltip}>
                {content}
            </div>
        </div>
    )
}
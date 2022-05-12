import React from 'react'
import { TooltipProps } from './Tooltip.types'

export default function Tooltip({
    children,
    placement="right",
    content=""
}: TooltipProps){
    const tooltip = React.useRef<HTMLDivElement>(null)


    const onMouseOver = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let target = e.target as HTMLDivElement;
        let {x,y} = target.getBoundingClientRect();
        if(placement === 'top'){
            tooltip!.current!.style.bottom = window.innerHeight - y + 5 + "px"
        }

        if(placement === 'right'){
            tooltip!.current!.style.top = y + "px"
            tooltip!.current!.style.left = (window.innerWidth - x + 5) + "px"
        }


        if(placement === 'bottom'){
            tooltip!.current!.style.top = window.innerHeight - y + 5 + "px"
        }


        if(placement === 'left'){
            tooltip!.current!.style.top = y + "px"
            tooltip!.current!.style.right = (window.innerWidth - x + 5) + "px"
        }
        
        tooltip!.current!.style.opacity = "1";
    }



    const onMouseLeave = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        tooltip!.current!.style.opacity = "0";
    }


    return (
        <>
            <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
                {children}
            </div>
            <div className={`relic-tooltip relic-tooltip-${placement}`} ref={tooltip}>
                {content}
            </div>
        </>
    )
}
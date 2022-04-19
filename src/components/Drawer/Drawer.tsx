import React from 'react'
import {MdClose} from 'react-icons/md'
import {DrawerProps} from './Drawer.types'



export const Drawer: React.FC<DrawerProps> = ({
    children,
    anchor,
    isOpen,
    onClose,
    title,
    clickAwayClose
}) => {
    const [activeClass, setActiveClass] = React.useState(`relic-drawer-starting-class`)
    const [drawerSize, setDrawerSize] = React.useState(0)

    const drawerRef = React.useRef<any>()


    const clickAwayListener = React.useCallback((e) => {
        if(drawerRef.current && !drawerRef.current.contains(e.target))
            if(onClose) onClose()
    }, [])


    
    React.useEffect(() => {
        if(clickAwayClose) document.addEventListener('mousedown', clickAwayListener)
        else document.removeEventListener('mousedown', clickAwayListener)
        
        return () => document.removeEventListener('mousedown', clickAwayListener)
        
    }, [clickAwayClose])
    
    React.useEffect(() => {
        let styleSheet;
        let {width, height} = drawerRef!.current!.getBoundingClientRect();
        if(anchor === 'left' || anchor === 'right') setDrawerSize(width)
        if(anchor === 'top' || anchor === 'bottom') setDrawerSize(height)

        for(let i = 0; i < document.styleSheets.length; i++){
            let ss = document.styleSheets[i];
            if(!ss.cssRules[0].cssText.includes("@-webkit-keyframes")){
                    styleSheet = ss;
                    let appearKeyframe =
                    `@-webkit-keyframes appear-${anchor} {
                        0% {${anchor}: ${-drawerSize - 50}} 
                        100% {${anchor}: 0}
                    }`;


                let disappearKeyframe =
                    `@-webkit-keyframes disappear-${anchor} {
                        0% {${anchor}: 0} 
                        100% {${anchor}: ${-drawerSize - 50}}
                    }`;

                styleSheet!.insertRule(appearKeyframe, styleSheet!.cssRules.length);
                styleSheet!.insertRule(disappearKeyframe, styleSheet!.cssRules.length);
                break;
            }
        }

        if(isOpen) setActiveClass(`relic-drawer-appear-${anchor}`)
        else setActiveClass(`relic-drawer-disappear-${anchor}`)
        
    }, [isOpen])


    React.useEffect(() => {
        setActiveClass(`relic-drawer-starting-class relic-drawer-disappear-${anchor}`)
        // if(onClose) onClose()
    }, [anchor])


    
    return (
        <div 
            ref={drawerRef}
            style={{
                [anchor]: -drawerSize - 50
            }} 
            className={`relic-drawer relic-drawer-${anchor} ${activeClass}`}
        >
            <div className="relic-drawer-head" style={{flexDirection: anchor === 'right' ? 'row' : 'row-reverse'}}>
                <div style={{width: '3%'}}>
                    <MdClose className="relic-drawer-close-icon" onClick={onClose}/>
                </div>
                {typeof title === 'string' 
                ? <h2 className="relic-drawer-title">{title}</h2>
                : title
                }
            </div>
            <div className="relic-drawer-body">
                {children}
            </div>
        </div>
    )
}

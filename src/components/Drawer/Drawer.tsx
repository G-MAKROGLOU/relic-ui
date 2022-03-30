import React from 'react'
import {MdClose} from 'react-icons/md'

export type DrawerProps = {
    /**
     * The content of the drawer. Can be an array resulting from a map() function
     * or hardcoded elements.
     */
    children?: React.ReactChildren | React.ReactChild;
    /**
     * A string or JSX element containing the title of the drawer. In case of element the 
     * styling is up to you.
     */
    title?: string | React.ReactNode;
    /**
     * Wether the drawer is open or not. A state or context controlled value througn props
     */
    isOpen?: boolean;
    /**
     * The event listener to control the closing of the drawer.
     */
    onClose?: () => void;
    /**
     * The position of the drawer in the screen. (top, bottom, left, right)
     */
    anchor: "left" | "right" | "top" | "bottom";
    /**
     * Wether you want the drawer to close when you click outside of the drawer apart from 
     * when you click on the close button.
     */
    clickAwayClose?:boolean
}


export const Drawer: React.FC<DrawerProps> = ({
    children,
    anchor,
    isOpen,
    onClose,
    title,
    clickAwayClose
}) => {
    const [activeClass, setActiveClass] = React.useState('')
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
            console.log();
            if(!ss.cssRules[0].cssText.includes("@-webkit-keyframes")){
                    styleSheet = ss;
                    let appearKeyframe =
                `@-webkit-keyframes appear-${anchor} {
                    0% {${anchor}: ${-drawerSize}} 
                    100% {${anchor}: 0}
                }`;


                let disappearKeyframe =
                    `@-webkit-keyframes disappear-${anchor} {
                        0% {${anchor}: 0} 
                        100% {${anchor}: ${-drawerSize}}
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
        if(onClose) onClose()
        setActiveClass('')
    }, [anchor])


    
    return (
        <div 
            ref={drawerRef}
            style={{
                [anchor]: -drawerSize
            }} 
            className={`relic-drawer relic-drawer-${anchor} ${activeClass}`}
        >
            <div className="relic-drawer-head" style={{flexDirection: anchor === 'right' ? 'row' : 'row-reverse'}}>
                <MdClose className="relic-drawer-close-icon" onClick={onClose}/>
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

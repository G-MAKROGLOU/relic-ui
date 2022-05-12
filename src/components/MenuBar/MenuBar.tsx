import React from 'react'
import {MenuBarProps, MenuItemProps, ReducerStateProps, ReducerActionProps} from './MenuBar.types'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'


const initialState:ReducerStateProps = {}


const reducer = (state:ReducerStateProps[], action:ReducerActionProps) => {
    if(action.type === 'initialSet'){
        return action.payload
    }

    if(action.type === 'showHide'){
        let {key, visible} = action.payload
        let nState = JSON.parse(JSON.stringify(state));
        nState[key] = visible
        return nState;
    }
}


export default function MenuBar({
    display='left',
    menuItems=[],
    onItemClick=(item:MenuItemProps) => console.log(item),
}:MenuBarProps){
    const [activeItem, setActiveItem] = React.useState(-1)
    const [hoveredItemLabel, setHoveredItemLabel] = React.useState<string>('')
    const [timeoutId, setTimeoutId] = React.useState<ReturnType<typeof setTimeout> | null>(null);
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const menuBarTooltip = React.useRef<HTMLDivElement>(null)
    const menuBar = React.useRef<HTMLDivElement>(null)


    const clickAwayListener = React.useCallback((e) => {
        if(menuBar.current && !menuBar.current.contains(e.target)){
            let subMenusVisible:ReducerStateProps = {}
            menuItems.forEach((mi, id) => {
                if(mi.children && mi.children!.length > 0){
                    subMenusVisible[mi.key] = false 
                } 
            })
            dispatch({type: 'initialSet', payload: subMenusVisible})
        }
            
    }, [])


    
    React.useEffect(() => {
        document.addEventListener('mousedown', clickAwayListener)    
    
        return () => document.removeEventListener('mousedown', clickAwayListener)
        
    }, [])


    React.useEffect(() => {
        let subMenusVisible:ReducerStateProps = {}
        menuItems.forEach((mi, id) => {
            if(mi.children && mi.children!.length > 0){
                subMenusVisible[mi.key] = false 
            } 
        })
        dispatch({type: 'initialSet', payload: subMenusVisible})
    }, [menuItems])


    const localOnItemClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>, item:MenuItemProps, parent:MenuItemProps | null) => {
        setActiveItem(item.key)
        if(item.children && item.children!.length > 0){
            let target = e.target as HTMLDivElement;
            let {x, y, width, height} = target.getBoundingClientRect()
            
            let submenu = document.querySelector(`#submenu-${item.key}`) as HTMLDivElement;
            submenu.style.top = y + "px"
            if(display === 'left') submenu.style.left = x + width + "px"
            if(display === 'right') submenu.style.right = window.innerWidth - x + "px"

            dispatch({type: "showHide", payload: {key: item.key, visible: !state[item.key]}})
        }else{
            let subMenusVisible:ReducerStateProps = {}
            menuItems.forEach((mi, id) => {
                if(mi.children && mi.children!.length > 0){
                    subMenusVisible[mi.key] = false 
                } 
            })
            dispatch({type: 'initialSet', payload: subMenusVisible})
            setActiveItem(parent!.key)
        }
        if(onItemClick) onItemClick(item)
    }



    const onMenuItemHover = (e:React.MouseEvent<HTMLDivElement, MouseEvent>, item:MenuItemProps) => {
        let target = e.target as HTMLDivElement;
        setHoveredItemLabel(item.label)
        let {x, y, width, height} = target.getBoundingClientRect();
        menuBarTooltip!.current!.style.visibility = "visible";
        menuBarTooltip!.current!.style.opacity = "1";
        menuBarTooltip!.current!.style.top = y + "px";
        if(display === 'left') menuBarTooltip!.current!.style.left = x + width + 5 + "px";
        if(display === 'right') menuBarTooltip!.current!.style.right = window.innerWidth - x + 5 + "px"
        
        if(timeoutId) clearTimeout(timeoutId)

        let id = setTimeout(() => {
            menuBarTooltip!.current!.style.opacity = "0";
            menuBarTooltip!.current!.style.visibility = "hidden";
            setTimeoutId(null)
        }, 800)
        setTimeoutId(id)
    }


    const onMenuItemLeave = () => {
        menuBarTooltip!.current!.style.opacity = "0";
        menuBarTooltip!.current!.style.visibility = "hidden";
    }

    return (
        <div 
            ref={menuBar}
            className={`relic-menubar-${display}`} 
        >
            <div className="relic-menubar-item-wrapper">
                {menuItems.map((item, index) => {
                    return (
                        <div key={index}>
                            <div 
                                onMouseLeave={onMenuItemLeave}
                                onMouseOver={e => onMenuItemHover(e, item)}
                                onClick={(e) => localOnItemClick(e, item, null)}
                                className={`relic-menubar-menuitem ${activeItem === item.key ? 'relic-menubar-menuitem-active' : ''}`}>
                                <span className="relic-menubar-menuitem-icon">{item.icon}</span> 
                            </div>
                            {
                                item.children && item.children!.length > 0
                                ? <div id={`submenu-${item.key}`} className={`relic-menubar-submenu-${display} ${state[item.key] ? 'relic-menubar-submenu-active' : 'relic-menubar-submenu-inactive'}`}>
                                    {item.children.map((child, id) => (
                                        <div 
                                            key={id} 
                                            className={`${activeItem === child.key ? 'relic-menubar-menuitem-active' : ''}`} 
                                            onClick={(e) => localOnItemClick(e, child, item)}
                                        >
                                            <span className="relic-menubar-menuitem-icon">{child.icon}</span> 
                                            <span>{child.label}</span> 
                                        </div>
                                    ))}
                                </div>
                                : null
                            }
                        </div>
                    )
                })}
            </div>
            <div ref={menuBarTooltip} className={`relic-menubar-tooltip-${display}`}>{hoveredItemLabel}</div>            
        </div>
    )
}
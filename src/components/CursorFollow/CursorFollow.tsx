import React from 'react'
import {CursorFollowProps, CursorFollowContextProps} from './CursorFollow.types'

const CursorFollowContext = React.createContext<CursorFollowContextProps>({
    isEnabled: false,
    setColor: (col:string) => {},
    setEnabled: (en:boolean) => {},
    setStrokeWidth: (sw:number) => {},
    setPulsing: (pul:boolean) => {},
    setBorderStyle: (bs:string) => {},
    setSpinning: (spin:boolean) => {}
})

/**
 * ContextProvider that allows to add a styled circle around the cursor with some baked optional animations.
 * It exposes the useCursorFollow() hook to configure the state of the cursor dynamically during runtinme. See examples for more.
 * Use the WithCursorFollow Provider to wrap the components you want have the effect or wrap your entire app ta entry level 
 * to have global access.
 * 
 * The useCursorFollow() hook exposes the following:
 *       1)color => the current color of the cursor follow, 
 *       2)isPulsing => the current pulsing status of the cursor follow,
 *       3)strokeWidth => the current strokeWidth of the cursor follow, 
 *       4)isEnabled => the current enabled status of the cursor follow, 
 *       5)setColor => accepts a string with rgb, rgba(), hex , or named value to set the color of the cursor follow 
 *       6)setPulsing => accepts a boolean to toggle between pulsing states
 *       7)setEnabled => accepts a boolean to toggle the cursor follow on and off
 *       8)setStrokeWidth => accepts a number in pixels for the strokeWidth of the cursor follow
 *       9)setBorderStyle => a string that can be any valid value that you would apply to CSS border property
 *       10)setSpinning => a boolean that toggles the spinning state of the cursor follow
 * 
 * 
 */
export const WithCursorFollow = ({
    color = "#0F8DD6",
    isPulsing = false,
    strokeWidth = 2,
    isSpinning = false,
    borderStyle = "dashed",
    isEnabled = false,
    children
}:CursorFollowProps ) => {
    const cursorFollow = React.useRef<HTMLDivElement>(null);
    const [_color, _setColor] = React.useState<string | undefined>(color);
    const [_isPulsing, _setPulsing] = React.useState<boolean | undefined>(isPulsing);
    const [_isEnabled, _setEnabled] = React.useState<boolean>(isEnabled);
    const [_strokeWidth, _setStrokeWidth] = React.useState<number | undefined>(strokeWidth);
    const [_borderStyle, _setBorderStyle] = React.useState<string | undefined>(borderStyle);
    const [_isSpinning, _setSpinning] = React.useState<boolean | undefined>(isSpinning);
    

    const cursorFollowListener = React.useCallback((e) => {
        if(cursorFollow.current){
            cursorFollow.current.style.top = `${e.pageY - 25}px`;
            cursorFollow.current.style.left = `${e.clientX - 25}px`;
        }
    }, 
    [])

    React.useEffect(() => {
        if(cursorFollow.current){
            if(_isEnabled){
                document.addEventListener('mousemove', cursorFollowListener)
            }else{
                document.removeEventListener('mousemove', cursorFollowListener)
            }
        }
    }, 
    [_isEnabled])


    const setColor = React.useCallback((color) => {

        _setColor(color)

    }, [color])


    const setPulsing = React.useCallback((isPulsing) => {
       
        _setPulsing(isPulsing)
        
    }, [isPulsing])

    const setEnabled = React.useCallback((isEnabled) => {
        
         _setEnabled(isEnabled)
        
    }, [isEnabled])
    

    const setStrokeWidth = React.useCallback((strokeWidth) => {
        
            _setStrokeWidth(strokeWidth)
       
    }, [strokeWidth])


    const setBorderStyle = React.useCallback((borderStyle) => {
        
        _setBorderStyle(borderStyle)
   
    }, [borderStyle])


    const setSpinning = React.useCallback((isSpinning) => {
        
        _setSpinning(isSpinning)
   
    }, [isSpinning])


    return (
        <CursorFollowContext.Provider value={{
            color: _color, 
            isPulsing: _isPulsing,
            strokeWidth: _strokeWidth, 
            isEnabled: _isEnabled, 
            setColor,
            setPulsing, 
            setEnabled, 
            setStrokeWidth,
            setBorderStyle,
            setSpinning
        }}>
            <>
                <div
                    style={{
                        opacity: isEnabled ? 1 : 0,
                        display: _isEnabled ? 'block' : 'none',
                        width: 50,
                        height: 50,
                        border: `${_strokeWidth}px ${_borderStyle} ${_color}`
                    }} 
                    className={`relic-cursor-follow ${_isPulsing ? 'relic-cursor-follow-pulse' : ''} ${_isSpinning ? 'relic-cursor-follow-spin' : ''}`} 
                    ref={cursorFollow}
                />
                {children}
            </>
        </CursorFollowContext.Provider>
    )
}


export const useCursorFollow = () => {
    let context = React.useContext<CursorFollowContextProps>(CursorFollowContext);
    if(!context) throw new Error("Could not find a WithCursorFollow Provider! import {WithCursorFollow} from 'relic-ui-sb' and wrap your components with it!")
    return context;
}
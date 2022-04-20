import React from "react";

import {WithCursorFollow, useCursorFollow} from '../components/CursorFollow/CursorFollow'


export const View = ({...args}) => {
    return (
        <WithCursorFollow {...args}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10}}>
                <NoCursorPart/>
                <PulsingCircle/>
                <BiggerBorderWidth/>
                <ChangeColor/>
                <ChangeBorderStyle/>
                <EnableSpin/>
            </div>
        </WithCursorFollow>
    )
}


export const NoCursorPart = () => {
    let {setEnabled} = useCursorFollow();

    let elem = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if(elem.current){
            elem.current.addEventListener('mouseover', e => {
                setEnabled(false)
            })
            elem.current.addEventListener('mouseleave', () => {
                setEnabled(true)
            })
        }
    }, [])

    return (
        <div ref={elem} style={{width: 250, height: 250, backgroundColor: '#283845', textAlign: 'center', color: '#fff', borderRadius: 5, lineHeight: 15}}>
            No Cursor Follow Here!!!!
        </div>
    )
}


export const PulsingCircle = () => {
    let {setPulsing} = useCursorFollow();

    let elem = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if(elem.current){
            elem.current.addEventListener('mouseover', e => {
                setPulsing(true)
            })
            elem.current.addEventListener('mouseleave', () => {
                setPulsing(false)
            })
        }
    }, [])

    return (
        <div ref={elem} style={{width: 250, height: 250, backgroundColor: '#202c39', textAlign: 'center', color: '#fff', borderRadius: 5, lineHeight: 15}}>
            Pulsing Circle Here!!!!
        </div>
    )
}


export const BiggerBorderWidth = () => {
    let {setStrokeWidth} = useCursorFollow();

    let elem = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if(elem.current){
            elem.current.addEventListener('mouseover', e => {
                setStrokeWidth(5)
            })
            elem.current.addEventListener('mouseleave', () => {
                setStrokeWidth(2)
            })
        }
    }, [])

    return (
        <div ref={elem} style={{width: 250, height: 250, backgroundColor: '#b8b08d', textAlign: 'center', color: '#fff', borderRadius: 5, lineHeight: 15}}>
            Bigger Border Width Here!!!!
        </div>
    )
}


export const ChangeColor = () => {
    let {setColor} = useCursorFollow();

    let elem = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if(elem.current){
            elem.current.addEventListener('mouseover', e => {
                setColor("#f29559")
            })
            elem.current.addEventListener('mouseleave', () => {
                setColor("#0F8DD6")
            })
        }
    }, [])

    return (
        <div ref={elem} style={{width: 250, height: 250, backgroundColor: '#f2d492', textAlign: 'center', color: '#000', borderRadius: 5, lineHeight: 15}}>
            Change Color Here!!!!
        </div>
    )
}


export const ChangeBorderStyle = () => {
    let {setBorderStyle} = useCursorFollow();

    let elem = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if(elem.current){
            elem.current.addEventListener('mouseover', e => {
                setBorderStyle("dotted")
            })
            elem.current.addEventListener('mouseleave', () => {
                setBorderStyle("dashed")
            })
        }
    }, [])

    return (
        <div ref={elem} style={{width: 250, height: 250, backgroundColor: '#ddd5d0', textAlign: 'center', color: '#000', borderRadius: 5, lineHeight: 15}}>
            Change Border Style Here!!!!
        </div>
    )
}


export const EnableSpin = () => {
    let {setSpinning} = useCursorFollow();

    let elem = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if(elem.current){
            elem.current.addEventListener('mouseover', e => {
                setSpinning(true)
            })
            elem.current.addEventListener('mouseleave', () => {
                setSpinning(false)
            })
        }
    }, [])

    return (
        <div ref={elem} style={{width: 250, height: 250, backgroundColor: '#e26d5c', textAlign: 'center', color: '#000', borderRadius: 5, lineHeight: 15}}>
            Enable Spinning Here!!!!
        </div>
    )
}


export default {
    title: "WithCursorFollow",
    component: View,
    args: {
      isEnabled: true,
      isSpinning: false,
      isPulsing: false,
      color: "blue",
      borderStyle: "dashed",
      strokeWidth: 2,
    },
    parameters: {
        docs: { 
            source: { 
                type: 'code' 
            } 
        } 
    },
    argTypes: {
        isEnabled: {
          control: { type: 'boolean' },
        },
        isSpinning: {
            control: { type: 'boolean' },
        },
        isPulsing: {
            control: { type: 'boolean' },
        },
        color: {
            control: {type: 'color'}
        },
        borderStyle: {
            options: ['dashed', 'solid', 'dotted', 'ridge'],
            control: {type: 'select'}
        },
        strokeWidth: {
            control: {type: 'range', min: 0}
        }  
    }
  };
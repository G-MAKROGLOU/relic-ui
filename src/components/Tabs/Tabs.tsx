import React from 'react'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import {
    TabsProps,
    TabItemProps
} from './Tabs.types'

export const Tabs = ({
    tabs,
    children,
    isEditable=true,
    tabStyle="square",
    onAdd,
    onClose,
    onChange
}:TabsProps) => {
    const boxedTabIndexer = React.useRef<HTMLDivElement>(null)
    const [activeTab, setActiveTab] = React.useState(-1)



    React.useEffect(() => {
        setActiveTab(tabs.at(0)!.key)
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [])

    React.useEffect(() => {
        if(activeTab !== -1){
            setActiveTab(tabs.at(-1)!.key)
        }
    }, [tabs])


    React.useEffect(() => {
        if(tabStyle === 'boxed'){
            let tabIndex = activeTab === -1 ? tabs[0].key : activeTab
            let firstTab = document.querySelector(`#relic-tab-${tabIndex}`)
            moveBoxedIndexer({target: firstTab})
        }
    }, [tabStyle])


    React.useEffect(() => {
        if(tabStyle === 'boxed'){
            
            window.addEventListener('resize', () => {
                if(activeTab !== -1){
                    let target = document.querySelector(`#relic-tab-${activeTab}`)
                    moveBoxedIndexer({target})
                }
                
            })
        }

        return () => {
            window.removeEventListener('resize', () => {
                if(activeTab !== -1){
                    let target = document.querySelector(`#relic-tab-${activeTab}`)
                    moveBoxedIndexer({target})
                }
            })
        }
    },
    [tabStyle, activeTab])


   

    const moveBoxedIndexer = (e:React.MouseEvent | any) => {
        let tab = e.target as HTMLDivElement;
        let { x } = tab.getBoundingClientRect();
        boxedTabIndexer!.current!.style.left = `${x}px`;
    }


    const closeTab = (e:React.MouseEvent, tab:TabItemProps) => {
        e.stopPropagation()
        if(onClose) onClose(tab)
    }

    return (
        <div>
            <div className={`relic-tabbar relic-tabbar-${tabStyle}`}>
                {
                    tabStyle === 'boxed'
                    ? <div ref={boxedTabIndexer} className="relic-tab-boxed-indexer"/>
                    : null
                }
                {tabs.map((tab, index) => (
                    <div
                        id={`relic-tab-${tab.key}`}
                        key={index}
                        onClick={(e) => {
                            let prevTab = tabs.filter(t => t.key === activeTab)[0]
                            if(onChange) onChange(prevTab, tab)
                            setActiveTab(tab.key)
                            if(tabStyle === 'boxed') moveBoxedIndexer(e)
                        }} 
                        className={`relic-tab relic-tab-${tabStyle} ${activeTab === tab.key ? `relic-tab-${tabStyle}-active` : ''}`}
                    >
                        <span className="relic-tab-label">{tab.label}</span>
                        {isEditable && <AiOutlineClose onClick={e => closeTab(e, tab)} className={`relic-tab-close-icon ${tabStyle === 'underline' ? 'relic-tab-close-icon-underline' : ''}`}/>}
                    </div>
                ))}
                {
                    isEditable 
                    ? <div
                        onClick={() => {
                            if(onAdd) onAdd()
                        }} 
                        className={`relic-add-tab-button-${tabStyle}`}
                      >
                        <AiOutlinePlus className="relic-add-tab-button-icon"/>
                      </div>
                    : null
                }
            </div>
        </div>
    )
}
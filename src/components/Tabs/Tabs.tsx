import React from 'react'
import { AiOutlineClose, AiOutlinePlus, AiOutlineMore, AiOutlineCheck } from 'react-icons/ai'
import {
    TabsProps,
    TabItemProps
} from './Tabs.types'

export const Tabs = ({
    tabs,
    children,
    extras,
    isEditable=true,
    tabStyle="square",
    maxVisibleTabs=8,
    onAdd,
    onClose,
    onChange
}:TabsProps) => {
    const boxedTabIndexer = React.useRef<HTMLDivElement>(null)
    const [activeTab, setActiveTab] = React.useState(-1)
    const hiddenTabs = React.useRef<HTMLDivElement>(null)


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



    React.useEffect(() => {

        function handleClickAway(e:any){
            if(hiddenTabs.current && !hiddenTabs.current.contains(e.target)){
                hiddenTabs.current.style.display = "none";
            }
        }

        document.addEventListener('mousedown', handleClickAway)

        document.addEventListener('scroll', handleClickAway)

        return () => {
            document.removeEventListener('mousedown', handleClickAway)
            document.removeEventListener('scroll', handleClickAway)
        }

      }, [])


   

    const moveBoxedIndexer = (e:React.MouseEvent | any) => {
        let tab = e.target as HTMLDivElement;
        let { x } = tab.getBoundingClientRect();
        boxedTabIndexer!.current!.style.left = `${x}px`;
    }


    const closeTab = (e:React.MouseEvent, tab:TabItemProps) => {
        e.stopPropagation()
        if(onClose) onClose(tab)
    }


    const onShowMoreClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let target = e.target as HTMLDivElement;
        let {y} = target.getBoundingClientRect()
        hiddenTabs!.current!.style.display = 'block';
        hiddenTabs!.current!.style.position = 'absolute';
        hiddenTabs!.current!.style.left = 3 + "px";
        hiddenTabs!.current!.style.top = y + 25 + "px";
    }


    const onHiddenTabClick = (tab:TabItemProps) => {
        hiddenTabs!.current!.style.display = 'none';
        setActiveTab(tab.key)
    }

    return (
        <div>
            <div className={`relic-tabbar relic-tabbar-${tabStyle}`}>
                {
                    tabStyle === 'boxed'
                    ? <div ref={boxedTabIndexer} className="relic-tab-boxed-indexer"/>
                    : null
                }
                {
                    extras && extras.position === "left"
                    ? <div className="relic-tab-extras-left">
                        {extras.content}
                     </div>
                    : null
                }
                {tabs.map((tab, index) => (
                   index < maxVisibleTabs 
                   ? <div
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
                    : null
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
                {
                    extras && extras.position === "right"
                    ? <div className="relic-tab-extras-right">
                        {extras.content}
                    </div>
                    : null
                }
                {
                    tabs.length > maxVisibleTabs
                    ? <div className="relic-tab-show-more-wrapper">
                        <div onClick={onShowMoreClick} className="relic-tab-show-more">
                            <AiOutlineMore className="relic-tab-show-more-icon"/>
                        </div>

                        <div ref={hiddenTabs} className="relic-tab-hidden-tabs">
                            {tabs.map((tab, index) => (
                                index >= maxVisibleTabs
                                ? <div 
                                    onClick={() => onHiddenTabClick(tab)} 
                                    className={`relic-hidden-tab ${activeTab === tab.key ? 'relic-hidden-tab-active' : ''}`} 
                                    key={index}>
                                        {tab.label}
                                        <span>
                                            {activeTab === tab.key ? <AiOutlineCheck className="relic-hidden-active-tab-icon"/> : null}
                                        </span>
                                </div>
                                : null
                            ))}
                        </div>
                      </div>
                    : null
                }
            </div>

            <div className="relic-tab-content" >
                {children}
                {tabs.map((tab, index) => (
                    tab.key === activeTab ? tab.component :  null
                ))}
            </div>
        </div>
    )
}
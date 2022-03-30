import React from 'react';
import {FcDeleteDatabase} from 'react-icons/fc'
import {FaCaretDown} from 'react-icons/fa'
import {Typography} from '../Typography/Typography'


export type SplitDropdownProps = {
   
    /**
     * A JSON hierarchical structure describing the items of each dropdown.
     * Check the code examples in Docs for more.
     */
     items:Object[];
 
     /**
      * Returns the selected final element from the right split in the following form.
      * {key: 'string', title: 'string'}
      */
     onClick: (item:DropdownItem) => void;
 }
 
 export type DropdownItem = {
     key: string,
     title: string
 }

/**
 * UI Control with the purpose to allow the user perform a certain action 
 * according to a sequence of selections. Ideal for multi-menus that can 
 * have different outcomes depending the user action. See code examples for more.
 * 
 */
 export const SplitDropdown = ({
    items,
    onClick
  }:SplitDropdownProps) => {
      const splitRef = React.useRef<any>()
      const [firstItems, setFirstItems] = React.useState([])
      const [activeItems, setActiveItems] = React.useState([])
      const [activeSplit, setActiveSplit] = React.useState('left')
  
      React.useEffect(() => {

        function handleClickAway(e:MouseEvent){
            if(splitRef.current && !splitRef.current.contains(e.target)){
                document.querySelector('.relic-split-dropdown-left')?.classList.remove('relic-split-dropdown-focused');
                document.querySelector('.relic-split-dropdown-center')?.classList.remove('relic-split-dropdown-focused');
                document.querySelector('.relic-split-dropdown-right')?.classList.remove('relic-split-dropdown-focused');
                let bubble = document.querySelector('#relic-split-dropdown-content-bubble') as HTMLDivElement;
                bubble.style.opacity = "0";
            }
        }

        document.addEventListener('mousedown', handleClickAway)

  
        let firstItems:any = [];
  
        items.forEach((item:any) => {
            firstItems.push({
                title: item.title,
                key: item.key
            })
        })
        setActiveItems(firstItems);
        setFirstItems(firstItems)

        return () => {
            document.removeEventListener('mousedown', handleClickAway)
        }

      }, [])
  
  
      const localOnClick = (item:DropdownItem) => {
          
         if(activeSplit === 'left'){
              //gather the 2nd level elements
              let centerItems:any = [];
              items.forEach((it:any) => {
                  it.children.forEach((child:any) => {
                      if(child.parentKey === item.key){
                          centerItems.push({
                              title: child.title,
                              key: child.key
                          })
                      }
                  })
              })
              setActiveItems(centerItems);
  
              //get dimensions of center split
              let center = document.querySelector('#relic-split-center') as HTMLDivElement;
              let {top, left, width, height} = center.getBoundingClientRect()
             
              //set new x,y coordinates for bubble
              let bubble = document.querySelector('#relic-split-dropdown-content-bubble') as HTMLDivElement;
              bubble.style.top = `${top + height + 10}px`;
              bubble.style.left = `${left - 10 + width/2}px`;
  
              //remove focused class from left
              document.querySelector('.relic-split-dropdown-left')?.classList.remove('relic-split-dropdown-focused');
  
              //add focused class on center
              document.querySelector('.relic-split-dropdown-center')?.classList.add('relic-split-dropdown-focused');
  
              //set active split
              setActiveSplit('center')
         }
  
  
         if(activeSplit === 'center'){
             //gather the 3rd level elements
             let rightItems:any = [];
             items.forEach((it:any) => {
                 it.children.forEach((child:any) => {
                     child.children.forEach((grandChild:any) => {
                          if(grandChild.parentKey === item.key){
                              rightItems.push({
                                  title: grandChild.title,
                                  key: grandChild.key
                              })
                          }
                     })
                     
                 })
             })
             setActiveItems(rightItems);
  
             //get dimensions of right split
             let center = document.querySelector('#relic-split-right') as HTMLDivElement;
             let {top, left, width, height} = center.getBoundingClientRect()
            
             //set new x,y coordinates for bubble
             let bubble = document.querySelector('#relic-split-dropdown-content-bubble') as HTMLDivElement;
             bubble.style.top = `${top + height + 10}px`;
             bubble.style.left = `${left - 10 + width/2}px`;
  
             //remove focused class from left
             document.querySelector('.relic-split-dropdown-center')?.classList.remove('relic-split-dropdown-focused');
  
             //add focused class on center
             document.querySelector('.relic-split-dropdown-right')?.classList.add('relic-split-dropdown-focused');
  
             //set active split
             setActiveSplit('right')
         }
  
         if(activeSplit === 'right'){
              //hide bubble
              let bubble = document.querySelector('#relic-split-dropdown-content-bubble') as HTMLDivElement;
              bubble.style.opacity = "0";
              //remove focused class from right
              document.querySelector('.relic-split-dropdown-right')?.classList.remove('relic-split-dropdown-focused');
              //reset the active split
              setActiveSplit('center')
              //callback the user event listener returning them the click element
              if(onClick) onClick(item)
              
         }
      }
      
      const focusSplitDropdown = (e:React.MouseEvent<HTMLElement>) => {
          const node = e.target as HTMLElement;
          setActiveSplit(node.id.split('relic-split-')[1]);
          let {top, left, width, height} = node.getBoundingClientRect();
          document.querySelector('.relic-split-dropdown-left')?.classList.remove('relic-split-dropdown-focused');
          document.querySelector('.relic-split-dropdown-center')?.classList.remove('relic-split-dropdown-focused');
          document.querySelector('.relic-split-dropdown-right')?.classList.remove('relic-split-dropdown-focused');
          node.classList.add('relic-split-dropdown-focused')
  
          let bubble = document.querySelector('#relic-split-dropdown-content-bubble') as HTMLDivElement;
          bubble.style.opacity = "1";
          bubble.style.zIndex = "0";
          bubble.style.top = `${top + height + 10}px`;
          bubble.style.left = `${left - 10 + width/2}px`;
  
          if(node.id !== 'relic-split-left') setActiveItems([]);
          else setActiveItems(firstItems);
      }
  
      return (
         <div ref={splitRef} style={{display: 'flex', width: 90, alignItems: 'center', justifyContent: 'space-between'}}>
             <div id="relic-split-left" onMouseDown={focusSplitDropdown} className="relic-split-dropdown-left">
                  <FaCaretDown className="relic-split-dropdown-carret"/>
             </div>
  
             <div id="relic-split-center" onMouseDown={focusSplitDropdown} className="relic-split-dropdown-center">
                  <FaCaretDown className="relic-split-dropdown-carret"/>
             </div>
  
             <div id="relic-split-right" onMouseDown={focusSplitDropdown} className="relic-split-dropdown-right">
                  <FaCaretDown className="relic-split-dropdown-carret"/>
             </div>
  
             <div id="relic-split-dropdown-content-bubble" className="relic-split-dropdown-content-bubble">
                 <div className="relic-split-dropdown-content-bubble-item-container">
                      {activeItems.length === 0 
                      ? <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                          <FcDeleteDatabase style={{fontSize: 50}}/>
                          <Typography color="#8D939C" type="note" content="No items available"/>
                        </div> 
                      :activeItems.map((item:DropdownItem) => (
                          <div className="relic-split-dropdown-content-bubble-item" key={item.key} onClick={() => localOnClick(item)}>{item.title}</div>
                      ))}
                 </div>
             </div>
         </div>
      )
  }

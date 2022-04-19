import React, { ReactDOM } from 'react'
import {createPortal} from 'react-dom'
import {
    NotificationProps,
    NotificationContextProps,
    NotificationProviderProps,
    NotificationComponentProps
} from './Notification.types'
import {
    AiOutlineClose
} from 'react-icons/ai'

import {
    BsFillCheckCircleFill,
    BsExclamationCircleFill,
    BsFillInfoCircleFill,
    BsXCircleFill
} from 'react-icons/bs'

const createNotificationPortal = () => {
    const topRightPortalId = 'relic-notification-portal-container-top-right'
    const topLeftPortalId = 'relic-notification-portal-container-top-left'
    const bottomLeftPortalId = 'relic-notification-portal-container-bottom-left'
    const bottomRightPortalId = 'relic-notification-portal-container-bottom-right' 

    let topRight = document.querySelector(`#${topRightPortalId}`);
    let topLeft = document.querySelector(`#${topLeftPortalId}`);
    let bottomLeft = document.querySelector(`#${bottomLeftPortalId}`);
    let bottomRight = document.querySelector(`#${bottomRightPortalId}`);

    if(topRight && topLeft && bottomLeft && bottomRight) return [topRight, topLeft, bottomLeft, bottomRight];

    topRight = document.createElement('div')
    topRight.setAttribute('id', topRightPortalId);
    topRight.className = topRightPortalId
    document.body.appendChild(topRight)

    topLeft = document.createElement('div')
    topLeft.setAttribute('id', topLeftPortalId);
    topLeft.className = topLeftPortalId
    document.body.appendChild(topLeft)

    bottomLeft = document.createElement('div')
    bottomLeft.setAttribute('id', bottomLeftPortalId);
    bottomLeft.className = bottomLeftPortalId
    document.body.appendChild(bottomLeft)

    bottomRight = document.createElement('div')
    bottomRight.setAttribute('id', bottomRightPortalId);
    bottomRight.className = bottomRightPortalId
    document.body.appendChild(bottomRight)

    return [topRight, topLeft, bottomLeft, bottomRight]
}

const [topRight, topLeft, bottomLeft, bottomRight] = createNotificationPortal();


export const Notification = ({
   notification,
   onClose
}:NotificationComponentProps) => {
    const [isClosing, setClosing] = React.useState(false);

    React.useEffect(() => {
        if (notification.closable) {
          const timeoutId = setTimeout(() => setClosing(true), notification.duration);

          return () => {
            clearTimeout(timeoutId);
          };
        }
      }, []);


    React.useEffect(() => {
        if(isClosing){
            const timeoutId = setTimeout(onClose, 200);
        
            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [isClosing, onClose])



    return createPortal(
        <div className={`${isClosing ? 'relic-notification-container relic-notification-container-shrink' : 'relic-notification-container'}`}>
            <div className={`relic-notification relic-notification-${notification.type} ${isClosing ? `relic-notification-hide-${notification.position}` : `relic-notification-show-${notification.position}`}`}>  
                <div className="relic-notification-header">
                    <div className="relic-notification-header-container">
                        {
                            notification.type === 'success'
                            ? <BsFillCheckCircleFill className="relic-notification-icon relic-notification-icon-success"/>
                            : notification.type === 'warning'
                                ? <BsExclamationCircleFill className="relic-notification-icon relic-notification-icon-warning"/>
                                : notification.type === 'info'
                                ? <BsFillInfoCircleFill className="relic-notification-icon relic-notification-icon-info"/>
                                : notification.type === 'error'
                                ? <BsXCircleFill className="relic-notification-icon relic-notification-icon-error"/>
                                : null
                        }
                        <h3>{notification.title}</h3>
                    </div>
                    {
                        notification.closable
                        ? <div>
                                <AiOutlineClose 
                                    onClick={() => setClosing(true)} 
                                    className="relic-notification-close-icon"
                                />
                          </div>
                        : null
                    }
                </div>
                <p className="relic-notification-body">
                    {notification.description}
                </p>
            </div>
        </div>,
        notification.position === 'top-right' ? topRight 
        : notification.position === 'top-left' ? topLeft
        : notification.position === 'bottom-left' ? bottomLeft
        : notification.position === 'bottom-right' ? bottomRight
        : topRight
    )
}



const NotificationContext = React.createContext<NotificationContextProps>({
    notify: (not:NotificationProps) => {}
}) 

export const WithNotifications = ({
    children
}:NotificationProviderProps) => {
    const [notifications, setNotifications] = React.useState<NotificationProps[]>([])
    
    const notify = React.useCallback((notification:NotificationProps) => {
        setNotifications((prev:NotificationProps[]) => [...prev, notification])
    }, [])


    const closeNotification = (id:string) => {
        setNotifications(prev => {
            return prev.filter((notification) => notification.id !== id)
        })
    }

    return (
        <NotificationContext.Provider value={{
            notify
        }}>
            {notifications.map((not:NotificationProps, index:number) => {
                return <Notification 
                            key={not.id}            
                            notification={not} 
                            onClose={() => closeNotification(not.id)}
                        />
            })}
            {children}
        </NotificationContext.Provider>
    )
}


export const useNotifications = () => {
    let context = React.useContext(NotificationContext);
    if(!context) throw new Error("Missing the WithNotifications Provider! import {WithNotifications} from 'relic-ui-sb' and wrap your app with it to have global access to notifications with the useNotifications() hook")
    return context.notify
}

 
 

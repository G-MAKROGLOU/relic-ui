import React from "react";
import { WithNotifications, useNotifications } from "../components/Notification/Notification";
import {Button} from '../components/Button/Button'



/**
 * 
 * <code>import { WithNotifications, useNotifications } from 'relic-ui-sb'</code>
 * 
 * Wrap you whole app with the WithNotifications Provider and then create notifications 
 * from any component of your app with the useNotifications() hook. The useNotifications()
 * hook returns the notify() function which accepts the following object. 
 * <code>
 * <br/>
 * { <br/>
    *   &nbsp;&nbsp;&nbsp;&nbsp; id: 'a unique id for indexing' [string] [required], <br/>
    *   &nbsp;&nbsp;&nbsp;&nbsp; closable: [boolean] [required], <br/> 
    *   &nbsp;&nbsp;&nbsp;&nbsp; duration: [number] in milliseconds [required],  <br/>
    *   &nbsp;&nbsp;&nbsp;&nbsp; title: [string] [required],  <br/>
    *   &nbsp;&nbsp;&nbsp;&nbsp; type: 'success' | 'warning' | 'error' | 'info' [required], <br/>
    *   &nbsp;&nbsp;&nbsp;&nbsp; position: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left' [required],  <br/>
    *   &nbsp;&nbsp;&nbsp;&nbsp; description: [string] [required] <br/>
 * } <br/>
 * </code>
 * 
 */
export const NotificationProviderExample = () => {
   
    return (
        <WithNotifications>
        <NotificationExamples/>
    </WithNotifications>
    )
}


export const NotificationExamples = () => {
    const notify = useNotifications();

    return (
    
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 10, width: 420}}>
            
            <Button
                type="success"
                content="Top Left Notification" 
                onClick={() => notify({
                    id: 'success-notification',
                    closable: true, 
                    duration: 8000,
                    title: 'User Creation',
                    type: 'success',
                    position: 'top-left',
                    description: 'User created successfully!'
                })}
            />

            <Button
                type="danger"
                content="Top Right Notification" 
                onClick={() => notify({
                        id: 'error-notification',
                        closable: true, 
                        duration: 8000,
                        title: 'User Creation',
                        type: 'error',
                        position: 'top-right',
                        description: 'Could not create user! Try again in a few seconds!'
                    })}
            />

            <Button
                type="warning"
                content="Bottom Left Notification" 
                onClick={() => notify({
                        id: 'warning-notification',
                        closable: true, 
                        duration: 8000,
                        title: 'Log Out',
                        type: 'warning',
                        position: 'bottom-left',
                        description: '10 minutes remaining, then you\'ll have to log back in!'
                    })}
            />

            <Button
                type="info"
                content="Bottom Right Notification" 
                onClick={() => notify({
                        id: 'info-notification',
                        closable: true, 
                        duration: 8000,
                        title: 'Messages',
                        type: 'info',
                        position: 'bottom-right',
                        description: 'You have 15 unread message(s)!'
                    })}
            />
        
        </div>
        
    )
}


export default {
    title: "Notification",
    component: NotificationProviderExample,
    parameters: {
        docs: { 
            source: { 
                type: 'code' 
            } 
        } 
    },
  };






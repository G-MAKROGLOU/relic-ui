import React from 'react';
import {
    ModalProps
} from './Modal.types'
import {AiOutlineClose} from 'react-icons/ai'
import {Button} from '../Button/Button'


export const Modal = ({
    dimensions = [500, 350],
    hasFooter = true,
    okText = "Ok",
    cancelText = "Cancel",
    onOk = () => {},
    onCancel = () => {},
    isVisible = false,
    hasBackdrop = true,
    title = "Modal Title",
    children
}:ModalProps) => {
    return (
       <div>
            <div 
                className={`relic-modal-backdrop ${isVisible && hasBackdrop ? 'relic-modal-backdrop-visible' : 'relic-modal-backdrop-invisible'}`}
                onClick={() => {
                    if(isVisible && hasBackdrop) onCancel() 
                }}
            />
            <div 
                className={`relic-modal ${isVisible ? 'relic-modal-show' : 'relic-modal-shrink'}`}
                style={{
                    height: dimensions[1], 
                    width: dimensions[0],
                    top: window.innerHeight / 2 - dimensions[1] / 2,
                    left: window.innerWidth / 2 - dimensions[0] / 2,
                }}
            >
                <div className="relic-modal-header">
                    <h2>{title}</h2>
                    <AiOutlineClose 
                        onClick={onCancel}
                        className="relic-modal-close-icon"
                    />
                </div>

                <div className="relic-modal-body">
                    {children}
                </div>

                <div
                    className="relic-modal-footer"
                    style={{
                        display: hasFooter ? 'flex' : 'none'
                    }}
                >
                    <Button onClick={onCancel} type="danger" content={cancelText}/>
                    <Button onClick={onOk} type="primary" content={okText}/>
                </div>
            </div>
        
       </div>
       
    )
}


 
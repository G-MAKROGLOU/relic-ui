import React from "react";
import { Story } from "@storybook/react";
import useState from 'storybook-addon-state';
import { Modal } from "../components/Modal/Modal";
import { ModalProps } from "../components/Modal/Modal.types";
import {Button} from '../components/Button/Button'
import { useArgs } from '@storybook/client-api';

export default {
  title: "Modal",
  component: Modal,
  args: {
    hasFooter: true,
    okText: "Ok",
    cancelText: "Cancel",
    isVisible: false,
    hasBackdrop: true
  }
};



export const BasicModal = ({...args}:ModalProps) => {
  const [{isVisible}, updateArgs] = useArgs();

  const openModal = () => updateArgs({isVisible: true})

  const handleCancel = () => updateArgs({isVisible: false})

  return (
    <>
      <Button
        type="primary"
        content="Open Modal" 
        onClick={openModal}
      />
      <Modal {...args} onCancel={handleCancel} onOk={handleCancel}>

      </Modal>
    </>
  )
}







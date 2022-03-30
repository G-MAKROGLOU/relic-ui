import React from "react";
import { Story } from "@storybook/react";
import useState from 'storybook-addon-state';
import { Drawer, DrawerProps } from "../components/Drawer/Drawer";
import {Button} from '../components/Button/Button'
import { useArgs } from '@storybook/client-api';

export default {
  title: "Drawer",
  component: Drawer,
  args: {
    isOpen: false,
    title: "Drawer Title",
    clickAwayClose: false,
    anchor: "left",
    onClose: () => {}
  }
};



export const BasicDrawer = ({onClose, ...args}:DrawerProps) => {
  const [{isOpen}, updateArgs] = useArgs();

  const openDrawer = () => updateArgs({isOpen: true})

  const closeDrawer = () => updateArgs({isOpen: false})

  return (
    <>
      <Button
        type="primary"
        content="Open Drawer" 
        onClick={openDrawer}
      />
      <Drawer
        onClose={closeDrawer}
        {...args}
      >
          <div>Some Content</div>
      </Drawer>
    </>
  )
}







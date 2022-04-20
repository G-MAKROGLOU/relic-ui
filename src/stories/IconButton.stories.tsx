import React from "react";
import { Story } from "@storybook/react";
import { IconButton } from "../components/IconButton/IconButton";
import {IconButtonProps} from '../components/IconButton/IconButton.types'
import {AiOutlinePlus} from 'react-icons/ai'

export default {
  title: "IconButton",
  component: IconButton,
};

const Template: Story<IconButtonProps> = args => <IconButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type:"primary",
  loading: false,
  icon: <AiOutlinePlus style={{fontWeight: 'bold', fontSize: '1.5rem'}}/>,
  onClick: () => alert(1),
  disabled: false
};


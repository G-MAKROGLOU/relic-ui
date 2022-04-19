import React from "react";
import { Story } from "@storybook/react";
import { Button } from "../components/Button/Button";
import {ButtonProps} from '../components/Button/Button.types'


export default {
  title: "Button",
  component: Button,
};

const Template: Story<ButtonProps> = args => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type:"primary",
  size: "medium",
  content: "Button",
  buttonType: "button",
  loading: false,
  icon: null,
  onClick: () => alert(1),
  disabled: false
};


import React from "react";
import Tooltip  from "../components/Tooltip/Tooltip";
import { TooltipProps } from "../components/Tooltip/Tooltip.types";
import {Button} from '../components/Button/Button'

export default {
  title: "Tooltip",
  component: Tooltip,
  args: {
    placement: "left",
    content: "Some tooltip content",
    children: <Button type="primary" content="Click Me"/>
  }
};



export const BasicTooltip = ({children, ...args}:TooltipProps) => <Tooltip {...args}>{children}</Tooltip>
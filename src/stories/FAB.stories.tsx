import React from "react";
import { Story } from "@storybook/react";
import { FAB } from "../components/FAB/FAB";
import {FabProps} from "../components/FAB/FAB.types"


export default {
  title: "FAB",
  component: FAB,
};

const Template: Story<FabProps> = args => <FAB {...args} />;

export const BasicFAB = Template.bind({});
BasicFAB.args = {
    top: 50,
    left: 50,
    onClick: () => alert("FAB Clicked")
};

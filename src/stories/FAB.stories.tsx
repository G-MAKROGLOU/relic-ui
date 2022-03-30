import React from "react";
import { Story } from "@storybook/react";
import { FAB, FabProps } from "../components/FAB/FAB";


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

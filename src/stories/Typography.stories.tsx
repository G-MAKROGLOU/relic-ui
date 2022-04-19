import React from "react";
import { Story } from "@storybook/react";
import { Typography } from "../components/Typography/Typography";
import { TypographyProps } from "../components/Typography/Typography.types";


export default {
  title: "Typography",
  component: Typography,
};

const Template: Story<TypographyProps> = args => <Typography {...args} />;

export const BasicTypography = Template.bind({});
BasicTypography.args = {
    type: "header",
    color: "#424242",
    content: "Typography"
};

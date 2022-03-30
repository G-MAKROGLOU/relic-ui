import React from "react";
import { Story } from "@storybook/react";
import { LoadingSpinner, LoadingSpinnerProps } from "../components/LoadingSpinner/LoadingSpinner";


export default {
  title: "LoadingSpinner",
  component: LoadingSpinner,
};

const Template: Story<LoadingSpinnerProps> = args => <LoadingSpinner {...args} />;

export const BasicLoadingSpinner = Template.bind({});
BasicLoadingSpinner.args = {
  isVisible: true,
  prompt: "Loading..."
};


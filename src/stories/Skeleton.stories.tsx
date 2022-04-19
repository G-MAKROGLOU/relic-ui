import React from "react";
import { Skeleton } from "../components/Skeleton/Skeleton";
import { SkeletonProps } from "../components/Skeleton/Skeleton.types";
import { Story } from "@storybook/react";


export default {
  title: "Skeleton",
  component: Skeleton
};

const Template: Story<SkeletonProps> = args => <Skeleton {...args} />;
export const BasicSkeleton = Template.bind({})
BasicSkeleton.args = {
  isVisible: true,
  width: 400,
  repeat: 1
}





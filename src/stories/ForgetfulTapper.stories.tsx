import React, { useState } from "react";
import { ComponentStory, ComponentMeta, ArgTypes } from "@storybook/react";

import TopRoutes from "../cards/TopRoutes";
import { argTypes, storyDecorator } from "./utils";
import ForgetfulTapper from "../cards/ForgetfulTapper";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Cards",
  component: TopRoutes,
  argTypes: argTypes,
  decorators: [storyDecorator],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof TopRoutes>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TopRoutes> = (args) => (
  <ForgetfulTapper {...args} />
);

export const ForgetfulTapperStory = Template.bind({}) as ComponentStory<
  typeof ForgetfulTapper
>;

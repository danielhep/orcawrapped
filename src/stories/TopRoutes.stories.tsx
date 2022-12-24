import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TopRoutes from "../cards/TopRoutes";
import danielOrca from "./mocks/danielOrca.json";
import sabrinaOrca from "./mocks/sabrinaOrca.json";
import { fixDates } from "./utils";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Cards/TopRoutes",
  component: TopRoutes,
  decorators: [
    (Story) => (
      <div style={{ margin: "10px", width: "300px" }}>
        <Story />
      </div>
    ),
  ],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof TopRoutes>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TopRoutes> = (args) => (
  <TopRoutes {...args} />
);

export const DanielData = Template.bind({}) as ComponentStory<typeof TopRoutes>;
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DanielData.args = {
  state: fixDates(danielOrca),
};

export const SabrinaData = Template.bind({}) as ComponentStory<
  typeof TopRoutes
>;
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SabrinaData.args = {
  state: fixDates(sabrinaOrca),
};

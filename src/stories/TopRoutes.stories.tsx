import React, { useState } from "react";
import { ComponentStory, ComponentMeta, ArgTypes } from "@storybook/react";

import TopRoutes from "../cards/TopRoutes";
import danielOrca from "./mocks/danielOrca.csv";
import sabrinaOrca from "./mocks/sabrinaOrca.csv";
import { parseOrcaFileCsvSync } from "../processing_utils/processingUtils";
import { AppContext } from "../components/AppContext";

if (danielOrca) {
  console.log(parseOrcaFileCsvSync(danielOrca));
}

function getOrcaCardData(name) {
  switch (name) {
    case "daniel":
      return danielOrca;
    case "sabrina":
      return sabrinaOrca;
  }
}

const argTypes: ArgTypes = {
  orcaCardName: {
    name: "Orca Card Name",
    options: ["daniel", "sabrina"],
    defaultValue: "daniel",
    control: { type: "select" },
  },
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Cards",
  component: TopRoutes,
  argTypes,
  decorators: [
    (Story, context) => (
      <div style={{ margin: "10px", width: "300px" }}>
        <AppContext.Provider
          value={[
            parseOrcaFileCsvSync(getOrcaCardData(context.args.orcaCardName)),
            () => {},
          ]}
        >
          <Story />
        </AppContext.Provider>
      </div>
    ),
  ],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof TopRoutes>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TopRoutes> = (args) => (
  <TopRoutes {...args} />
);

export const TopRoutesStory = Template.bind({}) as ComponentStory<
  typeof TopRoutes
>;

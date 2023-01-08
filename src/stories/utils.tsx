import { AppContext } from "../components/AppContext";
import { parseOrcaFileCsvSync } from "../processing_utils/processingUtils";
import { AppState } from "../types";
import danielOrca from "./mocks/danielOrca.csv";
import sabrinaOrca from "./mocks/sabrinaOrca.csv";

export function fixDates(state: Record<string, any>): AppState {
  return {
    ...state,
    processed: state.processed.map((p) => ({ ...p, time: new Date(p.time) })),
  };
}

export function getOrcaCardData(name) {
  switch (name) {
    case "daniel":
      return danielOrca;
    case "sabrina":
      return sabrinaOrca;
  }
}

export const argTypes: ArgTypes = {
  orcaCardName: {
    name: "Orca Card Name",
    options: ["daniel", "sabrina"],
    defaultValue: "daniel",
    control: { type: "select" },
  },
};

export const storyDecorator = (Story, context) => (
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
);

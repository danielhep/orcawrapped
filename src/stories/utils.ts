import { AppState } from "../types";

export function fixDates(state: Record<string, any>): AppState {
  return {
    ...state,
    processed: state.processed.map((p) => ({ ...p, time: new Date(p.time) })),
  };
}

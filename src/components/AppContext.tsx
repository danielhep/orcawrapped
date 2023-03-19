import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { AppState, UnprocessedOrcaCard } from "../types";

export const defaultAppState: AppState = {
  orcaData: [],
  aggregateExtraData: {
    routeOccurrences: [],
    trips: [],
    tapOffBehavior: {
      expected: 0,
      missing: 0,
    },
    linkStats: {
      stationStats: [],
      linkTrips: [],
    },
  },
  totalRowCount: 0,
};

export const AppContext = createContext<
  [AppState, Dispatch<SetStateAction<UnprocessedOrcaCard[]>>]
>([defaultAppState, () => {}]);

export function useAppState(): [
  AppState,
  Dispatch<SetStateAction<UnprocessedOrcaCard[]>>
] {
  const appContext = useContext(AppContext);
  return appContext;
}

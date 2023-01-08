import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { AppState, OrcaCSVOutput } from "../types";

export const AppContext = createContext<
  [AppState | undefined, Dispatch<SetStateAction<OrcaCSVOutput>>]
>([{ processed: [] }, () => {}]);

export function useAppState(): [
  AppState | undefined,
  Dispatch<SetStateAction<OrcaCSVOutput>>
] {
  const appContext = useContext(AppContext);
  return appContext;
}

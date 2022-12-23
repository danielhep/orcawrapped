import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { ExtraDataType, ProcessedOrcaData } from "../types";

export interface AppState {
  processed: ProcessedOrcaData[];
  extraData?: ExtraDataType;
}

export const AppContext = createContext<
  [AppState, Dispatch<SetStateAction<AppState>>]
>([{ processed: [] }, () => {}]);

export function useAppState(): [AppState, Dispatch<SetStateAction<AppState>>] {
  const appContext = useContext(AppContext);
  return appContext;
}

import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { AppState, ExtraDataType, ProcessedOrcaData } from "../types";

export const AppContext = createContext<
  [AppState | undefined, Dispatch<SetStateAction<AppState>>]
>([{ processed: [] }, () => {}]);

export function useAppState(): [
  AppState | undefined,
  Dispatch<SetStateAction<AppState>>
] {
  const appContext = useContext(AppContext);
  return appContext;
}

import dynamic from "next/dynamic";
import { WrappedCard } from "../../types";

export default {
  score: () => 1000,
  cardName: "General Stats",
  Component: dynamic(() => import("./GeneralStats"), { ssr: false }),
} as WrappedCard;

import dynamic from "next/dynamic";
import { WrappedCard } from "../../types";

export default {
  score: () => 997,
  cardName: "General Stats",
  Component: dynamic(() => import("./GeneralStats"), { ssr: false }),
} as WrappedCard;

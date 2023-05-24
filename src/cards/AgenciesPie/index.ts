import dynamic from "next/dynamic";
import { WrappedCard } from "../../types";

export default {
  score: () => 1000,
  cardName: "Agencies Pie",
  Component: dynamic(() => import("./AgenciesPie"), { ssr: false }),
} as WrappedCard;

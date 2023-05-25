import dynamic from "next/dynamic";
import { WrappedCard } from "../../types";

export default {
  score: () => 998,
  cardName: "Calendar",
  Component: dynamic(() => import("./Calendar"), { ssr: false }),
} as WrappedCard;

import dynamic from "next/dynamic";
import { WrappedCard } from "../../types";

export default {
  score: () => 1000,
  cardName: "Calendar",
  Component: dynamic(() => import("./Calendar"), { ssr: false }),
} as WrappedCard;

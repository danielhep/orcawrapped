import dynamic from "next/dynamic";
import { WrappedCard } from "../../types";

export default {
  score: () => 1000,
  cardName: "Top Routes",
  Component: dynamic(() => import("./TopRoutes"), { ssr: false }),
} as WrappedCard;

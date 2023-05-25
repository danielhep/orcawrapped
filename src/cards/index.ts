import dynamic from "next/dynamic";
import { WrappedCard } from "../types";
import TopRoutes from "./TopRoutes";
import AgenciesPie from "./AgenciesPie";
import Calendar from "./Calendar";
import GeneralStats from "./GeneralStats";

const allStories: WrappedCard[] = [
  TopRoutes,
  AgenciesPie,
  Calendar,
  GeneralStats,
];

export default allStories;

import dynamic from "next/dynamic";
import { WrappedCard } from "../types";
import TopRoutes from "./TopRoutes";
import AgenciesPie from "./AgenciesPie";
import Calendar from "./Calendar";

const allStories: WrappedCard[] = [TopRoutes, AgenciesPie, Calendar];

export default allStories;

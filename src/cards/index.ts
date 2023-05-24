import dynamic from "next/dynamic";
import { WrappedCard } from "../types";
import TopRoutes from "./TopRoutes";
import AgenciesPie from "./AgenciesPie";

const allStories: WrappedCard[] = [TopRoutes, AgenciesPie, TopRoutes];

export default allStories;

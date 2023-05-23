import { useRef } from "react";
import OrcaCard from "../../components/ui/OrcaCard";
import { useSize } from "ahooks";
import { ResponsiveBar } from "@nivo/bar";
import { useAppState } from "../../components/AppContext";
import data from "./data";

export default function TopRoutes() {
  const topLevelRef = useRef(null);
  const size = useSize(topLevelRef);
  const [appState] = useAppState();
  const routeOccurrences = appState.aggregateExtraData.routeOccurrences;
  const sorted = routeOccurrences
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <OrcaCard ref={topLevelRef} sx={{ aspectRatio: "9/16" }}>
      <ResponsiveBar
        // Disable typescript for sorted
        data={sorted as any}
        keys={["count"]}
        indexBy="routeShortName"
        layout="horizontal"
        margin={{ top: 50, right: 0, bottom: 50, left: 60 }}
        colors={{ scheme: "nivo" }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Rides",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        role="application"
        ariaLabel="Nivo bar chart demo"
      />
    </OrcaCard>
  );
}

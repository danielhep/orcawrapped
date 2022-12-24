import { GradientPinkBlue, LinearGradient } from "@visx/gradient";
import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import React from "react";
import { AppState } from "../components/AppContext";
import { TransitStory } from "./StoryInterface";

function FavoriteRoutes({ state }: { state: AppState }): JSX.Element {
  const data = state?.extraData?.routeOccurrences.slice(0, 5) ?? [];

  return (
    <div
      style={{
        aspectRatio: "9/16",
        boxShadow: "0px 0px 15px 0px #c745ff",
        borderRadius: 15,
      }}
    >
      <ParentSize>
        {(parent) => {
          const margin = 0.1 * parent.height;
          const yScale = scaleBand({
            domain: data.map((d) => d.line),
            range: [margin, parent.height - margin],
            padding: 0,
            round: true,
          });

          const xScale = scaleLinear({
            range: [0, parent.width],
            round: true,
            domain: [0, Math.max(...data.map((d) => d.count))],
          });

          return (
            <svg width={parent.width} height={parent.height}>
              <LinearGradient
                id="gradient"
                from="#351CAB"
                to="#621A61"
                rotate="-45"
              />
              <LinearGradient
                id="barGradient"
                from="#000"
                to="#621A61"
                rotate="45"
              />
              <rect
                rx={15}
                width={parent.width}
                height={parent.height}
                fill="url('#gradient')"
              />
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                y={30}
                x={parent.width / 2}
                style={{ fill: "white", fontWeight: "bold", fontSize: "20pt" }}
              >
                2022 TOP 5 LINES
              </text>
              <Group top={60}>
                {data.map((line, i) => {
                  const barWidth = xScale(line.count);
                  const barHeight = yScale.bandwidth();
                  const barY = (yScale(line.line) ?? 0) - barHeight / 2;
                  return (
                    <React.Fragment key={line.line}>
                      <Bar
                        key={`bar-${line.line}`}
                        width={barWidth}
                        height={barHeight}
                        y={barY}
                        x={0}
                        fill="url(#barGradient)"
                        opacity={0.5}
                      />
                      <text
                        dominantBaseline="middle"
                        y={yScale(line.line)}
                        x={10}
                        style={{ fill: "white" }}
                      >
                        {line.routeShortName}
                      </text>
                    </React.Fragment>
                  );
                })}
              </Group>
            </svg>
          );
        }}
      </ParentSize>
    </div>
  );
}

FavoriteRoutes.storyName = "Favorite Routes";
FavoriteRoutes.test = () => true;

export default FavoriteRoutes as TransitStory;

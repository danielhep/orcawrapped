import { GradientPinkBlue, LinearGradient } from "@visx/gradient";
import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import React, { useLayoutEffect, useRef, useState } from "react";
import { AppState, WrappedCard } from "../types";

function BarElement({ line, yScale, xScale, maxWidth }) {
  const TEXT_PADDING = 10;
  const OVERHANG = 40;
  const textRef = useRef<SVGTextElement>(null);
  const [textWidth, setTextWidth] = useState(0);
  const barWidth = xScale(line.count) + OVERHANG;
  const barHeight = yScale.bandwidth() - 10;
  const barY = (yScale(line.id) ?? 0) - barHeight / 2;
  const barX = -OVERHANG;
  const textX = barX + barWidth + TEXT_PADDING;
  const adjustedTextX =
    textX + textWidth + TEXT_PADDING > maxWidth
      ? textX - (textWidth + TEXT_PADDING + textX - maxWidth)
      : textX;
  useLayoutEffect(() => {
    setTextWidth(textRef.current?.getBBox().width ?? 0);
  }, []);
  return (
    <React.Fragment key={`${line.line ?? "unknown"}-${line.agencyName}`}>
      <Bar
        key={`bar-${line.line ?? "unknown"}-${line.agencyName}`}
        width={barWidth}
        height={barHeight}
        y={barY}
        x={barX}
        rx={20}
        fill="url(#barGradient)"
        opacity={0.5}
      />
      <text
        ref={textRef}
        dominantBaseline="middle"
        y={yScale(`${line.line ?? "unknown"}-${line.agencyName}`)}
        x={adjustedTextX}
        style={{ fill: "white", fontSize: "2em" }}
      >
        {line.routeShortName ?? "<Unknown>"}
      </text>
      <text
        dominantBaseline="middle"
        y={yScale(`${line.line ?? "unknown"}-${line.agencyName}`) + 22}
        x={adjustedTextX}
        style={{ fill: "white", fontSize: "1em" }}
      >
        {line.count} Rides
      </text>
    </React.Fragment>
  );
}

function FavoriteRoutes({ state }: { state: AppState }): JSX.Element {
  const data = state?.extraData?.routeOccurrences.slice(0, 4) ?? [];
  const dataWithIDs = data.map((d) => ({
    ...d,
    id: `${d.line ?? "unknown"}-${d.agencyName}`,
  }));

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
          const yScale = scaleBand({
            domain: dataWithIDs.map((d) => d.id),
            range: [80, parent.height - 20],
            padding: 0,
            round: true,
          });

          const xScale = scaleLinear({
            range: [0, parent.width - 20],
            round: true,
            nice: true,
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
                y={40}
                x={10}
                style={{ fill: "white", fontWeight: "bold", fontSize: "30px" }}
              >
                TOP ROUTES
              </text>
              <text
                textAnchor="end"
                y={40 + 30 + 10}
                x={parent.width - 10}
                style={{
                  fill: "white",
                  fontWeight: "bold",
                  fontSize: "30px",
                }}
              >
                OF 2022
              </text>
              <Group top={60}>
                {dataWithIDs.map((line, i) => (
                  <BarElement
                    line={line}
                    yScale={yScale}
                    xScale={xScale}
                    key={line.id}
                    maxWidth={parent.width}
                  />
                ))}
              </Group>
            </svg>
          );
        }}
      </ParentSize>
    </div>
  );
}

FavoriteRoutes.cardName = "Top Routes";
FavoriteRoutes.test = () => true;

export default FavoriteRoutes as WrappedCard;

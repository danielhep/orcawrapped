import { useRef } from "react";
import OrcaCard from "../../components/ui/OrcaCard";
import { useSize } from "ahooks";
import { Bar, ResponsiveBar } from "@nivo/bar";
import { useAppState } from "../../components/AppContext";
import { linearGradientDef } from "@nivo/core";
import { Box, Typography, useTheme } from "@mui/material";

export default function TopRoutes() {
  const topLevelRef = useRef(null);
  const theme = useTheme();
  const boxRef = useRef(null);
  const size = useSize(boxRef);
  const textColor = theme.palette.text.primary;
  const [appState] = useAppState();
  const routeOccurrences = appState.aggregateExtraData.routeOccurrences;
  const sorted = routeOccurrences
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .sort((a, b) => a.count - b.count);

  return (
    <OrcaCard
      ref={topLevelRef}
      sx={{
        aspectRatio: "9/16",
        display: "flex",
        flexDirection: "column",
        justifyContent: "stretch",
        justifyItems: "stretch",
      }}
    >
      <Box sx={{ mt: 1 }} flexShrink={1}>
        <Typography
          variant="h4"
          sx={{ color: theme.palette.brightText, textAlign: "center" }}
        >
          Your Top Routes
        </Typography>
      </Box>
      <Box
        ref={boxRef}
        position={"relative"}
        flexGrow={1}
        justifySelf={"stretch"}
      >
        {/* hacky hack hack to make the svg not grow infinitely */}
        <Box height="99%" position="relative">
          <ResponsiveBar
            // Disable typescript for sorted
            data={sorted as any}
            keys={["count"]}
            indexBy="routeShortName"
            colorBy="indexValue"
            colors={{ scheme: "pastel2" }}
            layout="horizontal"
            margin={{ top: 5, right: 5, bottom: 50, left: 80 }}
            enableLabel={false}
            defs={[
              linearGradientDef(
                "gradientA",
                [
                  { offset: 0, color: "inherit" },
                  { offset: 100, color: "inherit", opacity: 0.5 },
                ],
                {
                  gradientTransform: "rotate(270 0.5 0.5)",
                }
              ),
            ]}
            enableGridX={false}
            borderWidth={2}
            enableGridY={false}
            fill={[{ match: "*", id: "gradientA" }]}
            theme={{
              textColor: textColor,
              fontSize: 16,
              tooltip: {
                container: { background: theme.palette.background.default },
              },
            }}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            borderRadius={5}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legendPosition: "middle",
              legendOffset: 32,
              tickValues: 5,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            role="application"
            ariaLabel="Top routes bar chart"
          />
        </Box>
      </Box>
    </OrcaCard>
  );
}

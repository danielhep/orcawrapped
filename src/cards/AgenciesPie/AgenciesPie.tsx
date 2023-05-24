import { useRef } from "react";
import OrcaCard from "../../components/ui/OrcaCard";
import { useSize } from "ahooks";
import { ResponsivePie } from "@nivo/pie";
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
  const agencyOccurrences = appState.aggregateExtraData.agencyOccurrences.map(
    (d) => ({ label: d.agency, id: d.agency, value: d.count })
  );
  const totalOccurrences = agencyOccurrences.reduce(
    (prev, cur) => prev + cur.value,
    0
  );
  console.log(agencyOccurrences);

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
          Agency Breakdown
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
          <ResponsivePie
            // Disable typescript for sorted
            data={agencyOccurrences as any}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            margin={{ top: 10, bottom: 10, right: 20, left: 20 }}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            colors={{ scheme: "pastel2" }}
            theme={{
              textColor: textColor,
              fontSize: 12,
              tooltip: {
                container: { background: theme.palette.background.default },
              },
            }}
            role="application"
            enableArcLinkLabels={false}
            arcLabel="id"
            arcLabelsSkipAngle={20}
          />
        </Box>
      </Box>
    </OrcaCard>
  );
}

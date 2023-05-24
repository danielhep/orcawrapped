import { useRef } from "react";
import OrcaCard from "../../components/ui/OrcaCard";
import { useSize } from "ahooks";
import { ResponsiveWaffle } from "@nivo/waffle";
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
          <ResponsiveWaffle
            // Disable typescript for sorted
            data={agencyOccurrences as any}
            rows={24}
            total={totalOccurrences}
            columns={14}
            padding={1}
            colors={{ scheme: "pastel2" }}
            theme={{
              textColor: textColor,
              fontSize: 16,
              tooltip: {
                container: { background: theme.palette.background.default },
              },
            }}
            borderRadius={2}
            role="application"
            ariaLabel="Top routes bar chart"
          />
        </Box>
      </Box>
    </OrcaCard>
  );
}

import { useRef } from "react";
import OrcaCard from "../../components/ui/OrcaCard";
import { useSize } from "ahooks";
import { ResponsivePie } from "@nivo/pie";
import { useAppState } from "../../components/AppContext";
import { linearGradientDef } from "@nivo/core";
import { Box, Typography, useTheme } from "@mui/material";
import { ResponsiveCalendar } from "@nivo/calendar";

export default function TopRoutes() {
  const topLevelRef = useRef(null);
  const theme = useTheme();
  const boxRef = useRef(null);
  const textColor = theme.palette.text.primary;
  const [appState] = useAppState();
  const ridesByDate = appState.aggregateExtraData.ridesByDate.filter(
    (date) => date.value > 0
  );
  const interval = {
    start: ridesByDate[0].day,
    end: ridesByDate[ridesByDate.length - 1].day,
  };

  return (
    <OrcaCard
      ref={topLevelRef}
      sx={{
        aspectRatio: "9/16",
        display: "flex",
        flexDirection: "column",
        justifyContent: "stretch",
        justifyItems: "stretch",
        // maxWidth: "800px",
        // minWidth: "600px",
      }}
    >
      <Box sx={{ mt: 1 }} flexShrink={1}>
        <Typography
          variant="h4"
          sx={{ color: theme.palette.brightText, textAlign: "center" }}
        >
          Calendar
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
          <ResponsiveCalendar
            direction="vertical"
            from={interval.start}
            to={interval.end}
            data={ridesByDate}
            monthSpacing={5}
            monthBorderWidth={0}
            dayBorderWidth={1}
            // colors={["#ddd", "#97e3d5", "#e8c1a0", "#f47560"]}
            emptyColor="#555"
          />
        </Box>
      </Box>
    </OrcaCard>
  );
}

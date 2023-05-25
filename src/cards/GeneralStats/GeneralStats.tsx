import { useRef } from "react";
import OrcaCard from "../../components/ui/OrcaCard";
import { useSize } from "ahooks";
import { Bar, ResponsiveBar } from "@nivo/bar";
import { useAppState } from "../../components/AppContext";
import { linearGradientDef } from "@nivo/core";
import { Box, List, ListItem, Typography, useTheme } from "@mui/material";
import { ActivityType } from "../../types";

const Statistic = ({ title, body }) => {
  return (
    <ListItem
      disablePadding
      sx={{ display: "flex", alignItems: "stretch", mb: 2 }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          border: "1px solid #999",
          p: 2,
          width: "100%",
        }}
      >
        <Box sx={{ color: "text.secondary" }}>{title}</Box>
        <Box sx={{ color: "text.primary", fontSize: 34, fontWeight: "medium" }}>
          {body}
        </Box>
      </Box>
    </ListItem>
  );
};

export default function TopRoutes() {
  const topLevelRef = useRef(null);
  const theme = useTheme();
  const boxRef = useRef(null);
  const [appState] = useAppState();
  const totalCost = appState.orcaData
    .flatMap((od) => od.processed)
    .filter((row) => row.activity !== ActivityType.MONEY_LOAD && row.activity)
    .reduce((prev, cur) => {
      return prev + cur.cost;
    }, 0);
  const totalCostHuman = totalCost.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const missedTapOffs = appState.aggregateExtraData.tapOffBehavior.missing;
  console.log(missedTapOffs);
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
          Statistics
        </Typography>
      </Box>
      <Box
        ref={boxRef}
        position={"relative"}
        flexGrow={1}
        justifySelf={"stretch"}
      >
        <List>
          <Statistic
            title={"Total amount spent on transit"}
            body={`${totalCostHuman}`}
          />
          <Statistic title={"Missed tap offs"} body={`${missedTapOffs}`} />
        </List>
      </Box>
    </OrcaCard>
  );
}

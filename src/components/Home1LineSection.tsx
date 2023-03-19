import styled from "@emotion/styled";
import { Apps } from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";
import { AppState } from "../types";
import { useAppState } from "./AppContext";
import FloatingCard from "./ui/FloatingCard";

const ScrollingText = styled(motion.p)`
  color: white;
  font-weight: 500;
  font-size: 2em;
  text-align: center;
  font-family: Arvo;
  text-shadow: 1px 1px 0 black;
  font-style: italic;
`;

export default function Home1LineSection() {
  const mainRef = useRef(null);
  const [appState] = useAppState();

  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["end end", "start start"],
  });
  const transformedXPos = useTransform(
    scrollYProgress,
    [0, 0.4],
    ["-75vw", "0vw"]
  );
  const cardOpacity = useTransform(scrollYProgress, [0.4, 0.45], ["0", "1"]);
  const cardTransformY = useTransform(
    scrollYProgress,
    [0.4, 0.45],
    ["20%", "0%"]
  );

  const linkTripsCount =
    appState?.aggregateExtraData.linkStats.linkTrips.length ?? 0;
  const linkTripPercentage = Math.round(
    (linkTripsCount / (appState?.aggregateExtraData.trips.length ?? 1)) * 100
  );

  if (!appState) return null;
  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div style={{ opacity: cardOpacity, y: cardTransformY }}>
        <FloatingCard>
          You made <CountUp end={linkTripsCount ?? 0} /> trips on Link, <br />
          {linkTripPercentage}% of all your trips.
        </FloatingCard>
      </motion.div>
      <ScrollingText style={{ x: transformedXPos }} ref={mainRef}>
        This is the 1-Line, to Northgate.
      </ScrollingText>
    </Box>
  );
}

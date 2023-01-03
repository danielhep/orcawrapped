import styled from "@emotion/styled";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useAppState } from "./AppContext";

const ScrollingText = styled(motion.p)`
  color: white;
  font-weight: 500;
  font-size: 2em;
  text-align: center;
  font-family: Arvo;
  text-shadow: 1px 1px 0 black;
  font-style: italic;
`;

export default function HomeTopStation() {
  const mainRef = useRef(null);
  const [appState] = useAppState();

  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["end end", "start start"],
  });
  const transformedXPos = useTransform(
    scrollYProgress,
    [0, 0.45],
    ["85vw", "0vw"]
  );
  const cardOpacity = useTransform(scrollYProgress, [0.4, 0.45], ["0", "1"]);
  const cardTransformY = useTransform(
    scrollYProgress,
    [0.4, 0.45],
    ["20%", "0%"]
  );

  const stationStats = appState?.extraData?.linkStats.stationStats ?? [];
  const totalBoops = stationStats.reduce((prev, cur) => prev + cur.count, 0);
  const percentage = Math.round((stationStats[0].count / totalBoops) * 100);

  console.log(stationStats[0]);
  let doorSideText = "";
  if (stationStats[0].doorSide === "LEFT") {
    doorSideText = "left";
  } else if (stationStats[0].doorSide === "RIGHT") {
    doorSideText = "right";
  }

  if (!appState) return null;
  return (
    <Box
      sx={{
        minHeight: "30vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ScrollingText style={{ x: transformedXPos }} ref={mainRef}>
        Next stop, {stationStats[0].station.split(" Station")[0]}.
        {doorSideText !== "" &&
          ` Doors to my
        ${doorSideText}.`}
      </ScrollingText>
      <motion.div style={{ opacity: cardOpacity, y: cardTransformY }}>
        <Card sx={{ mx: 4 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              <>
                {percentage}% of your trips on Link began
                <br /> or ended at {stationStats[0].station}.
              </>
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}

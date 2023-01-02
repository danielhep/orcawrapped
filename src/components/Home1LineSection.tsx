import styled from "@emotion/styled";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
      <motion.div style={{ opacity: cardOpacity, y: cardTransformY }}>
        <Card sx={{ mx: 4 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              You made 2000 trips on Link, <br />
              67% of all your trips.
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
      <ScrollingText style={{ x: transformedXPos }} ref={mainRef}>
        This is the 1-Line, to Northgate.
      </ScrollingText>
    </Box>
  );
}

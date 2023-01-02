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

export default function HomeTopStation() {
  const mainRef = useRef(null);

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
        Next stop, Roosevelt. Doors to my left.
      </ScrollingText>
      <motion.div style={{ opacity: cardOpacity, y: cardTransformY }}>
        <Card sx={{ mx: 4 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              87% of your trips on Link began
              <br /> or ended at Roosevelt Station.
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}

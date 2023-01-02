import { JustifiedGrid } from "@egjs/react-grid";
import { Box, Container } from "@mui/material";
import { useAppState } from "../src/components/AppContext";
import { motion, useScroll } from "framer-motion";

import allStories from "../src/cards";
import styled from "@emotion/styled";
import CountUp from "react-countup";
import { ExpandMore } from "@mui/icons-material";
import { useRef } from "react";
import Home1LineSection from "../src/components/Home1LineSection";
import HomeTopRoute from "../src/components/HomeTopStation";

const BigText = styled.p`
  color: white;
  font-weight: 700;
  font-size: 3em;
  font-family: Arvo;
  text-shadow: 2px 2px 0 black;
`;

const SmallerText = styled.p`
  color: white;
  font-weight: 500;
  font-size: 2em;
  text-align: center;
  font-family: Arvo;
  text-shadow: 1px 1px 0 black;
`;

const DramaticText = styled.span`
  font-weight: 900;
  text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
    3px 3px 0 red;
`;

const ScrollingText = styled(motion.p)`
  color: white;
  font-weight: 500;
  font-size: 2em;
  text-align: center;
  font-family: Arvo;
  text-shadow: 1px 1px 0 black;
`;

export default function Wrapped(): JSX.Element | null {
  const [appState] = useAppState();

  if (!appState) return null;
  const shownStories = allStories.filter((s) => s.test(appState));
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <BigText>
            <DramaticText>50 million:</DramaticText>
            <br /> the number of taps recorded on the new ORCA system in 2022
          </BigText>
          <BigText>
            Let{"'"}s see how your{" "}
            <DramaticText>
              <CountUp
                duration={1}
                end={appState.processed.length}
                formattingFn={(n) => n.toLocaleString()}
              />
            </DramaticText>{" "}
            boops broke down.
          </BigText>
          <SmallerText>Here is your year on transit.</SmallerText>
          <ExpandMore
            htmlColor="white"
            sx={{ margin: "auto", display: "block", fontSize: 75 }}
          />
        </Container>
      </Box>
      <Home1LineSection />
      <HomeTopRoute />

      <JustifiedGrid gap={30} columnRange={[1, 4]}>
        {shownStories.map((S, index) => (
          <S state={appState} key={`${S.cardName}-${index}`} />
        ))}
      </JustifiedGrid>
    </>
  );
}

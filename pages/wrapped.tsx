import { JustifiedGrid } from "@egjs/react-grid";
import { Box, Container } from "@mui/material";
import { useAppState } from "../src/components/AppContext";
import { css } from "@emotion/css";

import allStories from "../src/cards";
import styled from "@emotion/styled";
import CountUp from "react-countup";

const BigText = styled.p`
  color: white;
  font-weight: 700;
  font-size: 3em;
  font-family: Arvo;
`;

const SmallerText = styled.p`
  color: white;
  font-weight: 500;
  font-size: 2em;
`;

const DramaticText = styled.span`
  font-weight: 900;
  text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black,
    3px 3px 0 red;
`;

export default function Wrapped(): JSX.Element | null {
  const [appState] = useAppState();
  if (!appState) return null;
  const shownStories = allStories.filter((s) => s.test(appState));

  return (
    <Container>
      <Box>
        <BigText>
          Across the Puget Sound, people took
          <br />
          <DramaticText>
            <CountUp
              duration={1}
              end={1402324}
              formattingFn={(n) => n.toLocaleString()}
            />
          </DramaticText>{" "}
          trips in 2022.
        </BigText>
        <BigText>
          At least{" "}
          <DramaticText>
            <CountUp
              duration={1}
              end={appState.extraData?.trips?.length || 0}
              formattingFn={(n) => n.toLocaleString()}
            />
          </DramaticText>{" "}
          of those were you!
        </BigText>
        <SmallerText>
          Here{"'"}s how you spent your time on transit in 2022.
        </SmallerText>
      </Box>
      <JustifiedGrid gap={30} columnRange={[1, 4]}>
        {shownStories.map((S, index) => (
          <S state={appState} key={`${S.cardName}-${index}`} />
        ))}
      </JustifiedGrid>
    </Container>
  );
}

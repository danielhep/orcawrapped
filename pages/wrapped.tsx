import { JustifiedGrid } from "@egjs/react-grid";
import { Box, Container } from "@mui/material";
import { useAppState } from "../src/components/AppContext";
import { css } from "@emotion/css";

import allStories from "../src/cards";
import styled from "@emotion/styled";

const BigText = styled.p`
  color: white;
  font-weight: 700;
  font-size: 3em;
`;

const SmallerText = styled.p`
  color: white;
  font-weight: 500;
  font-size: 2em;
`;

export default function Wrapped(): JSX.Element | null {
  const [appState] = useAppState();
  if (!appState) return null;
  const shownStories = allStories.filter((s) => s.test(appState));

  return (
    <Container>
      <Box>
        <BigText>
          People made 1,000,000 trips on Puget Sound transit agencies in 2022.
        </BigText>
        <BigText>
          At least{" "}
          <span
            className={css`
              font-weight: 900;
              text-shadow: 0 0 12px 12px red;
              text-decoration: underline;
            `}
          >
            {appState.extraData?.trips.length}
          </span>{" "}
          of those were you!
        </BigText>
        <SmallerText>
          Here's how you spent your time on transit in 2022.
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

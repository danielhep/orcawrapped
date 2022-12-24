import { JustifiedGrid } from "@egjs/react-grid";
import { Container } from "@mui/material";
import { useRef } from "react";
import { useAppState } from "../src/components/AppContext";

import allStories from "../src/cards";

export default function Wrapped(): JSX.Element | null {
  const newRef = useRef(null);
  const [appState] = useAppState();
  if (!appState) return null;
  const shownStories = allStories.filter((s) => s.test(appState));

  return (
    <Container>
      <div ref={newRef}>
        <JustifiedGrid gap={30} columnRange={[1, 4]}>
          {shownStories.map((S, index) => (
            <S state={appState} key={`${S.cardName}-${index}`} />
          ))}
        </JustifiedGrid>
      </div>
    </Container>
  );
}

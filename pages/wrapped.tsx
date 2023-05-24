import { Box, Container, Typography, useTheme } from "@mui/material";
import OrcaQuestionBox from "../src/components/OrcaQuestionBox";
import WrappedHeader from "../src/components/WrappedHeader";
import { useAppState } from "../src/components/AppContext";
import allStories from "../src/cards";
import dynamic from "next/dynamic";

const Grid2 = dynamic(() => import("@mui/material/Unstable_Grid2/Grid2"), {
  ssr: false,
});

export default function Wrapped(): JSX.Element {
  const theme = useTheme();
  const [appState] = useAppState();
  const shownStories = allStories.sort((story) => story.score(appState));
  return (
    <>
      <WrappedHeader />
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "-100px" }}>
          <OrcaQuestionBox>
            ORCA Next Gen launched in May 2022. Some usage data is only
            available for taps on the new ORCA readers.
          </OrcaQuestionBox>
        </Box>
      </Container>
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          <Typography
            variant="h3"
            component="p"
            marginBottom={4}
            marginTop={4}
            color={theme.palette.text.primary}
          >
            Since ORCA NextGen launched, people have booped their cards{" "}
            <span style={{ color: theme.palette.brightText }}>82,158,434</span>{" "}
            times.
          </Typography>
          <Typography
            variant="h3"
            component="p"
            color={theme.palette.text.primary}
          >
            Here's how your{" "}
            <span style={{ color: theme.palette.brightText }}>
              {appState.totalRowCount}
            </span>{" "}
            boops broke down.
          </Typography>
        </Box>
      </Container>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid2 container spacing={4}>
          {shownStories.map((story, index) => (
            <Grid2
              key={`${story.cardName}`}
              flexGrow={1}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <story.Component />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </>
  );
}

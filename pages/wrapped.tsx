import { Box, Container, Typography, useTheme } from "@mui/material";
import OrcaQuestionBox from "../src/components/OrcaQuestionBox";
import WrappedHeader from "../src/components/WrappedHeader";

export default function Wrapped(): JSX.Element {
  const theme = useTheme();

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
          }}
        >
          <Typography
            variant="h3"
            component="p"
            marginBottom={4}
            marginTop={4}
            color={theme.palette.text.primary}
          >
            In 2022, People made{" "}
            <span style={{ color: theme.palette.brightText }}>1,000,000</span>{" "}
            Trips on Puget Sound Transit Agencies.
          </Typography>
          <Typography
            variant="h3"
            component="p"
            color={theme.palette.text.primary}
          >
            At least 1,203 of those were you!
          </Typography>
        </Box>
      </Container>
    </>
  );
}

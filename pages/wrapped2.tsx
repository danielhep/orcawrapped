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
          <OrcaQuestionBox />
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
          <Typography variant="h3" component="p" marginBottom={4} marginTop={4}>
            In 2022, People made 1,000,000 Trips on Puget Sound Transit
            Agencies.
          </Typography>
          <Typography variant="h3" component="p">
            At least 1,203 of those were you!
          </Typography>
        </Box>
      </Container>
    </>
  );
}

import { Box, Container } from "@mui/material";
import OrcaQuestionBox from "../src/components/OrcaQuestionBox";
import WrappedHeader from "../src/components/WrappedHeader";

export default function Wrapped(): JSX.Element {
  return (
    <>
      <WrappedHeader />
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "-100px" }}>
          <OrcaQuestionBox />
        </Box>
      </Container>
    </>
  );
}

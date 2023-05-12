import { Box, Typography } from "@mui/material";

export default function OrcaQuestionBox() {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          borderRadius: 9999,
          width: "100px",
          fontFamily: "IBM Plex Serif",
          fontWeight: 700,
          fontSize: "64px",
          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          background: "#6CBEC5",
          aspectRatio: "1/1",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          mr: 3,
        }}
      >
        ?
      </Box>
      <Typography sx={{ maxWidth: 400, fontSize: "24px" }}>
        In 2022, we got ORCA NextGen, which is when data collection began.
        Therefore, this is a partial year in review.
      </Typography>
    </Box>
  );
}

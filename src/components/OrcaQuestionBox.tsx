import { Box, Typography, useTheme } from "@mui/material";

export default function OrcaQuestionBox({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          borderRadius: 9999,
          width: "100px",
          fontFamily: theme.fonts.titleFont,
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
      <Typography
        sx={{ maxWidth: 400, fontSize: 18 }}
        color={theme.palette.text.primary}
      >
        {children}
      </Typography>
    </Box>
  );
}

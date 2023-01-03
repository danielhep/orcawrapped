import { Box } from "@mui/material";
import React from "react";

export default function FloatingCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        mx: 4,
        borderRadius: 10,
        background: "white",
        px: 4,
        py: 0.5,
        boxShadow: "3px 3px 10px black",
        fontWeight: "700",
        fontSize: 24,
        fontFamily: "Open SansVariable",
      }}
    >
      {children}
    </Box>
  );
}

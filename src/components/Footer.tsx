import { Box } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100vw",
        top: "100vh",
        position: "sticky",
        display: "flex",
        alignContent: "space-around",
        justifyContent: "center",
        height: 36,
      }}
    >
      <Link href="/credits">Credits</Link>
    </Box>
  );
}

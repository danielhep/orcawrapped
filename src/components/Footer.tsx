import { Box, Typography, Link as MuiLink } from "@mui/material";
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
        alignItems: "center",
        gap: 4,
        height: 48,
      }}
    >
      <Link href="/credits" passHref legacyBehavior>
        <MuiLink>Credits</MuiLink>
      </Link>
      <Link href="https://ko-fi.com/danielhep" passHref legacyBehavior>
        <MuiLink>Buy me a Coffee</MuiLink>
      </Link>
      <Typography>
        ORCA Wrapped is not affiliated with ORCA agencies.
      </Typography>
    </Box>
  );
}

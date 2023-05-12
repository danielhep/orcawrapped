import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

export default function WrappedHeader() {
  return (
    <Box
      sx={{
        background: "white",
        borderBottom: "5px dashed #68A2B7",
        marginBottom: "161px",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          flexDirection: "column",
          alignContent: "flex-end",
          alignItems: "flex-end",
          display: "flex",
          pt: 10,
        }}
      >
        <Typography
          component="p"
          sx={{
            fontWeight: 700,
            fontSize: "36px",
            mr: "40%",
            color: "rgba(0, 0,0, 0.66)",
            zIndex: 2,
          }}
        >
          Welcome to your
        </Typography>
        <Typography
          component="h1"
          sx={{
            fontSize: "64px",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);",
            fontFamily: "IBM Plex Serif",
            fontWeight: 700,
            zIndex: 2,
          }}
        >
          ORCA Year in Review
        </Typography>
        <Box sx={{ alignSelf: "flex-start" }}>
          <Image
            src="/cute_train.svg"
            alt="cute drawing of Link train"
            width={626}
            height={323}
            style={{ marginBottom: "-161px", marginTop: "-50px" }}
          />
        </Box>
      </Container>
    </Box>
  );
}

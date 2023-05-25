import { Box, Container, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { useContext } from "react";
import useDarkMode from "use-dark-mode";

export default function WrappedHeader() {
  const theme = useTheme();
  const { value: darkModeEnabled } = useDarkMode();

  return (
    <Box
      sx={{
        background: theme.palette.background.default,
        borderBottom: "5px dashed #68A2B7",
        marginBottom: { md: "161px", xs: "24px" },
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
          paragraph
          color={
            darkModeEnabled
              ? theme.palette.brightText
              : theme.palette.text.secondary
          }
          sx={{
            fontWeight: 700,
            fontSize: "36px",
            mr: "40%",
            zIndex: 2,
          }}
        >
          Welcome to your
        </Typography>
        <Typography
          component="h1"
          color={theme.palette.text.primary}
          sx={{
            fontSize: "64px",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);",
            fontFamily: theme.fonts.titleFont,
            fontWeight: 700,
            zIndex: 2,
          }}
        >
          ORCA Boop Report
        </Typography>
      </Container>
      <Container
        maxWidth="lg"
        sx={{
          flexDirection: "column",
          alignContent: "flex-end",
          alignItems: "flex-end",
          display: "flex",
          pt: 10,
          p: 0,
        }}
      >
        <Box
          sx={{
            alignSelf: { md: "flex-start" },
            marginBottom: { md: "-161px", sm: 0 },
            marginTop: { md: "-50px", sm: 0 },
          }}
        >
          <Image
            src="/cute_train_crop.svg"
            alt="cute drawing of Link train"
            width={626}
            height={323}
            style={{}}
          />
        </Box>
      </Container>
    </Box>
  );
}

import { Box, Container, Paper, Typography, useTheme } from "@mui/material";
import Image from "next/image";

const Person = ({ name, role }) => (
  <Paper sx={{ p: 2 }} elevation={7}>
    <Typography variant="h5">{name}</Typography>
    <Typography paragraph>{role}</Typography>
  </Paper>
);

export default function Credits() {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          mt: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src="/cute_train.svg"
          alt="cute drawing of Link train"
          width={313}
          height={161}
        />
        <Typography
          variant="h2"
          sx={{
            color: theme.palette.text.primary,
          }}
        >
          ORCA Boop Report Credits
        </Typography>
      </Box>
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          display: "flex",
          gap: 4,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          paragraph
          sx={{
            fontSize: 18,
            maxWidth: theme.breakpoints.values.sm,
            color: theme.palette.text.primary,
          }}
        >
          ORCA Boop Report is not affiliated with ORCA or any ORCA affiliated
          agency. It is a project by Daniel Heppner with help by the following
          people and libraries.
        </Typography>
        <Box
          sx={{
            display: "grid",
            width: "100%",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 4,
          }}
        >
          <Person name="Daniel Heppner" role="Main Developer" />
          <Person name="Christa Tebbs" role="Designer and Frontend Developer" />
          <Person name="Kona Farry" role="ORCA Data Pipeline Developer" />
        </Box>
      </Container>
    </>
  );
}

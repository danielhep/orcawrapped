import {
  ArrowBack,
  Brightness4Sharp,
  Brightness7Sharp,
} from "@mui/icons-material";
import { Box, IconButton, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import useDarkMode from "use-dark-mode";

export default function TopBarButtons() {
  const { value: darkModeEnabled, toggle } = useDarkMode();
  const theme = useTheme();
  const router = useRouter();
  return (
    <Box
      sx={{
        position: "fixed",
        alignContent: "space-between",
        display: "flex",
        p: 2,
      }}
    >
      {router.route !== "/" && (
        <IconButton onClick={() => router.push("/")}>
          <ArrowBack sx={{ color: theme.palette.text.primary }} />
        </IconButton>
      )}
      <IconButton sx={{ ml: 1 }} onClick={toggle} color="inherit">
        {darkModeEnabled ? (
          <Brightness7Sharp sx={{ color: theme.palette.text.primary }} />
        ) : (
          <Brightness4Sharp sx={{ color: theme.palette.text.primary }} />
        )}
      </IconButton>
    </Box>
  );
}

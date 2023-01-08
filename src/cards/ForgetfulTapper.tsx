import { Box, Typography } from "@mui/material";
import ParentSize from "@visx/responsive/lib/components/ParentSizeModern";
import { ReactNode, useContext } from "react";
import { AppContext } from "../components/AppContext";
import { AppState, WrappedCard } from "../types";

function ForgetfulTapper(): ReactNode {
  const [state] = useContext(AppContext);
  if (!state) return null;
  const tripsMissingTapOff = state.extraData?.linkStats.linkTrips.filter(
    (t) => t.isMissingTapOff
  );
  return (
    <Box
      sx={{
        aspectRatio: "9/16",
        boxShadow: "0px 0px 15px 0px #F68D2E",
        borderRadius: 3,
        backgroundColor: "#F68D2E",
        p: 2,
        height: "100%",
      }}
    >
      <ParentSize>
        {(parent) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              height: "100%",
            }}
          >
            <Typography sx={{ fontSize: 36, color: "white", fontWeight: 700 }}>
              You{"'"}re a forgetful booper!
            </Typography>
            <Box
              sx={{
                p: 1,
                mx: 0.5,
                my: 1.5,
                background: "black",
                color: "white",
                borderRadius: 2,
              }}
            >
              <Typography sx={{ fontSize: 24 }}>
                In 2020, you forgot to tap off {tripsMissingTapOff?.length}{" "}
                times!
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 24, fontStyle: "italic" }}>
              {'"'}Word is, they{"'"}re still on the train to this day...{'"'}
            </Typography>
          </Box>
        )}
      </ParentSize>
    </Box>
  );
}

ForgetfulTapper.cardName = "ForgetfulTapper";
ForgetfulTapper.test = () => true;

export default ForgetfulTapper as WrappedCard;

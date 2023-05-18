import { Box } from "@mui/material";
import { AppState } from "../types";
import { WrappedCard } from "../types";
import { useRef } from "react";
import { useSize } from "ahooks";
import OrcaCard from "../components/ui/OrcaCard";

function TopRoutes(): React.ReactNode {
  const topLevelRef = useRef(null);
  const size = useSize(topLevelRef);

  return (
    <OrcaCard ref={topLevelRef} sx={{ aspectRatio: "9/16" }}>
      <div>
        Testing testing {size?.height} {size?.width}
      </div>
    </OrcaCard>
  );
}

TopRoutes.cardName = "Top Routes";
TopRoutes.score = (state: AppState) => 1000;

export default TopRoutes as WrappedCard;

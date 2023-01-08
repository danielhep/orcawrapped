import ParentSize from "@visx/responsive/lib/components/ParentSizeModern";
import { AppState, WrappedCard } from "../types";

function ForgetfulTapper({ state }: { state: AppState }): JSX.Element {
  const tripsMissingTapOff = state.extraData?.linkStats.linkTrips.filter(
    (t) => t.isMissingTapOff
  );
  return (
    <div
      style={{
        aspectRatio: "1",
        boxShadow: "0px 0px 15px 0px #c745ff",
        borderRadius: 15,
      }}
    >
      <ParentSize>
        {(parent) => <div>You're a forgetful tapper!</div>}
      </ParentSize>
    </div>
  );
}

ForgetfulTapper.cardName = "ForgetfulTapper";
ForgetfulTapper.test = () => true;

export default ForgetfulTapper as WrappedCard;

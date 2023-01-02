import { linkStats } from "../src/basicStats";
import tripsMock from "./mocks/trips.json";

describe("basicStats tests", () => {
  describe("linkStats", () => {
    it("check station stats", () => {
      expect(linkStats(tripsMock).stationStats).toMatchSnapshot();
    });
    it("check linkTrips filtering", () => {
      expect(linkStats(tripsMock).linkTrips).toMatchSnapshot();
    });
  });
});

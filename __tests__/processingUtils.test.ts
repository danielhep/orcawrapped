import { getIdealRouteShortName } from "../src/processing_utils/processingUtils";
import { OrcaCSVRow } from "../src/types";

function testRouteShortNameGenerator(
  line: string,
  agency: string | null,
  expectation: string
) {
  it(`${line} - ${agency}`, () => {
    expect(
      getIdealRouteShortName(
        {
          Agency: agency ?? "",
          "+/-": "",
          Activity: "",
          Balance: "",
          Date: "",
          Location: "",
          Time: "",
        },
        line
      )
    ).toEqual(expectation);
  });
}

describe("processing utils", () => {
  describe("get route headsign", () => {
    testRouteShortNameGenerator(
      "Everett - Seattle",
      "Sound Transit",
      "510/512"
    );
    testRouteShortNameGenerator(
      "Redmond - University District",
      "Sound Transit",
      "542"
    );
    testRouteShortNameGenerator(
      "Mercer Island - Timbuktu",
      "Washington State Ferries",
      "Mer-Tim Ferry"
    );
    testRouteShortNameGenerator(
      "880 Mukilteo - Northgate Station",
      null,
      "880"
    );
    testRouteShortNameGenerator("2 Queen Anne - Northgate Station", null, "2");
    testRouteShortNameGenerator(
      "1-Line Northgate - Angle Lake",
      null,
      "1-Line"
    );
    testRouteShortNameGenerator(
      "Bremerton-Seattle Fast Ferry",
      "Kitsap Transit",
      "Br-Se Fast ⛴️"
    );
    testRouteShortNameGenerator(
      "Bremerton-Port Orchard Foot Ferry",
      "Kitsap Transit",
      "Br-PO Foot ⛴️"
    );
    testRouteShortNameGenerator("Swift Blue", null, "Swift Blue");
    testRouteShortNameGenerator("A Line", null, "A Line");
  });
});

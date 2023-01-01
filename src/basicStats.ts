import { ProcessedOrcaData } from "./types";

export function routeOccurrences(data: ProcessedOrcaData[]): Array<{
  line: string | undefined;
  count: number;
  agencyName: string;
  routeShortName?: string;
}> {
  let countByAgencyThenRoute: {
    // Agency
    [key: string]: {
      // Route
      [key: string]: {
        line: string | undefined;
        count: number;
        agencyName: string;
        routeShortName?: string;
      };
    };
  } = {};

  data.forEach((row) => {
    const lineKey = row.line ?? "UNKNOWN_ROUTE";
    if (!(row.agency in countByAgencyThenRoute)) {
      countByAgencyThenRoute[row.agency] = {};
    }
    if (!(lineKey in countByAgencyThenRoute[row.agency])) {
      countByAgencyThenRoute[row.agency][lineKey] = {
        line: row.line,
        count: 0,
        agencyName: row.agency,
        routeShortName: row.routeShortName,
      };
    }
    countByAgencyThenRoute[row.agency][lineKey].count += 1;
  });

  const routeCounts = Object.keys(countByAgencyThenRoute)
    .flatMap((agencyName) => {
      return Object.values(countByAgencyThenRoute[agencyName]);
    })
    .filter((d) => d.line)
    .sort((a, b) => b.count - a.count);

  return routeCounts;
}

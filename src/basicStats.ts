import { LinkStats, OrcaTrip, ProcessedOrcaData } from "./types";

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

export function linkStats(trips: OrcaTrip[]): LinkStats {
  const linkTrips = trips.filter((t) => t.boarding.routeShortName === "1-Line");
  const stationStats = linkTrips.reduce((prev, cur) => {
    const stations = [cur.boarding.stop, cur.alighting?.stop];
    stations.forEach((s) => {
      if (s) {
        if (prev[s] != undefined) {
          prev[s]++;
        } else {
          prev[s] = 0;
        }
      }
    });
    return prev;
  }, {});
  const stationStatsAsArray = Object.keys(stationStats)
    .map((station) => ({
      station,
      count: stationStats[station],
    }))
    .sort((a, b) => b.count - a.count);

  return { stationStats: stationStatsAsArray, linkTrips };
}

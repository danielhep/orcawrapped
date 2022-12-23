import { ProcessedOrcaData } from "./types";

export function routeOccurrences(
  data: ProcessedOrcaData[]
): Array<{ line: string, count: number, agencyName: string }> {

  let countByAgencyThenRoute : {
    [key: string]: {
      [key: string]: {line: string, count: number, agencyName: string}
    }
  } = {}

  data.forEach(row => {
    if (row.line == null) {
      return 
    }
    if (!(row.agency in countByAgencyThenRoute)) {
      countByAgencyThenRoute[row.agency] = {}
    }
    if (!(row.line in countByAgencyThenRoute[row.agency])) {
      countByAgencyThenRoute[row.agency][row.line] = {line: row.line, count: 0, agencyName: row.agency}
    }
    countByAgencyThenRoute[row.agency][row.line].count += 1
  })

  const routeCounts = Object.keys(countByAgencyThenRoute)
    .flatMap((agencyName) => {
      return Object.values(countByAgencyThenRoute[agencyName])
    })
    .sort((a, b) => b.count - a.count)

  return routeCounts
}

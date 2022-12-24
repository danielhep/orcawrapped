import { parse } from "date-fns";
import Papa from "papaparse";
import { AppState } from "./components/AppContext";
import { OrcaCSVOutput, ProcessedOrcaData, ExtraDataType } from "./types";
import { routeOccurrences } from "./basicStats";
import { dollarStringToNumber, parseActivity } from "./propertyTransformations";
import { findTripsFromTaps } from "./findTripsFromTaps";

async function parseFile(file: File): Promise<OrcaCSVOutput> {
  return await new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (res) => resolve(res.data),
      error: (err) => reject(err),
    });
  });
}

async function processAllRows(
  rows: OrcaCSVOutput
): Promise<ProcessedOrcaData[]> {
  return rows.map((row) => {
    const lineMatch = row.Location.match(/Line: ([^,]*)/);
    const stopMatch = row.Location.match(/Stop: (.*)/);
    const routeNumberMatch = row.Location.match(/(\d+(-Line)?)|([A-F] Line)/);
    return {
      cost: dollarStringToNumber(row["+/-"]) * -1, //func returns Number matching sign of input. We want to represent cost, so flip this, so charges are positive and credits are negative
      balance: dollarStringToNumber(row.Balance),
      time: parse(`${row.Date} ${row.Time}`, "M/d/yyyy h:mmaa", new Date()),
      line: lineMatch?.[1],
      stop: stopMatch?.[1],
      routeShortName: routeNumberMatch?.[0],
      agency: row.Agency,
      activity: parseActivity(row.Activity),
      declined: row.Activity.toLowerCase().includes("declined"),
    };
  });
}

function generateExtraDataObject(data: ProcessedOrcaData[]): ExtraDataType {
  const trips = findTripsFromTaps(data)
  return {
    routeOccurrences: routeOccurrences(trips.map(t => t.boarding)),
    trips: trips,
    tapOffBehavior: {
      expected: trips.filter(t => t.expectsTapOff).length,
      missing: trips.filter(t => t.isMissingTapOff).length
    },
  }
}

export async function parseOrcaFiles(files: File[]): Promise<AppState> {
  const allPromii = await Promise.all(files.map(parseFile));
  const processed = await processAllRows(allPromii[0]);
  const extraData = generateExtraDataObject(processed);

  return { processed, extraData };
}

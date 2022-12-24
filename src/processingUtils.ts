import { parse } from "date-fns";
import Papa from "papaparse";
import Bugsnag from "@bugsnag/js";
import {
  OrcaCSVOutput,
  ProcessedOrcaData,
  ExtraDataType,
  AppState,
  ActivityType,
} from "./types";
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

function lineToRouteShortName(string?: string): string | undefined {
  switch (string) {
    case "Everett - Seattle":
      return "512";
    case "Lynnwood - Bellevue":
      return "532";
    case "Bellevue - Sea-Tac - W. Seattle":
      return "560";
    case "Woodinville - Seattle":
      return "522";
    case "First Hill Streetcar Streetcar":
      return "FH Streetcar";
    case "Gig Harbor - Seattle":
      return "595";
    case "Seaway Transit Center - Seattle":
      return "513";
    case "Seattle Monorail Seattle Monorail":
      return "Monorail";
    case "Bremerton-Seattle Fast Ferry":
      return "FF";
  }
}

async function processAllRows(
  rows: OrcaCSVOutput
): Promise<ProcessedOrcaData[]> {
  return rows.map((row) => {
    const lineMatch = row.Location.match(/Line: ([^,]*)/);
    const stopMatch = row.Location.match(/Stop: (.*)/);
    const routeNumberMatch = lineMatch?.[1].match(
      /(Swift (Blue|Green))|(\d-Line)|(\D Line)|\d+/
    );
    const routeShortName =
      routeNumberMatch?.[0] ?? lineToRouteShortName(lineMatch?.[1]);
    return {
      cost: dollarStringToNumber(row["+/-"]) * -1, //func returns Number matching sign of input. We want to represent cost, so flip this, so charges are positive and credits are negative
      balance: dollarStringToNumber(row.Balance),
      time: parse(`${row.Date} ${row.Time}`, "M/d/yyyy h:mmaa", new Date()),
      line: lineMatch?.[1],
      stop: stopMatch?.[1],
      routeShortName,
      agency: row.Agency,
      activity: parseActivity(row.Activity),
      declined: row.Activity.toLowerCase().includes("declined"),
    };
  });
}

function generateExtraDataObject(data: ProcessedOrcaData[]): ExtraDataType {
  const trips = findTripsFromTaps(data);
  return {
    routeOccurrences: routeOccurrences(trips.map((t) => t.boarding)),
    trips: trips,
    tapOffBehavior: {
      expected: trips.filter((t) => t.expectsTapOff).length,
      missing: trips.filter((t) => t.isMissingTapOff).length,
    },
  };
}

function findProblematicData(processed: ProcessedOrcaData[]) {
  // Find rows of processed data which do not have a populated routeShortName
  processed.forEach((row) => {
    if (
      !row.routeShortName &&
      (row.activity === ActivityType.BOARDING ||
        row.activity === ActivityType.TRANSFER)
    ) {
      Bugsnag.notify(new Error("missing routeShortName"), (e) =>
        e.addMetadata("row", row)
      );
    }
  });
}

export async function parseOrcaFiles(files: File[]): Promise<AppState> {
  const allPromii = await Promise.all(files.map(parseFile));
  const processed = await processAllRows(allPromii[0]);
  const extraData = generateExtraDataObject(processed);

  findProblematicData(processed);

  return { processed, extraData };
}

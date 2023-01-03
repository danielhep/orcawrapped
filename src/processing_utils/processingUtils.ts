import { parse } from "date-fns";
import Papa from "papaparse";
import Bugsnag from "@bugsnag/js";
import {
  OrcaCSVOutput,
  ProcessedOrcaData,
  ExtraDataType,
  AppState,
  ActivityType,
  OrcaCSVRow,
} from "../types";
import { linkStats, routeOccurrences } from "./basicStats";
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
  //many of the below are based on guesswork, ORCA has a lot of weird cases
  switch (string) {
    //rail services
    case "First Hill Streetcar Streetcar: Pioneer Square - Capitol Hill":
      return "FH Streetcar";
    case "Seattle Monorail Seattle Monorail":
      return "Monorail";
    //other
    case "One City Center":
      return "One City Center (Downtown Shuttle Service)";
    //ST routes
    case "Everett - Seattle":
      return "510/512"; //if ambiguity is addressed and old records not updated, need to version this by tap date
    case "Ash Way P&R - Seattle":
    case "Ash Way P&R - Northgate Station": //future-proofing
      return "511";
    case "Everett - Northgate Station": //future-proofing
      return "512";
    case "Seaway Transit Center - Seattle":
    case "Seaway Transit Center - Northgate Station": //future-proofing
      return "513";
    case "Woodinville - Seattle":
    case "Woodinville - Roosevelt Link Station": //future-proofing
      return "522";
    case "Everett - Bellevue":
      return "532";
    case "Lynnwood - Bellevue":
      return "535";
    case "Redmond - University District":
      return "542";
    case "Redmond - Seattle":
      return "545";
    case "Bellevue - Seattle":
      return "550";
    case "Issaquah - Seattle":
      return "554";
    case "Issaquah-University District":
      return "556";
    case "Bellevue - Sea-Tac - W. Seattle":
      return "560";
    case "Auburn - Redmond": //566 taken over by KCM March 22 under this name, unclear which may be in ORCA
    case "Auburn - Overlake":
      return "566";
    case "Lakewood - SeaTac":
      return "574";
    case "Federal Way - Seattle":
      return "577";
    case "Puyallup - Seattle":
      return "578";
    case "Lakewood - Puyallup": //for some reason, all three of these have been picked up by Pantograph
    case "Lakewood / Puyallup":
    case "Lakewood to Puyallup":
      return "580";
    case "Tacoma - U. District":
      return "586";
    case "Tacoma - Seattle":
      return "590";
    case "Olympia/DuPont - Seattle":
      return "592";
    case "Lakewood - Seattle":
      return "594";
    case "Gig Harbor - Seattle":
      return "595";
    case "Bonney Lake - Sumner":
      return "596";
  }
}

/**
 * Returns the first three characters of each word in the string joined by a `-`, sorted alphabetically,
 * with the suffix "Ferry" added on.
 * e.g. `Mukilteo - Clinton` and `Clinton - Mukilteo` both become `Cli-Muk Ferry`.
 */
function getWSFRoute(string: string): string | undefined {
  const abbreviated = string.match(/(\b)[A-HJ-Z]\w{0,2}/g)?.sort();
  const shortened = abbreviated?.join("-");
  return shortened ? shortened + " Ferry" : undefined;
}

/**
 * Returns first two characters of each destination, unless it's multiple words (e.g. Port Orchard),
 * in which case it's abbreviated, preserving ferry type.
 * e.g. `Bremerton-Port Orchard Foot Ferry` becomes `Br-PO Foot Ferry`.
 */
function getKitsapFerryRoute(string: string): string | undefined {
  const nameParts = string.match(/(.+) (Fast|Foot) Ferry/);
  const name = nameParts?.[1];
  const type = nameParts?.[2];
  if (name && type) {
    const locations = name
      .split("-")
      .map((p) => p.trim())
      .map((p) => {
        if (p.includes(" ")) {
          return p.match(/(\b)\w/g)?.join("") ?? p;
        } else {
          return p.substring(0, 2);
        }
      });
    return locations.join("-") + ` ${type} ⛴️`;
  }
}

/**
 * Main method for getting a user-facing route name from an ORCA record.
 */
export function getIdealRouteShortName(
  row: OrcaCSVRow,
  lineStr: string | undefined
): string | undefined {
  if (lineStr) {
    const routeNumberMatch = lineStr.match(/(Swift \w+)|(\w+[\s-]Line)|\d+/);
    if (routeNumberMatch) {
      return routeNumberMatch[0];
    } else if (row.Agency == "Washington State Ferries") {
      return getWSFRoute(lineStr);
    } else if (
      row.Agency == "Kitsap Transit" &&
      lineStr.toLowerCase().includes("ferry")
    ) {
      return getKitsapFerryRoute(lineStr);
    } else {
      return lineToRouteShortName(lineStr);
    }
  }
}

async function processAllRows(
  rows: OrcaCSVOutput
): Promise<ProcessedOrcaData[]> {
  return rows.map((row) => {
    const lineStr = row.Location.match(/Line: ([^,]*)/)?.[1].trim();
    const stopStr = row.Location.match(/Stop: (.*)/)?.[1].trim();
    const routeShortName = getIdealRouteShortName(row, lineStr);

    return {
      cost: dollarStringToNumber(row["+/-"]) * -1, //func returns Number matching sign of input. We want to represent cost, so flip this, so charges are positive and credits are negative
      balance: dollarStringToNumber(row.Balance),
      time: parse(`${row.Date} ${row.Time}`, "M/d/yyyy h:mmaa", new Date()),
      line: lineStr,
      stop: stopStr,
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
    linkStats: linkStats(trips),
  };
}

function findProblematicData(processed: ProcessedOrcaData[]) {
  // Find rows of processed data which do not have a populated routeShortName
  processed.forEach((row) => {
    if (
      !row.routeShortName &&
      row.line &&
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

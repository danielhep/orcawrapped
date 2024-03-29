import { ComponentType } from "react";

export interface ProcessedOrcaCard {
  fileName: string;
  processed: ProcessedOrcaRow[];
  extraData: ExtraDataType;
}

export interface AppState {
  orcaData: ProcessedOrcaCard[];
  aggregateExtraData: ExtraDataType;
  totalRowCount: number;
}

export interface OrcaCSVRow {
  "+/-": string;
  Activity: string;
  Agency: string;
  Balance: string;
  Date: string;
  Location: string;
  Time: string;
}

export interface UnprocessedOrcaCard {
  fileName: string;
  rawCsvRows: any[];
}

export enum ActivityType {
  TAP_OFF,
  TRANSFER,
  BOARDING,
  PASS_LOADED,
  PURCHASE,
  MONEY_LOAD,
  CARD_SALE,
  INSPECTION,
  USE,
  UNKNOWN,
}

export interface ProcessedOrcaRow {
  cost: number;
  balance: number;
  time: Date;
  line?: string;
  stop?: string;
  routeShortName?: string;
  agency: string;
  activity: ActivityType;
  declined: boolean;
}

export interface IndividualAgencyOccurences {
  agency: string;
  count: number;
}

export interface IndividualRouteOccurrences {
  line: string | undefined;
  count: number;
  agencyName: string;
  routeShortName?: string;
}

export interface DayRideCount {
  day: string;
  jsDate: Date;
  value: number;
}

export interface ExtraDataType {
  routeOccurrences: Array<IndividualRouteOccurrences>;
  agencyOccurrences: Array<IndividualAgencyOccurences>;
  ridesByDate: Array<DayRideCount>;
  trips: OrcaTrip[];
  tapOffBehavior: {
    expected: number;
    missing: number;
  };
  linkStats: LinkStats;
}

export type DoorSides = "LEFT" | "RIGHT" | "EITHER";

export interface LinkStationStats {
  station: string;
  count: number;
  doorSide: DoorSides;
}

export interface LinkStats {
  stationStats: Array<LinkStationStats>;
  linkTrips: OrcaTrip[];
}

/**
 * Represents a single trip on a single route, possibly including tap-off info
 */
export class OrcaTrip {
  /** The boarding event that initiated the trip */
  boarding: ProcessedOrcaRow;
  /** The alighting event that ended the trip, if available. Only relevant if `routeShortName` is defined in `OrcaTrip.routesExpectingTapOff`. */
  alighting?: ProcessedOrcaRow | undefined;
  /** Any inspection events found to be related to this trip */
  inspections: ProcessedOrcaRow[];

  static routesExpectingTapOff: Array<string | undefined> = [
    "1-Line",
    "N Line",
    "S Line",
  ];

  constructor(boarding: ProcessedOrcaRow, alighting?: ProcessedOrcaRow) {
    this.boarding = boarding;
    this.alighting = alighting;
    this.inspections = [];
  }

  get expectsTapOff(): boolean {
    return OrcaTrip.routesExpectingTapOff.includes(
      this.boarding.routeShortName
    );
  }

  get isMissingTapOff(): boolean {
    return this.expectsTapOff && this.alighting == null;
  }

  get wasInspected(): boolean {
    return this.inspections.length > 0;
  }

  /**
   * The initial tap charges the maximum possible amount from that station, but the appropriate amount
   * gets "credited" when you tap off somewhere that isn't the maximum possible charge.
   * Transfer credit and passes are factored in to the amount each tap is charged.
   */
  get charge(): Number {
    return this.boarding.cost + (this.alighting?.cost || 0);
  }
}

export interface WrappedCard {
  cardName: string;
  score: (state: AppState) => number;
  Component: ComponentType;
}

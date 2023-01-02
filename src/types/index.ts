export interface AppState {
  processed: ProcessedOrcaData[];
  extraData?: ExtraDataType;
}

/* eslint-disable no-unused-vars */
export interface OrcaCSVRow {
  "+/-": string;
  Activity: string;
  Agency: string;
  Balance: string;
  Date: string;
  Location: string;
  Time: string;
}

export type OrcaCSVOutput = OrcaCSVRow[];

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

export interface ProcessedOrcaData {
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

export interface ExtraDataType {
  routeOccurrences: Array<{
    line: string | undefined;
    count: number;
    agencyName: string;
    routeShortName?: string;
  }>;
  trips: OrcaTrip[];
  tapOffBehavior: {
    expected: Number;
    missing: Number;
  };
  linkStats: LinkStats;
}

export interface LinkStats {
  stationStats: Array<{ station: string; count: number }>;
  linkTrips: OrcaTrip[];
}

/**
 * Represents a single trip on a single route, possibly including tap-off info
 */
export class OrcaTrip {
  /** The boarding event that initiated the trip */
  boarding: ProcessedOrcaData;
  /** The alighting event that ended the trip, if available. Only relevant if `routeShortName` is defined in `OrcaTrip.routesExpectingTapOff`. */
  alighting?: ProcessedOrcaData | undefined;
  /** Any inspection events found to be related to this trip */
  inspections: ProcessedOrcaData[];

  static routesExpectingTapOff: Array<string | undefined> = [
    "1-Line",
    "N Line",
    "S Line",
  ];

  constructor(boarding: ProcessedOrcaData, alighting?: ProcessedOrcaData) {
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
  test: (state: AppState) => boolean;
  ({ state }: { state: AppState }): JSX.Element;
}

export type ActivityType =
  | "damage"
  | "repair"
  | "neutralize"
  | "capTransfer";

export type Direction = "given" | "taken";

export interface CombatEvent {
  timestamp: Date;

  activity: ActivityType;
  direction: Direction;

  pilotName?: string;
  pilotCorp?: string;
  pilotAlliance?: string;

  targetName?: string;
  targetCorp?: string;
  targetAlliance?: string;

  sourceName?: string;
  amount: number;
  unit?: "hp" | "gj";

  isDrone?: boolean;
  isLogiDrone?: boolean;
  isSmartbomb?: boolean;

  logRaw: string;
}

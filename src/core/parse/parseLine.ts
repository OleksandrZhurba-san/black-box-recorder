import { ActivityType, CombatEvent, Direction } from "@/core/types";

export function stripTags(clean: string): string {
  let result = "";
  let insideTag = false;

  for (const char of clean) {
    if (char === "<") {
      insideTag = true;
      continue;
    }
    if (char === ">") {
      insideTag = false;
      continue;
    }
    if (!insideTag) {
      result += char;
    }
  }
  return result;
}


//Malekith the Accursed[TRY1N](Dramiel) 
function parseNameFromLabel(labels: string) {
  return labels.slice(0, labels.indexOf("[")).trim();
}

function parseShipFromLabel(labels: string) {
  return labels.slice(labels.indexOf("(") + 1, labels.indexOf(")"));
}

function detectActivity(clean: string): ActivityType | null {
  if (clean.includes("energy neutralized")) return "neutralize";
  if (clean.includes("remote armor repaired")) return "repair";
  if (clean.includes("remote shield boosted")) return "repair";
  if (clean.includes("remote capacitor transmitted")) return "capTransfer";

  return "damage";
}

//61 to scubather[GENOS](Nightmare) - Dark Blood Small EMP Smartbomb - Hits
function parseDamagePayload(payload: string): [blob: string, source: string, rest: string] | null {
  const words = payload.split(" ");
  const startIndex = payload.indexOf(words[2] ?? "");
  const [blob, source, rest] =
    payload.slice(startIndex).split(" - ") as [string, string, string];

  return [blob, source, rest];
}

// [ 2025.11.09 17:43:42 ] (combat) 0 remote armor repaired to  Nightmare [HYDRA] [GENOS] [scubather] - - Perun Heavy Mutadaptive Remote Armor Repairer
function parseRemotePayload(payload: string, direction: string): [blob: string, source: string] | null {
  const endIndex = payload.lastIndexOf(" - ");
  if (endIndex === -1) return null;

  let startIndex = 0;
  if (direction === "given") startIndex = payload.indexOf("to") + 2;
  if (direction === "taken") startIndex = payload.indexOf("by") + 2;

  const blob = payload.slice(startIndex, endIndex).trim();
  const source = payload.slice(endIndex + 3).trim();
  return [blob, source];
}

function detectDirection(clean: string, activity: ActivityType | null): Direction | null {

  //damage activity
  if (activity === "damage") {
    const direction = clean.split(" ")[1];
    if (direction === "to") return "given";
    if (direction === "from") return "taken";
  }

  //repair activity
  if (activity === "repair") {
    if (clean.includes("repaired by") || clean.includes("boosted by"))
      return "taken";
    if (clean.includes("repaired to") || clean.includes("boosted to"))
      return "given";
  }

  return null;
}

export function parseLine(line: string): CombatEvent | null {

  const clean = stripTags(line);

  if (!clean.includes("(combat)")) return null;
  if (clean.includes("Warp scramble attempt") ||
    clean.includes("Warp disruption attempt"))
    return null;

  // extract timestamp
  const tsStart = clean.indexOf("[");
  const tsEnd = clean.indexOf("]");
  if (tsStart === -1 || tsEnd === -1) return null;

  const timestampText = clean
    .slice(tsStart + 1, tsEnd)
    .trim()
    .replace(" ", "T")
    .replaceAll(".", "-");

  const timestamp = new Date(timestampText + "Z");

  // isolate the payload after "combat"
  const combatIndex = clean.indexOf("(combat)");
  if (combatIndex === -1) return null;
  const payload = clean.slice(combatIndex + "(combat)".length).trim();

  // extract amount number
  const activity: ActivityType | null = detectActivity(payload);

  const direction = detectDirection(payload, activity);
  if (!direction) return null;

  let amount = 0;
  let sourceName = "";
  let hitType = "";
  let pilotName = "";
  let targetName = "";
  let ship = "";

  switch (activity) {
    case "damage": {
      amount = Number(payload.split(" ")[0]);
      const parts = parseDamagePayload(payload);
      if (!parts) return null;
      const [blob, source, rest] = parts;
      sourceName = source.trim();
      hitType = rest.trim();
      if (direction === "given") {
        targetName = parseNameFromLabel(blob);
      }
      if (direction === "taken") {
        pilotName = parseNameFromLabel(blob);
      }
      ship = parseShipFromLabel(blob);
      break;
    }
    case "repair": {
      const parts = parseRemotePayload(payload, direction);
      if (!parts) return null;
      const [blob, source] = parts;
      sourceName = source;
      amount = Number(payload.split(" ")[0]);

      break;
    }
    case "neutralize": {
      amount = Number(payload.split(" ")[0]);
      sourceName = pa
      break;
    }
    case "capTransfer": {
      amount = Number(payload.split(" ")[0]);
      break;
    }

    default:
      return null;
  }


  return {
    timestamp,
    activity,
    direction,
    amount,
    sourceName,
    hitType,
    pilotName,
    targetName,
    ship,
    logRaw: payload,
  };

}

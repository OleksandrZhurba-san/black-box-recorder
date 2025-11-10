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
function detectActivity(clean: string): ActivityType | null {
  if (clean.includes("energy neutralized")) return "neutralize";
  if (clean.includes("remote armor repaired")) return "repair";
  if (clean.includes("remote shield boosted")) return "repair";
  if (clean.includes("remote capacitor transmitted")) return "capTransfer";

  return "damage";
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
  switch (activity) {
    case "damage": {
      amount = Number(payload.split(" ")[0]);
      break;
    }
    case "repair": {
      amount = Number(payload.split(" ")[0]);
      break;
    }
    case "neutralize": {
      amount = Number(payload.split(" ")[0]);
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
    logRaw: payload
  };

}

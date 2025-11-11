import { parseLine, parseListenerName } from "@/core/parse/parseLine";
import { expectCombatEvent } from "@/tests/utils";
import { testData } from "@/tests/testData";
import { expect, test } from "bun:test";

const cases = [
  {
    name: "parse damage given line",
    line: testData.damageTo,
    expected: {
      activity: "damage",
      direction: "given",
      amount: 29,
      sourceName: "Imperial Navy Acolyte",
      targetName: "Malekith the Accursed",
      hitType: "Penetrates",
      ship: "Dramiel",
    }
  },
  {
    name: "parse damage taken line",
    line: testData.damageFrom,
    expected: {
      activity: "damage",
      direction: "taken",
      amount: 61,
      sourceName: "Dark Blood Small EMP Smartbomb",
      pilotName: "Skithblatnir",
      hitType: "Hits",
      ship: "Zarmazd",
    }
  },
  {
    name: "parse remote repair given line",
    line: testData.repairTo,
    expected: {
      activity: "repair",
      direction: "given",
      amount: 0,
      sourceName: "Perun Heavy Mutadaptive Remote Armor Repairer",
    }
  },
  {
    name: "parse remote repair taken line",
    line: testData.repairFrom,
    expected: {
      activity: "repair",
      direction: "taken",
      amount: 0,
      sourceName: "Heavy Armor Maintenance Bot II",
    }
  },
  {
    name: "parse remote shield boosted by line",
    line: testData.boostedBy,
    expected: {
      activity: "repair",
      direction: "taken",
      amount: 123,
      sourceName: "Large Remote Shield Booster II",
    }
  },
  {
    name: "parse remote shield boosted to line",
    line: testData.boostedTo,
    expected: {
      activity: "repair",
      direction: "given",
      amount: 57,
      sourceName: "Large Remote Shield Booster II",
    }
  },
  {
    name: "parse remote cap transfer taken line",
    line: testData.capTransferFor,
    expected: {
      activity: "capTransfer",
      direction: "taken",
      amount: 10,
      sourceName: "Centum A-Type Medium Remote Capacitor Transmitter",
    }
  },
  {
    name: "parse remote cap transfer given line",
    line: testData.capTransferTo,
    expected: {
      activity: "capTransfer",
      direction: "given",
      amount: 550,
      sourceName: "Centum A-Type Medium Remote Capacitor Transmitter",
    }
  },
] as const;

test("parseListenerName scope: parse name from header of log file", () => {
  const listenerName = parseListenerName(testData.listenerNameString)
  expect(listenerName).not.toBeNull();
  expect(listenerName).toBe(testData.listenerName);
});

for (const c of cases) {
  test(`parseLine scope: ${c.name}`, () => {
    const event = parseLine(c.line, "Melekith the Accursed");
    expectCombatEvent(event, c.expected);
  })
}

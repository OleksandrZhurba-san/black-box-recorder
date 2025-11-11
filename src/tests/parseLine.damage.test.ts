import { parseLine } from "@/core/parse/parseLine";
import { expectCombatEvent } from "@/tests/utils";
import { testData } from "@/tests/testData";

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
] as const;

for (const c of cases) {
  test(`parseLine scope: ${c.name}`, () => {
    const event = parseLine(c.line);
    expectCombatEvent(event, c.expected);
  })
}

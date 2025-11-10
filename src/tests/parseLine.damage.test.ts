import { parseLine } from "@/core/parse/parseLine";
import { test } from "bun:test";
import { expectCombatEvent } from "@/tests/utils";
import { repairFrom, repairTo } from "@/tests/testData";

const cases = [
  {
    name: "parse damage given line",
    line: "[ 2025.11.10 16:17:44 ] (combat) <color=0xff00ffff><b>29</b> <color=0x77ffffff><font size=10>to</font> <b><color=0xffffffff>Malekith the Accursed[TRY1N](Dramiel)</b><font size=10><color=0x77ffffff> - Imperial Navy Acolyte - Penetrates",
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
    line: "[ 2025.11.09 17:46:26 ] (combat) <color=0xffcc0000><b>61</b> <color=0x77ffffff><font size=10>from</font> <b><color=0xffffffff>Skithblatnir[GENOS](Zarmazd)</b><font size=10><color=0x77ffffff> - Dark Blood Small EMP Smartbomb - Hits",
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
    line: repairTo,
    expected: {
      activity: "repair",
      direction: "given",
      amount: 0,
      sourceName: "Perun Heavy Mutadaptive Remote Armor Repairer",
    }
  },
  {
    name: "parse remote repair taken line",
    line: repairFrom,
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

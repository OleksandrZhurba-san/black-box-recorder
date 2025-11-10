import { CombatEvent } from "@/core/types";
import { parseLine  } from "@/core/parse/parseLine";


const dmgTo = "[ 2025.11.10 16:17:44 ] (combat) <color=0xff00ffff><b>29</b> <color=0x77ffffff><font size=10>to</font> <b><color=0xffffffff>Malekith the Accursed[TRY1N](Dramiel)</b><font size=10><color=0x77ffffff> - Imperial Navy Acolyte - Penetrates";

const dmgFrom = "[ 2025.11.09 17:46:26 ] (combat) <color=0xffcc0000><b>61</b> <color=0x77ffffff><font size=10>from</font> <b><color=0xffffffff>Skithblatnir[GENOS](Zarmazd)</b><font size=10><color=0x77ffffff> - Dark Blood Small EMP Smartbomb - Hits";

const neutTo = "[ 2025.11.09 17:43:51 ] (combat) <color=0xff7fffff><b>405 GJ</b><color=0x77ffffff><font size=10> energy neutralized </font><b><color=0xffffffff><font size=12><color=0xFFFFB900> <u><b>Zarmazd</b></u></color></font><font size=12><color=0xFFFEFF6F> [<b>HYDRA</b>]</color></font> [<b>GENOS</b>] [Skithblatnir]<color=0xFFFFFFFF><b> -</b><color=0x77ffffff><font size=10> - Dark Blood Heavy Energy Neutralizer</font>";
const neutFrom = "[ 2025.11.09 17:43:51 ] (combat) <color=0xffe57f7f><b>405 GJ</b><color=0x77ffffff><font size=10> energy neutralized </font><b><color=0xffffffff><font size=12><color=0xFFFFB900> <u><b>Nightmare</b></u></color></font><font size=12><color=0xFFFEFF6F> [<b>HYDRA</b>]</color></font> [<b>GENOS</b>] [scubather]<color=0xFFFFFFFF><b> -</b><color=0x77ffffff><font size=10> - Dark Blood Heavy Energy Neutralizer</font>";

const repairFrom = "[ 2025.11.09 17:46:22 ] (combat) <color=0xffccff66><b>0</b><color=0x77ffffff><font size=10> remote armor repaired by </font><b><color=0xffffffff><font size=12><color=0xFFFFB900> <u><b>Heavy Armor Maintenance Bot II</b></u></color></font><font size=12><color=0xFFFEFF6F> [<b>HYDRA</b>]</color></font> [<b>GENOS</b>] [Heavy Armor Maintenance Bot II]<color=0xFFFFFFFF><b> -</b><color=0x77ffffff><font size=10> - Heavy Armor Maintenance Bot II</font>";
const repairTo = "[ 2025.11.09 17:43:48 ] (combat) <color=0xffccff66><b>0</b><color=0x77ffffff><font size=10> remote armor repaired to </font><b><color=0xffffffff><font size=12><color=0xFFFFB900> <u><b>Nightmare</b></u></color></font><font size=12><color=0xFFFEFF6F> [<b>HYDRA</b>]</color></font> [<b>GENOS</b>] [scubather]<color=0xFFFFFFFF><b> -</b><color=0x77ffffff><font size=10> - Perun Heavy Mutadaptive Remote Armor Repairer</font>";
const newLine = "[ 2025.11.09 22:38:12 ] (combat) <color=0xff00ffff><b>504</b> <color=0x77ffffff><font size=10>to</font> <b><color=0xffffffff>Skithblatnir[GENOS](Sabre)</b><font size=10><color=0x77ffffff> - Small Focused Beam Laser II - Smashes";

/* console.log("DMG To: ", parseLine(dmgTo));
console.log("NEW Dmg To: ", parseLine(newLine));
console.log("DMG From: ", parseLine(dmgFrom));
console.log("Neuts To: ", parseLine((neutTo)));
console.log("Neuts From: ", parseLine((neutFrom)));
console.log("Reps To: ", parseLine((repairTo)));
console.log("Reps From: ", parseLine((repairFrom))); */
console.log(parseLine(dmgTo));

/* const labels = "Malekith the Accursed[TRY1N](Dramiel)";
console.log(labels.slice(0,labels.indexOf("["))); */

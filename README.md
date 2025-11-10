# black-box-recorder

EVE Online combat log "black box". Parses raw game logs into structured events for analysis and future visualization.

## Status

Early WIP. Right now it:

- Uses **Bun** + **TypeScript**
- Parses `(combat)` log lines into a typed `CombatEvent` model
- Extracts:
  - timestamp
  - activity type (damage / repair / neutralize / cap transfer ⏳)
  - direction (given / taken)
  - amount

## Tech

- Runtime: [Bun](https://bun.sh/)
- Language: TypeScript

## Roadmap

- [ ] Extract actor/target labels and weapon/module names
- [ ] Classify source types (turret / drone / smartbomb / logi)
- [ ] Support repairs, neuts, cap transfers
- [ ] Vue-based UI
- [ ] Charts for:
  - damage given/taken over time
  - breakdowns by source, target, weapon

## Usage (dev)

```bash
bun install
bun run src/test.ts

# Farming Simulator — Machinery 101: Loaders & Attachments

> **Offline reference for Claude Code.** Compiled from the 2 tutorials in the "Machinery 101"
> section of the official Farming Simulator Academy
> (https://www.farming-simulator.com/newsArticle.php?news_id=280).
> Facts are drawn from those articles; anything sourced elsewhere is attributed inline.

## Source provenance

| Topic | Article | Published |
|---|---|---|
| Loading Machines: Front-, Wheel-, Skid-Steer-Loaders, Telehandlers & Forklifts | news_id=412 | 2021-11-18 (FS22 — names FS22 explicitly) |
| Front Loaders, Front Loader Attachments & Tools | news_id=386 | 2021-11-18 (FS22-era) |

URL pattern: `https://www.farming-simulator.com/newsArticle.php?&news_id=<id>`

The two articles overlap heavily. 412 is the broader overview (five loader classes, full tool lists
per class); 386 adds the **shop taxonomy** and the role-by-role guidance. Both are merged below.

> ⚠️ **No numbers published.** Neither article gives capacities, prices, weights, lift heights or
> power requirements. Everything here is categorical.

---

## 1. THE FIVE LOADER CLASSES — WHICH ONE FOR WHICH JOB

⭐ **The core decision table.** Roles as stated in 386:

| Class | Role as stated | Buy it for |
|---|---|---|
| **Front loader** | General-purpose loading and unloading | Everyday farm work — the default |
| **Wheel loader** | ⭐ **Heavy materials such as logs and containers** | Forestry, container handling |
| **Skid-steer loader** | ⭐ **Work in narrow spaces** | Tight yards, barns, between buildings |
| **Telehandler** | ⭐ **Placing loads at height** | Stacking, high unloading |
| **Forklift** | (listed as a loading machine class in 412) | Pallet work |

**Reading this as a purchase decision:** these are not tiers, they're specialisations. A front
loader on a tractor you already own is the cheapest entry and covers most farm work. The other four
solve specific constraints — weight, width, height, pallets — and are only worth buying when you
hit that constraint.

### Goods handled by loading machines

Harvested crops · bales · pallets · manure · bigbags · **logs** (386 adds logs to the list).

---

## 2. THE SHOP TAXONOMY — THE THING THAT CONFUSES PEOPLE

⭐ Article 386's most useful contribution. **"Front loader" means three different things in the
shop:**

| Shop category | What it actually is |
|---|---|
| **Front Loader (Vehicles)** | ⭐ Standalone front loader **machines** — self-propelled |
| **Front Loader (Attachments)** | ⭐ Front loader **arms** that mount to a tractor |
| **Front Loader Tools** | ⭐ The **implements** that attach to either of the above |

So a working tractor-based front loader setup is **three purchases**: the tractor's front loader
*configuration*, the front loader *arm*, and a *tool*.

### ⚠️ The configuration step people miss

Stated in **386** (not in 412), and the dealership method below is spelled out in the *animal* and
*forestry* tutorials (337, 338, 340, 341, 585, 376) rather than in either machinery article:

⭐ **Before you can attach a front loader arm, the tractor must be bought or reconfigured with the
front loader configuration.** The method: **drive the tractor to the dealership, park it in the
vehicle options / customization field, and select the appropriate attachment configuration.**

Only then can a front loader attacher be fitted. A tractor without the configuration simply cannot
take one.

**Setup summary:**

- **On a tractor:** buy the front loader configuration at the dealership → attach the front loader arm → attach a compatible tool.
- **On a dedicated vehicle:** buy the front loader vehicle → attach a tool.

---

## 3. TOOLS BY LOADER CLASS

⭐ **Tool availability differs by class — this is the main constraint when choosing a machine.**

### Front loader — 13 tools (the widest selection)

Bale spike · Bale handler · Bale King · Universal bucket · Manure fork · Roundbale fork ·
Pallet fork · Log fork · Fork with grapple · Silage cutter · Beet cutter ·
Bigbag Lifter (Single) · Bigbag Lifter (Dual)

### Wheel loader — 5 tools

High-dump bucket · Log fork · Pallet fork · Bale fork · Silage fork

### Skid-steer loader — 7 tools

High-dump bucket · Pallet fork · Bale spear · Manure fork · Wrapped bale handler ·
⭐ **Stump grinder** · Log fork

### Telehandler — 6 tools

Bale fork · Wrapped bale handler · Universal bucket · Manure fork · Log fork · Pallet fork

### What the tool lists tell you

| Observation | Consequence |
|---|---|
| ⭐ **Front loader has by far the most tools (13)** | The most versatile class — reinforces it as the default buy |
| ⭐ **Only the front loader has the Bigbag Lifter, silage cutter and beet cutter** | Bigbag handling and silage/beet work are front-loader-only jobs |
| ⭐ **Only the skid-steer has the stump grinder** | Forestry stump work via loader is skid-steer-exclusive (note: `forestry-101.md` §7 uses a tractor-mounted forestry *mulcher* instead — two different routes to the same job) |
| ⭐ **Pallet fork and log fork appear on all four** | Pallet and log handling is universal — not a reason to pick any particular class |
| ⭐ **Wrapped bale handler only on skid-steer and telehandler** | Relevant if you produce wrapped silage bales (`animals-102.md` §3, Route A) |

---

## 4. CROSS-REFERENCES — WHERE LOADERS ARE ACTUALLY NEEDED

Loaders are a dependency of most other sections. Pulled together here:

| Task | Tool needed | Source file |
|---|---|---|
| Feeding bales to any animal | **Bale spike** | `animals-101.md` |
| Moving fodder, eggs, wool, honey, mineral feed | **Pallet fork** | `animals-101.md` |
| Loading a forage mixer wagon for TMR | **Bale spike** + front loader | `animals-102.md` §4 |
| Handling seed / fertiliser / lime bigbags | **Bigbag Lifter** (front loader only) | `crops-101.md` |
| Picking up poplar bales | **Fliegl Schmetterling** on a front loader | `crops-101.md` §6.5 |
| Loading logs into containers | **Wheel loader + pallet fork** (lifts the container) | `forestry-101.md` §6 |
| Loading stones after rock breaking | **Wheel loader + shovel** | `forestry-101.md` §8 |
| Loading pallets onto a cargo vessel | **Forklift** | `fishing-aquaculture.md` §6 |
| Retrieving silage from a bunker silo | **Shovel or silage cutter** | `animals-102.md` §3 |

⭐ **The practical minimum for a mixed farm:** a tractor with the front loader configuration, a
front loader arm, a **bale spike** and a **pallet fork**. That combination appears in the
recommended equipment list of nearly every animal tutorial in the Academy.

---

## 5. NAMED COMPATIBILITY EXAMPLE

The only specific pairing given: **John Deere 7R Series** with the **front loader 700M**, in the
context of Farming Simulator 22.

Other loader kit named across the Academy (FS22-era unless noted):

| Machine | Where it appears |
|---|---|
| **Hauer XB190** front loader attacher | Chickens, sheep, bees, forestry planting |
| **albutt** bale spike / pallet fork | Nearly every animal tutorial |
| **Quicke Q4M** front loader attacher | ⭐ Goats (FS25 article) |
| **Anderson Group M160** log loader | Forestry log transport |
| **Volvo L180H** + palletfork wheel loader | Forestry containers (Platinum) |
| **Volvo EC250DL** + grapple excavator | Forestry containers (Platinum) |
| **Volvo-BM LM 841** wheel loader + shovel | Rock breaking (Platinum) |
| **New Holland L318 / C332** skid-steer | Rock breaking (Platinum) |

---

## 6. PLANNING SUMMARY

- **Start with a tractor-mounted front loader**, not a dedicated loader vehicle. Cheapest path, widest tool selection (13), and it reuses a tractor you already own.
- ⭐ **Buy the front loader configuration at the dealership first** — the arm cannot be attached without it. This is the single most common blocker in the Academy's own instructions.
- **Bale spike + pallet fork** is the minimum viable pair for animal husbandry.
- **Add a wheel loader only for forestry** — logs and containers are its stated role, and containers specifically must be lifted like a pallet with a powerful wheel loader.
- **Add a skid-steer only if you have a width problem**, or want the stump grinder.
- **Add a telehandler only if you have a height problem.**
- **A forklift is for pallets** — notably required for loading the cargo vessel in aquaculture.
- ⚠️ **Neither article publishes capacities or power requirements.** Check the shop icons and specification panel in-game before buying; per `game-basics.md` §11, compatibility in this game is expressed as icon-matching plus a horsepower number.

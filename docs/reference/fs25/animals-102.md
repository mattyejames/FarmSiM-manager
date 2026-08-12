# Farming Simulator — Animals 102: Silage & Total Mixed Ration

> **Offline reference for Claude Code.** Compiled from the 2 tutorials listed under "Animals 102"
> on the official Farming Simulator Academy hub
> (https://www.farming-simulator.com/newsArticle.php?news_id=280).
> Facts are drawn from those articles; anything sourced elsewhere is attributed inline.

## Source provenance

| Topic | Article | Published |
|---|---|---|
| How To Produce Silage | news_id=383 | 2021-11-18 (FS22-era) |
| How To Produce Total Mixed Ration (TMR) | news_id=384 | 2021-11-18 (FS22-era) |

⚠️ Both pages carry the on-site title prefix **"[Basics]"**, not "[Animals 102]" — the section name
comes from the Academy hub's grouping, not from the articles themselves.

URL pattern: `https://www.farming-simulator.com/newsArticle.php?&news_id=<id>`

> ⚠️ **These two articles publish almost no numbers.** The only quantitative value across both is
> the **100% compaction** threshold for bunker silos. No fermentation times, no litre capacities,
> no mixing ratios, no prices. The mixer wagon UI expresses requirements as **percentages only**.
> The one concrete TMR ratio in the whole Academy appears in the *cow* article, not here — it is
> reproduced in §4 below and in `animals-101.md` §6.

---

## 1. WHY THIS SECTION MATTERS

Silage and TMR are the difference between 40% and 100% cow productivity (see `animals-101.md` §2).
The chain is:

```
grass ──mow──> grass ──ferment──> SILAGE ─┐
crops ──forage harvest──> chaff ──ferment──┘   ├──> TMR ──> cows @ 100%
hay, straw, mineral feed ──────────────────────┘
```

⭐ **Silage is stated to quadruple the sales value of grass and corn.** So it is worth producing
even if you keep no animals at all — it is a value-add processing step in its own right.

---

## 2. SILAGE — WHAT IT'S MADE FROM

| Input | Source |
|---|---|
| **Grass** | Mown from grass fields |
| **Chaff** | Forage-harvested from: **corn, wheat, barley, oat, sorghum, canola, soybeans, sunflowers** |

### ⚠️ The critical timing rule — easy to get wrong

The two inputs have **opposite** harvest-timing requirements:

| Input | When to harvest |
|---|---|
| **Crops (for chaff)** | ⭐ **BEFORE they reach their final growth stage** |
| **Grass** | ⭐ **AT its final growth stage** |

Harvesting a crop at full maturity gives you grain, not chaff. If you want chaff you must harvest
early with a **forage harvester**. Cross-reference `crops-101.md` §6.7: corn's chaff window is
**August–September**, while the maize grain window is **October–November** — the same crop, two
different harvests, two months apart.

---

## 3. SILAGE — THE TWO PRODUCTION ROUTES

### Route A: Grass, without a bunker silo (bales)

**Equipment:** tractor with front loader attachment · mower · windrower · baler · **bale wrapper** ·
bale spike.

Mow → windrow → bale → **wrap** the bales → they ferment into silage. Lower capital cost, no silo
needed, and the bales are directly usable as TMR input or sellable.

### Route B: Crops and grass, with a bunker silo

**Equipment:** tractor with front loader attachment · bale spike · **leveler attachment** ·
silage compactor *(optional)* · **silage cutter or shovel attachment** · **bunker silo** ·
forage harvester with header · silage additive *(optional)* · trailer.

**Steps:**

1. **Unload** grass or chaff into the bunker silo. ⚠️ **Do not unload too close to the rim.**
2. **Compact** with a leveler or silage compactor until ⭐ **100% compaction** is reached.
3. **Cover** the compressed material — only once 100% compaction is reached — then let it ferment.
4. **Retrieve** the finished silage with a **shovel or silage cutter** and load into a trailer.

⚠️ **Compaction must reach 100% before covering.** This is the only hard threshold published in
either article, and the step most likely to be done wrong — covering early wastes the batch.

**Route choice:** bales (A) suit small operations and are portable; the bunker silo (B) suits bulk
throughput and is the only route that handles crop chaff at volume.

---

## 4. TMR — TOTAL MIXED RATION

**Four ingredients, always:** ⭐ **hay + silage + straw + mineral feed.**

Mineral feed is bought as **pallets or bales** at the dealership. The other three can be bought or
farm-produced:

| Ingredient | Produce it by |
|---|---|
| **Hay** | Mowing grass, then drying it (tedder) |
| **Straw** | 384 says only "a by-product of harvesting crops"; the specific crops (wheat, barley, oat) and the **straw swath** step come from `crops-101.md` |
| **Silage** | §2–3 above |
| **Mineral feed** | Purchase only |

### Equipment

Tractor with front loader attachment · **forage mixer wagon** · bale spike.

### Method A — mix it yourself

1. **Collect the ingredients.**
2. **Feed the mixer wagon** — use the front loader with bale spike to load bales and pallets in. ⭐ The wagon's interface shows how much of each ingredient is required and how much is currently in the tank, **expressed as percentages**.
3. **Mix** — hook the wagon to a tractor, activate it, then unload the finished TMR at the cow barn.

### Method B — feeding robot (recommended)

⭐ Barns with a feeding robot **mix the ration automatically** once hay, straw, silage and mineral
feed are unloaded in the designated areas. No mixer wagon needed.

Per `animals-101.md` §6, the Academy recommends buying the feeding-robot barn outright: the extra
building cost is offset by not buying a mixer wagon *or* a water barrel.

⭐ **Robot layout** (from article 649): **hay, straw and silage go on the LEFT side; mineral feed on
the RIGHT.**

### The one published ratio — Kuhn RA 142 mixer wagon

Not from these two articles — from the cow tutorial (news_id=336). Reproduced here because it is
the only concrete recipe the Academy publishes anywhere:

| Ingredient | Amount |
|---|---|
| Hay | **4,000 litres** |
| Silage | **4,000 litres** |
| Mineral feed | **450 litres** |
| Straw | **fill until full** |

⚠️ **This ratio is specific to the Kuhn RA 142.** For any other wagon, read the percentages off its
own info box — the Academy gives no general formula.

---

## 5. WHO EATS WHAT

| Animal | Needs TMR? | Alternative |
|---|---|---|
| **Cows** | ⭐ Yes, for 100% | Hay 80%, grass 40% |
| **Highland cattle** | Accepts it | Also grass, hay or silage; **the fence meadow covers up to 40%** |
| **Water buffaloes** | Named as a TMR consumer — *from the corn article (304), not 383/384* | — |
| Sheep, goats | No | Grass or hay both give 100% |
| Horses | No | Base ingredient + hay |
| Pigs | No — mixed automatically in the sty | 4-group crop mix |
| Chickens | No | Wheat / barley / sorghum |

Only **cows** are strictly gated on TMR for full output. Everything else has a simpler path.

---

## 6. PLANNING NOTES

- **Silage is worth making even without animals** — the fourfold value uplift on grass and corn stands on its own.
- **Two harvests from one corn field:** chaff in Aug–Sep or grain in Oct–Nov. Chaff feeds the silage → TMR → cow chain; grain sells or feeds pigs. Decide before the August window closes.
- **Bale route vs bunker route:** bales need a wrapper but no silo and are movable. The bunker silo is the volume option but adds a compaction step with a hard 100% gate.
- **Straw is the quiet dependency.** It is both a TMR ingredient *and* the requirement for manure production in barns. Growing wheat, barley or oat with the straw swath enabled feeds both needs from one harvest.
- **The feeding robot removes an entire machine class** from your fleet. If you intend to keep cows at all, factor the robot barn in from the start rather than buying a mixer wagon you will later retire.

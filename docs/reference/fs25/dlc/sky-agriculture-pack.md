# FS25 DLC — SKY Agriculture Pack

> **Offline reference for Claude Code.**
> **Primary source (official):** https://www.farming-simulator.com/dlc-detail.php?dlc_id=fs25skyagriculture
> All facts from the official page. **No tutorial exists** — this is an equipment pack.

| | |
|---|---|
| **Price** | $9.99 (PC & Mac) |
| **Released** | 30 June 2026 |
| **Requires** | FS25 Update **1.20** or higher |
| **Bundle** | **Year 2 Season Pass** |
| **Content** | **12 machines**, no map, no crops, no animals |
| **New brand** | **SKY Agriculture** (new to the series) |

---

## 1. WHAT IT ADDS

Seedbed-preparation and sowing equipment from a single manufacturer. ⭐ **Every item in the
pack is a ground-working or sowing tool** — power harrows, combined drills, a planter, a seed tank
and two fertilizer spreaders. There are no tractors, no harvesters and no trailers.

### ⭐ The physics/visual upgrade

The pack's headline feature is presentational rather than mechanical. Official wording: machines
feature "enhanced physics, animation, and dirt accumulation, making these machines appear more
realistic than ever."

Specifically: ⭐ "wheels visibly react to gravity more authentically, arms appear heavier while
unfolding, and **dirt accumulates on the ground tools that shake off while folding**."

⚠️ **No gameplay effect is claimed for the dirt** — it is described as a visual behaviour, not a
condition or cleaning mechanic. Don't assume it interacts with the machine-cleaning system.

---

## 2. COMPLETE ITEM LIST (12 items)

### Power Harrows (4)

| Machine | Required power | Working width |
|---|---|---|
| **HR 300 (3M)** | 120 HP | 3 m |
| **HR 300 (4M)** | 160 HP | 4 m |
| **HRW 6000.36** | 240 HP | 6 m |
| ⭐ **Methys HDS** | **400 HP** | **12 m** |

⭐ Power harrows likely matter under Precision Farming: per `precision-farming-3.md` §2, tillage
scores **0 points for deep ploughing, 5 for shallow tillage, 10 for minimal/direct seeding**.
*(No source states which bucket a power harrow falls into — shallow tillage is the reasonable
reading, but verify.)* Per `ground-working-101.md` §4, power harrows **dig up no stones** but need
more tractor power than a cultivator.

### Seeders — combined units (4)

| Machine | Required power | Working width | Capacity |
|---|---|---|---|
| **HR 300 (3M) + Progress P50** | 140 HP | 3 m | — |
| **HR 300 (4M) + Progress P100** | 200 HP | 4 m | — |
| **HRW 6000.36 + P100** | 260 HP | 6 m | — |
| ⭐ **Easydrill P250** | 200 HP | 6 m | **3,000 l** |

⭐ **The three "+ Progress" units are power harrow and seeder combined** — one pass instead of two.
This is the same time-saving principle as the direct sowing machines in `ground-working-101.md` §4,
which "can cultivate, sow, and even fertilize at the same time."

⭐ **The Easydrill P250 is the pick of the group** — 6 m width and a 3,000 l hopper for only 200 HP,
the same power requirement as the much narrower 4 m combined unit.

### Planters (1)

| Machine | Required power | Working width | Capacity |
|---|---|---|---|
| **Sonic PPF 300/12** | 180 HP | 6 m | 840 l |

### Seed Tanks (1)

| Machine | Capacity |
|---|---|
| **Progress TF** | 2,400 l |

### Fertilizer Spreaders (2)

| Machine | Required power | Working width | Capacity |
|---|---|---|---|
| ⭐ **X50+ Econov** | **150 HP** | ⭐ **50 m** | 2,400–4,000 l |
| **Falcon T240** | 250 HP | 42 m | ⭐ **19,500–21,500 l** |

⭐ **The X50+ Econov is the standout item in the pack.** A **50 m working width for only 150 HP** is
an exceptional ratio — for comparison, the Highlands Fishing agrispread AS2100 reaches 36 m, and
the DAMMANN Profi-Class Tridem sprayer manages 42 m. Only the NEXAT DAMMANN module (56 m) is wider,
and that requires the 1,100 HP carrier.

⚠️ The **"Econov"** designation is not explained on the official page. If it denotes section
control it would pair with Precision Farming's **Automatic Section Control** — unverified.

---

## 3. PLANNING NOTES

- ⭐ **This is a seedbed pack.** It slots into steps 1–3 of the field cycle in `ground-working-101.md` §11 (cultivate → sow) and nothing else. It won't help you harvest, transport or process.
- ⭐ **Buy it for the X50+ Econov** if you buy it for one thing. 50 m at 150 HP is the best width-per-horsepower in any pack documented here.
- **The combined harrow+drill units suit medium farms.** At 3–6 m they're not big-acreage tools, but one pass instead of two is a real saving on time and fuel.
- ⭐ **Likely good synergy with Precision Farming.** Power harrows dig up no field stones, so you skip the stone-picking chore; and if they count as shallow tillage they also beat ploughing's 0-point score. The tillage classification is unconfirmed.
- **Power requirements are moderate** — 120–400 HP, with most items under 260 HP. Unlike Plains & Prairies, this pack is usable with mid-tier tractors.
- ⚠️ **Update 1.20 required** — the joint-highest of any FS25 DLC here.
- **No prices, weights or top speeds** are published for any item.

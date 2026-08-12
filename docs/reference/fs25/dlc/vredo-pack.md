# FS25 DLC — Vredo Pack (Overseeding & Wild Boar)

> **Offline reference for Claude Code.**
> **Primary source (official):** https://www.farming-simulator.com/dlc-detail.php?dlc_id=fs25vredo
> Official news: news_id **665** (announcement), **671** (release), **673** (feature detail),
> **668** (fact sheets — images, not extractable; may carry prices)
> Facts are official unless marked **[SECONDARY — verify]**.

| | |
|---|---|
| **Price** | $7.99 (PC & Mac) |
| **Released** | 24 March 2026 |
| **Requires** | FS25 Update **1.17** or higher |
| **Bundle** | **Year 2 Season Pass** |
| **Content** | **12 machines** (11 Vredo + 1 Evers Agro) + 2 new mechanics |
| **New brand** | **Vredo** (Dutch — first time in the series) |
| **Returning** | Evers Agro |

> ⚠️ **Machine specs are fully published; the MECHANICS are not.** The official page carries a
> complete 12-item spec grid (§4). But the two gameplay systems this DLC introduces — grassland
> degradation and wild boars — have **no published numbers at all**, in any source. No official
> tutorial exists. See §5.

---

## 1. ⭐ NEW MECHANIC — grassland degradation and overseeding

**Official (news_id=673):** grassland **degrades over time, reducing yield potential**.

⭐ **The fix:** Vredo **DZ5 generation** seeders — the **Agri Twin 580, Agri 290 and Agri Air 290**
— restore degraded grassland to ⭐ **"original productivity levels"** via **overseeding**.

**[SECONDARY — FS Wiki]** Overseeding is recommended when the ⭐ **"Grassland Damage" setting is
enabled** — implying the whole mechanic is toggleable in game settings, like weeds and field stones
(`game-basics.md` §3).

⚠️ **Undocumented:** how fast grassland degrades, whether degradation is per-cut or per-season, and
what percentage of productivity overseeding restores or how quickly.

**Why it matters:** grass underpins the cheapest feeding routes in the game — sheep and goats reach
100% on grass alone, and grass is the input to hay and silage (`animals-101.md` §2,
`animals-102.md` §2). A degradation mechanic puts a maintenance cost on that previously free
resource.

---

## 2. ⭐ NEW MECHANIC — slurry injection

**Official (news_id=673):** **Vredo Profi series injectors** and the **Evers Agro Toric 48-672**
mounted injector, with transport via the **Vredo VT7138** high-capacity three-axle self-propelled
slurry tanker.

⭐ **Stated effect:** improved nutrient uptake → increased **"efficiency and crop quality."**

⭐ **Official (news_id=665):** slurry injectors do **double duty** — they "restore" degraded land
*and* "boost yield and crop quality by improving how nutrients get into the soil."

⚠️ **Undocumented:** the actual yield or quality delta versus surface-spread slurry.

**Cross-reference:** slurry is already one of the cheapest fertilisers (`ground-working-101.md` §5),
and under Precision Farming the application order matters — manure/slurry first, then mineral
top-up (`precision-farming-3.md` §7). Injection appears to improve that first step, but by an
unpublished amount.

---

## 3. ⭐ NEW MECHANIC — wild boars

**Official (news_id=673):** wild boars cause ⭐ **"substantial damages to your corn fields or
others."**

**Official (news_id=665):** boars are framed as a ⭐ **natural hazard alongside twister and hail.**
"You can **distract them, which reduces the impact on your yield**."

### Mitigation

⭐ **Accept forester contracts requiring distraction placement**, which reduces localised crop
damage.

**[SECONDARY — FS Wiki]** The boar-management object is a ⭐ **Wildlife Feeder placeable.**

⭐ **Boars can be disabled entirely in game settings** (official).

⚠️ **Undocumented:** damage magnitude, which crops beyond corn are affected and how severely,
the radius of a distraction, and boar spawn frequency.

---

## 4. COMPLETE ITEM LIST (12 machines)

Full specs are published on the official DLC page.

### Seeders — DZ5 generation (overseeding)

| Machine | Required power | Working width | Capacity |
|---|---|---|---|
| **Vredo DZ5 Agri 290** | 90 HP | 2.8 m | 290 l |
| **Vredo DZ5 Agri Air 290** | 100 HP | 2.8 m | 1,000 l |
| **Vredo DZ5 Agri Twin 580** | 150 HP | 5.7 m | 1,000 l |

⭐ **These three are the overseeding machines** — the ones that restore degraded grassland to
"original productivity levels". ⭐ **The Agri 290 needs only 90 HP**, so grassland maintenance is
accessible with a modest tractor.

### Slurry Tankers — self-propelled

| Machine | Power | Top speed | Capacity |
|---|---|---|---|
| **Vredo VT4556** | 450 HP | 40 km/h | 19,500 l |
| **Vredo VT5536** | 550 HP | 40 km/h | 22,000 l |
| ⭐ **Vredo VT7138** | ⭐ **710 HP** | 40 km/h | ⭐ **32,000 l** |

⭐ **The VT7138 is the flagship** — officially described as a high-capacity **three-axle
self-propelled** slurry tanker. At 710 HP / 32,000 l it is the largest self-propelled slurry
machine documented across these files.

### Slurry Tools — injectors

| Machine | Required power | Working width |
|---|---|---|
| **Vredo Profi Eco 6.0** | — | 6 m |
| **Vredo Profi Eco 7.5** | — | 7.5 m |
| **Vredo Profi 9** | — | 9 m |
| **Vredo Profi 12** | — | 12 m |
| ⭐ **Vredo Profi XL 18** | — | ⭐ **18 m** |
| **Evers Agro Toric 48-672** | 180 HP | 6.7 m |

⭐ **Five Vredo injectors spanning 6–18 m**, plus the Evers Agro mounted injector at 6.7 m. These
are the machines that deliver the slurry-injection nutrient-uptake benefit.

**Total: 12 — 11 Vredo + 1 Evers Agro** ✓ matches the official count.

⚠️ **No prices are published** for any item, and the seeders/injectors list no top speeds.

## 5. ⚠️ THE DOCUMENTATION GAP

**Every source checked — official and secondary — omits the following.** Do not assert values for
these without in-game testing or reading the pack's XML:

| Unknown | Why it matters |
|---|---|
| **Grassland degradation rate** | Determines how often overseeding is needed, and whether the mechanic is a minor chore or a major cost |
| **Overseeding restoration %** | Whether it fully or partially restores yield |
| **Slurry injection yield/quality delta** | Whether injectors justify their cost over surface spreading |
| **Wild boar damage magnitude** | Whether boars are a nuisance or a serious threat |
| **Distraction radius / effectiveness** | How many feeders a farm needs |
| **Prices** | No price is published for any of the 12 machines |

Sources checked and found empty on mechanics numbers: news_id 665, 668, 671, 673; the official DLC
page; FS Wiki (Vredo Pack/FS25); supercraft.host server guide; GPORTAL blog. The fact sheets at
news_id=668 are images and may carry prices — open in a browser if needed.

---

## 6. PLANNING NOTES

- ⭐ **This DLC adds two ongoing costs to a farm, not just machines.** Grassland now needs maintenance, and corn fields now face a threat. Both are settings-toggleable if you'd rather not deal with them.
- ⭐ **If you run sheep, goats or cows on grass, this changes your economics.** Grass was free; now it degrades. Budget for periodic overseeding.
- ⭐ **Boars target corn.** If corn is central to your operation — silage for TMR, feed for pigs (`animals-102.md`, `animals-101.md` §5) — plan for feeders or accept the losses.
- **Slurry injectors are the one clear upgrade** with no downside stated, and they stack with the manure-first fertilising order under Precision Farming.
- **At $7.99 it's cheap**, but its value depends entirely on the undocumented magnitudes above. If grassland degrades slowly and boars are rare, it's mostly a machine pack.

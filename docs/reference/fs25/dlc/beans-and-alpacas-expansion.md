# FS25 DLC — Beans & Alpacas Expansion

> **Offline reference for Claude Code.**
> **Primary source (official):** https://www.farming-simulator.com/dlc-detail.php?dlc_id=fs25beansandalpacas
> Official announcement: news_id **692** (14 July 2026)

| | |
|---|---|
| **Price** | **$26.99** (reduced from $29.99, −10% pre-release until 27 Oct 2026) |
| **Release** | ⚠️ **27 October 2026** |
| **Bundle** | **Year 2 Season Pass** |
| **Content** | New map, new crop, new animals, new production chains, **25+ machines** |
| **New brand** | **Colombo Industries** |

> ⚠️⚠️ **THIS DLC IS UNRELEASED.** As of the compilation date (12 August 2026) it ships in roughly
> 2.5 months. **No itemised machine list, no mechanics documentation, and no how-to content of any
> kind exists** — official or third-party. Everything below is from the announcement and product
> page. **Re-extract after 27 October 2026.**

---

## 1. WHAT IT ADDS — announced content

### New map: Catuaí

South American / Brazil-inspired. Official description:

- "Coffee plantations cover rolling hills, **red soil** shapes the land and dense greenery stretches across lower mountain slopes"
- "A lush, humid valley with narrow roads, dusty streets, scattered rocks and **a winding river** running through the landscape" — described elsewhere as "reminiscent of the Amazon"
- "A small rural town with colorful buildings, shops and agricultural depots"
- ⭐ **Stilt houses line the river shore**
- Six houses with full interiors; dozens of decorations

### ⭐ New crop: coffee

⭐ **The single most important mechanic detail published so far — the crop calendar is REVERSED:**

| | |
|---|---|
| **Planted** | **September** |
| **Harvested** | **May** |

⭐ This is a **southern-hemisphere seasonal calendar**, inverted relative to every crop in
`crops-101.md`. Note that September–May spans the northern calendar's "nothing sowable" window
(Nov–Jan) — so coffee occupies exactly the part of the year when a conventional farm is idle.

⚠️ **Unpublished:** whether coffee is a permanent/orchard-style crop like grapes and olives (placed
in build mode) or a field crop, what equipment it needs, whether it withers, and its yield or price.

### New animals

| Animal | Detail |
|---|---|
| ⭐ **Alpacas** | ⭐ **Shearing AND leading mechanics** — "leading" is a new interaction not present for any existing animal |
| **Brahman cows** | For grazing |
| **Wildlife: crocodiles, parrots** | Ambient / environmental |

⚠️ **Unpublished:** alpaca feed requirements, breeding age, housing options, fleece output and
processing. Whether Brahman cattle are dairy or breeding-only. Whether crocodiles are a hazard (like
the wild boars in `vredo-pack.md`) or purely decorative.

### ⭐ New production chains — pigment and resin

⭐ **The only official statement, quoted in full:** *"Create new products such as **pigment and
resin**, and repaint houses for the community, or start production chains for crop processing."*

⚠️ **Inputs, outputs and recipes for pigment and resin are NOT published anywhere.**

### Other features

| Feature | Detail |
|---|---|
| ⭐ **House repainting** | Repaint houses "for the community" — appears to be a mission/contract type using pigment |
| **Research Center** | A construction project / building option |
| ⭐ **Dinosaur skeleton collectibles** | Dinosaur bones collectible, with a **museum** to display them |
| **Improved sugarcane** | Improved sugarcane visuals and animation (base-game improvement) |

---

## 2. MACHINES — ⚠️ NOT ITEMISED

⚠️ **The official page publishes no machine grid for this DLC.** The only statement:

> "Operate **25+ new machines** from **Case IH, Ford, John Deere, KUHN, Mercedes-Benz Trucks,
> New Holland, Valtra**, and many more. **Colombo Industries** joins the series as a new brand."

The announcement (news_id=692) additionally names **Oxbo** and **Stara**.

| Brand list | Status |
|---|---|
| **Colombo Industries** | ⭐ **New to the series** |
| Case IH, Ford, John Deere, KUHN, Mercedes-Benz Trucks, New Holland, Valtra, Oxbo, Stara | Returning |

⚠️ Two separate fetches, including an explicit "list every item individually" re-fetch, confirmed
the item table is **absent from the page** — it is not a truncation artefact. Product pages for
unreleased FS25 DLCs do not carry item grids until launch.

**Notable:** **Oxbo** is the vegetable-harvester brand from `crops-101.md` §6.6 (spinach, peas,
green beans). **Stara** is a Brazilian manufacturer — consistent with the South American setting.

---

## 3. ⚠️ WHAT IS COMPLETELY UNDOCUMENTED

Everything mechanical. Do not assert any of the following without re-checking after release:

- **The full machine list** — 25+ items, none individually named
- **Coffee**: field crop vs orchard, equipment needed, growth stages, yield, price, withering behaviour
- **Alpacas**: feed, water, straw, breeding age, productivity percentages, housing, wool processing chain
- **Brahman cows**: dairy or breeding-only, feed requirements
- **Pigment and resin**: inputs, outputs, recipes, which buildings produce them
- **House repainting**: how it is triggered, what it pays
- **Research Center**: what it does, what it costs, what it unlocks
- **Dinosaur bones**: how many, where, what the museum rewards
- **Crocodiles**: hazard or scenery
- Whether Catuaí's **red soil** interacts with the Precision Farming soil-type system (`precision-farming-3.md` §3 lists four soil types — red soil is not among them)

Sources checked, all of which are re-writes of the same press release: FS Wiki (stub), fs25.net,
Steam store page.

---

## 4. PLANNING NOTES (provisional)

- ⭐ **The reversed coffee calendar is the standout planning fact.** September planting and May harvest fills the Nov–Jan dead zone in the standard crop calendar. If it works alongside a northern-hemisphere farm, it could smooth annual income considerably — but whether the two calendars coexist on one save is unstated.
- ⭐ **At $26.99 this is the second-priciest FS25 DLC**, behind Highlands Fishing at $29.99. Like that one it's a full expansion — map, crop, animals, mechanics — rather than a machine pack.
- **The Year 2 Season Pass ($34.99) contains this plus Vredo and SKY Agriculture**, which is better value than buying this alone if you want any of the other two.
- **Alpaca "leading" is a genuinely new interaction** — no existing animal in `animals-101.md` has anything comparable (horses are ridden, but that's the closest analogue).
- ⚠️ **Revisit this file after 27 October 2026.** Everything here is marketing copy; the mechanics are unknown.

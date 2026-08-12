# FS25 DLC — Precision Farming 3.0 Free Pack

> **Offline reference for Claude Code.**
> **Primary source (official):** https://www.farming-simulator.com/dlc-detail.php?dlc_id=fs25precisionfarming
> Official mechanics explainer series (farming-simulator.com news): news_id **187, 194, 196, 319,
> 329, 342, 343, 344, 345, 613** — plus **486** (milestone piece, low value).
> Facts are official unless marked **[SECONDARY — verify]**.

| | |
|---|---|
| **Price** | **FREE** |
| **Requires** | FS25 Update **1.8** or higher |
| **Content** | **7 new items** + a deep mechanics overhaul |
| **New brands** | None (John Deere, WIENHOFF, ISARIA, Lizard, HÖRMANN) |
| **ModHub** | v1.5.1.0, released 28.07.2026, 121.36 MB — rated 4.5/5 over 9,872 reviews |

⚠️ **There is NO Academy tutorial for Precision Farming.** However, the official site carries a
**ten-article explainer series** outside the Academy that the tutorial hub never links to. That
series is the richest source of hard numbers for any DLC in the game, and is reproduced below.

⚠️ **Vintage caveat:** the explainer articles are FS19/FS22-era (2020–2022). The mechanics carry
forward into 3.0 essentially unchanged, but the **3.0-only features — tramlines, PWM, subsidies,
WeedSeeker2 — are only announced, never explained in depth** anywhere official.

---

## 1. WHAT IT CHANGES

This is the only free DLC that fundamentally alters core farming mechanics. It replaces the base
game's simple fertilise-twice-for-100% model (see `ground-working-101.md` §5) with a soil-driven
system.

| Feature | What it does |
|---|---|
| **Soil types** | Four types, each with different fertility, optimal pH and nitrogen needs |
| **Soil sampling** | Survey your fields, or buy the data |
| **Environmental Score** | 0–100 per field, worth **±15% yield** |
| **Variable rate** | Seeding, weed control, fertilizing, lime — applied per field zone |
| **Crop sensors** | Live nitrogen mapping |
| **Yield maps & economic analysis** | Per-field cost and outcome tracking |
| **Tramlines** *(3.0)* | Guide machinery along consistent paths |
| **PWM** *(3.0)* | Sprayer nozzles adjust individually by speed and turn |
| **Subsidies** *(3.0)* | Planting catch crops (e.g. **oilseed radish**) pays subsidies |
| **Automatic Section Control** *(3.0)* | Switches sections on/off to stop over-spraying |
| **Retro-fit weed sensors** *(3.0)* | **PTx Trimble WeedSeeker2** on existing sprayers |

Project background: an initially **EU-financed** project (via EIT Food) with **John Deere**, to
promote sustainable farming technology. Partners include University of Hohenheim, University of
Reading, Grupo AN, and the Polish Academy of Sciences. **5M+ downloads.**

---

## 2. ⭐ THE ENVIRONMENTAL SCORE — the key numbers

**Source: news_id=342 (official).** This is the single richest official numbers page for any DLC.

- Scale **0–100**, default neutral **50**
- Score is **per field**; your farm total is the **average across all fields**
- ⭐ **Yield effect: up to +15% or −15%**

### The five scoring factors — 100 points total

| Factor | Max pts | How to score |
|---|---|---|
| **Soil Sampling** | **15** | ⭐ Sampling via ISARIA Scout **or** buying soil maps **automatically awards maximum points** |
| **Tillage** | **10** | Deep ploughing = **0 pts** · shallow tillage = **5 pts** · ⭐ **minimal / direct seeding = 10 pts** |
| **Nitrogen Management** | **30** | Max requires optimal fertilization using **both manure and crop sensors**. Over-fertilizing decreases it ("excessive nitrogen will leach and pollute the groundwater"); under-fertilizing also decreases it |
| **pH Balance** | **15** | Deviation from optimal pH loses points. ⭐ **Updates post-harvest** |
| **Weed Control** | **30** | ⭐ **Spot spraying = 30** · mechanical weeder/hoe = **20** · broadcast spraying = **15** · no control = **10** |

⭐ **Reading this as a planner:** the two 30-point factors — **nitrogen** and **weed control** —
are 60% of the score. Weed control is the easiest win: switching from broadcast spraying to **spot
spraying** is +15 points on its own, and even doing nothing scores 10. Soil sampling is a free 15
points for one action. Deep ploughing costs you the entire tillage category.

> ⚠️ Note this **inverts** the base-game advice in `ground-working-101.md` §4, where ploughing is
> valuable because it suppresses weeds. Under Precision Farming, deep ploughing scores **zero**
> on tillage.

---

## 3. SOIL TYPES

**Source: news_id=194, 187 (official).** ⭐ **Four soil types: loamy sand, sandy loam, loam,
silty clay.** Each has a **different optimal pH**, different nitrogen requirement, and drives
seeding rate.

**[SECONDARY — verify]** A Steam guide is the only source found with FS25-era yield figures:

| Soil type | Base yield |
|---|---|
| **Loam** | **125%** |
| **Sandy Loam** | **100%** |
| **Silty Clay** | **80%** |
| **Loamy Sand** | **75%** |

⚠️ Single-source, third-party. Verify in-game before relying on these. Source:
https://steamcommunity.com/sharedfiles/filedetails/?id=3481294954

Soil type drives: **lime requirement** (crop-independent), **nitrogen requirement** (soil type ×
crop), and **seeding rate**.

---

## 4. SOIL SAMPLING — two methods

**Method A — buy the data.** ⭐ "Buy a map containing all the necessary information, such as the
**soil type, pH levels and content of nitrogen**, from a service provider" (news_id=329). Removes
the need to sample. **[SECONDARY]** UI path: map view → precision farming tab → select owned field
→ "PURCHASE SOIL INFORMATION" → YES.

**Method B — survey it yourself.** Equipment: **John Deere Gator** or the fully automated
**ISARIA SCOUT**, operated electronically from the driver's seat.

- ⭐ **Samples cover a 25 m radius**
- ⭐ **Press Z to send samples to the lab**
- "The price of analyzing samples varies" with difficulty settings
- **[SECONDARY]** Isaria Scout costs **17,000**; **50 per sample analysed**. Attach to any 3-point hitch, unfold, **Tool 1 (B)** to lower and sample, drive until the minimap is fully red-brown, **Tool 3 (Y)** to send for analysis
- **[SECONDARY]** The FS Wiki notes manual sampling is **cheaper** than buying data

Either way, ⭐ **both award the full 15 Environmental Score points.**

---

## 5. NITROGEN AND CROP SENSORS

**Source: news_id=343 (official).**

Crop sensors "calculate the amount of nitrogen that is needed to release the crop's full yield
potential and display the results on a **nitrogen map**." Spreaders then read that map and
auto-apply precise amounts. ⚠️ **Without sensors you get reduced yield in parts of the field.**

| Sensor | Mounting | Light | Works |
|---|---|---|---|
| **ISARIA PRO Active** | Front-mounted | ⭐ **Pulsed light** | ⭐ **Day and night** |
| **ISARIA PRO Compact** | Cab-mirror mounted | Passive | ⚠️ **Daylight only** |

⚠️ **Constraint:** sensors only work when crops show **sufficient green foliage**. "For grains, like
wheat for example, the best time to use a sensor is during the mineral fertilizer application in
**spring**."

### ⭐ Manure nitrogen sensing — the 40% problem

**Source: news_id=345 (official).** Liquid manure is **not uniform**, and the game simulates this:
⭐ **"the applied amount of nitrogen can differ from the expected application rate quite heavily —
up to 40%."**

Fix: a **John Deere manure sensing system**, bought at the dealership during slurry-tanker
configuration. A **near-infrared sensor** measuring live nitrogen content. ⭐ "The application rate
will be **dynamically adjusted as the machine travels across the field**."

This matters because manure is the cheapest fertiliser (`ground-working-101.md` §5) — but without
the sensor, a 40% error either wastes it or under-feeds the crop, and both directions cost
Environmental Score points.

---

## 6. VARIABLE RATE SEEDING

**Source: news_id=344 (official).**

⭐ **Three seed rate options: low / standard / high**, selectable **manually or automatic**.
Automatic picks the optimal rate per field section; manual shows **indicator bars** suggesting the
right rate for current conditions.

⭐ **Soil-type dependency:**

| Soil | Seed rate |
|---|---|
| **Loam** (highest fertility) | ⭐ **Lower** rates |
| **Silty clay** | ⭐ **Higher** rates — compensates for a poorer seedbed and lower emergence |

Rationale as stated: cut seed in fertile zones without yield loss; raise it in weak zones for weed
competitiveness → "more yield and fewer weeds."

⚠️ **Gap:** the article contains a **reference table of crops × ideal seed rate by soil type**
rendered as an **image**. The numbers are not in the page text and could not be extracted. Open
https://www.farming-simulator.com/newsArticle.php?news_id=344 in a browser to capture it.

---

## 7. LIMING AND FERTILISING ORDER

**Source: news_id=194 (official) — the best official liming how-to.**

⭐ **Liming UI:** a **lime application bar** — "the **red mark** shows you the current pH level, the
**tiny flag** indicates which pH value to aim for." ⭐ **The comma key toggles automatic
application**, which dynamically adjusts pH toward the soil type's optimum.

⭐ **Fertilizing order matters:** apply **slurry/manure FIRST** to reduce subsequent mineral
fertilizer cost. After sowing, mineral fertilizer tops nitrogen up to the **crop-specific target**.
Both manual and automatic modes available.

⭐ **Variable rate fertilization "calculates the application rate based on the current vehicle
speed, so you always apply the correct amount per hectare"** (news_id=329). Crop can be
**pre-selected** before fertilizer application.

⚠️ **RTK station required: helpers need at least one RTK station for GPS-guided automation.**
Two RTK placeables ship with the pack (see §8).

**Economic Analysis tab** tracks per field: soil sample count and cost, lime applied, fertilizer
applied, seed, fuel, vehicle maintenance, helper cost. A real-time colour-coded minimap shows the
harvest outcome.

---

## 8. CONTENT LIST (7 items)

### Sprayers (2)

| Machine | Working width | Capacity | **[SECONDARY]** price |
|---|---|---|---|
| **John Deere R732i PowrSpray** | 24–28 m | 3,360 l | $52,500 (12 kph) |
| **John Deere R975i PowrSpray** | 36 m | 7,500 l | $103,500 (12 kph) |

### Slurry Tankers (1)

| Machine | Power | Capacity | **[SECONDARY]** price |
|---|---|---|---|
| **WIENHOFF WPS TA 25 Profi Line** | 250 HP required | **25,000 l** | $257,000 |

⚠️ news_id=613 names a **Wienhoff 25.200 PTW Profi Line** as having manure-sensor capability — a
different model designation from the WPS TA 25 listed here. They may or may not be the same
machine. Verify in-game.

### Miscellaneous (4)

| Item | Purpose | **[SECONDARY]** price |
|---|---|---|
| **ISARIA SCOUT** | Soil sampler | $17,000 |
| **ISARIA PRO Active** | Crop sensor (day + night) | $23,900 |
| **Lizard Building with RTK Base Station** | ⭐ Required for helper GPS automation | — |
| **HÖRMANN Shed with RTK Base Station** | Same, different building | — |

Prices come from the **official ModHub listing** rather than the DLC page — official, but a
different page from the rest of this file.

---

## 9. PLANNING SUMMARY

- ⭐ **It's free and it's the deepest mechanical change available.** No reason not to install it — but be aware it makes farming meaningfully more complex.
- ⭐ **Fastest Environmental Score wins:** sample the soil once (+15), switch to spot spraying (+15 over broadcast), stop deep ploughing (+10 over ploughing).
- ⭐ **Deep ploughing scores zero.** This directly conflicts with base-game advice where ploughing suppresses weeds. Under PF, use minimal/direct seeding.
- **Buy the soil map if you're short on time; sample if you're short on money** — both award full points.
- ⭐ **Get the manure nitrogen sensor before relying on slurry.** The stated ±40% variance makes unsensored manure application a gamble in both directions.
- **Build an RTK station early** if you use helpers — GPS automation depends on it.
- **Apply manure before mineral fertilizer**, always — it lowers the mineral top-up you have to buy.

---

## 10. WHAT'S NOT DOCUMENTED

- The **crop × soil seed-rate table** (image only, news_id=344)
- **Nitrogen target values per crop** and the **pH-by-soil-type table** — third-party Steam guides have them but as embedded images
- The 3.0-exclusive features — **tramlines, PWM, subsidies, WeedSeeker2** — have no depth explainer anywhere, official or secondary
- No official tutorial exists in the FS Academy at all

# Farming Simulator — Crops 101

> **Offline reference for Claude Code.** Compiled from the 26 articles in the "Crops 101"
> section of the official Farming Simulator Academy
> (https://www.farming-simulator.com/newsArticle.php?news_id=280).
> Every fact below is drawn from those articles. Nothing is inferred or supplemented.
> Where the Academy gives no figure, this file says "not stated" rather than guessing.

## Source provenance

| Crop / topic | Article | Crop / topic | Article |
|---|---|---|---|
| Introduction to Crops | news_id=297 | Sugar Beet | news_id=302 |
| Grains (overview) | news_id=298 | Cotton | news_id=306 |
| Wheat | news_id=619 | Corn / Maize | news_id=304 |
| Barley | news_id=620 | Sunflowers | news_id=303 |
| Sorghum | news_id=630 | Sugarcane | news_id=307 |
| Canola | news_id=631 | Poplar | news_id=305 |
| Oat | news_id=632 | Carrots | news_id=502 |
| Soybeans | news_id=633 | Parsnips | news_id=513 |
| Long Grain Rice | news_id=556 | Red Beet / Beetroot | news_id=514 |
| Rice | news_id=557 | Onions | news_id=648 |
| Spinach | news_id=558 | Peas | news_id=561 |
| Green Beans | news_id=560 | Grapes | news_id=299 |
| Potatoes | news_id=301 | Olives | news_id=300 |

URL pattern: `https://www.farming-simulator.com/newsArticle.php?&news_id=<id>`

**Version:** mixed vintage, and worth knowing when reading equipment names.
- **Explicitly FS25:** Rice, Long Grain Rice. **FS25-era (2025-dated or FS25 features):** Wheat, Barley, Sorghum, Canola, Oat, Soybeans, Potatoes, Onions, Spinach, Peas, Green Beans.
- **FS22-era (2021–2023):** Grapes, Olives, Sugar Beet, Cotton, Sunflowers, Sugarcane, Poplar, Carrots, Parsnips, Red Beet.
- **Named machines in the FS22-era articles may not exist in FS25** — the *procedures* carry over, the *model numbers* may not.

> ⚠️ **No prices or yields in this file.** Article 297 refers to a profitability table listing
> average selling price, harvest per hectare in litres, and optimal income per hectare — but that
> table is delivered as an image and its numbers are not present in the page text. They could not
> be extracted. Use the in-game **Price** screen instead.

---

## 1. MASTER CROP CALENDAR

All months are as stated in the source. Applies when **seasonal growth is enabled**.

| Crop | Sow / plant | Harvest | Machine to sow | Weeder or hoe |
|---|---|---|---|---|
| **Canola** | Aug – Sep | Jul – Aug | Seeder | Weeder |
| **Wheat** | Sep 1 – Oct 31 | Jul – Aug | Seeder | Weeder |
| **Barley** | Sep 1 – Oct 31 | Jun – Jul | Seeder | Weeder |
| **Cotton** | Feb 1 – Mar 31 | Oct – Nov | Planter | Weeder |
| **Grapes** | Mar 1 – May 31 | withers after Oct | Build mode | n/a (mulch) |
| **Spinach** | Mar – May 31 | regrows once, 2 harvests | Seeder | Weeder |
| **Sugar beet** | Mar 1 – Apr 30 | withers after Nov | Planter | Weeder |
| **Sugarcane** | Mar 1 – Apr 30 | Oct – Nov | Planter | Weeder |
| **Sunflowers** | Mar 1 – Apr 30 | Oct – Nov | Planter | Weeder |
| **Oat** | Mar – Apr | Jul 1 – Aug 31 | Seeder | Weeder |
| **Potatoes** | Mar – Apr | Aug – Sep | Potato planter | **Hoe** |
| **Onions** | Mar – Apr | Aug – Sep | Special planter | Weeder |
| **Poplar** | Mar – Aug | **year-round, never withers** | Tree planter | n/a |
| **Long grain rice** | April | September | Seeder (in paddy) | not stated |
| **Rice** | Apr 1 – May 31 | Aug 1 – Sep 30 | Special planter (in paddy) | not stated |
| **Corn / Maize** | Apr – May | **Oct – Nov** (chaff: Aug – Sep) | Planter | Weeder |
| **Sorghum** | Apr – May | Aug 1 – Sep 30 | Planter | Weeder |
| **Soybeans** | Apr – May | Oct 1 – Nov 30 | Planter | Weeder |
| **Carrots** | Apr 1 – Jul 31 | from August onwards | Planter (Vegetable Tech) | **Hoe** |
| **Peas** | Apr 1 – Jul 31 | Jul – Sep | Seeder | Weeder |
| **Green beans** | Apr 1 – Jul 31 | Aug – Nov | Planter | Weeder |
| **Parsnips** | Apr 1 – Jun 30 | from August onwards | Planter (Vegetable Tech) | **Hoe** |
| **Red beet / beetroot** | Apr 1 – Jun 30 | from August onwards | Planter (Vegetable Tech) | **Hoe** |
| **Olives** | Aug 1 – Sep 30 | withers after Oct | Build mode | n/a (mulch) |

### Calendar read as a planting schedule

| Month | What opens |
|---|---|
| **February** | Cotton |
| **March** | Grapes, spinach, sugar beet, sugarcane, sunflowers, oat, potatoes, onions, **poplar** (open Mar–Aug) |
| **April** | Rice, long grain rice, corn, sorghum, soybeans, carrots, peas, green beans, parsnips, red beet |
| **May** | (tail of April window; spinach closes end of May) |
| **June–July** | (carrots/peas/green beans still sowable to end of July) |
| **August** | **Canola, olives** — the game starts here. (Poplar runs Mar–Aug, so August is its *last* month, not an opening) |
| **September** | Wheat, barley, canola (to end Sep), olives (to end Sep) |
| **October** | Wheat, barley (to end Oct) |
| **Nov–Jan** | **Nothing sowable** |

**Critical for a new seasonal save:** the game begins in August. Per article 298, **canola is the
only crop you can seed at that point** (olives and poplar are also placeable/plantable in August,
but are not grains). Wheat and barley open in September.

**Overwintering crops:** canola, wheat and barley are sown in autumn and harvested the *following*
summer. Wheat is stated to require **ten months** to mature.

---

## 2. HARVEST EQUIPMENT COMPATIBILITY

The single most cost-relevant grouping in the game:

### One combine + grain header covers all of these

> **Wheat, sorghum, barley, oat, canola, soybeans** — stated twice (297, 298).
> Long grain rice also uses **the same header that is used for grains** (556).

That is 7 crops on one harvester. This is the Academy's central beginner recommendation: focus on
grains first because the equipment cost is amortised across the whole group.

### Everything else needs its own machine

| Crop | Harvesting equipment | Notes |
|---|---|---|
| **Corn / maize** | Combine + **corn header** | Or a **forage harvester + forage header** for chaff |
| **Sunflowers** | Harvester + **sunflower header** — *or the corn header* | Header identified by the sunflower icon |
| **Rice** (not long grain) | **Special rice harvester** | Different machine from long grain rice |
| **Potatoes** | Special potato harvester | |
| **Sugar beet** | Beet combine **OR** haulm topper + beet harvester | Harvesting tool alone may need ~**185 hp** |
| **Cotton** | Cotton harvester — **no header needed** | Processes cotton **directly into bales** |
| **Sugarcane** | Self-propelled cane harvester **OR** tractor-attached harvester (cheaper) | Narrow working width |
| **Poplar** | Special harvester + header **OR** baler with bumper | Baler saves **almost $400,000** |
| **Carrots / parsnips / red beet** | Special harvester | Same machine across all three |
| **Onions** | **Three machines**: harvester (cuts foliage, digs), windrower (cleans, rows), pickup harvester | |
| **Spinach / peas / green beans** | Special harvester, one per crop | |
| **Grapes** | Special grape harvester | Slim, drives over the vine row |
| **Olives** | Special olive harvester | Slim, drives over the tree row |

**Planning rule:** every crop outside the grain group carries a dedicated capital cost. The Academy
recommends **leasing/renting** for these — explicitly for cotton harvesters (306),
carrot/parsnip/red-beet equipment (502, 513, 514), and seasonal-use harvesters generally (298, 303).
It does *not* suggest leasing for sugar beet (302) — that article only says sugar beet is a poor
crop to start with.

---

## 3. USES, PROCESSING, AND ANIMAL FEED

| Crop | Feeds | Processes into |
|---|---|---|
| **Wheat** | Pigs, chickens | Flour (mill) → baked goods (bakery) |
| **Barley** | Pigs, chickens | Flour (mill) |
| **Sorghum** | Pigs, horses, chickens | Flour → bread and cake (bakery) |
| **Oat** | Horses | Flour; **cereals** (cereal factory) |
| **Canola** | Pigs | **Oil** (oil mill) → oil used to produce chips |
| **Soybeans** | Pigs | — |
| **Corn / maize** | Pigs | **Cereals** (with other ingredients); **chaff → silage** in a bunker silo, silage is part of **TMR** — optimal feed for cows and water buffaloes |
| **Sunflowers** | Pigs | **Oil** (oil refinery) |
| **Potatoes** | Pigs | **Chips** (potato processing plant); **potato soup** (soup factory) |
| **Onions** | — | **Fried onions** (with oil); **onion salt**; **soup** — all at the vegetable processing plant |
| **Grapes** | — | **Grape juice**, **raisins** |
| **Olives** | — | **Olive oil** (oil mill) |
| **Sugarcane** | — | **Sugar** (sugar mill) |
| **Rice / long grain rice** | — | Processed rice products — "sell those products for an even higher price" |
| **Cotton** | — | **Sold only at the spinnery** |

### Straw

**Wheat, barley and oat produce straw when harvested** — you must **activate the straw swath before
harvesting**. Straw is used for **TMR** and for **barn bedding to produce manure** (manure being among the
**cheapest** fertilizers per 292 — see `ground-working-101.md`).

### Bees

**Place a beehive next to the field** to improve yield for **canola** and **sunflowers**.

---

## 4. STORAGE RESTRICTIONS

Matters for the store-and-sell-high strategy, since prices fluctuate over the year.

| Storable in a silo | Not storable in a silo |
|---|---|
| Grains (wheat, barley, oat, sorghum, canola, soybeans) | **Sugar beet** — unload on the ground |
| **Rice** — 557 directs you to unload into the silo's designated area | **Spinach** — cannot be stored **at all**; must be processed immediately |
| **Sunflowers** (explicitly stated storable) | **Cotton** — store bales, e.g. in a barn |
| | **Sugarcane** — unload on the ground or leave in trailers |
| | **Poplar wood chips** — ground, trailers, or store the bales |
| | **Carrots, parsnips, red beet** — use the **pallet store** |

Root crops generally: "Storing root crops in silos is not possible, but you can store them on the
ground, in a shed, for example" (297).

---

## 5. CROP GROUPS AND THEIR DIFFERENT WORKFLOWS

Article 297 divides crops into four groups with genuinely different mechanics:

| Group | What's different |
|---|---|
| **Grain crops** | Simplest. Same harvester + grain header across the group. Start here |
| **Root crops** | Special planters and harvesting equipment. **Plow before planting** (not just cultivate) to clear roots. **Cannot be silo-stored** |
| **Orchards & vineyards** | **Created in build mode**, not sown. Require special slim equipment. Permanent — you never replant. **Grapes** must be pruned each year to fruit again; **olives** have no pruning step. Mulching in both is grass control, not reproduction |
| **Other special crops** | Cotton, corn, rice, sugarcane, poplar — each with dedicated machinery. The Academy warns cotton harvesters are "quite expensive" |

---

## 6. PER-CROP DETAIL

### 6.1 Grains — the standard workflow

Applies to wheat, barley, sorghum, canola, oat, soybeans.

**Equipment needed:** tractor (with front loader attachment), bale spike + pallet fork for moving
resources, cultivator, seeder or planter + seeds, fertilizer spreader + fertilizer + lime, weeder,
combine + grain header, trailer for the harvest, **and a second trailer to transport the header**
("streets are often narrow and crowded").

**FS22-era named loadout (298):** John Deere 7810 · RABE MR 250 cultivator · NORDSTEN NS 3030
seeder · Einböck Aerostar-Exact 600 weeder · DEUTZ-FAHR Topliner 4090 HTS + Header 4090 ·
BREDAL K105 fertilizer · WELGER DK 115 trailer.

**Step order (consistent across all six grain tutorials):**

1. **Apply lime** with the fertilizer spreader
2. **Cultivate** — works the lime into the ground and prepares the seedbed
3. **Sow / plant**
4. **Fertilize** — twice, with a growth stage between, for 100%
5. **Weed** — weeder while small; hoe or sprayer after
6. **Harvest** — activate **straw swath** first if you want straw (wheat, barley, oat)
7. **Sell or process**

**Machine operation pattern** (repeated verbatim in the FS25-era tutorials — 619, 620, 630, 631,
632, 633, 301, 304, 648; the older articles omit it):
align the tractor with the tool and press the connect button → place the implement next to the
resource and press refill → drive to the field, unfold, lower, go.

**Per-crop specifics:**

- **Wheat** — sow Sep–Oct, harvest Jul–Aug. Straw. Pigs + chickens. Flour → baked goods.
- **Barley** — sow Sep–Oct, harvest **Jun–Jul** (earliest harvest of any grain). Straw. Pigs + chickens.
- **Oat** — plant Mar–Apr, harvest Jul–Aug. Straw. **Horses only.** Flour and cereals.
- **Canola** — plant Aug–Sep, harvest Jul–Aug. **The only crop sowable at game start.** Pigs. **Beehive improves yield.** Oil → chips. Uses a **seeder**.
- **Sorghum** — plant Apr–May, harvest Aug–Sep. Pigs, horses, chickens. Uses a **planter**.
- **Soybeans** — plant Apr–May, harvest **Oct–Nov**. Pigs. Uses a **planter**.

> Source errata, preserved for accuracy: the Oat and Soybean articles both say "harvest your
> canola" in the combine bullet — a copy-paste error in the source, not a mechanic.

---

### 6.2 Rice — two different crops, do not confuse them

Both need a **rice paddy**: a field deepened for water retention, **placed from build mode** →
second menu item → **cultivation segment** (alongside olive and grape vines).

**Paddy placement:** place the first corner with the assigned button, create any shape you want,
**the water pump will be on the first side you create**, then press the button to end creative mode.

⚠️ **Removal:** enter demolition mode from build mode and sell the water pump. **The height
difference remains** — use ground sculpting mode to level the soil afterwards.

| | **Long grain rice** (556) | **Rice** (557) |
|---|---|---|
| Sow | **April** | **Apr 1 – May 31** |
| Harvest | **September** | **Aug 1 – Sep 30** |
| Water at sowing | **None** — not sown in water | **Fill paddy, keep ≤60%** for plants to grow |
| Sowing machine | **Seeder** (UNIA FENIX 3000/4) | **Special planter** (Iseki PRJ8D) — also holds fertilizer |
| Harvester | Massey Ferguson 8570 + header — **standard grain header** | **Iseki HJ6130** — special rice harvester |
| Fertilizing | **Only once**, unlike other crops | Loaded into the planter |
| Saplings | — | Can be grown in a **specialized greenhouse** |

**Both:** maintain water level via the water pump throughout growth — "you need to maintain
different levels of water at several growth steps… **check your water pump daily**. If you don't
keep the right water level, you will lose some of your rice saplings." The pump only permits the
correct action, so you can't get it wrong.

**Both:** apply lime **every third harvest**. To grow another batch, just **cultivate the paddy** —
no re-placement from build mode needed. **New paddies don't need lime** (stated in 556 only; 557 is
silent on this).

---

### 6.3 Root crops

#### Potatoes (301)
Plant Mar–Apr, harvest Aug–Sep. **Subsoiler** to prepare (not a cultivator). **Potato planter** —
and **harvested potatoes can refill the planter** instead of buying seeds. **Hoe, not a weeder** —
potatoes are planted in rows. Special potato harvester. Pigs; chips; potato soup.

#### Sugar beet (302)
Plant Mar 1 – Apr 30, **withers after November**. Not a beginner crop — the equipment is expensive.

- Use a **subsoiler every time** instead of alternating cultivator + plow: "easier and faster."
- **Look for the beet icon** to identify compatible planters.
- Some planters (**Agromasz Falcon3**) **plant and fertilize simultaneously** — no separate fertilizing machine needed, except for lime.
- **Harvesting is two operations:** cut off the haulms (tops) first, then harvest. A beet combine does both; a haulm topper + harvester does them separately. **If your tractor is strong enough, attach the haulm topper on the front and the harvester on the rear** to do both in one pass.
- The harvesting tool alone may require ~**185 hp** — more than a starter tractor.
- The second fertilizer application **cannot** be done with the planter; you need the spreader.
- **Cannot be silo-stored** — unload on the ground.

FS22-era loadout: CLAAS Axion 800 · Kuhn DC 401 subsoiler · Agromasz Falcon3 planter ·
Grimme FT 300 haulm topper · Grimme Rootster 604 harvester · Einböck Aerostar-Exact 600 weeder ·
BREDAL K105 (lime only) · WELGER DK 115.

#### Carrots (502), Parsnips (513), Red beet / beetroot (514)
**Identical workflow and identical equipment across all three.** Only the sowing window differs:
carrots **Apr 1 – Jul 31**; parsnips and red beet **Apr 1 – Jun 30**. All harvest **from August
onwards**.

- **Tractor + weights** — required, or the front wheels lose traction under rear-mounted machinery.
- **Subsoiler** rather than a plow (faster, simpler). Plow after every harvest for the roots.
- Planters are in the **"Vegetable Technology"** shop category.
- **Hoe, not a weeder.**
- ⭐ **Ridge former (optional but important): shaping ridges counts as a fertilizing stage and improves yield.** If you shape ridges you need only one fertilizer pass; if you're short on money, fertilize twice instead. This is a capital-vs-consumable trade-off.
- **Harvest unloading has two options:** overload directly into the trailer, **or** use **vegetable pallets** (bought in-vehicle or in the shop, loaded manually onto the harvester).
- **Not silo-storable — use the pallet store.**

FS22-era loadout (all three): CLAAS Axion 800 · Kuhn DC 401 subsoiler · Grimme GF 400 ridge former ·
Kverneland Miniair Nova planter · Dewulf GBC harvester · Einböck CHOPSTAR 5-90 ROW-GUARD hoe ·
BREDAL K105 · WELGER DK 115 · Tenwinkel PAC-1000 front weight.

> "Red beet" (American English) and "beetroot" (British English) are the same crop.
> Source erratum: the carrot and red beet articles both call the crop "the yellow vegetable" in
> the harvest step — a copy-paste artifact.

#### Onions (648) — the most machine-intensive harvest
Plant Mar–Apr, harvest Aug–Sep. **Cultivator** (not subsoiler). Special planter. **Weeder** (not
hoe, despite being a row crop).

**Harvest takes three machines in sequence:**
1. **Onion harvester** on the **front** of the tractor — cuts down foliage and digs out the onions
2. **Onion windrower** on the **back** — cleans the onions and lays them in a line
3. **A second harvester** — picks up the onions

**Optional: the Holaras AS 25 onion topper**, a **placeable** from the building menu — pack onions
with it **for more profit**. Processing: fried onions (with oil), onion salt, soup.

---

### 6.4 Orchards & vineyards — permanent crops

Both **grapes** (299) and **olives** (300) are **placed in build mode → production tab →
'orchards' section**, not sown.

**Placement technique (identical for both):** click free land to put down the first pole/tree, drag
the row across the field, put down another at the end. **For the next row: zoom in and move the
cursor away from the first row until the silhouette reappears — that's the ideal spacing.** Repeat.

**Why special equipment:** vines and trees need proper spacing for sun, water and air while saving
space, so you work in **narrow gaps**. A normal tractor and sprayer won't fit — you need slim
machinery.

| | **Grapes** | **Olives** |
|---|---|---|
| Plant | **Mar 1 – May 31** | **Aug 1 – Sep 30** |
| Withers | **after October** | **after October** |
| Harvester | Braud 9070L | Braud 9090X Olive |
| Trailer | Fuhrmann MRWK 6000 | Rudolph DK 280 RL |
| Extra step | ⭐ **Leaf cutter — pruning** | none |
| Processing | Grape juice, raisins | Olive oil (oil mill) |

Shared FS22-era kit: **Landini REX 4 GT** tractor · **AGRISEM DISC-0-Vigne V** subsoiler ·
**TMC Cancela TPN 140** mulcher · **Hardi Mercury 4000L** fertilizer sprayer.
Grapes additionally require the **Provitis MP 122 OCEA leaf cutter** — the machine the pruning
step below depends on.

**Annual cycle (both):**
1. **Mulch** the ground between rows as soon as grass grows higher — keeps it clear, prevents weed growth, avoids a yield penalty
2. **Cultivate** between rows with the **slim subsoiler** — loosens soil for more water and nutrients
3. **Fertilize** once the vines/trees reach the first growth stage, using **liquid fertilizer**. ⭐ **Grapes only (299): activate the sprayer's double application rate** — then you fertilize once instead of twice. The olive article (300) describes plain fertilizing and does not mention this
4. **Harvest** — position the harvester **centred** on the row; the vines/trees pass through the centre of the machine. Zoom in to check alignment. Drive straight
5. **Unload rearward** — these harvesters unload from the back, so face the trailer rearward

⭐ **Grapes only — pruning.** "With most crops we'd be done by now." **As soon as the leaves turn
yellow**, attach the **leaf cutter to the FRONT** of the tractor, unfold, turn on, and cut the
leaves by driving between the vines. **Without pruning, grapes will not grow again next year.**
You never replace the vines themselves.

---

### 6.5 Regrowing crops — plant once, harvest repeatedly

#### Sugarcane (307)
Plant Mar 1 – Apr 30, harvest Oct–Nov. **High yield, but low selling price.**

- ⭐ **No field preparation at all** — no initial plowing or cultivating. Only after the third harvest do you plow to avoid a yield penalty.
- ⭐ **Grows back.** No replanting after harvest **unless you plow**. **You can fill the planter with sugarcane from the previous harvest.**
- **Tractor + weight attachments required** — the rear machinery is heavy enough to lift the front wheels. Click **"combinations"** on a tool's shop page to see matching weights. **One weight module can serve multiple tools**; small discrepancies aren't critical.
- Planters in **"Sugarcane technology"**; pallets in the **"objects"** tab.
- Harvester options: self-propelled, **or** tractor-attached (cheaper).
- Harvest sequence: attach harvester to tractor → attach trailer to harvester → open trailer cover → unfold harvester → move out the pipe → turn on → harvest. Fills the trailer automatically via the pipe.
- With two tractors, attach a normal trailer to the second and let the helper drive the harvester.
- **Not silo-storable.** Processes into sugar at the sugar mill.

FS22-era loadout: Massey Fergusson 3670 · RABE EG3/9 cultivator · **Gessner Single Row Billet**
planter · **Lizard SWT 7** harvester · Einböck Aerostar-Exact 600 weeder · BREDAL K105 ·
WELGER DK 115 trailer. Several of these pair with a **Tenwinkel PAC-750** weight.

#### Poplar (305)
Plant Mar–Aug. ⭐ **Never withers — harvest year-round.** ⭐ **Grows back.** Produces **wood chips**.

- **No field preparation** — only after the third harvest do you plow.
- **Tractor + weights required**, as with sugarcane.
- Tree planters in **"Forestry Equipment"**; saplings in **"objects" → "pallets"** (not in the standard seed bigbag).
- ⭐ **Two harvest routes, with a large cost gap:**
  - **New Holland FR 780 + 130FB header** — what "most farmers would use," with a Kaweco Radium 255 trailer attached directly
  - **Anderson BioBaler WB-55 + Bumper** — harvests and presses directly into bales. **Saves almost $400,000.** A bale forms at a **2,000 litre** fill limit; drop bales on the ground and collect later with the Anderson RBM 2000 (activate its pickup module and drive past the bales)
  - Further saving: use a **FARMTECH DPW 1800** trailer instead, pick bales up with a **Fliegl Schmetterling** on a front loader
- Fertilizer: repeat after planting **or activate double application rate**.
- **Not silo-storable.**

FS22-era loadout: John Deere 7810 · **Damcon PL-75** planter (+ AGCO 1100 weight) ·
BREDAL K105 fertilizer (+ CLAAS W600 weight) · harvester and trailer per the two routes above.

#### Spinach (558) — regrows once
Grow **March – end of May**. ⭐ **If you plant as soon as possible, you get two harvests in one
year** — spinach regrows **once** after the first harvest. To grow it again the following year you
must cultivate again.

⚠️ **Spinach cannot be stored at all** — "spinach needs to be processed as soon as possible." Plan
the sale before you harvest.

Loadout: Challenger MT635 · John Deere 980 cultivator · UNIA FENIX 3000/4 seeder · Bredal K105 ·
Väderstad Rexius 1230 roller · Gorenc Puler 600 weeder · **Oxbo MKB-4TR** harvester ·
Farmtech EDK 650 trailer.

---

### 6.6 Vegetables — peas and green beans

Same 8-step workflow as spinach: lime → cultivate → sow/plant → fertilize → **roll** → weed →
harvest → sell. All three explicitly include a **roller** in the required-equipment list for the
+2.5% bonus.

| | **Peas** (561) | **Green beans** (560) |
|---|---|---|
| Sow | Apr 1 – Jul 31 | Apr 1 – Jul 31 |
| Harvest | **Jul – Sep** | **Aug – Nov** |
| Machine | **Seeder** — Great Plains SOLID STAND 1500 | **Planter** — Amazone Precea 4500-2C Super |
| Harvester | **Oxbo EPD 540e** | **Oxbo BP 2140e** |
| Unloading | Unfold the **pipe** | Move the **bunker** up |

Shared: Challenger MT635 · John Deere 980 · Bredal K105 · Väderstad Rexius 1230 ·
Gorenc Puler 600 weeder · Farmtech EDK 650.

---

### 6.7 Other special crops

#### Corn / maize (304)
Plant Apr–May. ⭐ **Two different harvests from the same crop, at different times:**
- **Chaff: harvest Aug–Sep** with a **forage harvester + forage header** → bunker silo → **silage** → part of **TMR**, the optimal feed for cows and water buffaloes
- **Maize: harvest Oct–Nov** with a **combine + corn header** → sell, feed pigs, or make cereals

**Requires a plow** (not just a cultivator) both to prepare the field and after growing maize.
"Corn" is American English, "maize" British English — same crop.

#### Sunflowers (303)
Plant Mar 1 – Apr 30, harvest Oct–Nov. Cultivate (no plow needed unless the info box says so).
⭐ **Can be harvested with the sunflower header OR the corn header** — if you already own a corn
header, sunflowers cost nothing extra to harvest. **Beehives nearby increase yield.** Pigs; oil at
the oil refinery. ⭐ **Silo-storable**, unlike most specialty crops.

FS22-era loadout: John Deere 7810 · RABE MR 250 · Agromasz Falcon planter ·
Topliner 4090 HTS + **Capello Helianthus 5700** header · Einböck Aerostar-Exact 600 ·
BREDAL K105 · WELGER DK 115.

#### Cotton (306)
Plant **Feb 1 – Mar 31** (earliest planting window in the game), harvest Oct–Nov. Explicitly **not
a beginner crop** — "quite expensive."

- ⭐ **You need a big enough field: a full bale takes around two hectares of harvest.** Small fields are inefficient.
- **Look for the cotton icon** to identify suitable planters.
- The cotton harvester needs **no header** — it processes cotton **directly into bales**.
- **Minimum 2,000 litres** of cotton to unload a bale; you can harvest up to **20,000 litres**, and a full module brings a higher yield.
- ⭐ **Manually you harvest 7 rows at a time; the AI helper harvests 6.**
- Requires a **cotton trailer** ("cotton technology" category) — lower it into operating position and slowly back up to pick up the bale.
- **Cotton can only be sold at the spinnery.** Not silo-storable.
- Academy's advice: look for **neighbour contracts** offering cotton, or **rent** the machines — "especially the cotton harvester will save you a lot of money if you rent it."

FS22-era loadout: John Deere 7810 · RABE MR 250 cultivator · **Agromasz Falcon** planter ·
**Case IH Module Express 635** harvester · Einböck Aerostar-Exact 600 weeder · BREDAL K105 ·
**Lizard Module 4** cotton trailer.

---

## 7. CROSS-CUTTING RULES REPEATED ACROSS THE TUTORIALS

These appear in nearly every crop article and are safe to treat as general:

1. **Fertilize twice, with a growth stage in between**, for 100%. One pass = 50%. With manure/slurry, activate **double application rate** to reach 100% in one pass.
2. **Deal with weeds immediately.** "The longer they grow, the harder they are to terminate." Weeder at stage 1 → hoe → sprayer (expensive, plus a yield penalty).
3. **Don't accelerate time while sowing** — "the crops will grow unevenly." Accelerating *between* operations, until weeds appear, is fine.
4. **Crop destruction on → use narrow tires** once the crop starts to sprout.
5. **A soil roller after planting gives +2.5%** and buries small stones so they don't damage the harvester.
6. **Transport headers on a trailer** — "streets are often narrow and crowded."
7. **Check the Price screen before selling**; prices fluctuate over the year and storing can pay — subject to the storage restrictions in section 4.
8. **The field info box is authoritative** for whether lime or plowing is needed.
9. **A seed bigbag contains all crops** — select the crop on the machine. Exceptions: **poplar, sugar cane and tree saplings** are bought as separate pallets.
10. **Clean your machinery** periodically.
11. **The "Packs" section of the shop bundles everything needed for a given crop** — stated in 556, 557, 558, 561, 299, 300 and 305, and the fastest way to buy a crop's full kit without browsing categories.

---

## 8. RECOMMENDED PROGRESSION (as the Academy frames it)

1. **Start with grains** — cheapest entry, one harvester covers 6–7 crops, and the equipment is needed for everything else anyway. With seasonal growth on and an August start, that means **canola first**, then wheat/barley in September.
2. **Add straw crops** (wheat, barley, oat) once you have animals — straw feeds TMR and produces manure, one of the cheapest fertilizers.
3. **Add corn** when you can afford a forage harvester — it unlocks silage and TMR for cows.
4. **Root vegetables** (carrots, parsnips, red beet) share one equipment set across three crops — good value, but need tractor weights and a hoe.
5. **Avoid early:** cotton (expensive harvester, needs ~2 ha per bale), sugar beet (expensive, ~185 hp harvesting tool), and anything with a single-purpose harvester — lease instead.
6. **Regrowing crops** (sugarcane, poplar) have high setup cost but no replanting and no field preparation. Poplar in particular never withers, so it carries no timing pressure at all.

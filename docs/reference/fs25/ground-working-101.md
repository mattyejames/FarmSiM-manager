# Farming Simulator — Ground Working 101

> **Offline reference for Claude Code.** Compiled from the 9 tutorials in the "Ground Working 101"
> section of the official Farming Simulator Academy
> (https://www.farming-simulator.com/newsArticle.php?news_id=280).
> Every fact below is drawn from those articles. Nothing is inferred or supplemented.
> Contradictions between source articles are flagged rather than resolved.

## Source provenance

| # | Topic | Source article |
|---|---|---|
| 1 | Introduction to Fields | news_id=290 |
| 2 | Introduction to Yield Improvement | news_id=291 |
| 3 | Fertilizing Fields | news_id=292 |
| 4 | Plowing & Cultivating | news_id=294 |
| 5 | Seeding & Planting | news_id=317 |
| 6 | Getting Rid of Weeds | news_id=293 |
| 7 | Grass & Soil Rolling | news_id=295 |
| 8 | Mulching | news_id=296 |
| 9 | Field Stones | news_id=318 |

URL pattern: `https://www.farming-simulator.com/newsArticle.php?&news_id=<id>`

**Version:** only article 318 names a version, and it says **Farming Simulator 22**. The other
eight are unversioned. Mechanics are broadly current for FS25, but **the lime cadence and stone
behaviour should be verified in-game** before relying on them for a plan.

---

## 1. The yield model — the single most useful table here

Yield is the sum of independent bonuses and penalties. Quantified figures from the Academy:

| Factor | Effect | Article |
|---|---|---|
| **Fertilizing** | "The most impactful measure you can take." Up to **2 applications** = 100% | 291, 292 |
| **Weed-free harvest** | **+20% yield** | 293 |
| **Mulching** | **+2.5%** for the next harvest | 291, 296 |
| **Soil rolling** | **+2.5%** (condensing the soil) | 291, 295 |
| **Liming** | Required periodically; "essential to improve plant growth" — no % given (291). "Your yield will be reduced" without it is from 556; "earn a bit less money" from 302 | 291 |
| **Plowing** | Required after root crops; "increase the yield for the next harvest" — no % given | 291, 294 |
| **Herbicide** | **Yield *penalty*** — "a small yield penalty" for applying chemicals | 291, 293 |
| **Ridge forming** (root vegetables) | Counts as **a fertilizing stage** | see `crops-101.md` |

Reading this as a planner: fertilizer is the big lever, weed control is the second (+20% is larger
than mulching and rolling combined), and the two 2.5% bonuses are cheap optional extras. Herbicide
is the only *negative* — it is a recovery tool, not part of an optimal plan.

**Where to check status in-game:** the field info box (lower right, standing on the field) reports
crop type, growth, yield bonus, fertilized %, weed level *and which machine is needed for it*, plus
whether liming, rolling or ploughing is necessary. On the map screen there are **two distinct
filters**: **soil composition** shows weed / fertilize / plow / lime needs (290), while **soil
properties** shows stone sizes only (317).

---

## 2. Field information and map filters

### Field info box (lower right, on foot)

| Readout | Meaning |
|---|---|
| Owned by | Whether the field is yours. If not, buy it from the farmland screen — otherwise you can't use it |
| Crop type | What's currently growing. Buying a field may mean taking over already-planted crops |
| Growth | State of the field and sown crops |
| Yield bonus | How much extra yield you'll gain — depends on fertilizing, weeding, mulching etc. |
| Fertilized | How much fertilizer is applied. **You can fertilize up to two times until it reaches 100%** |
| Weed | Weed growth level **and which machinery removes it**. Stages: small, medium, large |
| — | Also reports whether **liming, rolling or ploughing** is necessary for full yield |

### Map filters

| Filter | Shows |
|---|---|
| Crop types | Each crop in a different colour — track what's growing where |
| Growth | State of fields and planted crops |
| Soil composition | Whether you need to remove weed, fertilize, plow, or lime — by colour |
| Soil properties | Stone sizes: **small = yellow, medium = orange, large = red** |

---

## 3. Buying and shaping fields

- The **farmland screen** shows all fields: which are yours, which are buyable. Fields can also be sold to raise money.
- **Merging and enlarging:** if adjacent fields are yours and not separated by roads or other infrastructure, a **plow** can create new fields or merge them by plowing the space between. Activate the plow's **"create fields"** function.

Academy's field-purchase heuristics:

- Buy fields **close to each other** — saves travel time with machinery.
- Watch for **trees** on a field you want to buy — forestry equipment to remove them is expensive.
- A field **longer than it is wide** saves time — fewer turns.
- Use the **ridge marker** where available (seeders and some direct seeders). It creates a track to follow; centre your vehicle on it for perfect row spacing.

---

## 4. Plowing vs. cultivating

**Definition:** plowing turns over the soil, bringing lower soil to the top. Cultivating loosens
the top layer only. "In Farming Simulator, the more time-consuming plowing is rarely necessary.
In most cases, cultivating will suffice."

### Full tool comparison

| Tool | Shop category | Speed | Creates fields? | Prevents weeds? | Stones dug up | Notes |
|---|---|---|---|---|---|---|
| **Regular plow** | Plows | 12 kph | **Yes** | **Yes** | Small | High tractor power requirement, low operating speed. Increases yield for next harvest |
| **Spader** | — | 5–8 kph | — | **No** | — | "Pretty much the same as regular plows" but doesn't prevent weeds. Increases yield for next harvest |
| **Subsoiler** | Subsoilers | 12–15 kph | **No** | **No** | **Large** | Faster, lower power requirement than a plow |
| **Regular cultivator** | Cultivators | 15 kph | No | No | Small | **Most effective against weeds** |
| **Shallow cultivator** | Cultivators | 15 kph | No | No | **None** | Wider working width, more ground covered, lower power requirement — but more expensive and **not as effective against weeds** |
| **Disc harrow** | Disc harrows | 18 kph | No | No | **None** | Lower power requirement, lower price, higher working speed than a regular cultivator — but **weeds grow faster** |
| **Power harrow** | Power harrows | 12 kph | No | No | **None** | Quite cheap, but needs more tractor power |
| **Direct sowing machine** | Seeders | — | No | No | **None** | Can cultivate, sow and even fertilize in one pass. High power requirement, but saves time and fuel. **Weeds grow faster** |

> ⚠️ **Internal contradiction in article 294.** Its grouped heading says "Regular Cultivators
> **and Shallow Cultivators** … are the most effective against weeds, but dig up small stones,"
> while the very next bullet says shallow cultivators "won't dig up stones … are not as effective
> against weeds." The table above follows the second version, which is corroborated by 318 (shallow
> cultivators listed among the tools that avoid stones entirely).

**Two decision rules that fall out of this table:**

1. If you want **no stones at all**, use a shallow cultivator, disc harrow, power harrow, or direct sowing machine (stated explicitly in 318).
2. **A plow is the only tool that both prevents weeds and creates fields.** If weed management is the pain point, plowing eliminates the problem entirely for that cycle.

### When plowing is required

Plowing is needed after harvesting **root crops** — the Academy names potatoes, corn, sugar beets
and sugar cane (291 and 294). 291's wording: "You have to get deep into the ground to get rid of
the roots." (The often-quoted "The roots go deep, so you have to get rid of them by plowing" is
from 302, the sugar beet article, not from the Ground Working section.)

> ⚠️ **Unresolved contradiction in the source.** The Academy states the plow cadence three
> different ways across articles, and does not reconcile them:
> - "Plowing is required after harvesting root crops like corn, potatoes, sugar beets and sugar cane" (291)
> - Sugar beet tutorial, step 1: "You need to plow after **every harvest** when it comes to root crops" — but its equipment list in the same article says "plow the field **after every third harvest**" (302)
> - Carrots / parsnips / red beet: "you need to plow the field **after every harvest**" (502, 513, 514)
> - Cotton: "plow when **changing crops** as well as **after every third harvest**" (306)
> - Sugarcane and poplar: "**only after the third harvest**, you need to plow to avoid a yield penalty" (307, 305)
>
> **Authoritative in-game answer: the field info box tells you when plowing is required.**
> Treat that as the source of truth rather than any fixed cadence.

---

## 5. Fertilizing

**Core rule:** fertilize at least once per crop cycle; you can fertilize **twice overall**, and
**there must be a stage of growth between the two applications**. E.g. first application after
sowing, second after the plants begin to sprout. Each application = 50%; two = 100%. (The **100%** ceiling is stated in 290's field-info box; the **50%-per-pass** figure comes from the crop tutorials — 298, 302, 303, 305, 306, 307, 502, 513, 514 — not from the Ground Working articles.)

**Two exceptions:**

1. **Grass** can only be fertilized **once**, not twice.
2. With **manure and slurry** you can activate the **double application rate** — one application reaches full fertilization, but **you must drive at half speed**.

### Fertilizer types and required machinery

| Type | Machine | Source / cost |
|---|---|---|
| **Solid fertilizer** | Fertilizer spreader | Bought in Bigbag Pallets or individual Bigbags. **Cheapest way to start** — a low-tier spreader costs less than a sprayer |
| **Liquid fertilizer** | Sprayer | Bought in tanks in the "pallets" section |
| **Slurry** | Slurry tank on tractor | Produced by **cows and pigs**, stored in an underground tank. Requires **fresh water** |
| **Manure** | Manure spreader | Produced by cows and pigs, appears in the manure pit. Requires **straw bedding in addition to water** |
| **Digestate** | Slurry tanker | **Free byproduct** of selling manure or silage at the biogas plant |
| **Catch crop (oilseed radish)** | Seeder + cultivator | Gives **one stage** of fertilization. Can't be harvested — you cultivate over it when fully grown, then plant your regular crop |

**Cost note from the Academy:** manure, slurry and digestate are the cheapest ways to fertilize,
being byproducts of animal husbandry. Some more expensive fertilizer spreaders can **also apply
lime** — worth paying for, since it saves owning a second machine.

**Tool pairing rule:** spreader for solid, sprayer for liquid.

---

## 6. Liming

- Lime "has to be spread after **every three harvests**" (291). The rice tutorials likewise say **every third harvest** (556, 557).
- The **field information box** tells you when it's time; the **soil composition map filter** shows it too (and also flags when to plow).
- Liming improves plant growth and increases yield. Skipping it means earning "a bit less money."
- **Not all spreaders can spread lime** — check the icon before buying (see icon categories in `game-basics.md`).
- New fields don't need it: "When you just placed your field, you don't need to apply lime" (556).

**Sequencing note:** across the crop tutorials, lime is almost always applied **before**
cultivating, so the cultivator works it into the ground.

---

## 7. Weeds

**Impact:** weeds compete with crops for sunlight, water, nutrients and space. **A weed-free
harvest yields +20%.** Weed growth can be deactivated in game settings.

**Key exemption: after plowing (with a plow), weeds will not grow.**

Weeds can be removed **at any time before the crops are ready to be harvested.**

### Growth stages and the tool for each

| Stage | Appearance | Tool | Notes |
|---|---|---|---|
| **Small** | Green patches, after only a couple of hours of in-game time | **Weeder** (mechanical) | Multiplies quickly; if ignored the field gets infested and harder to clear |
| **Medium** | Visually more diverse, higher density | **Hoe** (also clears small weeds) | Designed to operate **between crops planted in rows** without destroying them |
| **Large** | Higher, blooming flowers, easily distinguishable from crops | **Sprayer + herbicide** | "Your last chance." Only herbicide works on large weeds |

Shop locations: **weeders and hoes are both in the "weeder" category** of the tools section.
Sprayers are in the **sprayer** category; herbicide is in the **pallets** section.

### The row-crop exception — important for planning

**A weeder cannot be used on crops planted in rows** (the Academy names potatoes). For those crops
you must use a **hoe** instead. In the crop tutorials this applies to potatoes, carrots, parsnips
and red beet, all of which specify a hoe rather than a weeder.

### Sprayer economics

Sprayers work on small, medium *and* large weeds, but are the **most expensive option**: herbicide
is an additional expense **and** applying chemicals carries a yield penalty. "Use it only when
necessary." If you need one only once, **rent it**.

**Practical loop:** weeders are cheap and clear stage 1. Speeding up time is safe *until* weeds
start growing — the Academy repeatedly says "you can speed up a bit until the weeds start to grow,"
then to deal with them immediately.

---

## 8. Rolling

Two distinct roller types:

| Type | Shop category | Used when | Effect |
|---|---|---|---|
| **Soil roller** | "Rollers" | **After sowing**, when the field is cultivated and seeds are in the soil | Condenses soil → **+2.5% yield**. Also **presses small stones back into the ground** |
| **Grass roller** | "Grassland care" | **After mowing grass** | Prepares for the next growth cycle and **automatically gains a fertilizing stage** |

⚠️ **Grass roller warning:** "if you roll over matured grass, its growth stage will reset."

**Usage:** attach, unfold, lower to the ground, roll. Note that **some rollers have two connection
points** — one for transport only. After unfolding, a second connection becomes available; you have
to attach from the other side to use it on the field.

**Sequencing:** roll *after* seeding, not before — this way small stones are buried without
damaging the seeder (seeding machines "can manage small stones quite well"; harvesters cannot).

---

## 9. Mulching

**Effect: +2.5% yield bonus on the next harvest.** The Academy explicitly says "It's okay not to
mulch — in case you have too much on your hands." Tools are in the **mulchers** category.

Three distinct mulching applications:

| Application | Crops | Timing |
|---|---|---|
| **Stubble mulching** | Any crop leaving stubble: **wheat, barley, oat, sorghum, sunflowers, soybeans, corn** | After harvesting, **BEFORE you cultivate** |
| **Orchard/vineyard mulching** | Grape vines, olive groves | **AFTER cultivating**, once grass has begun to grow again. Cuts back grass to prevent weed growth and avoid a yield penalty |
| **Forestry mulching** | — | Removes bushes, branches and tree stumps after harvesting wood. Found in **forestry equipment** category |

**Efficiency tip from the Academy:** attach a mulcher on the **front** of the tractor and a
cultivator on the **back** — both steps in one pass.

---

## 10. Field stones

Can be deactivated in game settings. **Three sizes: small, medium, large** — yellow / orange / red
on the map filter, and visually distinguishable on the field.

**What stones do and don't affect:**

- ❌ They do **not** affect soil properties, crops, or the yield you gain from selling.
- ✅ They **only** damage machines. **Seeders, planters and weeders manage stones fine — your harvester takes damage.**
- The larger the stone, the heavier the damage and the repair need.
- **Stones grow if ignored:** "If you don't remove them, they will grow with the following field preparation — in number AND in size!"

**Where they come from:** plowing and cultivating. Size depends on the machine — see the tool table
in section 4. To avoid stones entirely: **shallow cultivator, disc harrow, power harrow, or direct
sowing machine.**

### Two removal methods

| Method | Works on | Speed | Payoff |
|---|---|---|---|
| **Soil rolling** | **Small only** | Quick | **+2.5% yield** from condensing the soil |
| **Stone picking** | **Medium and large** (small too, but not lucrative) | Slower | Deliver to the **rock crusher** to sell — "not much," but the machines are safe |

**Correct sequencing:** use the soil roller **after sowing/planting**, since the seeder/planter
isn't damaged by stones. This gets the yield bonus and the stone protection in a single pass.

⚠️ **Triage rule from the Academy:** "If you're in a hurry, because your crops will soon wither,
you might want to take the chance and harvest them despite the stones. The income will take a hit,
but cover the damages." Harvesting through stones is preferable to letting a crop wither.

---

## 11. Seeding & planting

### Seeders vs. planters — which machine for which crop

| Machine | Crops | Shop category |
|---|---|---|
| **Seeders** | Wheat, barley, oat, canola, sorghum*, soybeans*, oilseed radish, grass | "Seeders" |
| **Planters** | Corn, sugar beet, cotton, sunflowers, soybeans, potatoes, sugar cane, trees & poplar | "Planters" |

Specialist sub-categories:
- Potato planters → **"Potato Technology"**
- Tree & poplar planters → **"Forestry Equipment"**
- Sugar cane planters → **"Sugar Cane Technology"**
- Vegetable planters (carrots, parsnips, red beet) → **"Vegetable Technology"** (from the crop tutorials)

> \* Note: **soybeans appear in BOTH of 317's lists** (seeders and planters), so either machine
> works — no contradiction there. **Sorghum** is the real disagreement: 317 lists it under seeders,
> but the sorghum tutorial (630) calls for a **planter**. Check the crop icon on the machine in-shop.

### The four-step sowing procedure

**Step 1 — Cultivate the field.** Attach, lower into the soil, cultivate. With field stones
enabled, stones may appear; size depends on the cultivator/plow. Small stones are dealt with later
(rolling); **medium or large stones must be collected with a stone collector or machines get
damaged.**

**Step 2 — Buy seeds and fill the seeder/planter.** Position the machine beside the seeds and press
**refill** — seeds load automatically.

Seed packaging and prices:

| Package | Price | Contents |
|---|---|---|
| Bigbag Pallets | **$900** | ~1000–1050 l |
| Bigbags | **$800** | ~1000–1050 l |
| Pallets | **$950** | ~1000–1050 l |

All contain roughly the same amount; bigbag pallets and pallets are easier to handle in storage.
**Some seeders' capacity can be extended with an additional tank**, found in the "seeders" category.
The **"Packs"** section of the dealership bundles what you need per crop without browsing categories.
**A bigbag pallet contains seeds for all crops — except poplar, sugar cane and tree saplings,**
which are found in "pallets" for use with a planter.

**Harvested potatoes can be used to refill the potato planter** instead of buying seeds.

**Step 3 — Sow.** Select the crop first — it displays in the control box (top left) and bottom
right, left of the speedometer. Lower the seeder, turn it on, sow in straight lines until the field
is covered.

⚠️ With seasonal growth enabled, **you cannot sow a crop outside its planting season.** See the
crop calendar in `crops-101.md`.

**Step 4 — Soil roll (optional).** +2.5% yield, and buries small stones so they don't damage the
harvester later.

### Time-acceleration warning

Repeated across many crop tutorials: **"Don't speed up the time while sowing, or the crops will
grow unevenly."** Speeding up is safe *between* operations, not *during* seeding.

### Crop destruction

If playing with crop destruction enabled, use a tractor with **narrow tires** once the crop starts
to sprout — otherwise a lot of plants get destroyed on subsequent passes (weeding, second
fertilizing).

---

## Canonical field cycle (assembled from all nine articles)

For a standard non-root crop:

1. **Lime** — if the field info box says so (roughly every 3rd harvest). Apply before cultivating.
2. **Mulch** — if the previous crop left stubble. Before cultivating. (+2.5%)
3. **Plow or cultivate** — plow if the info box demands it or the previous crop was a root crop; otherwise cultivate. Plowing also suppresses weeds for the cycle.
4. **Stone check** — collect medium/large stones with a stone picker now.
5. **Sow / plant** — correct machine for the crop; don't accelerate time.
6. **Soil roll** — optional. (+2.5%, buries small stones)
7. **Fertilize (1st)** — 50%.
8. **Weed** — as soon as the info box flags weeds; weeder while small, hoe for row crops. (+20% if clean at harvest)
9. **Fertilize (2nd)** — after a growth stage has passed. 100%.
10. **Harvest** — before withering; check the weather forecast, since rain blocks harvesting.
11. **Post-harvest** — plow if it was a root crop; mulch stubble before the next cultivation.

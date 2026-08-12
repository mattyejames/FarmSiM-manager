# Farming Simulator — Forestry 101

> **Offline reference for Claude Code.** Compiled from the 11 tutorials in the "Forestry 101"
> section of the official Farming Simulator Academy
> (https://www.farming-simulator.com/newsArticle.php?news_id=280).
> Facts are drawn from those articles; derived conclusions are flagged as such.

## Source provenance

| # | Topic | Article | DLC-gated? |
|---|---|---|---|
| 1 | Introduction to Forestry & Tree Types | news_id=367 | Base |
| 2 | Planting Trees | news_id=376 | Base |
| 3 | Felling Trees: Deciduous | news_id=377 | Base |
| 4 | Felling Trees: Conifers | news_id=409 | Base |
| 5 | Transporting Logs & Woodchips | news_id=378 | Partly — containers |
| 6 | Forestry Mulching / Tree Stumps | news_id=379 | Base |
| 7 | How to Produce Wood Chips | news_id=414 | Base |
| 8 | Tree Markers & Symbols | news_id=423 | ⚠️ **Platinum Expansion** |
| 9 | Breaking Rocks (Hydraulic Breaker) | news_id=424 | ⚠️ **Platinum Expansion** |
| 10 | Winches | news_id=433 | ⚠️ **Platinum Expansion** |
| 11 | Yarders | news_id=434 | ⚠️ **Platinum Expansion** |

URL pattern: `https://www.farming-simulator.com/newsArticle.php?&news_id=<id>`

> ⚠️ **This is the most FS22-anchored section of the Academy.** Every dated page shows
> **2021-11-18**, and five articles (378 containers, 423, 424, 433, 434) explicitly require the
> **Platinum Expansion for Farming Simulator 22**, set in **Silverrun Forest**. The core loop
> (plant → fell → process → sell) carries over to FS25, but **the 12-species list, the 2–24 day
> growth range, and every named machine should be re-verified against FS25.** There is no FS25
> equivalent of the Platinum forestry map in this documentation.

---

## 1. THE CORE LOOP

```
plant saplings ──> wait 2-24 days ──> fell ──> de-branch ──> process ──> transport ──> sell
                                                     │
                                                     └──> mulch the stump ──> replant
```

⭐ **The single most important planning fact: forestry needs NO soil preparation.** "Trees can be
planted on any soil type — no cultivating, plowing, fertilizer or pesticide needed." Unlike every
crop in `crops-101.md`, there is no lime cycle, no fertiliser pass, no weeding, no field stones.
That makes forestry low-labour but capital- and time-intensive.

---

## 2. TREE SPECIES — THE DECISION TABLE

⭐ **12 species in two categories.** The category determines both **how you fell it** and **what you
sell it as**.

### Conifers (4)

| Species | Felling method | Best product |
|---|---|---|
| **Spruce** | ⭐ **Harvester machine** *(or chainsaw)* | Timber / logs |
| **Pine** | ⭐ **Harvester machine** *(or chainsaw)* | Timber / logs |
| **Stone Pine** | Chainsaw only | Timber / logs |
| **Cypress** | Chainsaw only | Timber / logs |

### Deciduous (8) — all chainsaw only

**Birch · Oak · Willow · Maple · Pagoda Dogwood · Shagbark Hickory · American Elm ·
Downy Serviceberry**

### The rule that follows

| Category | Shape | Sell as |
|---|---|---|
| **Conifers** | Small branches, long straight trunks | ⭐ **Timber (logs)** |
| **Deciduous** | Crooked, many thick branches | ⭐ **Wood chips** |

Stated conclusion: **"conifers for timber, deciduous for wood chips."** Oak is the cited example —
thick trunk, but not straight, with very large branches, so log sale is inefficient.

⭐ **Only spruce and pine can be machine-harvested.** That is the crucial economic split: a
**Komatsu 931XC**-class harvester only pays off if you're growing spruce or pine. Everything else —
including the other two conifers — is chainsaw work.

### Yield factors

- **Longer and thicker trunk = higher yield.**
- ⭐ **Trees with many branches produce LESS yield unless the branches are cut off first.**
- Branches can be fed into **wood chip production** rather than wasted.
- Trunk thickness, trunk length and branch count all vary by species and directly determine sale value.

### Growth

⭐ **Growth duration ranges from 2 to 24 in-game days**, varying by species. (The article references
a per-species growth table that isn't reproduced in the page text.)

> ⚠️ Build-mode **landscaping trees are decorative only** — not forestry trees. Taller decorative
> trees cost more. Explicitly "not recommended for actual forestry."

---

## 3. PLANTING

**Equipment:** tractor · **tree planter** (dealership → "forestry equipment") · **tree saplings**
(shop → "pallets"). Optionally a front loader attacher + pallet fork to move sapling pallets.

⚠️ **Sapling species is locked at purchase and cannot be changed** — unlike crop seed bigbags, which
contain every crop. Planting a different species means buying a new matching pallet.

⭐ **Identify a real tree planter by the tree symbol on its shop page.** Check its power requirement
against your tractor.

**Steps:**

1. **Fill** — attach the planter, park it next to the saplings, press the fill button shown in the control info box (upper left).
2. **Plant** — position on your property, lower, turn on, and drive carefully in a **preferably straight line**. The planter plants saplings automatically one after another. Refill when empty.
3. **Wait** for growth.

**Recommended kit (FS22-era):** John Deere 7810 · **AGCO 1500** weight · **Damcon PL-75** tree
planter · Hauer XB 190 front loader · albutt pallet fork.

> Note: the Damcon PL-75 is the same planter recommended for **poplar** in `crops-101.md` §6.5 —
> poplar is handled as a crop, not as forestry, but uses forestry equipment.

---

## 4. FELLING

> ⚠️ **Clarification:** article 409 says "**conifers can be cut with chainsaws OR a harvesting
> machine**." The harvester is exclusive to spruce and pine, but those two are not *restricted* to
> it — a chainsaw works on any species. Stone pine and cypress are chainsaw-only.

### Chainsaw method (all deciduous; also usable on any conifer)

1. **Cut** — stand in front of the tree, turn the saw in the desired direction. ⭐ **A green glowing ring indicates you're ready to cut.** Press the cut button.
   ⭐ **The tree always falls in the direction you are sawing** — this is your only directional control.
2. **De-branch** — angle the chainsaw and cut branches **as close to the trunk as possible**, repeating until the trunk is completely clear.
3. **Buck** — cut the trunk and any large branches into smaller pieces sized for the chipper or your trailer.

### Harvester method (spruce and pine only)

1. **Fell** — enter the vehicle, ⭐ **select the desired trunk length BEFORE felling**, drive to the tree, turn the machine on, position the crane header **as far down as possible**, press cut.
2. **Buck** — the felled trunk stays in the header's grip. Check the chosen length and press cut again.

⭐ **Set the cut length to match your transport.** Stated twice: "the length should roughly fit the
trailer that will transport the logs," and for containers, match the container size (§6). Getting
this wrong is the most expensive mistake in forestry — logs too long won't fit, too short and "you
lose money and waste space."

**Recommended kit:** deciduous — CLAAS Axion 800 + **Heizomat HM 8-400 KLC** chipper.
Conifers — **Komatsu 931XC** harvester; chainsaw of any brand.

---

## 5. WOOD CHIPS

**Machine categories:** wood chipper (tractor-attached) · self-propelled wood chipper · front
loader with shovel (for handling loose chips).

**Recommended kit:** CLAAS Axion 800 · **Heizomat HM 8-400 KLC** chipper · **CLAAS CARAT 140TD**
trailer (with extension) — from 414.
⭐ **Article 378 gives a second chip-hauling recommendation: John Deere 7810 + Rudolph TDK 301 RP
trailer.** Either works; the TDK 301 RP is the one paired with the height warning below.

**Process:**

1. Fell trees, cut into smaller pieces, connect the chipper, gather the logs.
2. **Unfold and switch on** the chipper. Use the crane: position above a wood piece, lower, close the gripper, lift, steer the crane head over the **funnel-shaped conveyor belt**, lower and open the gripper. The wood is drawn in automatically and shredded.
3. **Overload to a trailer** — ⭐ **discharge is on the chipper's LEFT side.** Position the trailer there and activate the overload function.
4. Check the price overview, drive to the best selling point.

⚠️ **Trailer height matters:** "if the trailer is taller than the chipper, overloading will not
work." Check the chipper's height before buying a trailer.

---

## 6. TRANSPORT AND SELLING

### Where each product sells

| Product | Selling points |
|---|---|
| **Wood chips** | ⭐ **Farmer's Market, Biogas Plant** |
| **Logs / timber** | ⭐ **Carpentry, Sawmill, Biogas Plant** |
| **Stones** (from rock breaking) | Stone crusher |

### Logs by trailer

**Kit:** John Deere 7810 · **Anderson Group M160** log loader.

1. **Load** — connect the loader, park **parallel** to the cut logs, raise the crane over the log's **centre**, open the claw, grab, close, lift, move over the loading area. ⭐ Keep each log **as straight as possible and close to the driver's cab.**
2. **Secure with tension belts** — press the respective button, or exit the vehicle and secure manually.
3. Check the price tab, drive, unload.

⚠️ **Match the loader to your log length, or cut logs to suit the loader** — "otherwise transport is
tricky and unsafe."

### Logs by container — ⚠️ Platinum Expansion (FS22)

Requires the Platinum Edition or the Platinum Expansion on top of the base game.

**Kit:** Volvo F16 Globetrotter truck · Schwarzmüller Low Loader 3A · Volvo EC250DL + Grapple
excavator · Volvo L180H + Palletfork wheel loader · Lizard containers.

⭐ **Container sizes and the length-matching rule:**

| Container | Length |
|---|---|
| Large | **12 m / 40 ft** |
| Medium | **9 m / 30 ft** |
| Small | **6 m / 20 ft** |

⭐ **Set the harvester cutting length to match the container.** "Longer logs are more profitable;
log length should be as close to container length as possible — too long and they won't fit, too
short and you lose money and waste space."

**Steps:** choose container size → set harvester cut length → load logs one by one with the
excavator into the container's open side → ⭐ **extend the truck bed** with the designated button to
fit longer containers → lift the container **like a pallet** with a powerful wheel loader and
pallet fork onto the truck or train.

Containers can go to selling points, production plants, or **construction sites** — the rollercoaster
in Silverrun Forest is the cited example.

---

## 7. STUMP REMOVAL

⚠️ **Stumps remain after felling and must be removed before replanting** or using the land for
anything else.

**Kit:** John Deere 7810 · **John Deere PickUp 9000** weight · **TMC CANCELA TFK 200** mulcher.

1. Attach the mulcher, drive to the stump.
2. Lower, turn on, drive over the stump. ⭐ **If the stump is too high, adjust the mulcher height.**

Cross-reference `ground-working-101.md` §9: the **forestry mulcher** is one of the three mulcher
types, and is distinct from the field and orchard mulchers.

---

## 8. PLATINUM EXPANSION TOOLS (FS22)

Four articles cover content that requires the **Platinum Expansion**. Included for completeness —
**none of this is base-game**, and FS25 availability is unconfirmed by these sources.

### Tree marking sprays (423)

**STIHL** spray cans in several colours, from the **"tools"** section. Equipped and handled **like a
chainsaw**; switched with the assigned keys or the mouse wheel.

⭐ **Symbol legend:**

| Symbol | Meaning |
|---|---|
| **Two horizontal parallel lines** | Logging trail |
| **Backslash** | Remove this tree |
| **Circle** | ⭐ **Support tree — do NOT chop** |
| **Horizontal line with a downward arrow** | Saw off at this height |
| **Exclamation mark** | Deadwood, to be removed |
| **X** | Marked for removal (meaning varies) |

Useful for **coordinating in multiplayer** and for **deadwood missions**. The article notes
real-world marking conventions vary internationally, and that colours typically indicate what
happens to a tree after felling.

### Winches (433)

⭐ **Capacity: up to 10 logs dragged simultaneously by rope; 2 logs carried directly on the
implement (one left, one right).**

Tractor-mounted attachments (check the power requirement), or specialised multipurpose machines —
the **Pfanzelt Pm Trac** multipurpose tractor with gripper arm is named.

**Steps:** attach the winch → grab a rope from the back of the implement and attach it to the logs →
carefully drag to the collection point → move onward by trailer or container.

### Yarders (434)

For moving logs across terrain a winch can't reach.

| Model | Max cable span | Direction | Power |
|---|---|---|---|
| **Koller K-300-T** | ⭐ **500 m / 1,650 ft** | ⭐ **Uphill only** | Lower requirement |
| **Koller K 307c-H** | ⭐ **840 m / 2,750 ft** | ⭐ **Uphill and downhill** | Higher requirement |

**Steps:** attach the yarder and position at the collection point → grab the rope from the back →
⭐ **attach the second end to a sturdy tree** → activate the carriage system → attach a cut log to
the carriage → transport to the collection point → load onto trailer or into containers.

**Choosing between them:** the K-300-T is cheaper to run but **uphill-only** — if your terrain
requires bringing logs *down* a slope, only the K 307c-H will do it.

### Hydraulic breaker — rocks (424)

⭐ **Flag colours:** **red flags = rocks that are part of a contract. White flags = optional rocks.**

**Kit:** New Holland L318 skid-steer (or New Holland C332) + **Paladin SFB 750** hydraulic breaker ·
Volvo-BM LM 841 wheel loader with shovel · John Deere 7810 + Krampe Halfpipe HP 20 trailer.

**Steps:** attach the breaker → drive to the marked rock, activate/unfold → drive the loader arm
into the rock until it breaks into pebbles → load with the wheel loader shovel → ⭐ **sell at the
stone crusher.**

> Cross-reference: the stone crusher is the same selling point as field stones in
> `ground-working-101.md` §10.

---

## 9. PLANNING SUMMARY

- **Species choice is an equipment decision, not an aesthetic one.** Only **spruce and pine** justify a harvester. Everything else is chainsaw work, so a harvester purchase should follow a decision to grow spruce/pine at scale.
- **Deciduous → chips, conifers → logs.** Selling a crooked oak as timber wastes its value.
- **De-branch before selling.** Branch-heavy trees yield less unless cleared, and the branches themselves feed the chipper.
- **Set cut length before felling**, matched to your trailer or container. It cannot be fixed afterwards without re-cutting.
- **No soil prep, no fertiliser, no weeds, no lime** — forestry has none of the arable overheads. The costs are capital (machines) and time (2–24 days growth).
- **Mulch stumps** or the land is unusable for replanting.
- **Chips have two buyers (Farmer's Market, Biogas), logs have three (Carpentry, Sawmill, Biogas).** Biogas takes both — useful as a fallback when prices are poor elsewhere.
- **Everything in §8 is Platinum Expansion content** and should not be assumed available.

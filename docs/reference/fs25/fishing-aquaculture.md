# Farming Simulator — Fishing & Aquaculture

> **Offline reference for Claude Code.** Compiled from the 2 tutorials in the
> "Fishing & Aquaculture" section of the official Farming Simulator Academy
> (https://www.farming-simulator.com/newsArticle.php?news_id=280).
> Facts are drawn from those articles; cross-references to other files are marked.

## Source provenance

| Topic | Article | Published | Version |
|---|---|---|---|
| How To Fish | news_id=653 | 2025-11-04 | **FS25 — Highlands Fishing** |
| Salmon & Trouts: Housing, Feeding & Breeding | news_id=654 | 2025-11-04 | **FS25 — Highlands Fishing** |

URL pattern: `https://www.farming-simulator.com/newsArticle.php?&news_id=<id>`

⭐ **These are the newest and most reliably FS25-current articles in the entire Academy.** Both are
tagged **[Highlands Fishing]** in their on-page titles — this is **DLC content**, part of the
Highlands Fishing Expansion, not base-game FS25. See `dlc/` for the expansion write-up.

> ⚠️ **No numbers published.** Neither article gives capacities, feed amounts, breeding times,
> prices or water values. Everything below is procedural.

**Related DLC content in other files:** the **onions** tutorial (`crops-101.md` §6.3) and the
**highland cattle** tutorial (`animals-101.md`) are both also tagged [Highlands Fishing] — the same
expansion adds a crop, an animal, and this entire fishing system.

---

## 1. TWO SEPARATE ACTIVITIES

The section covers two things that share a theme but almost no mechanics:

| | **Rod fishing** (653) | **Aquaculture** (654) |
|---|---|---|
| Nature | Minigame, catch-by-hand | Production chain |
| Capital | A fishing rod from hand tools | Breeding facility, lake/aquaculture, feed factory, vessel |
| Output | Individual fish — release or sell | Farmed salmon and trout at volume |
| Scale | Incidental income | A full farming operation |

Rod fishing is described as an activity you can do anywhere there's water. Aquaculture is a
multi-stage production business.

---

## 2. ROD FISHING

**Equipment:** a **fishing rod**, bought from the ⭐ **hand tools** section of the dealership.
A **sport boat** is used for fishing at sea.

**Location:** any body of water works. ⭐ Undiscovered **hotspots** are **spread across the map**
and provide bonus fishing opportunities. Kinlaig is named as the map/town where fishing takes
place; the article does not say hotspots cluster there.

### The six steps

1. **Find a place to fish** — any body of water.
2. **Switch to the fishing rod** using the designated button.
3. **Cast the line** in the desired direction. ⭐ **Holding the button longer casts further.**
4. **Wait** until the first fish bites the bait.
5. **Catch** — when the indicator appears, press the action button **at the right moment**.
6. **Reel in** — ⭐ **hold the hook parallel to the fish until the left bar fills completely.**

Then either **release** the fish or **sell** it.

### Tips as stated

| Factor | Effect |
|---|---|
| **Shallow water** | ⭐ **Increases** the waiting time for a bite |
| **Season** | Affects how quickly fish bite |
| **Longer casts** | ⭐ Result in **faster** bites |

**Reading this as a planner:** the two controllable variables both point the same way — cast far,
into deep water. Shallow water and short casts are both slower. Season is the one factor you can't
control, only schedule around.

---

## 3. AQUACULTURE — SPECIES AND WHERE THEY LIVE

⭐ **The distinction that governs everything:**

| Species | Offshore aquaculture | Fish lake |
|---|---|---|
| **Salmon** | ✅ **Only here** | ❌ |
| **Trout** | ✅ | ✅ |

**Salmon are offshore-exclusive.** If you want to farm salmon you must commit to the offshore
setup — which brings in the cargo vessel and its crane. **Trout can be farmed inland in a fish
lake**, a substantially simpler operation.

⭐ **Planning consequence: start with trout in a fish lake.** It exercises the same feed chain and
breeding loop without needing a vessel, a harbour, or crane handling. Move to salmon once the feed
factory is paying for itself.

Young fish of both species come from a **young fish breeding facility**.

---

## 4. FISH FEED — A PRODUCTION CHAIN OF ITS OWN

⭐ **Fish feed = flour + soybeans + oil.**

The oil is flexible: ⭐ **olive, canola, rice or sunflower oil are all accepted.**

This ties aquaculture directly into arable farming. Cross-referencing `crops-101.md` §3:

| Feed input | Comes from |
|---|---|
| **Flour** | Wheat, barley, sorghum or oat → mill |
| **Soybeans** | Grown directly (plant Apr–May, harvest Oct–Nov) |
| **Oil** | Canola or sunflowers → oil mill; olives → oil mill; rice |

⭐ **A grain-and-oilseed farm already produces every input for fish feed.** Wheat → flour, canola →
oil, soybeans direct. That makes aquaculture a natural downstream extension of an existing arable
operation rather than a separate business.

### How to make it

1. Buy the production facility in **Kinlaig**, **or** place a **fish food factory** on land you own.
2. Deliver **flour, soybeans and oil** to it.
3. **Activate production** via the production chain menu.
4. **Transport** the finished feed by truck to the breeding locations.

---

## 5. THE BREEDING LOOP

**What you need:** forklift · truck · trailer · fish feed · a plot of land · **young fish breeding
facility** · **fish lake or offshore aquaculture** · *(optional)* cargo vessel · *(optional)* fish
food factory.

**Four steps:**

1. **Place the young fish breeding facility**, deliver feed, **activate breeding**.
2. **Transport the young fish** to the fish lake or offshore aquaculture.
3. **Load the trailer** with the grown fish.
4. **Sell** at the designated point of sale.

The two optional items are the two ways to reduce cost: the **fish food factory** removes ongoing
feed purchases, and the **cargo vessel** is only needed for offshore work.

---

## 6. THE CARGO VESSEL CRANE

Needed only for offshore aquaculture. Ten steps, the fiddliest procedure in the section:

1. **Buy the cargo vessel** at the boat store in the **harbor**.
2. **Board** the vessel, or switch to it via vehicle rotation.
3. Drive to the **harbor pier** and **lower the loading ramp**.
4. Use a **forklift** to load pallets into the designated areas.
5. ⭐ **Tighten the safety straps.**
6. **Navigate** to the destination.
7. **Extend the crane** and switch to the crane controls.
8. ⭐ **Position the crane over the pallet until the green safety straps appear.**
9. **Connect** and relocate the pallet.
10. Press the button to **release** the cargo.

⭐ **The green straps are the confirmation signal** — the same pattern as the grape/olive
harvesters' centring check in `crops-101.md`. Don't attempt the connect until they show.

---

## 7. PLANNING SUMMARY

- **Rod fishing** is incidental income with near-zero setup — a rod from hand tools. Worth doing opportunistically; not a business.
- **Trout in a fish lake** is the sensible entry to aquaculture: no vessel, no harbour, no crane.
- **Salmon force the offshore path**, and with it the cargo vessel and crane handling.
- **Build the fish food factory rather than buying feed** if you already grow grain and an oilseed — you own every input already.
- **The Highlands Fishing expansion is a three-part addition**: this fishing/aquaculture system, the **onions** crop, and **highland cattle**. Planning around the DLC means treating all three together — see `crops-101.md`, `animals-101.md`, and the DLC file.

---

## 8. WHAT THE ACADEMY DOESN'T TELL YOU

Flagged so Claude Code doesn't assert numbers that aren't sourced:

- No **capacities** for the breeding facility, fish lake or offshore aquaculture
- No **feed consumption rates** or amounts
- No **breeding or growth times**
- No **prices** for any building, the vessel, or the fish themselves
- No **water quality / temperature** mechanics mentioned
- No statement of whether fish have a **health or productivity percentage** like land animals

These would need to come from in-game observation or a secondary source.

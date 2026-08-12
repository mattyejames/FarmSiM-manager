# Farming Simulator — Animals 101

> **Offline reference for Claude Code.** Compiled from the 8 tutorials in the "Animals 101"
> section of the official Farming Simulator Academy
> (https://www.farming-simulator.com/newsArticle.php?news_id=280).
> Every fact below is drawn from those articles; the few inferences are labelled as such.
> Where the Academy gives no figure, this file says "not stated" rather than guessing.

## Source provenance

| Animal | Article | Published | Vintage |
|---|---|---|---|
| Cows | news_id=336 | 2021-11-18 | FS22-era |
| Sheep | news_id=337 | 2021-11-18 | FS22-era |
| Chickens | news_id=338 | 2021-11-18 | FS22-era, edited (lists sorghum) |
| Horses | news_id=339 | 2021-11-18 | FS22-era, edited (lists sorghum) |
| Pigs | news_id=340 | 2021-11-18 | FS22-era, edited (lists sorghum, canola) |
| Beekeeping | news_id=341 | 2021-11-18 | FS22-era |
| Goats | news_id=585 | 2025-01-01 | **FS25** |
| Highland Cattle | news_id=649 | 2025-11-04 | **FS25** (Highlands Fishing) |

URL pattern: `https://www.farming-simulator.com/newsArticle.php?&news_id=<id>`

**Version note:** publication dates come from page metadata, not from the article bodies — they
are not reproducible from the quoted text. The six 2021 articles appear to have been **edited in
place** for FS25: chickens, pigs and horses all list **sorghum**, and pigs use "canola" alongside
the legacy "rape". *(That sorghum indicates FS25 is an inference from the crop lists in
`crops-101.md`, not a statement in these articles.)* Treat the 2021 dates as first-publish rather
than content vintage. The **cow** article still reads
FS22-era (three housing options, no sorghum) while the **highland cattle** article describes four —
see the contradiction flagged in §3.

---

## 1. MASTER ANIMAL TABLE

The single most useful comparison. All figures as stated in the source.

| Animal | Breeding age | Feed for 100% | Water needed? | Straw needed? | Primary output |
|---|---|---|---|---|---|
| **Chickens** | **6 months** | Wheat, barley or sorghum — **or ready-made chicken feed** | **No — never** | No | Eggs |
| **Pigs** | **6 months** | 4-group mix (see §5) | Pasture only | Yes, for manure | Pigs, manure, slurry |
| **Sheep** | **8 months** | Grass **or** hay | Pasture only | No | Wool |
| **Goats** | **8 months** | Grass **or** hay | Pasture only | No | Milk |
| **Cows** | **18 months** | TMR | Pasture only | Yes, for manure | Milk, manure, slurry |
| **Highland cattle** | **18 months** | Grass / hay / silage / TMR | Pasture only | Yes, for manure | Breeding stock, manure, slurry |
| **Horses** | **22 months** | Base ingredient **+** hay | Pasture only | **Yes** | Trained horses |
| **Bees** | n/a — hives come populated | Nothing | No | No | Honey + field yield bonus |

### Breeding — the universal rule

Stated identically in **seven of the eight** articles (all except bees, which come pre-populated
and have no breeding rule). Reproduction depends on exactly three factors:

1. **Age** — the animal must be mature (see table above)
2. **Space** — there must be room for more animals in the barn
3. **Health at 100%** — achieved by feeding regularly

⭐ **Consequence for planning: never fill a barn to its limit.** Stated in six of the eight
articles (336, 337, 338, 340, 585, 649 — not in the horse or bee articles) — it saves money at
purchase *and* leaves room for offspring. A full barn cannot breed.

### Difficulty ranking, per the Academy

- **Easiest:** chickens ("Chicken are pretty easy to care for, so they are a good choice if you just get into animal husbandry"), sheep
- **Cheap milk alternative:** goats — "a cheaper and easier alternative to cows"
- **Most time-consuming to feed:** pigs — "you need to feed them a variety of crops you need to grow yourself"
- **Most complex:** cows — "the most complex type of animal to care for. At the very beginning of animal husbandry, you might want to start with chicken or sheep"
- **For experienced players:** highland cattle — "like cows, highland cattle require a lot of equipment"

⭐ **Chicken feed has FOUR options, not three** (338): wheat, barley, sorghum, **or a ready-made
"chicken feed" Bigbag from the dealership — "it's basically just wheat."** The Academy suggests
starting with the bought feed and aligning your crops later if you don't already grow the grains.

---

## 2. FEED PRODUCTIVITY — the numbers that matter

Only three animals have graded productivity. The rest are binary (fed = 100%).

### Cows

| Feed | Productivity |
|---|---|
| **TMR** (straw + hay + silage + mineral feed) | **100%** |
| Hay only | **80%** |
| Grass only | **40%** |

### Horses

| Feed | Productivity |
|---|---|
| **Base ingredient + hay** | **100%** |
| Base ingredient only (oat, sorghum, or oat bigbag) | **60%** |
| Hay only | **40%** |

⭐ Horses do **not** need a mixer wagon — deliver the two components to the stable **separately**.

### Sheep and goats — no penalty either way

"You can feed them grass or hay. Which one you choose, doesn't really matter. You can get them to
100% productivity with both." This makes sheep and goats the cheapest animals to run at full
output: fresh-cut grass costs nothing beyond mowing.

⭐ **Highland cattle — the stated consequence of neglect** (649, the only article to state one):
**"You don't need to worry if you don't feed your animals. They just stop breeding."**

### Highland cattle — the meadow discount

⭐ **"With the meadow that you can plant in the fence, you get up to 40% of your feeding done."**
The remaining 60% comes from grass, hay, silage or TMR. No exact TMR ratio is given for highland
cattle — the article says to watch the mixer wagon's info box.

---

## 3. HOUSING

General pattern:

⚠️ **Manure and slurry are only stated for cows (336), pigs (340) and highland cattle (649).** The
sheep, goat, horse and chicken articles say nothing about their barns producing either — do not
assume the manure column below applies to those four species.


| Housing | You provide | Produces |
|---|---|---|
| **Pasture** | Feed **and water** | Main product only — **no manure, no slurry** |
| **Barn** | Feed only | Main product + manure (with straw) + slurry |
| **Large barn** | Feed only | Same, more capacity |
| **Barn with feeding robot** (cows/cattle) | Ingredients only — robot mixes | Same, and saves buying a mixer wagon |

**The Academy recommends a barn over a pasture in most articles** — explicitly for cows (336),
sheep (337), horses (339), goats (585) and pigs (340). It does *not* for chickens (338: "whether
you start with the pasture or the coop depends on how many chickens you want to keep") or for
highland cattle (649, which lists the options neutrally). Reasons given: you skip buying a water
tank, you skip the chore of filling the trough, and pastures produce no manure or slurry.

### Per-species housing detail

| Species | Options | Notes |
|---|---|---|
| **Chickens** | Pasture or coop | ⭐ **Pasture caps at 30 chickens.** Coop for larger egg operations |
| **Sheep** | Pasture, barn, large barn | Wool is produced in **all three** |
| **Goats** | Pasture, barn(s), large barn | ⭐ **Kept in the same buildings as sheep — look under the "Sheep" tab.** Milk in all options |
| **Pigs** | Pig pasture, pigsty, large pigsty | ⭐ **Pigsties have water built in.** Pasture produces no slurry/manure |
| **Horses** | Pasture, barn, large barn | |
| **Cows** | Pasture, barn, large barn, barn with feeding robot | Pasture produces milk only |
| **Highland cattle** | Cow pasture, cow barn, cow barn large, cow barn with feeding robot | ⭐ **To keep dairy cows and highland cattle in one barn you need a dairy barn** |

> ⚠️ **Source disagreement on cow housing count.** Article 336 says "There are three options:
> pastures, barns and barns including a feeding robot," then its equipment list names **four**
> (pasture, barn, large barn, barn with feeding robot). Article 649 (FS25) lists four. The
> four-option list is the one to trust; the "three" is a stale sentence in the older article.

### Water

Stated identically in every article that needs it: deliver with a **tank trailer**. Fill either
from a **water tank** bought in the "container" tab of the construction menu, or **reverse the
tanker into a river or lake**.

⭐ **Lake and river water is free. Tapping a tank container is not.** If you run pastures, siting
them near water is a permanent saving.

---

## 4. OUTPUTS AND PROCESSING CHAINS

| Animal | Raw output | Sells to | Processes into |
|---|---|---|---|
| **Chickens** | Eggs | Bakery, restaurant, farmers market | **Cake** at the bakery |
| **Sheep** | Wool | Spinning mill, Farmer's Market | Wool → **cloth** (spinning mill) → **clothes** (tailor) |
| **Goats** | Milk | — | **Bottled milk, butter, goat cheese**; butter → **strawberry cake** at the bakery |
| **Cows** | Milk, manure, slurry | "A production plant"; biogas plant for manure/slurry | Milk → **cheese, chocolate** (cheese factory, chocolatier, bakery) |
| **Pigs** | Pigs, manure, slurry | Direct sale at barn | — |
| **Highland cattle** | Animals, manure, slurry | — | — (breeding only, **no milk**) |
| **Horses** | Trained horses | Stable or livestock dealer | — |
| **Bees** | Honey | Fast Food Restaurant, Farmers Market, Cereal Factory | Honey → **cereal** at your own cereal factory |

⭐ **The recurring profit advice:** don't sell the raw product. Sheep wool → cloth → clothes is a
three-stage chain "sold for a much higher profit." For cows, the Academy says to "pay the cheese
factory, chocolatier or the bakery a visit. If you provide them with all the necessary ingredients
for products like chocolate, including the milk, you can make even more money compared to just
selling the milk."

### Manure and slurry — the free-fertiliser loop

Both are produced only in **barns**, not pastures, and manure requires **straw bedding**. Either
spread on your fields or sell to the **biogas plant**. Explicitly framed as a way to "save money on
fertilizer." Cross-reference `ground-working-101.md` §5 — manure, slurry and digestate are the
cheapest fertilisers in the game.

Required infrastructure: a **manure heap** (Buildings tab → Silo / Silo Extensions) and a **liquid
manure tank**. Barns have a small slurry tank built in; buy an extension if you keep many animals.

---

## 5. PIGS — the feed mix

Pigs are the only animal needing a multi-crop ration, and the only one where the game mixes it
**automatically** (no mixer wagon — that's cows only).

| Group | Accepted crops |
|---|---|
| **Base** | Corn and/or **sorghum** |
| **Grains** | Wheat and/or barley |
| **Protein** | Soybeans, canola and/or sunflowers |
| **Root crops** | Potatoes and/or sugar beet |

⭐ **Stated optimum mix:**

| Share | Crop |
|---|---|
| **50%** | Maize or sorghum |
| **25%** | Wheat or barley |
| **20%** | Soya beans, rape or sunflowers |
| **5%** | Potatoes or sugar beet |

"You simply unload the necessary fodder at the barn, and it mixes the fodder in the right
combination automatically."

**Academy's recommendation:** start with **premade pig food** from the dealership. "This saves you
having to farm the different components of the feed. The cultivation of maize, sunflowers, potatoes
and sugar beet also requires special and expensive equipment." Grow your own over time — cheaper
in the long run.

---

## 6. COWS — TMR and the feeding robot

TMR = **straw + hay + silage + mineral feed**. All four buyable at the dealership: straw, hay and
silage bales under "objects" → "bales"; mineral feed in the "pallets" section.

⭐ **The one published mixing ratio in the entire Academy** — for the **Kuhn RA 142** mixer wagon:

| Ingredient | Amount |
|---|---|
| Hay | **4,000 litres** |
| Silage | **4,000 litres** |
| Mineral feed | **450 litres** |
| Straw | **fill until full** |

Loading method: grab bales/pallets with a **front loader and bale spike** and dip them into the
machine — the wagon fills in litres. See `animals-102.md` for the general TMR workflow.

⭐ **Buy the barn with the feeding robot.** The Academy's explicit reasoning: "It's the most
expensive barn, but you save the purchase costs for a mixer wagon as well as barrel — and therefore
don't need to fill up the drinking trough." You deliver the four raw ingredients and the robot
mixes and feeds automatically. It also adds: "You can take out a loan."

### Cosmetic-only breed choices

| Species | Breeds / variants | Difference |
|---|---|---|
| **Sheep** (337) | Landrace of Bentheim, Steinschaf, Swiss Black-Brown Mountain, Black Welsh Mountain | ⭐ **Appearance only** |
| **Pigs** (340) | German Landrace, Bentheim Black Pied, Berkshire | ⭐ **Appearance only** |
| **Horses** (339) | 8 colours — see §7 | ⭐ **Appearance only** |
| ⚠️ **Cows** (336) | See below | ⚠️ **NOT cosmetic — breed determines milk vs breeding** |

### Cow breeds

| Breed | Purpose |
|---|---|
| Brown-Swiss, Holstein | **Dairy** |
| Angus, Limousin | **Breeding only** — sell for profit, no milk |

Purchase ages: very young, **12 months**, or **18 months**. Only 18-month animals can breed
immediately.

---

## 7. HORSES — the only animal with daily upkeep

Horses are unique: feeding alone is not enough.

⭐ **Two mandatory recurring chores:**

1. **Brushing** — "brush your mounts regularly to maintain their health." Look at the horse, a brush symbol appears, press the interact button.
2. **Riding** — ⭐ **"Ride each horse 100% every day. This is the only way to increase their physical condition and thus their value when you sell them."** Riding progress shows in the top corner while mounted.

This makes horses a **time-cost** animal rather than a capital-cost one: the profit comes from
training, not from a product. Horses also need **straw**.

Eight colours (gray, pinto, palomino, chestnut, bay, black, seal brown, dun) — **purely visual**.

⭐ **Transfer tip:** "If you want to transfer your horses from one stable to another, just ride
them" — no trailer needed.

> Source note: article 339's step numbering skips 6 — it runs Step 5 then Step 7. No content
> appears to be missing.

---

## 8. BEES — passive income plus a field bonus

⭐ **Unlike every other animal, you don't buy bees.** "When you buy and place a hive, the bees are
already in there." No feeding, no water, no care: "You don't have to worry about anything."

### Pollination yield bonuses

| Crop | Yield increase |
|---|---|
| **Sunflowers** | **+5%** |
| **Potatoes** | **+2.5%** |
| **Canola** | **+2.5%** |

⭐ **Larger hive = more honey AND a bigger yield-increase radius.** The Academy recommends starting
with a **large beehive** immediately: "It holds a good return of investment and increases the yield
of your fields with the biggest radius."

⚠️ **You can only place ONE pallet station on the map.** Honey from *all* hives on the map is
collected at that single point — so site it to suit your farm layout, not the hives. Pallets of
honey appear automatically once enough is produced.

A beekeeper's outfit is available in the **"Others"** category of the shop. Purely cosmetic.

---

## 9. BUYING, SELLING AND TRANSPORT

⭐ **The money-saving rule, repeated in every article: you do not need an animal trailer.**
"It only costs a tiny fee to buy or sell them directly at the barn. Only go ahead if you want the
full cattle farmer role-play experience."

A trailer is genuinely required only to **transfer animals between two barns**.

- **Chickens are the exception** — "unlike the other animals, you can't transport chickens yourself." Buy from the livestock trader or directly at the barn.
- When buying a trailer, **look for the species icon** in the "animal transport" section — it indicates which animals it carries.
- **Large transporters need a truck or a dolly.** A dolly links tractor to trailer and is cheaper than a truck. Small trailers need neither. Click **"combinations"** on the shop page to check.
- Chickens need a **rooster** for breeding.
- **Goat purchase ages: 0, 3 and 16 months.** Younger goats produce no milk and don't breed.
- **Sheep purchase: very young, or 8 months** (already mature).

---

## 10. STARTER EQUIPMENT BY ANIMAL

FS22-era named machines except goats. Procedures carry over; model numbers may not.

| Animal | Equipment |
|---|---|
| **Chickens** | John Deere 7810 · Hauer XB190 front loader attacher · albutt pallet fork |
| **Bees** | John Deere 7810 · Hauer XB190 · albutt pallet fork |
| **Sheep** | John Deere 7810 · Hauer XB190 · albutt bale spike + pallet fork · *(optional)* abi1600 tank |
| **Goats** *(FS25)* | **John Deere 3650 · Quicke Q4M front loader · albutt pallet fork + bale spike · Sheep Barn (No Brand)** |
| **Horses** | John Deere 7810 + front loader attachment + bale spike + pallet fork |
| **Pigs** | John Deere 7810 + front loader + bale spike + pallet fork · Pigsty · Farmtech Variofex 750 manure spreader · Farmtech Sucercis 800 slurry tank · manure heap · **a trailer** to haul your own harvested crops to the sty |
| **Cows** | John Deere 7810 + front loader + bale spike · Hörmann Cow Barn with feeding robot · *(alt)* Kuhn RA 142 mixer · *(optional)* **Liquid Manure Tank Extension** · Farmtech Variofex 750 · Farmtech Sucercis 800 · Lizard MKS 8 tank · manure heap |
| **Highland cattle** | Tractor + front loader + bale spike · barn · manure heap · liquid manure tank · manure spreader · slurry spreader |

⭐ **The front loader must be configured before it can be attached.** Repeated in several articles:
"drive the tractor to the dealer, park the machine in the vehicle options field and select the
appropriate attachment." Only then can you attach a front loader attacher.

---

## 11. PROGRESSION PATH (as the Academy frames it)

1. **Chickens or sheep first** — named explicitly as the beginner entry. Chickens need no water at all, accept any of three grains or a bought feed bigbag; sheep hit 100% on grass alone.
2. **Bees early** — near-zero upkeep, passive honey income, and a free yield bonus on sunflowers, potatoes and canola. Only real constraint is the one-pallet-station limit.
3. **Goats** as the cheap route into milk — same buildings as sheep, 100% on grass or hay.
4. **Pigs** once you grow several crops — start on bought feed, transition to your own harvest.
5. **Cows last** — most complex, most equipment. Buy the feeding-robot barn to skip the mixer wagon.
6. **Highland cattle** — flagged for experienced players; breeding-only, no milk.

**The straw ↔ animal loop worth planning around:** wheat, barley and oat produce straw when
harvested with the **straw swath** enabled (see `crops-101.md` §3). Straw bedding produces manure.
Manure fertilises fields for free. Growing your own grain therefore reduces both feed *and*
fertiliser spend at once.

# Farming Simulator — Game Basics

> **Offline reference for Claude Code.** Compiled from the 9 tutorials in the "Game Basics"
> section of the official Farming Simulator Academy
> (https://www.farming-simulator.com/newsArticle.php?news_id=280).
> Every fact below is drawn from those articles. Nothing is inferred or supplemented.
> Where the Academy is silent, this file says so rather than guessing.

## Source provenance and version caveat

| # | Topic | Source article |
|---|---|---|
| 1 | Introduction to the Academy | news_id=265 |
| 2 | Settings & New Save Game | news_id=284 |
| 3 | HUD & Menu | news_id=285 |
| 4 | Icon Overview | news_id=323 |
| 5 | How to Start & First Machines | news_id=286 |
| 6 | Introduction to Shops & Dealers | news_id=287 |
| 7 | Introduction to Build Mode | news_id=288 |
| 8 | Introduction to Seasonal Cycles | news_id=289 |
| 9 | Introduction to the AI helper | news_id=313 |

URL pattern: `https://www.farming-simulator.com/newsArticle.php?&news_id=<id>`

**Version:** The Academy hub page itself (news_id=280, not one of the nine articles above) states
that tutorials "are currently being optimized for the latest Farming Simulator 25, but work mostly
on Farming Simulator 22 as well." The nine Game Basics
articles are **FS22-era** — several are dated November 2021 / January 2022, and the map list and
starter-machine list are FS22's. Mechanics described here are broadly current; **specific map
names and starter equipment should be treated as FS22 and verified against FS25.**

**Known gap:** the Icon Overview article (323) delivers its actual icon legend as images plus a
downloadable printable sheet. Per-icon meanings are **not** recoverable from the page text, so
this file describes the icon *categories* only.

---

## 1. New save game: difficulty

Two difficulty modes are described:

| Mode | What you start with |
|---|---|
| **New Farmer** (recommended for beginners) | An initial farm including some fields and buildings, a selection of machines, and enough money in the bank to get started |
| **Farm Manager** (medium) | Nothing — you must purchase land, build a farmhouse, and establish operations from scratch |

## 2. New save game: maps

Three base maps (FS22): **Elmcreek**, **Haut-Beyleron**, **Erlengrat**. They differ in terrain,
field sizes and shapes, and general atmosphere; maps are inspired by American and European
environments. Additional maps come from the ModHub.

## 3. Recommended game settings (Academy's beginner recommendations)

| Setting | Academy recommendation |
|---|---|
| Timescale | Real time, up to **5x** when doing field work like sowing |
| Economic difficulty | Lower settings make earning money easier |
| AI worker refill | Set to **"buy"** so resources restock automatically — less micromanagement |
| Seasonal growth | **Deactivated** for beginners (default in-game is *enabled*) |
| Month duration | 1–28 days, player choice |
| Crop destruction | Initially **disabled**, or use narrow tires |
| Periodic plowing | Optional for beginners; can be delegated to helpers |
| Field stones | **Deactivated** for beginners |
| Lime and weeds | **Enabled** — recommended for an authentic experience |
| Snow | Disable if seasonal growth is off |

Planning note: the Academy recommends turning *off* the two systems that add busywork (stones,
seasonal growth) while keeping *on* the two that gate yield (lime, weeds).

---

## 4. HUD elements

| Screen area | Shows |
|---|---|
| Upper right | Time of day incl. current time acceleration, the month, weather, account balance |
| Upper left | Control icons — number of tools attached; highlighted attachment = current selection, allowing independent control of features like trailer covers |
| Control box | All currently important actions; context-sensitive (e.g. unloading options appear near designated areas) |
| Lower right — on foot | Field or object state, incl. whether the field needs lime or fertilizer |
| Lower right — in vehicle | Speedometer, remaining fuel, machine condition, fill level of the selected machine (seeds left in seeder, or harvested crop) |
| Mini map | All your machines and tools as icons; owned fields with a colored number; tagged destination waypoints, which flash |

## 5. Menu tabs (ESC / Pause)

| Tab | Contents — planning relevance |
|---|---|
| **Map** | Field states, crop growth stages, harvest-readiness tracking. Vehicle locations can be reset by clicking the icon |
| **Farmland View** | Purchasable land with pricing |
| **Active Workers** | Assign delivery and unloading tasks |
| **Calendar** | Planting/harvesting windows (seasonal growth) |
| **Weather** | Multi-day forecast — **harvesting is blocked during rain** |
| **Price** | Current price each selling point will pay per product; fluctuates through the year. (285 states the fluctuation; that it **can be displayed** on the screen comes from 297/298) |
| **Vehicle Overview** | Fleet inventory with operating hours, maintenance level, leasing cost, resell value |
| **Finances** | All transactions — vehicles, animals, buildings, maintenance — plus bank loans |
| **Animals** | Livestock management |
| **Contracts** | Available contracts, with the option to borrow all necessary items from the contractor |
| **Production Chain** | Active production sites and chains |
| **Statistics** | Hectares worked, time spent plowing, trees planted |

Two tabs most relevant to profit planning: **Price** (fluctuation over the year — the basis of
store-then-sell strategies) and **Weather** (rain blocks harvest, so a narrow harvest window plus
forecast rain is a real scheduling risk).

---

## 6. Seasons

The game **begins in August** and cycles through four seasons.

| Season | Months given | Gameplay |
|---|---|---|
| Spring | March–June | The time to do most of the planting; most crops are sown March–June, with some exceptions |
| Summer | — | Crop planting still possible; grassland farming for animal feed; prepare for winter |
| Fall | September–November | Harvest season — most crops are harvested September–November. Prepare for winter no later than Fall |
| Winter | — | Snow; snow-ploughing and road salt maintenance; feeding animals; focus on greenhouses; production chain opportunities |

**Consequence for a fresh seasonal save:** you start in August, and per the Grains tutorial
(news_id=298) **canola is the only crop you can seed at that point.**

### Seasonal settings

| Setting | Detail |
|---|---|
| Seasonal Growth | Determines whether the crop calendar enforces planting restrictions. **Default: enabled** |
| Days per Month | 1–28. **Default: 1 day per month** (12 days/year). Max 28 (336/year). Academy note: many people are comfortable with **3 days per month at x5 speed** |
| Fixed Visual Month | Maintains consistent visual weather when Seasonal Growth is disabled |
| Snow | When enabled, winter includes snow, requiring ploughing and salt |

### Withering

Worked example given for wheat: sown September–October, requires **ten months** to mature,
harvested July–August the following year. "If you don't stick to the timeframe and harvest it
before October, it will wither, and the crop is destroyed."

---

## 7. Shop and dealership

### Shop tabs

| Tab | Contents |
|---|---|
| Brands | All available brands — useful for building a single-manufacturer fleet |
| Vehicles | By category: small/medium/large tractors, harvesters, sprayers |
| Tools | Attachable equipment — mowers, cultivators, seeders — by category |
| Objects | Bigbags, pallets, bales for sowing, fertilizing, livestock feed. A **Seed Bigbag contains seeds for all crops**; feed Bigbags contain wheat or oat for livestock |
| Used Vehicle Sale | Changing set of machinery at variable discounts — **may need repair and cleaning** |
| Owned Items | Machines by category; sell them, or display location on map |
| Leased Items | Leased vehicles and tools; **constant leasing fees**; can be returned |
| Pack | Bundled equipment for specific tasks. Machines can overlap, and **you buy every item in a pack separately** |

### Buying

- Check specifications on the left side of the shop screen
- **Verify horsepower before attaching tools** — the RABE EG cultivator example requires a tractor with a minimum of 90 hp
- The **John Deere 7810** (medium tractors) is described as "powerful enough for everything you're going to do at the start of the game as well as later on" — note the article gives **no prices and no hp figure for the 7810 itself**
- Choose wheel brand; some cost more, some offer more setups such as **narrow tires** (needed when playing with crop destruction)
- A front loader attachment can be added
- Customization is available at the shop at any time
- Leasing is available as an alternative to buying

### Dealership

- All purchases appear in front of the local shop
- Click the shop icon and teleport by clicking "visit"; the shop can be tagged on the minimap
- Two illuminated icons: shop and dealer
- The **dealer's workshop** allows customization, repair, repainting, condition checking, and value assessment

---

## 8. First machines

The Academy's three specialization paths:

| Path | Academy's characterization |
|---|---|
| **Agriculture** | "The heart of Farming Simulator." Recommended for beginners in New Farmer Mode, who already own some machinery. A lot of day-to-day variety |
| **Animal Husbandry** | Some maps include animals in New Farmer Mode. If you pay no attention to them, **they will just stop producing goods** |
| **Forestry** | Lucrative, but not as diverse as agriculture, and requires skill and significant capital investment |

### The seven-tool starter kit

| Tool | Purpose |
|---|---|
| Tractor | Required for all operations; power must match task demands |
| Cultivator | Loosens soil before sowing |
| Seeding machine | Sows crops; requires seeds |
| Weeder | Eliminates weeds to prevent yield penalties |
| Fertilizer spreader | Fertilizes and limes; **some models accept both substances** |
| Harvester + header | Grain headers recommended for beginners; **can be leased seasonally** if seasonal growth is on |
| Trailer | Transports crops to selling points |

### Named beginner loadout (FS22-era — verify against FS25)

| Role | Machine |
|---|---|
| Tractor | John Deere 7810 |
| Cultivator | RABE MR 250 |
| Seeder | NORDSTEN NS 3030 |
| Weeder | Einböck Aerostar-Exact 600 |
| Fertilizer spreader | BREDAL K105 |
| Harvester | DEUTZ-FAHR Topliner 4090 HTS + Header 4090 |
| Trailer | WELGER DK 115 |

New Farmer Mode provides comparable starter equipment. **Contracts** are the other recommended
start: use your own machines, or borrow the employer's equipment for a small fee — borrowed
machines appear in front of the local shop.

---

## 9. Build mode

Five tabs:

| Tab | Categories |
|---|---|
| **Buildings** | Farmhouses, garages and sheds (machines, tools, bulk material storage); silos for crops and containers for water/fertilizer/fuel; tools incl. charging stations, vehicle workshops for repairs, pressure washers |
| **Production** | Factories for production chains; selling points; greenhouses (tomatoes, strawberries); **orchards — grape vines and olive groves, requiring manual placement**; generators producing power, sold automatically |
| **Animals** | Animal pens by species; beekeeping objects; a doghouse |
| **Decorations** | Fences, lights, decorative items such as garden sheds |
| **Landscaping** | Terrain sculpting; ground textures (asphalt, gravel, forest ground); trees and plants |

Cross-reference: grapes, olives **and rice paddies** are placed from build mode, not sown — see
`crops-101.md`. The Crops tutorials locate them under the **cultivation / orchards segment of the
production tab**.

---

## 10. AI workers

Access the AI-Worker screen and select **"create job"** on any vehicle or machine, then choose:

| Job type | Behaviour |
|---|---|
| **Go to** | Directs a machine/vehicle to a specific destination |
| **Field Work** | Assigns the task associated with the machine at the target location |
| **Deliver** | Sends crops to a selected unloading station — **can be looped** |
| **Load & Deliver** | Loads goods at one station, delivers to another — **can be looped** |

Looping makes workers repeat tasks continuously until resources run out.

**Shortcut:** press **H** (PC, or console equivalent) to hire an AI worker while already
performing a task.

**Settings:** you can configure whether the AI worker refuels/refills seeds, fertilizer, slurry,
manure or fuel independently, or requires manual handling. The Academy's recommendation: let it
do it.

---

## 11. Icon categories

The legend itself is image-only in the source. The categories are:

| Category | What the icons tell you |
|---|---|
| **Crops & Greenery** | Which crops a machine can handle, and where crops are growing on the map. **When buying a harvester and header, matching crop icons on both machines show compatibility** |
| **Yield Boost & Other** | On fertilizer spreaders: whether the equipment handles solid fertilizer, organic fertilizer, or lime |
| **Shop** | On tractor-attachable tools — **required power specifications are the critical one** |
| **Product** | Production-chain goods (bread, furniture, etc.) — described as fairly self-explanatory |
| **Animal** | On animal pens in build mode: which animals the pen accommodates, what feeds them, what goods they produce |

Practical rule from this section: **compatibility in this game is expressed as icon-matching plus
a horsepower number.** When planning an equipment purchase, both must be checked.

---

## Quick-reference: facts most useful for planning

- Game starts in **August**; with seasonal growth on, **canola is the only crop sowable at the start**.
- Default month length is **1 day**; the Academy suggests **3 days/month at x5** as a comfortable pace.
- **Rain blocks harvesting** — check the Weather tab against tight harvest windows.
- Prices **fluctuate over the year**; the crop tutorials (297, 298) add that the fluctuation can be displayed on the Price screen — storing to sell later is a supported strategy (but see per-crop storage restrictions in `crops-101.md`).
- Leasing is explicitly recommended for **seasonal-use machines** (harvesters) and **expensive specialist machines** (cotton harvesters).
- A Seed Bigbag contains seeds for **all** crops — you select the crop on the seeder/planter, not at purchase.

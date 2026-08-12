# FS25 DLC — Straw Harvest Pack

> **Offline reference for Claude Code.**
> **Primary source (official):** https://www.farming-simulator.com/dlc-detail.php?dlc_id=fs25strawharvest
> Official announcement: news_id **627** · ModHub: mod_id **277447**
> Facts are official unless marked **[SECONDARY — verify]**.

| | |
|---|---|
| **Price** | **FREE** |
| **Released** | 12 August 2025 *(date of announcement news_id=627; the DLC page states none)* |
| **Requires** | FS25 Update **1.10** or higher |
| **Content** | **13 items** + a new production chain |
| **Brands** | KRONE, Bressel und Lade, Lizard, Weidegut, Hallsys |
| **Developer** | **Creative Mesh** (published by GIANTS) |

⚠️ **No Academy tutorial exists.** The developer's own project page is the best available
description of the production chain and is used below, clearly marked.

---

## 1. ⭐ WHAT IT ADDS — the pellet industry

A new **straw → pellets** production chain, built around the world's first mobile pellet harvester.

⭐ **Official statement (news_id=627):** the **KRONE Premos 5000** "produces pellets by collecting
**straw and hay swaths** from the field, and can **also be operated stationary with an additional
bale shredder**."

⭐ **Pellet uses (official): sold, used for animal bedding, or fed to animals.**

This makes straw — previously just a bedding by-product (`crops-101.md` §3, `animals-101.md` §4) —
into a sellable processed good with its own value chain.

### The chain

```
wheat/barley/oat harvest (straw swath ON)
        │
        ├──> straw swath ──> Premos 5000 (in-field) ──> PELLETS
        │
        └──> baled ──> Bale Shredder ──> Premos 5000 (stationary) ──> PELLETS
                                                │
                          PELLETS ──> sold │ animal bedding │ animal feed
                                     └──> Palletizer ──> bagged pallets ──> HIGHER sale value
```

⭐ **The palletizer is the profit step.** Official wording: the automatic palletizer "**increases
pellet sale value**."

---

## 2. THE INDUSTRY HALL

⭐ **Official:** a "versatile and configurable" industry hall providing storage, goods processing,
pallet/bale containment, an optional **hall crane**, and an **automatic palletizer**.

**[SECONDARY — Creative Mesh, the developer]**
https://creative-mesh.com/projects/straw-harvest/ — ⭐ **three hall configurations:**

1. Empty parking space
2. Storage for bales and pallets
3. ⭐ Enhanced with **hall crane + automatic palletizer**, which packages Premos pellets for **higher-profit sale**

---

## 3. CONSUMABLES — optional, and easy to overlook

⭐ **[SECONDARY — Creative Mesh]: consumables are OPTIONAL, enabled via shop configuration.**
When switched on, you must buy pallets of **bale yarn, netting, and molasses**.

The pack ships all three as purchasable pallets (see §4). ⚠️ If you enable consumables without
stocking them, baling and pelleting will stall.

**[SECONDARY — FS Wiki]** confirms the chain inputs: **straw/hay (or shredded bales) + molasses →
pellets**, bagged onto pallets by the palletizer for higher profit. Molasses is supplied by the
**Weidegut Molasses Pallet**.

---

## 4. COMPLETE ITEM LIST (13 items)

### Equipment (7)

| Machine | Type | Required power | Capacity |
|---|---|---|---|
| ⭐ **KRONE Premos 5000** | **Mobile pellet harvester** | **350 HP** | **9,000 l** |
| **KRONE BiG Pack 1290 HDP II XC** | Square baler | 258 HP | — |
| **KRONE Comprima V 180 XC** | Round baler | 80 HP | — |
| **KRONE Bale Shredder** | Miscellaneous | — | — |
| **Lizard vGrab** | Transport | — | — |
| **Bressel und Lade B50 AR-03** | Transport | — | — |
| **Bressel und Lade B50 AR-05** | Transport | — | — |

⭐ **The Comprima V 180 XC needs only 80 HP** — the cheapest entry point to baling in the pack, and
usable behind a starter tractor. The Premos at 350 HP is the serious commitment.

### Consumable pallets (3)

| Item | Shop category | Capacity |
|---|---|---|
| **KRONE Square Bale Twine** | Pallets | — |
| **KRONE Round Bale Net** | Pallets | — |
| **Weidegut Molasses** | Pallets | **600 l** |

### Placeables (3)

| Item | Shop category |
|---|---|
| **Hallsys Pellet Hall Palletizer** | Production Sites |
| **Hallsys Pellet Heat Plant** | Production Sites |
| **Weidegut Pallet Sell Point** | Selling Points |

⚠️ The **industry hall itself** is described in the official text but is not itemised separately on
the DLC page — the Hallsys entries are its production components.

---

## 5. ADDITIONAL SECONDARY DETAIL

**[SECONDARY — Creative Mesh]**

- ⭐ **KRONE BaleCollect 1230** attaches to the BiG Pack and **unloads up to three bales simultaneously**
- The **Comprima has variable bale size** configuration

**[SECONDARY — FS Wiki]** The Premos was single-axle in FS17, **tandem-axled from FS19 onward
including FS25**.

⚠️ **[SECONDARY — Steam guide, FS22-era, treat with caution]**
https://steamcommunity.com/sharedfiles/filedetails/?id=3236101235 — describes pre-filling the
Premos with **molasses and water**, and recommends a water tank trailer. ⚠️ **Water as a Premos
input is an FS22-era detail and is not confirmed for FS25.** The guide also depends on a mod. Its
claim that pellet prices peak "around January" is unverified.

---

## 6. PLANNING NOTES

- ⭐ **It's free, and it monetises a by-product you already generate.** If you grow wheat, barley or oat with the straw swath enabled, you already have the input.
- ⭐ **Build the palletizer configuration of the hall.** Both the official page and the developer state that palletized pellets sell for more — it's the only stated economic lever in the pack.
- **Start with the Comprima V 180 XC (80 HP)** if you're early-game. The Premos (350 HP) and BiG Pack (258 HP) both need serious tractors.
- ⭐ **The stationary Premos + Bale Shredder route** means you can buy bales rather than farm straw — useful if you want the pellet business without the arable operation.
- **Pellets have three outlets** — sale, bedding, feed — so unsold stock is never wasted. Bedding in particular feeds the manure loop in `animals-101.md` §4.
- ⚠️ **Decide on consumables before building the operation.** Turning them on adds a recurring twine/net/molasses cost; leaving them off simplifies logistics.

---

## 7. WHAT'S NOT DOCUMENTED

No source — official or secondary — publishes:

- **Pellet conversion ratios** (litres of straw → litres of pellets)
- **Molasses consumption rate**
- **Premos throughput** per hour or per hectare
- **The palletizer's price premium** as a figure
- Any **prices** for the machines or placeables

These require in-game measurement.

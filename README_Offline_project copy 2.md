t

# RestoSoft Offline — Desktop Restaurant POS

An offline-first desktop POS system for restaurants. Built with Electron + React + Express + SQLite. Works on LAN without internet. Multiple cashier terminals connect to one main server machine.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    MAIN COMPUTER                        │
│                  (e.g. 192.168.1.82)                    │
│                                                         │
│  ┌──────────────┐   ┌──────────────┐                   │
│  │  main-api    │   │  local-api   │◀── port 5001       │
│  │  port 5002   │   │  Express +   │                    │
│  │  Express +   │   │  Socket.io   │                    │
│  │  MySQL       │   │  SQLite DB   │                    │
│  └──────┬───────┘   └──────▲───────┘                   │
│         │   (sync/fetch)   │                            │
│         └──────────────────┘                            │
└─────────────────────────────────────────────────────────┘
              ▲                ▲               ▲
              │  LAN (Wi-Fi)   │               │
    ┌─────────┴──┐        ┌────┴──────┐   ┌───┴──────────┐
    │  Cashier 1 │        │ Cashier 2 │   │  Waiter App  │
    │  Electron  │        │ Electron  │   │  Android     │
    │  (Windows) │        │ (Linux)   │   │  (tablet)    │
    └────────────┘        └───────────┘   └──────────────┘
```

**Main computer** runs both servers (`local-api` + `main-api`) and owns the SQLite database.

**Cashier terminals** run the packaged Electron app, connect to `http://{mainIP}:5001`, and have no local database.

**Waiter tablets** run the Android app, connect to the same `http://{mainIP}:5001`, and authenticate via the waiter login endpoint.

---

## Components

| Component            | Path            | Port       | Description                                                                             |
| -------------------- | --------------- | ---------- | --------------------------------------------------------------------------------------- |
| **local-api**  | `local-api/`  | 5001       | Express + SQLite backend. Single source of truth for all cashier and waiter operations. |
| **main-api**   | `main-api/`   | 5002       | Express + MySQL bridge. Provides live data from the restaurant database.                |
| **cashier**    | `cashier/`    | 5173 (dev) | React + Vite POS frontend. Runs in Electron or browser.                                 |
| **electron**   | `electron/`   | —         | Electron shell. Self-contained — embeds and auto-starts local-api.                     |
| **waiter-app** | `waiter-app/` | —         | React Native Android app for waiters. Connects to local-api over Wi-Fi.                 |

Each component has its own README:

- [`local-api/README.md`](./local-api/README.md)
- [`main-api/README.md`](./main-api/README.md)
- [`cashier/README.md`](./cashier/README.md)
- [`electron/README.md`](./electron/README.md)
- [`waiter-app/README.md`](./waiter-app/README.md)

---

## Prerequisites

- Node.js v20+
- npm v9+
- MySQL server (for main-api)

---

## Installation

```bash
# Clone and install all dependencies
git clone <repo-url>
cd restosoft_offline
npm install
cd cashier && npm install && cd ..
```

---

## Development

Run all services in parallel:

```bash
npm run dev
```

This starts (via `concurrently`):

- `[0]` local-api → `http://localhost:5001`
- `[1]` main-api → `http://localhost:5002`
- `[2]` cashier Vite dev server → `http://localhost:5173`
- `[3]` Electron window → loads `localhost:5173`

Or run individually:

```bash
npm run local-api     # local-api only
npm run main-api      # main-api only
npm run cashier       # React dev server only
npm run electron      # Electron window only
npm run start         # local-api only (production-style)
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
# local-api
SQLITE_DB_NAME=restosoft_local.db
SQLITE_DIR=./sqlite
JWT_SECRET=your_secret_here
LOCAL_API_PORT=5001

# main-api
MAIN_API_PORT=5002
MYSQL_HOST=192.168.1.200
MYSQL_PORT=8080
MYSQL_USER=root
MYSQL_PASS=your_mysql_password
```

---

## Production Build

### Build cashier frontend only

```bash
npm run build:cashier
# Output: cashier/dist/
```

### Build local-api server bundle only

```bash
npm run build:server
# Output: electron/server/server.js  (bundled into electron for packaging)
```

### Package Electron app — both platforms

```bash
npm run dist:all
# Output: dist-electron/RestoSoft-1.0.0.AppImage   (Linux)
#         dist-electron/RestoSoft-1.0.0-win.zip     (Windows)
```

Each `dist:*` script runs `build:server` + `build:cashier` before packaging — no manual pre-build step needed.

### Package Electron app — Linux only

```bash
npm run dist:linux
```

### Package Electron app — Windows only (zip)

```bash
npm run dist:win
```

> The packaged app is **self-contained**: local-api + SQLite + cashier UI are all embedded. No separate server process is needed on the user's machine.

---

## Deploying to Cashier Terminals

The packaged Electron app is **self-contained** — it embeds local-api and SQLite. No separate server setup is needed.

### Main server machine (one per restaurant)

1. Install the app (Windows: extract zip → run `RestoSoft.exe` | Linux: `chmod +x *.AppImage && ./RestoSoft-1.0.0.AppImage`)
2. Leave the **Server IP** field empty on the login page
3. App starts local-api on `localhost:5001` and connects to it automatically
4. This machine owns the SQLite database

### Additional cashier terminals (same LAN)

1. Install the same app on the other machine
2. On the login page → **Server Connection** → enter the main machine's IP (e.g. `192.168.1.82`) → click **Set**
3. Login with credentials — the app connects to `http://192.168.1.82:5001`

### Waiter tablets (Android)

Enter the same main machine IP in the waiter app's server connection screen.

### Cloud sync (main-api)

The local-api on the main machine syncs completed orders to `https://mainapi.restosoftindia.org` automatically. No extra setup needed — MAIN_API_URL is baked into the build.

---

## Network Requirements

All machines must be on the **same Wi-Fi router**. Internet is not required — only LAN connectivity.

```
Cashier terminals ──Wi-Fi──▶ Router ──LAN──▶ Main PC :5001
                                ↑
                        Internet optional
```

| Scenario                           | Works? |
| ---------------------------------- | ------ |
| Same Wi-Fi, router has internet    | ✓     |
| Same Wi-Fi, router has no internet | ✓     |
| Cashier Wi-Fi turned off           | ✗     |
| Cashier on different network       | ✗     |

---

## Offline / Online Login

Login attempts follow this priority:

```
1. Try main-api (online login against MySQL)
   ├── Success → save bcrypt hash to SQLite → return session
   └── Failure (network down / main-api offline)
       └── Try SQLite offline_users (bcrypt compare)
           ├── Success → return offline session
           └── Failure → return error
```

Once logged in successfully online, the device can log in offline next time using the locally cached credentials.

---

## Printing (stealthy-print)

Silent printing uses the **stealthy-print** Android agent (separate app) running at `http://{ip}:8181`.

**Flow:**

1. Cashier triggers KOT or Invoice
2. `local-api` returns cart data
3. Frontend calls `GET /api/printers/config` to get configured printers
4. For each matched printer → `POST http://{printer-ip}:8181/print` with HTML payload
5. Stealthy-print agent silently sends to the thermal printer
6. If all silent prints fail → browser print dialog opens as fallback

**Printer configuration:** Settings page → add stealthy-print server IPs → add printers → assign cashier access (by eid).

This is the legacy path and still the default for every printer. It's now one of three delivery paths a printer can use (`agent`, `direct` same-machine, `direct` relayed to another desktop), selected per-printer via `connection_type`/`terminal_name` and routed through a single `dispatchPrint()` decision point. See **[`PRINTING.md`](./PRINTING.md)** for the full architecture.

---

## Changelog

### 2026-07-25

#### Discount, Additional Charge & Round-Off Calculation Overhaul (local-api & cashier)

Three related fixes to the bill breakdown, found while walking through a real bill's numbers with the client:

* **Round-off was applied twice.** Service/custom charges were rounded to a whole rupee individually, then the grand total was rounded *again* on top — replaced with a single round-off pass over the full sum (base + all charges).
* **Percentage discounts were computed off the tax-inclusive gross price** (10% of a ₹840 tax-inclusive item showed as ₹84 off, instead of the more standard 10% of the ₹800 pre-tax price). The discount *ratio* actually applied to the bill now comes straight from the typed `%` (independent of any currency base), so the grand total is identical either way — only the displayed/stored ₹ discount amount changed, now correctly reflecting the pre-tax convention.
* **The flat "additional charge" (HD/TA/Dine per-item rate) was taxed but never discounted.** It's now included in the discount base and reduced by the same ratio as item price, then taxed on the discounted total — resolving an existing inconsistency where `DirectBilling.tsx` already did this but `OrderCart.tsx` and the server didn't.

Full root-cause writeup and the math: [`local-api/README.md`](./local-api/README.md#known-fixes) · [`cashier/README.md`](./cashier/README.md#bug-fixes-2026-07-25).

#### Waiter App Settings Decoupled from Cashier's Global Settings (local-api & cashier & waiter-app)

`enable_cancell_item/bill/qty` and `enable_move_items`/`enable_merge_table` used to be single settings shared by both apps — toggling one from the cashier's Local Manager silently changed waiter-app behavior too. Added five independent `waiter_*` settings (own toggle rows under a new "Waiter Settings" section), so each app's Cancel-reason modal and Move/Merge modal can now be configured separately. See [`local-api/README.md`](./local-api/README.md#known-fixes).

#### Combo Button & Item-wise Discount — Default Changed to Off, Moved to Fine Dine Tab (local-api & cashier & waiter-app)

Both settings previously defaulted to visible/enabled on any install that never explicitly touched them — fixed at both the admin-toggle level and the actual runtime feature-gate checks (which had the same "on unless explicitly off" logic hardcoded independently in 6 places across cashier and waiter-app). Also relocated these two settings, plus the three Cancel toggles and Takeaway Tables Shuffle, from the Billing Settings page's Global Settings tab into a new "Cart & Discount Settings" card under the Fine Dine tab.

#### Local Manager Landing Page Opened a Hidden Dashboard (cashier)

Dashboard, Sync Status, Pending Orders, Sync Logs, Database, and SQL Query are all gated behind settings that default off, leaving Billing Settings as the only Local Manager sidebar item visible out of the box — but the index route (`/local-management`) was hardcoded to render Dashboard regardless. Fixed: the index route now redirects to Billing Settings; Dashboard got its own dedicated path (`/local-management/dashboard`).

#### History — Reprint Button for Completed Bills (local-api & cashier)

The only existing print action on a completed bill was "Invoice Copy" (invoice only) — no way to reprint a bill's KOT ticket once its table had been freed. Added a billId-based KOT reprint path (`getBillDataForKotReprint()` + `printKotItems()`, mirroring the existing invoice-copy pattern) and a new **Reprint** button on the History page that fires both KOT and Invoice reprints together, matching what happens when both print together from the live cart page. See [`local-api/README.md`](./local-api/README.md#known-fixes).

#### Merge Table — Blocked by Default for Invoiced Tables (local-api & cashier & waiter-app)

Merge Table previously had no status-based restriction — an already-invoiced table (bill printed, not yet completed) could be freely merged in either app. New setting `allow_merge_table_when_invoiced` (default off, Fine Dine tab) — running tables are always mergeable; invoiced tables are blocked from a genuine merge (target already occupied) unless the setting is turned on. Relocating an invoiced table onto an *empty* table is a different operation (`changeTable`, not a merge) and stays unrestricted. Enforced authoritatively in `tables.service.ts`'s `mergeTables()`, mirrored in both apps' UI for immediate feedback. See [`local-api/README.md`](./local-api/README.md#known-fixes).

---

### 2026-07-23

#### Stock Entry — Whole Numbers Stored as "5.0" Instead of "5" (local-api)

* `stock_trans` declared `kg_unit`, `kg_qty`, `pcs_unit`, `pcs_qty`, `prize`, `avi_kg`, `avi_pcs` as SQLite `REAL`, so every whole-number value stored and displayed with a trailing `.0` (e.g. `150.0`) — the admin/MySQL side stores these as plain integers, so the same row looked different between the two. Same root cause as the 2026-07-06-era `cashier_id` REAL-affinity fix already documented in `local-api/README.md`.
* Changed those columns to `INTEGER` affinity (SQLite still stores genuine fractions like `4.65` exactly under `INTEGER` affinity — it only drops the `.0` for values that are actually whole numbers) and gave `remarks` a `''` default instead of `NULL`. Added a one-time migration (rebuild-and-copy, same pattern as the earlier `cashier_id` fix) so existing installs' data upgrades in place, preserving `stid` and the autoincrement counter.

#### Stock Entry — `pcs_unit` Always Stored as 0 for Piece-Type Ingredients (cashier)

* `StockEntry.tsx`'s submit payload had `pcs_unit` wired backwards (`r.uom !== 2 ? Number(r.weight || 0) : 0`) — since `r.uom === 2` means "Pieces," this always sent `pcs_unit: 0` for every piece-type stock entry from the desktop cashier.
* Per the admin's own source (`js/admin-inventory.js`), `pcs_unit` holds the **bags/packs count**, the same role `kg_unit` plays for weight items — not a weight value. Fixed: `pcs_unit: r.uom === 2 ? Number(r.bags || 0) : 0`, matching `kg_unit`'s pattern for the opposite condition. The desktop's own read-side code (`Transactions.tsx`) already assumed this correct meaning, so this was a write-side-only bug.

#### Recipe Auto-Deduction — Wrong `kg_unit`/`pcs_unit` Flags for Piece-Type Ingredients (local-api & cashier)

* `recipeDeduction.service.ts` hardcoded `kg_unit=1` and `pcs_unit=0` for every recipe-deduction row regardless of ingredient type. These are meant to be 0/1 *presence flags* (same pattern as `submitStockIssue`'s `issue_kg?1:0`/`issue_pcs?1:0`) — for a Pc-type ingredient this produced the wrong pair, and the desktop Transactions page's recipe-row renderer only ever read `avi_kg`/`kg_qty`, so it displayed `"0 Pc"` deducted and, after the flags were corrected, `"0 L"` for old/available stock (a knock-on effect — its `kgUnit !== 1 ? kgUnit : safetyUom` fallback assumed `kg_unit` was always the old hardcoded `1`).
* Fixed both sides: `recipeDeduction.service.ts` now computes `isPc = recipe_uom === 5` and sets `kg_unit`/`pcs_unit` as complementary flags; `Transactions.tsx`'s recipe-row branch now checks `pcs_unit === 1` first and reads `avi_pcs`/`pcs_qty` directly for Pc rows instead of falling through the Kg-only formatter.

#### Category Sidebar — Empty Categories No Longer Shown (cashier)

* `useOrderCart.ts`'s `filteredCategories` previously showed a category based purely on its own view/platform flags, regardless of whether it had any sellable items under it. Now also requires `getProductsByCategory(cid).some(isSellableOnPlatform)` — a category with zero sellable items (visible, platform-matching, with at least one size) is hidden from the sidebar entirely, in both OrderCart and DirectBilling (both read from the same hook).

#### Recipe Assignment — Only Ingredients With Stock Are Assignable (cashier)

* The "add ingredient to recipe" dropdown listed every ingredient regardless of stock; a `hasStock()` check existed but only powered a warning shown *after* picking a zero-stock ingredient. The dropdown now filters to `ingredients.filter(i => hasStock(i.iid))`, so an ingredient with no available stock can't be selected in the first place. The separate **edit** dropdown (for ingredients already assigned) is untouched, so an already-assigned ingredient that later runs out of stock doesn't disappear from its own edit view.

#### New Printing Architecture Doc

* The print pipeline gained two new connection types since the last time it was documented (`agent` and `direct`, plus a same-cashier-login multi-desktop relay) — none of it was reflected in the root README's "Printing (stealthy-print)" section, which only covers the original agent-only flow. Wrote up the complete current architecture — `dispatchPrint()`'s decision logic, both new concurrency-bounded queues (agent-side and Electron-side, independently arrived at, same 2-concurrent/20-queued fix for the same field-observed hang), and the terminal-relay mechanism — in **[`PRINTING.md`](./PRINTING.md)**.

#### Stale Compiled `.js` Files Shadowing `.ts` Sources — Scoped Cleanup, Again (local-api)

* Hit the same shadowing bug documented under 2026-07-15 below (and originally under 2026-07-06, where a full repo-wide removal was reverted for undocumented reasons): `local-api/src/services/recipeDeduction.service.js`, dated 2026-07-21, was silently shadowing the fixed `.ts` source above, so the recipe-deduction fix wasn't actually live until this was found. A full sweep of all 102 remaining stale `.js` twins across local-api/main-api was done, then deliberately scaled back to just this one file — matching the 2026-07-15 session's decision to not repeat the undocumented-revert history. The other 101 are restored and still pending a deliberate full-cleanup decision.

---

### 2026-07-15

#### Invoice Logo Processing — muddy prints & dropped letters (local-api)

* A raw uploaded logo was embedded verbatim into invoice HTML with only CSS sizing — no resize/contrast/dithering — so the OS print driver's own halftoning turned it into a muddy grey blob on thermal receipts.
* Added a `sharp`-based pipeline (`upload.middleware.ts`, `processLogoForThermalPrint()`) run once at upload time: resize → flatten transparency to white → grayscale → normalize → sharpen → 3×3 "bolden" dilate (reconnects thin/faint strokes) → clip near-white/near-black to pure 0/255 → Floyd–Steinberg error-diffusion dither (decision threshold biased toward black) → compressed PNG.
* A flat brightness-threshold first attempt dropped letters from text logos (any pixel just above the cutoff got wiped to white outright); error diffusion instead carries rounding error into neighboring pixels, so faint/thin strokes render as dense dot runs instead of disappearing.
* See [`local-api/README.md`](./local-api/README.md#4-invoice-logo-processing) for the full pipeline detail.

#### Configurable Invoice Logo Height (cashier & local-api)

* New `invoice_template.logo_height` field (default `90`, 40–200px) with a number input in Invoice Template settings — a tall/portrait logo upload was previously hard-capped to a fixed 90px box and squeezed down to a sliver by `object-fit: contain`.

#### Move Items — Fresh Items Laundered Into Looking KOT'd (local-api)

* Moving a mix of already-KOT'd and fresh (never-sent) items between tables incorrectly marked the fresh items as KOT'd and wrote them into `order_present` (the kitchen-queue table) as if they'd been sent to the kitchen, when they never were.
* Fixed in `tables.service.ts` `moveItems()` by tracking each item's real KOT'd portion (`min(movedQty, sourceKotQty)`) independent of whether the destination table already has a running cart. See [`local-api/README.md`](./local-api/README.md#known-fixes).

#### Move Items — Missing Order ID on Moved Batches (local-api)

* The "Move" KOT batch never set a real `order_id`, so the cashier UI fell back to displaying the small, per-cart `batch_no` (e.g. `2`) instead of a proper sequential order number (e.g. `2607153`). Fixed by minting a real order via `getNewOrderId()` and inserting a matching `order_view` row.

#### Custom Table Reports & the `table_type` Collision (local-api) — supersedes the 2026-06-02 fix below

* Three-stage bug, all rooted in one design point: a custom table section's `table_type` value must be **globally unique** — it shares the column with dine/ta/hd (`"1"`) and every other custom section.
* The 2026-06-02 fix (below) resolved a custom key to a `menu_platforms.platform_id` via a name-matched `JOIN`, but Reports still matched bills by the *raw key* and explicitly excluded numeric values — custom-table bills silently vanished from every Reports tab. Reverting to the raw key fixed Reports but broke MySQL sync (`Incorrect integer value: 'k' for column 'table_type'` — MySQL's column is a strict integer).
* The correct numeric id was never a `menu_platforms`-JOIN value at all — `custom_table_type` already has its own `table_type` INTEGER column (the same id `GET /api/tables` returns). Sourcing from there directly, with no live JOIN, fixed sync without breaking Reports.
* Separately, main-api's own `custom_table_typee` sync payload sends `table_type` as a small local ordinal (1, 2, 3, ...) that collides with dine/ta/hd's reserved `"1"` — real bug data found: a restaurant's "MANDI" custom section had `table_type: 1`, silently double-counting its bills into the Fine Dine/QSR total. Fixed at three layers so it's durable: the menu-sync write path resolves the real id from `menu_platforms` going forward; a startup migration self-heals any already-wrong data in an existing install; and the separately-cached `GET /api/tables` response (a third, independent source of the same colliding value, sent directly by main-api's `/tables` endpoint) is corrected on both write and read.
* Full root-cause writeup and all three fixes: [`local-api/README.md`](./local-api/README.md#known-fixes).

#### Windows Build — `sharp` Packaging Failures

* Packaged Windows build crashed on launch with `Error: Cannot find module 'detect-libc'` — `sharp` was unpacked from asar (native module) but its own runtime dependencies (`detect-libc`, `semver`) weren't, so `sharp`'s internal `require()` calls at runtime couldn't reach them. Added both to `asarUnpack`.
* Separately, `@img/sharp-win32-x64` (the actual Windows native binary) was never present at all — npm only fetches the optional-dependency binary matching the *build machine's* platform, and this project builds the Windows target from a Linux dev machine. Fetched and extracted the win32-x64 tarball manually; see [`electron/README.md`](./electron/README.md#electron-builder-configuration-packagejson--build-field).
* Removed unused `sqlite3` and `better` from `dependencies` (no `require()` anywhere in the codebase) — `sqlite3`'s native module was blocking the entire Windows build (`npmRebuild: true` tries to rebuild every native dependency it finds; no Windows/napi36 prebuilt binary exists for `sqlite3@6.0.1`, and it can't compile from source on this platform either).

#### Stale Compiled `.js` Files Shadowing `.ts` Sources (local-api)

* Found (while verifying the fixes above actually took effect) that several `local-api/src` files have old compiled `.js` twins sitting next to their `.ts` source, left over from an earlier build process — and Node's module resolution under `tsx` prefers the `.js` file over the `.ts` file when both exist, meaning edits to the `.ts` source can silently not run in dev mode. Deleted the stale twins for every file actually touched this session (`db.js`, `cart.service.js`, `restaurant.controller.js`, `invoiceBuilder.js`, `invoiceTemplate.service.js`, `reports.service.js`, `menu.service.js`, `menu.controller.js`, `tables.controller.js`) — not a repo-wide sweep; ~78 other stale `.js` twins elsewhere are untouched (a prior attempt to remove all of them was reverted in this repo's history, for reasons not documented, so a full cleanup needs its own decision).

---

### 2026-07-07

#### Item Reports — Doubled Tax & Inflated Additional Charges (cashier & local-api)

* **Inclusive-tax double-counting (cashier)**: `Reports.tsx`'s item-report total unconditionally added tax on top of the item's base price, even when that price already had tax baked in (inclusive-tax bills). Fixed by threading an `isInclusiveTax` flag from settings (`inclusive_exclusive_tax`) through `groupItems`/`ItemCategoryRow`, matching the legacy admin PHP report's formula exactly. See [`cashier/README.md`](./cashier/README.md#bug-fixes-2026-07-07).
* **Additional-charge cost type inverted (local-api)**: `getStandardChargesForTable()` in `cart.service.ts` wrote `additional_charge_cost_type: 2` with an already-qty-multiplied `additional_charge_cost` for dine/ta/hd tables — backwards from the legacy `amount(1) | percentage(2)` convention the shared item-report query expects, causing it to treat the pre-multiplied total as a percentage rate and wildly inflate item report totals. Since this bad data synced up to the shared MySQL tables, **admin web showed the same inflated totals**, not just desktop. Fixed to write `type: 1` and the raw per-item rate; updated `history.service.ts`'s Sales History and invoice-reprint charge lines to match. See [`local-api/README.md`](./local-api/README.md#known-fixes).

---

### 2026-06-30

#### Held Orders Isolation (cashier & local-api)

* **Cashier Device Isolation**: Generated a persistent, unique browser/device identifier `clientId` (`db_client_id`) in `DirectBilling.tsx` and passed it to the API. This successfully isolated held orders per terminal device, preventing multiple cashiers sharing duplicate credentials from seeing each other's held carts.
* **DB Schema Migration**: Added an `eid` column to the `held_orders` table (with DB migration on startup in `db.ts`) to track the client identifier, and refactored `heldOrdersService`, `heldOrders.controller.ts`, and `heldOrders.api.ts` to accept and scope queries to `clientId`.

#### Recents Page Checkout & Sequence Number Formatting (cashier)

* **Unified Checkout Flow**: Replicated FineDine's complete payment modal and slide-up bill breakdown panel inside `Recents.tsx`. Added a **✓ Complete** button on active invoice cards in the Recents page that triggers this modal, enabling cashier completions directly from the Recents tab.
* **Daily Sequence Number Formatting**: Integrated `formatBillId` in `Recents.tsx` to display the correct daily sequence number without the date prefix (e.g. `# 42` instead of `# 300626000042`).
* **Auto KOT Panel Open**: Passed `{ state: { openKot: true } }` during navigation from Recents to OrderCart so that the KOT panel auto-opens on load.

#### Active Table Session State & Discount Retention (cashier & local-api)

* **`bill_view` Table Extension**: Added columns for discounts, custom packing, customer details, and members count to the active session `bill_view` table. Enabled transactional `ALTER TABLE` migrations on server startup in `db.ts` to update existing installations.
* **State Retention**: Updated `markKOT` and `markInvoice` in `cart.service.ts` to write and persist coupon discount details (amount, input, type), customer details (name, contact, address), and members count directly to `bill_view`. Also updated `setSlotDiscount` and `clearSlotDiscount` to keep `bill_view` in sync immediately.
* **Automatic Recovery**: Refactored `mapCartRowToPhpLikeResponse` and `getPaymentSummary` / `getSlotDiscount` in `cart.service.ts` to read the active state from `bill_view` (falling back/synchronizing to `slot_discounts`).
* **Frontend Syncing**: Exposed `discountAmount` inside the React `CartContext` and `useOrderCart` hook, using a `useEffect` inside `OrderCart.tsx` to auto-restore `appliedDiscount` state. This prevents losing tax and discount settings when cashiers navigate back to the FineDine grid and re-enter.

#### Cancel KOT Printing Correction (local-api)

* **Thermal Print Routing Alignment**: Refactored the `doPrintCancelKot` calls in `cancelItemsController`, `cancelQtyController`, and `cancelBillController` in `cancel.controller.ts`. Replaced the mixed-up parameters to correctly map the actual `cartBillId` (as `billId`) and `cartOrderId` (as `kotNo`). This fixes the print sequence alignment so that cancelled KOT thermal slips show the actual daily Bill ID and the correct KOT order number.

---

### 2026-06-23

#### Bug Fixes

**MRP not stored in SQLite when pulling menu from MySQL (`local-api/src/services/menu.service.ts`)**

- `saveSizeAddonTables()` INSERT was missing `mrp` column — sizes pulled from the server always stored `mrp = 0`
- The upsert object binding was also missing `mrp: size.mrp || 0`
- The menu response mapping (`GET /api/menu`) was omitting `mrp` from each size object — cashier and waiter app never received the value
- All three gaps fixed: INSERT now includes `mrp`, binding includes `mrp`, size response includes `mrp`

**QSR printer platform chip not triggering prints for Direct Billing orders (`cashier/src/print/triggerPrint.ts`)**

- `printer_functionality` stores `"qsr"` but Direct Billing table types are `"dine"`, `"ta"`, `"hd"` — these never matched the `"qsr"` chip
- Added `resolvedFunctionality(tableType)`: for QSR slots (`dine`, `ta`, `hd`) returns `[tableType, "qsr"]`; for numeric fine-dine IDs returns `[tableType, "dine"]`
- Printer match check updated to use resolved list — selecting `"qsr"` on a printer now correctly fires prints for all Direct Billing order types

**Discount persisting after cart cleared (`cashier/src/components/cart/DiscountPanel.tsx`, `local-api/src/services/cart.service.ts`)**

- `DiscountPanel` now accepts `cartItemCount` prop; a `useEffect` resets the input and calls `onApply(0)` when count reaches zero — clears the UI regardless of how the cart was emptied
- `removeItem` in cart service: when the last item is removed, the corresponding `slot_discounts` row is deleted automatically — no stale discount survives in SQLite
- Both `OrderCart.tsx` and `DirectBilling.tsx` pass `cartItemCount={cart.length}` to `<DiscountPanel>`

**KOT customer details not printing even when enabled (`cashier/src/hooks/useOrderCart.ts`)**

- `markKOTAndInvoice` and `qsrComplete` were passing `undefined` as `customerInfo` to `buildKotHtml`
- Added `toKotCustomer` helper that converts `InvoiceCustomerInfo → KotCustomerInfo` (maps `contact → mobile`, `customer_address → address`)
- Both call sites now pass `toKotCustomer(customerInfo)` — customer name, mobile, and address appear on KOT when settings are enabled

**QSR history not showing order ID (`cashier/src/pages/cashier/History.tsx`)**

- Expanded bill view was hiding order headers for QSR orders (required `orderGroups.length > 1`), so single-order QSR bills showed no order section at all
- Fixed: QSR bills (`dine`/`ta`/`hd` table types) show order headers when `orderGroups.length >= 1`
- QSR order label now shows the actual order ID from the database (`Order #42`) instead of a sequential counter

**Shortcode keyboard search not opening size modal (`cashier/src/pages/cashier/OrderCart.tsx`, `DirectBilling.tsx`)**

- Pressing Enter to add an item via shortcode was bypassing the `SizeAddonModal` and directly adding the first size
- Fix: Enter key handler now checks `sizes.length > 1` and whether any addon labels have visible addons; if so, opens the modal instead of adding directly

#### Waiter App — Menu Management Screen (new feature)

Waiters can now hide or show menu categories and items from their tablet without touching the cashier app.

**New files:**

- `waiter-app/src/api/menuManage.api.ts` — `MgmtCategory` + `MgmtProduct` interfaces; `menuManageApi.getCategories()`, `getProducts()`, `setCategoryView(cid, view)`, `setProductView(pid, view)`
- `waiter-app/src/screens/MenuManageScreen.tsx` — expandable category rows + product rows, Switch toggles, optimistic updates, toast feedback; calls `refreshMenu()` after each toggle so `MenuContext` and `MenuSelectScreen` stay in sync

**Modified files:**

- `MainStack` — added `MenuManage: undefined` route and `MenuManageScreen` screen
- `HomeScreen` — added "Menu Management" sidebar entry with icon and navigation

#### Waiter App — Hidden items no longer showing in menu

- Added `view: number` to the `Product` interface in `waiter-app/src/types/menu.types.ts`
- `menu.api.ts` product mapping now includes `view: p.view !== undefined ? Number(p.view) : 1`
- `MenuSelectScreen` product/category filter: products with `view !== 1` are excluded from sections; categories with `view !== 1` are excluded from the list — hidden items are invisible to waiters

---

### 2026-06-18 to 2026-06-23

#### Menu Management — Complete Multi-Page Overhaul

The single `MenuManage.tsx` page is replaced by a dedicated multi-page menu management system mounted under `/menu/*`, sharing a common `MenuTabs` navigation component.

**New pages (`cashier/src/pages/cashier/menu/`):**

| Route                               | Component               | Description                                                                                                                         |
| ----------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `/menu` or `/menu/platform`     | `MenuPlatform.tsx`    | Platform overview — cards for each ordering platform (Base Menu, Fine Dine, Parcel, Delivery, Zomato, Swiggy, custom floors, etc.) |
| `/menu/category`                  | `MenuCategory.tsx`    | Category CRUD with inline name edit, drag-and-drop reorder, platform flags, image upload                                            |
| `/menu/item`                      | `MenuItem.tsx`        | Product CRUD — name, type, tax, description, platform flags, image; inline duplicate-name check                                    |
| `/menu/variant` or `/menu/size` | `MenuVariant.tsx`     | Bulk size management — create/edit/delete sizes globally; assign/unassign sizes to categories                                      |
| `/menu/addon`                     | `MenuAddons.tsx`      | Global addon group management — create addon labels + options, assign/remove groups per product                                    |
| `/menu/tables-areas`              | `MenuTablesAreas.tsx` | Virtual table management (add/remove virtual tables per section)                                                                    |
| `/menu/manage`                    | `MenuManage.tsx`      | Legacy per-category product creation panel (still accessible)                                                                       |

**`MenuTabs` component (`menu/components/MenuTabs.tsx`):** Shared tab bar; "Items" tab opens a portal dropdown listing all platforms; portal uses `getBoundingClientRect()` to position outside any `overflow:hidden` ancestor.

**Image uploads:** Categories, products, and addons now support image upload. Files are sent to `PUT /api/menu-manage/category/image`, `PUT /api/menu-manage/product/image`, `PUT /api/menu-manage/addon/image` (local-api), forwarded to `PUT /api/menu-manage/category/image`, `PUT /api/menu-manage/product/image`, `PUT /api/menu-manage/addon/image` (main-api). Images stored in `main-api/uploads/`.

**New local-api Menu Manage endpoints (`/api/menu-manage`):**

| Method | Path                                     | Description                                                    |
| ------ | ---------------------------------------- | -------------------------------------------------------------- |
| GET    | `/api/menu-manage/platforms`           | List all platforms                                             |
| GET    | `/api/menu-manage/sizes`               | All sizes across all products                                  |
| GET    | `/api/menu-manage/product-sizes`       | All product↔size mappings                                     |
| GET    | `/api/menu-manage/product/check-name`  | Check if a product name already exists (`?name=...&pid=...`) |
| PUT    | `/api/menu-manage/product/name`        | Rename a product                                               |
| PUT    | `/api/menu-manage/product/type`        | Update product type (veg/non-veg)                              |
| PUT    | `/api/menu-manage/product/taxes`       | Update product tax rates                                       |
| PUT    | `/api/menu-manage/product/token`       | Upsert product token number                                    |
| PUT    | `/api/menu-manage/product/description` | Update product description                                     |
| PUT    | `/api/menu-manage/product/image`       | Update product image                                           |
| PUT    | `/api/menu-manage/category/image`      | Update category image                                          |
| PUT    | `/api/menu-manage/size/view`           | Toggle size visibility                                         |
| PUT    | `/api/menu-manage/addon-label/view`    | Toggle addon label visibility                                  |
| PUT    | `/api/menu-manage/addon/view`          | Toggle addon option visibility                                 |
| PUT    | `/api/menu-manage/addon/image`         | Update addon option image                                      |
| POST   | `/api/menu-manage/sizes/assign`        | Assign a size (by name) to all products in a category          |
| POST   | `/api/menu-manage/sizes/unassign`      | Unassign a size from a category                                |
| PUT    | `/api/menu-manage/sizes/edit`          | Edit a size name across all products in a category             |
| POST   | `/api/menu-manage/sizes/delete`        | Delete a size by name across a category                        |
| GET    | `/api/menu-manage/addon-groups`        | List all addon groups                                          |
| POST   | `/api/menu-manage/addon-groups/assign` | Assign an addon group to a product                             |
| POST   | `/api/menu-manage/addon-groups/delete` | Remove an addon group from a product                           |

---

#### Virtual Tables / Add Table Feature

Cashiers (and waiters) can now create extra virtual tables inside any dine-in section without modifying the main MySQL table layout. Virtual tables are stored locally in SQLite and visible in FineDine and the waiter app HomeScreen immediately.

**New SQLite table — `virtual_tables`:**

```sql
CREATE TABLE IF NOT EXISTS virtual_tables (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  section_key  TEXT NOT NULL DEFAULT '',
  section_title TEXT NOT NULL DEFAULT '',
  table_no     TEXT NOT NULL DEFAULT '',
  created_at   TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**New local-api routes (`/api/tables`):**

| Method | Path                      | Description                                                        |
| ------ | ------------------------- | ------------------------------------------------------------------ |
| GET    | `/api/tables/local`     | List all virtual tables                                            |
| POST   | `/api/tables/local`     | Add a virtual table (`{ section_key, section_title, table_no }`) |
| DELETE | `/api/tables/local/:id` | Remove a virtual table                                             |

**`getTables` response** now includes a `virtual_table_list` array so FineDine can merge physical + virtual tables in a single render.

**FineDine behaviour:**

- Physical tables and virtual tables are merged and sorted together in each section
- A special `_virtual` section appears if any virtual tables exist with no matching physical section
- Virtual tables support the full cart lifecycle (add items, KOT, invoice, complete)

**DeviceSettings → Fine Dine tab (new):** Controls the add-table behaviour for cashiers:

| Setting key                  | Values                              | Description                                                   |
| ---------------------------- | ----------------------------------- | ------------------------------------------------------------- |
| `add_table_enabled`        | `yes` / `no`                    | Show/hide the "Add Table" button in FineDine                  |
| `add_table_display_mode`   | `same_name` / `auto_suffix`     | Name the new table the same or append a suffix (e.g.`T1-A`) |
| `add_table_position`       | `beside_parent` / `end_of_list` | Where the new table appears in the grid                       |
| `add_table_max_count`      | `unlimited` / numeric string      | Maximum virtual tables per section                            |
| `add_table_auto_remove`    | `yes` / `no`                    | Auto-delete the virtual table after the order is completed    |
| `add_table_parent_release` | `all_closed` / `custom`         | When to release the parent table's slot                       |

Waiter app HomeScreen also reads these settings and shows/hides its own "Add Table" button.

---

#### Packing Charges, Delivery Charges & Service Charges

Order totals now include itemized extra-charge lines for each order type. Charges are calculated in `cart.service.ts` from settings pulled from MySQL.

**Take Away charges** (read from `settings` table):

- `ta_packing_charge` — flat packing charge per order
- `ta_charge_per_item` — additional charge per item quantity
- `ta_enable_item_packing_charges` — whether per-item packing from `size.packing_charge` is added

**Home Delivery charges:**

- `hd_packing_charge` — flat packing charge
- `hd_delivery_charge` — flat delivery fee
- `hd_delivery_tax_exclusive` — tax % on delivery fee
- `hd_charge_per_item` — additional charge per item quantity
- `hd_enable_item_packing_charges` — whether per-item packing from `size.packing_charge` is added

**Dine-in charges:**

- `dine_additional_charge_on_item` — flat per-item additional charge
- `service_charge` — service charge percentage applied to subtotal

The `size.packing_charge` column (per-product-size) is populated from MySQL via menu pull and carried on each cart item. When item-level packing is enabled, `packing_charge × qty` is summed across all cart items.

`OrderCart.tsx` renders a charge breakdown panel below the cart subtotal showing each applicable charge line before the grand total.

---

#### Close Shift

New shift-close workflow accessible from the Reports page.

**`CloseShift.tsx` (`cashier/src/pages/cashier/CloseShift.tsx`):**

- Denomination counter: rows for ₹500 / 200 / 100 / 50 / 20 / 10 / 5 / 2 / 1
- Auto-calculates `actualCash = Σ(denomination × count)` in real time
- Shows `expectedCash` (today's cash total from reports), `actualCash`, and `diff`
- Fields: Opening Cash, Cash Handover To (required)
- Accessible via the **Close Shift** button in the Reports page header

**New backend:**

- `POST /api/reports/close-shift` — records shift-close entry; inserts into `rest_report_close_shift` SQLite table
- New SQLite table `rest_report_close_shift`: `menu_code, eid, expected_cash, actual_cash, diff, opening_cash, handover_to, created_at`

---

#### DeviceSettings — Expanded Module Tabs

`DeviceSettings.tsx` (Local Manager → Billing Settings) now has 4 module tabs:

| Tab                 | Key           | Status                                                             |
| ------------------- | ------------- | ------------------------------------------------------------------ |
| **Billing**   | `billing`   | Active — bill sequence + start number (unchanged)                 |
| **Fine Dine** | `finedine`  | Active — Add Table settings (see above) + TA/HD button visibility |
| **Inventory** | `inventory` | Coming soon                                                        |
| **Expenses**  | `expenses`  | Coming soon                                                        |

**New Fine Dine settings exposed:**

- Add Table toggle + display mode / position / max count / auto-remove / parent release
- `show_takeaway_button` — show or hide TA button in FineDine header
- `show_home_delivery_button` — show or hide HD button in FineDine header
- `use_ta_hd_slots` — enable slot-based TA/HD mode vs simple flow

---

### 2026-06-17

#### Global Localization — Currency, Date, Time per Restaurant

Restaurant-level locale settings (`country`, `currency_code`, `locale`, `timezone`, `date_format`, `time_format`) are stored in the `kinre.users` MySQL table and pulled into the local SQLite `users` table.

**New `RestaurantContext`** (`cashier/src/context/RestaurantContext.tsx`):

- Loads restaurant info after login via `restaurantApi.getInfo()`; exposes `refresh()` for the Local Manager pull flow
- Provides `info.locale`, `info.currency_code`, `info.timezone` to the entire app

**New `useLocale` hook** (`cashier/src/hooks/useLocale.ts`):

- Reads `RestaurantContext`; returns `formatCurrency(amount)`, `formatAmount(amount)`, `formatDateTime(v)`, `formatDate(v)`, `formatTime(v)`, `currencySymbol`
- Formatting functions call `localise.ts` helpers that use the Intl API with the restaurant's locale/timezone/currency
- Default fallback: `locale="en-IN"`, `currencyCode="INR"`, `timezone="Asia/Kolkata"` — no crash if restaurant info is not yet loaded

**`localise.ts`** (`cashier/src/utils/localise.ts`):

- `formatCurrency(amount, locale, currencyCode)` — `Intl.NumberFormat` with `style: "currency"`, e.g. `₹1,250.00` for `en-IN/INR` or `$12.50` for `en-US/USD`
- `formatAmount(amount, locale)` — numeric formatting without currency symbol
- `formatDateTime / formatDate / formatTime` — Intl date formatting with `timeZone` param

**`restaurant.api.ts`** (`cashier/src/api/restaurant.api.ts`):

- `getInfo()` → `GET /api/restaurant/info` — reads from SQLite cache
- `refresh()` → `POST /api/restaurant/refresh` — pulls from main-api and updates cache

**MySQL migration** (all 150+ client databases in `kinre.users`):

```sql
ALTER TABLE users ADD COLUMN country VARCHAR(100) DEFAULT '';
ALTER TABLE users ADD COLUMN currency_code VARCHAR(10) DEFAULT 'INR';
ALTER TABLE users ADD COLUMN locale VARCHAR(20) DEFAULT 'en-IN';
ALTER TABLE users ADD COLUMN timezone VARCHAR(100) DEFAULT 'Asia/Kolkata';
ALTER TABLE users ADD COLUMN date_format VARCHAR(30) DEFAULT 'DD/MM/YYYY';
ALTER TABLE users ADD COLUMN time_format VARCHAR(10) DEFAULT '12h';
```

---

### 2026-06-15

#### Menu Management — Category `orderby` & Drag-and-Drop Reorder

Category `orderby` column is now used throughout the app to display categories in the correct sequence. Previously all categories had `orderby = 0` in SQLite.

- **Drag-and-drop reorder in MenuManage**: cashiers drag category rows in the left sidebar; each drop reassigns `orderby` (1-indexed) for all affected rows and writes to SQLite immediately
- **`batchUpdateCategoryOrderby`** (`local-api/src/services/menuManage.service.ts`): batch `UPDATE category SET orderby = ?` inside a single SQLite transaction
- **New route** `PUT /api/menu-manage/category/reorder` in local-api — body: `{ items: [{ cid, orderby }] }`
- **Sync to MySQL**: `orderby` is pushed during the menu-manage sync flow via a new `PUT /api/menu-manage/category/orderby` endpoint on main-api
- **OrderCart, DirectBilling, MenuManage** all fetch categories ordered by `orderby ASC`

---

#### Menu Management — Inline Create Product Panel & Portal Dropdown

`cashier/src/pages/cashier/MenuManage.tsx` rewritten:

- **GPD (Grouped Platform Dropdown)**: uses `createPortal` + `position: fixed` + `getBoundingClientRect()` on the button ref to render the platform dropdown in `document.body`, escaping `overflow: hidden` on product cards
- **Inline `CreateProductPanel`**: clicking "Product" in the category sidebar replaces the product grid with a two-column creation panel (left = form, right = queue sidebar with staged cards). No modal.
- **Queue sidebar**: products staged for creation appear as clickable cards on the right; "Add" validates product name + at least one size name before queuing; "Save All (N)" submits all queued products via `api.createProduct()`
- **Edit icon only on product cards**: product cards now show only an edit icon, no in-card action buttons
- **`access_menu` auto-provisioning**: when a new category is created, an `access_menu` row is inserted for the logged-in cashier so the new category is immediately accessible in OrderCart

---

#### Bill Settings — Moved from `local_device_settings` to `settings` Table

`bill_sequence_reset` and `bill_start_number` are now rows in the shared `settings` table. `local_device_settings` table is removed.

- **Migration** (`local-api/src/db/db.ts`): on startup, if `local_device_settings` exists, its bill-related rows are copied into `settings` then the table is dropped
- **Default seeds** (INSERT OR IGNORE):
  - `bill_sequence_reset = 'yearly'`
  - `bill_start_number = '1'`
  - `allow_concurrent_sessions = '0'`
- **`getNewBillId()`** refactored to read from `settings`; uses `INSERT OR IGNORE + atomic UPDATE last_sequence_number + 1` inside `db.transaction()` — two concurrent sessions in the same millisecond still get different IDs
- **Billing Settings UI** (Local Manager → Device Settings) reads/writes via `GET/POST /api/local/billing-settings`

---

#### Concurrent Sessions — Cart Isolation Setting

New `allow_concurrent_sessions` row in the `settings` table controls whether cart changes broadcast to other connected cashiers.

- **Value `'0'`** (default): old shared-view behavior — all cashiers see each other's cart changes in real time via Socket.io `TABLE_STATUS_UPDATED`
- **Value `'1'`** — isolation mode: `broadcastTableUpdate()` in `local-api/src/socket/allBroadcasts.ts` returns early without emitting, so other connected clients do not receive cart events. Each cashier's UI updates only from its own API response.
- Toggled from Local Manager → Device Settings page

---

#### SQLite Migration Fix — `category` Table Startup Crash

Fixed `SqliteError: no such table: category` on startup:

- **Root cause**: migration block inserting into `category` ran before the `CREATE TABLE IF NOT EXISTS category` statement further down in `db.ts`
- **Fix**: migration (copying rows from legacy `menu_categories`) moved to after the `CREATE TABLE` block; `DROP TABLE IF EXISTS menu_categories` removed from the early drop list so the source table still exists when the migration runs

---

#### Expenses Management Module (new feature, complete)

Full expenses tracking system added to local-api and the cashier UI.

**New SQLite tables:**

| Table                             | Purpose                                                                                                   |
| --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `expenses_category`             | Top-level expense categories                                                                              |
| `expenses_sub_category`         | Sub-categories under each category                                                                        |
| `expenses_purchase_items`       | Purchase items per sub-category                                                                           |
| `expenses_vendors`              | Vendor profiles (name, phone, business name)                                                              |
| `expenses`                      | Main expense record — discount, tax, total, paid, due, advance,`expense_type` (0=PAID/DUE, 1=SUSPENSE) |
| `expenses_items`                | Line items (name, qty, uom, unit price) for each expense                                                  |
| `expenses_payment`              | Payment entries recorded against each expense                                                             |
| `expenses_opening`              | Daily opening balance / cash records with closing balance                                                 |
| `expenses_payment_type_options` | Payment methods available for selection                                                                   |

All tables store `menu_code` for multi-tenant isolation.

**New local-api routes (`/api/expenses/...`):**

- Categories / sub-categories / purchase items — full CRUD hierarchy
- Vendors — full CRUD
- Expenditures — create (with line items, discount, tax), update, delete, list (paid / due / advance), detail
- Advance / Due — update amounts, clear advance, clear due (record new payment)
- Opening balance — CRUD
- Payment types — list
- Sync — `GET /sync/status` (pending count), `POST /sync` (push all unsync'd to main-api)

**New main-api pull endpoint:**

- `GET /api/pull/expenses` — returns categories, sub-categories, purchase items, vendors, expenses, and payments from MySQL

**New cashier UI pages (`cashier/src/pages/cashier/expenses/`):**

- `Expenditure.tsx` — expense list + quick create
- `CreateExpense.tsx` — full expense form (category, vendor, line items, discount type, tax type, payment method, advance/due split)
- `Customize.tsx` — manage categories, sub-categories, purchase items, vendors
- `Due.tsx` — outstanding dues — view history, clear with new payment
- `Advance.tsx` — advance payments — view, clear advance
- `Opening.tsx` — daily cash / opening balance records

**Expenses sync to MySQL:** `POST /api/expenses/sync` in local-api collects all unsync'd rows from all expenses tables and sends them in one request to main-api. main-api `sync.service.ts` handles insert.

---

#### Waiter App — Cancel Modal (new feature)

`CartScreen.tsx` now includes a full cancel flow triggered by a **Cancel Bill** button.

**Three tabs in the cancel modal:**

- **Item** — select individual KOT items by checkbox → cancel with reason
- **Qty** — pick a KOT item, enter quantity to remove (partial cancel)
- **Bill** — cancel the entire active bill

**Predefined reasons:** Customer Request · Wrong Order · Duplicate Order · Item Not Available · Other (free-text fallback)

**New API client — `cancel.api.ts`:**

| Function             | Endpoint                              |
| -------------------- | ------------------------------------- |
| `cancelItems()`    | `POST /api/cancel/cancel-items`     |
| `cancelQty()`      | `POST /api/cancel/cancel-qty`       |
| `cancelBill()`     | `POST /api/cancel/cancel-bill`      |
| `printCancelKot()` | `POST /api/cancel/print-cancel-kot` |

---

#### Pull Service — Expenses Pull

`pullApi.pullExpenses()` added to cashier pull API (`cashier/src/api/pull.api.ts`). Fetches expense categories, sub-categories, purchase items, vendors, and past expenses from main-api and caches them in SQLite. Added as a module in the Local Manager Dashboard pull flow.

---

#### UI Layout Fixes

- `cashier/src/index.css` — global layout fixes
- `MainLayout.tsx`, `FineDine.tsx`, `History.tsx`, `OrderCart.tsx`, `Reports.tsx`, `Settings.tsx`, `DirectBilling.tsx`, `ExpensesLayout.tsx`, `InventoryLayout.tsx`, `LocalManagementLayout.tsx` — consistent padding/height corrections

---

### 2026-06-12

#### Printer Settings — Electron IPC Print Architecture

Windows print queue management and test printing moved from the Express server (unreliable in a `fork()`-ed child process) into the **Electron main process** via `ipcMain.handle`. This gives queue and print operations full user permissions and a correct PATH environment.

**New IPC handlers (`electron/main/index.js`):**

| Channel               | Description                                                                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `get-print-queue`   | PowerShell`Get-PrintJob` (Windows 10+) → WMI fallback; returns `{ jobs[] }`                                                               |
| `clear-print-queue` | Per-job`Remove-PrintJob` + WMI `.Delete()` + **spooler restart** (Stop → delete spool files → Start); always succeeds (`exit 0`) |
| `print-silent`      | Generic HTML silent print — loads HTML into a hidden`BrowserWindow` and calls `webContents.print({ silent: true, deviceName, margins })`  |
| `test-print-silent` | Builds a test-print HTML slip and sends it directly to the Windows printer driver (no Android agent needed)                                    |

**Spooler restart in clear-queue:** `Stop-Service Spooler -Force` → `Remove-Item spool\PRINTERS\*` → `Start-Service Spooler` — reliably clears Error-state jobs that `Remove-PrintJob` cannot remove. `exit 0` at the end prevents `execFileAsync` from throwing on partial failures.

**`electron/preload/index.js` additions:**

```js
getPrintQueue:   () => ipcRenderer.invoke("get-print-queue"),
clearPrintQueue: () => ipcRenderer.invoke("clear-print-queue"),
printSilent:     (printerName, html) => ipcRenderer.invoke("print-silent", { printerName, html }),
testPrintSilent: (printerName, ip) => ipcRenderer.invoke("test-print-silent", { printerName, ip }),
```

**`cashier/src/components/common/TitleBar.tsx` — `Window.electronAPI` type extended** with all four new IPC methods.

---

#### Printer Settings UI Improvements (cashier)

- **Test print priority chain:** IPC silent print (Windows driver, no network) → Android agent fallback → browser dialog last resort
- **Toast notifications:** `showToast(...)` after test print (success/fail) and after queue clear (success/fail) — was previously silent or showed misleading network errors
- **"Test Print" button text:** replaced the `⏎` icon with plain text `"Test Print"` for clarity
- **Removed per-printer online/offline status dot:** the coloured dot was checking if the printer name appeared in the agent's printer list and was misleading (dot was always grey/missing); removed entirely
- **Queue refresh uses IPC first:** `fetchWindowsQueue` tries `window.electronAPI.getPrintQueue()` before falling back to the HTTP API

---

### 2026-06-11

#### Customer Details — Waiter App (new feature, complete)

Waiters can now capture extended customer information from the order screen. Details are stored locally in SQLite, linked to the bill on KOT, synced to MySQL on bill completion, and printed on the invoice.

**New SQLite table — `customer_details`:**

```sql
CREATE TABLE customer_details (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  table_id TEXT NOT NULL DEFAULT '',   -- cart_key e.g. "dine_2"
  bill_id INTEGER,                     -- NULL until first KOT
  name TEXT, email TEXT, contact TEXT,
  gst TEXT, customer_address TEXT,
  date_of_birth TEXT, marriage_date TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  synced INTEGER NOT NULL DEFAULT 0,
  completed INTEGER NOT NULL DEFAULT 0  -- set to 1 on bill complete
);
```

**New SQLite migration — `order_history_bill_view`:**

```sql
ALTER TABLE order_history_bill_view ADD COLUMN customer_address VARCHAR(500) NOT NULL DEFAULT '';
```

**New MySQL table (`CLIENT_DB_MIGRATION_ROWS.md`):**

```sql
CREATE TABLE customer_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bill_id INT NOT NULL, table_id VARCHAR(50),
  name VARCHAR(255), email VARCHAR(255), contact VARCHAR(50),
  gst VARCHAR(20), customer_address VARCHAR(500),
  date_of_birth VARCHAR(20), marriage_date VARCHAR(20),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE order_history_bill_view ADD COLUMN customer_address VARCHAR(500) NOT NULL DEFAULT '';
```

**Save flow:**

- Waiter opens customer modal → fills any fields → taps **Save** → row inserted immediately into `customer_details` with `table_id` set, `bill_id = NULL`
- On first KOT (`markKOT`): `UPDATE customer_details SET bill_id = ? WHERE table_id = ? AND bill_id IS NULL` — links row to the bill
- On bill complete (`markComplete` / `qsrComplete`): customer fields merged into `order_history_bill_view` INSERT; `customer_details.completed = 1` set so the row is never returned for future orders on the same table
- Cleanup on unmount: if no order was placed **and** the cart is empty, `DELETE FROM customer_details WHERE table_id = ? AND bill_id IS NULL` removes the unsaved row

**Stale-data fix — `completed` flag:**
Previously, after completing a bill the cart row in `table_carts` keeps `bill_id` set (status changes to COMPLETED but row is not deleted). The GET endpoint was finding the old customer row via that stale `bill_id`. Fixed by:

- `getCustomerController` now excludes rows where `completed = 1`
- `markComplete` runs `UPDATE customer_details SET completed = 1 WHERE bill_id = ?`
- `qsrComplete` runs `UPDATE customer_details SET completed = 1 WHERE table_id = ?`

**New backend** (`local-api`):

- `saveCustomerController` — `POST /api/cart/customer` — upserts row for table, picks up active bill_id if KOT already done
- `getCustomerController` — `GET /api/cart/customer/:tableType/:tableNo` — returns active session row only (completed=0, scoped to current bill_id or pre-KOT only)
- `deleteCustomerController` — `DELETE /api/cart/customer` — removes pre-KOT row

**Sync to MySQL** (`local-api/src/services/sync.service.ts` + `main-api/src/services/sync.service.ts`):

- `collectCustomerDetailsByBill` + `markCustomerDetailsSynced` added to local-api sync service
- `syncSingleBill` includes `customer_details: [row]` in the bulk POST payload; marks synced after success
- `BulkSyncPayload` and `BulkSyncResult` in main-api updated with `customer_details` field
- `bulkSyncToMySQL` calls `batchInsert` on `customer_details` with columns: `bill_id, table_id, name, email, contact, gst, customer_address, date_of_birth, marriage_date, created_at`

**Invoice** (`local-api/src/utils/invoiceBuilder.ts`):

- `buildInvoiceHtml` accepts optional `CustomerInfo` (name, phone, email, GSTIN, address, DOB, anniversary)
- Prints whichever fields are available — nothing shown if no customer was entered

**Waiter app changes:**

- `MenuSelectScreen.tsx`: 7-field customer form (phone, name, email, GST, address, DOB, anniversary), fixed Save button at bottom, scrollable inputs above
- `useEffect` on modal open → `cartApi.getCustomer()` → pre-fills fields
- `useEffect` on unmount → deletes pre-KOT row only if no order placed AND cart is empty
- `cart.api.ts`: `saveCustomer`, `getCustomer`, `deleteCustomer` API functions added; full return type on `searchCustomers` (all 7 fields)
- `endpoints.ts`: `CUSTOMER_SAVE`, `CUSTOMER_DELETE`, `CUSTOMER(type, no)` added

---

#### Customer Search — Phone & Name (waiter app)

- `searchCustomersController` now searches by **phone OR name** (`contact LIKE ? OR name LIKE ?`)
- Results deduplicated via `GROUP BY contact ORDER BY MAX(id) DESC` — same person's multiple orders return only the most recent entry
- Minimum search length reduced from 3 → 2 characters
- All 7 fields returned (`name, contact, email, gst, customer_address, date_of_birth, marriage_date`); selecting a suggestion fills all inputs
- Fallback to `order_history_bill_view` also searches by name, returns all available fields
- `cartApi.searchCustomers` return type updated to include all 7 fields (was `{ name, contact }` only)
- Name input also triggers the search (alongside phone); shared debounced `triggerSearch` function (350ms)
- Suggestion dropdown: `maxHeight: 180` with internal `ScrollView` — stays compact for few results, scrollable for many
- Dropdown **pins outside the outer ScrollView** while suggestions are visible — stays fixed below the phone input when waiter scrolls the form; reverts to normal scroll layout when suggestions are cleared

---

#### Sync — `order_actions` Not Syncing (bug fix)

**Root cause:** `syncNow` had two separate gaps that left `order_actions` rows permanently stuck at `synced = 0`:

1. **No-pending-bills branch** — called `collectOrphanOrderActions` (only rows with `bill_id = ''` or `NULL`). Actions whose `bill_id` points to an already-synced bill were silently ignored. If there happened to be zero orphans, the function returned early and those actions were never sent.
2. **After the per-bill loop** — `syncSingleBill` collects actions for each pending `bill_id`, but actions created *after* a bill was previously synced (e.g. a waiter opens a running table, generating a new action row) were missed entirely — the bill no longer appears in `pendingBillIds`.

`collectAllOrderActions` (which queries `WHERE menu_code = ? AND synced = 0` with no `bill_id` restriction) existed in the codebase but was never called.

**Fix** (`local-api/src/services/sync.service.ts`):

- No-pending-bills branch: replaced `collectOrphanOrderActions` with `collectAllOrderActions` so every unsynced action is included regardless of `bill_id`
- After the per-bill loop: added a final sweep that calls `collectAllOrderActions` again; by this point the per-bill loop has already marked its actions synced, so only genuinely stranded rows come back and get sent in one final POST

---

### 2026-06-10

#### Sync Reliability — Production Build Fixes

**Root cause fixed — stale bundle:**
The `electron/server/server.js` bundle was built before the sync source files were updated. The packaged app was therefore running an old version of `sync.service.ts` that was missing the startup sweep, COALESCE guards, and dynamic interval. Fixed by full rebuild (`npm run dist:all`).

**MySQL timeout & lock-wait fixes (`main-api`):**

- Added `connectTimeout: 8000` to `createConnection()` in `main-api/src/db/mysql.ts` — MySQL now fails fast (within 8s) if the server is unreachable instead of hanging silently
- Added `SET SESSION innodb_lock_wait_timeout = 8` before every bulk transaction in `bulkSyncToMySQL` — prevents indefinite lock-wait (MySQL default is 50s) when another query holds a table lock
- Changed `INSERT INTO order_history_addons` → `INSERT IGNORE INTO order_history_addons` — prevents duplicate-key crash on sync retry if a previous transaction committed but local-api didn't receive the success response

**Sync service improvements (`local-api`):**

- Axios timeout for `POST /api/sync/bulk` increased from `10000ms` → `30000ms` — gives MySQL enough time to complete the transaction and return a proper response
- Dynamic sync interval: worker ticks every 60 seconds and reads `synching_time` from the SQLite `settings` table each tick; minimum 1 minute; no restart needed to change the interval
- Startup sweep: fires 15 seconds after server start to sync any bills left over from the previous session
- `markSyncDirty()` flag: set on every bill complete / cancel so the background sweep runs immediately on the next tick rather than waiting for the full interval
- `writeSyncLog()`: every sync event (success or failure) is written to the `sync_logs` SQLite table (max 500 rows, oldest trimmed); gives Local Manager pages a persistent history without needing console access
- Human-readable error messages: network errors (`ECONNREFUSED`, `ENOTFOUND`, `ETIMEDOUT`, etc.) surface as "No internet connection — orders will sync automatically when online" instead of raw axios error codes

**New SQLite table — `sync_logs`:**

```sql
CREATE TABLE IF NOT EXISTS sync_logs (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  time         TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  menu_code    TEXT    NOT NULL DEFAULT '',
  status       TEXT    NOT NULL DEFAULT 'info',   -- success | error | info
  message      TEXT    NOT NULL DEFAULT '',
  bills        INTEGER NOT NULL DEFAULT 0,
  kitchen      INTEGER NOT NULL DEFAULT 0,
  error_detail TEXT    NOT NULL DEFAULT ''
);
```

---

#### Local Manager — Sync Pages (new)

Three new pages added under the cashier sidebar → Local Manager:

**Pending Orders (`/local-management/pending-orders`):**

- Table of all unsynced bills: Bill #, Table, Completed At, Items, Amount
- "Sync All (N)" button — triggers an immediate sync POST to `/api/local/sync-now`
- Amber footer shows pending count; empty state shown when everything is synced

**Sync Logs (`/local-management/sync-logs`):**

- History of every sync attempt (last 200 entries from `sync_logs` table)
- Filter chips: All / Success / Errors
- Each entry: status icon, human-readable message, bill/kitchen count badges, error detail
- Clear Logs button with confirmation

**Sync Status (`/local-management/sync-status`):**

- Live dashboard: auto-refreshes every 15 seconds
- Status banner: green (all clear) / amber (pending bills) / red (last sync failed)
- Stat cards: Pending Bills, Pending Kitchen, Pending Actions, Sync Interval
- Sync Now button, last success/error timestamps

**New backend (`local-api`):**

- `local-api/src/controllers/local.controller.ts` — `getPendingOrders`, `getSyncLogs`, `clearSyncLogs`, `triggerSyncNow`, `getSyncOverview`
- `local-api/src/routes/local.routes.ts` — mounted at `/api/local`
- `cashier/src/api/endpoints.ts` — `LOCAL` section added

---

#### Cashier Navbar — Online/Offline Indicator + Refresh Button

**Online/Offline status pill (`Navbar.tsx`):**

- Uses `navigator.onLine` + `online`/`offline` DOM events
- Green pill with pulsing dot when connected; red pulsing pill when offline
- Visible at all times in the top-right navbar — cashier can see internet status without opening Local Manager

**Refresh button (`Navbar.tsx`):**

- Circular arrow icon button next to the status pill
- Calls `window.location.reload()` — useful in the production build when data doesn't appear after a pull

---

#### Auto-Pull on Startup (`MainLayout.tsx`)

When the cashier app loads (or navigates to any main page), a `useEffect` checks whether the last auto-pull was more than 30 minutes ago. If so, it silently fires all pull endpoints in the background in parallel:

- `restaurantApi.refresh()` — restaurant details
- `tableApi.refreshTables()` — table layout
- `menuApi.refreshAllMenu()` — products, categories, platforms
- `pullApi.pullAll()` — settings, logins, access menu, order settings

Timestamp stored in `localStorage` key `restosoft_auto_pull_time`. No loading state shown to the cashier — happens completely in the background.

---

### 2026-06-09

#### Inventory — Bug Fixes & UI Corrections

**StockInspection.tsx — redesigned to match old PHP UI:**

- Gradient title badge (`#f06292 → #e91e63`)
- UOM dropdown now shows all 4 options (g / Kg / ml / L) for non-piece ingredients — was only showing 2
- `changeUom()` converts the displayed value when UOM is switched (e.g. switching from Kg → g multiplies × 1000)
- Status column shows numeric difference (`2.500 Kg`, `250 g`) instead of a text label
- Submit converts displayed value back to Kg/L via `toLargeUnit()` before sending to local-api

**Transactions.tsx — multiple fixes:**

- STATUS_META corrected to match old PHP `stock_trans.status` codes exactly:
  - 1 = Stock Loaded by Outlet
  - 2 = Stock Issue by Ingredient
  - 3 = Stock Issue by Recipe (auto-deduction on bill complete)
  - 4 = Wastage by Ingredient
  - 5 = Stock Return
  - 6 = Stock Inspection
  - 7 = Stock Issue by Product
  - 8 = Wastage by Product
  - 9 = Stock Loaded by Warehouse
- Custom single-select `FilterDropdown` component — pink gradient, matches old PHP; click-outside closes via `useRef`
- Status filter bug fixed: Axios was serializing `[7]` as `status[]=7` in the URL which the controller ignored; changed to send a single `number`, not an array
- Expanded inspection rows now show correct column headers: **IID / Ingrd Name / Old Stock / Inspection Stock / Difference**
- Non-inspection row unit display fixed: UOM code 1=g, 2=Kg, 3=ml, 4=L, 5=Pc (matches `stock_trans.uom`)

**StockEntry.tsx — critical Kg/g bug fixed:**

- Root cause: `uom: r.uom` was sending the ingredient type (`1` = weight ingredient) instead of the entry unit code. The backend received `1` (= grams) and divided by 1000 — so 500 Kg was stored as 0.500 Kg.
- Fix: new `entryUomCode(uomKey)` function maps `"1_kg"→2`, `"1_g"→1`, `"1_L"→4`, `"1_ml"→3`, `"2_pc"→5` — matching old PHP `stock_trans.uom` where 2=Kg and 4=L (large units, no division).
- Phone input now enforces digits-only + max 10 characters, matching MySQL `vendor_profiles.vphone VARCHAR(10)`

**inventory.api.ts + inventory.controller.ts:**

- `getTransactions(status?)` now accepts and sends a single `number`, not `number[]`
- Controller: `statusFilter = status !== undefined ? [Number(status)] : undefined`

**inventorySync.service.ts — sync crash fix:**

- MySQL `vendor_profiles.vphone` is `VARCHAR(10)`. A vendor created locally with a longer phone number was crashing every sync with `Data too long for column 'vphone' at row 1`.
- Fix: `vphone` is now truncated to 10 chars before sending to main-api.
- After a successful push, the service pulls the latest vendors from the server and upserts them locally so additions from other terminals are available.

---

### 2026-06-08

#### Desktop Build — Self-Contained App (local-api embedded in Electron)

The Electron app now **embeds local-api** inside the package. No separate server process is needed on any machine.

**How it works (`electron/main/index.js`):**

- On startup, `utilityProcess.fork()` launches `electron/server/server.js` (the bundled local-api) as a background utility process
- Env vars injected at fork time: `SQLITE_DIR` (userData), `MAIN_API_URL`, `JWT_SECRET`, `SQLITE_DB_NAME`, `CASHIER_DIST_PATH`
- Main window polls `localhost:5001` (up to 25s) before opening — ensures the server is ready
- Window loads `http://localhost:5001` — local-api serves both the cashier SPA and all API routes

**Build changes:**

- `build:server` now outputs to `electron/server/server.js` (into the electron folder so it gets asar-packed)
- `asarUnpack` added for `electron/server/server.js` and `**/node_modules/better-sqlite3/**/*` — both are unpacked from the asar so native module resolution works correctly
- `npmRebuild: true` — electron-builder downloads pre-built `better-sqlite3` binaries for the target platform (Linux x64, Windows x64)
- Electron downgraded from **42 → 33**: `better-sqlite3@12.10.0` does not have pre-built binaries for electron 42's V8 ABI (146) and fails to compile against V8 13's `External::Value()` API change. Electron 33 (Chrome 130, V8 12.8) is the last version before this breaking change.
- Added `dist:all` script to build Linux AppImage + Windows zip in one command
- SQLite stored at `app.getPath("userData")/sqlite/` — survives app updates and installs to a safe writable location

**Multi-machine setup:**

- **Main server machine**: leave IP empty on login → uses `localhost:5001` → owns the SQLite DB
- **Other cashier machines**: enter main server's IP → connects to `http://{ip}:5001`

---

#### `order_actions_tid_change` — Removed `menu_code` Column

The `menu_code` column was removed from the `order_actions_tid_change` audit table. This table records table-change, merge, and item-move events; `menu_code` was redundant since events are always per-restaurant.

- `db.ts`: `CREATE TABLE` updated; startup migration detects old schema via `PRAGMA table_info`, recreates table, and migrates existing rows
- `tables.service.ts`: `recordTidChange()` signature no longer takes `menu_code`; all three call sites (`changeTable`, `mergeTables`, `moveItems`) updated
- `sync.service.ts`: `collectAllTidChanges()` and `markTidChangesSynced()` no longer filter by `menu_code`; background sweep union removed the old `menu_code` branch

---

#### Cashier — OrderCart Stale Items After Move (socket fix)

When items were moved from one table to another, the source table's OrderCart page was still showing the moved items. The socket handler for `TABLE_STATUS_UPDATED` had a table comparison that could silently pass even for unrelated updates.

**Fix (`cashier/src/hooks/useOrderCart.ts`):** Removed the comparison entirely — any `TABLE_STATUS_UPDATED` event now unconditionally triggers a fresh `fetchCart()` from the server. This ensures the displayed cart always reflects the actual SQLite state.

---

#### `kot_batches` Not Cleaned on Partial Item Move (backend fix)

When some (not all) items were moved from a table, the source cart's `kot_batches` column was not updated — moved items remained visible in the source table's KOT history in the cashier.

**Fix (`local-api/src/services/tables.service.ts` → `moveItems`):** After filtering `remainingItems`, the source `kot_batches` is now also filtered: each batch has its `items` array filtered to remove moved `cartItemId`s; empty batches are dropped. The UPDATE writes the cleaned `kot_batches` back to the source cart row.

---

#### Database Page — New Tables Added

Three tables added to the Local Manager → Database section:

| Table                        | Group       | Clearable |
| ---------------------------- | ----------- | --------- |
| `order_actions_tid_change` | Live Orders | Yes       |
| `recipe`                   | Inventory   | Yes       |
| `secure_store`             | Config      | No (auth) |

Two new unsynced sub-counts added: **Unsynced Move/Merge** and **Unsynced Recipes**.

---

#### Main-API Deployment Fixes

Issues encountered and fixed when deploying `main-api` to the production server (`mainapi.restosoftindia.org`):

- **`ERR_ERL_UNEXPECTED_X_FORWARDED_FOR`**: Added `app.set("trust proxy", 1)` to `main-api/src/server.ts` so express-rate-limit reads the real client IP via nginx's `X-Forwarded-For` header instead of throwing
- **MySQL ETIMEDOUT**: `ecosystem.config.js` on the server had a typo — `MYSQL_PORT: "3036"` instead of `"3306"`. Fixed by correcting the port and running `pm2 delete main-api && pm2 start ecosystem.config.js`
- **`interpreter` field misplaced**: `interpreter: "bun"` was inside the `env` block in `ecosystem.config.js` (treated as an env var). Moved to the app-level config where it belongs
- **PM2 env not reloading**: `pm2 restart <id>` without `--update-env` does not pick up changes from `ecosystem.config.js`. Full delete + start is the reliable fix
- **Better error surfacing**: `main-api/src/controllers/auth.controller.ts` now wraps `loginToMySQL` in try-catch and returns the actual DB error message (previously returned a generic 500)

---

#### TypeScript Fix — `useOrderCart.ts`

`cancelApi.cancelItems / cancelQty / cancelBill` expect `eid: string` but `useOrderCart` receives `eid?: string`. Fixed all three call sites with `eid: eid ?? ""`.

---

### 2026-06-06

#### Waiter App — Long-Press Bottom Sheet (HomeScreen)

- Long-press on any `running` or `invoiced` table card opens an animated bottom sheet
- Sheet slides up from the bottom with `Easing.out(Easing.cubic)` at 260ms; closes with `Easing.in(Easing.cubic)` at 180ms; semi-transparent overlay fades in simultaneously
- Long press is **blocked** on `available` and `loaded` tables
- Sheet actions:
  - **View KOT** — navigates to `CartScreen` in `mode='kot'` to view the current kitchen order
  - **Invoice** — calls `POST /api/cart/invoice` then fires `POST /api/cart/print-invoice` (fire-and-forget)
  - **Merge Tables** — stub, disabled (amber, for future use)
  - **Complete** — shows confirmation alert → calls `POST /api/cart/complete` with empty payment → closes sheet on success

**New waiter-app API functions** (`waiter-app/src/api/cart.api.ts`):

- `markInvoice(tableType, tableNo)` → `{ isSuccess, cart?, token_no? }`
- `printInvoice(tableType, tableNo)` → `{ isSuccess }`
- `completeOrder(tableType, tableNo)` → calls `POST /api/cart/complete` with `payment: {}`

**New endpoints** (`waiter-app/src/constants/endpoints.ts`):

- `CART.INVOICE`, `CART.PRINT_INVOICE`, `CART.COMPLETE`

**New file:** `waiter-app/src/api/cancel.api.ts` — cancel item / qty / bill API calls from waiter app

---

#### Employee Names on KOT, Cancel KOT, and Invoice Prints (all clients)

**local-api** (`local-api/src/utils/`):

- **`employeeName.ts`** (new) — `resolveEmployeeName(menuCode, eid)`: looks up employee display name; tries `offline_waiters` first (`tablet_N` eids), then `offline_users` (`pos_N` eids), then `logins` POS entries
- **`invoiceBuilder.ts`** (new) — port of cashier's `buildInvoiceHtml`, adapted for `InvoiceTemplateRow` type from local-api; signature includes `cashierName?` param

**KOT (`local-api/src/utils/kotBuilder.ts`):**

- `buildKotHtml` extended: added `kotBy?: string` as 8th param → renders `KOT By: <b>name</b>` after the first divider
- `buildCancelKotHtml` extended: added `cancelBy?: string` as 8th param → renders `Cancelled By: <b>name</b>` after reason line

**Cashier (`cashier/src/print/`):**

- `kotBuilder.ts` — `buildKotHtml` added `kotBy?: string` as 9th param (after `customerInfo`)
- `cancelKotBuilder.ts` — `buildCancelKotHtml` added `cancelBy?: string` as 8th param
- `useOrderCart.ts` — all 6 `buildKotHtml` call sites and all 3 `buildCancelKotHtml` call sites now pass `cashierName` from `authUser.name`; covers KOT, KOT+Invoice, QSR complete, cancel item, cancel qty, cancel bill

**Cancel controllers** (`local-api/src/controllers/cancel.controller.ts`):

- All three cancel controllers (`cancelItems`, `cancelQty`, `cancelBill`) resolve `cancelBy` via `resolveEmployeeName` from `x-eid` header and pass it to `doPrintCancelKot`

**New invoice print route:**

- `printInvoiceController` added to `cart.controller.ts` — reads cart, fetches template + printer config, builds HTML with `cashierName`, sends to all Invoice printers (`printer_for=1`)
- Route: `POST /api/cart/print-invoice`

**Cashier access list** (`local-api/src/services/printer.service.ts`):

- `getCashiers()` now returns both `offline_users` (role: cashier) and `offline_waiters` (role: waiter) combined, so waiters appear in the printer Access selector

---

#### Printer Settings & KOT Template Overhaul (cashier)

**Template presets:**

- KOT presets reduced from 4 → 3 (removed "Quick Service")
- Invoice presets reduced from 4 → 3 (removed "Express")
- Active preset now highlighted: emerald border + `✓ In Use` badge; active index persisted to `localStorage` (`kot_active_preset`, `invoice_active_preset`)

**Printer edit form** (`cashier/src/pages/cashier/Settings.tsx`):

- **Single top row**: Printer Name (flex-1, dropdown when agent reachable) + Print For (`<select>`) + Paper Width (`<select>` with 58/70/76/80mm presets) + Copies stepper — all on one line
- **Access section**: renamed from "Cashier Access" to "Access"; subtitle shows "(empty = all · cashiers & waiters)"; waiters shown with `🧑‍🍳` prefix; All / None quick-select buttons
- **Platforms section**: All / None quick-select buttons added
- **Category Routing tab removed** (was confusing)

**KOT Layout — new 3-mode system** (replaces old per-printer category assignment):

- `regular` — one combined print with all assigned items (default; unchanged behavior)
- `category_wise` — auto-split: one separate KOT slip per category, no category selection needed
- `custom` — select specific categories; those items print together on this printer; category chips only appear for this mode
- Displayed as 3 card-buttons in the edit form (KOT printers only); previously selected layout highlighted in red
- Printer card shows purple "Category-wise" or "Custom" badge + selected category chips in card view

**KOT layout routing logic:**

- `custom` printers "claim" their cids; uncovered items go to `category_wise` / `regular` printers
- `category_wise` + `custom` combo: kitchen printer auto-splits food categories, bar printer gets only drinks
- Applies identically in `triggerKOTPrint` (cashier) and `printKOTController` (local-api / waiter)

**DB migration** (`local-api/src/db/db.ts`):

- `ALTER TABLE silentprint_printers ADD COLUMN kot_layout TEXT NOT NULL DEFAULT 'regular'` — safe migration, existing printers default to `regular` (unchanged behavior)

---

### 2026-06-05

#### Waiter App — CartScreen & Server-Side KOT Printing

**CartScreen** (`waiter-app/src/screens/CartScreen.tsx` — new):

- Replaces the old `TableScreen`; registered in `MainStack` as route `Cart` with params `{ tableType, tableNo, mode?: 'items' | 'kot' }`
- Displays cart items with qty +/− controls and individual remove buttons; shows subtotal / tax / grand total from live cart
- **KOT mode** (`mode='kot'`): filters list to only items that have `kot_qty > 0` (items already sent to kitchen)
- **Send KOT flow**: calls `markKOT` → then fires `cartApi.printKOT()` in the background (fire-and-forget) so the thermal printer receives the slip without blocking the UI

**Server-side KOT printing** (`local-api/`):

- `local-api/src/utils/kotBuilder.ts` (new) — `buildKotHtml(items, tableType, tableNo, kotNo, template, paperWidth, tokenNo?)` builds the same thermal HTML that the cashier uses; supports template-driven header layout, size inline with item name, addon lines (bold), token number box, optional price column
- `printKOTController` added to `cart.controller.ts` — reads last KOT batch from cart, fetches `kot_template` and `silentprint_printers` config, sends HTML to every printer where `printer_for = 2` (KOT printer) via stealthy-print agent `POST http://{ip}:8181/print`; per-printer copies respected; 5 s `AbortSignal` timeout per request
- Route: `POST /api/cart/print-kot`

**Customer search**:

- `searchCustomersController` — queries `order_history_bill_view` with `contact LIKE %phone%`; returns up to 8 distinct `{name, contact}` pairs ordered by most recent bill
- Route: `GET /api/cart/customers?phone=...`

#### Waiter App — MenuSelectScreen Overhaul

Complete rewrite of `MenuSelectScreen`:

- **SectionList layout**: categories become sections; products displayed in a responsive tile grid (2 / 3 / 4 columns depending on device width)
- **Live cart badges**: fetches cart on mount and on every screen focus; qty badge shown on each product tile from `cartQtyMap`
- **Size + Addon picker modal**: `PickerState` drives a modal for products with multiple sizes or addons — same UX as cashier
- **Customer capture**: name + phone fields in a collapsible panel; phone input debounces 400 ms and calls `GET /api/cart/customers` for autocomplete suggestions shown in a dropdown
- **Item note modal**: long-press a cart item to add kitchen instructions (`instructions` field sent with cart item)
- **Send KOT toggle + footer bar**: "Send KOT" toggle; footer shows item count + total and dispatches place-order flow

#### Waiter App — Navigation Restructure

- `TableScreen` removed from navigation stack (replaced by `CartScreen`)
- `MainStack` now: `Home → MenuSelect → Cart`
- `HomeScreen` table cards updated: `STATUS_CONFIG` map gives each status a distinct colour — loaded = amber, running = blue, invoiced = green, completed = purple (matches cashier desktop)

#### Waiter App — New Files & API

- `waiter-app/src/types/kotTemplate.types.ts` — `KotTemplate` TypeScript interface, `DEFAULT_KOT_TEMPLATE`, `DEFAULT_HEADER_LAYOUT`
- `waiter-app/src/api/printer.api.ts` — `printerApi.getConfig()` and `printerApi.printToAgent(ip, payload)`
- `waiter-app/src/api/cart.api.ts` changes:
  - `addItem` body now `{ tableType, tableNo, item: { pid, sid, cartItemId, … } }` where `cartItemId = "${pid}_${sid}"` so the same product/size increments qty instead of duplicating
  - `getCart(tableType, tableNo)` — new; maps flat local-api fields (`table_type`, `desktop_status`, `tax_amount`, `total`) to the `Cart` interface
  - `printKOT(tableType, tableNo)` — new
  - `searchCustomers(phone)` — new
- `waiter-app/src/constants/endpoints.ts`: added `CART.PRINT_KOT`, `CART.CUSTOMERS`, `PRINTERS.CONFIG`, `KOT_TEMPLATE.GET`

#### `logins_tablet` Schema Fix (waiter login table)

- `tid` column removed from `logins_tablet`; unique constraint changed from `(menu_code, tid)` to `(menu_code, name)`
- `pull.service.ts` — `pullWaiterLogins` no longer inserts/conflicts on `tid`
- `getAllowedTables` fixed for waiters: previously queried `logins_tablet.tid` which no longer exists; now bridges `offline_waiters.eid → user_name → logins_tablet.name` to return the correct `allowed_tables`
- `db.ts` migration: at startup, detects old schema (column `tid` present in `logins_tablet`), drops and recreates the table with the new schema so existing deployments self-heal

---

### 2026-06-04

#### Waiter App — Login Module & Table Section (new app)

New **React Native Android app** (`waiter-app/`) for restaurant waiters. Runs on Android tablets on the floor and connects to the same `local-api` server over Wi-Fi.

**Screens:**

- `LoginScreen` — Server IP entry + username/password login (credentials pre-filled from MMKV on next open)
- `HomeScreen` — Table grid grouped by section with live status via Socket.io; elapsed time shown on running tables; section tab bar for quick navigation; `allowed_tables` restricts visible sections per waiter
- `TableScreen` — Cart view for a specific table: item list with qty +/− controls, addon display, subtotal/tax/total, **Send KOT** button
- `MenuSelectScreen` — Category sidebar + product grid; `allowed_categories` restricts visible categories per waiter; adds items to the shared cart

**Authentication (`local-api` changes):**

- New `POST /api/auth/waiter-login` endpoint — same online-then-offline fallback as cashier login
- New `POST /api/auth/waiter-logout` endpoint
- `localWaiterAuth.service.ts` — saves bcrypt hash + token to `offline_waiters` SQLite table on online success
- `offlineWaiterLogin.service.ts` — validates against `offline_waiters` bcrypt hash when main-api is unreachable
- Waiter `eid` prefixed as `tablet_N` (e.g. `tablet_1`)

**New SQLite tables:**

- `offline_waiters` — waiter credentials (bcrypt hash, token, eid as `tablet_N`, allowed_tables), unique on `(menu_code, user_name)`
- `logins_tablet` — waiter login records pulled from main-api (tid, name, contact, food_court flag)

**Pull service extended:**

- `GET /api/pull/allowed-tables` — returns allowed section keys for a waiter (`?eid=tablet_1`)
- `GET /api/pull/allowed-categories` — returns allowed category IDs for a waiter

**main-api changes:**

- `auth.service.ts` — new service to validate waiter credentials against MySQL `logins_tablet` table
- Pull endpoints extended to serve waiter login data

---

#### Inventory Sync & Recipe Auto-Deduction (inventory bugs fixed — complete)

**SQLite table renames** — all inventory tables now match MySQL column names exactly:

| Old name             | New name            |
| -------------------- | ------------------- |
| `inv_ingredients`  | `stock_ing`       |
| `inv_stock_avi`    | `stock_avi`       |
| `inv_transactions` | `stock_trans`     |
| `inv_vendors`      | `vendor_profiles` |
| `inv_recipe`       | `recipe`          |

Old tables are auto-dropped at startup via `DROP TABLE IF EXISTS`.

**Recipe auto-deduction on bill complete** (`local-api/src/services/recipeDeduction.service.ts`):

- Called from `cart.controller.ts` after every `completeOrder` and `qsrComplete`
- Reads `order_history` items for the bill, looks up `recipe` rows per size (rtype=1) and addon (rtype=2/3)
- Inserts one `stock_trans` row per (order_item, ingredient) with `status = 3`
- Updates `stock_avi` once per ingredient (aggregated delta) in the same transaction
- Idempotent: skips if `status=3` rows already exist for `trans_id = bill_id`
- `pname` and `sname` columns added to `stock_trans` so the web admin can display product/size names

**Inventory sync to MySQL** (`local-api/src/services/inventorySync.service.ts`):

- `syncInventoryNow()` called immediately (fire-and-forget) after every complete / qsr-complete
- Collects all unsynced rows from `stock_ing`, `stock_trans`, `vendor_profiles`, `recipe`
- Sends current `stock_avi` for all affected iids so MySQL stays in sync
- One `POST /api/sync/inventory` to main-api (single transaction)
- Marks rows `synced = 1` only after confirmed success

**main-api** (`main-api/src/services/sync.service.ts`):

- New `POST /api/sync/inventory` endpoint via `syncInventoryController`
- Receives `{ tenant_db, ingredients, transactions, stock_avi, vendors, recipes }` and upserts into MySQL using `INSERT … ON DUPLICATE KEY UPDATE`

**Transaction status codes** (updated):

- 1 = Stock Entry, **3 = Recipe auto-deduction (on bill complete)**, 4 = Kitchen Issue, 5 = Spoilage, 6 = Inspection, 7 = Wastage, 8 = Internal Use

---

### 2026-06-02

#### Order Settings Hook — `useOrderSettings`

- New `cashier/src/hooks/useOrderSettings.ts` — fetches all rows from `rest_orders_settings` at mount and exposes `getSetting(eid, key)` + `getSettingsFor(eid)` helpers for per-cashier setting lookups anywhere in the app

#### Enforce Invoice-First Completion

- Setting `orders_should_be_completed_only_after_invoiced = "1"` for a cashier now blocks the **Complete** button in fine-dine OrderCart until invoice is printed
- If clicked before invoice: orange warning toast shown instead of completing
- Once invoice is printed (`cartStatus = "invoiced"`): Complete proceeds normally
- QSR mode is unaffected

#### Reusable Toast Component

- `cashier/src/components/common/Toast.tsx` — fixed top-right notification, 4 variants (`warning` / `success` / `error` / `info`), auto-dismiss, close button
- `cashier/src/hooks/useToast.ts` — `showToast(msg, type, duration?)` + `hideToast()` state manager
- Usage: `const { toast, showToast, hideToast } = useToast(); {toast && <Toast {...toast} onClose={hideToast} />}`

#### Bulk Sync Architecture

- Replaced 4–7 separate HTTP POSTs per sweep with a single `POST /api/sync/bulk` — one MySQL connection, one transaction, all 7 tables in one round-trip
- `syncNow(menu_code, ctx)` is the single sync function called by both immediate triggers and the background sweep
- Immediate sync fires after every bill complete / QSR complete / cancel — syncs bill + kitchen + addons + cancelled + order_actions + cart_date_time in one POST
- Background sweep (every 2 min) only runs when `syncDirty = true` (set at KOT / complete / cancel)
- `markSyncDirty()` exported from sync.service — called from cart and cancel controllers

#### KOT / Invoice Template Presets

- 4 built-in KOT presets: **Classic** (58mm, full header), **Compact** (48mm, minimal), **Detailed** (80mm, token + price col), **Quick Service** (large KOT# + table only)
- 4 built-in Invoice presets: **Standard** (CGST/SGST breakup), **Simple** (taxes included), **Professional** (80mm, full GST+FSSAI), **Express** (fast-food style)
- Template 1 / 2 / 3 / 4 selector buttons at the top of the designer; clicking loads the preset into the form; the user can then customize and save

#### SQLite Table Normalization & Rename (cache → clean names)

- All `_cache` suffixes removed from table names
- `menu_platforms` (was `menu_platforms_cache`) — normalized to rows: `(menu_code, platform_id, platform_name, platform_group)`
- `menu_categories` (was `menu_categories_cache`) — normalized to rows: `(menu_code, cid, cname, cimage, view, platforms)`
- `app_tables` (was `app_tables_cache`) — renamed, JSON structure kept (complex nested tax + table config)
- `menu_products` (was `menu_products_cache`) — renamed, JSON kept
- `logins` (was `logins_cache`) — renamed
- Migration runs at server startup; old tables auto-dropped after data is copied

#### Unused Tables Dropped

- 6 tables permanently deleted from SQLite: `app_tables_cache`, `menu_platforms_cache`, `menu_categories_cache`, `menu_products_cache`, `cashier_settings_cache`, `access_menu_cache`
- `DROP TABLE IF EXISTS` added to db.ts for any future deployments

#### Custom Table `table_type` Fix (sync bug)

> ⚠️ **Superseded 2026-07-15** — this `menu_platforms`-JOIN approach broke Reports > Custom Tables (bills vanished, since Reports matched by the raw key) and was itself fragile (fell through to the raw key when the name-match missed, which is what caused the MySQL sync failure that prompted the 2026-07-15 fix). The correct numeric id turned out to already exist directly on `custom_table_type.table_type`, no JOIN needed. See the 2026-07-15 entry above for the full story and current behavior.

- **Bug:** Custom floor orders (e.g. "third floor", section `g`) were syncing `table_type = 0` to MySQL instead of the correct platform ID (`34`)
- **Root cause:** `getHistoryTableType("g")` returned `"g"` unchanged; MySQL integer column cast it to 0
- **Fix:** Function now joins `custom_table_type` with `menu_platforms` by name to resolve the correct platform_id — `"g"` → `"third floor"` → platform_id `34`

---

### 2026-06-01

#### Inventory Module (complete — sync pending)

Full inventory management module mirroring the existing PHP inventory system.

**SQLite tables added** (`local-api/src/db/db.ts`):

- `inv_ingredients` — ingredient master (iid, menu_code, iname, uom, safety_uom, safety_value)
- `inv_stock_avi` — current available stock (kg stored in KG, pcs)
- `inv_transactions` — all stock movements; kg_qty stored in grams (user entry × 1000)
- `inv_vendors` — vendor master (vid, vname, vbname, vphone)
- `inv_recipe` — recipe assignments per size/addon (rtype 1=size, 3=addon)

**Transaction status codes:**

- 1 = Stock Entry (increases stock), 4 = Kitchen Issue, 5 = Spoilage, 6 = Inspection, 7 = Wastage, 8 = Internal Use

**KG conversion rule:** User enters qty in KG → stored as grams (× 1000) → `inv_stock_avi.kg` = grams ÷ 1000 → displayed in KG.

**Backend** (`local-api/src/`):

- `services/inventory.service.ts` — all business logic
- `controllers/inventory.controller.ts`
- `routes/inventory.routes.ts` — mounted at `/api/inventory`

**Frontend** (`cashier/src/`):

- `api/inventory.api.ts` — typed API client
- `pages/cashier/inventory/` — 9 pages: `InventoryDashboard`, `InventoryLayout`, `Ingredients`, `StockEntry`, `StockIssue`, `StockInspection`, `AvailableStock`, `Transactions`, `RecipeAssignment`
- Routes registered at `/inventory/*` in `AppRoutes.tsx`
- Navigation added to `navigation.config.ts` as `inventoryNavigation`

**main-api pull endpoints added:**

- `GET /api/pull/inventory` — pulls ingredients, stock_avi, and vendors from MySQL
- `GET /api/pull/order-settings` — pulls all rows from `rest_orders_settings`

**useLocalSync / pull.service.ts:** Extended to support inventory pull as a module.

> **Sync wired (2026-06-04):** Inventory sync to MySQL and recipe auto-deduction on bill complete are now fully implemented. See the 2026-06-04 changelog entry above.

---

### 2026-05-30

#### Reports page — full rebuild

- **Type errors fixed**: prop name mismatch (`group` → `g`) and `JSX.Element` namespace resolved by importing `React`
- **Custom table sections**: `CAST(table_type AS INTEGER)` in the SQL query was converting non-numeric table types (`g`, `v`, `ak`) to `0`, causing them to be excluded from all reports. Removed the cast and rewrote `aggregate()` with an `AggMode` parameter (`'numeric'` / `'nonnumeric'` / `'all'`) so each report type filters correctly
- **Overall tab**: now counts all table types (Fine Dine + every custom section); breakdown shows "Fine Dine / QSR" + each custom section by its real name from `custom_table_type.table_name`
- **Custom tab**: top card heading says "Overall" (combined total); breakdown cards show each custom section by real name (e.g. "first floor", "MANDI") instead of letter codes
- **Fine Dine tab**: breakdown now has **4 cards** — Fine Dine (numeric table IDs), **QSR / Direct Billing** (`DI-` prefix), Take Away (`TA-`), Home Delivery (`HD-`). QSR direct billing orders were previously invisible (missing `DI-` pattern)
- **Item reports**: tax column removed — only shows item price × qty; summary strip also drops the tax tile
- **Amounts**: removed `fmtK` shorthand (`₹1.5k`) — all amounts always show full value (`₹1500.00`)
- **Comments**: every component, helper, and logic block documented for future developers

#### Local Manager — complete overhaul

**UI redesign**

- `LocalManagementLayout.tsx`: dark `slate-900` sidebar with brand header, pink accent bar on active nav item, version footer; container now `h-[calc(100vh-92px)]` with `overflow-hidden` so sidebar stays fixed while content scrolls independently
- `Dashboard.tsx`: professional redesign — `StatCard` tiles with coloured left stripes (green/blue/pink/gray), module cards with left accent stripe per sync state, individual **Pull** button per module card, spinner icon on Pull All button

**Individual module pull**

- `useLocalSync.ts`: added `pullModule(module)` for single-module pull using dedicated API endpoints (`pullSettings`, `pullLogins`, `pullAccessMenu`, `pullCashierSettings`, `restaurantApi.refresh`, etc.); added `pullingModule` state so UI knows which card is loading
- `LocalSyncContext.tsx` *(new)*: React context wrapping `LocalManagementLayout` so sidebar and Dashboard share one sync state instance

**Persistent sync state**

- `results` (array of `SyncResult`) and `lastPulledAt` timestamp now persisted to `localStorage` (`restosoft_sync_results`, `restosoft_sync_last_pulled`) — survive navigation away and back; `markLastPull()` called after every pull (individual or all)
- `lastPulledAt` moved into `useLocalSync` hook and `LocalSyncContext` so it is always available and always persisted

#### Database page — full implementation

- `Database.tsx`: row counts for all 38 SQLite tables grouped into 8 sections (Menu Data, Restaurant & Config, Staff & Access, Templates, Printers, Live Orders, Order History, Unsynced); DB file size via SQLite PRAGMA; proportional bar chart per row; individual **Clear** button per table; **Clear All** button in header; confirm modal before any destructive action; red warning banner when unsynced bills exist; toast on success; auto-logout + redirect to `/` after Clear All so stale cache is never used
- `database.controller.ts` *(new)*: `getDatabaseStats`, `clearTable`, `clearAllTables` (transaction-wrapped)
- `database.routes.ts` *(new)*: `GET /api/database/stats`, `DELETE /api/database/clear/:table`, `DELETE /api/database/clear-all`
- Registered at `/api/database` in `server.ts`
- `database.api.ts` *(new)*: typed API client
- `endpoints.ts`: `DATABASE` section added

#### Logout confirm modal

- `Navbar.tsx`: clicking the logout icon now opens an inline confirm modal ("Are you sure you want to log out?") with Cancel / Yes Logout buttons — no more accidental logouts

---

### 2026-05-29

#### FineDine — Direct Complete Button

- Added a green **Complete** button at the bottom of each table card for tables in `loaded` and `running` status
- Clicking the button opens the payment modal (Cash / Card / UPI / Due) — same modal used for INVOICED tables
- On confirm, calls `POST /api/cart/qsr-complete` — the same endpoint used by QSR mode — which stores items in all required tables (`order_kitchen`, `order_history`, `order_history_bill_view`) and marks the order as paid in a single atomic transaction
- **No KOT or invoice is printed** — this is a silent direct complete intended for fast table turnover
- INVOICED tables keep their existing payment icon flow (`completeOrder`), unchanged

#### `markComplete` — History Items Bug Fix (backend)

- **Root cause:** `markComplete` reads order items from `order_present` (the KOT-stage table). For LOADED tables where KOT was never sent, `order_present` is empty — so the bill was recorded in `order_history_bill_view` but `order_history` got no items, causing "items missing" in order history
- **Fix:** Added a fallback block in `markComplete` (`cart.service.ts`): when no `order_view` rows exist for the bill (i.e., no KOT was done) but `cart.items` is non-empty, items are inserted directly from the cart JSON into `order_history` using the same tax calculation logic as `qsrComplete`
- This fixes the history view for all paths that go through `markComplete` (OrderCart "Complete" button, etc.)

---

### 2026-05-28

#### Responsive Product Grid (OrderCart + DirectBilling)

- Grid columns changed from `lg:grid-cols-4` → `xl:grid-cols-4` so 4-column layout only activates at 1280px+; screens below 1280px (tablets, small laptops) show 3 columns
- Breakpoint summary: `<640px` = 2 cols, `640–1279px` = 3 cols, `1280–1535px` = 4 cols, `1536px+` = 5 cols
- Font size breakpoint aligned: `lg:text-[13px]` → `xl:text-[13px]` so text stays 12px at the 3-column layout
- Product button changed from fixed height (`h-[80px]`) to minimum height (`min-h-[80px]`) — cards now expand vertically for long item names instead of clipping them
- `line-clamp-2` removed from product name span; `break-words` added — full item name always visible regardless of character count
- Applied identically to both `OrderCart.tsx` and `DirectBilling.tsx`

#### FineDine Table Status Colors

- Each table status now has a distinct, unambiguous color (was: loaded and running both yellow)

| Status        | Color                  | Meaning                           |
| ------------- | ---------------------- | --------------------------------- |
| `available` | White                  | Empty table                       |
| `loaded`    | **Amber**        | Items added, KOT not yet sent     |
| `running`   | **Blue**         | KOT sent, in kitchen              |
| `invoiced`  | **Green**        | Invoice printed, awaiting payment |
| `completed` | **Light purple** | Order paid & done                 |

- Icon overlay classes updated: running + invoiced (dark bg) → white overlay; completed (light bg) → dark overlay

#### Clear Loaded Button + ConfirmModal (FineDine)

- Replaced the sync/refresh icon button in the FineDine header with a **"Clear Loaded"** text button
- Clicking opens a modern `ConfirmModal` (amber/warning variant) — no `window.confirm()` browser dialog
- On confirm: calls `DELETE /api/cart/clear-loaded` which finds all `status = 'loaded'` rows in both `table_carts` and `ta_hd_carts` and deletes them, then refreshes table statuses
- Spinner shown in confirm button while the request is in-flight; modal blocks close until done

#### ConfirmModal — Reusable Component

- New component at `cashier/src/components/modals/ConfirmModal.tsx`
- Three variants: `danger` (red), `warning` (amber), `info` (blue)
- Props: `open`, `title`, `message`, `detail` (optional subtext), `confirmLabel`, `cancelLabel`, `variant`, `loading`, `onConfirm`, `onClose`
- Keyboard shortcuts: `Escape` → close, `Enter` → confirm
- Smooth scale-in CSS animation, blurred backdrop
- Import and drop in wherever a destructive confirmation is needed

#### Backend — Clear All Loaded Endpoint

- `cart.service.ts` → `clearAllLoaded(menu_code)`: queries both `table_carts` and `ta_hd_carts` for `status = 'loaded'` rows and calls `clearCart` on each; returns count of cleared slots
- `cart.controller.ts` → `clearAllLoadedController`
- `cart.routes.ts` → `DELETE /api/cart/clear-loaded`
- `endpoints.ts` → `CART.CLEAR_LOADED`
- `cart.api.ts` → `cartApi.clearAllLoaded()`

---

### 2026-05-27

#### Invoice Template System (new feature — complete)

- New `invoice_template` SQLite table with 54 configurable columns (restaurant header, order info, item table, tax system, footer, margins)
- **Backend**: `invoiceTemplate.service.ts` (get/save with UPSERT), `invoiceTemplate.controller.ts`, `invoiceTemplate.routes.ts`, wired at `GET/POST /api/invoice-template`
- **Frontend API**: `invoiceTemplate.api.ts` — full `InvoiceTemplate` TypeScript interface + `DEFAULT_INVOICE_TEMPLATE` + axios client
- **`invoiceBuilder.ts`** fully rewritten as a dynamic template engine:
  - **Layout**: header → `────` → invoice title + order info + customer (top) → `────` → item table → `────` → summary → `────` → footer (customer bottom optional)
  - **Restaurant header**: name, 2-line address, GST, FSSAI, contact, email, website — each toggle-able
  - **Order info grid**: Date (left) | Table No (right), Cashier (left) | Bill No (right), Token No, Order Type — all toggle-able; `info_grid_bold` + `info_grid_size` controls the style
  - **Item table**: configurable Price column (unit) and Amount column (qty × unit); inline size `ITEM (Size)`; addons listed below each item
  - **Tax modes**: `inclusive_breakup` (extract CGST/SGST from inclusive price and show breakdown), `inclusive_hide` (show "taxes included" note only), `exclusive` (base price + tax added on top)
  - **Per-group tax breakdown**: groups items by unique (tax_1, tax_2, tax_3, vat) combination → shows `CGST@2.5%  4.07` etc.
  - **Summary**: Total Qty + Sub Total on one row, tax lines, coupon discount (green), Grand Total (large bold)
  - **Footer**: custom text + FSSAI note at bottom
- **`InvoiceTemplate.tsx`** designer UI: 7 collapsible setting sections + live auto-sizing iframe preview (48/58/75/78/80mm, localStorage width persistence, "SAMPLE RESTAURANT" placeholder when fields are empty)
- `Settings.tsx`: replaced "Coming soon…" placeholder with `<InvoiceTemplate />`
- `useOrderCart.ts`: loads `invoiceTemplate` on mount alongside `kotTemplate`; gets `cashierName` from `useAuth()`; passes both to all three print sites (`markInvoice`, `markKOTAndInvoice`, `qsrComplete`)
- Default template is professional out of the box: info rows bold, all columns on, inclusive + breakdown tax, "Thank You! Visit Again" footer

#### Token Number — fine-dine + QSR (both modes)

- `markKOTController` now queries `custom_token_number` for the bill and returns `token_no` in response
- `markInvoiceController` same — returns `token_no`
- `useOrderCart.ts` reads `response.token_no` from markKOT and markInvoice and passes it to both KOT and invoice print builders
- Removed "QSR only" label from KOT Template designer and Invoice Template designer — token number now labelled "Fine-dine & QSR"
- Toggle in both designers controls print visibility; token only appears on print when both the toggle is ON and the API returns a token for the bill

#### KOT Template Designer improvements

- **Layout fix**: switched `buildRow()` from HTML `<table>` to CSS flexbox 3-column (L/C/R spans) — header elements now render correctly side-by-side without alignment drift
- **Preview iframe fix**: exact `MM_TO_PX = 3.7795` width matching + CSS `transform: scale()` wrapper → no scrollbar, no excess white space
- `previewWidth` now persisted in `localStorage` — survives page refresh
- Token number moved out of Header Layout section into Bottom Section
- Size appended **inline** with item name: `CHICKEN BIRYANI (Half)` instead of `↳ half` on a new line
- Addons rendered bold black (`font-weight:bold; color:#000`) — clearly readable on thermal paper
- `show_item_price` toggle added — optional Price column in KOT item table (off by default)
- Paper width buttons updated: 48 / 58 / 75 / 78 / 80mm (replaced 70/76)

#### DB migrations (additive, non-breaking)

- `kot_template` + `show_item_price INTEGER NOT NULL DEFAULT 0`
- `invoice_template` new table (54 columns, see above)
- `invoice_template` + `info_grid_bold INTEGER NOT NULL DEFAULT 1`
- `invoice_template` + `info_grid_size INTEGER NOT NULL DEFAULT 11`

---

### 2026-05-26

#### Sizes & Addons

- Added `size`, `addon_label`, `addon` SQLite tables mirroring MySQL schema exactly (same column names and data types)
- `saveSizeAddonTables()` normalises embedded product JSON into these tables on every menu refresh
- `SizeAddonModal` component: box-style size selector + checkbox addons with min/max enforcement
- `addToCart` logic: opens modal only when product has multiple sizes OR has addons; otherwise adds directly to cart
- Cart, KOT, and invoice all display selected addons with correct prices
- `order_kitchen_addons` and `order_history_addons` populated on KOT / Complete / QSR Complete
- Addon prices included in totals, tax, and invoice line amounts

#### QSR Mode

- Built `QSR.tsx` — dedicated quick-service page with auto-slot creation, category sidebar, 3-column product grid, full size/addon modal, and a single **Complete ₹X** button
- QSR complete triggers both KOT print and invoice print in one action

#### Direct Billing

- `DirectBilling.tsx` billing section now has full size/addon modal support (was missing previously)
- `OrderCart.tsx` also has modal wired correctly

#### Platform-Based Pricing

- Product buttons in QSR, DirectBilling, and OrderCart now show the price for the **current platform** (fine dine / parcel / delivery / custom floor)
- `custom_table_type` SQLite table added; populated from `custom_table_typee` in products response on menu refresh
- `MenuContext` builds `customPlatformMap` (`table_id → platform_id`) by name-matching `custom_table_type` rows against the `platform.Custom` list
- `useOrderCart` exposes `getSizesForPlatform(product)` — filters `size[]` by `size.splatform` containing the active platform ID; falls back to all sizes if none match
- Platform mapping: `di/dine → 1`, `ta → 3`, `hd → 5`, custom table_id → looked up from `customPlatformMap`

#### Sync: order_history_addons → MySQL

- Added `synced` column to SQLite `order_history_addons`
- `syncBillAddons(bill_id, menu_code)` called immediately after every Complete / QSR Complete (fire-and-forget, same pattern as `syncBill`)
- Background worker also picks up any unsynced addon rows every 2 minutes
- main-api: new `POST /api/sync/order-history-addons` endpoint inserts rows as `(item_id, alid, alname, aid, aname, atype, aprize)` into MySQL

#### SQLite Cleanup

- Removed unused tables: `recents_cache`, `offer_spl_discount`, `offers_link`

---

## Key Hooks & Utilities

| Hook / Utility          | File                                      | Description                                                                                                                                                                                                                                  |
| ----------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useLocale`           | `cashier/src/hooks/useLocale.ts`        | Reads`RestaurantContext`; exposes `formatCurrency`, `formatAmount`, `formatDateTime`, `formatDate`, `formatTime`, `currencySymbol` using the restaurant's `locale`, `currency_code`, and `timezone` from MySQL `users` |
| `useSlotStatuses`     | `cashier/src/hooks/useSlotStatuses.ts`  | Live TA/HD slot status via API + socket; used by Direct Billing and TA/HD order pages                                                                                                                                                        |
| `useOrderSettings`    | `cashier/src/hooks/useOrderSettings.ts` | Fetches`rest_orders_settings`; exposes `getSetting(eid, key)` and `getSettingsFor(eid)`                                                                                                                                                |
| `useToast`            | `cashier/src/hooks/useToast.ts`         | `showToast(msg, type, duration?)` + `hideToast()` — powers `<Toast>` component                                                                                                                                                        |
| `useOrderCart`        | `cashier/src/hooks/useOrderCart.ts`     | All POS actions for one table: add/remove/qty/KOT/invoice/complete + silent print                                                                                                                                                            |
| `useTableStatuses`    | `cashier/src/hooks/useTableStatuses.ts` | Polls`/api/cart/status`, listens to `TABLE_STATUS_UPDATED` socket for live fine-dine table state                                                                                                                                         |
| `resolveEmployeeName` | `local-api/src/utils/employeeName.ts`   | Looks up display name for an eid:`offline_waiters` → `offline_users` → `logins`                                                                                                                                                      |
| `buildKotHtml`        | `local-api/src/utils/kotBuilder.ts`     | Thermal KOT HTML builder; supports`kotBy` name param, token number, size inline, bold addons, price column                                                                                                                                 |
| `buildCancelKotHtml`  | `local-api/src/utils/kotBuilder.ts`     | Thermal cancel-KOT HTML builder; supports`cancelBy` name param                                                                                                                                                                             |
| `buildInvoiceHtml`    | `local-api/src/utils/invoiceBuilder.ts` | Server-side invoice HTML builder (used by waiter app print flow)                                                                                                                                                                             |

---

## Key SQLite Tables

| Table                       | Purpose                                                                                                                                                                                        |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `offline_users`           | Cached credentials for offline login (includes`allowed_tables` column)                                                                                                                       |
| `logins`                  | All cashier login records pulled from main-api (permissions, allowed tables)                                                                                                                   |
| `access_menu`             | Category access per cashier —`eid + cid` pairs that are enabled                                                                                                                             |
| `rest_orders_settings`    | Per-cashier order behaviour settings (e.g. QSR mode, invoice-first enforcement)                                                                                                                |
| `settings`                | App-level global key-value settings — includes`bill_sequence_reset`, `bill_start_number`, `allow_concurrent_sessions`, `synching_time`, and restaurant-level config pulled from MySQL |
| `table_carts`             | Active dine-in table carts                                                                                                                                                                     |
| `ta_hd_carts`             | Active take-away / home-delivery carts                                                                                                                                                         |
| `bill_view`               | Bill headers                                                                                                                                                                                   |
| `order_history`           | All ordered items (pending sync to MySQL)                                                                                                                                                      |
| `order_history_bill_view` | Completed bills (synced flag)                                                                                                                                                                  |
| `silentprint_ip`          | Stealthy-print server IPs                                                                                                                                                                      |
| `silentprint_printers`    | Printer definitions + access                                                                                                                                                                   |
| `size`                    | Product sizes mirroring MySQL`size` (sid, pid, sname, platform, sprize, …)                                                                                                                  |
| `addon_label`             | Addon groups per size mirroring MySQL`addon_label`                                                                                                                                           |
| `addon`                   | Individual addon options mirroring MySQL`addon`                                                                                                                                              |
| `custom_table_type`       | Custom floor/section table types with platform ID mapping                                                                                                                                      |
| `order_kitchen_addons`    | Addons attached to KOT items (no aprize — matches MySQL)                                                                                                                                      |
| `order_history_addons`    | Addons on completed bill items, synced to MySQL with aprize                                                                                                                                    |
| `kot_template`            | Dynamic KOT print layout settings per restaurant (header elements, sizes, margins, date format)                                                                                                |
| `invoice_template`        | Dynamic invoice print layout settings (restaurant header, columns, tax mode, footer)                                                                                                           |
| `slot_discounts`          | Coupon / manual discount per cart slot — persists across page refreshes                                                                                                                       |
| `custom_token_number`     | Token number assigned per bill — used in both QSR and fine-dine print                                                                                                                         |
| `stock_ing`               | Ingredient master — iid, iname, uom, safety_uom, safety_value, synced                                                                                                                         |
| `stock_avi`               | Current available stock per ingredient — kg (in KG), pcs, prize                                                                                                                               |
| `stock_trans`             | All stock movements — kg_qty in raw unit (g/Kg/ml/L/pc), status 1–8 inc. auto-deduct (3), synced                                                                                             |
| `vendor_profiles`         | Vendor master — vid, vname, vbname, vphone, synced                                                                                                                                            |
| `recipe`                  | Recipe assignments — ingredient qty per size (rtype=1) or addon (rtype=2/3), synced                                                                                                           |

---

## Common Issues

### `better-sqlite3` binding not found

```
Error: Could not locate the bindings file.
→ node-v137-linux-x64/better_sqlite3.node
```

Node.js was upgraded. Fix:

```bash
npm rebuild better-sqlite3
```

### Socket connects to `localhost:5001` on client machine

Client machine has no `server_ip` set. On the login page → Server Connection → enter the main computer's IP → click **Set**.

### Prints not coming (stealthy-print ERR_CONNECTION_REFUSED)

The stealthy-print Android app is not running. Open the app on the Android device configured as the print server.

### Windows build fails with "wine is required"

The `signAndEditExecutable: false` flag must be set in `package.json` under `"win"`:

```json
"win": { "target": "zip", "signAndEditExecutable": false }
```

Then build with `CSC_IDENTITY_AUTO_DISCOVERY=false npm run dist:win`.

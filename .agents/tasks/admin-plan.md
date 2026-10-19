# Implementation Plan — ADDY Admin Panel

## Project Context

- **Framework**: Next.js 15 (App Router), React 19, TypeScript 5 (strict)
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"` in globals.css) — NO config file, CSS variables defined via `@theme` block
- **CSS variables available**: `--color-brand` (#ff385c), `--color-brand-dark` (#e61e4d), `--color-ink` (#0f1115), `--color-ink-2`, `--color-ink-3` (#484f58), `--color-line` (#e6e8eb), `--color-line-2` (#f2f3f5), `--color-sand` (#faf8f4)
- **Tailwind v4 usage pattern**: `text-ink`, `bg-brand`, `border-line` etc. work directly as utility classes because variables are declared in `@theme`. For arbitrary CSS var references use `[color:var(--color-line)]` syntax as seen in existing components.
- **Path alias**: `@/` → project root (set in tsconfig.json paths)
- **Build commands**: `npm run build` (next build), `npm run typecheck` (tsc --noEmit)
- **No new npm packages** — pure Tailwind + React

---

## Step 1 — Append admin types and mock data to `lib/data.ts`

**What to do**: Append (never overwrite) three new exports to the bottom of `lib/data.ts`: the `Order` type, a `ORDERS` array with 12 mock orders, and an `ADMIN_STATS` object. Prices in the existing products use `₹ 1,899` string format — keep numeric values for order totals (number, not string) so arithmetic is clean.

**Files**: `c:\Users\Adarsh\Desktop\agency\clothe-store\lib\data.ts` (append only)

**Exact content to append**:

```typescript
// ─── Admin types & mock data ─────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type Order = {
  id: string;
  customer: { name: string; email: string };
  items: { productId: string; title: string; qty: number; price: number }[];
  total: number;
  status: OrderStatus;
  date: string;          // ISO date string e.g. "2025-06-01"
  paymentMethod: string; // e.g. "UPI", "Credit Card", "COD", "Debit Card"
};

export const ORDERS: Order[] = [
  {
    id: "ORD-1001",
    customer: { name: "Rahul Sharma", email: "rahul.sharma@gmail.com" },
    items: [
      { productId: "p1", title: "Naruto: Akatsuki (Raglan)", qty: 1, price: 1899 },
      { productId: "p8", title: "Cult Classics: Stripes", qty: 1, price: 1599 },
    ],
    total: 3498,
    status: "delivered",
    date: "2025-05-28",
    paymentMethod: "UPI",
  },
  {
    id: "ORD-1002",
    customer: { name: "Priya Nair", email: "priya.nair@outlook.com" },
    items: [
      { productId: "p6", title: "Spider-Man: Face Off (Raglan)", qty: 2, price: 1899 },
    ],
    total: 3798,
    status: "shipped",
    date: "2025-05-30",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-1003",
    customer: { name: "Amit Verma", email: "amit.verma@yahoo.com" },
    items: [
      { productId: "p11", title: "The Linen Life: Oversized Shirts", qty: 1, price: 2299 },
      { productId: "p4", title: "Vintage 1996: Stripes Shirts", qty: 1, price: 1899 },
    ],
    total: 4198,
    status: "processing",
    date: "2025-06-01",
    paymentMethod: "Debit Card",
  },
  {
    id: "ORD-1004",
    customer: { name: "Sneha Gupta", email: "sneha.gupta@gmail.com" },
    items: [
      { productId: "p2", title: "Superman: Strength In Blue", qty: 1, price: 1499 },
    ],
    total: 1499,
    status: "pending",
    date: "2025-06-03",
    paymentMethod: "UPI",
  },
  {
    id: "ORD-1005",
    customer: { name: "Karan Mehta", email: "karan.mehta@gmail.com" },
    items: [
      { productId: "p10", title: "Spider-Man: Web Slinger Joggers", qty: 1, price: 2299 },
      { productId: "p9", title: "Dragon Ball Z: Gohan Oversized T-Shirt", qty: 1, price: 1299 },
    ],
    total: 3598,
    status: "delivered",
    date: "2025-05-22",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-1006",
    customer: { name: "Divya Reddy", email: "divya.reddy@hotmail.com" },
    items: [
      { productId: "p16", title: "Spider-Man: Venom (Raglan)", qty: 1, price: 1599 },
      { productId: "p13", title: "Spider-Man: Web Slinger (Raglan)", qty: 1, price: 1599 },
    ],
    total: 3198,
    status: "cancelled",
    date: "2025-05-18",
    paymentMethod: "COD",
  },
  {
    id: "ORD-1007",
    customer: { name: "Arjun Pillai", email: "arjun.pillai@gmail.com" },
    items: [
      { productId: "p5", title: "Streetwise - Pro Wolf", qty: 1, price: 1999 },
    ],
    total: 1999,
    status: "shipped",
    date: "2025-06-02",
    paymentMethod: "UPI",
  },
  {
    id: "ORD-1008",
    customer: { name: "Neha Singh", email: "neha.singh@gmail.com" },
    items: [
      { productId: "p12", title: "Dragon Ball Z: Goku Oversized T-Shirts", qty: 2, price: 1399 },
      { productId: "p7", title: "DC: Justice League Playing Cards", qty: 1, price: 899 },
    ],
    total: 3697,
    status: "delivered",
    date: "2025-05-15",
    paymentMethod: "Debit Card",
  },
  {
    id: "ORD-1009",
    customer: { name: "Vikram Joshi", email: "vikram.joshi@outlook.com" },
    items: [
      { productId: "p14", title: "Plaid Story: Checked Shirts", qty: 1, price: 1599 },
      { productId: "p15", title: "TSS Originals: Trident", qty: 1, price: 1499 },
    ],
    total: 3098,
    status: "processing",
    date: "2025-06-04",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-1010",
    customer: { name: "Anjali Desai", email: "anjali.desai@gmail.com" },
    items: [
      { productId: "p3", title: "Pineapple Stripes 7.0 Oversized T-Shirts", qty: 1, price: 1299 },
    ],
    total: 1299,
    status: "pending",
    date: "2025-06-05",
    paymentMethod: "UPI",
  },
  {
    id: "ORD-1011",
    customer: { name: "Rohan Kapoor", email: "rohan.kapoor@gmail.com" },
    items: [
      { productId: "p1", title: "Naruto: Akatsuki (Raglan)", qty: 1, price: 1899 },
      { productId: "p6", title: "Spider-Man: Face Off (Raglan)", qty: 1, price: 1899 },
      { productId: "p9", title: "Dragon Ball Z: Gohan Oversized T-Shirt", qty: 1, price: 1299 },
    ],
    total: 5097,
    status: "delivered",
    date: "2025-05-10",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-1012",
    customer: { name: "Meera Iyer", email: "meera.iyer@yahoo.com" },
    items: [
      { productId: "p11", title: "The Linen Life: Oversized Shirts", qty: 1, price: 2299 },
    ],
    total: 2299,
    status: "shipped",
    date: "2025-06-06",
    paymentMethod: "COD",
  },
];

export const ADMIN_STATS = {
  totalRevenue: 36278,       // sum of all ORDERS totals
  totalOrders: 12,
  totalProducts: 16,
  totalCustomers: 12,
  revenueGrowth: 18.4,       // percentage, positive = growth
  ordersGrowth: 12.5,
};
```

**Verify**: `npm run typecheck` — zero TypeScript errors.

---

## Step 2 — Create `middleware.ts` at project root

**What to do**: Create the Next.js middleware file that protects all `/admin/*` routes except `/admin/login`. Uses `NextResponse` and `request.cookies.get()`. The matcher must exclude static files and Next.js internals.

**Files**: `c:\Users\Adarsh\Desktop\agency\clothe-store\middleware.ts` (create new)

**Exact content**:

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page through unconditionally
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const adminCookie = request.cookies.get("addy_admin");

  if (!adminCookie || adminCookie.value !== "true") {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

**Verify**: `npm run typecheck` — zero errors.

---

## Step 3 — Create `app/admin/login/page.tsx`

**What to do**: Standalone login page (no main site Header/Footer). "use client". Renders a centered card with ADDY branding, email + password inputs, and submit button. On submit: check `email === 'admin@addy.com'` and `password === 'admin123'`; if correct set `document.cookie = "addy_admin=true; path=/; max-age=86400"` then call `router.push('/admin')`; otherwise show an error message below the form. Uses `useRouter` from `next/navigation`.

**Files**: `c:\Users\Adarsh\Desktop\agency\clothe-store\app\admin\login\page.tsx` (create new)

**Implementation notes**:
- `"use client"` directive at top
- Import `useRouter` from `"next/navigation"`; import `useState` from `"react"`
- State: `email: string`, `password: string`, `error: string`, `loading: boolean`
- The page must NOT import Header or Footer
- Full-screen layout: `min-h-screen bg-[color:var(--color-line-2)] flex items-center justify-center`
- Card: `bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm`
- ADDY logo block at top of card (matches existing logo pattern — circle with "A" + ADDY text + "Wear Your Story")
- Label + input pairs for email and password; password input type="password"
- Input classes match existing project style: `w-full border border-[color:var(--color-line)] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand transition-colors`
- Submit button: `w-full bg-brand hover:bg-brand-dark text-white font-bold py-2.5 rounded-lg transition-colors`
- Error: `text-sm text-red-500 text-center mt-2` — only rendered when `error` is non-empty
- On loading, disable button and show "Signing in…" text

**Verify**: `npm run typecheck` — zero errors. Visual check: navigate to `/admin/login`.

---

## Step 4 — Create `app/admin/layout.tsx`

**What to do**: Admin shell layout. "use client". Provides a fixed 240px left sidebar on desktop (lg+) and a slide-in drawer on mobile. The main content area sits to the right of the sidebar and is independently scrollable. Does NOT render the main site Header or Footer. Wraps all `/admin/*` pages.

**Files**: `c:\Users\Adarsh\Desktop\agency\clothe-store\app\admin\layout.tsx` (create new)

**Implementation notes**:

State: `sidebarOpen: boolean` (controls mobile drawer)

**Sidebar nav items** (label → href → SVG icon description):
1. Dashboard → `/admin` → grid/home icon
2. Products → `/admin/products` → tag/box icon
3. Orders → `/admin/orders` → shopping bag icon
4. Customers → `/admin/customers` → users icon
5. Analytics → `/admin/analytics` → bar chart icon
6. Settings → `/admin/settings` → gear/cog icon

Each nav item renders an `<a>` tag (not `Link` — Link from next/link is fine too, prefer `<a>` to avoid client-side prefetching complexity). Use `usePathname()` from `next/navigation` to detect active route. Active item: `bg-brand/10 text-brand` with `font-semibold`. Inactive: `text-ink-3 hover:bg-[color:var(--color-line-2)] hover:text-ink`.

**SVG icons**: Inline 20×20 SVGs, `fill="none"`, `stroke="currentColor"`, `strokeWidth="1.7"`. Use simple geometric shapes:
- Dashboard: 4-square grid (`M3 3h7v7H3z M13 3h7v7h-7z M3 13h7v7H3z M13 13h7v7h-7z` or similar)
- Products: tag shape (`M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z` + `M7 7h.01`)
- Orders: shopping bag (`M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z` + `M3 6h18` + `M16 10a4 4 0 01-8 0`)
- Customers: two people (`M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2` + `M23 21v-2a4 4 0 00-3-3.87` + `M16 3.13a4 4 0 010 7.75` + circle `M9 7`)
- Analytics: bar chart (`M18 20V10` + `M12 20V4` + `M6 20v-6`)
- Settings: cog (`M12 2a10 10 0 100 20A10 10 0 0012 2z` simplified or use a proper gear path with `M12 15a3 3 0 100-6 3 3 0 000 6z`)

**Layout structure**:
```
<div class="flex h-screen bg-[color:var(--color-line-2)] overflow-hidden">
  {/* Mobile overlay */}
  {sidebarOpen && <div class="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />}

  {/* Sidebar */}
  <aside class="
    fixed inset-y-0 left-0 z-30 w-60 bg-white border-r border-[color:var(--color-line)] flex flex-col
    transform transition-transform duration-300
    lg:translate-x-0 lg:static lg:z-auto
    {sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
  ">
    {/* Sidebar header: ADDY Admin branding */}
    {/* Nav items list */}
    {/* Bottom: version/logout placeholder */}
  </aside>

  {/* Main area */}
  <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
    {/* Topbar */}
    <header class="h-16 bg-white border-b border-[color:var(--color-line)] flex items-center px-4 gap-4 shrink-0">
      {/* Hamburger (mobile only) */}
      {/* Breadcrumb or page title placeholder */}
      {/* Spacer */}
      {/* Notification bell */}
      {/* Admin avatar: circle with "A" initials, bg-brand text-white */}
    </header>

    {/* Scrollable content */}
    <main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
      {children}
    </main>
  </div>
</div>
```

Sidebar header: show the ADDY logo (same small variant used in Header.tsx — circle with "A" + "ADDY Admin" text).

Topbar notification bell: inline SVG bell icon, no functionality needed.

Admin avatar: `<div class="w-9 h-9 rounded-full bg-brand text-white font-bold text-sm grid place-items-center">AD</div>`

**Important**: This file must export a default function that accepts `{ children: React.ReactNode }` — NOT `Metadata` (since it's `"use client"`).

**Verify**: `npm run typecheck` — zero errors. Visit any `/admin/*` route and confirm sidebar renders.

---

## Step 5 — Create `app/admin/page.tsx` — Dashboard

**What to do**: Dashboard page. "use client". Imports `ADMIN_STATS`, `ORDERS`, `MAIN_PRODUCTS` from `@/lib/data`. Shows 4 stat cards, a recent orders table (last 5 by date), and top products (first 4 from MAIN_PRODUCTS).

**Files**: `c:\Users\Adarsh\Desktop\agency\clothe-store\app\admin\page.tsx` (create new)

**Stat cards** — 4 cards in a `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8`:

| Card | Value | Growth field | Icon description |
|------|-------|-------------|-----------------|
| Total Revenue | `₹ ${ADMIN_STATS.totalRevenue.toLocaleString('en-IN')}` | `revenueGrowth` | currency/rupee symbol |
| Total Orders | `ADMIN_STATS.totalOrders` | `ordersGrowth` | shopping bag |
| Total Products | `ADMIN_STATS.totalProducts` | — (no badge) | tag |
| Total Customers | `ADMIN_STATS.totalCustomers` | — (no badge) | users |

Card structure:
```
<div class="bg-white rounded-xl p-6 border border-[color:var(--color-line)] flex items-start justify-between">
  <div>
    <p class="text-xs font-semibold uppercase tracking-widest text-ink-3">{label}</p>
    <p class="text-2xl font-black text-ink mt-1">{value}</p>
    {growth && <span class="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">↑ {growth}%</span>}
  </div>
  <div class="w-11 h-11 rounded-xl bg-[color:var(--color-line-2)] grid place-items-center text-ink-3">
    {icon}
  </div>
</div>
```

**Recent Orders table** — `ORDERS.slice().sort((a,b) => b.date.localeCompare(a.date)).slice(0, 5)`:

Section heading: `<h2 class="text-base font-bold text-ink mb-4">Recent Orders</h2>`

Table wrapper: `<div class="bg-white rounded-xl border border-[color:var(--color-line)] overflow-hidden mb-8">`

Table columns: `Order ID | Customer | Items | Total | Status | Date`
- Order ID: `font-mono text-xs text-ink-3`
- Customer: customer.name, `text-sm font-semibold text-ink`
- Items: `items.length` count + " item(s)", `text-sm text-ink-3`
- Total: `₹ ${order.total.toLocaleString('en-IN')}`, `text-sm font-bold text-ink`
- Status: `<StatusBadge status={order.status} />`
- Date: formatted as `dd MMM yyyy` using `new Date(order.date).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })`

**StatusBadge component** (define once in this file, reuse in orders page by copy):
```typescript
const STATUS_STYLES: Record<OrderStatus, string> = {
  pending:    "bg-yellow-50 text-yellow-700 border-yellow-200",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
  shipped:    "bg-purple-50 text-purple-700 border-purple-200",
  delivered:  "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled:  "bg-red-50 text-red-700 border-red-200",
};

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}
```

**Top Products section** — `MAIN_PRODUCTS.slice(0, 4)`:

Section heading: `<h2 class="text-base font-bold text-ink mb-4">Top Products</h2>`

Grid: `grid grid-cols-2 md:grid-cols-4 gap-4`

Card:
```
<div class="bg-white rounded-xl border border-[color:var(--color-line)] overflow-hidden">
  <div class="aspect-[4/3] bg-[color:var(--color-line-2)]">
    <img src={p.image} alt={p.title} class="w-full h-full object-cover" />
  </div>
  <div class="p-3">
    <p class="text-xs font-semibold text-ink line-clamp-2">{p.title}</p>
    <p class="text-sm font-bold text-ink mt-1">{p.price}</p>
    <p class="text-[10px] text-ink-3 mt-0.5">Sales: {randomSalesCount}</p>
  </div>
</div>
```
Sales counts: hardcode `[142, 98, 87, 63]` mapped by index.

**Verify**: `npm run typecheck` && `npm run build` — zero errors.

---

## Step 6 — Create `app/admin/products/page.tsx` — Products Management

**What to do**: Products management page. "use client". Uses local state initialized from `MAIN_PRODUCTS`. Features: search bar, Add Product button, table with all products, inline modal for add/edit, delete confirm dialog.

**Files**: `c:\Users\Adarsh\Desktop\agency\clothe-store\app\admin\products\page.tsx` (create new)

**State**:
```typescript
const [products, setProducts] = useState<Product[]>(MAIN_PRODUCTS);
const [search, setSearch] = useState("");
const [modalOpen, setModalOpen] = useState(false);
const [editingProduct, setEditingProduct] = useState<Product | null>(null);
const [deleteId, setDeleteId] = useState<string | null>(null);
const [form, setForm] = useState<Omit<Product, "id"> & { id?: string }>({
  title: "", subtitle: "", price: "", image: "", originalPrice: "", badge: "", tags: []
});
```

**Filtered products**: `products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.subtitle.toLowerCase().includes(search.toLowerCase()))`

**Header row**:
```
<div class="flex items-center justify-between mb-6 gap-4">
  <div>
    <h1 class="text-xl font-black text-ink">Products</h1>
    <p class="text-sm text-ink-3">{products.length} products total</p>
  </div>
  <div class="flex items-center gap-3">
    <input type="text" placeholder="Search products…" value={search} onChange={...} class="border border-[color:var(--color-line)] rounded-lg px-4 py-2 text-sm outline-none focus:border-brand w-56 transition-colors" />
    <button onClick={() => openAddModal()} class="bg-brand hover:bg-brand-dark text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
      + Add Product
    </button>
  </div>
</div>
```

**Table**: `<div class="bg-white rounded-xl border border-[color:var(--color-line)] overflow-hidden">`

Table columns: `Thumbnail | Title & Subtitle | Price | Original Price | Badge | Tags | Actions`
- Thumbnail: `<img src={p.image} class="w-12 h-12 object-cover rounded-lg bg-[color:var(--color-line-2)]" />`, wrapped in a `td` with `w-16`
- Title: `<div class="font-semibold text-sm text-ink">{p.title}</div><div class="text-xs text-ink-3">{p.subtitle}</div>`
- Price: `text-sm font-bold text-ink`
- Original Price: `text-sm text-ink-3 line-through` — or "—" if absent
- Badge: `text-xs` pill with `bg-[color:var(--color-line-2)] text-ink-3 px-2 py-0.5 rounded` — or "—" if absent
- Tags: up to 2 tags shown as small pills `bg-[color:var(--color-line-2)] text-ink-3 text-[10px] px-1.5 py-0.5 rounded mr-1`
- Actions: two icon-buttons — Edit (pencil SVG, `text-blue-500 hover:text-blue-700`) and Delete (trash SVG, `text-red-400 hover:text-red-600`)

**Edit**: `openEditModal(p: Product)` → sets `editingProduct = p`, populates `form` with product data (tags joined as comma-sep string in a separate `tagsInput` state), sets `modalOpen = true`.

**Delete**: clicking trash sets `deleteId = p.id`. Renders a confirm dialog overlay:
```
<div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
  <div class="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
    <h3 class="font-bold text-ink mb-2">Delete Product?</h3>
    <p class="text-sm text-ink-3 mb-6">This action cannot be undone.</p>
    <div class="flex gap-3 justify-end">
      <button onClick={() => setDeleteId(null)} class="px-4 py-2 rounded-lg border border-[color:var(--color-line)] text-sm font-semibold text-ink-3 hover:text-ink">Cancel</button>
      <button onClick={() => confirmDelete()} class="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-bold">Delete</button>
    </div>
  </div>
</div>
```
`confirmDelete` → `setProducts(prev => prev.filter(p => p.id !== deleteId))` then `setDeleteId(null)`.

**Add/Edit Modal**: Fixed overlay `z-40`, centered card `max-w-lg w-full mx-4 bg-white rounded-2xl p-6 shadow-xl overflow-y-auto max-h-[90vh]`.

Form fields:
- Title (required), Subtitle (required), Price (required, e.g. `₹ 1,299`), Original Price (optional)
- Badge (optional), Tags (optional, comma-separated input → split on save)
- Image URL (required)

All inputs: `w-full border border-[color:var(--color-line)] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand transition-colors mt-1`

Save logic:
- Add: generate id as `p${Date.now()}`, push to products array
- Edit: map over products, replace matching id

Modal title: "Add Product" or "Edit Product" depending on `editingProduct`.

**Verify**: `npm run typecheck` — zero errors.

---

## Step 7 — Create `app/admin/orders/page.tsx` — Orders Management

**What to do**: Orders management page. "use client". Imports `ORDERS`, `Order`, `OrderStatus` from `@/lib/data`. Features: search, status filter tabs, table with expandable rows, status update dropdown.

**Files**: `c:\Users\Adarsh\Desktop\agency\clothe-store\app\admin\orders\page.tsx` (create new)

**State**:
```typescript
const [orders, setOrders] = useState<Order[]>(ORDERS);
const [search, setSearch] = useState("");
const [activeStatus, setActiveStatus] = useState<OrderStatus | "all">("all");
const [expandedId, setExpandedId] = useState<string | null>(null);
```

**Status tabs**: `["all", "pending", "processing", "shipped", "delivered", "cancelled"]`

Tab styling: active → `bg-ink text-white`, inactive → `text-ink-3 hover:text-ink bg-[color:var(--color-line-2)]`; all tabs: `px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-colors`

**Filtered orders**:
```typescript
const filtered = orders
  .filter(o => activeStatus === "all" || o.status === activeStatus)
  .filter(o =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
    o.customer.email.toLowerCase().includes(search.toLowerCase())
  );
```

**Header**:
```
<h1>Orders</h1>
<p>{orders.length} orders total</p>
<input search />
```

**Table columns**: `Order ID | Customer | Items | Total | Payment | Status | Date | Actions`
- Order ID: `font-mono text-xs text-ink-3`
- Customer: two lines — name (font-semibold text-sm) + email (text-xs text-ink-3)
- Items: `{o.items.length} item(s)`
- Total: `₹ {o.total.toLocaleString('en-IN')}`
- Payment: `text-xs text-ink-3`
- Status: `<StatusBadge status={o.status} />` (same component as dashboard)
- Date: formatted same as dashboard
- Actions: expand/collapse chevron button

**Expandable row**: When `expandedId === o.id`, render a `<tr>` immediately after the main row with `<td colspan={8}>` containing a mini table of line items:
```
<div class="bg-[color:var(--color-line-2)] p-4 rounded-lg">
  <p class="text-xs font-bold uppercase tracking-wide text-ink-3 mb-3">Order Items</p>
  <table class="w-full">
    <thead><tr><th>Product</th><th>Qty</th><th>Unit Price</th><th>Subtotal</th></tr></thead>
    <tbody>{o.items.map(...)}</tbody>
  </table>
</div>
```

**Status update**: In the Actions column, add a `<select>` dropdown (in addition to the expand button) that shows the current status and on change updates the order's status in local state:
```typescript
const updateStatus = (id: string, newStatus: OrderStatus) => {
  setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
};
```
Select: `text-xs border border-[color:var(--color-line)] rounded-lg px-2 py-1 outline-none focus:border-brand bg-white text-ink`
Options: all 5 status values.

**StatusBadge**: copy same implementation from dashboard (or define it in a shared location — but since we're doing local-only, define it in each file to avoid creating extra shared files).

**Verify**: `npm run typecheck` — zero errors.

---

## Step 8 — TypeScript check and build fix pass

**What to do**: Run `npm run typecheck` and then `npm run build`. Fix ALL reported TypeScript and build errors before marking this step complete. Common issues to pre-empt:

1. **`"use client"` + metadata export conflict**: `app/admin/layout.tsx` uses `"use client"` → it must NOT export `metadata`. Only export the default layout function.
2. **`usePathname` in layout**: Import from `"next/navigation"` — confirm this is valid in a client component (it is).
3. **`OrderStatus` import**: Both `app/admin/page.tsx` and `app/admin/orders/page.tsx` must import `OrderStatus` from `@/lib/data`.
4. **`Product` type `tags` field**: Defined as `string[] | undefined` in existing type — handle in form state carefully (don't assign `string` where `string[]` is expected).
5. **Table `<td>` inside `<tr>` structure**: Ensure every `<tr>` is a direct child of `<tbody>` / `<thead>`, expanded rows included.
6. **Image `alt` props**: All `<img>` tags need non-empty `alt` attributes.
7. **`key` props**: All `.map()` renderings must have unique `key` props.
8. **Unused imports**: Remove any imports that aren't used (strict TS will flag these as errors if `noUnusedLocals` is set — check tsconfig; it's not set, but clean up anyway).
9. **Next.js build**: If `npm run build` produces a "Bail out on optimization" or `usePathname()` Suspense warning, wrap the admin layout's pathname-using code in a client component boundary (the layout is already "use client" so this should be fine).
10. **`app/admin/customers/page.tsx`, `app/admin/analytics/page.tsx`, `app/admin/settings/page.tsx`**: The sidebar links to these routes. Next.js App Router will throw 404s at build time if these pages don't exist, but it will NOT fail the build — they just return 404 at runtime. If the build does fail for missing pages, create minimal placeholder pages:

```typescript
// app/admin/customers/page.tsx
export default function CustomersPage() {
  return <div className="p-8 text-ink-3 text-sm">Customers — coming soon</div>;
}
// Same pattern for analytics/page.tsx and settings/page.tsx
```

**Verify**:
1. `npx tsc --noEmit` — zero errors
2. `npm run build` — exits 0 with no errors

---

## Step 9 — Final file confirmation

**What to do**: Confirm all required files exist and the build is clean.

**Checklist**:
- [ ] `lib/data.ts` — appended with `Order`, `OrderStatus`, `ORDERS`, `ADMIN_STATS`
- [ ] `middleware.ts` — at project root
- [ ] `app/admin/login/page.tsx`
- [ ] `app/admin/layout.tsx`
- [ ] `app/admin/page.tsx`
- [ ] `app/admin/products/page.tsx`
- [ ] `app/admin/orders/page.tsx`

**Verify**:
1. `npx tsc --noEmit` — zero TypeScript errors
2. `npm run build` — successful build, exits 0
3. Spot-check: run `npm run dev`, navigate to `http://localhost:3000/admin` → redirected to `/admin/login` ✓, log in with `admin@addy.com` / `admin123` → lands on dashboard ✓, main site at `http://localhost:3000` still works ✓.

---

## Design decisions recorded

1. **Inline SVGs only**: The project has zero icon libraries. All icons are hand-written inline SVGs matching the exact pattern used in `Header.tsx` (20×20 viewBox, `fill="none"`, `stroke="currentColor"`, `strokeWidth="1.7"`).

2. **Local state for products/orders**: No backend exists. All mutations (add/edit/delete product, update order status) operate on `useState` initialized from the data module. Changes are lost on page refresh — this is intentional per the spec.

3. **StatusBadge duplication**: The `StatusBadge` component is defined locally in both `page.tsx` (dashboard) and `orders/page.tsx` rather than in a shared component file. This keeps each file self-contained and avoids creating new component files outside the spec scope. If the coder prefers, they may extract it to `components/admin/StatusBadge.tsx` — but that is optional.

4. **Tailwind v4 color syntax**: The project uses Tailwind v4 which reads CSS variables from `@theme`. Standard utility classes like `bg-brand`, `text-ink`, `border-line` work without any config. For CSS variables not mapped to Tailwind utilities, use `[color:var(--color-name)]` inline syntax as seen throughout existing components.

5. **Cookie auth**: The login page uses `document.cookie` to set the session cookie client-side, and `middleware.ts` reads `request.cookies.get("addy_admin")` server-side. This is a lightweight demo auth — no JWT, no API route needed.

6. **Placeholder pages for sidebar links**: `customers`, `analytics`, `settings` sub-pages are not in scope. Create minimal placeholder `.tsx` files only if `npm run build` fails without them.

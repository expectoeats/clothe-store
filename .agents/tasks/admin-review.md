# Admin panel for ADDY clothing store

The change adds a complete admin panel to the Next.js ADDY storefront: route protection via middleware, a login page with cookie auth, a persistent sidebar layout, and three functional pages (dashboard, products, orders). The approach is intentionally local-only — all state is in-memory React state seeded from mock data in `lib/data.ts`, with no API layer. TypeScript compiles clean and the build passes with all 11 routes. Watch for: the `addy_admin` cookie is set client-side via `document.cookie` with no `Secure` or `SameSite` attributes, and the orders page map uses a bare `<>` fragment as the list wrapper, which drops React's key requirement on the outermost element.

**Verdict**: APPROVED

---

## High-level view

The middleware guards the entire `/admin/*` subtree correctly, passing `/admin/login` through unconditionally and redirecting everything else on a missing or wrong-value cookie. The trust model is entirely client-side: credentials are hardcoded in the login component and the session token is a plain string cookie — expected for a mock/demo tier, but would need a server action and `HttpOnly` flag before any real deployment.

The layout shell uses `usePathname` for active-route highlighting and a controlled boolean for the mobile drawer. The sidebar lists six nav items including Customers, Analytics, and Settings, which are placeholder pages — the nav renders them but clicking through lands on empty shells.

The products and orders pages are the functional core. Products manages a full CRUD cycle against local state with form validation before save. Orders implements search, five-tab status filtering, expandable detail rows, and inline status mutation. Both pages use typed state derived from `lib/data.ts` exports with no `any` escapes.

---

<details>
<summary>Issues (2)</summary>

1. **Fragment missing key on orders rows** — `filtered.map((order) => <> ... </>)` uses a bare fragment as the wrapper, so React cannot assign a key to the outermost element per list item. Replace `<>` with `<React.Fragment key={order.id}>` and remove the `key` from the inner `<tr>`. Confirmed — `app/admin/orders/page.tsx` line 112.

2. **Cookie missing `Secure` and `SameSite` attributes** — `document.cookie = "addy_admin=true; path=/; max-age=86400"` sends the cookie over plain HTTP and is exposed to CSRF. Add `Secure; SameSite=Lax`. Confirmed — `app/admin/login/page.tsx` line 22.

</details>

<details>
<summary>Details</summary>

### Cookie auth posture

The session is set from `document.cookie` in a client component, which means it cannot be `HttpOnly` — any XSS on the admin pages can read or delete the session. For this mock tier that's expected. The missing `Secure` attribute is the more actionable gap: on any non-localhost HTTP deployment, the cookie travels in cleartext. `SameSite=Lax` should also be added to prevent cross-site form submission from elevating session state. The fix is one line:

```
document.cookie = "addy_admin=true; path=/; max-age=86400; Secure; SameSite=Lax";
```

### React key warning in orders table

`filtered.map((order) => <> ... </>)` wraps each order's two `<tr>` elements in a bare fragment. React requires the key on the outermost element returned by the map callback. The `key={order.id}` sits on the inner `<tr>`, not on the fragment, so every rendered order generates a console key warning. Fix: `<React.Fragment key={order.id}>` on the outer wrapper, drop the `key` from the `<tr>`.

</details>

---

<details>
<summary>File map</summary>

| File | What changed |
|------|-------------|
| `middleware.ts` | New — protects `/admin/:path*`, passes `/admin/login` |
| `app/admin/login/page.tsx` | New — standalone login card with cookie auth |
| `app/admin/layout.tsx` | New — sidebar + topbar shell with mobile drawer |
| `app/admin/page.tsx` | New — dashboard: stat cards, recent orders table, top products grid |
| `app/admin/products/page.tsx` | New — products table with add/edit modal and delete confirm |
| `app/admin/orders/page.tsx` | New — orders table with status tabs, expandable rows, inline status update |
| `app/admin/customers/page.tsx` | New — placeholder |
| `app/admin/analytics/page.tsx` | New — placeholder |
| `app/admin/settings/page.tsx` | New — placeholder |
| `lib/data.ts` | Appended — `OrderStatus`, `Order`, `ORDERS`, `ADMIN_STATS` |

Full diff: `git diff main` from workspace root.

</details>

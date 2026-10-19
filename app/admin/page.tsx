"use client";

import { ADMIN_STATS, ORDERS, MAIN_PRODUCTS, OrderStatus } from "@/lib/data";
import Image from "next/image";

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
  shipped: "bg-purple-50 text-purple-700 border-purple-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

const TOP_SALES = [142, 98, 87, 63];

const statCards = [
  {
    label: "Total Revenue",
    value: `₹ ${ADMIN_STATS.totalRevenue.toLocaleString("en-IN")}`,
    growth: ADMIN_STATS.revenueGrowth,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    label: "Total Orders",
    value: ADMIN_STATS.totalOrders,
    growth: ADMIN_STATS.ordersGrowth,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    label: "Total Products",
    value: ADMIN_STATS.totalProducts,
    growth: null,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
  {
    label: "Total Customers",
    value: ADMIN_STATS.totalCustomers,
    growth: null,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

const recentOrders = ORDERS.slice()
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 5);

const topProducts = MAIN_PRODUCTS.slice(0, 4);

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-ink">Dashboard</h1>
        <p className="text-sm text-ink-3 mt-0.5">Welcome back, Admin</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl p-6 border border-[color:var(--color-line)] flex items-start justify-between"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-3">
                {card.label}
              </p>
              <p className="text-2xl font-black text-ink mt-1">{card.value}</p>
              {card.growth !== null && (
                <span className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  ↑ {card.growth}%
                </span>
              )}
            </div>
            <div className="w-11 h-11 rounded-xl bg-[color:var(--color-line-2)] grid place-items-center text-ink-3 shrink-0">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-ink mb-4">Recent Orders</h2>
        <div className="bg-white rounded-xl border border-[color:var(--color-line)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[color:var(--color-line-2)] border-b border-[color:var(--color-line)]">
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3">Order ID</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3">Customer</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3">Items</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3">Total</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, idx) => (
                  <tr
                    key={order.id}
                    className={`border-b border-[color:var(--color-line)] last:border-0 ${
                      idx % 2 === 0 ? "" : "bg-[color:var(--color-line-2)]/30"
                    }`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-ink-3">{order.id}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-ink">{order.customer.name}</td>
                    <td className="px-4 py-3 text-sm text-ink-3">{order.items.length} item(s)</td>
                    <td className="px-4 py-3 text-sm font-bold text-ink">
                      ₹ {order.total.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-ink-3">
                      {new Date(order.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div>
        <h2 className="text-base font-bold text-ink mb-4">Top Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topProducts.map((p, idx) => (
            <div
              key={p.id}
              className="bg-white rounded-xl border border-[color:var(--color-line)] overflow-hidden"
            >
              <div className="aspect-[4/3] bg-[color:var(--color-line-2)] relative">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-ink line-clamp-2">{p.title}</p>
                <p className="text-sm font-bold text-ink mt-1">{p.price}</p>
                <p className="text-[10px] text-ink-3 mt-0.5">
                  Sales: {TOP_SALES[idx]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

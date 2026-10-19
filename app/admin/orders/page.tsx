"use client";

import React, { useState } from "react";
import { ORDERS, Order, OrderStatus } from "@/lib/data";

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

const STATUS_TABS: Array<OrderStatus | "all"> = [
  "all",
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(ORDERS);
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState<OrderStatus | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = orders
    .filter((o) => activeStatus === "all" || o.status === activeStatus)
    .filter(
      (o) =>
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.email.toLowerCase().includes(search.toLowerCase())
    );

  const updateStatus = (id: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-black text-ink">Orders</h1>
        <p className="text-sm text-ink-3">{orders.length} orders total</p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by order ID or customer…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-[color:var(--color-line)] rounded-lg px-4 py-2 text-sm outline-none focus:border-brand w-full sm:w-80 transition-colors"
        />
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveStatus(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-colors ${
              activeStatus === tab
                ? "bg-ink text-white"
                : "text-ink-3 hover:text-ink bg-[color:var(--color-line-2)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[color:var(--color-line)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[color:var(--color-line-2)] border-b border-[color:var(--color-line)]">
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3">Order ID</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3">Items</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3">Total</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3">Payment</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3">Status</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3">Date</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <React.Fragment key={order.id}>
                  <tr
                    className="border-b border-[color:var(--color-line)] hover:bg-[color:var(--color-line-2)]/40 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-ink-3">{order.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-sm text-ink">{order.customer.name}</div>
                      <div className="text-xs text-ink-3">{order.customer.email}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-ink-3">
                      {order.items.length} item(s)
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-ink">
                      ₹ {order.total.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-xs text-ink-3">{order.paymentMethod}</td>
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
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(order.id, e.target.value as OrderStatus)
                          }
                          className="text-xs border border-[color:var(--color-line)] rounded-lg px-2 py-1 outline-none focus:border-brand bg-white text-ink transition-colors"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={() => toggleExpand(order.id)}
                          className="p-1.5 rounded text-ink-3 hover:text-ink hover:bg-[color:var(--color-line-2)] transition-colors"
                          aria-label={expandedId === order.id ? "Collapse order" : "Expand order"}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-transform ${expandedId === order.id ? "rotate-180" : ""}`}
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedId === order.id && (
                    <tr className="bg-[color:var(--color-line-2)]/50">
                      <td colSpan={8} className="px-4 py-4">
                        <div className="bg-[color:var(--color-line-2)] p-4 rounded-lg">
                          <p className="text-xs font-bold uppercase tracking-wide text-ink-3 mb-3">
                            Order Items
                          </p>
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-left">
                                <th className="pb-2 text-xs font-bold text-ink-3 pr-4">Product</th>
                                <th className="pb-2 text-xs font-bold text-ink-3 pr-4">Qty</th>
                                <th className="pb-2 text-xs font-bold text-ink-3 pr-4">Unit Price</th>
                                <th className="pb-2 text-xs font-bold text-ink-3">Subtotal</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.items.map((item) => (
                                <tr key={item.productId} className="border-t border-[color:var(--color-line)]">
                                  <td className="py-2 pr-4 text-sm text-ink font-medium">{item.title}</td>
                                  <td className="py-2 pr-4 text-sm text-ink-3">{item.qty}</td>
                                  <td className="py-2 pr-4 text-sm text-ink-3">
                                    ₹ {item.price.toLocaleString("en-IN")}
                                  </td>
                                  <td className="py-2 text-sm font-bold text-ink">
                                    ₹ {(item.price * item.qty).toLocaleString("en-IN")}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-sm text-ink-3">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { MAIN_PRODUCTS, Product } from "@/lib/data";
import Image from "next/image";

type FormState = {
  title: string;
  subtitle: string;
  price: string;
  image: string;
  originalPrice: string;
  badge: string;
  tagsInput: string; // comma-separated string for the form input
};

const emptyForm: FormState = {
  title: "",
  subtitle: "",
  price: "",
  image: "",
  originalPrice: "",
  badge: "",
  tagsInput: "",
};

function productToForm(p: Product): FormState {
  return {
    title: p.title,
    subtitle: p.subtitle,
    price: p.price,
    image: p.image,
    originalPrice: p.originalPrice ?? "",
    badge: p.badge ?? "",
    tagsInput: (p.tags ?? []).join(", "),
  };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(MAIN_PRODUCTS);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setForm(productToForm(p));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
    setForm(emptyForm);
  };

  const handleSave = () => {
    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : `p${Date.now()}`,
      title: form.title,
      subtitle: form.subtitle,
      price: form.price,
      image: form.image,
      originalPrice: form.originalPrice || undefined,
      badge: form.badge || undefined,
      tags: form.tagsInput
        ? form.tagsInput.split(",").map((t) => t.trim()).filter(Boolean)
        : undefined,
    };

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? newProduct : p))
      );
    } else {
      setProducts((prev) => [...prev, newProduct]);
    }
    closeModal();
  };

  const confirmDelete = () => {
    if (deleteId) {
      setProducts((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
    }
  };

  const updateForm = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl font-black text-ink">Products</h1>
          <p className="text-sm text-ink-3">{products.length} products total</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-[color:var(--color-line)] rounded-lg px-4 py-2 text-sm outline-none focus:border-brand w-56 transition-colors"
          />
          <button
            onClick={openAddModal}
            className="bg-brand hover:bg-brand-dark text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>+</span> Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[color:var(--color-line)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[color:var(--color-line-2)] border-b border-[color:var(--color-line)]">
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3 w-16">Image</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3">Title</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3">Price</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3">Orig Price</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3">Badge</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3">Tags</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-[color:var(--color-line)] last:border-0 hover:bg-[color:var(--color-line-2)]/40 transition-colors"
                >
                  <td className="px-4 py-3 w-16">
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-[color:var(--color-line-2)]">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-sm text-ink">{p.title}</div>
                    <div className="text-xs text-ink-3">{p.subtitle}</div>
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-ink">{p.price}</td>
                  <td className="px-4 py-3 text-sm text-ink-3 line-through">
                    {p.originalPrice ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    {p.badge ? (
                      <span className="text-xs bg-[color:var(--color-line-2)] text-ink-3 px-2 py-0.5 rounded">
                        {p.badge}
                      </span>
                    ) : (
                      <span className="text-ink-3">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {(p.tags ?? []).slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="bg-[color:var(--color-line-2)] text-ink-3 text-[10px] px-1.5 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {!p.tags?.length && <span className="text-ink-3">—</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded text-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                        aria-label={`Edit ${p.title}`}
                      >
                        {/* Pencil icon */}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="p-1.5 rounded text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        aria-label={`Delete ${p.title}`}
                      >
                        {/* Trash icon */}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                          <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-ink-3">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-bold text-ink mb-2">Delete Product?</h3>
            <p className="text-sm text-ink-3 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg border border-[color:var(--color-line)] text-sm font-semibold text-ink-3 hover:text-ink transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-ink">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-ink-3 hover:text-ink hover:bg-[color:var(--color-line-2)] transition-colors"
                aria-label="Close modal"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-ink">Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => updateForm("title", e.target.value)}
                  className="w-full border border-[color:var(--color-line)] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand transition-colors mt-1"
                  placeholder="Product title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink">Subtitle <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => updateForm("subtitle", e.target.value)}
                  className="w-full border border-[color:var(--color-line)] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand transition-colors mt-1"
                  placeholder="Product subtitle"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-ink">Price <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.price}
                    onChange={(e) => updateForm("price", e.target.value)}
                    className="w-full border border-[color:var(--color-line)] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand transition-colors mt-1"
                    placeholder="₹ 1,299"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink">Original Price</label>
                  <input
                    type="text"
                    value={form.originalPrice}
                    onChange={(e) => updateForm("originalPrice", e.target.value)}
                    className="w-full border border-[color:var(--color-line)] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand transition-colors mt-1"
                    placeholder="₹ 1,599"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink">Badge</label>
                <input
                  type="text"
                  value={form.badge}
                  onChange={(e) => updateForm("badge", e.target.value)}
                  className="w-full border border-[color:var(--color-line)] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand transition-colors mt-1"
                  placeholder="e.g. NEW, TRENDING"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={form.tagsInput}
                  onChange={(e) => updateForm("tagsInput", e.target.value)}
                  className="w-full border border-[color:var(--color-line)] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand transition-colors mt-1"
                  placeholder="e.g. Marvel, Anime, Oversized"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink">Image URL <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => updateForm("image", e.target.value)}
                  className="w-full border border-[color:var(--color-line)] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand transition-colors mt-1"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg border border-[color:var(--color-line)] text-sm font-semibold text-ink-3 hover:text-ink transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!form.title || !form.subtitle || !form.price || !form.image}
                className="px-5 py-2 rounded-lg bg-brand hover:bg-brand-dark text-white text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

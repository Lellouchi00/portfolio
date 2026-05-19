import { useState } from "react";
import { useApp } from "../context/AppContext";

function AddProductModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "", nameAr: "", category: "ground", price: "", purchasePrice: "",
    stock: "", unit: "kg", image: "🌿", lowStockThreshold: 10
  });

  const categories = ["ground", "whole", "mixes"];
  const emojis = ["🌶️", "⚫", "🟤", "🟡", "🟠", "🔴", "🟫", "🟢", "🌈", "🌿", "⚡", "💚"];

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, padding: 28, width: 460,
        maxHeight: "85vh", overflowY: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.2)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>➕ Add New Product</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#6b7280" }}>✕</button>
        </div>

        {/* Emoji picker */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Icon</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {emojis.map(e => (
              <button key={e} onClick={() => setForm(f => ({ ...f, image: e }))}
                style={{
                  width: 40, height: 40, borderRadius: 10, border: "2px solid",
                  borderColor: form.image === e ? "#22c55e" : "#e5e7eb",
                  background: form.image === e ? "#f0fdf4" : "#fff",
                  fontSize: 20, cursor: "pointer"
                }}>{e}</button>
            ))}
          </div>
        </div>

        {[
          { key: "name", label: "Product Name (EN)", type: "text" },
          { key: "nameAr", label: "اسم المنتج (AR)", type: "text" },
          { key: "price", label: "Selling Price (DZD/kg)", type: "number" },
          { key: "purchasePrice", label: "Purchase Price (DZD/kg)", type: "number" },
          { key: "stock", label: "Initial Stock (kg)", type: "number" },
          { key: "lowStockThreshold", label: "Low Stock Alert (kg)", type: "number" },
        ].map(field => (
          <div key={field.key} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>{field.label}</label>
            <input
              type={field.type}
              value={form[field.key]}
              onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
              style={{
                width: "100%", padding: "10px 12px", borderRadius: 10,
                border: "1.5px solid #e5e7eb", fontSize: 13, outline: "none", boxSizing: "border-box"
              }}
            />
          </div>
        ))}

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Category</label>
          <div style={{ display: "flex", gap: 8 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setForm(f => ({ ...f, category: cat }))}
                style={{
                  flex: 1, padding: "9px", borderRadius: 10, border: "1.5px solid",
                  borderColor: form.category === cat ? "#22c55e" : "#e5e7eb",
                  background: form.category === cat ? "#f0fdf4" : "#fff",
                  color: form.category === cat ? "#16a34a" : "#374151",
                  fontWeight: 600, fontSize: 12, cursor: "pointer", textTransform: "capitalize"
                }}>{cat}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "11px", borderRadius: 10, border: "1.5px solid #e5e7eb",
            background: "#fff", cursor: "pointer", fontWeight: 600, color: "#374151"
          }}>Cancel</button>
          <button onClick={() => { onSave({ ...form, price: +form.price, purchasePrice: +form.purchasePrice, stock: +form.stock, popular: false }); onClose(); }}
            style={{
              flex: 2, padding: "11px", borderRadius: 10, border: "none",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              color: "#fff", fontWeight: 700, cursor: "pointer"
            }}>✓ Save Product</button>
        </div>
      </div>
    </div>
  );
}

function QuickEditModal({ product, onClose, onSave }) {
  const [stock, setStock] = useState(product.stock);
  const [price, setPrice] = useState(product.price);
  const isLow = stock < product.lowStockThreshold;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, padding: 28, width: 360,
        boxShadow: "0 24px 64px rgba(0,0,0,0.2)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>
            ✏️ Quick Edit: {product.name}
          </h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#6b7280" }}>✕</button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>
            Stock (kg)
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => setStock(s => Math.max(0, s - 1))} style={{
              width: 36, height: 36, borderRadius: 10, border: "1.5px solid #e5e7eb",
              background: "#f9fafb", cursor: "pointer", fontSize: 18, fontWeight: 700
            }}>−</button>
            <input type="number" value={stock} onChange={e => setStock(+e.target.value)}
              style={{
                flex: 1, textAlign: "center", padding: "8px", borderRadius: 10,
                border: "1.5px solid #e5e7eb", fontSize: 16, fontWeight: 700, outline: "none"
              }} />
            <button onClick={() => setStock(s => s + 1)} style={{
              width: 36, height: 36, borderRadius: 10, border: "1.5px solid #e5e7eb",
              background: "#f9fafb", cursor: "pointer", fontSize: 18, fontWeight: 700
            }}>+</button>
          </div>
          {isLow && (
            <div style={{
              marginTop: 8, padding: "8px 12px", borderRadius: 8, background: "#fef2f2",
              border: "1.5px solid #fecaca", fontSize: 12, color: "#dc2626", fontWeight: 500
            }}>
              ⚠️ Warning: Low stock (less than {product.lowStockThreshold}kg)
            </div>
          )}
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>
            Price (DZD/kg)
          </label>
          <input type="number" value={price} onChange={e => setPrice(+e.target.value)}
            style={{
              width: "100%", padding: "10px 12px", borderRadius: 10,
              border: "1.5px solid #e5e7eb", fontSize: 14, fontWeight: 600,
              outline: "none", boxSizing: "border-box"
            }} />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "11px", borderRadius: 10, border: "1.5px solid #e5e7eb",
            background: "#fff", cursor: "pointer", fontWeight: 600, color: "#374151", fontSize: 13
          }}>Cancel</button>
          <button onClick={() => { onSave(product.id, { stock, price }); onClose(); }}
            style={{
              flex: 2, padding: "11px", borderRadius: 10, border: "none",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer"
            }}>✓ Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const { products, updateProduct, addProduct, language } = useApp();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const isAr = language === "ar";

  const filtered = products.filter(p => {
    const matchCat = category === "all" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.nameAr.includes(search);
    return matchCat && matchSearch;
  });

  const totalValue = products.reduce((s, p) => s + p.purchasePrice * p.stock, 0);
  const lowCount = products.filter(p => p.stock <= p.lowStockThreshold).length;

  return (
    <div style={{ padding: "28px 32px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: "#1a1a1a" }}>
            📦 {isAr ? "إدارة المنتجات" : "Product Management"}
          </h2>
          <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>
            {isAr ? "عرض وتحديث قائمة التوابل والمخزون المتاح" : "View and update product catalog and stock levels"}
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{
            padding: "10px 18px", borderRadius: 10, border: "1.5px solid #e5e7eb",
            background: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#374151"
          }}>↗ {isAr ? "تصدير القائمة" : "Export List"}</button>
          <button onClick={() => setShowAdd(true)} style={{
            padding: "10px 18px", borderRadius: 10, border: "none",
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600
          }}>+ {isAr ? "إضافة منتج جديد" : "Add New Product"}</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
        {[
          { label: isAr ? "إجمالي المنتجات" : "Total Products", value: `${products.length} items`, icon: "📊", color: "#16a34a" },
          { label: isAr ? "نفد من المخزون" : "Low on Stock", value: `${lowCount} items`, icon: "⚠️", color: "#d97706" },
          { label: isAr ? "قيمة المخزون" : "Stock Value", value: `${totalValue.toLocaleString()} DZD`, icon: "💰", color: "#2563eb" },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, padding: "16px 20px", borderRadius: 14, background: "#fff",
            border: "1.5px solid #f0f0f0", display: "flex", alignItems: "center", gap: 14
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, background: "#f9fafb",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
            }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 500 }}>{s.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder={isAr ? "بحث..." : "Search products..."}
            style={{ width: "100%", padding: "9px 12px 9px 32px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["all", "ground", "whole", "mixes"].map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} style={{
              padding: "8px 14px", borderRadius: 10, border: "none",
              background: category === cat ? "#22c55e" : "#f3f4f6",
              color: category === cat ? "#fff" : "#374151",
              fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize"
            }}>{cat === "all" ? (isAr ? "الكل" : "All") : cat}</button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {filtered.map(p => {
          const isLow = p.stock <= p.lowStockThreshold;
          const isOut = p.stock === 0;
          return (
            <div key={p.id} style={{
              background: "#fff", borderRadius: 16, overflow: "hidden",
              border: "1.5px solid #f0f0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
            }}>
              <div style={{
                height: 120, background: `linear-gradient(135deg, ${isOut ? "#fef2f2" : isLow ? "#fffbeb" : "#f0fdf4"}, #fff)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 48, position: "relative"
              }}>
                {p.image}
                {p.popular && (
                  <div style={{
                    position: "absolute", top: 8, left: 8, background: "#fbbf24",
                    padding: "2px 8px", borderRadius: 6, fontSize: 10, fontWeight: 700
                  }}>⭐ {isAr ? "الأكثر طلباً" : "Popular"}</div>
                )}
                <div style={{
                  position: "absolute", bottom: 8, right: 8, padding: "2px 8px",
                  borderRadius: 6, fontSize: 10, fontWeight: 600, background: "#1a1a1a", color: "#fff"
                }}>{p.category}</div>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a", marginBottom: 2 }}>
                  {isAr ? p.nameAr : p.name}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#16a34a", marginBottom: 6 }}>
                  {p.price.toLocaleString()} DZD/kg
                </div>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10
                }}>
                  <span style={{ fontSize: 11, color: "#6b7280" }}>{isAr ? "المخزون:" : "Stock:"}</span>
                  <span style={{
                    padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
                    background: isOut ? "#fef2f2" : isLow ? "#fffbeb" : "#f0fdf4",
                    color: isOut ? "#dc2626" : isLow ? "#d97706" : "#16a34a"
                  }}>
                    {isOut ? (isAr ? "نفد" : "OUT") : `${p.stock} kg`}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => setEditing(p)} style={{
                    flex: 1, padding: "8px", borderRadius: 8, border: "1.5px solid #e5e7eb",
                    background: "#f9fafb", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#374151"
                  }}>✏️ {isAr ? "تعديل" : "Edit"}</button>
                  <button onClick={() => setEditing(p)} style={{
                    flex: 1, padding: "8px", borderRadius: 8, border: "none",
                    background: "#f0fdf4", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#16a34a"
                  }}>+ {isAr ? "مخزون" : "Stock"}</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 20, textAlign: "center" }}>
        <button style={{
          padding: "11px 28px", borderRadius: 12, border: "1.5px solid #e5e7eb",
          background: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#374151"
        }}>↓ {isAr ? "عرض المزيد من المنتجات" : "Load More Products"}</button>
      </div>

      {showAdd && <AddProductModal onClose={() => setShowAdd(false)} onSave={addProduct} />}
      {editing && <QuickEditModal product={editing} onClose={() => setEditing(null)} onSave={updateProduct} />}
    </div>
  );
}

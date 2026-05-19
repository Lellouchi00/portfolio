import { useState } from "react";
import { useApp } from "../context/AppContext";

const CATEGORIES = ["all", "ground", "whole", "mixes"];

function ProductCard({ product, onAdd, language }) {
  const [qty, setQty] = useState(0.5);
  const isAr = language === "ar";
  const isLow = product.stock <= product.lowStockThreshold;
  const isOut = product.stock === 0;

  return (
    <div style={{
      background: "#fff", borderRadius: 14, overflow: "hidden",
      border: "1.5px solid #f0f0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      transition: "transform 0.15s, box-shadow 0.15s",
      opacity: isOut ? 0.6 : 1
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}
    >
      {/* Image area */}
      <div style={{
        height: 110, background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", fontSize: 52
      }}>
        {product.image}
        <div style={{
          position: "absolute", top: 8, left: 8, padding: "3px 8px",
          borderRadius: 6, fontSize: 10, fontWeight: 600, background: "#1a1a1a",
          color: "#fff", textTransform: "uppercase"
        }}>{product.category}</div>
        {product.popular && (
          <div style={{
            position: "absolute", top: 8, right: 8,
            background: "#fbbf24", borderRadius: "50%", width: 22, height: 22,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12
          }}>⭐</div>
        )}
      </div>

      <div style={{ padding: "12px" }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: "#1a1a1a", marginBottom: 2 }}>
          {isAr ? product.nameAr : product.name}
        </div>
        <div style={{ fontSize: 13, color: "#16a34a", fontWeight: 700, marginBottom: 8 }}>
          {product.price.toLocaleString()} DZD/kg
        </div>

        {/* Stock badge */}
        <div style={{
          padding: "3px 8px", borderRadius: 6, fontSize: 10, fontWeight: 600,
          background: isOut ? "#fef2f2" : isLow ? "#fffbeb" : "#f0fdf4",
          color: isOut ? "#dc2626" : isLow ? "#d97706" : "#16a34a",
          marginBottom: 10, display: "inline-block"
        }}>
          {isOut ? (isAr ? "نفد" : "Out of stock") : isLow ? `⚠️ ${product.stock}kg left` : `${product.stock}kg`}
        </div>

        {/* Qty selector + add */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #e5e7eb", borderRadius: 8, overflow: "hidden" }}>
            <button onClick={() => setQty(q => Math.max(0.1, parseFloat((q - 0.1).toFixed(1))))}
              style={{ padding: "5px 8px", border: "none", background: "#f9fafb", cursor: "pointer", fontWeight: 700, color: "#374151" }}>−</button>
            <span style={{ padding: "5px 8px", fontSize: 13, fontWeight: 600, minWidth: 32, textAlign: "center" }}>{qty}</span>
            <button onClick={() => setQty(q => parseFloat((q + 0.1).toFixed(1)))}
              style={{ padding: "5px 8px", border: "none", background: "#f9fafb", cursor: "pointer", fontWeight: 700, color: "#374151" }}>+</button>
          </div>
          <button
            disabled={isOut}
            onClick={() => onAdd(product, qty)}
            style={{
              flex: 1, padding: "7px", borderRadius: 8, border: "none",
              background: isOut ? "#e5e7eb" : "linear-gradient(135deg, #22c55e, #16a34a)",
              color: isOut ? "#9ca3af" : "#fff", fontSize: 12, fontWeight: 600,
              cursor: isOut ? "not-allowed" : "pointer"
            }}
          >
            {isAr ? "إضافة" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Receipt({ order, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, padding: 32, width: 380,
        maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.2)"
      }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🌿</div>
          <div style={{ fontWeight: 800, fontSize: 18, color: "#1a1a1a" }}>Epices Shop</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>123 Spice Market Avenue, Algiers</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>Tel: +213 555 123 456</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>Tax ID: 001928374655</div>
        </div>

        <div style={{ borderTop: "1px dashed #e5e7eb", borderBottom: "1px dashed #e5e7eb", padding: "12px 0", marginBottom: 16, fontSize: 12, color: "#6b7280" }}>
          <div><strong>Date:</strong> {new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}</div>
          <div><strong>Cashier:</strong> Ahmed Ben</div>
          <div><strong>Order ID:</strong> #{order.id}</div>
        </div>

        {order.items.map((item, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13 }}>
            <div>
              <div style={{ fontWeight: 500 }}>{item.product.name}</div>
              <div style={{ fontSize: 11, color: "#6b7280" }}>{item.qty}kg × {item.price.toLocaleString()}</div>
            </div>
            <div style={{ fontWeight: 600 }}>{(item.price * item.qty).toLocaleString()} DZD</div>
          </div>
        ))}

        <div style={{ borderTop: "1px dashed #e5e7eb", paddingTop: 12, marginTop: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
            <span>Subtotal</span><span>{order.subtotal.toLocaleString()} DZD</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280", marginBottom: 8 }}>
            <span>Tax (TVA 19%)</span><span>{order.tax.toLocaleString()} DZD</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 18, color: "#16a34a" }}>
            <span>Total</span><span>{order.total.toLocaleString()} DZD</span>
          </div>
        </div>

        <div style={{
          marginTop: 16, padding: "10px", borderRadius: 10, background: "#f0fdf4",
          textAlign: "center", fontSize: 12, color: "#16a34a", fontWeight: 500
        }}>
          💚 Cash on Delivery
        </div>

        <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: "#9ca3af", fontStyle: "italic" }}>
          "The best spices for the best kitchens."
        </div>
        <div style={{ textAlign: "center", marginTop: 4, fontSize: 11, color: "#9ca3af" }}>
          Thank you for your visit!
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "11px", borderRadius: 10, border: "1.5px solid #e5e7eb",
            background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 13, color: "#374151"
          }}>🖨️ Print</button>
          <button onClick={onClose} style={{
            flex: 1, padding: "11px", borderRadius: 10, border: "none",
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            cursor: "pointer", fontWeight: 600, fontSize: 13, color: "#fff"
          }}>✓ Done</button>
        </div>
      </div>
    </div>
  );
}

export default function POS() {
  const { products, cart, addToCart, removeFromCart, updateCartQty, clearCart, submitOrder, language, showNotification } = useApp();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [completedOrder, setCompletedOrder] = useState(null);
  const isAr = language === "ar";

  const filtered = products.filter(p => {
    const matchCat = category === "all" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.nameAr.includes(search);
    return matchCat && matchSearch;
  });

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.19);
  const total = subtotal + tax;

  const handleConfirm = () => {
    if (cart.length === 0) { showNotification("Cart is empty!", "error"); return; }
    const order = submitOrder();
    if (order) {
      const orderWithItems = {
        ...order,
        subtotal,
        tax,
        total,
        items: cart.map(i => ({ ...i }))
      };
      setCompletedOrder(orderWithItems);
    }
  };

  return (
    <div style={{ display: "flex", height: "calc(100vh - 60px)" }}>
      {/* Left: Product picker */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 24px 32px" }}>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 700, color: "#1a1a1a" }}>
            {isAr ? "طلب جديد" : "New Transaction"}
          </h2>
          <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>
            {isAr ? "اختر المنتجات لإضافتها للطلب" : "Select items to add to the basket"}
          </p>
        </div>

        {/* Steps indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          {[{ n: 1, label: "PICK" }, { n: 2, label: "WEIGHT" }, { n: 3, label: "PAY" }].map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: step.n === 1 ? "#22c55e" : "#e5e7eb",
                color: step.n === 1 ? "#fff" : "#9ca3af",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700
              }}>{step.n}</div>
              <span style={{ fontSize: 11, fontWeight: 600, color: step.n === 1 ? "#22c55e" : "#9ca3af" }}>{step.label}</span>
              {i < 2 && <div style={{ width: 40, height: 1, background: "#e5e7eb" }} />}
            </div>
          ))}
        </div>

        {/* Search + filter */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder={isAr ? "بحث عن توابل..." : "Search spice..."}
              style={{
                width: "100%", padding: "9px 12px 9px 32px", borderRadius: 10,
                border: "1.5px solid #e5e7eb", fontSize: 13, outline: "none",
                boxSizing: "border-box"
              }} />
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                style={{
                  padding: "8px 14px", borderRadius: 10, border: "none",
                  background: category === cat ? "#22c55e" : "#f3f4f6",
                  color: category === cat ? "#fff" : "#374151",
                  fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize"
                }}>{cat === "all" ? (isAr ? "الكل" : "All") : cat}</button>
            ))}
          </div>
        </div>

        {/* Most popular */}
        {category === "all" && search === "" && (
          <div style={{ marginBottom: 20 }}>
            <h4 style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 700, color: "#6b7280", display: "flex", alignItems: "center", gap: 6 }}>
              ⭐ {isAr ? "الأكثر طلباً" : "MOST POPULAR"}
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 14 }}>
              {products.filter(p => p.popular).map(p => (
                <ProductCard key={p.id} product={p} onAdd={(p, q) => { addToCart(p, q); showNotification(`Added ${p.name} (${q}kg)`); }} language={language} />
              ))}
            </div>
          </div>
        )}

        {/* All spices */}
        <div>
          <h4 style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 700, color: "#6b7280", display: "flex", alignItems: "center", gap: 6 }}>
            ⚡ {isAr ? "جميع التوابل" : "ALL SPICES"}
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 14 }}>
            {filtered.filter(p => category !== "all" || !p.popular || search !== "").map(p => (
              <ProductCard key={p.id} product={p} onAdd={(p, q) => { addToCart(p, q); showNotification(`Added ${p.name} (${q}kg)`); }} language={language} />
            ))}
          </div>
        </div>
      </div>

      {/* Right: Order summary */}
      <div style={{
        width: 320, background: "#fff", borderLeft: "1.5px solid #f0f0f0",
        display: "flex", flexDirection: "column", padding: 20,
        boxShadow: "-2px 0 12px rgba(0,0,0,0.04)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>
              🛒 {isAr ? "ملخص الطلب" : "Order Summary"}
            </h3>
            <p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>Cashier: Ahmed Ben • T-{Math.floor(Math.random() * 9000 + 1000)}</p>
          </div>
          <div style={{
            padding: "4px 10px", borderRadius: 20, background: "#f0fdf4",
            fontSize: 11, fontWeight: 600, color: "#16a34a"
          }}>{cart.length} {isAr ? "أصناف" : "Items"}</div>
        </div>

        {/* Cart items */}
        <div style={{ flex: 1, overflowY: "auto", marginBottom: 16 }}>
          {cart.length === 0 ? (
            <div style={{
              height: "100%", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", color: "#9ca3af"
            }}>
              <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.4 }}>🛒</div>
              <div style={{ fontSize: 13 }}>{isAr ? "السلة فارغة" : "Cart is empty"}</div>
            </div>
          ) : cart.map(item => (
            <div key={item.productId} style={{
              padding: "12px", borderRadius: 12, background: "#f9fafb",
              marginBottom: 8, border: "1.5px solid #f0f0f0"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{item.product.image} {isAr ? item.product.nameAr : item.product.name}</div>
                  <div style={{ fontSize: 11, color: "#6b7280" }}>{item.price.toLocaleString()} DZD/kg</div>
                </div>
                <button onClick={() => removeFromCart(item.productId)} style={{
                  background: "#fef2f2", border: "none", borderRadius: 6,
                  color: "#ef4444", cursor: "pointer", padding: "3px 7px", fontSize: 12
                }}>✕</button>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #e5e7eb", borderRadius: 8, overflow: "hidden", background: "#fff" }}>
                  <button onClick={() => updateCartQty(item.productId, parseFloat((item.qty - 0.1).toFixed(1)))}
                    style={{ padding: "4px 8px", border: "none", background: "transparent", cursor: "pointer", fontWeight: 700 }}>−</button>
                  <span style={{ padding: "4px 6px", fontSize: 12, fontWeight: 600 }}>{item.qty}kg</span>
                  <button onClick={() => updateCartQty(item.productId, parseFloat((item.qty + 0.1).toFixed(1)))}
                    style={{ padding: "4px 8px", border: "none", background: "transparent", cursor: "pointer", fontWeight: 700 }}>+</button>
                </div>
                <span style={{ fontWeight: 700, color: "#16a34a", fontSize: 13 }}>
                  {(item.price * item.qty).toLocaleString()} DZD
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div style={{ borderTop: "1.5px solid #f0f0f0", paddingTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
            <span>{isAr ? "المجموع الفرعي" : "Subtotal"}</span><span>{subtotal.toLocaleString()} DZD</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280", marginBottom: 12 }}>
            <span>{isAr ? "الضريبة (19%)" : "Tax (TVA 19%)"}</span><span>{tax.toLocaleString()} DZD</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 20, color: "#1a1a1a", marginBottom: 16 }}>
            <span>{isAr ? "الإجمالي" : "TOTAL"}</span>
            <span style={{ color: "#16a34a" }}>{total.toLocaleString()} DZD</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={clearCart} style={{
              flex: 1, padding: "11px", borderRadius: 10, border: "1.5px solid #e5e7eb",
              background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 13, color: "#374151"
            }}>🗑️ {isAr ? "مسح" : "Draft"}</button>
            <button onClick={handleConfirm} style={{
              flex: 2, padding: "11px", borderRadius: 10, border: "none",
              background: cart.length === 0 ? "#e5e7eb" : "linear-gradient(135deg, #22c55e, #16a34a)",
              color: cart.length === 0 ? "#9ca3af" : "#fff",
              cursor: cart.length === 0 ? "not-allowed" : "pointer",
              fontWeight: 700, fontSize: 13
            }}>✓ {isAr ? "تأكيد والدفع" : "Confirm & Pay"} →</button>
          </div>
        </div>
      </div>

      {completedOrder && <Receipt order={completedOrder} onClose={() => setCompletedOrder(null)} />}
    </div>
  );
}

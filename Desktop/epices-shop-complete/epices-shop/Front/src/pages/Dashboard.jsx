import { useApp } from "../context/AppContext";
import { WEEKLY_SALES } from "../data/mockData";

function StatCard({ label, value, change, icon, highlight }) {
  const positive = parseFloat(change) >= 0;
  return (
    <div style={{
      background: highlight ? "linear-gradient(135deg, #22c55e, #16a34a)" : "#fff",
      borderRadius: 16, padding: "20px 24px",
      border: highlight ? "none" : "1.5px solid #f0f0f0",
      boxShadow: highlight ? "0 8px 24px rgba(34,197,94,0.25)" : "0 2px 8px rgba(0,0,0,0.04)",
      minWidth: 0, flex: 1
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, color: highlight ? "rgba(255,255,255,0.8)" : "#6b7280", marginBottom: 6, fontWeight: 500 }}>
            {label}
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: highlight ? "#fff" : "#1a1a1a", letterSpacing: -1 }}>
            {value}
          </div>
          <div style={{
            marginTop: 8, display: "inline-flex", alignItems: "center", gap: 4,
            padding: "3px 10px", borderRadius: 20,
            background: highlight ? "rgba(255,255,255,0.2)" : positive ? "#f0fdf4" : "#fef2f2",
            fontSize: 11, fontWeight: 600,
            color: highlight ? "#fff" : positive ? "#16a34a" : "#dc2626"
          }}>
            {positive ? "▲" : "▼"} {change}
          </div>
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: highlight ? "rgba(255,255,255,0.2)" : "#f0fdf4",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
        }}>{icon}</div>
      </div>
    </div>
  );
}

function MiniChart() {
  const max = Math.max(...WEEKLY_SALES.map(d => d.sales));
  const h = 80;
  const w = 280;
  const points = WEEKLY_SALES.map((d, i) => {
    const x = (i / (WEEKLY_SALES.length - 1)) * (w - 20) + 10;
    const y = h - (d.sales / max) * (h - 10) + 5;
    return `${x},${y}`;
  }).join(" ");

  const fillPoints = `10,${h} ${points} ${w - 10},${h}`;

  return (
    <svg viewBox={`0 0 ${w} ${h + 20}`} style={{ width: "100%", height: 100 }}>
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={fillPoints} fill="url(#chartGrad)" />
      <polyline points={points} fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {WEEKLY_SALES.map((d, i) => {
        const x = (i / (WEEKLY_SALES.length - 1)) * (w - 20) + 10;
        const y = h - (d.sales / max) * (h - 10) + 5;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="3" fill="#22c55e" />
            <text x={x} y={h + 18} textAnchor="middle" fontSize="9" fill="#9ca3af">{d.day}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function Dashboard({ setActivePage }) {
  const { products, orders, totalSalesToday, totalProfit, totalDebt, language } = useApp();
  const isAr = language === "ar";
  const lowStock = products.filter(p => p.stock <= p.lowStockThreshold);
  const topProducts = [...products].sort((a, b) => b.price * (b.stock || 1) - a.price * (a.stock || 1)).slice(0, 5);

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1200 }}>
      {/* Greeting */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>
          {isAr ? "👋 مرحباً بك، أحمد" : "👋 Welcome back, Ahmed"}
        </h1>
        <p style={{ color: "#6b7280", fontSize: 13, margin: "4px 0 0" }}>
          {isAr ? "إليك ملخص أداء متجرك لهذا اليوم." : "Here's your store performance summary for today."}
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
        <StatCard label={isAr ? "إجمالي مبيعات اليوم" : "Total Sales Today"} value={`${totalSalesToday.toLocaleString()} DZD`} change="+12%" icon="📈" highlight />
        <StatCard label={isAr ? "صافي الأرباح" : "Net Profit"} value={`${totalProfit.toLocaleString()} DZD`} change="+12%" icon="💰" />
        <StatCard label={isAr ? "الديون المتبقية" : "Outstanding Debt"} value={`${totalDebt.toLocaleString()} DZD`} change="-4%" icon="📉" />
      </div>

      {/* Chart + Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, marginBottom: 28 }}>
        {/* Chart */}
        <div style={{
          background: "#fff", borderRadius: 16, padding: "20px 24px",
          border: "1.5px solid #f0f0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
        }}>
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>
              {isAr ? "نشاط المبيعات الأسبوعي" : "Weekly Sales Activity"}
            </h3>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "#6b7280" }}>
              {isAr ? "تحليل المبيعات اليومية" : "Daily sales analysis vs last week"}
            </p>
          </div>
          <MiniChart />
        </div>

        {/* Quick Actions */}
        <div style={{
          background: "#fff", borderRadius: 16, padding: "20px",
          border: "1.5px solid #f0f0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
        }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>
            {isAr ? "إجراءات سريعة" : "Quick Actions"}
          </h3>
          {[
            { icon: "＋", label: isAr ? "طلب جديد" : "New Order", sub: isAr ? "بدء عملية سريعة" : "Start a quick sale", page: "pos", accent: true },
            { icon: "📦", label: isAr ? "إضافة منتج" : "Add Product", sub: isAr ? "أدخل صنف جديد" : "Add new product", page: "products" },
            { icon: "📊", label: isAr ? "تقرير الإغلاق" : "Close Report", sub: isAr ? "إصدار التقرير اليومي" : "Generate daily report", page: "reports" },
            { icon: "👥", label: isAr ? "إدارة الموردين" : "Manage Suppliers", sub: isAr ? "تسوية الديون" : "Settle debts", page: "suppliers" },
          ].map((action, i) => (
            <button
              key={i}
              onClick={() => setActivePage(action.page)}
              style={{
                width: "100%", textAlign: "right", padding: "12px 14px",
                borderRadius: 12, border: action.accent ? "none" : "1.5px solid #f0f0f0",
                background: action.accent ? "linear-gradient(135deg, #22c55e, #16a34a)" : "#f9fafb",
                cursor: "pointer", marginBottom: 8,
                display: "flex", alignItems: "center", gap: 12
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 10, fontSize: 18,
                background: action.accent ? "rgba(255,255,255,0.2)" : "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1.5px solid " + (action.accent ? "transparent" : "#e5e7eb")
              }}>{action.icon}</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: action.accent ? "#fff" : "#1a1a1a" }}>{action.label}</div>
                <div style={{ fontSize: 11, color: action.accent ? "rgba(255,255,255,0.8)" : "#6b7280" }}>{action.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Most sold + Low stock */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Top products */}
        <div style={{
          background: "#fff", borderRadius: 16, padding: "20px 24px",
          border: "1.5px solid #f0f0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
        }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>
            {isAr ? "قائمة المنتجات الأكثر مبيعاً" : "Top Selling Products"}
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1.5px solid #f0f0f0" }}>
                {[isAr ? "المنتج" : "Product", isAr ? "الفئة" : "Category", isAr ? "السعر" : "Price", isAr ? "المخزون" : "Stock"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "6px 8px", color: "#6b7280", fontWeight: 600, fontSize: 11 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topProducts.map(p => (
                <tr key={p.id} style={{ borderBottom: "1px solid #f9fafb" }}>
                  <td style={{ padding: "10px 8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 18 }}>{p.image}</span>
                      <span style={{ fontWeight: 500, color: "#1a1a1a" }}>{isAr ? p.nameAr : p.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "10px 8px", color: "#6b7280" }}>{p.category}</td>
                  <td style={{ padding: "10px 8px", color: "#16a34a", fontWeight: 600 }}>{p.price.toLocaleString()} DZD</td>
                  <td style={{ padding: "10px 8px" }}>
                    <span style={{
                      padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                      background: p.stock <= p.lowStockThreshold ? "#fef2f2" : "#f0fdf4",
                      color: p.stock <= p.lowStockThreshold ? "#dc2626" : "#16a34a"
                    }}>{p.stock} kg</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Low stock alerts */}
        <div style={{
          background: "#fff", borderRadius: 16, padding: "20px 24px",
          border: "1.5px solid #f0f0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
        }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>
            ⚠️ {isAr ? "تنبيهات المخزون المنخفض" : "Low Stock Alerts"}
          </h3>
          <p style={{ margin: "0 0 16px", fontSize: 12, color: "#6b7280" }}>
            {lowStock.length} {isAr ? "منتجات تحتاج إعادة تعبئة" : "products need restocking"}
          </p>
          {lowStock.length === 0 ? (
            <div style={{ textAlign: "center", padding: 32, color: "#6b7280", fontSize: 13 }}>
              ✅ {isAr ? "جميع المنتجات متوفرة" : "All products well stocked"}
            </div>
          ) : lowStock.map(p => (
            <div key={p.id} style={{
              padding: "12px 14px", borderRadius: 12, marginBottom: 8,
              background: p.stock === 0 ? "#fef2f2" : "#fffbeb",
              border: `1.5px solid ${p.stock === 0 ? "#fecaca" : "#fde68a"}`,
              display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>{p.image}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "#1a1a1a" }}>{isAr ? p.nameAr : p.name}</div>
                  <div style={{ fontSize: 11, color: "#6b7280" }}>{p.category}</div>
                </div>
              </div>
              <span style={{
                fontWeight: 700, fontSize: 14,
                color: p.stock === 0 ? "#dc2626" : "#d97706"
              }}>
                {p.stock === 0 ? (isAr ? "نفد" : "OUT") : `${p.stock} kg`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

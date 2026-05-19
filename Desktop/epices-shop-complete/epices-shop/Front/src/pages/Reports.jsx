import { useApp } from "../context/AppContext";
import { WEEKLY_SALES } from "../data/mockData";

function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.sales));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 140, padding: "0 8px" }}>
      {data.map((d, i) => {
        const pct = (d.sales / max) * 100;
        const isToday = i === 5;
        return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 600 }}>{(d.sales / 1000).toFixed(0)}k</div>
            <div style={{
              width: "100%", height: `${pct}%`, borderRadius: "6px 6px 0 0",
              background: isToday ? "linear-gradient(180deg, #22c55e, #16a34a)" : "#e5e7eb",
              transition: "height 0.5s ease", minHeight: 4
            }} />
            <div style={{ fontSize: 10, color: isToday ? "#16a34a" : "#9ca3af", fontWeight: isToday ? 700 : 400 }}>{d.day}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function Reports() {
  const { orders, products, expenses, language, totalSalesToday, totalProfit } = useApp();
  const isAr = language === "ar";

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = totalProfit - totalExpenses;
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0) || 540000;

  return (
    <div style={{ padding: "28px 32px" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: "#1a1a1a" }}>
          📊 {isAr ? "التقارير والإحصاءات" : "Reports & Analytics"}
        </h2>
        <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>
          {isAr ? "مقارنة المبيعات اليومية بالدينار الجزائري" : "Daily sales comparison in Algerian Dinar"}
        </p>
      </div>

      {/* Key metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: isAr ? "إجمالي الإيرادات" : "Total Revenue", value: `${totalRevenue.toLocaleString()} DZD`, icon: "📈", color: "#16a34a" },
          { label: isAr ? "صافي الربح" : "Net Profit", value: `${netProfit.toLocaleString()} DZD`, icon: "💰", color: "#2563eb" },
          { label: isAr ? "إجمالي المصاريف" : "Total Expenses", value: `${totalExpenses.toLocaleString()} DZD`, icon: "💸", color: "#d97706" },
          { label: isAr ? "عدد الطلبات" : "Total Orders", value: orders.length, icon: "🧾", color: "#7c3aed" },
        ].map((m, i) => (
          <div key={i} style={{
            padding: "18px 20px", borderRadius: 14, background: "#fff",
            border: "1.5px solid #f0f0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
          }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{m.icon}</div>
            <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: m.color }}>{m.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Weekly chart */}
        <div style={{
          background: "#fff", borderRadius: 16, padding: "20px 24px",
          border: "1.5px solid #f0f0f0"
        }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>
            {isAr ? "أداء المبيعات الأسبوعي" : "Weekly Sales Performance"}
          </h3>
          <BarChart data={WEEKLY_SALES} />
        </div>

        {/* Expenses breakdown */}
        <div style={{
          background: "#fff", borderRadius: 16, padding: "20px 24px",
          border: "1.5px solid #f0f0f0"
        }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>
            {isAr ? "تفاصيل المصاريف" : "Expense Breakdown"}
          </h3>
          {expenses.map(e => {
            const pct = Math.round((e.amount / totalExpenses) * 100);
            return (
              <div key={e.id} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                  <span style={{ fontWeight: 500, color: "#374151" }}>{e.type}</span>
                  <span style={{ fontWeight: 700, color: "#1a1a1a" }}>{e.amount.toLocaleString()} DZD</span>
                </div>
                <div style={{ height: 6, background: "#f3f4f6", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    width: `${pct}%`, height: "100%", borderRadius: 3,
                    background: "linear-gradient(90deg, #22c55e, #16a34a)"
                  }} />
                </div>
                <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>{pct}%</div>
              </div>
            );
          })}
          <div style={{
            marginTop: 12, padding: "12px 14px", background: "#f0fdf4",
            borderRadius: 10, display: "flex", justifyContent: "space-between"
          }}>
            <span style={{ fontWeight: 700, fontSize: 13 }}>Total</span>
            <span style={{ fontWeight: 800, color: "#16a34a", fontSize: 13 }}>{totalExpenses.toLocaleString()} DZD</span>
          </div>
        </div>
      </div>

      {/* Recent orders table */}
      <div style={{
        background: "#fff", borderRadius: 16, padding: "20px 24px",
        border: "1.5px solid #f0f0f0"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>
            {isAr ? "الطلبات الأخيرة" : "Recent Orders"}
          </h3>
          <button style={{
            padding: "8px 16px", borderRadius: 10, border: "1.5px solid #e5e7eb",
            background: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#374151"
          }}>📥 {isAr ? "تصدير PDF" : "Export PDF"}</button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f9fafb", borderRadius: 8 }}>
              {[isAr ? "رقم الطلب" : "Order ID", isAr ? "التاريخ" : "Date", isAr ? "الكاشير" : "Cashier",
                isAr ? "المبلغ الكلي" : "Total", isAr ? "الحالة" : "Status"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "10px 12px", color: "#6b7280", fontWeight: 600, fontSize: 11, borderBottom: "1.5px solid #f0f0f0" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} style={{ borderBottom: "1px solid #f9fafb" }}>
                <td style={{ padding: "12px", fontWeight: 600, color: "#374151" }}>#{o.id}</td>
                <td style={{ padding: "12px", color: "#6b7280" }}>{o.date}</td>
                <td style={{ padding: "12px", color: "#374151" }}>{o.cashier}</td>
                <td style={{ padding: "12px", fontWeight: 700, color: "#16a34a" }}>{o.total.toLocaleString()} DZD</td>
                <td style={{ padding: "12px" }}>
                  <span style={{
                    padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                    background: "#f0fdf4", color: "#16a34a"
                  }}>✓ {o.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

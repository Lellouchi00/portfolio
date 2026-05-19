import { useApp } from "../context/AppContext";

const navItems = [
  { id: "dashboard", label: "Dashboard", labelAr: "لوحة القيادة", icon: "⊞" },
  { id: "pos", label: "New Order", labelAr: "طلب جديد", icon: "＋", accent: true },
  { id: "products", label: "Products", labelAr: "المنتجات", icon: "📦" },
  { id: "suppliers", label: "Suppliers", labelAr: "الموردين", icon: "👥" },
  { id: "reports", label: "Reports", labelAr: "تقارير", icon: "📊" },
];

export default function Sidebar({ activePage, setActivePage }) {
  const { language } = useApp();
  const isAr = language === "ar";

  return (
    <aside style={{
      width: 220, minHeight: "100vh", background: "#fff",
      borderRight: "1.5px solid #f0f0f0",
      display: "flex", flexDirection: "column",
      padding: "0 0 24px 0", position: "fixed", left: 0, top: 0, zIndex: 100,
      boxShadow: "2px 0 12px rgba(0,0,0,0.04)"
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #f5f5f5" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18
          }}>🌿</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a", fontFamily: "'Segoe UI', sans-serif" }}>Epices Shop</div>
            <div style={{ fontSize: 10, color: "#6b7280" }}>POS v2.1.0</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "16px 12px", flex: 1 }}>
        {navItems.map(item => {
          const active = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{
                width: "100%", textAlign: isAr ? "right" : "left",
                padding: "11px 14px", borderRadius: 10, border: "none",
                cursor: "pointer", marginBottom: 4,
                background: item.accent && !active
                  ? "linear-gradient(135deg, #22c55e, #16a34a)"
                  : active ? "#f0fdf4" : "transparent",
                color: item.accent && !active ? "#fff" : active ? "#16a34a" : "#4b5563",
                fontWeight: active || item.accent ? 600 : 400,
                fontSize: 14, display: "flex", alignItems: "center",
                gap: 10, transition: "all 0.15s",
                boxShadow: active ? "0 0 0 1.5px #bbf7d0 inset" : "none",
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span>{isAr ? item.labelAr : item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "0 12px" }}>
        <div style={{
          padding: "10px 14px", borderRadius: 10, background: "#f9fafb",
          fontSize: 12, color: "#6b7280", marginBottom: 8
        }}>
          <div style={{ fontWeight: 600, color: "#374151", marginBottom: 2 }}>Ahmed Ben</div>
          <div>Administrator</div>
        </div>
        <button style={{
          width: "100%", padding: "9px 14px", borderRadius: 10, border: "none",
          background: "transparent", color: "#ef4444", fontSize: 13,
          fontWeight: 500, cursor: "pointer", textAlign: "left",
          display: "flex", alignItems: "center", gap: 8
        }}>
          <span>⟵</span> {isAr ? "تسجيل الخروج" : "Logout"}
        </button>
      </div>
    </aside>
  );
}

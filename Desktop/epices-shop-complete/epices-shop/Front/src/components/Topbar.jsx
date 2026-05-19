import { useApp } from "../context/AppContext";

export default function Topbar({ title }) {
  const { language, setLanguage, notification } = useApp();
  const today = new Date().toLocaleDateString("en-GB").replace(/\//g, "/");

  return (
    <>
      {notification && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 9999,
          background: notification.type === "success" ? "#22c55e" : "#ef4444",
          color: "#fff", padding: "12px 20px", borderRadius: 12,
          fontWeight: 600, fontSize: 14, boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          animation: "slideIn 0.3s ease"
        }}>
          {notification.message}
        </div>
      )}
      <header style={{
        height: 60, background: "#fff",
        borderBottom: "1.5px solid #f0f0f0",
        display: "flex", alignItems: "center",
        padding: "0 24px", gap: 16, position: "sticky", top: 0, zIndex: 50,
        boxShadow: "0 1px 8px rgba(0,0,0,0.04)"
      }}>
        {/* Search */}
        <div style={{ flex: 1, maxWidth: 320, position: "relative" }}>
          <span style={{
            position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
            fontSize: 14, color: "#9ca3af"
          }}>🔍</span>
          <input
            placeholder={language === "ar" ? "بحث..." : "Search products, orders..."}
            style={{
              width: "100%", padding: "8px 12px 8px 34px",
              borderRadius: 10, border: "1.5px solid #e5e7eb",
              fontSize: 13, outline: "none", color: "#374151",
              background: "#f9fafb",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ flex: 1 }} />

        {/* Date */}
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          fontSize: 13, color: "#6b7280", fontWeight: 500
        }}>
          📅 {today}
        </div>

        {/* Language toggle */}
        <button
          onClick={() => setLanguage(language === "en" ? "ar" : "en")}
          style={{
            padding: "6px 14px", borderRadius: 8, border: "1.5px solid #e5e7eb",
            background: "#fff", fontSize: 12, fontWeight: 600,
            cursor: "pointer", color: "#374151", display: "flex", alignItems: "center", gap: 5
          }}
        >
          🌐 {language === "en" ? "العربية" : "English"}
        </button>

        {/* Bell */}
        <button style={{
          width: 36, height: 36, borderRadius: 10, border: "1.5px solid #e5e7eb",
          background: "#fff", fontSize: 16, cursor: "pointer", display: "flex",
          alignItems: "center", justifyContent: "center", position: "relative"
        }}>
          🔔
          <span style={{
            position: "absolute", top: 6, right: 6, width: 8, height: 8,
            borderRadius: "50%", background: "#ef4444", border: "2px solid #fff"
          }} />
        </button>

        {/* User */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "6px 12px", borderRadius: 10, background: "#f9fafb",
          border: "1.5px solid #e5e7eb", cursor: "pointer"
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, color: "#fff", fontWeight: 700
          }}>AB</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#1a1a1a" }}>Ahmed Ben</div>
            <div style={{ fontSize: 10, color: "#6b7280" }}>Admin</div>
          </div>
        </div>
      </header>
    </>
  );
}

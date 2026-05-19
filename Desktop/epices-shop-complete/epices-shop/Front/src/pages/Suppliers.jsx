import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Suppliers() {
  const { suppliers, language } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const isAr = language === "ar";

  const totalDebt = suppliers.reduce((s, sup) => s + sup.debt, 0);

  return (
    <div style={{ padding: "28px 32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: "#1a1a1a" }}>
            👥 {isAr ? "إدارة الموردين" : "Supplier Management"}
          </h2>
          <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>
            {isAr ? "تسوية الديون والمعلومات" : "Manage supplier debts and information"}
          </p>
        </div>
        <button onClick={() => setShowAdd(true)} style={{
          padding: "10px 18px", borderRadius: 10, border: "none",
          background: "linear-gradient(135deg, #22c55e, #16a34a)",
          color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600
        }}>+ {isAr ? "إضافة مورد" : "Add Supplier"}</button>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 14, marginBottom: 28 }}>
        {[
          { label: isAr ? "إجمالي الموردين" : "Total Suppliers", value: suppliers.length, icon: "👥" },
          { label: isAr ? "إجمالي الديون" : "Total Outstanding Debt", value: `${totalDebt.toLocaleString()} DZD`, icon: "💳", red: true },
          { label: isAr ? "موردون بلا ديون" : "Suppliers Paid Up", value: suppliers.filter(s => s.debt === 0).length, icon: "✅" },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, padding: "16px 20px", borderRadius: 14, background: "#fff",
            border: "1.5px solid #f0f0f0", display: "flex", alignItems: "center", gap: 14
          }}>
            <div style={{ fontSize: 28 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 11, color: "#6b7280" }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: s.red ? "#dc2626" : "#1a1a1a" }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Supplier cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
        {suppliers.map(sup => (
          <div key={sup.id} style={{
            background: "#fff", borderRadius: 16, padding: "20px 24px",
            border: "1.5px solid #f0f0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, color: "#fff", fontWeight: 700
                }}>{sup.name[0]}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a" }}>{sup.name}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{isAr ? sup.nameAr : sup.city}</div>
                </div>
              </div>
              <span style={{
                padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                background: sup.debt === 0 ? "#f0fdf4" : "#fef2f2",
                color: sup.debt === 0 ? "#16a34a" : "#dc2626"
              }}>
                {sup.debt === 0 ? (isAr ? "مسدد" : "Paid") : (isAr ? "كريدي" : "Credit")}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {[
                { label: isAr ? "الهاتف" : "Contact", value: sup.contact },
                { label: isAr ? "المدينة" : "City", value: sup.city },
                { label: isAr ? "آخر توصيل" : "Last Delivery", value: sup.lastDelivery },
                { label: isAr ? "الدين المتبقي" : "Outstanding", value: `${sup.debt.toLocaleString()} DZD`, red: sup.debt > 0 },
              ].map((item, i) => (
                <div key={i} style={{ padding: "10px 12px", background: "#f9fafb", borderRadius: 10 }}>
                  <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 600, marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: item.red ? "#dc2626" : "#1a1a1a" }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button style={{
                flex: 1, padding: "9px", borderRadius: 10, border: "1.5px solid #e5e7eb",
                background: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#374151"
              }}>✏️ {isAr ? "تعديل" : "Edit"}</button>
              {sup.debt > 0 && (
                <button style={{
                  flex: 2, padding: "9px", borderRadius: 10, border: "none",
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600
                }}>💳 {isAr ? "تسوية الدين" : "Settle Debt"}</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

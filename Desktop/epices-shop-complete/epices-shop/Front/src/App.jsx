import { useState } from "react";
import { AppProvider } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import POS from "./pages/POS";
import Products from "./pages/Products";
import Suppliers from "./pages/Suppliers";
import Reports from "./pages/Reports";

function AppShell() {
  const [activePage, setActivePage] = useState("dashboard");

  const pages = {
    dashboard: <Dashboard setActivePage={setActivePage} />,
    pos: <POS />,
    products: <Products />,
    suppliers: <Suppliers />,
    reports: <Reports />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div style={{ marginLeft: 220, flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />
        <main style={{ flex: 1 }}>
          {pages[activePage]}
        </main>
        <footer style={{
          textAlign: "center", padding: "12px", fontSize: 11, color: "#9ca3af",
          borderTop: "1px solid #f0f0f0", background: "#fff"
        }}>
          © 2024 Epices Shop POS. All rights reserved. &nbsp;|&nbsp; System Status: <span style={{ color: "#22c55e", fontWeight: 600 }}>Online</span> &nbsp;|&nbsp; Version 2.1.0
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

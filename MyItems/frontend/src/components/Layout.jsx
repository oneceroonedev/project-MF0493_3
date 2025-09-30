import React from "react";
import { Link, Outlet } from "react-router-dom";
import HealthCheck from "./HealthCheck";
/**
* Layout: Header with basic navigation and HealthCheck in the right corner.
* - Includes Outlet for child routes.
*/
export default function Layout() {
  return (
    <div>
      <header style={{
        padding: 12,
        borderBottom: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12
      }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <strong>MyItems</strong>
          </Link>
          <Link to="/items" style={{ textDecoration: "none" }}>Items</Link>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <HealthCheck />
        </div>
      </header>

      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </div>
  );
}
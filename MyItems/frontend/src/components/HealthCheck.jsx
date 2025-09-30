import { useState } from "react";

export default function HealthCheck() {
  const [status, setStatus] = useState("Desconocido");
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkConnection = async () => {
    setLoading(true);
    setError(null);
    setDetail(null);

    try {
      const url = `${import.meta.env.VITE_API_URL || ""}/api/health`;
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      // Try JSON, otherwise text
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await response.json();
        // Handle common formats: {status: "ok", db: "up"} or similar
        const s = data.status || data.result || "ok";
        setStatus("Open connection ✅");
        setDetail(data);
      } else {
        // plain text
        const txt = await response.text();
        setStatus("Open connection ✅");
        setDetail(txt);
      }
    } catch (err) {
      setStatus("Offline ❌");
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <button onClick={checkConnection} disabled={loading}>
        {loading ? "Checking..." : "Test connection"}
      </button>

      <div style={{ fontSize: 13 }}>
        <div><strong>Estado:</strong> {status}</div>
        {detail && (
          <div style={{ color: "#444", marginTop: 4 }}>
            {typeof detail === "string" ? (
              <pre style={{ margin: 0 }}>{detail}</pre>
            ) : (
              <pre style={{ margin: 0 }}>{JSON.stringify(detail)}</pre>
            )}
          </div>
        )}
        {error && <div style={{ color: "red", marginTop: 4 }}>Error: {error}</div>}
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { getItem, deleteItem } from "../api/api";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function fetchItem() {
    setLoading(true);
    setError(null);
    const res = await getItem(id);
    if (!res.success) {
      setError(res.error || `Error ${res.status || ""}`);
      setItem(null);
    } else {
      setItem(res.data);
    }
    setLoading(false);
  }

  async function handleDelete() {
    const ok = window.confirm("¿Eliminar este item?");
    if (!ok) return;
    setLoading(true);
    const res = await deleteItem(id);
    setLoading(false);
    if (!res.success) {
      setError(res.error || `Error ${res.status || ""}`);
    } else {
      navigate("/items");
    }
  }

  if (loading) return <p style={{ padding: 16 }}>Loading...</p>;
  if (error) return <p style={{ color: "red", padding: 16 }}>Error: {error}</p>;
  if (!item) return <p style={{ padding: 16 }}>Item not found.</p>;

  return (
    <div style={{ maxWidth: 800, margin: "24px auto", padding: 16 }}>
      <Link to="/items">← Return to list</Link>
      <h1 style={{ marginTop: 8 }}>{item.title}</h1>
      <p style={{ color: "#444" }}>{item.description}</p>

      {Array.isArray(item.tags) && item.tags.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <h4>Tags</h4>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {item.tags.map((t, i) => (
              <span
                key={i}
                style={{
                  padding: "6px 10px",
                  background: "#f0f0f0",
                  borderRadius: 10,
                  fontSize: 13,
                  color: "#555",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 18, color: "#666", fontSize: 13 }}>
        {item.createdAt && <div>Created: {new Date(item.createdAt).toLocaleString()}</div>}
        {item.updatedAt && <div>Updated: {new Date(item.updatedAt).toLocaleString()}</div>}
      </div>

      <div style={{ marginTop: 18, display: "flex", gap: 8 }}>
        <button onClick={() => navigate(`/items/${id}/edit`)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { createItem, getItem, updateItem } from "../api/api";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function ItemForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) loadItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function loadItem() {
    setLoading(true);
    setError(null);
    const res = await getItem(id);
    if (!res.success) {
      setError(res.error || `Error ${res.status || ""}`);
    } else {
      const it = res.data;
      setTitle(it.title || "");
      setDescription(it.description || "");
      setTags(Array.isArray(it.tags) ? it.tags : []);
    }
    setLoading(false);
  }

  function addTag() {
    const t = tagInput.trim();
    if (!t) return;
    if (!tags.includes(t)) setTags((prev) => [...prev, t]);
    setTagInput("");
  }

  function removeTag(tagToRemove) {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("El título es obligatorio.");
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      tags,
    };

    setLoading(true);
    let res;
    if (id) {
      res = await updateItem(id, payload);
    } else {
      res = await createItem(payload);
    }
    setLoading(false);

    if (!res.success) {
      setError(res.error || `Error ${res.status || ""}`);
    } else {
      // If we create, redirect to the new resource detail if backend returns location/data
      const created = res.data;
      const targetId = created && created.id ? created.id : id;
      navigate(`/items/${targetId}`);
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: "24px auto", padding: 16 }}>
      <Link to="/items">← Return to list</Link>
      <h1 style={{ marginTop: 8 }}>{id ? `Edit Item ${id}` : "Create new Item"}</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
        <div style={{ marginBottom: 12 }}>
          <label>
            <div>Título *</div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ padding: 8, width: "100%" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            <div>Description</div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ padding: 8, width: "100%", minHeight: 100 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div>Tags</div>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add tag and press Add"
              style={{ padding: 8, flex: 1 }}
            />
            <button type="button" onClick={addTag}>
              Add
            </button>
          </div>

          <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tags.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#f1f1f1",
                  padding: "6px 10px",
                  borderRadius: 12,
                  color: "#555",
                }}
              >
                <span>{t}</span>
                <button type="button" onClick={() => removeTag(t)}>
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <button type="submit" disabled={loading} style={{ padding: "8px 14px" }}>
            {id ? "Save changes" : "Create Item"}
          </button>
        </div>
      </form>
    </div>
  );
}
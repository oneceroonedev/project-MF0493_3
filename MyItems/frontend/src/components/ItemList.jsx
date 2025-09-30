import React from "react";

export default function ItemList({
  items = [],
  loading = false,
  error = null,
  search = "",
  setSearch = () => {},
  onCreate = () => {},
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onPrev = () => {},
  onNext = () => {},
  page = 0,
  totalPages = 1,
}) {
  return (
    <div style={{ maxWidth: 1000, margin: "24px auto", padding: 16 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>SpringBank Items</h1>
        <div>
          <button style={{ padding: "8px 12px" }} onClick={onCreate}>
            Create Item
          </button>
        </div>
      </header>

      <div style={{ marginTop: 12, marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Search by title or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 8, width: "60%" }}
        />
        <button
          style={{ marginLeft: 8, padding: "8px 12px" }}
          onClick={() => {
            // allow manual search triggering
            // the container must pass a function that reloads if it wants
            // here we simply delegate to the container for setSearch and debounce
          }}
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && items.length === 0 && <p>No results found.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((it) => (
          <li
            key={it.id}
            style={{
              padding: 12,
              border: "1px solid #e0e0e0",
              marginBottom: 8,
              borderRadius: 6,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ maxWidth: "75%" }}>
              <strong style={{ fontSize: 16 }}>{it.title}</strong>
              <div style={{ fontSize: 13, color: "#555", marginTop: 6 }}>
                {it.description && <div>{it.description}</div>}
                {Array.isArray(it.tags) && it.tags.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    {it.tags.map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          display: "inline-block",
                          padding: "4px 8px",
                          marginRight: 6,
                          background: "#f5f5f7",
                          borderRadius: 12,
                          fontSize: 12,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ marginTop: 8, fontSize: 12, color: "#777" }}>
                {it.createdAt ? `Created: ${new Date(it.createdAt).toLocaleString()}` : null}
                {it.updatedAt ? ` • Updated: ${new Date(it.updatedAt).toLocaleString()}` : null}
              </div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => onView(it.id)}>View</button>
              <button onClick={() => onEdit(it.id)}>Edit</button>
              <button onClick={() => onDelete(it.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onPrev} disabled={page <= 0}>
          ← Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button onClick={onNext} disabled={page >= totalPages - 1}>
          Next →
        </button>
      </div>
    </div>
  );
}
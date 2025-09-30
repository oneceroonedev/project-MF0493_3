const API_URL = import.meta.env.VITE_API_URL || "";

async function request(path, options = {}) {
  const url = `${API_URL}${path}`;
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get("content-type") || "";
    let body = null;
    if (contentType.includes("application/json")) {
      body = await res.json();
    } else {
      body = await res.text();
    }

    if (!res.ok) {
      // Normalize error
      const errorMessage =
        (body && body.message) || (typeof body === "string" && body) || res.statusText;
      return { success: false, status: res.status, error: errorMessage };
    }

    return { success: true, status: res.status, data: body };
  } catch (err) {
    return { success: false, error: err.message || "Network error" };
  }
}

// Health
export async function checkHealth() {
  return request("/api/health");
}

// Items CRUD + list (spring page)
export async function getItems(page = 0, pageSize = 10, search = "") {
  const params = new URLSearchParams();
  params.set("page", page);
  params.set("pageSize", pageSize);
  if (search) params.set("search", search);
  return request(`/api/items?${params.toString()}`);
}

export async function getItem(id) {
  return request(`/api/items/${id}`);
}

export async function createItem(item) {
  return request(`/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
}

export async function updateItem(id, item) {
  return request(`/api/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
}

export async function deleteItem(id) {
  return request(`/api/items/${id}`, {
    method: "DELETE",
  });
}
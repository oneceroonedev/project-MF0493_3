import React, { useEffect, useState, useCallback } from "react";
import { getItems, deleteItem } from "../api/api";
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import ItemList from "../components/ItemList";

export default function ItemListPage() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0); // backend 0-based
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const navigate = useNavigate();

  // fetchItems memoized to be able to use in callbacks
  const fetchItems = useCallback(async (p = page, s = debouncedSearch) => {
    setLoading(true);
    setError(null);
    const res = await getItems(p, pageSize, s);
    if (!res.success) {
      setError(res.error || `Error ${res.status || ""}`);
      setItems([]);
      setTotalPages(1);
    } else {
      const data = res.data;
      setItems(Array.isArray(data.content) ? data.content : []);
      setTotalPages(typeof data.totalPages === "number" ? data.totalPages : 1);
      if (typeof data.number === "number") setPage(data.number);
    }
    setLoading(false);
  }, [page, pageSize, debouncedSearch]);

  useEffect(() => {
    // Every time the page changes or the search debounced, we reload
    fetchItems(page, debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedSearch]);

  async function handleDelete(id) {
    const ok = window.confirm("Delete this item?");
    if (!ok) return;
    setLoading(true);
    setError(null);
    const res = await deleteItem(id);
    if (!res.success) {
      setError(res.error || `Error ${res.status || ""}`);
      setLoading(false);
      return;
    }

    // If you deleted the last item on the page and you are not on the first page,
    // page back to avoid being left on an empty page.
    if (items.length === 1 && page > 0) {
      setPage((p) => Math.max(0, p - 1));
      // fetchItems will be called by useEffect when changing page
    } else {
      // reload the same page
      await fetchItems(page, debouncedSearch);
    }
    setLoading(false);
  }

  function handlePrev() {
    if (page > 0) setPage((p) => p - 1);
  }
  function handleNext() {
    if (page < totalPages - 1) setPage((p) => p + 1);
  }

  return (
    <ItemList
      items={items}
      loading={loading}
      error={error}
      search={search}
      setSearch={(v) => {
        setSearch(v);
        setPage(0);
      }}
      onCreate={() => navigate("/items/new")}
      onView={(id) => navigate(`/items/${id}`)}
      onEdit={(id) => navigate(`/items/${id}/edit`)}
      onDelete={handleDelete}
      onPrev={handlePrev}
      onNext={handleNext}
      page={page}
      totalPages={totalPages}
    />
  );
}
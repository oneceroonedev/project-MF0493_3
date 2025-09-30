import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ItemList from "./pages/ItemList.jsx";
import ItemDetail from "./pages/ItemDetail.jsx";
import ItemForm from "./pages/ItemForm.jsx";

/**
 * App: rutas anidadas dentro de Layout.
 * - index redirige a /items (puedes cambiar a una Home si prefieres).
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/items" replace />} />
        <Route path="items" element={<ItemList />} />
        <Route path="items/new" element={<ItemForm />} />
        <Route path="items/:id" element={<ItemDetail />} />
        <Route path="items/:id/edit" element={<ItemForm />} />
      </Route>
    </Routes>
  );
}

export default App;
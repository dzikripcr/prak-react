import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { commerceAPI } from "../services/commerceAPI";
import useAuth from "../hooks/useAuth";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", price: "", stock: "", image_url: "" });
  const { profile } = useAuth();
  const isAdmin = profile?.role === "admin";

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      setProducts(await commerceAPI.getProducts());
    } catch (err) {
      setError(err.message || "Gagal memuat produk.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ name: "", description: "", price: "", stock: "", image_url: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
      if (editingId) await commerceAPI.updateProduct(editingId, payload);
      else await commerceAPI.createProduct(payload);
      closeForm();
      await loadProducts();
    } catch (err) {
      setError(err.message || "Gagal menyimpan produk.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({ name: product.name, description: product.description || "", price: product.price, stock: product.stock, image_url: product.image_url || "" });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus produk ini?")) return;
    try {
      setLoading(true);
      await commerceAPI.deleteProduct(id);
      await loadProducts();
    } catch (err) {
      setError(err.message || "Gagal menghapus produk.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="dashboard-container">
        <PageHeader title="Produk" breadcrumb="Produk / Produk List">
          {isAdmin && <button onClick={() => setShowForm(true)} className="bg-biru text-white px-4 py-2 rounded-lg mr-2">Add Produk</button>}
          <button className="bg-kuning text-white px-4 py-2 rounded-lg mr-2">
            Export
          </button>
        </PageHeader>

          <div className="bg-white rounded-xl shadow p-4 mt-5 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-3 border-b">ID</th>
                  <th className="p-3 border-b">Produk</th>
                  <th className="p-3 border-b">Code</th>
                  <th className="p-3 border-b">Category</th>
                  <th className="p-3 border-b">Brand</th>
                  <th className="p-3 border-b">Price</th>
                  <th className="p-3 border-b">Stock</th>
                  {isAdmin && <th className="p-3 border-b">Aksi</th>}
                </tr>
              </thead>

              <tbody>
                {products.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="p-3 border-b">{item.id}</td>

                    <td className="p-3 border-b">
                      <Link
                        to={`/products/${item.id}`}
                        className="text-emerald-400 hover:text-emerald-500"
                      >
                        {item.name}
                      </Link>
                    </td>

                    <td className="p-3 border-b">-</td>

                    <td className="p-3 border-b">-</td>

                    <td className="p-3 border-b">-</td>

                    <td className="p-3 border-b">
                      Rp {item.price.toLocaleString("id-ID")}
                    </td>

                    <td className="p-3 border-b">{item.stock}</td>
                    {isAdmin && <td className="p-3 border-b whitespace-nowrap">
                      <button onClick={() => handleEdit(item)} className="text-blue-600 mr-3">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-600">Hapus</button>
                    </td>}
                  </tr>
                ))}
              </tbody>
            </table>
            {loading && <p className="p-3 text-gray-500">Loading...</p>}
            {!loading && error && <p className="p-3 text-red-600">{error}</p>}
            {!loading && !error && products.length === 0 && <p className="p-3 text-gray-500">Belum ada produk.</p>}
          </div>
          {showForm && <div className="fixed inset-0 flex items-center justify-center bg-gray-500/40 backdrop-blur-sm z-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl w-[500px]">
              <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Produk" : "Add Produk"}</h2>
              <div className="grid grid-cols-2 gap-4">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama Produk" className="border p-2 rounded" />
                <input required type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Harga" className="border p-2 rounded" />
                <input required type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="Stock" className="border p-2 rounded" />
                <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="Image URL" className="border p-2 rounded" />
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Deskripsi" className="border p-2 rounded col-span-2" />
              </div>
              <div className="flex justify-end mt-5"><button type="button" onClick={closeForm} className="bg-gray-300 px-4 py-2 rounded mr-2">Cancel</button><button disabled={loading} className="bg-biru text-white px-4 py-2 rounded">Save</button></div>
            </form>
          </div>}
      </div>
    </>
  );
}

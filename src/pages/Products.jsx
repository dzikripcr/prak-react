import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import products from "../data/products.json";

export default function Product() {
  return (
    <>
      <div id="dashboard-container">
        <PageHeader title="Produk" breadcrumb="Produk / Produk List">
          <button
            onClick={() => setShowForm(true)}
            className="bg-biru text-white px-4 py-2 rounded-lg mr-2"
          >
            Add Produk
          </button>
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
                </tr>
              </thead>

              <tbody>
                {products.produk.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="p-3 border-b">{item.id}</td>

                    <td className="p-3 border-b">
                      <Link
                        to={`/products/${item.id}`}
                        className="text-emerald-400 hover:text-emerald-500"
                      >
                        {item.title}
                      </Link>
                    </td>

                    <td className="p-3 border-b">{item.code}</td>

                    <td className="p-3 border-b">{item.category}</td>

                    <td className="p-3 border-b">{item.brand}</td>

                    <td className="p-3 border-b">
                      Rp {item.price.toLocaleString("id-ID")}
                    </td>

                    <td className="p-3 border-b">{item.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </>
  );
}

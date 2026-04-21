import { FaExclamationTriangle } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function NotFound() {
  return (
    <div id="dashboard-container">
      <PageHeader title="404 Not Found" />

      <div className="p-5">
        <div className="bg-white rounded-lg shadow-md p-10 flex flex-col items-center justify-center text-center">
          
          <div className="bg-merah text-white rounded-full p-6 mb-5 text-3xl">
            <FaExclamationTriangle />
          </div>

          <h1 className="text-3xl font-bold mb-2">
            Halaman tidak tersedia
          </h1>

          <p className="text-gray-500 mb-6">
            Halaman yang kamu cari tidak ditemukan atau sudah dipindahkan.
          </p>

          <a
            href="/dashboard"
            className="bg-hijau text-white px-6 py-2 rounded-lg shadow hover:opacity-90 transition"
          >
            Kembali ke Dashboard
          </a>

        </div>
      </div>
    </div>
  );
}
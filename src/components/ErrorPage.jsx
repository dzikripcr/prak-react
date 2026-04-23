import { Link } from "react-router-dom";
export default function ErrorPage(props) {
  return (
    <div
      id="errorpage-container"
      className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6"
    >
      {/* Gambar Error */}
      <img src={props.image} alt={props.code} className="w-[180px]" />
      {/* Kode Error */}
      <h1 id="error-code" className="text-7xl font-extrabold text-hijau">
        {props.code}
      </h1>
      {/* Judul Error */}
      <h2 id="error-title" className="text-3xl font-bold text-gray-800 mt-4">
        {props.title}
      </h2>
      {/* Deskripsi Error */}
      <p id="error-description" className="text-gray-500 mt-3 max-w-xl">
        {props.description}
      </p>
      {/* Button */}
      <Link
        to="/"
        className="mt-8 bg-hijau text-white px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition"
      >
        Back To Dashboard
      </Link>
    </div>
  );
}

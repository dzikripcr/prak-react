import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../../services/authAPI";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak sesuai.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await authAPI.updatePassword(password);
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.message || "Link reset tidak valid atau sudah kedaluwarsa.");
    } finally {
      setLoading(false);
    }
  };

  return <div>
    <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Reset Password</h2>
    {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
    <form onSubmit={handleSubmit}>
      <div className="mb-5"><label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label><input required minLength="6" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm" /></div>
      <div className="mb-6"><label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label><input required minLength="6" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm" /></div>
      <button disabled={loading} className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">{loading ? "Mohon Tunggu..." : "Simpan Password"}</button>
    </form>
    <p className="mt-5 text-center text-sm text-gray-500"><Link to="/login" className="text-green-600 hover:text-green-700">Kembali ke Login</Link></p>
  </div>;
}

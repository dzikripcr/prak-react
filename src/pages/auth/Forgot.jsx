import { useState } from "react";
import { Link } from "react-router-dom";
import { authAPI } from "../../services/authAPI";

export default function Forgot() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            setError("");
            await authAPI.sendPasswordReset(email);
            setMessage("Link reset password telah dikirim. Periksa inbox email Anda.");
        } catch (err) {
            setError(err.message || "Gagal mengirim link reset password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">
                Forgot Your Password?
            </h2>
            
            <p className="text-sm text-gray-500 mb-6 text-center">
                Enter your email address and we'll send you a link to reset your
                password.
            </p>

            {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
            {message && <p className="mb-4 text-sm text-green-600">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                        placeholder="you@example.com"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4
                        rounded-lg transition duration-300"
                >
                    {loading ? "Mohon Tunggu..." : "Send Reset Link"}
                </button>
            </form>
            <p className="mt-5 text-center text-sm text-gray-500"><Link to="/login" className="text-green-600 hover:text-green-700">Kembali ke Login</Link></p>
        </div>
    )
}

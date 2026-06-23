import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { commerceAPI } from "../services/commerceAPI"

export default function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        commerceAPI.getProduct(id)
            .then(setProduct)
            .catch((err) => setError(err.message))
    }, [id])

    if (error) return <div className="text-red-600 p-4">{error}</div>
    if (!product) return <div className="p-4">Loading...</div>

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-6">
            <img
                src={product.image_url || "https://placehold.co/600x300?text=Product"}
                alt={product.name}
                className="rounded-xl mb-4 w-full h-48 object-cover"
            />
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-1">{product.description || "Tidak ada deskripsi."}</p>
            <p className="text-gray-800 font-semibold text-lg">
                Harga: Rp {Number(product.price).toLocaleString("id-ID")}
            </p>
        </div>
    )
}

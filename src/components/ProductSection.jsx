import ProductCard from "./ProductCard";

export default function ProductSection({
  products = [],
}) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          image={product.image}
          title={product.title}
          category={product.category}
          price={product.price}
          description={product.description}
        />
      ))}
    </section>
  );
}
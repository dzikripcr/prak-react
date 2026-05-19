import Alert from "../components/Alert";
import Avatar from "../components/Avatar";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import SelectField from "../components/SelectField";
import Table from "../components/Table";
import TextArea from "../components/TextArea";

export default function Components() {
  const headers = ["No", "Nama Produk", "Kategori", "Harga", "Aksi"];

  const sectionProducts = [
  {
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    title: "Sepatu Sport",
    category: "Fashion",
    price: "Rp 450.000",
    description: "Sepatu nyaman untuk olahraga.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    title: "Smartphone",
    category: "Elektronik",
    price: "Rp 4.500.000",
    description: "Smartphone dengan performa cepat.",
  },
];

  return (
    <div id="dashboard-container">
      <PageHeader title="Components" breadcrumb="Dashboard / Components">
        <Button type="primary">Export</Button>
      </PageHeader>

      <div>
        <SelectField />
      </div>

      <div className="my-5">
        <div className="my-5">
        <Alert type="success">Data berhasil disimpan!</Alert>
        </div>
        <div>
        <Alert type="danger">Data gagal disimpan!</Alert>
        </div>
      </div>

      <div className="flex gap-2 my-5">
        <Button type="primary">Edit</Button>
        <Button type="success">Simpan</Button>
        <Button type="danger">Hapus</Button>
      </div>

      <div className="flex gap-2">
        <Badge type="success">Sukses</Badge>
        <Badge type="primary">Pading</Badge>
        <Badge type="danger">Gagal</Badge>
        <Badge type="warning">Hati-hati</Badge>
      </div>

      <div className="flex gap-2 mt-5">
        <Avatar name="Budi" />
        <Avatar name="Siti" />
      </div>

      <Container className="bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Daftar Produk</h1>

        <p className="text-gray-600">Berikut adalah daftar produk terbaru.</p>
      </Container>

      <div className="mb-5">
        <Card>
          <h2 className="text-xl font-bold">Judul Card</h2>
          <p className="text-gray-600">Ini adalah isi dari card.</p>
        </Card>
      </div>

      <div>
        <div className="mb-5">
          <ProductCard
            image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
            title="Sepatu Sport"
            category="Fashion"
            price="Rp 450.000"
            description="Sepatu sport modern dengan desain nyaman dan ringan untuk aktivitas sehari-hari."
          />
        </div>
        <div>
          <ProductCard
            image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
            title="Smartphone"
            category="Elektronik"
            price="Rp 4.500.000"
            description="Smartphone dengan performa cepat, kamera jernih, dan baterai tahan lama."
          />
        </div>
      </div>

      <div className="my-5">
        <Table headers={headers}>
          {sectionProducts.map((product, index) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="border px-4 py-3">{index + 1}</td>

              <td className="border px-4 py-3">{product.name}</td>

              <td className="border px-4 py-3">{product.category}</td>

              <td className="border px-4 py-3">{product.price}</td>

              <td className="border px-4 py-3">
                <button className="bg-blue-600 text-white px-3 py-1 rounded">
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      <div>
        <TextArea />
      </div>

      <Footer />
    </div>
  );
}

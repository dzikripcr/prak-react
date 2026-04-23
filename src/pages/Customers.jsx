import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import RecentOrders from "../components/RecentOrder";
import SalesChart from "../components/SalesChart";

export default function Customers() {
  return (
    <div id="dashboard-container">
        <PageHeader title="Customers" breadcrumb="Customers / Customer List">
          <button id="children-button" className="bg-merah text-white px-4 py-2 rounded-lg mr-2">
          Export
        </button>
        </PageHeader>
        <p>Ini halaman Customers</p>
    </div>
  );
}

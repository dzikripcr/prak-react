import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import RecentOrders from "../components/RecentOrder";
import SalesChart from "../components/SalesChart";

export default function Orders() {
  return (
    <div id="dashboard-container">
      <PageHeader title="Orders"/>
      <p>Ini halaman Orders</p>
    </div>
  );
}

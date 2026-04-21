import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import RecentOrders from "../components/RecentOrder";
import SalesChart from "../components/SalesChart";

export default function Dashboard() {
  return (
    <div id="dashboard-container">
      <PageHeader title="Dashboard"/>
      <div
        id="dashboard-grid"
        className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div
          id="dashboard-orders"
          className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4"
        >
          <div id="orders-icon" className="bg-hijau rounded-full p-4">
            <FaShoppingCart />
          </div>
          <div id="orders-info" className="flex flex-col">
            <span id="orders-count" className="text-2xl font-bold">
              75
            </span>
            <span id="orders-text">Total Orders</span>
          </div>
        </div>

        <div
          id="dashboard-delivered"
          className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4"
        >
          <div id="delivered-icon" className="bg-biru rounded-full p-4">
            <FaTruck />
          </div>
          <div id="delivered-info" className="flex flex-col">
            <span id="delivered-count" className="text-2xl font-bold">
              175
            </span>
            <span id="delivered-text">Total Delivered</span>
          </div>
        </div>

        <div
          id="dashboard-canceled"
          className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4"
        >
          <div id="canceled-icon" className="bg-merah rounded-full p-4">
            <FaBan />
          </div>
          <div id="canceled-info" className="flex flex-col">
            <span id="canceled-count" className="text-2xl font-bold">
              40
            </span>
            <span id="canceled-text">Total Canceled</span>
          </div>
        </div>

        <div
          id="dashboard-revenue"
          className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4"
        >
          <div id="revenue-icon" className="bg-kuning rounded-full p-4">
            <FaDollarSign />
          </div>
          <div id="revenue-info" className="flex flex-col">
            <span id="revenue-amount" className="text-2xl font-bold">
              Rp.128.000
            </span>
            <span id="revenue-text">Total Revenue</span>
          </div>
        </div>
      </div>
      <div className="p-5 grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>
        <div className="lg:col-span-3">
          <SalesChart />
        </div>
      </div>
    </div>
  );
}

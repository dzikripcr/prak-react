import { useState } from "react";
import "./assets/tailwind.css";
import Sidebar from "./layouts/SideBar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Error400 from "./pages/error400";
import Error401 from "./pages/error401";
import Error403 from "./pages/error403";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div id="app-container" className="bg-gray-100 min-h-screen flex">
        <div id="layout-wrapper" className="flex flex-row flex-1">
          <Sidebar />
          <div id="main-content" className="flex-1 p-4">
            <Header />
            <Routes>
              <Route path="*" element={<NotFound />} />
              {/* Error Pages */} 
              <Route path="/error400" element={<Error400 />} />
              <Route path="/error401" element={<Error401 />} />
              <Route path="/error403" element={<Error403 />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

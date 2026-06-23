import React, { Suspense } from "react";
import "./assets/tailwind.css";
// import Dashboard from "./pages/Dashboard";
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
// import Orders from "./pages/Orders";
const Orders = React.lazy(() => import("./pages/Orders"));
// import Customers from "./pages/Customers";
const Customers = React.lazy(() => import("./pages/Customers"));
import { Navigate, Route, Routes } from "react-router-dom";
// import NotFound from "./pages/NotFound";
const NotFound = React.lazy(() => import("./pages/NotFound"));
// import Error400 from "./pages/error400";
const Error400 = React.lazy(() => import("./pages/Error400"));
// import Error401 from "./pages/error401";
const Error401 = React.lazy(() => import("./pages/Error401"));
// import Error403 from "./pages/error403";
const Error403 = React.lazy(() => import("./pages/Error403"));
// import MainLayout from "./layouts/MainLayout";
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
// import AuthLayout from "./layouts/AuthLayout";
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"))
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Notes from "./pages/Notes";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleLanding from "./components/RoleLanding";
const Components = React.lazy(() => import("./pages/Components"))
const Product = React.lazy(() => import("./pages/Products"))
const FiturXyz = React.lazy(() => import("./pages/FiturXyz"))
const ResetPassword = React.lazy(() => import("./pages/auth/ResetPassword"));
const MemberDashboard = React.lazy(() => import("./pages/MemberDashboard"));
// import Loading from "./components/Loading";
const Loading = React.lazy(() => import("./components/Loading"));

export default function App() {

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Route MainLayout */}
        <Route element={<MainLayout />}>
          {/* Error Pages */}
          <Route path="*" element={<NotFound />} />
          <Route path="/error400" element={<Error400 />} />
          <Route path="/error401" element={<Error401 />} />
          <Route path="/error403" element={<Error403 />} />

          <Route path="/" element={<RoleLanding />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute roles={["admin"]}><Dashboard /></ProtectedRoute>} />
          <Route path="/member/dashboard" element={<ProtectedRoute roles={["member"]}><MemberDashboard /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute roles={["admin", "member"]}><Orders /></ProtectedRoute>} />
          <Route path="/customers" element={<ProtectedRoute roles={["admin"]}><Customers /></ProtectedRoute>} />
          <Route path="/products" element={<Product />} />
          <Route path="/notes" element={<ProtectedRoute roles={["admin"]}><Notes /></ProtectedRoute>} />
          <Route path="/components" element={<ProtectedRoute roles={["admin"]}><Components /></ProtectedRoute>} />
          <Route path="/fiturxyz" element={<ProtectedRoute roles={["admin"]}><FiturXyz /></ProtectedRoute>} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Route>

        {/* Route AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

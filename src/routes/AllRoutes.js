import { Route, Routes } from "react-router-dom";
import {
  CartPage,
  HomePage,
  Login,
  OrderPage,
  ProductDetail,
  ProductList,
  Register,
} from "../pages";
import { ProtectedRoute } from "./ProtectedRoute";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="products" element={<ProductList />} />
      <Route path="products/:id" element={<ProductDetail />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route
        path="cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="order-summary"
        element={
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./pages/home/Home";
import Profile from "./pages/userOptions/Profile";
import Admin from "./pages/admin/Admin";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminTransactions from "./pages/admin/AdminTransactions";
import AdminDatas from "./pages/admin/AdminDatas";
import Search from "./pages/purchase/Search";
import ViewProduct from "./pages/purchase/ViewProduct";
import BuyProduct from "./pages/purchase/BuyProduct";
import ShoppingCart from "./pages/purchase/ShoppingCart";
import PublishProduct from "./pages/userOptions/PublishProduct";
import ProfilePurchases from "./pages/userOptions/ProfilePurchases";
import EditSales from "./pages/userOptions/EditSales";
import ProfileSales from "./pages/userOptions/ProfileSales";
import AuthLogin from "./pages/auth/AuthLogin";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas con Header y Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/transactions" element={<AdminTransactions />} />
          <Route path="/admin/datas" element={<AdminDatas />} />

          <Route path="/search" element={<Search />} />
          <Route path="/product/:id" element={<ViewProduct />} />
          <Route path="/buyProduct/:type" element={<BuyProduct />} />

          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="/publishProduct/:id" element={<PublishProduct />} />
          <Route path="/editSales" element={<EditSales />} />
          <Route path="/profileSales" element={<ProfileSales />} />
          <Route path="/profilePurchases" element={<ProfilePurchases />} />
        </Route>

        {/* Rutas sin Header ni Footer */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<AuthLogin mode="default" />} />
          <Route path="/enterEmail" element={<AuthLogin mode="enterEmail" />} />
          <Route
            path="/codeVerification"
            element={<AuthLogin mode="codeVerification" />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

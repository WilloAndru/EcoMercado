import "./App.scss";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Principal = lazy(() => import("./pages/Principal"));
const AuthLogin = lazy(() => import("./pages/auth/AuthLogin"));

function App() {
  return (
    <Router>
      <Suspense>
        <Routes>
          {/* Layout con header y footer */}
          <Route path="/" element={<Principal mode="" />} />
          <Route path="/admin" element={<Principal mode="admin" />} />
          <Route
            path="/admin/users"
            element={<Principal mode="adminUsers" />}
          />
          <Route
            path="/admin/products"
            element={<Principal mode="adminProducts" />}
          />
          <Route
            path="/admin/transactions"
            element={<Principal mode="adminTransactions" />}
          />
          <Route
            path="/admin/datas"
            element={<Principal mode="adminDatas" />}
          />
          <Route path="/profile" element={<Principal mode="profile" />} />
          <Route path="/search" element={<Principal mode="search" />} />
          <Route path="/product/:id" element={<Principal mode="product" />} />
          <Route
            path="/buyProduct/:type"
            element={<Principal mode="buyProduct" />}
          />
          <Route
            path="/shoppingCart"
            element={<Principal mode="shoppingCart" />}
          />
          <Route
            path="/publishProduct/:idProduct"
            element={<Principal mode="publishProduct" />}
          />
          <Route path="/editSales" element={<Principal mode="editSales" />} />
          <Route
            path="/profileSales"
            element={<Principal mode="profileSales" />}
          />
          <Route
            path="/profilePurchases"
            element={<Principal mode="profilePurchases" />}
          />

          {/* Layout sin header ni footer */}
          <Route path="/login" element={<AuthLogin mode="default" />} />
          <Route path="/enterEmail" element={<AuthLogin mode="enterEmail" />} />
          <Route
            path="/codeVerification"
            element={<AuthLogin mode="codeVerification" />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

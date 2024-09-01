import './styles/App.scss'
import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Principal = lazy(() => import('./pages/Principal'));
const AuthLogin = lazy(() => import('./pages/AuthLogin'));

function App() {

  return (
    <Router>
      <Suspense>
        <Routes>
          {/* Principal */}
          <Route path="/" element={<Principal mode=""/>} />
          <Route path="/admin" element={<Principal mode="admin"/>} />
          <Route path="/admin/users" element={<Principal mode="adminUsers"/>} />
          <Route path="/admin/products" element={<Principal mode="adminProducts"/>} />
          <Route path="/admin/transactions" element={<Principal mode="adminTransactions"/>} />
          <Route path="/admin/datas" element={<Principal mode="adminDatas"/>} />
          <Route path="/profile" element={<Principal mode="profile" />} />
          <Route path="/search" element={<Principal mode="search" />} />
          <Route path="/product/:id" element={<Principal mode="product" />} />
          <Route path="/buyProduct/:type" element={<Principal mode="buyProduct" />} />
          <Route path="/shoppingCart" element={<Principal mode="shoppingCart" />} />
          <Route path="/publishProduct/:idProduct" element={<Principal mode="publishProduct" />} />
          <Route path="/editSales" element={<Principal mode="editSales" />} />
          <Route path="/profileSales" element={<Principal mode="profileSales" />} />
          <Route path="/profilePurchases" element={<Principal mode="profilePurchases" />} />

          {/* AuthLogin */}
          <Route path="/login" element={<AuthLogin mode="login" />} />
          <Route path="/registerEmail" element={<AuthLogin mode="registerEmail" />} />
          <Route path="/confirmEmail" element={<AuthLogin mode="confirmEmail" />} />
          <Route path="/registerPassword" element={<AuthLogin mode="registerPassword" />} />
          <Route path="/forgotPassword" element={<AuthLogin mode="forgotPassword" />} />
        </Routes>
      </Suspense>
   </Router>
  );
}

export default App

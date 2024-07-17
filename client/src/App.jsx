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
          <Route path="/" element={<Principal mode=""/>} />
          <Route path="/admin" element={<Principal mode="admin"/>} />
          <Route path="/admin/users" element={<Principal mode="adminUsers"/>} />
          <Route path="/admin/products" element={<Principal mode="adminProducts"/>} />
          <Route path="/admin/profits" element={<Principal mode="adminProfits"/>} />
          <Route path="/admin/shipments" element={<Principal mode="adminShipmnets"/>} />
          <Route path="/profile" element={<Principal mode="profile" />} />
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

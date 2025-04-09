


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Form from './components/Form';
import Login from './components/Login';
import Signup from './components/Signup';
import OrderHistory from './components/OrderHistory';
import Admin from './components/Admin';
import UserProtectedRoute from './components/UserProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';

import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          
          <Route element={<UserProtectedRoute />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="payment" element={<Payment />} />
            <Route path="form" element={<Form />} />
            <Route path="order-history" element={<OrderHistory />} />
          </Route>

          
          <Route element={<AdminProtectedRoute />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


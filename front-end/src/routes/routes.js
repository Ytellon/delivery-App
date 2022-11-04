import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CustomerProducts from '../pages/CustomerProducts';
import CustomerCheckout from '../pages/CustomerCheckout';
import CustomerOrders from '../pages/Order';
import OrderDetails from '../pages/OrderDetails';
import Admin from '../pages/Admin';

export default function RouteDelivery() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/products" element={ <CustomerProducts /> } />
      <Route path="customer/checkout" element={ <CustomerCheckout /> } />
      <Route path="/customer/orders" element={ <CustomerOrders /> } />
      <Route path="/customer/orders/:id" element={ <OrderDetails /> } />
      <Route path="/admin/manage" element={ <Admin /> } />
    </Routes>
  );
}

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"

import CustomerDashboard from "./pages/CustomerDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import VendorDashboard from "./pages/VendorDashboard"
import Cart from "./components/Cart"
import Userprofile from "./components/Userprofile"
import Wishlist from "./components/Wishlist"

import SampleGPT from "./samples/SampleGPT"
import SampleGEM from "./samples/SampleGEM"

import Authentication from "./components/Authentication"
import Logout from "./components/Logout"
import NotFound from './components/NotFound'


function EmptyRedirect({path}) {
  localStorage.clear()
  return <Navigate to={path} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={["admin"]} redirectPath="/admin/login">
            <AdminDashboard />
          </ProtectedRoute>
        }/>
        <Route path="/vendor/dashboard" element={
          <ProtectedRoute allowedRoles={["vendor"]} redirectPath="/vendor/login">
            <VendorDashboard />
          </ProtectedRoute>
        }/>
        <Route path="/customer/cart" element={
          <ProtectedRoute allowedRoles={["customer"]} redirectPath="/customer/login">
            <Cart />
          </ProtectedRoute>
        }/>
        <Route path="/customer/user" element={
          <ProtectedRoute allowedRoles={["customer"]} redirectPath="/customer/login">
            <Userprofile />
          </ProtectedRoute>
        }/>
        <Route path="/customer/wishlist" element={
          <ProtectedRoute allowedRoles={["customer"]} redirectPath="/customer/login">
            <Wishlist />
          </ProtectedRoute>
        }/>

        <Route path="/customer/dashboard" element={<CustomerDashboard />} />

        <Route path="/" element={<EmptyRedirect path="/customer/dashboard" /> } />
        <Route path="/customer" element={<EmptyRedirect path="/customer/login" />} />
        <Route path="/admin" element={<EmptyRedirect path="/admin/login" />} />
        <Route path="/vendor" element={<EmptyRedirect path="/vendor/login" />} />
        
        <Route path="/admin/login" element={<Authentication route="api/auth/admin/login/" role="admin" />} />
        <Route path="/customer/login" element={<Authentication route="api/auth/customer/login/" role="customer" />} />
        <Route path="/vendor/login" element={<Authentication route="api/auth/vendor/login/" role="vendor" />} />
        
        <Route path="/logout" element={<Logout />} />
        <Route path="/*" element={<NotFound />} />

        {/* Samples */}
        <Route path="/samplegpt" element={<SampleGPT />} />
        <Route path="/samplegem" element={<SampleGEM />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

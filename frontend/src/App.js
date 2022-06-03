import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import CartPage from './pages/CartPage';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import SignIn from './pages/SignIn';
import { ToastContainer } from 'react-bootstrap';
import ShippingPage from './pages/ShippingPage';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import PaymentMethodPage from './pages/PaymentMethodPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import OrderHistory from './pages/OrderHistory';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <div className="d-flex flex-column site-container">
      <ToastContainer position="bottom-center" limit={1} />

      <Header />

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/payment" element={<PaymentMethodPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
      </Routes>
    </div>
  );
}

export default App;

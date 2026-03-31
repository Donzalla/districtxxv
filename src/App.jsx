import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Collections from './components/Collections';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div style={{ minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <CartDrawer />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/"            element={<Hero />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login"       element={<Login />} />
                <Route path="/signup"      element={<Signup />} />
                <Route path="/profile"     element={<Profile />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
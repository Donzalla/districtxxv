import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collections from './components/Collections';

const Home = () => <Hero />;

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#000' }}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
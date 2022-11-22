import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Cart from './components/Cart';
import Home from './components/Home';
import NotFound from './components/NotFound';

import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Router>
      <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />}
    />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

/*
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/lab" element={<Lab />} />
    <Route
        path="*"
        element={<Navigate to="/" replace />}
    />
  </Routes>
</BrowserRouter>
*/
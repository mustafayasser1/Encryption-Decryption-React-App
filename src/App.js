import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import EncryptForm from './EncryptForm';
import DecryptForm from './DecryptForm';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <Routes>
            <Route path="/encrypt" element={
              <Link to="/" className="home-link">
                <i className="fas fa-arrow-left"></i>
              </Link>
            } />
            <Route path="/decrypt" element={
              <Link to="/" className="home-link">
                <i className="fas fa-arrow-left"></i>
              </Link>
            } />
          </Routes>
        </nav>

        <Routes>
          <Route path="/encrypt" element={<EncryptForm />} />
          <Route path="/decrypt" element={<DecryptForm />} />
          <Route path="/" element={
            <div>
              <h2>Welcome to the Encryption/Decryption App</h2>
              <div className="button-group">
                <Link to="/encrypt">
                  <button className="modern-button">Encrypt</button>
                </Link>
                <Link to="/decrypt">
                  <button className="modern-button">Decrypt</button>
                </Link>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

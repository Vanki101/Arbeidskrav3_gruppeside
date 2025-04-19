import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import MemberProfile from './pages/MemberProfile';
import './App.css';

// Hovedkomponenten for applikasjonen
// Setter opp routing og den overordnede strukturen
function App() {
  return (
    // BrowserRouter er nødvendig for routing i React
    <BrowserRouter>
      <div className="app">
        {/* Header vises på alle sider */}
        <Header />
        <main>
          {/* Routes definerer navigasjonsstiene */}
          <Routes>
            {/* Forsiden vises på rot-URL */}
            <Route path="/" element={<Home />} />
            {/* Medlemsprofiler vises basert på fornavn-parameter */}
            <Route path="/:firstName" element={<MemberProfile />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
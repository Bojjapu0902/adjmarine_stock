import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout          from './components/layout/Layout';
import Loader          from './components/common/Loader';
import Login           from './pages/Login';
import Dashboard       from './pages/Dashboard';
import Inventory       from './pages/Inventory';
import PurchaseOrders  from './pages/PurchaseOrders';
import Suppliers       from './pages/Suppliers';
import Wastage         from './pages/Wastage';
import Reports         from './pages/Reports';
import Settings        from './pages/Settings';

// ── App States: 'loading' → 'login' → 'app' ──────────

const App = () => {
  const [appState, setAppState] = useState('loading'); // 'loading' | 'login' | 'app'
  const [user, setUser]         = useState(null);

  // Called when the loader finishes its animation
  const handleLoaderDone = useCallback(() => {
    setAppState('login');
  }, []);

  // Called when the login form succeeds
  const handleLogin = useCallback((userData) => {
    setUser(userData);
    setAppState('app');
  }, []);

  // Called when user clicks logout (from Header/Sidebar)
  const handleLogout = useCallback(() => {
    setUser(null);
    setAppState('login');
  }, []);

  // ── Render phase ──────────────────────────────────
  if (appState === 'loading') {
    return <Loader onComplete={handleLoaderDone} />;
  }

  if (appState === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/"          element={<Dashboard />}      />
          <Route path="/inventory" element={<Inventory />}      />
          <Route path="/orders"    element={<PurchaseOrders />} />
          <Route path="/suppliers" element={<Suppliers />}      />
          <Route path="/wastage"   element={<Wastage />}        />
          <Route path="/reports"   element={<Reports />}        />
          <Route path="/settings"  element={<Settings />}       />
          <Route path="*"          element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

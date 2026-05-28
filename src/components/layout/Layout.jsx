import React, { useState, useCallback } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, user, onLogout }) => {
  const [collapsed, setCollapsed]       = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);

  const handleMenuClick = useCallback(() => {
    // On mobile (<992px) toggle mobile drawer; on desktop toggle collapsed
    if (window.innerWidth < 992) {
      setMobileVisible((v) => !v);
    } else {
      setCollapsed((c) => !c);
    }
  }, []);

  const handleMobileClose = useCallback(() => {
    setMobileVisible(false);
  }, []);

  return (
    <div className="app-shell">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        mobileVisible={mobileVisible}
        onMobileClose={handleMobileClose}
        user={user}
        onLogout={onLogout}
      />
      <div className="main-content">
        <Header onMenuClick={handleMenuClick} user={user} onLogout={onLogout} />
        <main className="page-body">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

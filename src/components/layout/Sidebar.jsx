import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  MdDashboard, MdInventory, MdShoppingCart, MdPeople,
  MdDeleteSweep, MdBarChart, MdSettings, MdLogout,
  MdRestaurant,
} from 'react-icons/md';

const navItems = [
  {
    section: 'Main',
    links: [
      { to: '/',           icon: <MdDashboard />,   label: 'Dashboard',         badge: null },
      { to: '/inventory',  icon: <MdInventory />,   label: 'Inventory',         badge: '5' },
      { to: '/orders',     icon: <MdShoppingCart />, label: 'Purchase Orders',   badge: null },
      { to: '/suppliers',  icon: <MdPeople />,      label: 'Suppliers',         badge: null },
      { to: '/wastage',    icon: <MdDeleteSweep />, label: 'Wastage Log',       badge: null },
    ],
  },
  {
    section: 'Analytics',
    links: [
      { to: '/reports',    icon: <MdBarChart />,    label: 'Reports',           badge: null },
    ],
  },
  {
    section: 'System',
    links: [
      { to: '/settings',   icon: <MdSettings />,    label: 'Settings',          badge: null },
    ],
  },
];

const Sidebar = ({ collapsed, onToggle, mobileVisible, onMobileClose, user, onLogout }) => {
  const location = useLocation();

  const displayName = user?.username ? user.username.toUpperCase() : 'AU';
  const initials    = displayName.slice(0, 2);
  const role        = user?.role || 'Operations Manager';

  const sidebarClass = [
    'sidebar',
    collapsed ? 'collapsed' : '',
    !mobileVisible ? 'mobile-hidden' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${mobileVisible ? 'visible' : ''}`}
        onClick={onMobileClose}
      />

      <aside className={sidebarClass}>
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <MdRestaurant />
          </div>
          <div className="sidebar-brand-text">
            <div className="sidebar-brand-title">FoodStock Pro</div>
            <div className="sidebar-brand-sub">Inventory Suite</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {navItems.map((section) => (
            <div key={section.section}>
              <div className="sidebar-section-label">{section.section}</div>
              {section.links.map((link) => {
                const isActive = link.to === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.to);

                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                    onClick={onMobileClose}
                    title={collapsed ? link.label : ''}
                  >
                    <span className="sidebar-icon">{link.icon}</span>
                    <span className="sidebar-label">{link.label}</span>
                    {link.badge && (
                      <span className="sidebar-badge">{link.badge}</span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer / User */}
        <div className="sidebar-footer">
          <div className="sidebar-user" title={collapsed ? displayName : ''}>
            <div className="sidebar-avatar">{initials}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{displayName}</div>
              <div className="sidebar-user-role">{role}</div>
            </div>
          </div>

          {/* Logout button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="sidebar-link"
              title={collapsed ? 'Sign Out' : ''}
              style={{ marginTop: 4, color: 'rgba(252,165,165,0.9)', width: 'calc(100% - 0px)' }}
            >
              <span className="sidebar-icon"><MdLogout /></span>
              <span className="sidebar-label">Sign Out</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

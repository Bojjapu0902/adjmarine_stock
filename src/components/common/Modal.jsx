import React, { useEffect } from 'react';
import { MdClose } from 'react-icons/md';

const Modal = ({ show, onClose, title, children, footer, size = 'md' }) => {
  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (show) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [show, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [show]);

  if (!show) return null;

  const sizeMap = { sm: '400px', md: '560px', lg: '760px', xl: '960px' };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1050,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(15,23,42,0.45)',
          backdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.2s ease',
        }}
      />
      {/* Dialog */}
      <div
        className="fsp-modal"
        style={{
          position: 'relative', zIndex: 1,
          width: '100%', maxWidth: sizeMap[size] || sizeMap.md,
          maxHeight: '90vh', display: 'flex', flexDirection: 'column',
          background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 60px rgba(15,23,42,0.2)',
          animation: 'slideUp 0.22s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* Header */}
        <div className="fsp-modal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid var(--border-light)', background: 'var(--bg-main)', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
          <h5 style={{ margin: 0, fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>{title}</h5>
          <button
            onClick={onClose}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 20, display: 'flex', alignItems: 'center', padding: 4, borderRadius: 6 }}
          >
            <MdClose />
          </button>
        </div>
        {/* Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>
        {/* Footer */}
        {footer && (
          <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            {footer}
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  );
};

export default Modal;

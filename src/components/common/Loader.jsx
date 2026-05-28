import React, { useEffect, useState } from 'react';

const MESSAGES = [
  'Initializing FoodStock Pro…',
  'Loading inventory data…',
  'Syncing supplier records…',
  'Fetching purchase orders…',
  'Preparing your dashboard…',
];

const Loader = ({ onComplete }) => {
  const [progress, setProgress]   = useState(0);
  const [msgIndex, setMsgIndex]   = useState(0);
  const [fadeOut, setFadeOut]     = useState(false);

  useEffect(() => {
    // Progress ticker — reaches 100 in ~2.4s
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Ease-in-out feel: faster in the middle, slower at ends
        const increment = prev < 20 ? 1.5 : prev < 80 ? 3.5 : 1.2;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    // Cycle through status messages
    const msgInterval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 520);

    // After 2.8s begin fade-out then call onComplete
    const finishTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, 2800);

    return () => {
      clearInterval(interval);
      clearInterval(msgInterval);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 45%, #1E1B4B 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.5s ease',
    }}>

      {/* Floating orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[
          { w: 320, h: 320, top: '-80px', left: '-80px', opacity: 0.06 },
          { w: 240, h: 240, bottom: '-60px', right: '-60px', opacity: 0.05 },
          { w: 180, h: 180, top: '30%', right: '8%', opacity: 0.04 },
          { w: 140, h: 140, bottom: '20%', left: '10%', opacity: 0.04 },
        ].map((orb, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: orb.w, height: orb.h,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #818CF8, transparent)',
            opacity: orb.opacity,
            top: orb.top, left: orb.left,
            right: orb.right, bottom: orb.bottom,
            animation: `float-orb ${3 + i * 0.7}s ease-in-out infinite alternate`,
          }} />
        ))}
      </div>

      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Center content */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* Animated logo mark */}
        <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: 88, height: 88 }}>
            {/* Rotating ring */}
            <svg
              width="88" height="88"
              viewBox="0 0 88 88"
              style={{ position: 'absolute', top: 0, left: 0, animation: 'spin 2s linear infinite' }}
            >
              <circle cx="44" cy="44" r="40"
                fill="none" stroke="rgba(129,140,248,0.3)" strokeWidth="2" />
              <circle cx="44" cy="44" r="40"
                fill="none" stroke="#818CF8" strokeWidth="2.5"
                strokeDasharray="60 192"
                strokeLinecap="round"
                strokeDashoffset="0" />
            </svg>
            {/* Slow counter-spin ring */}
            <svg
              width="88" height="88"
              viewBox="0 0 88 88"
              style={{ position: 'absolute', top: 0, left: 0, animation: 'spin-reverse 3s linear infinite' }}
            >
              <circle cx="44" cy="44" r="32"
                fill="none" stroke="rgba(129,140,248,0.2)" strokeWidth="1.5"
                strokeDasharray="20 182" strokeLinecap="round" />
            </svg>
            {/* Icon center */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: 'linear-gradient(135deg, #818CF8, #4F46E5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26,
                boxShadow: '0 8px 32px rgba(79,70,229,0.5)',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }}>
                🍽️
              </div>
            </div>
          </div>
        </div>

        {/* Brand name */}
        <div style={{
          fontSize: 30, fontWeight: 800, color: '#fff',
          letterSpacing: '-0.5px', marginBottom: 6,
          fontFamily: "'Inter', sans-serif",
          animation: 'fade-up 0.6s ease both',
        }}>
          FoodStock <span style={{ color: '#818CF8' }}>Pro</span>
        </div>
        <div style={{
          fontSize: 13, color: 'rgba(199,210,254,0.7)',
          letterSpacing: '2px', textTransform: 'uppercase',
          marginBottom: 44,
          animation: 'fade-up 0.6s 0.1s ease both',
        }}>
          Inventory Management Suite
        </div>

        {/* Progress bar */}
        <div style={{ width: 280, margin: '0 auto 14px' }}>
          <div style={{
            height: 4, background: 'rgba(255,255,255,0.1)',
            borderRadius: 10, overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #818CF8, #4F46E5)',
              borderRadius: 10,
              transition: 'width 0.08s linear',
              boxShadow: '0 0 12px rgba(129,140,248,0.6)',
            }} />
          </div>
        </div>

        {/* Status message */}
        <div style={{
          fontSize: 12.5, color: 'rgba(199,210,254,0.6)',
          letterSpacing: '0.3px', height: 20,
          transition: 'opacity 0.3s ease',
        }}>
          {MESSAGES[msgIndex]}
        </div>

        {/* Progress percent */}
        <div style={{
          marginTop: 6, fontSize: 11,
          color: 'rgba(199,210,254,0.35)',
          fontFamily: 'monospace',
        }}>
          {Math.round(progress)}%
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute', bottom: 28,
        fontSize: 11.5, color: 'rgba(199,210,254,0.3)',
        letterSpacing: '0.5px',
      }}>
        © 2026 FoodStock Pro · All rights reserved
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 8px 32px rgba(79,70,229,0.5); transform: scale(1); }
          50%       { box-shadow: 0 8px 48px rgba(129,140,248,0.75); transform: scale(1.04); }
        }
        @keyframes float-orb {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(12px, 18px) scale(1.06); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Loader;

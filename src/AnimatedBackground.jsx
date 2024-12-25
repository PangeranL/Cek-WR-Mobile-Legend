import React, { useMemo } from 'react';

const AnimatedBackground = () => {
  // Menggunakan useMemo untuk menjaga agar particles tidak di-regenerate saat re-render
  const particles = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 100 + 30,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 2
    })), []); // Empty dependency array means this will only run once

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-gradient-to-b from-black to-purple-950">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle absolute rounded-full bg-purple-600/40"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
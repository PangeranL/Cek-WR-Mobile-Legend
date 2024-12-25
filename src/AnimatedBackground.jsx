import React from 'react';

const AnimatedBackground = () => {
  // Generate 30 particles dengan ukuran lebih besar
  const particles = Array.from({ length: 30 }, (_, i) => (
    <div
      key={i}
      className="particle absolute rounded-full bg-purple-600/40"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 100 + 30}px`,  // Ukuran lebih besar
        height: `${Math.random() * 100 + 30}px`, // Ukuran lebih besar
        animationDuration: `${Math.random() * 15 + 10}s`, // Durasi lebih cepat
        animationDelay: `${Math.random() * 5}s`
      }}
    />
  ));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles}
    </div>
  );
};

export default AnimatedBackground;
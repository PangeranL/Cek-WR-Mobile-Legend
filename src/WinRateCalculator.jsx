import React, { useState, useMemo } from 'react';

// Komponen AnimatedBackground
const AnimatedBackground = () => {
  const particles = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 100 + 30,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 2
    })), []
  );

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

const WinRateCalculator = () => {
  const [totalMatch, setTotalMatch] = useState('');
  const [totalWin, setTotalWin] = useState('');
  const [targetWR, setTargetWR] = useState('');
  const [result, setResult] = useState('');

      const calculateWinRate = () => {
    const matches = parseInt(totalMatch);   // Total seluruh pertandingan saat ini
    const wins = parseInt(totalWin);        // Total menang saat ini
    const target = parseInt(targetWR);      // Target win rate dalam persen
    
    // Validasi input
    if (isNaN(matches) || isNaN(wins) || isNaN(target)) {
      setResult('Mohon masukkan angka yang valid');
      return;
    }

    // Validasi angka negatif dan target WR
    if (matches < 0 || wins < 0 || target < 0 || target > 100) {
      setResult('Mohon masukkan angka yang valid');
      return;
    }

    // Special case untuk target 100%
    if (target === 100) {
      setResult(['YOU NEED ABOUT ', 'INFINITY WIN WITHOUT LOSE', ' TO GET A ', '100% WIN RATE.']);
      return;
    }

    // Rumus yang benar:
    // X = (WR * M - 100W) / (100 - WR)
    // dimana:
    // X = jumlah win yang dibutuhkan
    // WR = target win rate
    // M = total match
    // W = total win saat ini
    const neededWins = Math.ceil((target * matches - 100 * wins) / (100 - target));

    setResult(['You need about ', `${Math.abs(neededWins)} Win without Lose`, ' to get a ', `${target}% Win Rate.`]);
  };

  return (
    <div className="min-h-screen bg-black p-4 flex items-center justify-center relative">
      <AnimatedBackground />
      
      <div className="w-full max-w-md p-6 space-y-4 bg-black/50 backdrop-blur-sm rounded-lg shadow-2xl relative z-10">
        <h1 className="text-3xl font-bold text-purple-400 text-center mb-2">
          Kalkulator Win Rate
        </h1>
        
        <p className="text-gray-300 text-center mb-6 text-sm">
          Digunakan untuk menghitung total jumlah pertandingan yang harus diambil untuk mencapai 
          target tingkat kemenangan yang diinginkan.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-purple-300 mb-2">
              Total Pertandingan Kamu Saat Ini
            </label>
            <input
              type="number"
              value={totalMatch}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) setTotalMatch(value);
              }}
              className="w-full p-3 rounded bg-gray-600/50 text-white placeholder-gray-400"
              placeholder="Contoh: 223"
            />
          </div>

          <div>
            <label className="block text-purple-300 mb-2">
              Total Win Rate Kamu Saat Ini
            </label>
            <input
              type="number"
              value={totalWin}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) setTotalWin(value);
              }}
              className="w-full p-3 rounded bg-gray-600/50 text-white placeholder-gray-400"
              placeholder="Contoh: 54"
            />
          </div>

          <div>
            <label className="block text-purple-300 mb-2">
              Win Rate Total yang Kamu Inginkan
            </label>
            <input
              type="number"
              value={targetWR}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) setTargetWR(value);
              }}
              className="w-full p-3 rounded bg-gray-600/50 text-white placeholder-gray-400"
              placeholder="Contoh: 70"
            />
          </div>

          <button
            onClick={calculateWinRate}
            className="w-full p-3 rounded bg-purple-600 hover:bg-purple-700 text-white font-medium"
          >
            Hitung
          </button>

          {result && (
            <div className="mt-4 p-4 rounded bg-gray-600/50 text-center border border-gray-500">
              <p className="text-white font-medium uppercase">
                {Array.isArray(result) ? (
                  <>
                    {result[0]}
                    <span className="text-purple-400 font-bold">{result[1]}</span>
                    {result[2]}
                    <span className="text-purple-400 font-bold">{result[3]}</span>
                  </>
                ) : (
                  result
                )}
              </p>
            </div>
          )}
        </div>

        {/* Copyright Section */}
        <div className="pt-8 text-center">
          <p className="text-sm text-purple-400">
            © {new Date().getFullYear()} Created by Panjul Auditore. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Protected by copyright law. Unauthorized reproduction or distribution of this application is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WinRateCalculator;
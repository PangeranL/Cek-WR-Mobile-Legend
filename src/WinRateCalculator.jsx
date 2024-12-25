import React, { useState } from 'react';
import AnimatedBackground from './AnimatedBackground';

const WinRateCalculator = () => {
  const [totalMatch, setTotalMatch] = useState('');
  const [totalWin, setTotalWin] = useState('');
  const [targetWR, setTargetWR] = useState('');
  const [result, setResult] = useState('');

  const calculateRequiredWins = () => {
    const matches = parseInt(totalMatch);
    const wins = parseInt(totalWin);
    const target = parseInt(targetWR);
    
    if (isNaN(matches) || isNaN(wins) || isNaN(target) || matches < wins || target > 100) {
      setResult('Mohon masukkan angka yang valid');
      return;
    }

    const currentWR = (wins / matches) * 100;
    
    if (currentWR >= target) {
      setResult('Anda sudah mencapai target Win Rate!');
      return;
    }

    const requiredMatches = Math.ceil((target * matches - 100 * wins) / (100 - target));
    const requiredWins = Math.ceil(((target * (matches + requiredMatches)) / 100) - wins);

    setResult(['You need about ', `${requiredWins} Win without Lose`, ' to get a ', `${target}% Win Rate.`]);
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
              onChange={(e) => setTotalMatch(e.target.value)}
              className="w-full p-3 rounded bg-gray-900/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm"
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
              onChange={(e) => setTotalWin(e.target.value)}
              className="w-full p-3 rounded bg-gray-900/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm"
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
              onChange={(e) => setTargetWR(e.target.value)}
              className="w-full p-3 rounded bg-gray-900/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm"
              placeholder="Contoh: 70"
            />
          </div>

          <button
            onClick={calculateRequiredWins}
            className="w-full p-3 rounded bg-purple-600 hover:bg-purple-700 text-white font-medium mt-6 transition-colors duration-200 hover:shadow-lg hover:shadow-purple-500/50"
          >
            Hitung
          </button>

          {result && (
            <div className="mt-4 p-4 rounded bg-gray-900/70 text-center border border-purple-500/50 backdrop-blur-sm">
              <p className="text-white font-medium">
                {Array.isArray(result) ? (
                  <>
                    {result[0]}
                    <span className="text-purple-400">{result[1]}</span>
                    {result[2]}
                    <span className="text-purple-400">{result[3]}</span>
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
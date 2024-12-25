import React, { useState } from 'react';

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
    <div className="min-h-screen bg-zinc-800 p-4 flex items-center justify-center">
      <div className="w-full max-w-md p-6 space-y-4">
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Kalkulator Win Rate
        </h1>
        
        <p className="text-gray-400 text-center mb-6 text-sm">
          Digunakan untuk menghitung total jumlah pertandingan yang harus diambil untuk mencapai 
          target tingkat kemenangan yang diinginkan.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">
              Total Pertandingan Kamu Saat Ini
            </label>
            <input
              type="number"
              value={totalMatch}
              onChange={(e) => setTotalMatch(e.target.value)}
              className="w-full p-3 rounded bg-zinc-700/50 text-white placeholder-gray-500 focus:outline-none"
              placeholder="Contoh: 223"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Total Win Rate Kamu Saat Ini
            </label>
            <input
              type="number"
              value={totalWin}
              onChange={(e) => setTotalWin(e.target.value)}
              className="w-full p-3 rounded bg-zinc-700/50 text-white placeholder-gray-500 focus:outline-none"
              placeholder="Contoh: 54"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              Win Rate Total yang Kamu Inginkan
            </label>
            <input
              type="number"
              value={targetWR}
              onChange={(e) => setTargetWR(e.target.value)}
              className="w-full p-3 rounded bg-zinc-700/50 text-white placeholder-gray-500 focus:outline-none"
              placeholder="Contoh: 70"
            />
          </div>

          <button
            onClick={calculateRequiredWins}
            className="w-full p-3 rounded bg-yellow-400 hover:bg-yellow-500 text-black font-medium mt-6"
          >
            Hitung
          </button>

          {result && (
            <div className="mt-4 p-4 rounded bg-zinc-700/50 text-center">
              <p className="text-white font-medium">
                {Array.isArray(result) ? (
                  <>
                    {result[0]}
                    <span className="text-yellow-400">{result[1]}</span>
                    {result[2]}
                    <span className="text-yellow-400">{result[3]}</span>
                  </>
                ) : (
                  result
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WinRateCalculator;
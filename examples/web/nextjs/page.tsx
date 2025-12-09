'use client';

import { useState, useEffect } from 'react';
import { hash, hashString, Blake3 } from 'fast-blake3';

export default function Blake3Demo() {
  const [input, setInput] = useState('Hello, World!');
  const [hashes, setHashes] = useState({
    basic: '',
    base64: '',
    hashString: '',
    matchA: '',
    matchB: '',
    different: '',
  });

  useEffect(() => {
    const text = input || 'Hello, World!';
    
    setHashes({
      basic: hash(text) as string,
      base64: Blake3.hash(text, { encoding: 'base64' }) as string,
      hashString: hashString(text) as string,
      matchA: hash(text) as string,
      matchB: hash(text) as string,
      different: hash(text + '!') as string,
    });
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          ⚡ fast-blake3
        </h1>
        <p className="text-center text-slate-400 mb-10">
          High-performance BLAKE3 hashing in Next.js
        </p>

        {/* Input */}
        <div className="bg-white/5 backdrop-blur rounded-2xl p-6 mb-6 border border-white/10">
          <label className="block text-cyan-400 font-medium mb-2">
            Enter text to hash
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type something..."
            className="w-full px-4 py-3 bg-black/30 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-400 transition"
          />
        </div>

        {/* Results */}
        <div className="space-y-4">
          <ResultCard title="🔐 Basic Hash (hex)" value={hashes.basic} />
          <ResultCard title="📦 Base64 Encoding" value={hashes.base64} />
          <ResultCard title="📝 hashString()" value={hashes.hashString} />
        </div>

        {/* Comparison */}
        <h2 className="text-lg text-slate-400 mt-10 mb-4 pb-2 border-b border-white/10">
          Hash Comparison
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10 text-center">
            <div className="text-4xl text-emerald-400 mb-2">✓</div>
            <h3 className="text-emerald-400 text-sm uppercase tracking-wide mb-1">Same Input</h3>
            <p className="text-slate-400 text-sm">
              {hashes.matchA === hashes.matchB ? 'true' : 'false'}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10 text-center">
            <div className="text-4xl text-red-400 mb-2">✗</div>
            <h3 className="text-red-400 text-sm uppercase tracking-wide mb-1">Different Input</h3>
            <p className="text-slate-400 text-sm">
              {hashes.matchA === hashes.different ? 'true' : 'false'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white/5 backdrop-blur rounded-xl p-5 border border-white/10 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-cyan-500/10 transition">
      <h3 className="text-emerald-400 text-xs uppercase tracking-wider mb-2">{title}</h3>
      <div className="font-mono text-sm bg-black/30 p-3 rounded-lg break-all">
        {value}
      </div>
    </div>
  );
}

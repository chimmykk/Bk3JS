'use client';

import { useState, useEffect, useRef } from 'react';
import { hash, Blake3 } from 'fast-blake3';

export default function Blake3Demo() {
  const [input, setInput] = useState('Hello, World!');
  const [hashes, setHashes] = useState({
    basic: '',
    base64: '',
    different: '',
  });
  
  // Image state
  const [imageHash, setImageHash] = useState('');
  const [imageName, setImageName] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const text = input || 'Hello, World!';
    setHashes({
      basic: hash(text) as string,
      base64: Blake3.hash(text, { encoding: 'base64' }) as string,
      different: hash(text + '!') as string,
    });
  }, [input]);

  const handleImageHash = async (file: File) => {
    setImageName(file.name);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
    
    // Hash the file
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const fileHash = hash(uint8Array) as string;
    setImageHash(fileHash);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageHash(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) handleImageHash(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            fast-blake3
          </h1>
          <p className="text-xl text-slate-400">
            Turn any text or image into a unique fingerprint!
          </p>
        </div>

        {/* Text Hashing */}
        <div className="bg-white/5 backdrop-blur rounded-2xl p-6 mb-8 border border-white/10">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">Hash some text</h2>
          <p className="text-slate-400 mb-4">Type anything below and watch the magic happen:</p>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type something fun..."
            className="w-full px-5 py-4 bg-black/40 rounded-xl text-white text-lg outline-none focus:ring-2 focus:ring-cyan-400 transition placeholder-slate-500"
          />
          <div className="mt-4">
            <span className="text-slate-400 text-sm">Your text's fingerprint:</span>
            <div className="bg-black/40 rounded-xl p-4 font-mono text-sm break-all text-emerald-400 mt-2">
              {hashes.basic}
            </div>
          </div>
        </div>

        {/* Image Hashing */}
        <div className="bg-white/5 backdrop-blur rounded-2xl p-6 mb-8 border border-white/10">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">Hash an image</h2>
          <p className="text-slate-400 mb-4">
            Drop an image or click to upload — get its unique fingerprint!
          </p>
          
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
              ${isDragging 
                ? 'border-cyan-400 bg-cyan-500/20' 
                : 'border-slate-600 hover:border-cyan-400 hover:bg-white/5'}
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {imagePreview ? (
              <div className="space-y-4">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-h-40 mx-auto rounded-lg shadow-lg"
                />
                <p className="text-slate-400 text-sm">{imageName}</p>
              </div>
            ) : (
              <div>
                <div className="text-4xl mb-3">🖼️</div>
                <p className="text-slate-300">Drop an image here or click to upload</p>
                <p className="text-slate-500 text-sm mt-1">PNG, JPG, GIF, etc.</p>
              </div>
            )}
          </div>

          {imageHash && (
            <div className="mt-4">
              <span className="text-slate-400 text-sm">Image fingerprint:</span>
              <div className="bg-black/40 rounded-xl p-4 font-mono text-sm break-all text-emerald-400 mt-2">
                {imageHash}
              </div>
              <p className="text-slate-500 text-xs mt-2">
                Change even 1 pixel and this entire hash changes!
              </p>
            </div>
          )}
        </div>


      </div>
    </div>
  );
}

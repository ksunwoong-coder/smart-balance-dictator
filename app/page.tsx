'use client';

import { useState, useCallback, useRef } from 'react';
import ResultsPanel from '@/components/ResultsPanel';
import type { InterpretResponse } from '@/lib/types';

type AppStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Home() {
  const [image, setImage] = useState<{ src: string; base64: string; mediaType: string } | null>(null);
  const [status, setStatus] = useState<AppStatus>('idle');
  const [result, setResult] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function loadFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const [header, base64] = dataUrl.split(',');
      const mediaType = header.match(/:(.*?);/)?.[1] ?? 'image/png';
      setImage({ src: dataUrl, base64, mediaType });
      setStatus('idle');
      setResult('');
      setErrorMsg('');
    };
    reader.readAsDataURL(file);
  }

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const item = Array.from(e.clipboardData.items).find((i) => i.type.startsWith('image/'));
    if (item) loadFile(item.getAsFile()!);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) loadFile(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
  };

  async function handleInterpret() {
    if (!image) return;
    setStatus('loading');
    setResult('');
    setErrorMsg('');
    try {
      const res = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData: image.base64, mediaType: image.mediaType }),
      });
      const data: InterpretResponse = await res.json();
      if (!res.ok || data.error) {
        setStatus('error');
        setErrorMsg(data.error ?? 'Request failed.');
        return;
      }
      setResult(data.interpretation);
      setStatus('success');
      setTimeout(() => {
        document.getElementById('results-panel')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection.');
    }
  }

  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-900"
      onPaste={handlePaste}
    >
      <header className="bg-white border-b border-slate-200 px-6 py-4 print:hidden">
        <h1 className="text-lg font-semibold text-slate-800">Smart Balance Dictator</h1>
        <p className="text-sm text-slate-500">Paste or upload a Smart Balance report image to generate a clinical interpretation</p>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
            ${isDragging ? 'border-teal-400 bg-teal-50' : 'border-slate-300 bg-white hover:border-teal-400 hover:bg-teal-50/30'}
            ${image ? 'py-4' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {image ? (
            <div className="space-y-3">
              <img
                src={image.src}
                alt="Smart Balance report"
                className="max-h-80 mx-auto rounded-lg shadow-sm object-contain"
              />
              <p className="text-xs text-slate-400">Click to replace · paste a new image anywhere on this page</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-4xl text-slate-300">⌘V</div>
              <p className="text-slate-600 font-medium">Paste your Smart Balance report here</p>
              <p className="text-sm text-slate-400">or click to browse · drag and drop supported</p>
            </div>
          )}
        </div>

        {image && (
          <button
            onClick={handleInterpret}
            disabled={status === 'loading'}
            className="w-full py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'loading' ? 'Interpreting...' : 'Generate Interpretation'}
          </button>
        )}

        {status === 'loading' && (
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200">
            <div className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-slate-600">Analyzing posturography report...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            {errorMsg}
          </div>
        )}

        {status === 'success' && result && (
          <ResultsPanel content={result} />
        )}
      </div>
    </div>
  );
}

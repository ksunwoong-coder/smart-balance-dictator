'use client';

import { useState } from 'react';

interface Props {
  content: string;
}

const SECTION_PATTERNS = [
  { key: 'sensory', heading: '1. Sensory Profile Summary', color: 'border-blue-400 bg-blue-50' },
  { key: 'ratios', heading: '2. Key Ratios', color: 'border-purple-400 bg-purple-50' },
  { key: 'interpretation', heading: '3. Primary Clinical Interpretation', color: 'border-teal-400 bg-teal-50' },
  { key: 'confidence', heading: '4. Confidence Level', color: 'border-amber-400 bg-amber-50' },
  { key: 'rehab', heading: '5. Rehabilitation Implications', color: 'border-green-400 bg-green-50' },
];

function parseSections(text: string): { heading: string; body: string; color: string }[] {
  const result: { heading: string; body: string; color: string }[] = [];
  const indices: { index: number; pattern: typeof SECTION_PATTERNS[0] }[] = [];

  for (const pattern of SECTION_PATTERNS) {
    const idx = text.indexOf(pattern.heading);
    if (idx !== -1) indices.push({ index: idx, pattern });
  }

  // Also try bold variants: **1. Sensory...** or **1. ...**
  if (indices.length === 0) {
    // Fallback: render as single block
    return [{ heading: 'Interpretation', body: text.trim(), color: 'border-teal-400 bg-teal-50' }];
  }

  indices.sort((a, b) => a.index - b.index);

  for (let i = 0; i < indices.length; i++) {
    const start = indices[i].index + indices[i].pattern.heading.length;
    const end = i + 1 < indices.length ? indices[i + 1].index : text.length;
    const body = text.slice(start, end).replace(/^\s*\n/, '').trimEnd();
    result.push({ heading: indices[i].pattern.heading, body, color: indices[i].pattern.color });
  }

  return result;
}

export default function ResultsPanel({ content }: Props) {
  const [copied, setCopied] = useState(false);
  const sections = parseSections(content);

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div id="results-panel" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-800">Clinical Interpretation</h2>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="text-sm px-3 py-1.5 rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
          <button
            onClick={() => window.print()}
            className="text-sm px-3 py-1.5 rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Print
          </button>
        </div>
      </div>

      <div className="space-y-3 print:space-y-4">
        {sections.map(({ heading, body, color }) => (
          <div key={heading} className={`rounded-lg border-l-4 p-4 ${color}`}>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">{heading}</p>
            <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

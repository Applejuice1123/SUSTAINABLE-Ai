"use client";
import React, { useState } from "react";
import Link from "next/link";

// Constants for the equation
const FLOPs_PER_TOKEN = 364_000_000_000; // 364B
const ENERGY_PER_FLOP = 0.03e-9; // 0.03 × 10⁻⁹ J
const WH_CONVERSION = 3_600_000_000; // 3.6B (Joules to Wh)

function estimateTokens(text: string) {
  if (!text) return 0;
  const words = text.trim().split(/\s+/);
  return Math.max(1, Math.round(words.length * 1.3));
}

const AnimatedNumber = ({ value, decimals = 0 }: { value: number; decimals?: number }) => {
  const [display, setDisplay] = React.useState(value);
  React.useEffect(() => {
    let start = display;
    let end = value;
    let frame: number;
    let startTime: number;
    function animate(ts: number) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / 400, 1);
      setDisplay(start + (end - start) * progress);
      if (progress < 1) frame = requestAnimationFrame(animate);
      else setDisplay(end);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line
  }, [value]);
  return (
    <span>
      {decimals === 0 ? Math.round(display) : display.toExponential(decimals)}
    </span>
  );
};

export default function CalculatorPage() {
  const [sentence, setSentence] = useState("");
  const [sentenceTokens, setSentenceTokens] = useState(0);
  const [showFormula, setShowFormula] = useState(false);

  React.useEffect(() => {
    setSentenceTokens(estimateTokens(sentence));
  }, [sentence]);

  const sentenceEnergy =
    sentenceTokens > 0
      ? ((sentenceTokens * FLOPs_PER_TOKEN * ENERGY_PER_FLOP) / WH_CONVERSION)
      : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-green-100 p-4">
      <div className="backdrop-blur-xl bg-white/70 border border-blue-100 rounded-3xl shadow-2xl p-8 max-w-xl w-full flex flex-col gap-8 relative animate-fade-in">
        {/* Accent bar */}
        <div className="absolute left-0 top-8 h-12 w-2 bg-gradient-to-b from-blue-500 to-green-400 rounded-r-xl" />
        <div className="flex items-center gap-3 mb-2">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">AI Inference Energy Calculator</h1>
        </div>
        <p className="text-gray-600 text-center mb-2 text-lg">
          Estimate the number of tokens and energy used per inference for a ~175B parameter model (e.g., GPT-3).
        </p>
        <div>
          <label htmlFor="sentence" className="block font-semibold mb-1 text-gray-800">Type a sentence:</label>
          <textarea
            id="sentence"
            className="border-2 border-blue-200 focus:border-blue-400 transition rounded-xl px-4 py-3 w-full min-h-[60px] text-base bg-white/80 shadow-inner placeholder-gray-400 focus:outline-none"
            value={sentence}
            onChange={e => setSentence(e.target.value)}
            placeholder="Type your sentence here..."
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-2">
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-5 py-2 shadow-sm animate-fade-in-up">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
            <span className="font-semibold text-blue-700">Tokens:</span>
            <span className="font-mono text-blue-900 text-lg"><AnimatedNumber value={sentenceTokens} /></span>
          </div>
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-5 py-2 shadow-sm animate-fade-in-up">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            <span className="font-semibold text-green-700">Energy:</span>
            <span className="font-mono text-green-900 text-lg"><AnimatedNumber value={sentenceEnergy} decimals={3} /></span>
            <span className="text-xs text-green-700 ml-1">Wh</span>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center">(While this may seem a very low number, imagine hundreds of billions of tokens every day.)</div>
        <button
          className="mt-4 mx-auto flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold rounded-xl shadow hover:scale-105 transition-transform"
          onClick={() => setShowFormula(f => !f)}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          {showFormula ? "Hide" : "Show"} Formula & Details
        </button>
        {showFormula && (
          <div className="mt-2 bg-gray-900/90 text-gray-100 rounded-xl p-4 font-mono text-sm shadow-inner animate-fade-in-up">
            <b>Formula:</b><br />
            <span>
              Energy<sub>per_inference</sub> (Wh) = (tokens × FLOPs<sub>per_token</sub> × energy<sub>per_FLOP</sub>) / 3,600,000,000
            </span>
            <ul className="mt-2 text-xs text-gray-300 list-disc list-inside">
              <li>tokens = estimated from your sentence</li>
              <li>FLOPs<sub>per_token</sub> ≈ 364,000,000,000</li>
              <li>energy<sub>per_FLOP</sub> ≈ 0.03 × 10⁻⁹ J</li>
              <li>3,600,000,000 = conversion from Joules to Wh</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 
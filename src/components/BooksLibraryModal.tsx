import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Search, 
  Bookmark, 
  Calculator, 
  Check, 
  ChevronRight, 
  Award, 
  FileText, 
  Target, 
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { TRADING_BOOKS } from '../data/tradingBooksData';
import { BookInfo, BookUnit } from '../types/trading';
import { PatternDiagram } from './PatternDiagram';

interface BooksLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCalculatedLevels?: (levels: { entry: number; sl: number; tp: number }) => void;
}

export const BooksLibraryModal: React.FC<BooksLibraryModalProps> = ({
  isOpen,
  onClose,
  onApplyCalculatedLevels
}) => {
  const [selectedBookId, setSelectedBookId] = useState<'elearnmarkets' | 'fidelity'>('elearnmarkets');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeUnitId, setActiveUnitId] = useState<string>('elm-unit-3'); // default Head & Shoulders

  // Pattern target calculator state
  const [calcHigh, setCalcHigh] = useState<string>('150');
  const [calcLow, setCalcLow] = useState<string>('120');
  const [calcBreakout, setCalcBreakout] = useState<string>('150');
  const [calcCopied, setCalcCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentBook: BookInfo = TRADING_BOOKS.find(b => b.id === selectedBookId) || TRADING_BOOKS[0];

  const categories = ['All', 'Reversal Patterns', 'Continuation Patterns', 'Candlesticks', 'Volatility & Short-term', 'Trading Rules & Risk'];

  const filteredUnits = currentBook.units.filter(u => {
    const matchCat = selectedCategory === 'All' || u.category === selectedCategory;
    const matchSearch = u.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        u.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        u.description.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const activeUnit: BookUnit = currentBook.units.find(u => u.id === activeUnitId) || currentBook.units[0];

  // Dynamic calculation for pattern target projection based on Kirkpatrick & Elearnmarkets formulas
  const patternHeight = Math.max(0, (parseFloat(calcHigh) || 0) - (parseFloat(calcLow) || 0));
  const calcEntry = parseFloat(calcBreakout) || 0;
  const projectedTarget = (calcEntry + patternHeight).toFixed(2);
  const projectedStop = (calcEntry - (patternHeight * 0.45)).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 md:p-4">
      <div className="bg-[#181c27] border border-[#2a2e39] rounded-2xl w-full max-w-6xl h-[92vh] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-[#131722] border-b border-[#2a2e39] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2962FF] to-[#7c3aed] flex items-center justify-center text-white shadow-lg">
              <BookOpen size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-wide">
                  GRIFFIN TRADING ACADEMY & PATTERN LIBRARY
                </h2>
                <span className="text-[10px] bg-[#f59e0b]/20 text-[#f59e0b] px-2 py-0.5 rounded font-mono font-bold">
                  2 COMPLETE EBOOKS INCLUDED
                </span>
              </div>
              <p className="text-xs text-[#787b86]">
                Master technical chart patterns, breakout validation rules, and risk management formulas.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#181c27] hover:bg-[#2a2e39] border border-[#2a2e39] text-[#787b86] hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Book Selector Banner */}
        <div className="px-5 py-2.5 bg-[#161a24] border-b border-[#2a2e39] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#787b86] font-semibold uppercase tracking-wider">Select Book:</span>
            <div className="flex items-center bg-[#131722] p-1 rounded-lg border border-[#2a2e39]">
              <button
                onClick={() => {
                  setSelectedBookId('elearnmarkets');
                  setActiveUnitId('elm-unit-3');
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  selectedBookId === 'elearnmarkets'
                    ? 'bg-[#2962FF] text-white shadow-sm'
                    : 'text-[#787b86] hover:text-white'
                }`}
              >
                <FileText size={13} />
                <span>The Ultimate Ebook on Chart Patterns (elearnmarkets)</span>
              </button>

              <button
                onClick={() => {
                  setSelectedBookId('fidelity');
                  setActiveUnitId('fid-unit-1');
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  selectedBookId === 'fidelity'
                    ? 'bg-[#2962FF] text-white shadow-sm'
                    : 'text-[#787b86] hover:text-white'
                }`}
              >
                <Award size={13} className="text-amber-400" />
                <span>Identifying Chart Patterns (Fidelity / Charles Kirkpatrick, CMT)</span>
              </button>
            </div>
          </div>

          <div className="text-xs text-[#787b86] font-mono hidden lg:block">
            {currentBook.totalPages} Pages · {currentBook.author}
          </div>
        </div>

        {/* Main Content Area: Sidebar Units + Reader View */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Column: Chapters / Units List */}
          <div className="w-80 border-r border-[#2a2e39] bg-[#131722] flex flex-col shrink-0 overflow-hidden">
            {/* Search Units */}
            <div className="p-3 border-b border-[#2a2e39]">
              <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[#181c27] rounded border border-[#2a2e39]">
                <Search size={14} className="text-[#787b86]" />
                <input
                  type="text"
                  placeholder="Search pattern, rules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-white placeholder-[#787b86] outline-none"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 mt-2 overflow-x-auto scrollbar-none pb-0.5">
                {categories.slice(0, 4).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2 py-0.5 rounded text-[10px] whitespace-nowrap transition-colors ${
                      selectedCategory === cat ? 'bg-[#2a2e39] text-white font-semibold' : 'text-[#787b86] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Units Scroll List */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#2a2e39]/50 p-1">
              {filteredUnits.map((unit) => {
                const isActive = unit.id === activeUnit.id;
                return (
                  <button
                    key={unit.id}
                    onClick={() => setActiveUnitId(unit.id)}
                    className={`w-full p-2.5 text-left rounded-lg transition-colors flex items-start justify-between group ${
                      isActive ? 'bg-[#2962FF]/15 border border-[#2962FF]/40' : 'hover:bg-[#181c27]'
                    }`}
                  >
                    <div className="flex-1 pr-2">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-mono text-[#787b86]">{unit.unitNumber}</span>
                        {unit.successRate && (
                          <span className="text-[9px] font-mono text-[#089981] bg-[#089981]/15 px-1 rounded">
                            {unit.successRate}
                          </span>
                        )}
                      </div>
                      <div className={`text-xs font-semibold line-clamp-1 ${isActive ? 'text-white' : 'text-[#d1d4dc] group-hover:text-white'}`}>
                        {unit.title}
                      </div>
                      <div className="text-[10px] text-[#787b86] line-clamp-1 mt-0.5">
                        {unit.summary}
                      </div>
                    </div>
                    <ChevronRight size={14} className={`shrink-0 mt-1 transition-transform ${isActive ? 'text-[#2962FF] translate-x-0.5' : 'text-[#787b86]'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Reader & Calculator */}
          <div className="flex-1 bg-[#181c27] overflow-y-auto p-4 md:p-6 space-y-6">
            {/* Unit Title & Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#2a2e39]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-[#2962FF] uppercase">
                    {activeUnit.unitNumber} · {activeUnit.category}
                  </span>
                  {activeUnit.patternType && (
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      activeUnit.patternType === 'Bullish' ? 'bg-[#089981]/20 text-[#089981]' : activeUnit.patternType === 'Bearish' ? 'bg-[#f23645]/20 text-[#f23645]' : 'bg-[#2a2e39] text-[#d1d4dc]'
                    }`}>
                      {activeUnit.patternType}
                    </span>
                  )}
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-white">
                  {activeUnit.title}
                </h1>
                <p className="text-xs text-[#787b86] mt-1">
                  Source: {currentBook.title} by {currentBook.author}
                </p>
              </div>

              {activeUnit.successRate && (
                <div className="bg-[#131722] border border-[#089981]/30 px-3 py-1.5 rounded-lg text-right shrink-0">
                  <div className="text-[10px] text-[#787b86]">Statistical Reliability</div>
                  <div className="text-sm font-bold font-mono text-[#089981]">{activeUnit.successRate}</div>
                </div>
              )}
            </div>

            {/* Pattern Vector Diagram */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#787b86]">
                  Geometric Anatomy & Breakout Target Diagram
                </span>
                <span className="text-[11px] text-[#2962FF] font-medium">Interactive Vector</span>
              </div>
              <PatternDiagram type={activeUnit.diagram} />
            </div>

            {/* In-depth Book Text */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Technical Analysis Breakdown
              </h3>
              <div className="space-y-2 text-xs md:text-sm text-[#d1d4dc] leading-relaxed">
                {activeUnit.description.map((paragraph, idx) => (
                  <p key={idx} className="bg-[#131722]/60 p-3 rounded-lg border border-[#2a2e39]/50">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Trading Rules & Confirmation Filters */}
            <div className="p-4 bg-[#131722] rounded-xl border border-[#2a2e39] space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#f59e0b] uppercase tracking-wider">
                <ShieldAlert size={15} />
                <span>Execution Rules & Breakout Confirmation Filters</span>
              </div>
              <ul className="space-y-2 text-xs text-[#d1d4dc]">
                {activeUnit.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#089981] font-bold">✓</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Formulas: Target & Stop-loss */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 bg-[#131722] rounded-xl border border-[#089981]/30 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#089981]">
                  <Target size={14} />
                  <span>Target Projection Formula</span>
                </div>
                <div className="text-xs font-mono text-white pt-1">
                  {activeUnit.targetFormula}
                </div>
              </div>

              <div className="p-3.5 bg-[#131722] rounded-xl border border-[#f23645]/30 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#f23645]">
                  <ShieldAlert size={14} />
                  <span>Stop-Loss & Invalidation Level</span>
                </div>
                <div className="text-xs font-mono text-white pt-1">
                  {activeUnit.stopLossFormula}
                </div>
              </div>
            </div>

            {/* Real Market Case Study from the Book (e.g. Tata Motors, Escorts, SBI) */}
            {activeUnit.exampleStock && (
              <div className="p-3.5 bg-gradient-to-r from-[#1e222d] to-[#161a24] rounded-xl border border-[#2962FF]/40 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Award size={14} className="text-[#2962FF]" />
                    <span>Real Market Case Study: {activeUnit.exampleStock}</span>
                  </span>
                  <span className="text-[10px] text-[#787b86] font-mono">FROM EBOOK ARCHIVES</span>
                </div>
                <p className="text-xs text-[#d1d4dc] leading-relaxed">
                  {activeUnit.exampleContext}
                </p>
              </div>
            )}

            {/* Interactive Target & Stop Calculator */}
            <div className="p-4 bg-[#131722] rounded-xl border border-[#2a2e39] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Calculator size={15} className="text-[#2962FF]" />
                  <span>Pattern Measurement Calculator</span>
                </div>
                <span className="text-[10px] text-[#787b86]">Vertical Height Projection</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-[11px] text-[#787b86] block mb-1">Pattern High (Peak)</label>
                  <input
                    type="number"
                    value={calcHigh}
                    onChange={(e) => setCalcHigh(e.target.value)}
                    className="w-full bg-[#181c27] border border-[#2a2e39] rounded px-3 py-1.5 text-white font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#787b86] block mb-1">Pattern Low (Neckline/Base)</label>
                  <input
                    type="number"
                    value={calcLow}
                    onChange={(e) => setCalcLow(e.target.value)}
                    className="w-full bg-[#181c27] border border-[#2a2e39] rounded px-3 py-1.5 text-white font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#787b86] block mb-1">Breakout Entry Price</label>
                  <input
                    type="number"
                    value={calcBreakout}
                    onChange={(e) => setCalcBreakout(e.target.value)}
                    className="w-full bg-[#181c27] border border-[#2a2e39] rounded px-3 py-1.5 text-white font-mono outline-none"
                  />
                </div>
              </div>

              {/* Calculated Outputs */}
              <div className="p-3 bg-[#181c27] rounded-lg border border-[#2a2e39] grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <div className="text-[10px] text-[#787b86]">Measured Height</div>
                  <div className="font-mono font-bold text-white tabular-nums">${patternHeight.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#089981]">Projected Target</div>
                  <div className="font-mono font-bold text-[#089981] tabular-nums">${projectedTarget}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#f23645]">Protective Stop</div>
                  <div className="font-mono font-bold text-[#f23645] tabular-nums">${projectedStop}</div>
                </div>
              </div>

              {onApplyCalculatedLevels && (
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      onApplyCalculatedLevels({
                        entry: calcEntry,
                        sl: parseFloat(projectedStop),
                        tp: parseFloat(projectedTarget)
                      });
                      setCalcCopied(true);
                      setTimeout(() => setCalcCopied(false), 2000);
                    }}
                    className="px-3 py-1.5 bg-[#2962FF] hover:bg-[#2962FF]/90 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    {calcCopied ? <Check size={13} /> : <TrendingUp size={13} />}
                    <span>{calcCopied ? 'Loaded to Simulator!' : 'Send Levels to Paper Desk'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

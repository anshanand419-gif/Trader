import React, { useState } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  Flame, 
  TrendingUp, 
  TrendingDown, 
  Globe, 
  Layers, 
  Maximize2,
  Activity
} from 'lucide-react';
import { Ticker } from '../types/trading';

interface BottomMarketBarProps {
  currentTicker: Ticker;
  allTickers: Ticker[];
  onSelectTicker: (ticker: Ticker) => void;
  paperBalance: number;
  openPositionsCount: number;
  unrealizedPnl: number;
}

export const BottomMarketBar: React.FC<BottomMarketBarProps> = ({
  currentTicker,
  allTickers,
  onSelectTicker,
  paperBalance,
  openPositionsCount,
  unrealizedPnl
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'gainers' | 'losers'>('all');

  const filtered = allTickers.filter(t => {
    if (filterType === 'gainers') return t.changePercent > 0;
    if (filterType === 'losers') return t.changePercent < 0;
    return true;
  });

  return (
    <div className="w-full bg-[#181c27] border-t border-[#2a2e39] flex flex-col shrink-0 select-none z-20">
      {/* Collapsed Bar: Quick Symbol Stats & Desk Status */}
      <div className="h-9 px-3 flex items-center justify-between text-xs text-[#787b86]">
        {/* Left: Active Ticker Highlights */}
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1">
          <div className="flex items-center gap-1.5 font-medium text-white shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#089981]" />
            <span className="font-bold">{currentTicker.symbol}</span>
            <span className="text-[11px] text-[#787b86] hidden sm:inline">({currentTicker.exchange})</span>
          </div>

          <div className="h-3.5 w-[1px] bg-[#2a2e39] shrink-0" />

          <div className="flex items-center gap-3 font-mono text-[11px] shrink-0">
            <div>
              <span className="text-[#787b86]">24h High: </span>
              <span className="text-white font-medium tabular-nums">
                {currentTicker.high24h.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div>
              <span className="text-[#787b86]">24h Low: </span>
              <span className="text-white font-medium tabular-nums">
                {currentTicker.low24h.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="hidden md:block">
              <span className="text-[#787b86]">Volume: </span>
              <span className="text-white font-medium">{currentTicker.volume}</span>
            </div>
          </div>
        </div>

        {/* Right: Paper Account Quick Badge & Drawer Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px]">
            <span className="text-[#787b86]">Paper Balance:</span>
            <span className="text-white font-semibold tabular-nums">
              ${paperBalance.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </span>
            {openPositionsCount > 0 && (
              <span className={`font-semibold tabular-nums ${unrealizedPnl >= 0 ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                ({unrealizedPnl >= 0 ? '+' : ''}${unrealizedPnl.toFixed(1)})
              </span>
            )}
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-2 py-1 bg-[#131722] hover:bg-[#2a2e39] border border-[#2a2e39] rounded text-[11px] text-[#d1d4dc] transition-colors"
          >
            <span>Market Heatmap & Screener</span>
            {isExpanded ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
          </button>
        </div>
      </div>

      {/* Expanded Screener Drawer */}
      {isExpanded && (
        <div className="p-3 bg-[#131722] border-t border-[#2a2e39] max-h-48 overflow-y-auto animate-in slide-in-from-bottom duration-150">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                Global Market Screener
              </span>
              <div className="flex items-center bg-[#181c27] p-0.5 rounded border border-[#2a2e39]">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${filterType === 'all' ? 'bg-[#2962FF] text-white' : 'text-[#787b86]'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType('gainers')}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${filterType === 'gainers' ? 'bg-[#089981] text-white' : 'text-[#787b86]'}`}
                >
                  Top Gainers
                </button>
                <button
                  onClick={() => setFilterType('losers')}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${filterType === 'losers' ? 'bg-[#f23645] text-white' : 'text-[#787b86]'}`}
                >
                  Top Losers
                </button>
              </div>
            </div>

            <span className="text-[10px] text-[#787b86]">Click any asset to switch chart</span>
          </div>

          {/* Grid of mini tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {filtered.map((t) => {
              const isPos = t.changePercent >= 0;
              const isSelected = t.symbol === currentTicker.symbol;
              return (
                <button
                  key={t.symbol}
                  onClick={() => onSelectTicker(t)}
                  className={`p-2 rounded border text-left transition-all ${
                    isSelected
                      ? 'bg-[#2962FF]/20 border-[#2962FF]'
                      : isPos
                      ? 'bg-[#089981]/10 border-[#089981]/25 hover:border-[#089981]'
                      : 'bg-[#f23645]/10 border-[#f23645]/25 hover:border-[#f23645]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{t.symbol}</span>
                    <span className="text-[9px] text-[#787b86] uppercase">{t.exchange}</span>
                  </div>
                  <div className="font-mono text-xs text-white font-semibold mt-1 tabular-nums">
                    {t.currency === 'INR' ? '₹' : '$'}
                    {t.price.toLocaleString(undefined, {
                      minimumFractionDigits: t.price < 1 ? 4 : 2,
                      maximumFractionDigits: t.price < 1 ? 4 : 2
                    })}
                  </div>
                  <div className={`text-[10px] font-mono font-bold mt-0.5 ${isPos ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                    {isPos ? '+' : ''}{t.changePercent.toFixed(2)}%
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

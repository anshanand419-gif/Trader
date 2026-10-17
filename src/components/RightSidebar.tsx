import React, { useState } from 'react';
import { 
  ListFilter, 
  Zap, 
  Wallet, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  BarChart2, 
  ChevronRight,
  Maximize2,
  Sliders
} from 'lucide-react';
import { AssetCategory, OrderHistoryItem, Position, Ticker } from '../types/trading';
import { GriffinSignalRadar } from './GriffinSignalRadar';
import { PaperTradingWidget } from './PaperTradingWidget';

interface RightSidebarProps {
  currentTicker: Ticker;
  allTickers: Ticker[];
  onSelectTicker: (ticker: Ticker) => void;
  activeTab: 'watchlist' | 'radar' | 'paper' | 'screener';
  onSelectTab: (tab: 'watchlist' | 'radar' | 'paper' | 'screener') => void;
  paperBalance: number;
  paperEquity: number;
  positions: Position[];
  orderHistory: OrderHistoryItem[];
  onOpenPosition: (pos: Omit<Position, 'id' | 'pnl' | 'pnlPercent' | 'timestamp'>) => void;
  onClosePosition: (id: string) => void;
  onResetAccount: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  currentTicker,
  allTickers,
  onSelectTicker,
  activeTab,
  onSelectTab,
  paperBalance,
  paperEquity,
  positions,
  orderHistory,
  onOpenPosition,
  onClosePosition,
  onResetAccount
}) => {
  const [watchlistCategory, setWatchlistCategory] = useState<AssetCategory | 'all'>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [presetSetup, setPresetSetup] = useState<{ side: 'BUY' | 'SELL'; entry: number; sl: number; tp: number } | null>(null);

  const categories: { id: AssetCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'stocks', label: 'Stocks' },
    { id: 'forex', label: 'Forex' },
    { id: 'indices', label: 'Indices' },
    { id: 'commodities', label: 'Commodities' }
  ];

  const filteredWatchlist = allTickers.filter(t => {
    const matchCategory = watchlistCategory === 'all' || t.category === watchlistCategory;
    const matchSearch = t.symbol.toLowerCase().includes(searchFilter.toLowerCase()) || 
                        t.name.toLowerCase().includes(searchFilter.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleTransferRadarSetup = (setup: { side: 'BUY' | 'SELL'; entry: number; sl: number; tp: number }) => {
    setPresetSetup(setup);
    onSelectTab('paper');
  };

  return (
    <aside className="w-80 md:w-88 lg:w-96 bg-[#181c27] border-l border-[#2a2e39] flex flex-col shrink-0 select-none z-10 h-full overflow-hidden">
      {/* Top Segmented Navigation Tabs */}
      <div className="flex items-center bg-[#131722] p-1 border-b border-[#2a2e39] gap-1 shrink-0">
        <button
          onClick={() => onSelectTab('watchlist')}
          className={`flex-1 py-1.5 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1 transition-colors ${
            activeTab === 'watchlist'
              ? 'bg-[#2962FF] text-white shadow-sm'
              : 'text-[#787b86] hover:text-white hover:bg-[#1e222d]'
          }`}
        >
          <ListFilter size={13} />
          <span>Watchlist</span>
        </button>

        <button
          onClick={() => onSelectTab('radar')}
          className={`flex-1 py-1.5 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1 transition-colors ${
            activeTab === 'radar'
              ? 'bg-[#2962FF] text-white shadow-sm'
              : 'text-[#787b86] hover:text-white hover:bg-[#1e222d]'
          }`}
        >
          <Zap size={13} className="text-[#089981]" />
          <span>Radar</span>
        </button>

        <button
          onClick={() => onSelectTab('paper')}
          className={`flex-1 py-1.5 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1 transition-colors relative ${
            activeTab === 'paper'
              ? 'bg-[#2962FF] text-white shadow-sm'
              : 'text-[#787b86] hover:text-white hover:bg-[#1e222d]'
          }`}
        >
          <Wallet size={13} />
          <span>Paper</span>
          {positions.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-[#089981]" />
          )}
        </button>

        <button
          onClick={() => onSelectTab('screener')}
          className={`flex-1 py-1.5 px-2 rounded text-xs font-semibold flex items-center justify-center gap-1 transition-colors ${
            activeTab === 'screener'
              ? 'bg-[#2962FF] text-white shadow-sm'
              : 'text-[#787b86] hover:text-white hover:bg-[#1e222d]'
          }`}
        >
          <BarChart2 size={13} />
          <span>Scanner</span>
        </button>
      </div>

      {/* Main Tab Content Viewport */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* TAB 1: WATCHLIST */}
        {activeTab === 'watchlist' && (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Watchlist Category Filter Chips */}
            <div className="px-2.5 py-2 border-b border-[#2a2e39] flex items-center gap-1 overflow-x-auto scrollbar-none bg-[#131722]/50 shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setWatchlistCategory(cat.id)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium whitespace-nowrap transition-colors ${
                    watchlistCategory === cat.id
                      ? 'bg-[#2a2e39] text-white font-semibold'
                      : 'text-[#787b86] hover:text-[#d1d4dc] hover:bg-[#1e222d]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick Watchlist Search */}
            <div className="px-3 py-1.5 border-b border-[#2a2e39] bg-[#131722] flex items-center gap-2 shrink-0">
              <Search size={13} className="text-[#787b86]" />
              <input
                type="text"
                placeholder="Filter watchlist..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder-[#787b86] outline-none"
              />
            </div>

            {/* Watchlist Header Labels */}
            <div className="px-3 py-1.5 bg-[#181c27] border-b border-[#2a2e39] flex items-center justify-between text-[10px] text-[#787b86] font-semibold uppercase tracking-wider shrink-0">
              <span>Symbol</span>
              <div className="flex items-center gap-6">
                <span>Last</span>
                <span>24h Chg</span>
              </div>
            </div>

            {/* Watchlist Tickers List */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#2a2e39]/50">
              {filteredWatchlist.map((ticker) => {
                const isSelected = ticker.symbol === currentTicker.symbol;
                const isPositive = ticker.changePercent >= 0;

                return (
                  <button
                    key={ticker.symbol}
                    onClick={() => onSelectTicker(ticker)}
                    className={`w-full px-3 py-2 flex items-center justify-between text-left transition-colors ${
                      isSelected
                        ? 'bg-[#2962FF]/15 border-l-2 border-[#2962FF]'
                        : 'hover:bg-[#1e222d]'
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-semibold text-xs ${isSelected ? 'text-[#2962FF]' : 'text-white'}`}>
                          {ticker.symbol}
                        </span>
                        <span className="text-[9px] text-[#787b86] uppercase">
                          {ticker.exchange}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#787b86] truncate max-w-[110px]">
                        {ticker.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div className="font-mono text-xs font-semibold text-white tabular-nums">
                        {ticker.currency === 'INR' ? '₹' : ticker.currency === 'USD' ? '$' : ''}
                        {ticker.price.toLocaleString(undefined, {
                          minimumFractionDigits: ticker.price < 1 ? 4 : 2,
                          maximumFractionDigits: ticker.price < 1 ? 4 : 2
                        })}
                      </div>

                      <div className={`w-16 px-1.5 py-0.5 rounded text-center font-mono text-[11px] font-semibold tabular-nums ${
                        isPositive ? 'bg-[#089981]/20 text-[#089981]' : 'bg-[#f23645]/20 text-[#f23645]'
                      }`}>
                        {isPositive ? '+' : ''}{ticker.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: GRIFFIN SIGNAL RADAR */}
        {activeTab === 'radar' && (
          <GriffinSignalRadar 
            currentTicker={currentTicker}
            onTradeSetupClick={handleTransferRadarSetup}
          />
        )}

        {/* TAB 3: PAPER TRADING SIMULATOR */}
        {activeTab === 'paper' && (
          <PaperTradingWidget
            currentTicker={currentTicker}
            balance={paperBalance}
            equity={paperEquity}
            positions={positions}
            history={orderHistory}
            onOpenPosition={onOpenPosition}
            onClosePosition={onClosePosition}
            onResetAccount={onResetAccount}
            presetSetup={presetSetup}
          />
        )}

        {/* TAB 4: MARKET SCANNER */}
        {activeTab === 'screener' && (
          <div className="p-3 overflow-y-auto space-y-3 text-xs">
            <div className="flex items-center justify-between pb-1 border-b border-[#2a2e39]">
              <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                High-Momentum Breakouts
              </span>
              <span className="text-[10px] text-[#089981] font-mono">SCAN COMPLETE</span>
            </div>

            <div className="space-y-2">
              {allTickers
                .filter(t => Math.abs(t.changePercent) > 1.2)
                .slice(0, 8)
                .map((t) => (
                  <div 
                    key={t.symbol} 
                    onClick={() => onSelectTicker(t)}
                    className="p-2 bg-[#131722] hover:bg-[#1e222d] border border-[#2a2e39] rounded cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-white">{t.symbol}</div>
                      <div className="text-[10px] text-[#787b86]">Vol: {t.volume}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-white">${t.price.toFixed(2)}</div>
                      <div className={`font-mono text-[10px] font-bold ${t.changePercent >= 0 ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                        {t.changePercent >= 0 ? '+' : ''}{t.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

import React, { useState } from 'react';
import { 
  Search, 
  BarChart2, 
  CandlestickChart, 
  LineChart, 
  AreaChart, 
  Layers, 
  SlidersHorizontal, 
  Instagram, 
  Crown, 
  BookOpen, 
  Wallet, 
  Radio, 
  X,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { ChartType, Ticker, Timeframe } from '../types/trading';

interface NavbarProps {
  currentTicker: Ticker;
  allTickers: Ticker[];
  onSelectTicker: (ticker: Ticker) => void;
  timeframe: Timeframe;
  onChangeTimeframe: (tf: Timeframe) => void;
  chartType: ChartType;
  onChangeChartType: (ct: ChartType) => void;
  activeIndicators: string[];
  onToggleIndicator: (id: string) => void;
  onOpenBooksModal: () => void;
  onOpenVipModal: () => void;
  activeRightTab: 'watchlist' | 'radar' | 'paper' | 'screener';
  onSelectRightTab: (tab: 'watchlist' | 'radar' | 'paper' | 'screener') => void;
  paperBalance: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTicker,
  allTickers,
  onSelectTicker,
  timeframe,
  onChangeTimeframe,
  chartType,
  onChangeChartType,
  activeIndicators,
  onToggleIndicator,
  onOpenBooksModal,
  onOpenVipModal,
  activeRightTab,
  onSelectRightTab,
  paperBalance
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [indicatorMenuOpen, setIndicatorMenuOpen] = useState(false);
  const [chartMenuOpen, setChartMenuOpen] = useState(false);

  const timeframes: Timeframe[] = ['1m', '5m', '15m', '1h', '4h', '1D', '1W'];

  const filteredTickers = allTickers.filter(t => 
    t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indicatorOptions = [
    { id: 'RSI', name: 'Relative Strength Index (RSI 14)', desc: 'Overbought / Oversold momentum' },
    { id: 'MACD', name: 'MACD (12, 26, 9)', desc: 'Trend crossover momentum' },
    { id: 'MA', name: 'Moving Average (SMA 20/50)', desc: 'Dynamic support & resistance' },
    { id: 'BB', name: 'Bollinger Bands (20, 2)', desc: 'Volatility bands & mean reversion' },
  ];

  return (
    <>
      <header className="h-14 bg-[#181c27] border-b border-[#2a2e39] px-3 md:px-4 flex items-center justify-between gap-2 shrink-0 select-none z-30">
        {/* Left: Branding & Symbol Search */}
        <div className="flex items-center gap-3">
          {/* Brand Wordmark & Tagline */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm md:text-base tracking-wider text-white">
                TRADE WITH GRIFFIN
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-[#089981] bg-[#089981]/15 px-1.5 py-0.5 rounded border border-[#089981]/30">
                PRO
              </span>
            </div>
            <a 
              href="https://www.instagram.com/griffin.arnav002" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[11px] text-[#787b86] hover:text-[#2962FF] transition-colors flex items-center gap-1 font-medium"
            >
              <span>Powered by</span>
              <span className="text-[#2962FF]">@griffin.arnav002</span>
            </a>
          </div>

          <div className="h-6 w-[1px] bg-[#2a2e39] mx-1 hidden sm:block" />

          {/* Search Trigger Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-2.5 py-1.5 bg-[#131722] hover:bg-[#1e222d] border border-[#2a2e39] rounded text-xs text-[#d1d4dc] transition-all hover:border-[#2962FF]/50"
          >
            <Search size={14} className="text-[#787b86]" />
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-white">{currentTicker.symbol}</span>
              <span className="text-[11px] text-[#787b86] hidden lg:inline">· {currentTicker.name}</span>
            </div>
            <kbd className="hidden md:inline-block text-[10px] bg-[#2a2e39] text-[#787b86] px-1 py-0.5 rounded font-mono">
              /
            </kbd>
          </button>
        </div>

        {/* Center: Timeframe & Chart Style & Indicators Controls */}
        <div className="hidden md:flex items-center gap-1.5">
          {/* Timeframe Selectors */}
          <div className="flex items-center bg-[#131722] p-0.5 rounded border border-[#2a2e39]">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => onChangeTimeframe(tf)}
                className={`px-2 py-1 text-xs font-mono font-medium rounded transition-colors ${
                  timeframe === tf
                    ? 'bg-[#2962FF] text-white'
                    : 'text-[#787b86] hover:text-white hover:bg-[#1e222d]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <div className="h-5 w-[1px] bg-[#2a2e39] mx-1" />

          {/* Chart Type Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setChartMenuOpen(!chartMenuOpen);
                setIndicatorMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#131722] hover:bg-[#1e222d] border border-[#2a2e39] rounded text-xs text-[#d1d4dc] transition-colors"
            >
              {chartType === 'candles' && <CandlestickChart size={14} className="text-[#089981]" />}
              {chartType === 'line' && <LineChart size={14} className="text-[#2962FF]" />}
              {chartType === 'area' && <AreaChart size={14} className="text-[#f59e0b]" />}
              {chartType === 'heikinashi' && <BarChart2 size={14} className="text-[#a855f7]" />}
              <span className="capitalize">{chartType}</span>
              <ChevronDown size={12} className="text-[#787b86]" />
            </button>

            {chartMenuOpen && (
              <div className="absolute left-0 mt-1.5 w-40 bg-[#1e222d] border border-[#2a2e39] rounded shadow-2xl py-1 z-50">
                {(['candles', 'line', 'area', 'heikinashi'] as ChartType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      onChangeChartType(type);
                      setChartMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#2a2e39] transition-colors ${
                      chartType === type ? 'text-[#2962FF] font-semibold bg-[#2a2e39]/50' : 'text-[#d1d4dc]'
                    }`}
                  >
                    <span className="capitalize">{type}</span>
                    {chartType === type && <span className="text-[10px]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Indicators Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIndicatorMenuOpen(!indicatorMenuOpen);
                setChartMenuOpen(false);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 border rounded text-xs transition-colors ${
                activeIndicators.length > 0 
                  ? 'bg-[#2962FF]/20 border-[#2962FF] text-white' 
                  : 'bg-[#131722] hover:bg-[#1e222d] border-[#2a2e39] text-[#d1d4dc]'
              }`}
            >
              <SlidersHorizontal size={14} />
              <span>Indicators</span>
              {activeIndicators.length > 0 && (
                <span className="text-[10px] bg-[#2962FF] text-white px-1.5 py-0.2 rounded-full font-mono">
                  {activeIndicators.length}
                </span>
              )}
            </button>

            {indicatorMenuOpen && (
              <div className="absolute left-0 mt-1.5 w-64 bg-[#1e222d] border border-[#2a2e39] rounded shadow-2xl p-2 z-50">
                <div className="text-[11px] font-semibold text-[#787b86] uppercase tracking-wider mb-2 px-1">
                  Active Overlays
                </div>
                <div className="space-y-1">
                  {indicatorOptions.map((ind) => {
                    const isActive = activeIndicators.includes(ind.id);
                    return (
                      <button
                        key={ind.id}
                        onClick={() => onToggleIndicator(ind.id)}
                        className={`w-full text-left p-2 rounded text-xs transition-colors flex items-start justify-between ${
                          isActive ? 'bg-[#2962FF]/15 border border-[#2962FF]/40 text-white' : 'hover:bg-[#2a2e39] text-[#d1d4dc]'
                        }`}
                      >
                        <div>
                          <div className="font-medium">{ind.name}</div>
                          <div className="text-[10px] text-[#787b86] mt-0.5">{ind.desc}</div>
                        </div>
                        <span className={`text-xs ml-2 font-mono ${isActive ? 'text-[#089981]' : 'text-[#787b86]'}`}>
                          {isActive ? 'ON' : 'OFF'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Books, Radar, Paper Trading, VIP Community */}
        <div className="flex items-center gap-2">
          {/* Books / Pattern Academy Button */}
          <button
            onClick={onOpenBooksModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2a2e39]/70 hover:bg-[#2a2e39] border border-[#363c4e] rounded text-xs text-white font-medium transition-all shadow-sm group"
            title="Read Ultimate Chart Patterns & Fidelity TA Books"
          >
            <BookOpen size={14} className="text-[#f59e0b] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Pattern Books</span>
            <span className="text-[10px] bg-[#f59e0b]/20 text-[#f59e0b] px-1 py-0.2 rounded font-mono">2</span>
          </button>

          {/* VIP Access Button */}
          <button
            onClick={onOpenVipModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#2962FF] to-[#7c3aed] hover:opacity-95 text-xs text-white font-semibold rounded shadow-md transition-all whitespace-nowrap shrink-0"
          >
            <Crown size={14} className="text-amber-300" />
            <span className="hidden sm:inline">VIP Signals</span>
            <span className="sm:hidden">VIP</span>
          </button>

          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/griffin.arnav002"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded bg-[#131722] hover:bg-[#2a2e39] border border-[#2a2e39] text-[#787b86] hover:text-[#e1306c] flex items-center justify-center transition-colors"
            title="Follow @griffin.arnav002 on Instagram"
          >
            <Instagram size={15} />
          </a>
        </div>
      </header>

      {/* Global Symbol Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-[#1e222d] border border-[#2a2e39] rounded-xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh] animate-in fade-in zoom-in-95 duration-150">
            {/* Search Input Bar */}
            <div className="p-3 border-b border-[#2a2e39] flex items-center gap-3">
              <Search size={18} className="text-[#2962FF]" />
              <input
                type="text"
                autoFocus
                placeholder="Search symbol (e.g. BTCUSDT, AAPL, RELIANCE, EURUSD, NIFTY50)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-[#787b86] outline-none font-medium"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded text-[#787b86] hover:text-white hover:bg-[#2a2e39]"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Filters */}
            <div className="px-3 py-2 bg-[#131722] border-b border-[#2a2e39] flex items-center gap-1.5 overflow-x-auto text-[11px] text-[#787b86]">
              <span>Filter:</span>
              <button 
                onClick={() => setSearchQuery('')}
                className="px-2 py-0.5 rounded bg-[#2a2e39] text-white hover:bg-[#363c4e]"
              >
                All
              </button>
              <button 
                onClick={() => setSearchQuery('crypto')}
                className="px-2 py-0.5 rounded hover:bg-[#2a2e39] hover:text-white"
              >
                Crypto
              </button>
              <button 
                onClick={() => setSearchQuery('stocks')}
                className="px-2 py-0.5 rounded hover:bg-[#2a2e39] hover:text-white"
              >
                Stocks
              </button>
              <button 
                onClick={() => setSearchQuery('forex')}
                className="px-2 py-0.5 rounded hover:bg-[#2a2e39] hover:text-white"
              >
                Forex
              </button>
              <button 
                onClick={() => setSearchQuery('indices')}
                className="px-2 py-0.5 rounded hover:bg-[#2a2e39] hover:text-white"
              >
                Indices
              </button>
              <button 
                onClick={() => setSearchQuery('commodities')}
                className="px-2 py-0.5 rounded hover:bg-[#2a2e39] hover:text-white"
              >
                Commodities
              </button>
            </div>

            {/* Search Results List */}
            <div className="overflow-y-auto divide-y divide-[#2a2e39] p-1 flex-1">
              {filteredTickers.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#787b86]">
                  No matching instruments found for "{searchQuery}"
                </div>
              ) : (
                filteredTickers.map((ticker) => {
                  const isPositive = ticker.changePercent >= 0;
                  return (
                    <button
                      key={ticker.symbol}
                      onClick={() => {
                        onSelectTicker(ticker);
                        setSearchOpen(false);
                      }}
                      className="w-full px-3 py-2.5 flex items-center justify-between text-left hover:bg-[#2a2e39] transition-colors rounded group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-[#131722] border border-[#2a2e39] flex items-center justify-center font-bold text-xs text-white font-mono">
                          {ticker.symbol.slice(0, 3)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-white group-hover:text-[#2962FF] transition-colors">
                              {ticker.symbol}
                            </span>
                            <span className="text-[10px] text-[#787b86] bg-[#131722] px-1.5 py-0.2 rounded border border-[#2a2e39]">
                              {ticker.exchange}
                            </span>
                          </div>
                          <div className="text-xs text-[#787b86]">{ticker.name}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-semibold text-white font-mono tabular-nums">
                          {ticker.currency === 'INR' ? '₹' : ticker.currency === 'USD' ? '$' : ''}
                          {ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                        </div>
                        <div className={`text-xs font-mono font-medium flex items-center justify-end gap-1 ${
                          isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}>
                          <span>{isPositive ? '+' : ''}{ticker.changePercent.toFixed(2)}%</span>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  History, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldAlert,
  Percent
} from 'lucide-react';
import { Position, OrderHistoryItem, Ticker } from '../types/trading';

interface PaperTradingWidgetProps {
  currentTicker: Ticker;
  balance: number;
  equity: number;
  positions: Position[];
  history: OrderHistoryItem[];
  onOpenPosition: (pos: Omit<Position, 'id' | 'pnl' | 'pnlPercent' | 'timestamp'>) => void;
  onClosePosition: (id: string) => void;
  onResetAccount: () => void;
  presetSetup?: { side: 'BUY' | 'SELL'; entry: number; sl: number; tp: number } | null;
}

export const PaperTradingWidget: React.FC<PaperTradingWidgetProps> = ({
  currentTicker,
  balance,
  equity,
  positions,
  history,
  onOpenPosition,
  onClosePosition,
  onResetAccount,
  presetSetup
}) => {
  const [activeTab, setActiveTab] = useState<'trade' | 'positions' | 'history'>('trade');
  const [side, setSide] = useState<'BUY' | 'SELL'>(presetSetup ? presetSetup.side : 'BUY');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [amountUsd, setAmountUsd] = useState<string>('5000');
  const [leverage, setLeverage] = useState<number>(10);
  const [stopLoss, setStopLoss] = useState<string>(
    presetSetup ? String(presetSetup.sl) : String(Number((currentTicker.price * 0.98).toFixed(2)))
  );
  const [takeProfit, setTakeProfit] = useState<string>(
    presetSetup ? String(presetSetup.tp) : String(Number((currentTicker.price * 1.04).toFixed(2)))
  );

  // Sync if preset setup arrives from radar
  React.useEffect(() => {
    if (presetSetup) {
      setSide(presetSetup.side);
      setStopLoss(String(presetSetup.sl));
      setTakeProfit(String(presetSetup.tp));
      setActiveTab('trade');
    }
  }, [presetSetup]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amountUsd);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    onOpenPosition({
      symbol: currentTicker.symbol,
      side,
      type: orderType,
      entryPrice: currentTicker.price,
      currentPrice: currentTicker.price,
      amount: parsedAmount,
      leverage,
      stopLoss: stopLoss ? parseFloat(stopLoss) : undefined,
      takeProfit: takeProfit ? parseFloat(takeProfit) : undefined,
    });

    setActiveTab('positions');
  };

  const totalUnrealizedPnl = positions.reduce((acc, p) => acc + p.pnl, 0);

  return (
    <div className="flex flex-col h-full bg-[#131722] text-[#d1d4dc] p-3 overflow-y-auto space-y-3">
      {/* Account Overview Cards */}
      <div className="p-3 bg-[#181c27] rounded-lg border border-[#2a2e39] space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#787b86]">
            <Wallet size={14} className="text-[#2962FF]" />
            <span>Virtual Account</span>
          </div>
          <button
            onClick={onResetAccount}
            className="text-[10px] text-[#787b86] hover:text-[#2962FF] flex items-center gap-1 transition-colors"
            title="Reset balance to $100,000"
          >
            <RefreshCw size={11} />
            <span>Reset</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-[10px] text-[#787b86]">Virtual Balance</div>
            <div className="text-base font-bold font-mono text-white tabular-nums">
              ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-[#787b86]">Total Equity</div>
            <div className="text-base font-bold font-mono text-white tabular-nums">
              ${equity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        <div className="pt-1 border-t border-[#2a2e39] flex items-center justify-between text-xs font-mono">
          <span className="text-[#787b86]">Unrealized P&L:</span>
          <span className={`font-semibold tabular-nums ${totalUnrealizedPnl >= 0 ? 'text-[#089981]' : 'text-[#f23645]'}`}>
            {totalUnrealizedPnl >= 0 ? '+' : ''}${totalUnrealizedPnl.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Tabs: Trade | Positions | History */}
      <div className="flex items-center bg-[#181c27] p-1 rounded-lg border border-[#2a2e39] text-xs">
        <button
          onClick={() => setActiveTab('trade')}
          className={`flex-1 py-1.5 rounded font-medium transition-colors ${
            activeTab === 'trade' ? 'bg-[#2962FF] text-white shadow-sm' : 'text-[#787b86] hover:text-white'
          }`}
        >
          Order Form
        </button>
        <button
          onClick={() => setActiveTab('positions')}
          className={`flex-1 py-1.5 rounded font-medium transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'positions' ? 'bg-[#2962FF] text-white shadow-sm' : 'text-[#787b86] hover:text-white'
          }`}
        >
          <span>Positions</span>
          {positions.length > 0 && (
            <span className="text-[10px] bg-[#089981] text-white px-1.5 rounded-full font-mono">
              {positions.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-1.5 rounded font-medium transition-colors ${
            activeTab === 'history' ? 'bg-[#2962FF] text-white shadow-sm' : 'text-[#787b86] hover:text-white'
          }`}
        >
          History
        </button>
      </div>

      {/* Tab 1: Order Form */}
      {activeTab === 'trade' && (
        <form onSubmit={handlePlaceOrder} className="space-y-3">
          {/* Side Toggle: BUY / SELL */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSide('BUY')}
              className={`py-2 rounded font-bold text-xs uppercase transition-all flex items-center justify-center gap-1.5 ${
                side === 'BUY'
                  ? 'bg-[#089981] text-white shadow-md'
                  : 'bg-[#181c27] text-[#787b86] hover:text-white border border-[#2a2e39]'
              }`}
            >
              <TrendingUp size={14} />
              <span>Buy / Long</span>
            </button>
            <button
              type="button"
              onClick={() => setSide('SELL')}
              className={`py-2 rounded font-bold text-xs uppercase transition-all flex items-center justify-center gap-1.5 ${
                side === 'SELL'
                  ? 'bg-[#f23645] text-white shadow-md'
                  : 'bg-[#181c27] text-[#787b86] hover:text-white border border-[#2a2e39]'
              }`}
            >
              <TrendingDown size={14} />
              <span>Sell / Short</span>
            </button>
          </div>

          {/* Current Symbol Info */}
          <div className="bg-[#181c27] p-2.5 rounded border border-[#2a2e39] flex items-center justify-between text-xs">
            <span className="text-[#787b86]">Market Execution:</span>
            <div className="font-mono font-bold text-white tabular-nums">
              {currentTicker.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
            </div>
          </div>

          {/* Order Size USD */}
          <div>
            <div className="flex justify-between text-[11px] text-[#787b86] mb-1">
              <span>Position Margin (USD)</span>
              <span>Max: ${(balance * 0.95).toFixed(0)}</span>
            </div>
            <div className="relative">
              <input
                type="number"
                min="100"
                max={balance}
                step="100"
                value={amountUsd}
                onChange={(e) => setAmountUsd(e.target.value)}
                className="w-full bg-[#181c27] border border-[#2a2e39] rounded px-3 py-2 text-sm text-white font-mono outline-none focus:border-[#2962FF]"
              />
              <span className="absolute right-3 top-2.5 text-xs text-[#787b86] font-mono">USD</span>
            </div>
            {/* Quick % buttons */}
            <div className="grid grid-cols-4 gap-1.5 mt-1.5">
              {[0.1, 0.25, 0.5, 0.75].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setAmountUsd((balance * pct).toFixed(0))}
                  className="py-1 bg-[#181c27] hover:bg-[#2a2e39] border border-[#2a2e39] rounded text-[10px] text-[#787b86] hover:text-white font-mono"
                >
                  {pct * 100}%
                </button>
              ))}
            </div>
          </div>

          {/* Leverage Slider */}
          <div>
            <div className="flex justify-between text-[11px] text-[#787b86] mb-1">
              <span>Leverage</span>
              <span className="font-mono text-white font-bold">{leverage}x</span>
            </div>
            <div className="flex items-center gap-1.5">
              {[1, 5, 10, 20, 50].map((lev) => (
                <button
                  key={lev}
                  type="button"
                  onClick={() => setLeverage(lev)}
                  className={`flex-1 py-1 rounded text-xs font-mono transition-colors border ${
                    leverage === lev
                      ? 'bg-[#2962FF] border-[#2962FF] text-white font-bold'
                      : 'bg-[#181c27] border-[#2a2e39] text-[#787b86] hover:text-white'
                  }`}
                >
                  {lev}x
                </button>
              ))}
            </div>
          </div>

          {/* TP / SL Inputs */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[10px] text-[#089981] font-medium block mb-1">Take Profit</label>
              <input
                type="number"
                step="any"
                value={takeProfit}
                onChange={(e) => setTakeProfit(e.target.value)}
                placeholder="Optional"
                className="w-full bg-[#181c27] border border-[#2a2e39] rounded px-2.5 py-1.5 text-xs text-white font-mono outline-none focus:border-[#089981]"
              />
            </div>
            <div>
              <label className="text-[10px] text-[#f23645] font-medium block mb-1">Stop Loss</label>
              <input
                type="number"
                step="any"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                placeholder="Optional"
                className="w-full bg-[#181c27] border border-[#2a2e39] rounded px-2.5 py-1.5 text-xs text-white font-mono outline-none focus:border-[#f23645]"
              />
            </div>
          </div>

          {/* Submit Order Button */}
          <button
            type="submit"
            className={`w-full py-2.5 rounded font-bold text-xs uppercase text-white shadow-lg transition-transform active:scale-95 ${
              side === 'BUY'
                ? 'bg-[#089981] hover:bg-[#089981]/90 shadow-[#089981]/20'
                : 'bg-[#f23645] hover:bg-[#f23645]/90 shadow-[#f23645]/20'
            }`}
          >
            Execute {side} {currentTicker.symbol} (${(parseFloat(amountUsd || '0') * leverage).toLocaleString()} Exposure)
          </button>
        </form>
      )}

      {/* Tab 2: Active Positions */}
      {activeTab === 'positions' && (
        <div className="space-y-2">
          {positions.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#787b86] space-y-2">
              <ShieldAlert size={24} className="mx-auto text-[#787b86]" />
              <div>No open positions currently.</div>
              <button
                onClick={() => setActiveTab('trade')}
                className="px-3 py-1 bg-[#2962FF] text-white rounded text-xs"
              >
                Place First Trade
              </button>
            </div>
          ) : (
            positions.map((pos) => {
              const isProfit = pos.pnl >= 0;
              return (
                <div key={pos.id} className="p-2.5 bg-[#181c27] rounded-lg border border-[#2a2e39] text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-mono font-bold px-1.5 py-0.2 rounded text-[10px] ${
                        pos.side === 'BUY' ? 'bg-[#089981]/20 text-[#089981]' : 'bg-[#f23645]/20 text-[#f23645]'
                      }`}>
                        {pos.side} {pos.leverage}x
                      </span>
                      <span className="font-bold text-white">{pos.symbol}</span>
                    </div>

                    <div className={`font-mono font-bold tabular-nums ${isProfit ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                      {isProfit ? '+' : ''}${pos.pnl.toFixed(2)} ({isProfit ? '+' : ''}{pos.pnlPercent.toFixed(2)}%)
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1 text-[11px] text-[#787b86] font-mono">
                    <div>Entry: <span className="text-white">${pos.entryPrice.toFixed(2)}</span></div>
                    <div>Mark: <span className="text-white">${pos.currentPrice.toFixed(2)}</span></div>
                    <div>Size: <span className="text-white">${(pos.amount * pos.leverage).toFixed(0)}</span></div>
                    <div>Margin: <span className="text-white">${pos.amount.toFixed(0)}</span></div>
                  </div>

                  <button
                    onClick={() => onClosePosition(pos.id)}
                    className="w-full py-1 bg-[#2a2e39] hover:bg-[#363c4e] text-white font-medium rounded transition-colors text-[11px]"
                  >
                    Close Position Market
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 3: Order History */}
      {activeTab === 'history' && (
        <div className="space-y-2">
          {history.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#787b86]">
              No trade history yet.
            </div>
          ) : (
            history.map((item) => {
              const isProfit = item.realizedPnl >= 0;
              return (
                <div key={item.id} className="p-2 bg-[#181c27] rounded border border-[#2a2e39] text-xs flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1 font-semibold text-white">
                      <span className={item.side === 'BUY' ? 'text-[#089981]' : 'text-[#f23645]'}>
                        {item.side}
                      </span>
                      <span>{item.symbol}</span>
                    </div>
                    <div className="text-[10px] text-[#787b86]">
                      ${item.entryPrice.toFixed(2)} → ${item.closePrice.toFixed(2)}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`font-mono font-bold tabular-nums ${isProfit ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                      {isProfit ? '+' : ''}${item.realizedPnl.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-[#787b86] font-mono">
                      {isProfit ? '+' : ''}{item.pnlPercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

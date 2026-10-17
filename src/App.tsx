/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { INITIAL_TICKERS } from './data/mockTickers';
import { ChartType, OrderHistoryItem, Position, Ticker, Timeframe } from './types/trading';
import { Navbar } from './components/Navbar';
import { TickerTapeWidget } from './components/TickerTapeWidget';
import { LeftDrawingToolbar } from './components/LeftDrawingToolbar';
import { TradingViewWidget } from './components/TradingViewWidget';
import { RightSidebar } from './components/RightSidebar';
import { BottomMarketBar } from './components/BottomMarketBar';
import { BooksLibraryModal } from './components/BooksLibraryModal';
import { CommunityHubModal } from './components/CommunityHubModal';

export default function App() {
  const [tickers, setTickers] = useState<Ticker[]>(INITIAL_TICKERS);
  const [currentTicker, setCurrentTicker] = useState<Ticker>(INITIAL_TICKERS[0]); // Default BTCUSDT
  const [timeframe, setTimeframe] = useState<Timeframe>('1h');
  const [chartType, setChartType] = useState<ChartType>('candles');
  const [activeIndicators, setActiveIndicators] = useState<string[]>(['RSI', 'MA']);
  const [activeDrawingTool, setActiveDrawingTool] = useState<string | null>('crosshair');
  const [activeRightTab, setActiveRightTab] = useState<'watchlist' | 'radar' | 'paper' | 'screener'>('watchlist');
  
  // Modals
  const [isBooksModalOpen, setIsBooksModalOpen] = useState(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);

  // Paper Trading State
  const [paperBalance, setPaperBalance] = useState<number>(100000.00);
  const [positions, setPositions] = useState<Position[]>([]);
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItem[]>([]);

  // Toggle indicators in chart
  const handleToggleIndicator = (id: string) => {
    setActiveIndicators((prev) => 
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Switch active symbol
  const handleSelectTicker = useCallback((ticker: Ticker) => {
    setCurrentTicker(ticker);
  }, []);

  // Paper trading actions
  const handleOpenPosition = (newPosData: Omit<Position, 'id' | 'pnl' | 'pnlPercent' | 'timestamp'>) => {
    if (paperBalance < newPosData.amount) {
      alert('Insufficient virtual balance for margin requirements!');
      return;
    }

    const newPosition: Position = {
      ...newPosData,
      id: 'pos_' + Date.now(),
      pnl: 0,
      pnlPercent: 0,
      timestamp: Date.now()
    };

    setPaperBalance((prev) => prev - newPosData.amount);
    setPositions((prev) => [newPosition, ...prev]);
  };

  const handleClosePosition = (positionId: string) => {
    const pos = positions.find((p) => p.id === positionId);
    if (!pos) return;

    // Credit back margin + realized P&L
    const returnAmount = pos.amount + pos.pnl;
    setPaperBalance((prev) => prev + Math.max(0, returnAmount));

    const historyItem: OrderHistoryItem = {
      id: 'ord_' + Date.now(),
      symbol: pos.symbol,
      side: pos.side,
      entryPrice: pos.entryPrice,
      closePrice: pos.currentPrice,
      amount: pos.amount,
      leverage: pos.leverage,
      realizedPnl: pos.pnl,
      pnlPercent: pos.pnlPercent,
      openedAt: pos.timestamp,
      closedAt: Date.now()
    };

    setOrderHistory((prev) => [historyItem, ...prev]);
    setPositions((prev) => prev.filter((p) => p.id !== positionId));
  };

  const handleResetAccount = () => {
    setPaperBalance(100000.00);
    setPositions([]);
  };

  // Receive calculated levels from Pattern Books
  const handleApplyCalculatedLevels = (levels: { entry: number; sl: number; tp: number }) => {
    setIsBooksModalOpen(false);
    setActiveRightTab('paper');
  };

  // Periodic simulated price micro-ticks for active positions and watchlist to bring live vitality
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Update tickers slightly
      setTickers((prev) =>
        prev.map((t) => {
          // Subtle micro-tick within 0.05%
          const deltaPct = (Math.random() - 0.495) * 0.001;
          const newPrice = Number((t.price * (1 + deltaPct)).toFixed(t.price < 1 ? 4 : 2));
          return {
            ...t,
            price: newPrice
          };
        })
      );

      // 2. Update active positions P&L
      setPositions((prev) =>
        prev.map((pos) => {
          const deltaPct = (Math.random() - 0.49) * 0.002;
          const markPrice = Number((pos.currentPrice * (1 + deltaPct)).toFixed(2));
          const priceDiff = pos.side === 'BUY' ? markPrice - pos.entryPrice : pos.entryPrice - markPrice;
          const pnlPercent = (priceDiff / pos.entryPrice) * pos.leverage * 100;
          const pnl = (pos.amount * pos.leverage * priceDiff) / pos.entryPrice;

          return {
            ...pos,
            currentPrice: markPrice,
            pnl: Number(pnl.toFixed(2)),
            pnlPercent: Number(pnlPercent.toFixed(2))
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const totalUnrealizedPnl = positions.reduce((acc, p) => acc + p.pnl, 0);
  const paperEquity = paperBalance + positions.reduce((acc, p) => acc + p.amount, 0) + totalUnrealizedPnl;

  return (
    <div className="flex flex-col h-screen w-screen bg-[#131722] text-[#d1d4dc] overflow-hidden select-none">
      {/* 1. Top Navigation Bar */}
      <Navbar
        currentTicker={currentTicker}
        allTickers={tickers}
        onSelectTicker={handleSelectTicker}
        timeframe={timeframe}
        onChangeTimeframe={setTimeframe}
        chartType={chartType}
        onChangeChartType={setChartType}
        activeIndicators={activeIndicators}
        onToggleIndicator={handleToggleIndicator}
        onOpenBooksModal={() => setIsBooksModalOpen(true)}
        onOpenVipModal={() => setIsVipModalOpen(true)}
        activeRightTab={activeRightTab}
        onSelectRightTab={setActiveRightTab}
        paperBalance={paperBalance}
      />

      {/* 2. Real-time Ticker Tape Running Bar */}
      <TickerTapeWidget />

      {/* 3. Main Workspace Row: Left Drawing Toolbar + Central Interactive Chart + Right Sidebar */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar: Drawing Toolkit */}
        <LeftDrawingToolbar
          activeTool={activeDrawingTool}
          onSelectTool={setActiveDrawingTool}
          onClearAll={() => setActiveDrawingTool('crosshair')}
          onOpenPatternGuide={() => setIsBooksModalOpen(true)}
        />

        {/* Central Viewport: Real-time TradingView Chart */}
        <main className="flex-1 h-full overflow-hidden relative bg-[#131722]">
          <TradingViewWidget
            symbol={currentTicker.tvSymbol}
            timeframe={timeframe}
            chartType={chartType}
            indicators={activeIndicators}
            activeDrawingTool={activeDrawingTool}
            onClearDrawingTool={() => setActiveDrawingTool('crosshair')}
          />
        </main>

        {/* Right Sidebar: Watchlist, Radar, Paper Trading, Scanner */}
        <RightSidebar
          currentTicker={currentTicker}
          allTickers={tickers}
          onSelectTicker={handleSelectTicker}
          activeTab={activeRightTab}
          onSelectTab={setActiveRightTab}
          paperBalance={paperBalance}
          paperEquity={paperEquity}
          positions={positions}
          orderHistory={orderHistory}
          onOpenPosition={handleOpenPosition}
          onClosePosition={handleClosePosition}
          onResetAccount={handleResetAccount}
        />
      </div>

      {/* 4. Bottom Market Stats Bar & Expandable Screener */}
      <BottomMarketBar
        currentTicker={currentTicker}
        allTickers={tickers}
        onSelectTicker={handleSelectTicker}
        paperBalance={paperBalance}
        openPositionsCount={positions.length}
        unrealizedPnl={totalUnrealizedPnl}
      />

      {/* 5. Modals */}
      <BooksLibraryModal
        isOpen={isBooksModalOpen}
        onClose={() => setIsBooksModalOpen(false)}
        onApplyCalculatedLevels={handleApplyCalculatedLevels}
      />

      <CommunityHubModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
      />
    </div>
  );
}

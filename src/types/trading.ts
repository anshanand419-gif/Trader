export type AssetCategory = 'crypto' | 'stocks' | 'forex' | 'indices' | 'commodities';

export interface Ticker {
  symbol: string;
  name: string;
  exchange: string;
  category: AssetCategory;
  price: number;
  change24h: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  volume: string;
  tvSymbol: string; // TradingView formatted symbol, e.g. BINANCE:BTCUSDT
  currency: string;
}

export type Timeframe = '1m' | '5m' | '15m' | '1h' | '4h' | '1D' | '1W';

export type ChartType = 'candles' | 'line' | 'area' | 'heikinashi';

export interface IndicatorConfig {
  id: string;
  name: string;
  label: string;
  description: string;
  active: boolean;
  color: string;
}

export interface DrawingTool {
  id: string;
  name: string;
  category: 'cursor' | 'line' | 'geometric' | 'measurement' | 'annotation';
  icon: string;
  description: string;
}

export interface Position {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  type: 'MARKET' | 'LIMIT';
  entryPrice: number;
  currentPrice: number;
  amount: number;
  leverage: number;
  stopLoss?: number;
  takeProfit?: number;
  pnl: number;
  pnlPercent: number;
  timestamp: number;
}

export interface OrderHistoryItem {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  entryPrice: number;
  closePrice: number;
  amount: number;
  leverage: number;
  realizedPnl: number;
  pnlPercent: number;
  openedAt: number;
  closedAt: number;
}

export interface BookUnit {
  id: string;
  bookId: 'elearnmarkets' | 'fidelity';
  unitNumber: string;
  title: string;
  category: 'Introduction' | 'Reversal Patterns' | 'Continuation Patterns' | 'Candlesticks' | 'Volatility & Short-term' | 'Trading Rules & Risk';
  summary: string;
  patternType?: 'Bullish' | 'Bearish' | 'Bilateral' | 'Neutral';
  successRate?: string;
  description: string[];
  rules: string[];
  targetFormula: string;
  stopLossFormula: string;
  exampleStock?: string;
  exampleContext?: string;
  diagram: 'head-and-shoulders' | 'inverse-head-and-shoulders' | 'double-top' | 'double-bottom' | 'triple-top' | 'triple-bottom' | 'cup-and-handle' | 'symmetrical-triangle' | 'ascending-triangle' | 'descending-triangle' | 'rising-wedge' | 'falling-wedge' | 'pennant' | 'flag' | 'megaphone' | 'channel' | 'gaps' | 'candlestick-doji' | 'candlestick-harami' | 'candlestick-hammer' | 'candlestick-engulfing' | 'pipe-bottom' | 'nr4';
}

export interface BookInfo {
  id: 'elearnmarkets' | 'fidelity';
  title: string;
  subtitle: string;
  author: string;
  coverBadge: string;
  totalPages: number;
  summary: string;
  units: BookUnit[];
}

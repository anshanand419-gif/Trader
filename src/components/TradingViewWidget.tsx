import React, { useEffect, useRef } from 'react';
import { ChartType, Timeframe } from '../types/trading';

interface TradingViewWidgetProps {
  symbol: string;
  timeframe: Timeframe;
  chartType: ChartType;
  indicators: string[]; // e.g. ['RSI', 'MACD', 'MA', 'BB']
  activeDrawingTool: string | null;
  onClearDrawingTool?: () => void;
}

export const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({
  symbol,
  timeframe,
  chartType,
  indicators,
  activeDrawingTool,
  onClearDrawingTool
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Map timeframe to TradingView interval string
  const getTvInterval = (tf: Timeframe): string => {
    switch (tf) {
      case '1m': return '1';
      case '5m': return '5';
      case '15m': return '15';
      case '1h': return '60';
      case '4h': return '240';
      case '1D': return 'D';
      case '1W': return 'W';
      default: return '60';
    }
  };

  // Map chartType to TradingView style code
  // 1: Candles, 2: Line, 3: Area, 8: Heikin Ashi
  const getTvStyle = (ct: ChartType): string => {
    switch (ct) {
      case 'candles': return '1';
      case 'line': return '2';
      case 'area': return '3';
      case 'heikinashi': return '8';
      default: return '1';
    }
  };

  // Map indicators to TradingView studies
  const getTvStudies = (inds: string[]): string[] => {
    const list: string[] = [];
    if (inds.includes('RSI')) list.push('STD;RSI');
    if (inds.includes('MACD')) list.push('STD;MACD');
    if (inds.includes('MA')) list.push('STD;SMA');
    if (inds.includes('BB')) list.push('STD;Bollinger_Bands');
    return list;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous widget
    containerRef.current.innerHTML = '';

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.width = '100%';
    widgetDiv.style.height = '100%';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;

    const widgetConfig = {
      autosize: true,
      symbol: symbol,
      interval: getTvInterval(timeframe),
      timezone: 'exchange',
      theme: 'dark',
      style: getTvStyle(chartType),
      locale: 'en',
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      withdateranges: true,
      allow_symbol_change: true,
      save_image: true,
      studies: getTvStudies(indicators),
      backgroundColor: '#131722',
      gridColor: 'rgba(42, 46, 57, 0.45)',
      support_host: 'https://www.tradingview.com',
      container_id: 'tradingview_advanced_chart'
    };

    script.innerHTML = JSON.stringify(widgetConfig);

    containerRef.current.appendChild(widgetDiv);
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [symbol, timeframe, chartType, indicators.join(',')]);

  return (
    <div className="relative w-full h-full flex flex-col bg-[#131722] overflow-hidden select-none">
      {/* On-chart Active Tool Prompt / Mode HUD */}
      {activeDrawingTool && activeDrawingTool !== 'crosshair' && (
        <div className="absolute top-3 left-4 z-20 flex items-center gap-3 px-3 py-1.5 bg-[#1e222d]/95 backdrop-blur border border-[#2962FF]/50 rounded text-xs text-white shadow-lg pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-[#2962FF] animate-pulse"></span>
          <span className="font-medium text-[#d1d4dc]">
            Active Tool: <span className="text-white capitalize">{activeDrawingTool.replace('-', ' ')}</span>
          </span>
          <span className="text-[#787b86]">Click & drag on chart</span>
          {onClearDrawingTool && (
            <button
              onClick={onClearDrawingTool}
              className="px-2 py-0.5 bg-[#2a2e39] hover:bg-[#363c4e] text-xs text-slate-300 rounded transition-colors"
            >
              Done
            </button>
          )}
        </div>
      )}

      {/* Main TradingView Container */}
      <div 
        ref={containerRef} 
        id="tradingview_advanced_chart"
        className="w-full h-full min-h-[480px] bg-[#131722]"
      />
    </div>
  );
};

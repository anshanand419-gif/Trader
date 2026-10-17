import React, { useEffect, useRef } from 'react';

interface TickerTapeWidgetProps {
  onSelectSymbol?: (symbol: string) => void;
}

export const TickerTapeWidget: React.FC<TickerTapeWidgetProps> = ({ onSelectSymbol }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;

    const config = {
      symbols: [
        { proName: "BINANCE:BTCUSDT", title: "BTC/USDT" },
        { proName: "BINANCE:ETHUSDT", title: "ETH/USDT" },
        { proName: "NASDAQ:AAPL", title: "Apple" },
        { proName: "NASDAQ:NVDA", title: "NVIDIA" },
        { proName: "NSE:NIFTY", title: "NIFTY 50" },
        { proName: "BSE:SENSEX", title: "SENSEX" },
        { proName: "NSE:RELIANCE", title: "Reliance" },
        { proName: "TVC:GOLD", title: "Gold" },
        { proName: "FX:EURUSD", title: "EUR/USD" },
        { proName: "SP:SPX", title: "S&P 500" }
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: "dark",
      locale: "en"
    };

    script.innerHTML = JSON.stringify(config);
    containerRef.current.appendChild(widgetDiv);
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="w-full bg-[#131722] border-b border-[#2a2e39] overflow-hidden h-[42px] shrink-0">
      <div ref={containerRef} className="tradingview-widget-container w-full h-full" />
    </div>
  );
};

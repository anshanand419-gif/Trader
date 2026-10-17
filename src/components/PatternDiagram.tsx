import React from 'react';

interface PatternDiagramProps {
  type: string;
  className?: string;
}

export const PatternDiagram: React.FC<PatternDiagramProps> = ({ type, className = '' }) => {
  return (
    <div className={`relative w-full h-48 bg-[#181c27] rounded-lg border border-[#2a2e39] overflow-hidden flex items-center justify-center p-3 select-none ${className}`}>
      {renderDiagram(type)}
    </div>
  );
};

function renderDiagram(type: string) {
  switch (type) {
    case 'head-and-shoulders':
      return (
        <svg viewBox="0 0 320 160" className="w-full h-full max-h-44">
          <defs>
            <linearGradient id="bullGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#089981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#089981" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {/* Prior uptrend */}
          <line x1="20" y1="130" x2="60" y2="70" stroke="#089981" strokeWidth="2.5" strokeDasharray="3 3" />
          {/* Left Shoulder */}
          <path d="M 60 70 L 85 45 L 110 85" fill="none" stroke="#2962FF" strokeWidth="2.5" />
          {/* Head */}
          <path d="M 110 85 L 150 15 L 190 85" fill="none" stroke="#2962FF" strokeWidth="2.5" />
          {/* Right Shoulder */}
          <path d="M 190 85 L 215 48 L 240 85" fill="none" stroke="#2962FF" strokeWidth="2.5" />
          {/* Breakdown & Target */}
          <line x1="240" y1="85" x2="290" y2="145" stroke="#f23645" strokeWidth="2.5" />

          {/* Neckline */}
          <line x1="70" y1="85" x2="270" y2="85" stroke="#e0e3eb" strokeWidth="2" strokeDasharray="4 4" />
          <text x="272" y="88" fill="#787b86" fontSize="10" fontFamily="sans-serif">Neckline</text>

          {/* Peak Dots */}
          <circle cx="85" cy="45" r="4" fill="#2962FF" />
          <circle cx="150" cy="15" r="5" fill="#2962FF" />
          <circle cx="215" cy="48" r="4" fill="#2962FF" />
          <circle cx="240" cy="85" r="4" fill="#f23645" />

          {/* Labels */}
          <text x="65" y="38" fill="#d1d4dc" fontSize="10" fontWeight="bold">Left</text>
          <text x="140" y="10" fill="#d1d4dc" fontSize="11" fontWeight="bold">Head</text>
          <text x="215" y="40" fill="#d1d4dc" fontSize="10" fontWeight="bold">Right</text>
          <text x="248" y="78" fill="#f23645" fontSize="10" fontWeight="bold">Breakout</text>

          {/* Target projection line */}
          <line x1="150" y1="15" x2="150" y2="85" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="240" y1="85" x2="240" y2="155" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="245" y="145" fill="#f59e0b" fontSize="10">Target: -H</text>
        </svg>
      );

    case 'inverse-head-and-shoulders':
      return (
        <svg viewBox="0 0 320 160" className="w-full h-full max-h-44">
          <line x1="20" y1="30" x2="60" y2="90" stroke="#f23645" strokeWidth="2.5" strokeDasharray="3 3" />
          <path d="M 60 90 L 85 115 L 110 75" fill="none" stroke="#089981" strokeWidth="2.5" />
          <path d="M 110 75 L 150 145 L 190 75" fill="none" stroke="#089981" strokeWidth="2.5" />
          <path d="M 190 75 L 215 112 L 240 75" fill="none" stroke="#089981" strokeWidth="2.5" />
          <line x1="240" y1="75" x2="290" y2="15" stroke="#089981" strokeWidth="2.5" />
          
          <line x1="70" y1="75" x2="270" y2="75" stroke="#e0e3eb" strokeWidth="2" strokeDasharray="4 4" />
          <text x="272" y="78" fill="#787b86" fontSize="10">Neckline</text>

          <circle cx="85" cy="115" r="4" fill="#089981" />
          <circle cx="150" cy="145" r="5" fill="#089981" />
          <circle cx="215" cy="112" r="4" fill="#089981" />
          <circle cx="240" cy="75" r="4" fill="#089981" />

          <text x="135" y="156" fill="#d1d4dc" fontSize="11" fontWeight="bold">Head</text>
          <text x="246" y="68" fill="#089981" fontSize="10" fontWeight="bold">Breakout Up</text>
        </svg>
      );

    case 'double-top':
      return (
        <svg viewBox="0 0 320 160" className="w-full h-full max-h-44">
          {/* Uptrend into M */}
          <line x1="30" y1="130" x2="80" y2="40" stroke="#089981" strokeWidth="2.5" />
          {/* Peak 1 */}
          <line x1="80" y1="40" x2="135" y2="105" stroke="#d1d4dc" strokeWidth="2.5" />
          {/* Peak 2 */}
          <line x1="135" y1="105" x2="190" y2="40" stroke="#d1d4dc" strokeWidth="2.5" />
          {/* Breakdown */}
          <line x1="190" y1="40" x2="245" y2="105" stroke="#f23645" strokeWidth="2.5" />
          <line x1="245" y1="105" x2="280" y2="145" stroke="#f23645" strokeWidth="2.5" />

          {/* Resistance Line */}
          <line x1="50" y1="40" x2="220" y2="40" stroke="#f23645" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="225" y="44" fill="#f23645" fontSize="10">Resistance</text>

          {/* Support Line */}
          <line x1="90" y1="105" x2="270" y2="105" stroke="#e0e3eb" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="272" y="108" fill="#787b86" fontSize="10">Neckline</text>

          <circle cx="80" cy="40" r="4" fill="#f23645" />
          <circle cx="190" cy="40" r="4" fill="#f23645" />
          <circle cx="245" cy="105" r="4" fill="#f23645" />
          <text x="65" y="30" fill="#d1d4dc" fontSize="10" fontWeight="bold">Top 1</text>
          <text x="175" y="30" fill="#d1d4dc" fontSize="10" fontWeight="bold">Top 2</text>
          <text x="245" y="125" fill="#f23645" fontSize="10" fontWeight="bold">Breakdown</text>
        </svg>
      );

    case 'double-bottom':
      return (
        <svg viewBox="0 0 320 160" className="w-full h-full max-h-44">
          <line x1="30" y1="30" x2="80" y2="120" stroke="#f23645" strokeWidth="2.5" />
          <line x1="80" y1="120" x2="135" y2="55" stroke="#d1d4dc" strokeWidth="2.5" />
          <line x1="135" y1="55" x2="190" y2="120" stroke="#d1d4dc" strokeWidth="2.5" />
          <line x1="190" y1="120" x2="245" y2="55" stroke="#089981" strokeWidth="2.5" />
          <line x1="245" y1="55" x2="285" y2="15" stroke="#089981" strokeWidth="2.5" />

          {/* Support line */}
          <line x1="50" y1="120" x2="220" y2="120" stroke="#089981" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="225" y="124" fill="#089981" fontSize="10">Support</text>

          {/* Neckline */}
          <line x1="90" y1="55" x2="270" y2="55" stroke="#e0e3eb" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="272" y="58" fill="#787b86" fontSize="10">Neckline</text>

          <circle cx="80" cy="120" r="4" fill="#089981" />
          <circle cx="190" cy="120" r="4" fill="#089981" />
          <circle cx="245" cy="55" r="4" fill="#089981" />
          <text x="60" y="138" fill="#d1d4dc" fontSize="10" fontWeight="bold">Bottom 1</text>
          <text x="170" y="138" fill="#d1d4dc" fontSize="10" fontWeight="bold">Bottom 2</text>
          <text x="245" y="42" fill="#089981" fontSize="10" fontWeight="bold">Breakout</text>
        </svg>
      );

    case 'triple-top':
      return (
        <svg viewBox="0 0 320 160" className="w-full h-full max-h-44">
          <line x1="20" y1="120" x2="60" y2="40" stroke="#089981" strokeWidth="2" />
          <line x1="60" y1="40" x2="100" y2="95" stroke="#d1d4dc" strokeWidth="2" />
          <line x1="100" y1="95" x2="140" y2="40" stroke="#d1d4dc" strokeWidth="2" />
          <line x1="140" y1="40" x2="180" y2="95" stroke="#d1d4dc" strokeWidth="2" />
          <line x1="180" y1="95" x2="220" y2="40" stroke="#d1d4dc" strokeWidth="2" />
          <line x1="220" y1="40" x2="260" y2="95" stroke="#f23645" strokeWidth="2" />
          <line x1="260" y1="95" x2="295" y2="135" stroke="#f23645" strokeWidth="2.5" />

          <line x1="40" y1="40" x2="240" y2="40" stroke="#f23645" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="80" y1="95" x2="280" y2="95" stroke="#787b86" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="282" y="98" fill="#787b86" fontSize="10">Neckline</text>
          <text x="50" y="32" fill="#9ca3af" fontSize="9">Top 1</text>
          <text x="130" y="32" fill="#9ca3af" fontSize="9">Top 2</text>
          <text x="210" y="32" fill="#9ca3af" fontSize="9">Top 3</text>
          <circle cx="260" cy="95" r="4" fill="#f23645" />
          <text x="260" y="115" fill="#f23645" fontSize="10" fontWeight="bold">Breakdown</text>
        </svg>
      );

    case 'cup-and-handle':
      return (
        <svg viewBox="0 0 320 160" className="w-full h-full max-h-44">
          {/* Prior trend */}
          <line x1="20" y1="120" x2="50" y2="50" stroke="#089981" strokeWidth="2" />
          {/* Rim Resistance Line */}
          <line x1="45" y1="50" x2="260" y2="50" stroke="#e0e3eb" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="262" y="53" fill="#787b86" fontSize="10">Lip Resistance</text>

          {/* Cup U-shape */}
          <path d="M 50 50 C 70 140, 160 140, 180 50" fill="none" stroke="#2962FF" strokeWidth="2.5" />
          {/* Handle */}
          <path d="M 180 50 C 195 80, 220 80, 230 50" fill="none" stroke="#2962FF" strokeWidth="2.5" />
          {/* Breakout */}
          <line x1="230" y1="50" x2="275" y2="15" stroke="#089981" strokeWidth="2.5" />

          <text x="100" y="125" fill="#2962FF" fontSize="11" fontWeight="bold">Cup (U-Shape)</text>
          <text x="185" y="92" fill="#d1d4dc" fontSize="10">Handle</text>
          <circle cx="230" cy="50" r="4" fill="#089981" />
          <text x="235" y="42" fill="#089981" fontSize="10" fontWeight="bold">Breakout</text>

          {/* Target arrow */}
          <line x1="115" y1="50" x2="115" y2="128" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="120" y="85" fill="#f59e0b" fontSize="9">Height (H)</text>
        </svg>
      );

    case 'symmetrical-triangle':
      return (
        <svg viewBox="0 0 320 160" className="w-full h-full max-h-44">
          {/* Converging Trendlines */}
          <line x1="40" y1="20" x2="260" y2="80" stroke="#e0e3eb" strokeWidth="2" />
          <line x1="40" y1="140" x2="260" y2="80" stroke="#e0e3eb" strokeWidth="2" />
          
          {/* Zigzag coiling inside */}
          <polyline points="40,30 90,125 140,48 180,105 210,65" fill="none" stroke="#2962FF" strokeWidth="2.5" />
          {/* Upside Breakout */}
          <line x1="210" y1="65" x2="275" y2="25" stroke="#089981" strokeWidth="2.5" />

          <circle cx="210" cy="65" r="4" fill="#089981" />
          <text x="215" y="55" fill="#089981" fontSize="10" fontWeight="bold">Breakout</text>
          <text x="70" y="18" fill="#787b86" fontSize="10">Down Trendline</text>
          <text x="70" y="152" fill="#787b86" fontSize="10">Up Trendline</text>
          <text x="250" y="92" fill="#9ca3af" fontSize="9">Apex</text>
        </svg>
      );

    case 'ascending-triangle':
      return (
        <svg viewBox="0 0 320 160" className="w-full h-full max-h-44">
          {/* Flat Upper Resistance */}
          <line x1="40" y1="40" x2="260" y2="40" stroke="#f23645" strokeWidth="2" />
          <text x="262" y="44" fill="#f23645" fontSize="10">Flat Resistance</text>

          {/* Ascending Lower Trendline */}
          <line x1="40" y1="140" x2="260" y2="40" stroke="#089981" strokeWidth="2" />
          <text x="100" y="148" fill="#089981" fontSize="10">Rising Support (Higher Lows)</text>

          {/* Price bounces */}
          <polyline points="40,130 90,40 130,105 170,40 205,80" fill="none" stroke="#d1d4dc" strokeWidth="2" />
          {/* Breakout */}
          <line x1="205" y1="80" x2="235" y2="40" stroke="#089981" strokeWidth="2.5" />
          <line x1="235" y1="40" x2="280" y2="12" stroke="#089981" strokeWidth="2.5" />

          <circle cx="235" cy="40" r="4" fill="#089981" />
          <text x="238" y="32" fill="#089981" fontSize="10" fontWeight="bold">Breakout!</text>
        </svg>
      );

    case 'descending-triangle':
      return (
        <svg viewBox="0 0 320 160" className="w-full h-full max-h-44">
          {/* Sloping Upper Resistance */}
          <line x1="40" y1="30" x2="260" y2="120" stroke="#f23645" strokeWidth="2" />
          {/* Flat Lower Support */}
          <line x1="40" y1="120" x2="260" y2="120" stroke="#089981" strokeWidth="2" />
          <text x="262" y="124" fill="#787b86" fontSize="10">Flat Support</text>

          <polyline points="40,35 80,120 120,55 160,120 195,85" fill="none" stroke="#d1d4dc" strokeWidth="2" />
          <line x1="195" y1="85" x2="230" y2="120" stroke="#f23645" strokeWidth="2.5" />
          <line x1="230" y1="120" x2="275" y2="150" stroke="#f23645" strokeWidth="2.5" />

          <circle cx="230" cy="120" r="4" fill="#f23645" />
          <text x="235" y="138" fill="#f23645" fontSize="10" fontWeight="bold">Breakdown</text>
        </svg>
      );

    case 'rising-wedge':
    case 'falling-wedge':
      return (
        <svg viewBox="0 0 320 160" className="w-full h-full max-h-44">
          <line x1="30" y1="120" x2="250" y2="35" stroke="#f23645" strokeWidth="2" />
          <line x1="30" y1="140" x2="250" y2="55" stroke="#089981" strokeWidth="2" />
          <polyline points="40,135 75,98 115,115 155,75 190,92 225,50" fill="none" stroke="#d1d4dc" strokeWidth="2" />
          <line x1="225" y1="50" x2="255" y2="70" stroke="#f23645" strokeWidth="2.5" />
          <line x1="255" y1="70" x2="290" y2="135" stroke="#f23645" strokeWidth="2.5" />
          <circle cx="255" cy="70" r="4" fill="#f23645" />
          <text x="250" y="60" fill="#f23645" fontSize="10" fontWeight="bold">Bearish Breakdown</text>
          <text x="50" y="25" fill="#787b86" fontSize="10">Rising Wedge (Exhaustion)</text>
        </svg>
      );

    case 'flag':
    case 'pennant':
      return (
        <svg viewBox="0 0 320 160" className="w-full h-full max-h-44">
          {/* Vertical Flagpole */}
          <line x1="40" y1="145" x2="100" y2="40" stroke="#089981" strokeWidth="3.5" />
          <text x="35" y="90" fill="#089981" fontSize="10" fontWeight="bold">Flagpole</text>

          {/* Flag Channel bounds */}
          <line x1="95" y1="35" x2="195" y2="65" stroke="#e0e3eb" strokeWidth="1.5" />
          <line x1="95" y1="65" x2="195" y2="95" stroke="#e0e3eb" strokeWidth="1.5" />

          {/* Consolidation swings */}
          <polyline points="100,40 120,68 145,45 170,78 190,58" fill="none" stroke="#d1d4dc" strokeWidth="2" />

          {/* Flag breakout & extension */}
          <line x1="190" y1="58" x2="220" y2="50" stroke="#089981" strokeWidth="2.5" />
          <line x1="220" y1="50" x2="280" y2="15" stroke="#089981" strokeWidth="3" />
          <circle cx="220" cy="50" r="4" fill="#089981" />
          <text x="215" y="40" fill="#089981" fontSize="10" fontWeight="bold">Explosion Leg</text>
        </svg>
      );

    case 'megaphone':
      return (
        <svg viewBox="0 0 320 160" className="w-full h-full max-h-44">
          {/* Diverging lines */}
          <line x1="50" y1="65" x2="270" y2="20" stroke="#f23645" strokeWidth="2" />
          <line x1="50" y1="95" x2="270" y2="145" stroke="#089981" strokeWidth="2" />
          {/* Central pivot line */}
          <line x1="40" y1="80" x2="280" y2="80" stroke="#787b86" strokeWidth="1" strokeDasharray="3 3" />

          {/* Swings 1 to 5 expanding */}
          <polyline points="60,67 100,105 140,55 190,125 240,32" fill="none" stroke="#d1d4dc" strokeWidth="2" />
          <text x="55" y="60" fill="#9ca3af" fontSize="9">1</text>
          <text x="95" y="118" fill="#9ca3af" fontSize="9">2</text>
          <text x="135" y="48" fill="#9ca3af" fontSize="9">3</text>
          <text x="185" y="138" fill="#9ca3af" fontSize="9">4</text>
          <text x="238" y="25" fill="#f23645" fontSize="9" fontWeight="bold">5</text>
          <text x="120" y="94" fill="#787b86" fontSize="9">Central Pivot Line</text>
        </svg>
      );

    case 'pipe-bottom':
    case 'candlestick-engulfing':
      return (
        <svg viewBox="0 0 320 160" className="w-full h-full max-h-44">
          {/* Downtrend */}
          <line x1="40" y1="30" x2="100" y2="85" stroke="#f23645" strokeWidth="2" strokeDasharray="3 3" />

          {/* Candle 1: Red */}
          <line x1="140" y1="50" x2="140" y2="125" stroke="#f23645" strokeWidth="1.5" />
          <rect x="130" y="60" width="20" height="55" fill="#f23645" rx="1" />

          {/* Candle 2: Big Green Engulfing Bar */}
          <line x1="180" y1="35" x2="180" y2="135" stroke="#089981" strokeWidth="1.5" />
          <rect x="170" y="45" width="20" height="85" fill="#089981" rx="1" />

          {/* Target arrow */}
          <line x1="210" y1="80" x2="260" y2="40" stroke="#089981" strokeWidth="2.5" />
          <text x="210" y="30" fill="#089981" fontSize="10" fontWeight="bold">Strong Reversal</text>
          <text x="120" y="145" fill="#9ca3af" fontSize="9">Prior Bar</text>
          <text x="160" y="145" fill="#089981" fontSize="9" fontWeight="bold">Engulfing Bar</text>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 320 160" className="w-full h-full max-h-44">
          <polyline points="30,120 70,80 120,110 170,50 220,85 270,30" fill="none" stroke="#2962FF" strokeWidth="2.5" />
          <circle cx="270" cy="30" r="4" fill="#089981" />
          <text x="180" y="25" fill="#089981" fontSize="10" fontWeight="bold">Breakout Vector</text>
        </svg>
      );
  }
}

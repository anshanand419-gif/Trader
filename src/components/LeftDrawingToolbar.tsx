import React, { useState } from 'react';
import { 
  Crosshair, 
  TrendingUp, 
  Minus, 
  Layers, 
  Square, 
  Type, 
  ArrowUpDown, 
  Ruler, 
  Magnet, 
  Trash2, 
  HelpCircle,
  Eye,
  ShieldAlert
} from 'lucide-react';

interface LeftDrawingToolbarProps {
  activeTool: string | null;
  onSelectTool: (toolId: string) => void;
  onClearAll: () => void;
  onOpenPatternGuide: () => void;
}

export const LeftDrawingToolbar: React.FC<LeftDrawingToolbarProps> = ({
  activeTool,
  onSelectTool,
  onClearAll,
  onOpenPatternGuide
}) => {
  const [magnetActive, setMagnetActive] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const tools = [
    {
      id: 'crosshair',
      name: 'Crosshair / Pointer',
      icon: Crosshair,
      desc: 'Precision price & time coordinate locator'
    },
    {
      id: 'trendline',
      name: 'Trendline',
      icon: TrendingUp,
      desc: 'Connect reaction highs or higher lows to spot slope breakouts'
    },
    {
      id: 'horizontal-line',
      name: 'Horizontal Support / Resistance',
      icon: Minus,
      desc: 'Mark critical support floor, resistance ceiling, or pattern neckline'
    },
    {
      id: 'fibonacci',
      name: 'Fibonacci Retracement',
      icon: Layers,
      desc: 'Plot golden ratios: 0.382, 0.500, 0.618 pullback zones'
    },
    {
      id: 'rectangle',
      name: 'Rectangle Zone',
      icon: Square,
      desc: 'Highlight consolidation boxes, supply/demand order blocks'
    },
    {
      id: 'long-short',
      name: 'Long / Short Position Tool',
      icon: ArrowUpDown,
      desc: 'Calculate Risk-to-Reward ratio, target projection & stop loss'
    },
    {
      id: 'annotation',
      name: 'Text Annotation',
      icon: Type,
      desc: 'Tag chart patterns, entry triggers & trade notes'
    },
    {
      id: 'ruler',
      name: 'Ruler Measure',
      icon: Ruler,
      desc: 'Measure price percentage move and bar duration'
    }
  ];

  return (
    <aside className="w-12 bg-[#181c27] border-r border-[#2a2e39] flex flex-col items-center py-2 shrink-0 select-none z-10 justify-between">
      {/* Top Group: Drawing Affordances */}
      <div className="flex flex-col items-center gap-1 w-full">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;

          return (
            <div key={tool.id} className="relative group w-full flex justify-center">
              <button
                onClick={() => onSelectTool(tool.id)}
                onMouseEnter={() => setShowTooltip(tool.id)}
                onMouseLeave={() => setShowTooltip(null)}
                aria-label={tool.name}
                className={`w-9 h-9 rounded flex items-center justify-center transition-colors relative ${
                  isActive
                    ? 'bg-[#2962FF] text-white shadow-md'
                    : 'text-[#787b86] hover:text-[#d1d4dc] hover:bg-[#2a2e39]'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              </button>

              {/* Tooltip Popup */}
              {showTooltip === tool.id && (
                <div className="absolute left-12 top-1/2 -translate-y-1/2 z-50 bg-[#1e222d] border border-[#2a2e39] text-xs text-[#d1d4dc] px-2.5 py-1.5 rounded shadow-xl whitespace-nowrap pointer-events-none">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    {tool.name}
                    {isActive && <span className="text-[10px] text-[#089981] font-mono">ACTIVE</span>}
                  </div>
                  <div className="text-[11px] text-[#787b86] mt-0.5">{tool.desc}</div>
                </div>
              )}
            </div>
          );
        })}

        <div className="w-6 h-[1px] bg-[#2a2e39] my-1.5" />

        {/* Magnet Mode */}
        <div className="relative group w-full flex justify-center">
          <button
            onClick={() => setMagnetActive(!magnetActive)}
            title="Magnet Mode (Snaps to High/Low)"
            className={`w-9 h-9 rounded flex items-center justify-center transition-colors ${
              magnetActive
                ? 'bg-[#089981] text-white'
                : 'text-[#787b86] hover:text-[#d1d4dc] hover:bg-[#2a2e39]'
            }`}
          >
            <Magnet size={18} />
          </button>
        </div>

        {/* Clear All Drawings */}
        <div className="relative group w-full flex justify-center">
          <button
            onClick={onClearAll}
            title="Reset Active Tools"
            className="w-9 h-9 rounded flex items-center justify-center text-[#787b86] hover:text-[#f23645] hover:bg-[#2a2e39] transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Bottom Group: Pattern Academy Quick Guide */}
      <div className="flex flex-col items-center gap-2 w-full pt-2 border-t border-[#2a2e39]">
        <button
          onClick={onOpenPatternGuide}
          title="Pattern Books & Invalidation Rules"
          className="w-9 h-9 rounded flex items-center justify-center text-[#2962FF] hover:bg-[#2962FF]/20 transition-colors"
        >
          <HelpCircle size={19} />
        </button>
      </div>
    </aside>
  );
};

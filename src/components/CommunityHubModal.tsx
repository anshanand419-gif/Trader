import React, { useState } from 'react';
import { 
  X, 
  Instagram, 
  Crown, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  Award, 
  Send,
  Zap,
  Users
} from 'lucide-react';

interface CommunityHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommunityHubModal: React.FC<CommunityHubModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const [requestedPass, setRequestedPass] = useState(false);
  const [telegramOrEmail, setTelegramOrEmail] = useState('');

  if (!isOpen) return null;

  const handleCopyHandle = () => {
    navigator.clipboard.writeText('@griffin.arnav002');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRequestPass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!telegramOrEmail) return;
    setRequestedPass(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#181c27] border border-[#2a2e39] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header */}
        <div className="relative p-6 bg-gradient-to-br from-[#1e222d] via-[#161a24] to-[#131722] border-b border-[#2a2e39] text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#181c27] hover:bg-[#2a2e39] border border-[#2a2e39] text-[#787b86] hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#2962FF] via-[#8b5cf6] to-[#ec4899] flex items-center justify-center text-white mx-auto shadow-xl mb-3">
            <Crown size={32} className="text-amber-300 drop-shadow-md" />
          </div>

          <h2 className="text-xl md:text-2xl font-black tracking-wide text-white">
            TRADE WITH GRIFFIN
          </h2>
          <p className="text-xs text-[#089981] font-mono font-semibold tracking-wider uppercase mt-1">
            Official Trader Community & VIP Hub
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
          {/* Instagram Spotlight Card */}
          <div className="p-4 bg-[#131722] rounded-xl border border-[#e1306c]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md">
                <Instagram size={22} />
              </div>
              <div>
                <div className="text-xs text-[#787b86]">Official Instagram Profile</div>
                <div className="text-base font-bold text-white tracking-wide">
                  @griffin.arnav002
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyHandle}
                className="px-3 py-1.5 bg-[#1e222d] hover:bg-[#2a2e39] border border-[#2a2e39] text-xs font-semibold text-white rounded-lg transition-colors flex items-center gap-1.5"
              >
                {copied ? <CheckCircle2 size={13} className="text-[#089981]" /> : <Copy size={13} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>

              <a
                href="https://www.instagram.com/griffin.arnav002"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-gradient-to-r from-[#e1306c] to-[#fd1d1d] hover:opacity-90 text-xs font-bold text-white rounded-lg shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Follow</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* VIP Benefits Grid */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#787b86]">
              VIP Trader Access Privileges
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-[#131722] rounded-lg border border-[#2a2e39] flex items-start gap-2.5">
                <Zap size={16} className="text-[#089981] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Daily High-Probability Setups</div>
                  <div className="text-[11px] text-[#787b86] mt-0.5">Crypto, US Tech & Indian NIFTY/BankNIFTY swing ideas</div>
                </div>
              </div>

              <div className="p-3 bg-[#131722] rounded-lg border border-[#2a2e39] flex items-start gap-2.5">
                <ShieldCheck size={16} className="text-[#2962FF] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Institutional Risk Management</div>
                  <div className="text-[11px] text-[#787b86] mt-0.5">1-2% max exposure discipline based on CMT principles</div>
                </div>
              </div>

              <div className="p-3 bg-[#131722] rounded-lg border border-[#2a2e39] flex items-start gap-2.5">
                <Award size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Live Chart Pattern Breakout Radar</div>
                  <div className="text-[11px] text-[#787b86] mt-0.5">Automated alerts for Cup & Handle, Flags, and Double Bottoms</div>
                </div>
              </div>

              <div className="p-3 bg-[#131722] rounded-lg border border-[#2a2e39] flex items-start gap-2.5">
                <Users size={16} className="text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Griffin Elite Circle</div>
                  <div className="text-[11px] text-[#787b86] mt-0.5">Private channel discussions, chart review & webinars</div>
                </div>
              </div>
            </div>
          </div>

          {/* Golden Rules of Griffin */}
          <div className="p-3.5 bg-[#131722] rounded-xl border border-[#2a2e39] space-y-1.5 text-xs text-[#d1d4dc]">
            <div className="font-bold text-white flex items-center gap-1.5 text-xs">
              <Sparkles size={14} className="text-amber-400" />
              <span>The 3 Griffin Rules for Consistent Profitability</span>
            </div>
            <p className="text-[11px] text-[#787b86] leading-relaxed">
              1. Never take a trade without a predetermined stop-loss level.<br />
              2. Always require volume confirmation on breakout candles.<br />
              3. Let winners run to 2.5:1 Risk/Reward; cut losers ruthlessly without emotion.
            </p>
          </div>

          {/* Request Pass Form */}
          {requestedPass ? (
            <div className="p-4 bg-[#089981]/15 border border-[#089981]/40 rounded-xl text-center space-y-1">
              <div className="text-sm font-bold text-[#089981]">VIP Request Received!</div>
              <p className="text-xs text-[#d1d4dc]">
                Check your Instagram DM or Telegram for the private invite code from @griffin.arnav002.
              </p>
            </div>
          ) : (
            <form onSubmit={handleRequestPass} className="space-y-2">
              <label className="text-xs text-[#787b86] block">
                Enter your Instagram handle or Telegram ID for VIP Pass review:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="@your_username"
                  value={telegramOrEmail}
                  onChange={(e) => setTelegramOrEmail(e.target.value)}
                  className="flex-1 bg-[#131722] border border-[#2a2e39] rounded-lg px-3 py-2 text-xs text-white placeholder-[#787b86] outline-none focus:border-[#2962FF]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#2962FF] to-[#7c3aed] text-white text-xs font-bold rounded-lg shadow-md hover:opacity-95 transition-all flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>Request Pass</span>
                  <Send size={13} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

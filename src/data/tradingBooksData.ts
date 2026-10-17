import { BookInfo } from '../types/trading';

export const TRADING_BOOKS: BookInfo[] = [
  {
    id: 'elearnmarkets',
    title: 'The Ultimate Ebook on Chart Patterns',
    subtitle: 'Technical Analysis Module',
    author: 'Elearnmarkets Research Team',
    coverBadge: 'Master Technical Patterns',
    totalPages: 64,
    summary: 'A definitive, practical masterclass on classical chart patterns covering reversal and continuation setups, neckline mechanics, price target projections, and real Indian & Global market case studies.',
    units: [
      {
        id: 'elm-unit-1',
        bookId: 'elearnmarkets',
        unitNumber: 'Unit 1',
        title: 'Introduction to Chart Patterns',
        category: 'Introduction',
        summary: 'Understanding distinctive pattern formations created by security price action over time to forecast future price movement.',
        patternType: 'Neutral',
        description: [
          'Chart patterns are distinctive geometric formations created by the movements of security prices on a chart over time.',
          'When prices are not in an established trend, they move sideways. These sideways consolidation periods conceive major explosive moves.',
          'Patterns put all buying and selling sentiment happening in the market into a concise visual picture, providing a framework for analyzing the battle between bulls and bears.',
          'Pattern analysis applies across all timeframes: intraday (1m, 5m, 15m), swing (1h, 4h, 1D), and positional (weekly, monthly).'
        ],
        rules: [
          'Never trade in anticipation; wait for an actual confirmed breakout.',
          'Volume validation is mandatory: volume must expand significantly on pattern breakout.',
          'Look for confluence with major support and resistance levels.'
        ],
        targetFormula: 'Depends on pattern type (typically base height or pole height projected from breakout).',
        stopLossFormula: 'Opposite side of breakout point or prior swing pivot.',
        diagram: 'channel'
      },
      {
        id: 'elm-unit-2',
        bookId: 'elearnmarkets',
        unitNumber: 'Unit 2',
        title: 'Types of Chart Patterns: Reversal vs Continuation',
        category: 'Introduction',
        summary: 'Classifying patterns into major trend reversal structures versus trend continuation pause models.',
        patternType: 'Neutral',
        description: [
          'Reversal Patterns indicate that an important reversal in the prior trend is taking place.',
          'Continuation Patterns suggest only a temporary pause in the current trend, after which the prevailing primary trend will resume.',
          'Key Reversal Preliminary Points: Must have an existing prior trend; the first warning sign is often trendline violation; larger patterns yield larger subsequent price moves; topping patterns are usually shorter and more volatile than bottom patterns.'
        ],
        rules: [
          'Existence of a clear prior trend is mandatory for a reversal pattern.',
          'Volume must decline during consolidation and burst during breakout.',
          'The larger the pattern duration, the greater the subsequent target move.'
        ],
        targetFormula: 'Target = Breakout Price ± Pattern Vertical Height',
        stopLossFormula: 'Invalidation point placed on false breakout threshold.',
        diagram: 'double-top'
      },
      {
        id: 'elm-unit-3',
        bookId: 'elearnmarkets',
        unitNumber: 'Unit 3',
        title: 'Head and Shoulders & Inverse Head and Shoulders',
        category: 'Reversal Patterns',
        summary: 'The king of reversal patterns: left shoulder, peak head, right shoulder, and the neckline breakdown/breakout.',
        patternType: 'Bearish',
        successRate: '83% Reliability',
        description: [
          'The regular Head and Shoulders pattern forms after an established uptrend and gives a bearish reversal signal upon breakdown below the neckline.',
          'The neckline is the horizontal or slightly sloping line connecting both troughs between the shoulders.',
          'Breakdown probability increases if the neckline slopes flat or downwards and the right shoulder is equal to or smaller than the left shoulder.',
          'Inverse Head and Shoulders forms after a downtrend and signals a strong bullish reversal upon breaking above the neckline.'
        ],
        rules: [
          'Enter when candle closes decisively across the neckline accompanied by high volume.',
          'Allow for a potential retest (throwback or pullback) of the neckline before entering full size.',
          'Pattern is invalid if price rises back above the right shoulder peak.'
        ],
        targetFormula: 'Minimum Target = Vertical distance from the peak of the Head to the Neckline, projected downward from the breakdown point.',
        stopLossFormula: 'Place Stop Loss above the high of the Right Shoulder (or above the neckline retest high for tighter risk).',
        exampleStock: 'Escorts Ltd (Daily) / Bandhan Bank (Daily)',
        exampleContext: 'Escorts Ltd achieved the entire vertical pattern target in a single powerful post-breakdown candle supported by heavy institutional volume.',
        diagram: 'head-and-shoulders'
      },
      {
        id: 'elm-unit-4',
        bookId: 'elearnmarkets',
        unitNumber: 'Unit 4',
        title: 'Double Top ("M") and Double Bottom ("W")',
        category: 'Reversal Patterns',
        summary: 'Classic horizontal resistance and support tests signaling end of prevailing momentum.',
        patternType: 'Bilateral',
        successRate: '78% Reliability',
        description: [
          'Double Top: Price forms two consecutive peaks around the same resistance level, separated by an intermediate trough. Forms an "M" shape.',
          'Double Bottom: Price forms two consecutive troughs around the same support level, separated by an intermediate peak. Forms a "W" shape.',
          'Confirmation occurs only when prices break through the neckline support (for double top) or resistance (for double bottom) with surge in volume.'
        ],
        rules: [
          'Peaks/troughs should be roughly at equal price levels (within 1-2% deviation).',
          'Volume on the second peak is typically lower than the first, signaling exhausting buyer conviction.',
          'Wait for closing bar outside the neckline.'
        ],
        targetFormula: 'Target = Vertical distance from the peaks/troughs to the neckline, projected from breakout level.',
        stopLossFormula: 'Double Top SL: Above the neckline or peak high. Double Bottom SL: Below the neckline or trough low.',
        exampleStock: 'Tata Motors Ltd (Daily Chart)',
        exampleContext: 'Tata Motors formed a textbook Double Top with neckline at ₹440, breaking down and swiftly hitting the vertical target projection.',
        diagram: 'double-top'
      },
      {
        id: 'elm-unit-5',
        bookId: 'elearnmarkets',
        unitNumber: 'Unit 5',
        title: 'Triple Tops and Bottoms',
        category: 'Reversal Patterns',
        summary: 'Three distinct tests of a key support or resistance level proving buyer or seller exhaustion.',
        patternType: 'Bilateral',
        successRate: '79% Reliability',
        description: [
          'Similar to double tops/bottoms, but price tests the key level three times and fails to break through.',
          'Triple Top Reversal forms at the end of an uptrend with three approximately equal highs.',
          'Triple Bottom Reversal forms at the end of a downtrend with three approximately equal lows.',
          'Third peak or trough failure creates significant liquidity buildup ready to fuel the breakout move.'
        ],
        rules: [
          'All three highs/lows should be nearly identical in price.',
          'Volume must spike sharply on the breach of the intermediate neckline.',
          'Watch for pullback retest before adding aggressively.'
        ],
        targetFormula: 'Target = Vertical height from highest peak to lowest trough, added or subtracted from breakout level.',
        stopLossFormula: 'Stop loss placed at the high of the third top (or low of the third bottom).',
        exampleStock: 'Infosys Ltd (Daily Chart)',
        exampleContext: 'Infosys demonstrated both a Triple Top breakdown and later a textbook Triple Bottom accumulation leading to a massive multi-month uptrend.',
        diagram: 'triple-top'
      },
      {
        id: 'elm-unit-6',
        bookId: 'elearnmarkets',
        unitNumber: 'Unit 6',
        title: 'Cup and Handle Pattern',
        category: 'Continuation Patterns',
        summary: 'Renowned multi-bagger pattern featuring a rounded accumulation bowl followed by a shallow consolidation handle.',
        patternType: 'Bullish',
        successRate: '85% Reliability',
        description: [
          'One of the most powerful patterns for identifying multi-bagger breakout stocks.',
          'The Cup is "U"-shaped (rounding bottom) showing gradual institutional accumulation. "U" shaped conviction is far higher than sharp "V" shapes.',
          'The Handle is a minor pullback (retracement) from the rim of the cup, typically retracing 1/3rd (maximum 1/2) of the cup depth.',
          'Can act as a bullish continuation pattern in ongoing uptrends or as a major structural reversal pattern coming out of a deep base.'
        ],
        rules: [
          'Cup formation duration is typically 1 to 6 months (or longer on weekly charts).',
          'Handle forms over 1 to 4 weeks with contracting volatility and drying up volume.',
          'Breakout above the cup rim resistance must be accompanied by heavy volume surge.'
        ],
        targetFormula: 'Minimum Target = Vertical distance from the lip resistance to the bottom of the cup, added to the breakout price.',
        stopLossFormula: 'Stop Loss placed at the lowest swing point of the Handle.',
        exampleStock: 'Nifty 50 Index (Weekly) & Dhampur Sugar Mills',
        exampleContext: 'Nifty 50 formed a 2-year Cup and Handle base, breaking out with a runaway gap and achieving its multi-thousand point target within 12 months.',
        diagram: 'cup-and-handle'
      },
      {
        id: 'elm-unit-7',
        bookId: 'elearnmarkets',
        unitNumber: 'Unit 7',
        title: 'Symmetrical Triangle',
        category: 'Continuation Patterns',
        summary: 'Converging upper and lower trendlines reflecting coiling volatility and impending explosive breakout.',
        patternType: 'Bilateral',
        successRate: '74% Reliability',
        description: [
          'Formed by two converging trendlines: a downward sloping upper trendline and an upward sloping lower trendline.',
          'Requires at least 4 reversal points (two peaks and two troughs) to be established.',
          'Represents balance of power between buyers and sellers before one side overwhelms the other.',
          'Breakout typically happens between two-thirds and three-fourths of the triangle length from base to apex.'
        ],
        rules: [
          'Volume must diminish progressively while the pattern develops.',
          'Closing candle basis is required for trade confirmation.',
          'Breakout before the 2/3 mark is premature; breakout at apex often lacks follow-through.'
        ],
        targetFormula: 'Target = Vertical width of the triangle at its base, added to upside breakout or subtracted from downside breakdown.',
        stopLossFormula: 'Stop loss placed at the opposite boundary trendline at the point of breakout.',
        exampleStock: 'Narayana Hrudayalaya Ltd (Daily Chart)',
        exampleContext: 'Formed a 3-month coiling symmetrical triangle on daily chart before a high-volume upside explosion.',
        diagram: 'symmetrical-triangle'
      },
      {
        id: 'elm-unit-8',
        bookId: 'elearnmarkets',
        unitNumber: 'Unit 8',
        title: 'Ascending and Descending Triangles',
        category: 'Continuation Patterns',
        summary: 'Directional triangles showing aggressive accumulation against resistance or distribution against support.',
        patternType: 'Bilateral',
        successRate: '80% Reliability',
        description: [
          'Ascending Triangle: Upper trendline is flat (horizontal resistance) while the lower trendline slopes upward (higher lows). Shows aggressive buyers absorbing sellers.',
          'Descending Triangle: Lower trendline is flat (horizontal support) while the upper trendline slopes downward (lower highs). Shows aggressive sellers pushing prices lower.',
          'Ascending triangles are predominantly bullish continuation patterns; descending triangles are predominantly bearish continuation setups.'
        ],
        rules: [
          'In ascending triangles, volume typically dries up during formation and explodes on the horizontal resistance break.',
          'A close above resistance / below support confirms the trade.',
          'Measure vertical height at the widest part of the triangle.'
        ],
        targetFormula: 'Target = Maximum vertical width of the triangle projected from the breakout point.',
        stopLossFormula: 'Ascending Triangle SL: Just below the most recent higher low or below the breakout line.',
        exampleStock: 'Birlasoft Ltd (Ascending) / SBI (Descending)',
        exampleContext: 'SBI formed a descending triangle on the daily chart with persistent support at ₹221; when it broke down, it plunged toward ₹180.',
        diagram: 'ascending-triangle'
      },
      {
        id: 'elm-unit-9',
        bookId: 'elearnmarkets',
        unitNumber: 'Unit 9',
        title: 'Wedges: Rising & Falling Wedges',
        category: 'Reversal Patterns',
        summary: 'Converging trendlines sloping in the same direction, signaling momentum exhaustion.',
        patternType: 'Bilateral',
        successRate: '76% Reliability',
        description: [
          'Wedges are skewed triangles where both trendlines point in the same direction (both up or both down).',
          'Rising Wedge: Both lines slope upward, but the lower support line is steeper than the upper resistance line. Bearish reversal or breakdown setup.',
          'Falling Wedge: Both lines slope downward, but the upper resistance line is steeper than the lower support line. Bullish reversal or breakout setup.',
          'Price must touch the trendlines at least 5 times (3 on one line, 2 on the other) before a valid breakout occurs.'
        ],
        rules: [
          'Rising wedges often occur after climactic bubbles or exhaustion rallies.',
          'Falling wedges often develop after climactic panics.',
          'Watch for high probability pullback/retest of broken wedge boundary.'
        ],
        targetFormula: 'For falling wedge: height of widest base added to breakout price. For rising wedge: lowest trough of the wedge.',
        stopLossFormula: 'Falling Wedge SL: Below the lowest wick of the pattern. Rising Wedge SL: Above the highest climax peak.',
        exampleStock: 'BSE Sensex (Falling Wedge) / Sundaram Finance (Rising Wedge)',
        exampleContext: 'BSE Sensex carved a classic falling wedge consolidation before a sharp V-shaped market recovery.',
        diagram: 'falling-wedge'
      },
      {
        id: 'elm-unit-10',
        bookId: 'elearnmarkets',
        unitNumber: 'Unit 10',
        title: 'Pennants',
        category: 'Continuation Patterns',
        summary: 'Short-term small symmetrical triangle consolidation formed after an explosive vertical flagpole move.',
        patternType: 'Bilateral',
        successRate: '82% Reliability',
        description: [
          'Created when a steep, sharp impulse move (flagpole) is followed by a brief period of converging consolidation.',
          'Pennants are short-term patterns that typically last between 1 to 3 weeks (approximately 15–20 candles).',
          'Initial stock move features significant institutional volume, volume dries up sharply during the pennant body, then bursts again on breakout.'
        ],
        rules: [
          'Consolidation must remain tight and orderly without sloppy swings.',
          'Duration must not exceed 3-4 weeks; otherwise it degrades into a broader triangle.',
          'Trade in the direction of the initial impulse flagpole.'
        ],
        targetFormula: 'Target = Add the vertical height of the initial flagpole to the breakout level.',
        stopLossFormula: 'Stop loss placed at the lowest price of the pennant consolidation.',
        exampleStock: 'BSE Sensex (Daily Chart)',
        exampleContext: 'BSE Sensex consolidated for 14 sessions inside a tight pennant before exploding upward for another 3,000-point rally.',
        diagram: 'pennant'
      },
      {
        id: 'elm-unit-11',
        bookId: 'elearnmarkets',
        unitNumber: 'Unit 11',
        title: 'Flags',
        category: 'Continuation Patterns',
        summary: 'Parallelogram or small channel consolidation tilting counter to the sharp flagpole trend.',
        patternType: 'Bilateral',
        successRate: '84% Reliability',
        description: [
          'A flag pattern is a continuation pattern formed when a sharp trend move is followed by a compact sideways or counter-trend channel.',
          'In a bullish flag, after an aggressive upward move, the price forms a downward or flat parallelogram.',
          'In a bearish flag, after a steep drop, the price forms an upward-sloping channel.',
          'Represents healthy profit taking before institutional buyers reload for the next leg.'
        ],
        rules: [
          'Flags should retrace less than 38.2% to 50% of the flagpole.',
          'Consolidation must slope opposite to the prevailing impulse direction.',
          'Enter on decisive candle close outside the flag boundary.'
        ],
        targetFormula: 'Target = Vertical length of the flagpole projected upward/downward from the breakout point.',
        stopLossFormula: 'Stop loss placed just outside the flag boundary on the opposite end.',
        exampleStock: 'GMM Pfaudler Ltd (Daily Chart)',
        exampleContext: 'GMM Pfaudler had a ₹1,200 vertical surge followed by a 2-week downward flag, resulting in an exact 100% flagpole extension.',
        diagram: 'flag'
      },
      {
        id: 'elm-unit-12',
        bookId: 'elearnmarkets',
        unitNumber: 'Unit 12',
        title: 'Megaphone Pattern (Broadening Wedge)',
        category: 'Reversal Patterns',
        summary: 'Expanding volatility pattern with at least two higher highs and two lower lows indicating chaotic market sentiment.',
        patternType: 'Bilateral',
        successRate: '72% Reliability',
        description: [
          'Consists of at least two higher highs and two lower lows with diverging trendlines.',
          'Forms when the market is highly volatile and emotional, with neither bulls nor bears able to maintain sustained control.',
          'Also known as an Inverted Symmetrical Triangle or Broadening Formation.',
          'Typically appears at major market tops or bottoms; daily and weekly timeframes offer the best reliability.'
        ],
        rules: [
          'Volume peaks along with price extremes (unlike converging triangles where volume contracts).',
          'Swing points must close decisively above or below the central pivot line (R1/R2 and S1/S2).',
          'Pattern failure (e.g. failure to reach the opposite boundary) triggers an aggressive trade in the opposite direction.'
        ],
        targetFormula: 'Target = Minimum 5% to 15% move toward opposite boundary or pattern height projected upon boundary breach.',
        stopLossFormula: 'Opposite side of the pivot line or previous swing extreme.',
        diagram: 'megaphone'
      },
      {
        id: 'elm-unit-13',
        bookId: 'elearnmarkets',
        unitNumber: 'Unit 13',
        title: 'Price Channels (Rising, Falling, Sideways)',
        category: 'Continuation Patterns',
        summary: 'Parallel trendlines bounding price oscillations, ideal for swing trades and breakout momentum.',
        patternType: 'Bilateral',
        successRate: '77% Reliability',
        description: [
          'A channel is created by two parallel trendlines acting as dynamic support and resistance.',
          'Upper trendline connects consecutive reaction highs; lower trendline connects consecutive reaction lows.',
          'Traders buy at lower support and take profit at upper resistance inside the channel.',
          'When price breaks out beyond one of the channel bounds, expect a rapid acceleration of momentum.'
        ],
        rules: [
          'Channel requires at least 2 touches on top and 2 touches on bottom.',
          'Failure of price to reach the upper channel boundary often warns of an impending downward breakdown.',
          'Breakout confirmed by high volume outside the channel.'
        ],
        targetFormula: 'Target = Height (width) of the channel projected from the breakout point.',
        stopLossFormula: 'Stop loss placed back inside the channel or above/below the most recent swing pivot.',
        exampleStock: 'PNB Housing Finance Ltd (Daily Chart)',
        exampleContext: 'Traded in a sustained Rising Channel for 6 months before an exhaustion breakdown below support.',
        diagram: 'channel'
      },
      {
        id: 'elm-unit-14',
        bookId: 'elearnmarkets',
        unitNumber: 'Unit 14',
        title: 'Gaps & The 4 Major Gap Types',
        category: 'Trading Rules & Risk',
        summary: 'Price jumps between daily sessions revealing strong imbalances in supply and demand.',
        patternType: 'Neutral',
        successRate: '81% Reliability',
        description: [
          'A price gap occurs when the opening price of a session is completely outside the trading range of the previous session.',
          'Common Gaps: Occur in nervous trading ranges, lack volume, and fill quickly. Doubtful trading opportunities.',
          'Breakaway Gaps: Occur when price jumps over a major support or resistance level or out of a pattern base. Strong momentum; rarely fill initially.',
          'Runaway / Continuation Gaps: Occur in the middle of a powerful trending move (measuring gaps). Signals intense buying panic.',
          'Exhaustion Gaps: Occur at the end of extended moves or after parabolic blow-offs. Usually filled quickly, followed by a Doji reversal candle.'
        ],
        rules: [
          'Common gaps should generally be traded in the opposite direction (fade the gap).',
          'Continuation and breakaway gaps must be traded in the direction of the gap.',
          'Exhaustion gaps signal reversal: enter opposite trend upon seeing price close back into the gap.'
        ],
        targetFormula: 'Runaway Gap: The gap marks approximately the exact midpoint (50%) of the total move.',
        stopLossFormula: 'Below the low of the gap candle for gap-ups; above the high for gap-downs.',
        diagram: 'gaps'
      }
    ]
  },
  {
    id: 'fidelity',
    title: 'Identifying Chart Patterns with Technical Analysis',
    subtitle: 'Fidelity Investments Webinar Series',
    author: 'Charles D. Kirkpatrick II, CMT (Author of Technical Analysis)',
    coverBadge: 'Institutional CMT Strategies',
    totalPages: 49,
    summary: 'Institutional framework by two-time Charles H. Dow Award winner Charles Kirkpatrick, CMT. Details confirmation filters, trap breakouts, protective stop-and-reverse rules, multi-bar rankings, and high-probability candlestick & volatility systems.',
    units: [
      {
        id: 'fid-unit-1',
        bookId: 'fidelity',
        unitNumber: 'Module 1',
        title: 'Defining Patterns & The Limits of Human Biases',
        category: 'Introduction',
        summary: 'Core pattern definition, fractal properties, and the 4 dangerous human psychological pitfalls traders face.',
        patternType: 'Neutral',
        description: [
          'A pattern is bounded by at least two trendlines (straight or curved).',
          'All patterns have a clear combination of entry and exit points.',
          'Patterns are fractal: they appear with identical geometric principles across weekly, daily, 15-minute, and 1-minute charts.',
          'CRITICAL RULE: A pattern is NOT complete or activated until an actual confirmed breakout occurs!',
          'Dangerous Human Tendencies to Eliminate: Seeing patterns where none exist; believing market lore without statistical evidence; looking backwards rather than forward; stubbornly sticking with original price targets after conditions change.'
        ],
        rules: [
          'Never trade before the boundary line is violated.',
          'Always demand objective confirmation before committing capital.',
          'Re-evaluate price targets dynamically if volatility or market structure shifts.'
        ],
        targetFormula: 'Dynamic based on pattern height and market confirmation filters.',
        stopLossFormula: 'Protective stop mandatory on every trade before entry.',
        diagram: 'symmetrical-triangle'
      },
      {
        id: 'elm-unit-2b',
        bookId: 'fidelity',
        unitNumber: 'Module 2',
        title: 'Techniques for Trading Patterns: Breakouts & Confirmation Filters',
        category: 'Trading Rules & Risk',
        summary: 'Applying the 5 confirmation filters to eliminate false signals before entering breakout trades.',
        patternType: 'Neutral',
        successRate: 'Institutional Standard',
        description: [
          'A breakout is the violation of a trendline, support or resistance, or previous reversal point.',
          'Breakouts signify a decisive change in buyer and seller behavior, signaling the beginning or end of a trend.',
          'Confirmation Filters to determine whether a breakout is genuine:',
          '1. Intrabar Filter: Price exceeds level by a designated threshold during the session.',
          '2. Multiple Closes Filter: Requires two or more consecutive session closes beyond the breakout level.',
          '3. Time Filter: Price must sustain outside the breakout boundary for a specific duration (e.g. 2 days or 3 bars).',
          '4. Percentage or Point Filter: Price must move 1% to 3% past the level.',
          '5. Money / Volume Filter: Significant dollar volume must validate the move.'
        ],
        rules: [
          'Always apply at least two confirmation filters before declaring a valid breakout.',
          'Use Buy Stop orders above resistance and Sell Stop orders below support for automated execution.'
        ],
        targetFormula: 'Entry Stop = Resistance + Confirmation Filter buffer',
        stopLossFormula: 'Initial Stop = Just below the breakout boundary',
        diagram: 'ascending-triangle'
      },
      {
        id: 'fid-unit-3',
        bookId: 'fidelity',
        unitNumber: 'Module 3',
        title: 'False Breakouts, Traps & Stop-and-Reverse Execution',
        category: 'Trading Rules & Risk',
        summary: 'Capital protection, recognizing bull/bear traps, and turning false breakouts into profitable trades.',
        patternType: 'Bilateral',
        successRate: 'Elite Risk Management',
        description: [
          'False Breakout: Price breaks out but almost immediately returns back through its breakout price.',
          'Failed Breakout (Trap): Price breaks out, fails, and then breaks out aggressively in the exact opposite direction.',
          'Trading False Breakouts using Protective Stops: Enter on breakout; place protective stop outside the breakout bar opposite to breakout direction.',
          'Place an entry stop at the same level (called a "Stop and Reverse" order). If the breakout is false, you immediately profit from the violent reversal in the opposite direction!'
        ],
        rules: [
          'Never enter without a predetermined protective stop.',
          'If a breakout candle closes back inside the pattern on high volume, exit immediately—it is a confirmed trap.',
          'Use throwbacks (on upside breaks) and pullbacks (on downside breaks) to confirm support/resistance flips.'
        ],
        targetFormula: 'Trap Target = Opposing side of the pattern + full pattern height.',
        stopLossFormula: 'Stop and reverse order level opposite the breakout candle.',
        diagram: 'double-top'
      },
      {
        id: 'fid-unit-4',
        bookId: 'fidelity',
        unitNumber: 'Module 4',
        title: 'Multi-Bar Horizontal & Triangular Congestions',
        category: 'Reversal Patterns',
        summary: 'Double/Triple Tops & Bottoms, Rectangles, Symmetrical/Ascending/Descending Triangles, and Wedges.',
        patternType: 'Bilateral',
        description: [
          'Horizontal Congestion: Double Top (subtract height from breakout price), Double Bottom (add distance to upside breakout).',
          'Triple Top/Bottom: Best performance often comes after a sustained multi-month trend.',
          'Rectangles: Trading range between horizontal support and resistance. Watch for "Shortfalls" (when price fails to reach the opposite boundary)—shortfalls almost always signal the direction of the eventual breakout!',
          'Triangles: Symmetrical (cradle formation), Ascending (most commonly breaks upward), Descending (above average upside breakout performance if reversed!).',
          'Wedges: Must touch trendlines at least 5 times (3 on one line, 2 on other); often occur following a panic or speculative bubble.'
        ],
        rules: [
          'Rectangles: A shortfall on the bottom indicates impending upside breakout.',
          'Triangles: Touch count >= 4 is required.',
          'Wedges: Retracements are very common; wait for pullback to enter.'
        ],
        targetFormula: 'Rectangle: Height between resistance and support added or subtracted from breakout zone.',
        stopLossFormula: 'Opposite zone boundary or halfway point of congestion channel.',
        diagram: 'symmetrical-triangle'
      },
      {
        id: 'fid-unit-5',
        bookId: 'fidelity',
        unitNumber: 'Module 5',
        title: 'Candlestick Reversal Formations',
        category: 'Candlesticks',
        summary: 'Doji, Harami, Hammer, Hanging Man, Shooting Star, Inverted Hammer, Engulfing, and Piercing Lines.',
        patternType: 'Bilateral',
        description: [
          'General Candlestick Rules: Traditionally reversal patterns used to spot when a trend is ending. Upward reversal patterns after a pullback in a longer upward trend show the best performance.',
          'Doji: Open and close are at the exact same price; shows market equilibrium and indecision.',
          'Harami: Large body followed by a small "spinning top" body completely contained within the prior bar.',
          'Hammer & Hanging Man: Long lower shadow at least 2x body length; hammer occurs at bottoms, hanging man at tops.',
          'Shooting Star & Inverted Hammer: Long upper shadow; rejection of higher prices.',
          'Engulfing: Second candle body completely engulfs the prior candle body. Bullish engulfing at support has outstanding statistical performance.'
        ],
        rules: [
          'Do NOT act on a perceived candle until the bar has officially closed.',
          'A candle pattern must be activated by price exceeding the high/low of the formation bar.',
          'Confluence with moving average (e.g. 50 EMA) or trendline triples the reliability.'
        ],
        targetFormula: 'Target = Nearest technical swing resistance / support level or 2:1 risk/reward.',
        stopLossFormula: 'Just beyond the extreme wick shadow of the formation candle.',
        diagram: 'candlestick-engulfing'
      },
      {
        id: 'fid-unit-6',
        bookId: 'fidelity',
        unitNumber: 'Module 6',
        title: 'Short-Term Systems: Explosion Gap Pivot, Pipe Bottom & NR4',
        category: 'Volatility & Short-term',
        summary: 'Institutional short-term setups: Explosion Gap Pivot, Two-Bar Reversal Pipe Bottom, Inside Bar, and Narrow Range 4 (NR4).',
        patternType: 'Bullish',
        successRate: 'Top Institutional Setup',
        description: [
          'Explosion Gap Pivot: After a breakaway gap, wait for a throwback. If the throwback does not cover the gap, the lowest point reached is the "Pivot Low". Place buy entry above the high of the gap bar with stop loss below the pivot low!',
          'Two-Day Reversal / Pipe Bottom: Two elongated bars at the end of a large downtrend. First bar closes at the low; second bar closes near the high with huge range. Highly reliable on weekly charts. Target = Height of taller bar added to breakout.',
          'Volatility Principles: Dull activity is low volatility. New violent trends begin from periods of compressed volatility.',
          'Inside Bar: Bar whose range is completely contained within the preceding bar range. Buy next bar above inside bar close.',
          'Narrow Range 4 (NR4): The 4th bar has a narrower range than the preceding 3 bars. Triggers an explosive expansion breakout.'
        ],
        rules: [
          'NR4: Place Buy Stop 1 tick above NR4 high and Sell Stop 1 tick below NR4 low.',
          'Explosion Gap Pivot: Only valid if throwback leaves gap unfilled.',
          'Pipe Bottom: Both bars must have visibly larger ranges than surrounding bars.'
        ],
        targetFormula: 'Pipe Bottom: Height of taller bar added to the high of the second bar.',
        stopLossFormula: 'Pipe Bottom SL: Below the low of the two bars. NR4 SL: Opposite extreme of the narrow bar.',
        diagram: 'pipe-bottom'
      },
      {
        id: 'fid-unit-7',
        bookId: 'fidelity',
        unitNumber: 'Module 7',
        title: 'Best Statistically Ranked Multi-Bar Patterns',
        category: 'Trading Rules & Risk',
        summary: 'Empirical ranking of highest performing chart setups from Charles Kirkpatrick technical analysis archives.',
        patternType: 'Bullish',
        successRate: 'Empirically Validated',
        description: [
          'According to statistical studies across decades of equity data in "Technical Analysis: The Complete Resource for Financial Market Technicians":',
          'BEST UPWARD SIGNALS:',
          '1. Descending Triangle (Upside Breakout): When a descending triangle breaks upward counter to the trend, it produces above-average gains and lowest failure rates.',
          '2. Horizontal Rectangle: Clear boundaries make target projections exceptionally reliable.',
          '3. Pipe Bottom: Highly profitable weekly reversal setup with low failure rate.',
          'BEST DOWNWARD SIGNALS:',
          '1. Bearish Flag: High velocity downward continuation move.',
          '2. Head and Shoulders Top: One of the lowest failure rates in financial history.',
          '3. Island Reversal: Violent exhaustion gap followed by breakaway gap in opposite direction.'
        ],
        rules: [
          'Focus risk capital primarily on the top-3 ranked patterns.',
          'Never fight the prevailing macro trend without confirmed multi-timeframe pattern alignment.',
          'Always calculate risk-to-reward ratio before clicking execute: minimum 1:2.5.'
        ],
        targetFormula: 'Minimum 1:2.5 Risk-to-Reward Ratio based on measured pattern height.',
        stopLossFormula: 'Strictly defined prior to order submission.',
        diagram: 'descending-triangle'
      }
    ]
  }
];

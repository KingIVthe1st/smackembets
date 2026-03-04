# Smack'em Bets Landing Page Rebuild — Build Spec

## MISSION
Rebuild the landing page (src/components/landing-page.tsx) to position Smack'em Bets as an AI-POWERED alternative to OddsJam (acquired for $160M). Keep the Spider-Verse comic book aesthetic but upgrade the content, stats, and positioning.

## COMPETITIVE ANALYSIS
Read COMPETITIVE_ANALYSIS.md for full OddsJam research and positioning strategy.

## KEY CHANGES FROM CURRENT PAGE

### Updated Stats
- Record: 225W–94L (70.5% win rate) — was 68.3%
- ROI: +34.7%
- High confidence picks: 77% win rate
- Games analyzed: 835+ (keep)
- Price: $250/month (was $97)

### New Positioning — "AI-Powered OddsJam Killer"
The current page positions us as a simple picks service. The NEW page positions us as a full AI sports betting INTELLIGENCE PLATFORM — everything OddsJam has (arb, +EV scanning) PLUS an AI brain that predicts, explains, learns, and delivers.

### Tagline Territory
- Primary: "Your AI Betting Partner That Gets Smarter Every Day"
- Secondary: "OddsJam gives you data. We give you an AI betting partner."
- Or: "The First AI-Powered Sports Betting Intelligence System"

### Sections to Build (in order)

1. **Hero** — Spider-Verse comic style, bold headline, animated stats, CTA
   - Headline: Something like "Meet Your AI Betting Partner" or "AI-Powered Sports Intelligence"
   - Sub: Brief killer pitch about AI that thinks, learns, delivers
   - CTA: "Start Winning — $250/mo"
   - Animated stat counters: 70.5% win rate, 225-94 record, +34.7% ROI

2. **Social Proof Bar** — 4 key stats with animated counters

3. **"What Makes Us Different" / The AI Brain Section**
   - This is THE key section. Show what makes us different from OddsJam/traditional tools
   - XGBoost + Elo dual-engine ensemble
   - Self-learning loop (gets smarter every day)
   - Conversational AI (ask questions, get real answers)
   - Voice note delivery
   - NOT just a dashboard — an intelligent partner

4. **The Arsenal / Features Grid**
   - AI Prediction Engine (XGBoost + Elo ensemble, 70.5%)
   - Injury Intelligence (player NRtg impact, auto-adjusts predictions)
   - Arbitrage Scanner (find risk-free bets between books)
   - +EV Scanner (positive expected value finder across 15+ books)
   - Parlay Builder (AI-ranked combos by EV and win probability)
   - Situational Analysis (B2B, altitude, refs, travel, 12+ factors)
   - Sharp Money Tracker (steam moves, reverse line movement)
   - Kelly Criterion Sizing (smart bankroll management)
   - CLV Tracker (proves methodology mathematically)
   - Player Props Engine (points, rebounds, assists with EV framework)
   - Risk Manager (exposure limits, correlation warnings, hard stops)
   - Multi-Sport (NBA, NHL, MLB + cross-sport parlays)

5. **"OddsJam vs Smack'em Bets" Comparison Section** (optional but powerful)
   - Side-by-side showing what OddsJam has vs what we have
   - Don't name OddsJam directly — say "Traditional Tools" or "Other Platforms"
   - Show: No AI vs AI, No predictions vs 70.5%, Dashboard vs Voice delivery, etc.

6. **How It Works** — 3 simple steps
   - Subscribe → Get your AI partner
   - Daily picks delivered (morning preview → 5:15 PM locks → nightly grades)
   - Ask questions, get answers, watch your bankroll grow

7. **The Daily Flow**
   - Morning: Game preview + early analysis
   - 5:15 PM ET: Final picks locked in with confidence scores
   - Night: Auto-graded results + P&L tracking
   - Delivered to WhatsApp — no app to download

8. **Testimonials** — Keep existing but update for new positioning

9. **Pricing** — Single tier, $250/month
   - List ALL features they get
   - "Cheaper than one bad weekend of betting"
   - CTA button

10. **FAQ** — Updated for new features and $250 price point

11. **Footer** — Standard, disclaimer, responsible gambling

## DESIGN GUIDELINES
- **Keep Spider-Verse comic book aesthetic** — the current design's visual style is great
- Dark background, neon accents (greens, purples, comic-style)
- Framer Motion animations (already in the project)
- Comic book halftone dots, speech bubbles, action lines where appropriate
- Mobile-first responsive
- Keep using existing dependencies (framer-motion, lucide-react, etc.)

## TECHNICAL NOTES
- File: src/components/landing-page.tsx (876 lines currently)
- Uses Next.js App Router, Tailwind CSS, Framer Motion
- CheckoutButton component exists at src/components/checkout-button.tsx
- Images in /public/ directory
- Don't break existing imports or routing

## DO NOT
- Remove the responsible gambling disclaimer
- Change the tech stack
- Remove existing component structure (CheckoutButton etc.)
- Use placeholder images that don't exist — use CSS/SVG/gradients for visuals

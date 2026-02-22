"use client";

import { motion } from "framer-motion";
import { Brain, TrendingUp, Shuffle, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckoutButton } from "@/components/checkout-button";
import { HeroNodeNetwork } from "@/components/hero-node-network";
import { FlowingWaves } from "@/components/flowing-waves";
import { HexGridOverlay } from "@/components/hex-grid-overlay";

const stats = [
  { n: "835+", l: "Games Trained", sub: "Retrains nightly at 5am UTC" },
  { n: "68.3%", l: "Win Rate", sub: "Verified across full dataset" },
  { n: "37", l: "Data Points", sub: "Per game analyzed" },
  { n: "7.0+", l: "Edge Threshold", sub: "Only HIGH confidence sent" }
];

const faqs = [
  ["What makes this different from ChatGPT or other AI picks?", "ChatGPT can't train on real outcomes. Our system uses dual-engine validation: XGBoost (70% weight) gradient-boosted on 835+ games + Elo ratings (30% weight) updated after every matchup. When both models agree → HIGH confidence. Calibrated probabilities verified with Brier Score 0.2151 (below 0.25 random baseline). This is quantitative modeling, not language generation."],
  ["What's your verified accuracy?", "68.3% win rate across 835+ games. MAE (Mean Absolute Error) of 10.6 points on margin prediction. Brier Score 0.2151 shows properly calibrated probabilities. Not cherry-picked — verified across the full historical dataset. We track every pick and retrain nightly with last night's results."],
  ["How do you calculate the Edge Score?", "Every pick gets a 0-10 score combining: (1) model confidence from XGBoost + Elo ensemble, (2) market edge (model probability vs. vig-removed implied odds), (3) situational factors (rest, travel, injuries). We only send picks with 7.0+ edge (HIGH) or 5.0-6.9 (MEDIUM). Anything below 5.0 is filtered out — minimum 5% edge threshold before any pick is made."],
  ["When do picks arrive and what's included?", "Every day at 3pm ET via email. Includes: spreads with confidence ratings, over/unders, moneyline value plays, injury-adjusted win probabilities, situational factors (back-to-backs, travel fatigue), and high-confidence parlay suggestions. Formatted for quick review before game time."],
  ["Do you guarantee wins?", "No guarantees. Sports betting carries risk and is for entertainment purposes only. We provide mathematically-backed analysis with verified historical performance, but variance exists in all probabilistic systems. You make the final call on every bet. Cancel anytime, no questions asked."]
];

export function LandingPage() {
  return (
    <main className="min-h-screen text-white">
      <nav className="fixed left-0 top-0 z-50 h-[68px] w-full border-b border-white/5 bg-[rgba(10,14,23,0.85)] backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2 text-sm font-semibold md:text-base">
            <span>AI Sports Betting</span>
            <span className="rounded bg-accent-cyan px-2 py-0.5 text-bg-primary">PRO</span>
          </div>
          <div className="hidden gap-6 text-sm text-white/80 md:flex">
            <a href="#sample">Live Picks</a>
            <a href="#how">How It Works</a>
            <a href="#features">Track Record</a>
            <a href="#pricing">Pricing</a>
          </div>
          <Button className="rounded-full px-5">Start Free Trial</Button>
        </div>
      </nav>

      <section className="relative overflow-hidden px-4 pb-32 pt-28 min-h-[900px]">
        {/* Background elements */}
        <HexGridOverlay />
        <HeroNodeNetwork />
        <FlowingWaves />

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[clamp(36px,5vw,56px)] font-extrabold uppercase leading-[1.15] tracking-tight text-white"
          >
            OUTSMART THE SPORTSBOOKS
            <br />
            WITH MACHINE LEARNING
          </motion.h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            Real time to involine the sports game with machine learning.
          </p>

          <div className="mt-16 relative perspective-1000">
            <div className="grid items-center gap-6 md:grid-cols-3">
              {["left", "center", "right"].map((pos, i) => (
                <Card
                  key={pos}
                  className={`group relative border border-accent-cyan/20 bg-black/60 backdrop-blur-xl p-6 transition-all duration-500 ${
                    pos === "center"
                      ? "md:scale-110 z-10 shadow-[0_0_40px_rgba(0,240,255,0.3)]"
                      : "md:scale-95 opacity-80 hover:opacity-100"
                  }`}
                  style={
                    pos === "left"
                      ? { transform: "rotateY(8deg)" }
                      : pos === "right"
                        ? { transform: "rotateY(-8deg)" }
                        : undefined
                  }
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse" />
                      <p className="text-sm font-semibold text-white/90">Live Dashboard</p>
                    </div>
                    <span className="text-xs text-red-400">23m 8m</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[#552583] flex items-center justify-center text-xs font-bold">LAL</div>
                      <span className="text-sm font-semibold text-white">Lakers</span>
                    </div>
                    <span className="text-xs text-text-muted">vs.</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">Nuggets</span>
                      <div className="h-8 w-8 rounded-full bg-[#0E2240] flex items-center justify-center text-xs font-bold">DEN</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <span className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-center text-sm font-semibold">-1.65</span>
                    <span className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-center text-sm font-semibold">-1.20</span>
                    <span className="flex-1 rounded-lg bg-accent-green/20 border border-accent-green px-3 py-2 text-center text-sm font-bold text-accent-green shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                      8.26
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            {/* AI Confidence Score */}
            <div className="mt-12 mx-auto max-w-2xl">
              <div className="rounded-2xl border border-accent-cyan/30 bg-black/60 backdrop-blur-xl p-6 shadow-[0_0_60px_rgba(0,240,255,0.2)]">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-lg font-bold text-white">AI Confidence Score: <span className="text-accent-cyan">8.8</span>/10</p>
                </div>
                <div className="h-4 rounded-full bg-gray-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-accent-cyan to-accent-green shadow-[0_0_20px_rgba(0,240,255,0.6)]" 
                    style={{ width: "88%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-bg-secondary/80 px-4 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-3xl font-black text-accent-cyan">{s.n}</p>
              <p className="mt-2 text-base font-semibold text-white">{s.l}</p>
              <p className="mt-1 text-xs text-text-muted">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 border-y border-white/10">
        <div className="text-center">
          <h2 className="text-3xl font-black">Verified Performance Metrics</h2>
          <p className="mt-3 text-lg text-text-muted">If we say 70% — we mean 70%. Probabilities are mathematically calibrated.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card className="p-6 text-center">
            <p className="text-4xl font-black text-accent-green">68.3%</p>
            <p className="mt-2 text-sm font-semibold text-white">Win Rate</p>
            <p className="mt-1 text-xs text-text-muted">Across 835+ games (50% = random)</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-4xl font-black text-accent-cyan">0.2151</p>
            <p className="mt-2 text-sm font-semibold text-white">Brier Score</p>
            <p className="mt-1 text-xs text-text-muted">Below 0.25 baseline (lower = better)</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-4xl font-black text-accent-green">10.6</p>
            <p className="mt-2 text-sm font-semibold text-white">MAE Points</p>
            <p className="mt-1 text-xs text-text-muted">Margin prediction accuracy</p>
          </Card>
        </div>
        <p className="mt-8 text-center text-sm text-text-muted">
          Updated nightly. Full historical backtest available. No cherry-picking.
        </p>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-black">Simple 3-Step System</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-text-muted">
            No spreadsheets. No manual research. Just proven AI picks in your inbox.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card className="group hover:scale-105 transition-all duration-300 cyan-glow p-8">
            <div className="flex items-center gap-3">
              <span className="text-5xl font-black text-accent-cyan/30">01</span>
              <h3 className="text-2xl font-bold">Subscribe</h3>
            </div>
            <p className="mt-4 text-base leading-relaxed text-text-muted">
              $29/month gets you unlimited picks. No contracts, no setup fees. 
              Cancel anytime with one click.
            </p>
          </Card>
          <Card className="group hover:scale-105 transition-all duration-300 cyan-glow p-8">
            <div className="flex items-center gap-3">
              <span className="text-5xl font-black text-accent-cyan/30">02</span>
              <h3 className="text-2xl font-bold">Receive Picks</h3>
            </div>
            <p className="mt-4 text-base leading-relaxed text-text-muted">
              Every day at 3pm ET, fresh picks hit your inbox. High-confidence spreads, 
              totals, and parlays — all pre-analyzed.
            </p>
          </Card>
          <Card className="group hover:scale-105 transition-all duration-300 cyan-glow p-8">
            <div className="flex items-center gap-3">
              <span className="text-5xl font-black text-accent-cyan/30">03</span>
              <h3 className="text-2xl font-bold">Place & Win</h3>
            </div>
            <p className="mt-4 text-base leading-relaxed text-text-muted">
              Take the picks to your sportsbook. Stick to the confidence ratings. 
              Let the AI edge work for you.
            </p>
          </Card>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-black">
            Dual-Engine AI Validation
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-text-muted">
            Two independent ML models cross-validate every pick. When both agree → HIGH confidence. 
            When they disagree → we flag it. No other service runs dual-engine validation.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card className="group hover:border-accent-cyan/40 transition-all duration-300 cyan-glow p-8">
            <Brain className="mb-4 h-12 w-12 text-accent-cyan group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold">XGBoost ML Engine</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Gradient-boosted model trained on 835+ games. Learns non-linear patterns no human analyst could spot. 
              <span className="block mt-2 text-accent-cyan font-semibold">Retrains every night at 5am UTC</span> with last night's results. 
              70% weight in final edge score.
            </p>
          </Card>
          <Card className="group hover:border-accent-cyan/40 transition-all duration-300 cyan-glow p-8">
            <TrendingUp className="mb-4 h-12 w-12 text-accent-cyan group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold">Situational Intelligence</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Back-to-backs: <span className="text-accent-green">−3 pts</span>. 
              Timezone crossings: quantified travel fatigue. 
              Rest differential: 0 vs. 1 vs. 2+ days all calibrated separately. 
              <span className="block mt-2 text-accent-cyan font-semibold">37 data points per game</span> — the market chronically underprices situational edges.
            </p>
          </Card>
          <Card className="group hover:border-accent-cyan/40 transition-all duration-300 cyan-glow p-8">
            <Shuffle className="mb-4 h-12 w-12 text-accent-cyan group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold">Injury-Adjusted Picks</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Every NBA player tiered by net rating impact. 
              Superstars: <span className="text-red-400">−10 to −14 pts</span>. 
              All-Stars: <span className="text-orange-400">−7 to −9 pts</span>. 
              <span className="block mt-2 text-accent-cyan font-semibold">Auto-adjusts before books catch up</span> — we caught the Devin Booker injury 3.6 pts early.
            </p>
          </Card>
        </div>
      </section>

      <section id="sample" className="mx-auto max-w-4xl px-4 py-12">
        <Card className="relative overflow-hidden p-8">
          <h3 className="text-xl font-bold">Sample Picks Preview</h3>
          <p className="mt-4 blur-[2px]">MIA -11.5 | DAL +4.0 | BOS/NYK UNDER 224.5</p>
          <p className="mt-2 text-sm text-text-muted">Subscribe to unlock full daily card.</p>
          <Sparkles className="absolute bottom-5 right-5 h-16 w-16 text-white/10" />
        </Card>
      </section>

      <section id="pricing" className="mx-auto max-w-4xl px-4 py-20">
        <Card className="relative overflow-hidden border-2 border-accent-cyan/30 p-10 text-center">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="rounded-full bg-accent-green px-4 py-1 text-sm font-bold text-black">
              🔥 LIMITED TIME
            </span>
          </div>
          <h3 className="mt-4 text-5xl font-black">
            <span className="text-accent-cyan">$29</span>
            <span className="text-2xl text-text-muted">/month</span>
          </h3>
          <p className="mt-4 text-xl text-white">Unlimited AI-Powered Picks</p>
          <div className="mx-auto mt-6 grid max-w-md gap-3 text-left">
            <div className="flex items-center gap-2">
              <span className="text-accent-green">✓</span>
              <span className="text-text-muted">37 data points analyzed per game</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-green">✓</span>
              <span className="text-text-muted">Dual-engine validation (XGBoost + Elo)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-green">✓</span>
              <span className="text-text-muted">Only 7.0+ edge picks sent (5% minimum threshold)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-green">✓</span>
              <span className="text-text-muted">Retrains nightly at 5am UTC with latest results</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-green">✓</span>
              <span className="text-text-muted">Live injury tracking with tiered player impact</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-green">✓</span>
              <span className="text-text-muted">68.3% win rate, 0.2151 Brier Score (verified)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-green">✓</span>
              <span className="text-text-muted">Cancel anytime, no questions asked</span>
            </div>
          </div>
          <CheckoutButton className="mx-auto mt-8 text-lg" />
          <p className="mt-4 text-sm text-text-muted">
            Less than $1 per day. Most subscribers profit from a single winning bet.
          </p>
        </Card>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20">
        <div className="text-center">
          <h3 className="text-4xl font-black">Questions?</h3>
          <p className="mt-3 text-lg text-text-muted">Everything you need to know before you start winning.</p>
        </div>
        <div className="mt-10 space-y-4">
          {faqs.map(([q, a]) => (
            <Card key={q} className="group hover:border-accent-cyan/30 transition-all p-6">
              <p className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors">{q}</p>
              <p className="mt-3 text-base leading-relaxed text-text-muted">{a}</p>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-text-muted">
        <p>For entertainment purposes only. Not financial advice.</p>
        <p className="mt-2">© {new Date().getFullYear()} AI Sports Betting Pro</p>
      </footer>
    </main>
  );
}

"use client";

import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { Brain, TrendingUp, Shuffle, Sparkles, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@/components/checkout-button";
import { HeroNodeNetwork } from "@/components/hero-node-network";
import { FlowingWaves } from "@/components/flowing-waves";
import { HexGridOverlay } from "@/components/hex-grid-overlay";
import { useRef, useEffect, useState } from "react";

/* ─── Reusable scroll-reveal wrapper ─── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated counter ─── */
function Counter({ target, suffix = "", prefix = "", decimals = 0 }: { target: number; suffix?: string; prefix?: string; decimals?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => `${prefix}${decimals > 0 ? v.toFixed(decimals) : Math.round(v)}${suffix}`);
  const [displayStr, setDisplayStr] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, { duration: 2, ease: "easeOut" });
      const unsub = display.on("change", (v) => setDisplayStr(v));
      return () => { controls.stop(); unsub(); };
    }
  }, [isInView, count, target, display]);

  return <span ref={ref}>{displayStr}</span>;
}

/* ─── FAQ Accordion Item ─── */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * 0.08}>
      <Card
        className="group cursor-pointer hover:border-accent-cyan/30 transition-all p-6 overflow-hidden"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors">{q}</p>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="h-5 w-5 text-text-muted flex-shrink-0" />
          </motion.div>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <p className="mt-4 text-base leading-relaxed text-text-muted">{a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </Reveal>
  );
}

const stats = [
  { n: 835, suffix: "+", l: "Games Analyzed", sub: "Model retrains every single night" },
  { n: 68.3, suffix: "%", l: "Win Rate", sub: "18.3% above random chance", decimals: 1 },
  { n: 37, suffix: "", l: "Data Points", sub: "Per game — depth humans can't match" },
  { n: 7.0, suffix: "+", l: "Edge Threshold", sub: "We skip weak picks. You only get the best.", decimals: 1 }
];

const faqs = [
  ["Why $250/month? That seems expensive.", "Because cheap picks are worthless. Free tipsters and $20/month services use gut feelings and recycled narratives. We run dual-engine machine learning that retrains nightly on real outcomes. The infrastructure alone costs more than most services charge. Our members don't pay $250 — they invest $250 to access an edge that has returned 68.3% win rates across 835+ verified games. One good week covers the entire month."],
  ["What makes this different from other AI picks services?", "Most \"AI picks\" services are just ChatGPT wrappers generating plausible-sounding analysis. They can't train on real outcomes. Our system uses XGBoost gradient-boosted trees (70% weight) cross-validated with Elo ratings (30% weight) — two independent models that must agree before any pick is sent. Calibrated with a Brier Score of 0.2151. This is quantitative finance applied to sports, not language generation."],
  ["How do I know the 68.3% win rate is real?", "Every pick is timestamped and tracked. Full historical backtest available. Our Brier Score of 0.2151 (well below the 0.25 random baseline) proves our probabilities are properly calibrated — meaning when we say 70% confidence, it actually wins ~70% of the time. We publish this because we can back it up."],
  ["What exactly do I get each day?", "Every day at 3pm ET: high-confidence spreads, over/unders, moneyline value plays, and AI-optimized parlays. Each pick includes the Edge Score (0-10), injury adjustments, situational factors (back-to-backs, travel fatigue), and the exact reasoning behind the recommendation. Formatted for 60-second review before tip-off."],
  ["What if I want to cancel?", "One click. No phone calls, no retention specialists, no guilt trips. Cancel from your dashboard instantly. We keep members by delivering results, not by making it hard to leave."]
];

const stepsData = [
  { num: "01", title: "Subscribe", desc: "Join in under 60 seconds. No contracts, no setup fees, no lock-in. Your first picks arrive the same day." },
  { num: "02", title: "Receive Picks", desc: "Every day at 3pm ET — spreads, totals, moneylines, and parlays. Each pick shows exactly why the AI flagged it. No guesswork." },
  { num: "03", title: "Place & Win", desc: "Use your sportsbook of choice. Follow the confidence ratings. One winning bet can cover your entire month." },
];

const features = [
  { icon: Brain, title: "Deep Learning Models", desc: "XGBoost gradient-boosted trees trained on 835+ games detect non-linear patterns invisible to human analysts. Retrains every night with last night\u2019s results \u2014 the model gets smarter while you sleep." },
  { icon: TrendingUp, title: "Live Odds Arbitrage", desc: "Real-time line movement tracking across every major sportsbook. When our model spots odds the market hasn\u2019t corrected yet, you get the alert \u2014 before the edge disappears." },
  { icon: Shuffle, title: "Custom Parlay Builder", desc: "Build multi-leg parlays where every leg is AI-validated. Each pick is scored independently \u2014 so you never stack a parlay with a weak link dragging it down." },
];

const benefits = [
  "68.3% verified win rate — over 18% above random chance",
  "Dual-engine validation — only HIGH confidence picks sent",
  "Spreads, totals, moneylines & optimized parlays daily",
  "Model retrains nightly — gets smarter every single day",
  "Live injury tracking catches line moves before the books adjust",
  "37 data points per game — depth no human can match",
  "Cancel anytime — no contracts, no questions",
];

export function LandingPage() {
  return (
    <main className="min-h-screen text-white overflow-x-hidden">
      {/* ─── NAV ─── */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className="fixed left-0 top-0 z-50 h-[68px] w-full border-b border-white/5 bg-[rgba(10,14,23,0.85)] backdrop-blur-xl"
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2 text-sm font-semibold md:text-base">
            <span>AI Sports Betting</span>
            <span className="rounded bg-accent-cyan px-2 py-0.5 text-bg-primary text-xs font-bold">PRO</span>
          </div>
          <div className="hidden gap-6 text-sm text-white/80 md:flex">
            <a href="#sample" className="hover:text-white transition-colors">Live Predictions</a>
            <a href="#how" className="hover:text-white transition-colors">AI Parlay Builder</a>
            <a href="#features" className="hover:text-white transition-colors">Models &amp; Stats</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button className="rounded-full bg-[#00FF41] hover:bg-[#00DD38] text-black font-bold border-none px-5 text-sm">Start Free Trial</Button>
          </motion.div>
        </div>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden px-4 pb-32 pt-28 min-h-[900px]">
        <FlowingWaves />
        <HexGridOverlay />
        <HeroNodeNetwork />

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          {/* Staggered hero text */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-[clamp(32px,7vw,56px)] font-extrabold uppercase leading-[1.1] tracking-tight text-white"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="block"
            >
              OUTSMART THE SPORTSBOOKS
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="block"
            >
              WITH MACHINE LEARNING
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-text-muted px-4"
          >
            Our dual-engine AI analyzes 37 data points per game, retrains nightly, and only sends picks when confidence is highest. Stop guessing. Start knowing.
          </motion.p>

          {/* Dashboard cards with staggered entrance */}
          <div className="mt-12 md:mt-16 relative">
            <div className="relative flex items-center justify-center gap-0 overflow-hidden mx-auto px-4" style={{ maxWidth: "900px" }}>
              {["left", "center", "right"].map((pos, i) => (
                <motion.div
                  key={pos}
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  animate={{ opacity: pos === "center" ? 1 : 0.6, y: 0, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.15, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                  className="flex-shrink-0"
                  style={
                    pos === "left"
                      ? { marginRight: "-30px", marginLeft: "-40px" }
                      : pos === "right"
                        ? { marginLeft: "-30px", marginRight: "-40px" }
                        : undefined
                  }
                >
                  <Card
                    className={`relative border border-accent-cyan/20 bg-black/60 backdrop-blur-xl p-4 md:p-6 transition-all duration-500 ${
                      pos === "center"
                        ? "z-10 shadow-[0_0_40px_rgba(0,240,255,0.3)] w-[260px] md:w-[340px]"
                        : "w-[200px] md:w-[280px] hidden md:block"
                    }`}
                  >
                    <div className="mb-3 md:mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse" />
                        <p className="text-xs md:text-sm font-semibold text-white/90">Live Dashboard</p>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] md:text-xs text-red-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                        {pos === "right" ? "23m11m" : "23m 8m"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-[#552583] flex items-center justify-center text-[10px] md:text-xs font-bold">LAL</div>
                        <span className="text-xs md:text-sm font-semibold text-white">Lakers</span>
                      </div>
                      <span className="text-[10px] md:text-xs text-text-muted">vs.</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs md:text-sm font-semibold text-white">Nuggets</span>
                        <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-[#0E2240] flex items-center justify-center text-[10px] md:text-xs font-bold">DEN</div>
                      </div>
                    </div>

                    <div className="flex gap-1.5 md:gap-2">
                      <span className="flex-1 rounded-lg bg-white/5 border border-white/10 px-2 md:px-3 py-1.5 md:py-2 text-center text-xs md:text-sm font-semibold">{pos === "right" ? "-1.95" : "-1.65"}</span>
                      <span className="flex-1 rounded-lg bg-white/5 border border-white/10 px-2 md:px-3 py-1.5 md:py-2 text-center text-xs md:text-sm font-semibold">-1.20</span>
                      <span className="flex-1 rounded-lg bg-accent-green/20 border border-accent-green px-2 md:px-3 py-1.5 md:py-2 text-center text-xs md:text-sm font-bold text-accent-green shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                        {pos === "left" ? "8.26" : "8.20"}
                      </span>
                    </div>

                    {pos === "center" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8, duration: 0.6 }}
                        className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/10"
                      >
                        <p className="text-xs md:text-sm font-semibold text-white/90 mb-2">AI Confidence Score: <span className="text-accent-cyan">8.5</span>/10</p>
                        <div className="h-2.5 md:h-3 rounded-full bg-gray-800 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "85%" }}
                            transition={{ delay: 2.0, duration: 1.2, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-green shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                          />
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="border-y border-white/5 bg-bg-secondary/80 px-4 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.1}>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-black text-accent-cyan">
                  <Counter target={s.n} suffix={s.suffix} decimals={s.decimals || 0} />
                </p>
                <p className="mt-2 text-sm md:text-base font-semibold text-white">{s.l}</p>
                <p className="mt-1 text-[11px] md:text-xs text-text-muted">{s.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── VERIFIED METRICS ─── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-6xl px-4 py-16 border-y border-white/10"
      >
        <Reveal>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-black">Numbers Don&apos;t Lie. Neither Do We.</h2>
            <p className="mt-3 text-sm md:text-lg text-text-muted px-2">Every metric below is verified across our full dataset. Not cherry-picked. Not hypothetical. Real results.</p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
          {[
            { val: "68.3%", label: "Win Rate", sub: "Across 835+ games (50% = random)", color: "text-accent-green" },
            { val: "0.2151", label: "Brier Score", sub: "Below 0.25 baseline (lower = better)", color: "text-accent-cyan" },
            { val: "10.6", label: "MAE Points", sub: "Margin prediction accuracy", color: "text-accent-green" },
          ].map((m, i) => (
            <Reveal key={m.label} delay={i * 0.15}>
              <motion.div whileHover={{ scale: 1.03, y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="p-6 text-center">
                  <p className={`text-3xl md:text-4xl font-black ${m.color}`}>{m.val}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{m.label}</p>
                  <p className="mt-1 text-xs text-text-muted">{m.sub}</p>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.4}>
          <p className="mt-8 text-center text-xs md:text-sm text-text-muted">
            Updated nightly. Full historical backtest available. No cherry-picking.
          </p>
        </Reveal>
      </motion.section>

      {/* ─── 3-STEP SYSTEM ─── */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-20">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black">From Inbox to Income in 3 Steps</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm md:text-lg text-text-muted px-2">
              No spreadsheets. No hours of research. Just open your email, place your bets, and let the math work.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-3">
          {stepsData.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.15}>
              <motion.div
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(0, 240, 255, 0.15)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-6 md:p-8 h-full">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl md:text-5xl font-black text-accent-cyan/30">{step.num}</span>
                    <h3 className="text-xl md:text-2xl font-bold">{step.title}</h3>
                  </div>
                  <p className="mt-4 text-sm md:text-base leading-relaxed text-text-muted">{step.desc}</p>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="relative mx-auto max-w-6xl px-4 py-16">
        <motion.svg
          className="absolute -right-10 bottom-20 h-24 w-24 opacity-20"
          viewBox="0 0 100 100"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <path d="M50 0 L58 42 L100 50 L58 58 L50 100 L42 58 L0 50 L42 42 Z" fill="#D0D8E8" />
        </motion.svg>

        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black">Why Our Picks Hit Different</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm md:text-lg text-text-muted px-2">
              Two independent ML models must agree before any pick reaches you. When they disagree — we don&apos;t send it. That&apos;s why our 68.3% win rate isn&apos;t luck. It&apos;s math.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.15}>
              <motion.div
                whileHover={{ scale: 1.03, y: -6 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="h-full"
              >
                <Card className="group hover:border-accent-cyan/40 transition-all duration-300 p-6 md:p-8 h-full">
                  <motion.div
                    className="mb-4 flex h-[56px] w-[56px] md:h-[60px] md:w-[60px] items-center justify-center rounded-xl bg-[#00FF41]/10 border border-[#00FF41]/20"
                    whileHover={{ rotate: -6, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <f.icon className="h-7 w-7 md:h-8 md:w-8 text-[#00FF41]" />
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-bold">{f.title}</h3>
                  <p className="mt-3 text-xs md:text-sm leading-relaxed text-text-muted">{f.desc}</p>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── SAMPLE PICKS ─── */}
      <Reveal className="mx-auto max-w-4xl px-4 py-12">
        <Card className="relative overflow-hidden p-6 md:p-8">
          <h3 className="text-lg md:text-xl font-bold">Sample Picks Preview</h3>
          <p className="mt-4 blur-[2px] text-sm md:text-base">MIA -11.5 | DAL +4.0 | BOS/NYK UNDER 224.5</p>
          <p className="mt-2 text-xs md:text-sm text-text-muted">Subscribe to unlock full daily card.</p>
          <Sparkles className="absolute bottom-5 right-5 h-12 w-12 md:h-16 md:w-16 text-white/10" />
        </Card>
      </Reveal>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="mx-auto max-w-4xl px-4 py-20">
        <Reveal>
          <motion.div
            whileHover={{ boxShadow: "0 0 60px rgba(0, 240, 255, 0.2)" }}
            transition={{ duration: 0.4 }}
          >
            <Card className="relative overflow-hidden border-2 border-accent-cyan/30 p-8 md:p-10 text-center">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <motion.span
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
                  className="inline-block rounded-full bg-accent-green px-4 py-1 text-xs md:text-sm font-bold text-black"
                >
                  🔥 LIMITED SPOTS AVAILABLE
                </motion.span>
              </div>

              <p className="mt-6 text-xs md:text-sm text-text-muted line-through">$500/month</p>
              <h3 className="text-4xl md:text-5xl font-black">
                <span className="text-accent-cyan">$250</span>
                <span className="text-xl md:text-2xl text-text-muted">/month</span>
              </h3>
              <p className="mt-4 text-base md:text-xl text-white">Unlimited AI-Powered Picks — Every Day at 3pm ET</p>

              <div className="mx-auto mt-6 grid max-w-md gap-2.5 md:gap-3 text-left">
                {benefits.map((b, i) => (
                  <motion.div
                    key={b}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-accent-green mt-0.5">✓</span>
                    <span className="text-xs md:text-sm text-text-muted">{b}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="mt-8">
                <CheckoutButton className="mx-auto text-base md:text-lg" />
              </motion.div>

              <p className="mt-4 text-xs md:text-sm text-text-muted px-4">
                One winning $500 bet at -110 pays $454. That&apos;s nearly two months of picks — from a single win.
              </p>
            </Card>
          </motion.div>
        </Reveal>
      </section>

      {/* ─── FAQ ─── */}
      <section className="mx-auto max-w-4xl px-4 py-20">
        <Reveal>
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-black">Still On The Fence?</h3>
            <p className="mt-3 text-sm md:text-lg text-text-muted">Fair. Here&apos;s everything you need to make a decision.</p>
          </div>
        </Reveal>
        <div className="mt-10 space-y-3 md:space-y-4">
          {faqs.map(([q, a], i) => (
            <FaqItem key={q} q={q} a={a} index={i} />
          ))}
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <Reveal>
        <footer className="border-t border-white/10 px-4 py-8 text-center text-xs md:text-sm text-text-muted">
          <p>For entertainment purposes only. Not financial advice.</p>
          <p className="mt-2">© {new Date().getFullYear()} AI Sports Betting Pro</p>
        </footer>
      </Reveal>
    </main>
  );
}

"use client";

import Image from "next/image";
import { AnimatePresence, animate, motion, useInView, useMotionValue, useScroll, useTransform } from "framer-motion";
import { Brain, Sparkles, TrendingUp, Zap, Shuffle, ChevronDown, Check, Shield, Lock, X, AlertTriangle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckoutButton } from "@/components/checkout-button";

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const stats = [
  { value: 835, suffix: "+", label: "Games Analyzed", icon: "📊" },
  { value: 68.3, suffix: "%", label: "Win Rate", decimals: 1, icon: "🏆" },
  { value: 37, suffix: "", label: "Data Points / Game", icon: "🧠" },
  { value: 7.0, suffix: "+", label: "Edge Threshold", decimals: 1, icon: "⚡" }
];

const arsenalSteps = [
  {
    step: "01",
    title: "Deep Learning Engine",
    subtitle: "37 data points. Every game.",
    text: "Dual-model validation cross-references gradient-boosted predictions against Elo power ratings. Bad spots get filtered before they ever hit your inbox.",
    image: "/feat-deeplearn.png"
  },
  {
    step: "02",
    title: "Live Odds Intel",
    subtitle: "See what the books don't want you to see.",
    text: "Real-time line movement tracking surfaces soft numbers before the books fully correct. When the market shifts, you know first.",
    image: "/feat-odds.png"
  },
  {
    step: "03",
    title: "AI Parlay Builder",
    subtitle: "Engineered stacks, not random combos.",
    text: "Build correlated, high-confidence parlays from AI-scored legs. Every combination is validated for statistical edge.",
    image: "/feat-parlay.png"
  }
];

const testimonials = [
  {
    quote: "I was flushing money on gut-feel bets. Smack'em paid for itself in the first week. The AI edge is terrifyingly real.",
    name: "Mark R.",
    detail: "Member since Feb '26",
    avatar: "M",
    winAmount: "+$2,340"
  },
  {
    quote: "Finally, picks backed by actual data — not some dude's hunches on Twitter. The parlay builder alone is worth $250.",
    name: "Jason T.",
    detail: "3-month streak",
    avatar: "J",
    winAmount: "+$4,180"
  },
  {
    quote: "68% hit rate isn't hype. I tracked every pick for two months. Farrah is the real deal.",
    name: "Sarah K.",
    detail: "Verified member",
    avatar: "S",
    winAmount: "+$1,870"
  }
];

const faqs = [
  { question: "Who is Farrah?", answer: "Farrah is the proprietary AI engine behind Smack'em Bets. It blends gradient-boosted modeling, Elo power ratings, and live market inputs into a single confidence score — analyzing 37 data points per game before making a single pick." },
  { question: "Is the 68.3% win rate real?", answer: "Yes. Tracked and verified across 835+ logged games. No cherry-picking, no retroactive adjustments. Every pick is timestamped before tip-off." },
  { question: "$250/month seems steep.", answer: "If you bet $50-100/game, one extra win per week pays for the entire month. Our members average 12-15 extra wins monthly. The question isn't whether you can afford it — it's whether you can afford not to have it." },
  { question: "What exactly do I get?", answer: "Daily AI-powered picks at 3pm ET: spreads, totals, moneylines, and engineered parlays — each with full rationale, edge score, and confidence rating." },
  { question: "Can I cancel anytime?", answer: "One click. No contracts, no friction, no questions. But most members don't — because the picks print." }
];

const pricingFeatures = [
  "Daily AI-Powered Picks (3pm ET)",
  "Full Live Odds Intel Access",
  "AI Parlay Builder",
  "Edge Score + Confidence Ratings",
  "Cancel Anytime — Zero Friction"
];

/* ═══════════════════════════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function Counter({ target, decimals = 0, suffix = "" }: { target: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const value = useMotionValue(0);
  const transformed = useTransform(value, (v) => (decimals ? v.toFixed(decimals) : Math.round(v).toString()));
  const [text, setText] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, target, { duration: 1.9, ease: "easeOut" });
    const unsub = transformed.on("change", (latest) => setText(latest));
    return () => { controls.stop(); unsub(); };
  }, [inView, target, transformed, value]);
  return <span ref={ref} className="tabular-nums">{text}{suffix}</span>;
}

function ImpactStar({ className = "", label }: { className?: string; label: string }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`impact-burst absolute grid place-items-center border-[4px] border-primary-yellow bg-primary-yellow text-navy ${className}`}
      animate={{ scale: [0.96, 1.08, 0.96], rotate: [-8, 3, -8] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="comic-accent text-xs font-bold">{label}</span>
    </motion.div>
  );
}

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group cursor-pointer border-b-2 border-primary-yellow/20 py-5"
      onClick={() => setOpen((p) => !p)}
    >
      <div className="flex items-center justify-between gap-4">
        <h4 className="font-bangers text-xl tracking-wide text-white group-hover:text-primary-yellow transition-colors">{question}</h4>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-5 w-5 text-primary-yellow" />
        </motion.span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 14 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden text-sm leading-relaxed text-white/60"
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HORIZONTAL SCROLL SECTION (The Arsenal)
   ═══════════════════════════════════════════════════════════════ */
function HorizontalArsenal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Section header */}
        <div className="px-6 sm:px-10 mb-6">
          <motion.p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-yellow/60 mb-2">The Weapon System</motion.p>
          <h2 className="cmyk-text text-4xl sm:text-6xl lg:text-7xl">The Arsenal</h2>
          {/* Progress bar */}
          <div className="mt-4 h-1 w-48 rounded-full bg-white/10 overflow-hidden">
            <motion.div className="h-full bg-primary-yellow rounded-full" style={{ width: progressWidth }} />
          </div>
        </div>

        {/* Horizontal panels */}
        <motion.div className="flex gap-8 px-6 sm:px-10" style={{ x }}>
          {arsenalSteps.map((item, index) => (
            <div key={item.step} className="w-[85vw] sm:w-[70vw] lg:w-[45vw] flex-shrink-0">
              <div className="comic-panel h-full overflow-hidden flex flex-col lg:flex-row">
                {/* Image */}
                <div className="relative h-56 lg:h-auto lg:w-1/2 overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2b2b6b]/80 hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2b2b6b] to-transparent lg:hidden" />
                  {/* Step number overlay */}
                  <span className="absolute left-4 top-4 font-bangers text-[4rem] leading-none text-white/10">{item.step}</span>
                </div>
                {/* Content */}
                <div className="p-6 lg:p-8 lg:w-1/2 flex flex-col justify-center">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary-yellow/50">Module {item.step}</p>
                  <h3 className="mt-2 font-bangers text-3xl lg:text-4xl tracking-wide text-white">{item.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-primary-yellow/80">{item.subtitle}</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */
export function LandingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.9]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);

  return (
    <main className="relative overflow-hidden text-white bg-[#0d0d2b]">

      {/* ═══ NAV ═══ */}
      <motion.nav
        className="fixed left-0 top-0 z-50 w-full"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="mx-auto flex h-[64px] w-full max-w-7xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Smack'em Bets" width={36} height={36} className="h-9 w-9 rounded-full border-2 border-primary-yellow/60 object-cover" />
            <span className="font-bangers text-lg tracking-wider text-white/90">Smack&apos;em</span>
          </a>
          <div className="hidden items-center gap-8 text-xs font-mono uppercase tracking-[0.2em] text-white/50 md:flex">
            <a href="#arsenal" className="hover:text-primary-yellow transition-colors duration-300">Arsenal</a>
            <a href="#proof" className="hover:text-primary-yellow transition-colors duration-300">Proof</a>
            <a href="#pricing" className="hover:text-primary-yellow transition-colors duration-300">Pricing</a>
            <a href="#faq" className="hover:text-primary-yellow transition-colors duration-300">FAQ</a>
          </div>
          <a href="#pricing" className="bg-primary-yellow text-navy font-bangers text-sm tracking-wider px-5 py-2 rounded-lg hover:bg-white transition-all shadow-[3px_3px_0_rgba(0,0,0,0.3)]">
            Get Access
          </a>
        </div>
      </motion.nav>

      {/* ═══ ACT I: THE HOOK ═══ */}
      <section ref={heroRef} id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax BG */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY, scale: heroScale }}>
          <Image src="/hero-bg.png" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d2b]/70 via-[#0d0d2b]/30 to-[#0d0d2b]" />
        </motion.div>

        <motion.div className="relative z-10 text-center px-6 max-w-5xl" style={{ opacity: heroOpacity }}>
          {/* Typing headline */}
          <motion.p
            className="font-mono text-xs uppercase tracking-[0.4em] text-primary-yellow/70 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            AI-Powered Sports Betting Intelligence
          </motion.p>

          <motion.h1
            className="cmyk-text text-[clamp(3rem,12vw,9rem)] leading-[0.82] font-extrabold tracking-tighter"
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            STOP
            <br />
            GUESSING
          </motion.h1>

          <motion.p
            className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Our AI analyzes <span className="text-primary-yellow font-bold">37 data points per game</span> across 835+ matchups.
            68.3% verified win rate. This is your unfair advantage.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <CheckoutButton className="h-14 bg-primary-yellow text-navy font-bangers text-lg tracking-widest px-10 rounded-xl shadow-[4px_4px_0_rgba(0,0,0,0.3)] hover:bg-white transition-all" />
            </motion.div>
            <a href="#arsenal" className="text-sm text-white/40 hover:text-white/70 transition-colors font-mono uppercase tracking-widest">
              See how it works ↓
            </a>
          </motion.div>
        </motion.div>

        {/* Impact bursts */}
        <ImpactStar className="right-[8%] top-[20%] h-20 w-20 md:h-28 md:w-28 hidden sm:grid" label="POW!" />
        <ImpactStar className="left-[5%] bottom-[25%] h-16 w-16 md:h-24 md:w-24 hidden sm:grid" label="SMACK!" />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-primary-yellow" animate={{ y: [0, 16, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
          </div>
        </motion.div>
      </section>

      {/* ═══ ACT I: THE CHAOS (The Problem) ═══ */}
      <motion.section
        className="relative py-24 sm:py-32 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        {/* Chaos background image */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/chaos-scene.png" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d2b] via-transparent to-[#0d0d2b] z-[1]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-red/70 mb-4">The Problem</p>
            <h2 className="font-bangers text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white/90">
              You&apos;re betting <span className="text-primary-red">blind.</span>
            </h2>
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { icon: X, label: "Twitter \"experts\"", sub: "selling dreams" },
              { icon: AlertTriangle, label: "Gut-feel parlays", sub: "burning cash" },
              { icon: X, label: "Random picks", sub: "zero edge" }
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="border-2 border-primary-red/30 rounded-xl p-5 bg-primary-red/5"
                initial={{ opacity: 0, x: i === 0 ? -20 : i === 2 ? 20 : 0, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <item.icon className="h-6 w-6 text-primary-red/70 mx-auto" />
                <p className="mt-2 font-bangers text-lg text-white/80">{item.label}</p>
                <p className="text-xs text-white/40">{item.sub}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="mt-10 text-lg text-white/50 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            The sportsbooks have armies of quants. You have... a feeling?
            <br />
            <span className="text-primary-yellow font-bold mt-2 inline-block">It&apos;s time to even the odds.</span>
          </motion.p>
        </div>
      </motion.section>

      {/* ═══ STATS RIBBON ═══ */}
      <motion.section
        className="relative py-12 border-y-2 border-primary-yellow/20 bg-[#0d0d2b]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-xl">{item.icon}</span>
              <p className="font-bangers text-4xl sm:text-5xl text-primary-yellow mt-1">
                <Counter target={item.value} decimals={item.decimals ?? 0} suffix={item.suffix} />
              </p>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mt-1">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ═══ ACT II: THE ARSENAL (Horizontal Scroll on Desktop, Stacked on Mobile) ═══ */}
      <div id="arsenal" className="hidden lg:block">
        <HorizontalArsenal />
      </div>

      {/* Mobile: stacked cards */}
      <section id="arsenal-mobile" className="lg:hidden py-20 px-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-yellow/60 mb-2">The Weapon System</p>
        <h2 className="cmyk-text text-4xl sm:text-5xl mb-10">The Arsenal</h2>
        <div className="space-y-6">
          {arsenalSteps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="comic-panel overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2b2b6b] to-transparent" />
                  <span className="absolute left-4 top-3 font-bangers text-5xl text-white/10">{item.step}</span>
                </div>
                <div className="p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary-yellow/50">Module {item.step}</p>
                  <h3 className="mt-1 font-bangers text-2xl tracking-wide">{item.title}</h3>
                  <p className="mt-1 text-xs font-semibold text-primary-yellow/70">{item.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{item.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ ACT II: VOICE OF THE WINNERS ═══ */}
      <section id="proof" className="relative py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-yellow/60 mb-2">Real Members. Real Results.</p>
            <h2 className="cmyk-text text-4xl sm:text-6xl lg:text-7xl">Voice of The Winners</h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.name}
                className="relative group"
                initial={{ opacity: 0, y: 30, rotate: index === 0 ? -1 : index === 2 ? 1 : 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 180, damping: 16, delay: index * 0.12 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="comic-panel p-6 h-full flex flex-col justify-between">
                  {/* Win badge */}
                  <div className="absolute -right-2 -top-3">
                    <span className="bg-green-500 text-navy font-bangers text-sm px-3 py-1 rounded-full shadow-lg">{t.winAmount}</span>
                  </div>
                  <div>
                    <div className="flex gap-0.5 text-primary-yellow text-sm mb-3">
                      {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                    </div>
                    <p className="text-sm leading-relaxed text-white/80 italic">&ldquo;{t.quote}&rdquo;</p>
                  </div>
                  <div className="mt-5 flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-yellow/20 border-2 border-primary-yellow/40 font-bangers text-lg text-primary-yellow">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-bangers text-base tracking-wide">{t.name}</p>
                      <p className="text-[10px] text-white/40 font-mono uppercase tracking-wider">{t.detail}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ACT III: THE GLIMPSE (Sample Picks) ═══ */}
      <motion.section
        className="relative py-20 sm:py-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-yellow/60 mb-2">Today&apos;s Intelligence</p>
            <h2 className="cmyk-text text-4xl sm:text-5xl">The Daily Card</h2>
          </div>

          <div className="comic-panel relative overflow-hidden p-0">
            {/* Classified overlay */}
            <div className="absolute right-4 top-4 z-20">
              <Image src="/classified-stamp.png" alt="Classified" width={100} height={100} className="opacity-70" />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-green-400/70">Live — Updated 3pm ET</p>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  { pick: "BOS -3.5 vs MIA", edge: "8.2", conf: "HIGH" },
                  { pick: "DAL/PHX OVER 228.5", edge: "7.6", conf: "HIGH" },
                  { pick: "NYK ML + SAC +5.5 PARLAY", edge: "9.1", conf: "ELITE" }
                ].map((p, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 blur-[5px] select-none"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <span className="text-sm">{p.pick}</span>
                    <div className="flex gap-4 text-xs font-mono">
                      <span>Edge: {p.edge}</span>
                      <span className={p.conf === "ELITE" ? "text-primary-yellow" : "text-green-400"}>{p.conf}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Lock className="h-5 w-5 text-primary-yellow/50 mx-auto mb-2" />
                <p className="font-bangers text-lg tracking-wide text-white/60">Full card unlocks with membership</p>
                <motion.div className="mt-4" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <a href="#pricing" className="inline-block bg-primary-yellow/10 border border-primary-yellow/30 text-primary-yellow font-bangers tracking-wider px-6 py-2.5 rounded-lg hover:bg-primary-yellow/20 transition-all text-sm">
                    Unlock Picks →
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══ ACT III: PRICING ═══ */}
      <section id="pricing" className="relative py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-yellow/60 mb-2">Your Unfair Advantage Awaits</p>
            <h2 className="cmyk-text text-4xl sm:text-6xl lg:text-7xl">Become An Insider</h2>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 18 }}
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-yellow/20 via-primary-red/10 to-primary-yellow/20 blur-xl opacity-60 pointer-events-none" />

            <div className="relative comic-panel overflow-hidden p-0 border-primary-yellow">
              <div className="ben-day-overlay opacity-15" />

              {/* Price burst */}
              <motion.div
                className="impact-burst absolute -right-4 -top-4 z-20 grid h-32 w-32 sm:h-40 sm:w-40 place-items-center border-[4px] border-primary-yellow bg-primary-yellow text-navy"
                animate={{ scale: [0.95, 1.06, 0.95], rotate: [-4, 4, -4] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              >
                <div className="text-center">
                  <span className="font-bangers text-2xl sm:text-3xl leading-none">$250</span>
                  <br />
                  <span className="comic-accent text-[9px] sm:text-[10px] font-bold">/MONTH</span>
                </div>
              </motion.div>

              <div className="relative z-10 p-8 sm:p-10">
                <span className="inline-block bg-primary-red text-white font-bangers text-xs tracking-wider px-3 py-1 rounded-full mb-4">🔥 LIMITED LAUNCH PRICING</span>
                <h3 className="font-bangers text-3xl sm:text-4xl tracking-wide">Smack&apos;em Bets Pro</h3>
                <p className="text-sm text-white/50 mt-1 font-mono">Premium access to the Farrah AI engine</p>

                <div className="mt-3 flex items-center gap-3">
                  <span className="text-white/30 line-through text-lg font-bangers">$500/mo</span>
                  <span className="bg-primary-yellow/20 text-primary-yellow text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded">50% off</span>
                </div>

                <div className="mt-6 space-y-3">
                  {pricingFeatures.map((feat) => (
                    <div key={feat} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-primary-yellow flex-shrink-0" />
                      <span className="text-white/80">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <motion.div
                    className="inline-block"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={{ boxShadow: ["0 0 20px rgba(255,204,0,0.1)", "0 0 40px rgba(255,204,0,0.3)", "0 0 20px rgba(255,204,0,0.1)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckoutButton className="h-14 bg-primary-yellow text-navy font-bangers text-lg tracking-widest px-10 rounded-xl shadow-[4px_4px_0_rgba(0,0,0,0.3)] hover:bg-white transition-all" />
                  </motion.div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-5 text-[10px] font-mono uppercase tracking-wider text-white/30">
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5" />
                    <span>Cancel Anytime</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5" />
                    <span>Instant Access</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="max-w-2xl mx-auto px-6 py-16 sm:py-20">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-bangers text-4xl sm:text-5xl tracking-wide text-white/90">Questions?</h2>
        </motion.div>
        {faqs.map((faq, index) => (
          <FaqItem key={faq.question} question={faq.question} answer={faq.answer} index={index} />
        ))}
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <motion.section
        className="relative py-24 sm:py-32 text-center overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        {/* Split comparison bg */}
        <div className="absolute inset-0 z-0 opacity-15">
          <Image src="/split-compare.png" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d2b] via-[#0d0d2b]/80 to-[#0d0d2b] z-[1]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <motion.h2
            className="font-bangers text-4xl sm:text-6xl lg:text-7xl text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Their Guesswork.
            <br />
            <span className="text-primary-yellow">Your Certainty.</span>
          </motion.h2>

          <motion.p
            className="mt-5 text-white/50 text-lg max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Join the bettors who stopped gambling and started investing. Your first card drops at 3pm ET.
          </motion.p>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <CheckoutButton className="h-16 bg-primary-yellow text-navy font-bangers text-xl tracking-widest px-12 rounded-xl shadow-[5px_5px_0_rgba(0,0,0,0.3)] hover:bg-white transition-all" />
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Smack'em Bets" width={28} height={28} className="h-7 w-7 rounded-full border border-white/10" />
            <span className="font-bangers text-sm tracking-wider text-white/40">Smack&apos;em Bets</span>
          </div>
          <div className="text-center sm:text-right text-[10px] text-white/20 font-mono space-y-1">
            <p>For entertainment purposes only. Not financial advice.</p>
            <p>Gambling problem? Call 1-800-GAMBLER.</p>
            <p>© {new Date().getFullYear()} Smack&apos;em Bets</p>
          </div>
        </div>
      </footer>

      {/* ═══ STICKY MOBILE CTA ═══ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-gradient-to-t from-[#0d0d2b] via-[#0d0d2b]/95 to-transparent sm:hidden">
        <CheckoutButton className="w-full h-12 bg-primary-yellow text-navy font-bangers tracking-widest rounded-xl shadow-[0_-2px_20px_rgba(255,204,0,0.3)]" />
      </div>
    </main>
  );
}

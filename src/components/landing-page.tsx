"use client";

import Image from "next/image";
import { AnimatePresence, animate, motion, useInView, useMotionValue, useScroll, useTransform } from "framer-motion";
import {
  Brain,
  Check,
  ChevronDown,
  CircleDollarSign,
  Crosshair,
  Gauge,
  Headphones,
  MessageSquare,
  Mic,
  Radar,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Wallet,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CheckoutButton } from "@/components/checkout-button";

type CounterItem = {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
};

const heroCounters: CounterItem[] = [
  { value: 70.5, label: "Win Rate", suffix: "%", decimals: 1 },
  { value: 225, label: "Wins" },
  { value: 94, label: "Losses" },
  { value: 34.7, label: "ROI", prefix: "+", suffix: "%", decimals: 1 },
];

const proofStats: CounterItem[] = [
  { value: 225, label: "Record", suffix: "-94" },
  { value: 70.5, label: "Verified Win Rate", suffix: "%", decimals: 1 },
  { value: 34.7, label: "ROI", prefix: "+", suffix: "%", decimals: 1 },
  { value: 835, label: "Games Analyzed", suffix: "+" },
];

const aiBrainCards = [
  {
    title: "Dual-Engine Prediction Core",
    body: "XGBoost and Elo work together on every slate. Picks only ship when both engines agree.",
    icon: Brain,
    accent: "#32f0a4",
  },
  {
    title: "Self-Learning Loop",
    body: "Every result updates the model. It grades, learns, and calibrates confidence daily.",
    icon: Sparkles,
    accent: "#ffcc00",
  },
  {
    title: "Conversational AI Partner",
    body: "Ask any bet question in plain language and get a direct explanation, not a spreadsheet.",
    icon: MessageSquare,
    accent: "#59f",
  },
  {
    title: "Voice-First Delivery",
    body: "Morning read, 5:15 PM ET lock card, and nightly grades via WhatsApp voice notes + text.",
    icon: Headphones,
    accent: "#ff5a84",
  },
];

const arsenalFeatures = [
  {
    title: "AI Prediction Engine",
    description: "XGBoost + Elo ensemble with a 70.5% tracked win rate.",
    icon: Brain,
  },
  {
    title: "Injury Intelligence",
    description: "Player NRtg impact analysis that auto-adjusts lines and confidence.",
    icon: Shield,
  },
  {
    title: "Arbitrage Scanner",
    description: "Finds risk-free pricing splits across books before they close.",
    icon: CircleDollarSign,
  },
  {
    title: "+EV Scanner",
    description: "Flags positive expected value opportunities across 15+ sportsbooks.",
    icon: TrendingUp,
  },
  {
    title: "Parlay Builder",
    description: "AI-ranked combos scored by EV, correlation, and hit probability.",
    icon: Target,
  },
  {
    title: "Situational Analysis",
    description: "B2B fatigue, altitude, travel, rest, refs, and 12+ hidden factors.",
    icon: Radar,
  },
  {
    title: "Sharp Money Tracker",
    description: "Spots steam and reverse line movement to catch pro market signals.",
    icon: Gauge,
  },
  {
    title: "Kelly Criterion Sizing",
    description: "Full, fractional, and dynamic Kelly for smarter bet sizing.",
    icon: Wallet,
  },
  {
    title: "CLV Tracker",
    description: "Closing line value reporting to prove edge quality mathematically.",
    icon: Trophy,
  },
  {
    title: "Player Props Engine",
    description: "Points, rebounds, assists, and combo props scored through EV framework.",
    icon: Crosshair,
  },
  {
    title: "Risk Manager",
    description: "Exposure caps, correlation warnings, and hard stop protection.",
    icon: Zap,
  },
  {
    title: "Multi-Sport System",
    description: "NBA, NHL, MLB, and cross-sport parlays in one intelligence flow.",
    icon: Mic,
  },
];

const comparisonRows = [
  { feature: "AI that explains picks", other: "No", smackem: "Yes, conversational" },
  { feature: "Prediction engine", other: "No direct predictions", smackem: "70.5% tracked" },
  { feature: "Arb + EV tools", other: "Yes", smackem: "Yes" },
  { feature: "Self-learning model", other: "Static tools", smackem: "Learns daily" },
  { feature: "Delivery style", other: "Dashboard-heavy", smackem: "WhatsApp voice + text" },
  { feature: "Daily workflow", other: "Manual tool hopping", smackem: "Morning > lock > grade" },
];

const flowSteps = [
  {
    title: "Subscribe",
    description: "Activate your AI betting partner and connect to the daily delivery channel.",
    step: "01",
  },
  {
    title: "Receive Daily Card",
    description: "Morning preview, 5:15 PM ET lock card, then updates as the market shifts.",
    step: "02",
  },
  {
    title: "Ask + Execute",
    description: "Ask follow-ups, place smartly sized bets, and track bankroll growth with nightly grades.",
    step: "03",
  },
];

const dailyFlow = [
  {
    time: "Morning",
    title: "Preview + Early Angles",
    description: "Initial market read, injury watchlist, and early value windows.",
  },
  {
    time: "5:15 PM ET",
    title: "Final Picks Locked",
    description: "Confidence-scored card with sizing notes and risk flags.",
  },
  {
    time: "Night",
    title: "Auto Grades + P&L",
    description: "Instant result grading, CLV update, and bankroll performance recap.",
  },
];

const testimonials = [
  {
    quote: "I used to bounce between tools and still force bad bets. Now I get one clean AI card and act.",
    name: "Andre M.",
    detail: "+$5,120 in 6 weeks",
  },
  {
    quote: "The voice-note breakdowns are the difference. It explains why a line is off before I place it.",
    name: "Kayla T.",
    detail: "74% high-confidence run",
  },
  {
    quote: "This feels like having a quant team in my phone. Better than every static dashboard I tried.",
    name: "Devin R.",
    detail: "+31% bankroll growth",
  },
];

const pricingFeatures = [
  "AI Prediction Engine (XGBoost + Elo)",
  "Arbitrage + +EV scanner across 15+ books",
  "Injury, situational, and referee intelligence",
  "Sharp money and line movement detection",
  "Parlay Builder with EV ranking",
  "Kelly sizing + bankroll risk manager",
  "CLV tracking and nightly grading",
  "Player props model",
  "Multi-sport support (NBA, NHL, MLB)",
  "Conversational AI Q&A",
  "WhatsApp voice + text delivery",
  "Cancel anytime",
];

const faqs = [
  {
    question: "What makes Smack'em Bets different from traditional betting tools?",
    answer:
      "Traditional tools dump raw data and expect you to decide everything. Smack'em Bets combines arb and +EV scanning with an AI model that predicts, explains, learns, and delivers final picks directly to your phone.",
  },
  {
    question: "Is the 70.5% win rate real?",
    answer:
      "Yes. The tracked record is 225-94 across 835+ analyzed games. We publish graded outcomes and monitor ROI (+34.7%) with CLV tracking.",
  },
  {
    question: "How do picks arrive each day?",
    answer:
      "You get a morning preview, a 5:15 PM ET lock card, and nightly grades via WhatsApp voice notes and text. No app download needed.",
  },
  {
    question: "Why is it $250/month?",
    answer:
      "You are getting prediction AI, arb and +EV infrastructure, bankroll tooling, and daily guided delivery in one system. It is priced below many high-end tool stacks and cheaper than one bad betting weekend for most users.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. Subscription is month-to-month and can be canceled any time.",
  },
];

function Counter({ target, decimals = 0, suffix = "", prefix = "" }: { target: number; decimals?: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const value = useMotionValue(0);
  const transformed = useTransform(value, (v) => (decimals ? v.toFixed(decimals) : Math.round(v).toString()));
  const [text, setText] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, target, { duration: 1.8, ease: "easeOut" });
    const unsub = transformed.on("change", (latest) => setText(latest));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, target, transformed, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {text}
      {suffix}
    </span>
  );
}

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="cursor-pointer border-b-2 border-primary-yellow/20 py-5"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      onClick={() => setOpen((prev) => !prev)}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-bangers text-xl tracking-wide text-white">{question}</h3>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-5 w-5 text-primary-yellow" />
        </motion.span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            className="overflow-hidden text-sm leading-relaxed text-white/65"
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.24 }}
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function LandingPage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <main className="relative overflow-hidden bg-[#0d0d2b] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] ben-day-animated" />

      <motion.nav className="fixed left-0 top-0 z-50 w-full" initial={{ y: -72 }} animate={{ y: 0 }} transition={{ duration: 0.45 }}>
        <div className="mx-auto flex h-[82px] w-full max-w-7xl items-center justify-between px-6 backdrop-blur-md">
          <a href="#top" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Smack'em Bets" width={52} height={52} className="h-12 w-12 rounded-full border-2 border-primary-yellow/50" />
            <span className="font-bangers text-2xl tracking-wider text-white">Smack&apos;em Bets</span>
          </a>
          <div className="hidden items-center gap-7 text-[11px] font-mono uppercase tracking-[0.2em] text-white/65 md:flex">
            <a href="#brain" className="transition-colors hover:text-primary-yellow">AI Brain</a>
            <a href="#arsenal" className="transition-colors hover:text-primary-yellow">Arsenal</a>
            <a href="#pricing" className="transition-colors hover:text-primary-yellow">Pricing</a>
            <a href="#faq" className="transition-colors hover:text-primary-yellow">FAQ</a>
          </div>
          <a href="#pricing" className="rounded-lg bg-primary-yellow px-5 py-2 font-bangers text-sm tracking-wider text-[#0d0d2b] shadow-[3px_3px_0_rgba(0,0,0,0.35)]">
            Start Winning - $250/mo
          </a>
        </div>
      </motion.nav>

      <section ref={heroRef} id="top" className="relative flex min-h-screen items-center overflow-hidden pt-28">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image src="/hero-ai-brain.png" alt="" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d2b]/75 via-[#0d0d2b]/40 to-[#0d0d2b]" />
        </motion.div>

        <motion.div className="relative z-10 mx-auto w-full max-w-6xl px-6" style={{ opacity: heroOpacity }}>
          <motion.p
            className="inline-block rounded-full border border-primary-yellow/40 bg-[#0d0d2b]/50 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.3em] text-primary-yellow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            The First AI-Powered Sports Betting Intelligence System
          </motion.p>

          <motion.h1
            className="mt-5 cmyk-text text-[clamp(2.5rem,8vw,6.2rem)] leading-[0.95]"
            initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            Meet Your AI Betting Partner.
            <br />
            <span className="text-primary-yellow">It Gets Smarter Every Day.</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-3xl text-base leading-relaxed text-white/80 sm:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.55 }}
          >
            Traditional tools dump odds. Smack&apos;em Bets predicts outcomes, explains the edge, learns from every result, and delivers a daily plan straight to your phone.
          </motion.p>

          <motion.p
            className="mt-3 max-w-3xl text-sm font-semibold text-primary-yellow/90 sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.44, duration: 0.5 }}
          >
            Odds dashboards give you data. We give you an AI betting partner.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.54, duration: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <CheckoutButton className="h-14 bg-primary-yellow px-10 font-bangers text-lg tracking-widest text-[#0d0d2b] shadow-[4px_4px_0_rgba(0,0,0,0.35)]" />
            </motion.div>
            <p className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-mono uppercase tracking-[0.24em] text-white/75">
              Start Winning - $250/month
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {heroCounters.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="comic-panel bg-[#11163e]/90 p-4 text-center"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
              >
                <p className="font-bangers text-3xl text-primary-yellow sm:text-4xl">
                  <Counter target={stat.value} decimals={stat.decimals} suffix={stat.suffix} prefix={stat.prefix} />
                </p>
                <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute right-[7%] top-[22%] hidden h-24 w-24 place-items-center border-[4px] border-primary-yellow bg-primary-yellow text-[#0d0d2b] sm:grid"
          animate={{ rotate: [-6, 6, -6], scale: [0.97, 1.06, 0.97] }}
          transition={{ duration: 2.6, repeat: Infinity }}
        >
          <span className="font-bangers text-xl">POW!</span>
        </motion.div>
      </section>

      <section className="relative border-y-2 border-primary-yellow/20 bg-[#0b1034]/90 py-11">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 lg:grid-cols-4">
          {proofStats.map((item, index) => (
            <motion.div
              key={item.label}
              className="text-center"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ delay: index * 0.07 }}
            >
              <p className="font-bangers text-4xl text-primary-yellow sm:text-5xl">
                <Counter target={item.value} decimals={item.decimals} suffix={item.suffix} prefix={item.prefix} />
              </p>
              <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.24em] text-white/55">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="brain" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-yellow/65">What Makes Us Different</p>
            <h2 className="mt-3 cmyk-text text-4xl sm:text-6xl">The AI Brain Behind Every Bet</h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
              This is not another static dashboard. Smack&apos;em Bets is a self-improving intelligence partner that predicts, explains, and delivers decisions you can actually act on.
            </p>
          </motion.div>

          <motion.div
            className="mb-10 overflow-hidden rounded-2xl border border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Image src="/feat-self-learning.png" alt="AI Self-Learning Engine" width={1200} height={600} className="w-full object-cover" />
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">
            {aiBrainCards.map((card, index) => (
              <motion.div
                key={card.title}
                className="comic-panel p-6"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-lg border border-white/15" style={{ backgroundColor: `${card.accent}22` }}>
                    <card.icon className="h-5 w-5" style={{ color: card.accent }} />
                  </div>
                  <div>
                    <h3 className="font-bangers text-2xl tracking-wide text-white">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{card.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="arsenal" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-yellow/65">The Arsenal</p>
            <h2 className="mt-3 cmyk-text text-4xl sm:text-6xl">Everything You Need To Beat The Number</h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {arsenalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="comic-panel p-5"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ delay: index * 0.04 }}
                whileHover={{ y: -4 }}
              >
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg border border-primary-yellow/30 bg-primary-yellow/10">
                  <feature.icon className="h-5 w-5 text-primary-yellow" />
                </div>
                <h3 className="font-bangers text-2xl leading-none tracking-wide text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-yellow/65">Comparison</p>
            <h2 className="mt-3 cmyk-text text-4xl sm:text-6xl">Traditional Platforms vs Smack&apos;em Bets</h2>
          </motion.div>

          <motion.div
            className="mb-8 overflow-hidden rounded-2xl border border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Image src="/comparison-old-vs-ai.png" alt="Traditional tools vs AI-powered betting" width={1200} height={500} className="w-full object-cover" />
          </motion.div>

          <div className="comic-panel overflow-hidden">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-white/10 bg-[#11153d] px-4 py-4 text-xs font-mono uppercase tracking-[0.2em] text-white/70 sm:px-6">
              <p>Capability</p>
              <p className="text-center">Traditional Tools</p>
              <p className="text-center text-primary-yellow">Smack&apos;em Bets</p>
            </div>
            {comparisonRows.map((row, index) => (
              <motion.div
                key={row.feature}
                className="grid grid-cols-[1.4fr_1fr_1fr] items-center border-b border-white/5 px-4 py-4 text-sm last:border-b-0 sm:px-6"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.05 }}
              >
                <p className="text-white/80">{row.feature}</p>
                <p className="text-center text-white/45">{row.other}</p>
                <p className="text-center font-semibold text-primary-yellow">{row.smackem}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-yellow/65">How It Works</p>
            <h2 className="mt-3 cmyk-text text-4xl sm:text-6xl">Three Steps To A Smarter Betting Workflow</h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {flowSteps.map((item, index) => (
              <motion.div
                key={item.title}
                className="comic-panel p-6"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08 }}
              >
                <p className="font-mono text-xs uppercase tracking-[0.26em] text-primary-yellow/80">Step {item.step}</p>
                <h3 className="mt-3 font-bangers text-3xl tracking-wide">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-yellow/65">The Daily Flow</p>
            <h2 className="mt-3 cmyk-text text-4xl sm:text-6xl">Built For Real Betting Hours</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70">Delivered via WhatsApp voice notes and text. No app download. No dashboard fatigue.</p>
          </motion.div>

          <div className="space-y-4">
            {dailyFlow.map((item, index) => (
              <motion.div
                key={item.time}
                className="comic-panel flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.06 }}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full border border-primary-yellow/40 bg-primary-yellow/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-primary-yellow">
                    {item.time}
                  </div>
                  <h3 className="font-bangers text-2xl tracking-wide">{item.title}</h3>
                </div>
                <p className="max-w-xl text-sm text-white/65">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-yellow/65">Testimonials</p>
            <h2 className="mt-3 cmyk-text text-4xl sm:text-6xl">What Members Say After Switching</h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.article
                key={item.name}
                className="comic-panel relative p-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-3 flex text-primary-yellow">{"★★★★★"}</div>
                <p className="text-sm leading-relaxed text-white/80">"{item.quote}"</p>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="font-bangers text-xl tracking-wide">{item.name}</p>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/45">{item.detail}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            className="mb-11 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-yellow/65">Pricing</p>
            <h2 className="mt-3 cmyk-text text-4xl sm:text-6xl">One Tier. Full Intelligence Stack.</h2>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-yellow/20 via-transparent to-[#32f0a4]/20 blur-lg" />
            <div className="comic-panel relative overflow-hidden border-primary-yellow p-8 sm:p-10">
              <div className="absolute right-4 top-4 grid h-24 w-24 place-items-center border-[4px] border-primary-yellow bg-primary-yellow text-[#0d0d2b]">
                <div className="text-center">
                  <p className="font-bangers text-3xl leading-none">$250</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em]">/month</p>
                </div>
              </div>

              <h3 className="max-w-sm font-bangers text-4xl tracking-wide">Smack&apos;em Bets Intelligence</h3>
              <p className="mt-3 max-w-md text-sm text-white/65">Everything in one workflow. Cheaper than one bad weekend of betting.</p>

              <div className="mt-6 grid gap-2">
                {pricingFeatures.map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-2 text-sm text-white/80"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Check className="h-4 w-4 text-primary-yellow" />
                    {feature}
                  </motion.div>
                ))}
              </div>

              <motion.div className="mt-8" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <CheckoutButton className="h-14 w-full bg-primary-yellow font-bangers text-lg tracking-widest text-[#0d0d2b]" />
              </motion.div>

              <div className="mt-5 flex items-center justify-center gap-4 text-[11px] font-mono uppercase tracking-[0.16em] text-white/45">
                <div className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  Secure Checkout
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Instant Access
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-yellow/65">FAQ</p>
          <h2 className="mt-3 cmyk-text text-4xl sm:text-5xl">Answers Before You Subscribe</h2>
        </motion.div>

        {faqs.map((item, index) => (
          <FaqItem key={item.question} question={item.question} answer={item.answer} index={index} />
        ))}
      </section>

      <footer className="border-t border-white/10 px-6 pb-24 pt-10 sm:pb-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 sm:flex-row">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Smack'em Bets" width={28} height={28} className="h-7 w-7 rounded-full border border-white/20" />
            <span className="font-bangers text-lg tracking-wider text-white/70">Smack&apos;em Bets</span>
          </div>

          <div className="text-center text-[10px] font-mono text-white/30 sm:text-right">
            <p>For entertainment purposes only. Not financial advice.</p>
            <p>Gambling problem? Call 1-800-GAMBLER.</p>
            <p>{new Date().getFullYear()} Smack&apos;em Bets. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-[#0d0d2b] via-[#0d0d2b]/95 to-transparent p-3 sm:hidden">
        <CheckoutButton className="h-12 w-full bg-primary-yellow font-bangers tracking-widest text-[#0d0d2b]" />
      </div>
    </main>
  );
}

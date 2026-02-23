"use client";

import Image from "next/image";
import { AnimatePresence, animate, motion, useInView, useMotionValue, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Check, Shield, Lock, X, AlertTriangle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CheckoutButton } from "@/components/checkout-button";

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const stats = [
  { value: 835, suffix: "+", label: "Games Analyzed" },
  { value: 68.3, suffix: "%", label: "Win Rate", decimals: 1 },
  { value: 37, suffix: "", label: "Data Points / Game" },
  { value: 7.0, suffix: "+", label: "Edge Threshold", decimals: 1 }
];

const arsenalSteps = [
  {
    step: "01",
    title: "The Quant Killer Engine",
    subtitle: "Finds the cracks in the sportsbook's armor.",
    text: "Our AI analyzes 37 data points per game. It runs two competing models against each other to find discrepancies the books miss. If there isn't a clear, high-probability edge, the pick gets thrown in the trash. You only get A+ setups.",
    image: "/feat-deeplearn.png"
  },
  {
    step: "02",
    title: "The Line Sniper",
    subtitle: "Beat the books to the punch.",
    text: "We track real-time line movements across the market. When a book is slow to adjust a soft number, Farrah flags it instantly. You get the best price before the market corrects and the value is gone.",
    image: "/feat-odds.png"
  },
  {
    step: "03",
    title: "The Smart Parlay Stacker",
    subtitle: "Engineer payouts, don't just pray for them.",
    text: "Stop throwing random legs together. Farrah identifies correlated, high-edge picks and builds parlays where the statistics stack in your favor. It's the difference between gambling and engineering a win.",
    image: "/feat-parlay.png"
  }
];

const testimonials = [
  {
    quote: "Was pissing away money on gut bets. No system. Smack'em paid for itself in 3 days. This AI is scary good.",
    name: "Mark R.",
    detail: "+$2,340 first week",
    avatar: "M",
    winAmount: "+$2,340"
  },
  {
    quote: "I'm done with Twitter gurus. This is pure data. The parlay builder alone is worth the price. Finally a real edge.",
    name: "Jason T.",
    detail: "3-month streak",
    avatar: "J",
    winAmount: "+$4,180"
  },
  {
    quote: "I'm a skeptic. I tracked every pick for 60 days. The 68% win rate is legit. Farrah is the truth.",
    name: "Sarah K.",
    detail: "Verified 60-day tracker",
    avatar: "S",
    winAmount: "+$1,870"
  }
];

const faqs = [
  { question: "Who is Farrah?", answer: "Farrah isn't a person. It's our proprietary dual-model AI engine — the weapon we built to find weaknesses in sportsbook algorithms. It has no biases, no emotions, and only cares about one thing: finding a verifiable statistical edge." },
  { question: "Is the 68.3% win rate real?", answer: "Yes. And we encourage you to track it. This isn't a cherry-picked number — it's our documented, long-term win rate across all games that met our strict 7.0+ edge threshold. We're in the business of data, not hype." },
  { question: "$250/month seems steep.", answer: "Compared to what? Losing $500 on a bad Sunday? Paying another guru for coin-flip picks? Smack'em isn't a cost — it's an investment. The goal is for the AI to pay for itself in the first week." },
  { question: "What exactly do I get?", answer: "Instant access to the full arsenal. Every day at 3pm ET, you get the AI's complete card of high-edge picks. You get Live Odds Intel to snipe soft lines. And you get the AI Parlay Builder to stack the odds in your favor." },
  { question: "Can I cancel anytime?", answer: "One click. No friction. If you're not dominating, cancel from your dashboard instantly. We're confident you won't want to." }
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
   ARSENAL CARD
   ═══════════════════════════════════════════════════════════════ */
function ArsenalCard({ item, index }: { item: typeof arsenalSteps[0]; index: number }) {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0 overflow-hidden comic-panel`}
      initial={{ opacity: 0, y: 40, x: isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: "spring", stiffness: 150, damping: 18, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Image */}
      <div className="relative h-56 sm:h-64 lg:h-auto lg:w-1/2 overflow-hidden group">
        <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className={`absolute inset-0 ${isEven ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-transparent to-[#1a1a4e]/70 hidden lg:block`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a4e] to-transparent lg:hidden" />
        <span className="absolute left-5 top-4 font-bangers text-[5rem] leading-none text-white/8 select-none">{item.step}</span>
      </div>
      {/* Content */}
      <div className="p-6 sm:p-8 lg:w-1/2 flex flex-col justify-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary-yellow/50">Module {item.step}</p>
        <h3 className="mt-2 font-bangers text-3xl lg:text-4xl tracking-wide text-white">{item.title}</h3>
        <p className="mt-1 text-sm font-semibold text-primary-yellow/80">{item.subtitle}</p>
        <p className="mt-4 text-sm leading-relaxed text-white/70">{item.text}</p>
      </div>
    </motion.div>
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
            <Image src="/logo.png" alt="Smack'em Bets" width={72} height={72} className="h-[72px] w-[72px] rounded-full border-2 border-primary-yellow/60 object-cover" />
            <span className="font-bangers text-3xl tracking-wider text-white/90">Smack&apos;em</span>
          </a>
          <div className="hidden items-center gap-8 text-xs font-mono uppercase tracking-[0.2em] text-white/60 md:flex">
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
            className="font-mono text-xs uppercase tracking-[0.3em] text-primary-yellow inline-block border border-primary-yellow/30 rounded-full px-4 py-1.5 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            AI-Powered Betting Weaponry
          </motion.p>

          <motion.h1
            className="cmyk-text text-[clamp(2.5rem,8vw,5.5rem)] leading-[1] font-extrabold tracking-tight"
            data-text="THE BOOKS USE AN AI. DO YOU?"
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            THE BOOKS USE AN AI.
            <br />
            <span className="text-primary-yellow">DO YOU?</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            They weaponized data to build their lines.
            We built a weapon to <span className="text-primary-yellow font-bold">break them.</span>
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
              See The AI&apos;s Arsenal ↓
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
        className="relative py-20 sm:py-28 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        {/* Chaos background image */}
        <div className="absolute inset-0 z-0 opacity-30">
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
              Your &ldquo;system&rdquo; is <span className="text-primary-red">designed to fail.</span>
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
              { icon: X, label: "Bleeding cash on \"expert\" picks", sub: "Twitter gurus selling dreams" },
              { icon: AlertTriangle, label: "Chasing losses with gut-feel parlays", sub: "Hope is not a strategy" },
              { icon: X, label: "Coin-flip bets with zero edge", sub: "The house always wins — unless..." }
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="border-2 border-primary-red/30 rounded-xl p-5 bg-primary-red/5 cursor-default"
                initial={{ opacity: 0, x: i === 0 ? -20 : i === 2 ? 20 : 0, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -4, borderColor: 'rgba(255, 50, 50, 0.6)' }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.5 + i * 0.1 }}
                >
                  <item.icon className="h-6 w-6 text-primary-red/70 mx-auto" />
                </motion.div>
                <p className="mt-2 font-bangers text-lg text-white/80">{item.label}</p>
                <p className="text-xs text-white/40">{item.sub}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="mt-10 text-lg text-white/50 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            The books aren&apos;t just lucky. They&apos;re deploying armies of quants against you. You&apos;re using hope.
            <br />
            <span className="text-primary-yellow font-bold mt-2 inline-block">It&apos;s time to fight fire with fire.</span>
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
              className="text-center group cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="mx-auto mb-3 h-1 w-8 rounded-full bg-primary-yellow/40 group-hover:bg-primary-yellow transition-colors duration-300" />
              <p className="font-bangers text-5xl sm:text-6xl text-primary-yellow">
                <Counter target={item.value} decimals={item.decimals ?? 0} suffix={item.suffix} />
              </p>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mt-1 transition-colors duration-300 group-hover:text-white/70">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ═══ ACT II: THE ARSENAL ═══ */}
      <section id="arsenal" className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03] ben-day-animated" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-yellow/60 mb-2">The Weapon System</p>
            <h2 className="cmyk-text text-4xl sm:text-6xl lg:text-7xl">Your New Arsenal</h2>
            <p className="mt-3 text-white/40 max-w-lg text-sm leading-relaxed">Three proprietary weapons working in concert. Each one gives you an edge the books can&apos;t see. Together, they make you dangerous.</p>
          </motion.div>

          <div className="space-y-8">
            {arsenalSteps.map((item, index) => (
              <ArsenalCard key={item.step} item={item} index={index} />
            ))}
          </div>
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
            <h2 className="cmyk-text text-4xl sm:text-6xl lg:text-7xl">The Receipts.</h2>
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
                whileHover={{ y: -8, rotate: index === 0 ? -1 : index === 2 ? 1 : 0, transition: { duration: 0.25 } }}
              >
                <div className="comic-panel p-6 h-full flex flex-col justify-between hover:shadow-[8px_8px_0_rgba(255,204,0,0.2)] transition-shadow duration-300">
                  {/* Win badge */}
                  <div className="absolute right-4 -top-2 z-10">
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
        className="relative py-20 sm:py-28"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-yellow/60 mb-2">Today&apos;s Intelligence</p>
            <h2 className="cmyk-text text-4xl sm:text-5xl">What The AI Flagged Today</h2>
          </div>

          <div className="comic-panel relative overflow-hidden p-0">
            {/* Classified overlay */}
            <div className="absolute right-4 top-4 z-20">
              <Image src="/classified-stamp.png" alt="Classified" width={80} height={80} className="opacity-60 sm:w-[100px] sm:h-[100px]" />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-green-400/70">Live — Updated 3pm ET</p>
              </div>

              <div className="mt-5 space-y-3 group">
                {[
                  { pick: "BOS -3.5 vs MIA", edge: "8.2", conf: "HIGH" },
                  { pick: "DAL/PHX OVER 228.5", edge: "7.6", conf: "HIGH" },
                  { pick: "NYK ML + SAC +5.5 PARLAY", edge: "9.1", conf: "ELITE" }
                ].map((p, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 blur-[5px] select-none transition-all duration-500 group-hover:blur-[2px] group-hover:bg-white/[0.06]"
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
                <p className="font-bangers text-lg tracking-wide text-white/60">Full card &amp; edge scores unlock instantly</p>
                <motion.div className="mt-4" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <a href="#pricing" className="inline-block bg-primary-yellow/20 border-2 border-primary-yellow/50 text-primary-yellow font-bangers tracking-wider px-7 py-3 rounded-lg hover:bg-primary-yellow/30 transition-all text-base">
                    Unlock Today&apos;s Card →
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
            <h2 className="cmyk-text text-4xl sm:text-6xl lg:text-7xl">Your ROI Starts Today.</h2>
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
                className="impact-burst absolute right-3 -top-3 z-20 grid h-24 w-24 sm:h-36 sm:w-36 place-items-center border-[4px] border-primary-yellow bg-primary-yellow text-navy"
                animate={{ scale: [0.95, 1.06, 0.95], rotate: [-4, 4, -4] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              >
                <div className="text-center">
                  <span className="font-bangers text-xl sm:text-3xl leading-none">$250</span>
                  <br />
                  <span className="comic-accent text-[9px] sm:text-[10px] font-bold">/MONTH</span>
                </div>
              </motion.div>

              <div className="relative z-10 p-8 sm:p-10">
                <span className="inline-block bg-primary-red text-white font-bangers text-xs tracking-wider px-3 py-1 rounded-full mb-4">🔥 LIMITED LAUNCH PRICING</span>
                <h3 className="font-bangers text-3xl sm:text-4xl tracking-wide">Smack&apos;em Bets Pro</h3>
                <p className="text-sm text-white/50 mt-1 font-mono">This isn&apos;t a cost. It&apos;s an investment in a statistical weapon.</p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-white/30 line-through text-lg font-bangers">$500/mo</span>
                  <span className="bg-primary-yellow/20 text-primary-yellow text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded">50% off</span>
                </div>

                <motion.div
                  className="mt-6 space-y-3"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ staggerChildren: 0.08 }}
                >
                  {pricingFeatures.map((feat) => (
                    <motion.div
                      key={feat}
                      className="flex items-center gap-3 text-sm"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <Check className="h-4 w-4 text-primary-yellow flex-shrink-0" />
                      <span className="text-white/80">{feat}</span>
                    </motion.div>
                  ))}
                </motion.div>

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
      <section id="faq" className="max-w-2xl mx-auto px-6 py-20 sm:py-28">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cmyk-text text-4xl sm:text-5xl">Got Questions?</h2>
          <p className="mt-2 text-white/40 text-sm font-mono">We&apos;ve got answers.</p>
        </motion.div>
        {faqs.map((faq, index) => (
          <FaqItem key={faq.question} question={faq.question} answer={faq.answer} index={index} />
        ))}
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <motion.section
        className="relative py-20 sm:py-28 text-center overflow-hidden"
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
            Stop Betting.
            <br />
            <span className="text-primary-yellow">Start Printing.</span>
          </motion.h2>

          <motion.p
            className="mt-5 text-white/50 text-base sm:text-lg max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Keep relying on luck and Twitter &ldquo;experts,&rdquo; or arm yourself with a real statistical weapon. Your first AI-vetted card is waiting.
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
      <footer className="border-t border-white/5 py-10 px-6 pb-24 sm:pb-10">
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

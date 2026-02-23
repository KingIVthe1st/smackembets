"use client";

import Image from "next/image";
import { AnimatePresence, animate, motion, useInView, useMotionValue, useScroll, useTransform } from "framer-motion";
import { Brain, Sparkles, TrendingUp, Zap, Shuffle, ChevronDown, Check, Shield, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckoutButton } from "@/components/checkout-button";
import { FlowingWaves } from "@/components/flowing-waves";
import { HeroNodeNetwork } from "@/components/hero-node-network";
import { HexGridOverlay } from "@/components/hex-grid-overlay";

/* ─── DATA ─── */
const stats = [
  { value: 835, suffix: "+", label: "Games Analyzed", icon: "📊" },
  { value: 68.3, suffix: "%", label: "Win Rate", decimals: 1, icon: "🏆" },
  { value: 37, suffix: "", label: "Data Points / Game", icon: "🧠" },
  { value: 7.0, suffix: "+", label: "Edge Threshold", decimals: 1, icon: "⚡" }
];

const howItWorks = [
  {
    step: "01",
    title: "Plug Into Farrah",
    text: "Subscribe and unlock Farrah — the same proprietary AI engine trusted by serious bettors who refuse to gamble blind.",
    image: "/panel-farrah.png",
    burst: "THWIP"
  },
  {
    step: "02",
    title: "Get Your Daily Card",
    text: "Every day at 3pm ET, your card drops: spreads, totals, moneylines, and parlays — all ranked by AI edge score.",
    image: "/panel-picks.png",
    burst: "BAM"
  },
  {
    step: "03",
    title: "Attack The Board",
    text: "Strike where value exists. Skip the noise. Stack wins with discipline. That's how you smack the sportsbooks.",
    image: "/panel-attack.png",
    burst: "WIN"
  }
];

const features = [
  {
    title: "Deep Learning Models",
    text: "Dual-model validation cross-references gradient-boosted predictions against Elo power ratings. Bad spots get filtered before they ever hit your inbox.",
    image: "/feat-deeplearn.png"
  },
  {
    title: "Live Odds Intel",
    text: "Real-time line movement tracking surfaces soft numbers before the books fully correct. When the market shifts, you know first.",
    image: "/feat-odds.png"
  },
  {
    title: "AI Parlay Builder",
    text: "Build correlated, high-confidence stacks from AI-scored legs. No random combos — every parlay is engineered for edge.",
    image: "/feat-parlay.png"
  }
];

const testimonials = [
  {
    quote: "I was flushing money on gut-feel bets. Smack'em paid for itself in the first week. The AI edge is terrifyingly real.",
    name: "Mark R.",
    detail: "Member since Feb '26",
    avatar: "M"
  },
  {
    quote: "Finally, picks backed by actual data — not some dude's hunches on Twitter. The parlay builder alone is worth $250.",
    name: "Jason T.",
    detail: "3-month streak",
    avatar: "J"
  },
  {
    quote: "68% hit rate isn't hype. I tracked every pick for two months. Farrah is the real deal.",
    name: "Sarah K.",
    detail: "Verified member",
    avatar: "S"
  }
];

const faqs = [
  {
    question: "Who is Farrah?",
    answer: "Farrah is the proprietary AI engine behind Smack'em Bets. It blends gradient-boosted modeling, Elo power ratings, and live market inputs into a single confidence score — analyzing 37 data points per game before making a single pick."
  },
  {
    question: "Is the 68.3% win rate real?",
    answer: "Yes. Tracked and verified across 835+ logged games with consistent methodology. No cherry-picking, no retroactive adjustments. Every pick is timestamped before tip-off."
  },
  {
    question: "$250/month seems expensive.",
    answer: "If you're betting $50-100/game (which most serious bettors are), one extra win per week pays for the entire month. Our members average 12-15 extra wins monthly. Do the math."
  },
  {
    question: "What do I get daily?",
    answer: "A focused card of high-confidence spreads, totals, moneylines, and AI-approved parlays — each with full rationale, edge score, and confidence rating. Delivered at 3pm ET."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Absolutely. No contracts, no friction, no questions asked. Cancel in one click. But most members don't — because the picks print."
  }
];

const pricingFeatures = [
  "Daily AI-Powered Picks (3pm ET)",
  "Full Live Odds Intel Access",
  "The AI Parlay Builder",
  "Edge Score + Confidence Ratings",
  "Cancel Anytime — No Contracts"
];

/* ─── COMPONENTS ─── */
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
      className={`impact-burst absolute grid place-items-center border-[5px] border-primary-yellow bg-primary-yellow text-navy ${className}`}
      animate={{ scale: [0.96, 1.08, 0.96], rotate: [-8, 3, -8] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="comic-accent text-xs sm:text-sm">{label}</span>
    </motion.div>
  );
}

function Section({ id, children, className = "", delay = 0 }: { id?: string; children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.section>
  );
}

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      className="speech-bubble cursor-pointer"
      onClick={() => setOpen((prev) => !prev)}
    >
      <div className="flex items-center justify-between gap-4">
        <h4 className="font-bangers text-xl tracking-wide text-white">{question}</h4>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-5 w-5 text-primary-yellow" />
        </motion.span>
      </div>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.p
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 14 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden text-sm leading-relaxed text-white/70"
          >
            {answer}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── MAIN PAGE ─── */
export function LandingPage() {
  const letters = "SMACK THE SPORTSBOOKS".split("");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <main className="relative overflow-hidden pb-0 text-white">
      {/* ═══ NAV ═══ */}
      <nav className="fixed left-0 top-0 z-50 w-full border-b-4 border-primary-yellow bg-[#12123a]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Smack'em Bets" width={44} height={44} className="h-11 w-11 rounded-full border-3 border-primary-yellow bg-navy-light object-cover" />
            <div>
              <p className="font-bangers text-xl leading-none tracking-wider">Smack&apos;em Bets</p>
              <p className="comic-accent text-[10px] text-primary-yellow/70">Farrah AI Picks</p>
            </div>
          </a>
          <div className="hidden items-center gap-6 text-sm font-semibold md:flex">
            <a href="#how" className="chromatic-hover hover:text-primary-yellow transition-colors">How It Works</a>
            <a href="#features" className="chromatic-hover hover:text-primary-yellow transition-colors">Features</a>
            <a href="#pricing" className="chromatic-hover hover:text-primary-yellow transition-colors">Pricing</a>
            <a href="#faq" className="chromatic-hover hover:text-primary-yellow transition-colors">FAQ</a>
          </div>
          <Button asChild className="border-2 border-primary-yellow bg-primary-red px-5 py-2 text-white font-bangers tracking-wider shadow-[3px_3px_0_rgba(0,0,0,0.4)] hover:bg-primary-yellow hover:text-navy transition-all">
            <a href="#pricing">Get The Alpha</a>
          </Button>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} id="top" className="hero-halftone relative min-h-[95vh] pt-24 sm:pt-28">
        {/* Parallax AI background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <Image src="/hero-bg.png" alt="" fill className="object-cover opacity-50" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a4e]/40 via-transparent to-[#1a1a4e]" />
        </motion.div>
        <FlowingWaves />
        <HeroNodeNetwork />
        <HexGridOverlay />
        <div className="ben-day-overlay" />

        <ImpactStar className="right-[5%] top-28 h-24 w-24 md:h-32 md:w-32" label="POW!" />
        <ImpactStar className="bottom-24 left-[6%] h-20 w-20 md:h-28 md:w-28" label="SMACK!" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6">
          {/* Caption box — like a comic book caption */}
          <motion.div
            className="mx-auto inline-block rounded-lg border-3 border-primary-yellow bg-primary-red/90 px-5 py-2 shadow-[4px_4px_0_rgba(0,0,0,0.4)]"
            initial={{ scale: 0.7, rotate: -5, opacity: 0 }}
            animate={{ scale: 1, rotate: -1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 13 }}
          >
            <p className="font-bangers text-sm tracking-wider text-white sm:text-base">
              🏆 68.3% Win Rate &nbsp;|&nbsp; 835+ Games &nbsp;|&nbsp; 37 Data Points/Game
            </p>
          </motion.div>

          <motion.h1
            className="glitch-in cmyk-text mt-6 text-[clamp(2.8rem,11vw,8rem)] leading-[0.84]"
            style={{ WebkitTextStroke: "2px rgba(0,0,0,0.3)" }}
            animate={{ x: [0, -2, 1, 0] }}
            transition={{ duration: 0.35, delay: 0.5 }}
          >
            {letters.map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                className="inline-block"
                initial={{ y: 52, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.018, type: "spring", stiffness: 320, damping: 18 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.65 }}
          >
            Stop guessing. Start winning. Our proprietary AI scans 37+ data points per game to deliver you the <span className="font-bold text-primary-yellow">sharpest edge in sports betting.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8 flex flex-col items-center gap-3"
          >
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <CheckoutButton className="h-14 border-3 border-primary-yellow bg-primary-red px-10 text-lg font-bold text-white font-bangers tracking-widest shadow-[6px_6px_0_rgba(0,0,0,0.4)] hover:bg-primary-yellow hover:text-navy transition-all" />
            </motion.div>
            <p className="text-xs text-white/50">Cancel anytime • No contracts</p>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <Section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              className="comic-panel p-5 text-center"
              initial={{ opacity: 0, y: 24, rotate: index % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08, type: "spring", stiffness: 210, damping: 16 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
            >
              <span className="text-2xl">{item.icon}</span>
              <p className="font-bangers text-5xl leading-none text-primary-yellow mt-1">
                <Counter target={item.value} decimals={item.decimals ?? 0} suffix={item.suffix} />
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-white/70">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="comic-divider" />

      {/* ═══ HOW IT WORKS ═══ */}
      <Section id="how" className="mx-auto max-w-7xl px-4 py-20 sm:px-6" delay={0.05}>
        <h2 className="cmyk-text text-center text-5xl sm:text-6xl">How It Works</h2>
        <p className="text-center mt-3 text-white/60 comic-accent">Three steps. Zero guesswork.</p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {howItWorks.map((item, index) => (
            <motion.div
              key={item.title}
              className="relative"
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 200, damping: 18, delay: index * 0.12 }}
            >
              {/* Large step number */}
              <span className="absolute -left-2 -top-8 font-bangers text-[5rem] leading-none text-primary-yellow/15 z-0 select-none">{item.step}</span>
              <Card className="comic-panel chromatic-hover relative z-10 h-full overflow-hidden p-0">
                <motion.div className="relative h-48 w-full overflow-hidden" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2b2b6b] via-transparent to-transparent" />
                </motion.div>
                <div className="p-5">
                  <p className="font-bangers text-xs text-primary-yellow/60 tracking-widest">STEP {item.step}</p>
                  <h3 className="mt-1 font-bangers text-3xl tracking-wide">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{item.text}</p>
                </div>
                <ImpactStar className="-right-4 -top-4 h-14 w-14" label={item.burst} />
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="comic-divider" />

      {/* ═══ FEATURES ═══ */}
      <Section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6" delay={0.07}>
        <h2 className="cmyk-text text-center text-5xl sm:text-6xl">The Arsenal</h2>
        <p className="text-center mt-3 text-white/60 comic-accent">Quant rigor meets comic-book firepower.</p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, rotate: index === 1 ? 0 : index === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 220, damping: 16, delay: index * 0.1 }}
            >
              <Card className="comic-panel chromatic-hover group h-full overflow-hidden p-0">
                <motion.div className="relative h-44 w-full overflow-hidden" whileHover={{ scale: 1.06 }} transition={{ duration: 0.35 }}>
                  <Image src={feature.image} alt={feature.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2b2b6b] via-[#2b2b6b]/30 to-transparent" />
                </motion.div>
                <div className="p-5">
                  <h3 className="font-bangers text-2xl tracking-wide text-primary-yellow">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{feature.text}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══ TESTIMONIALS ═══ */}
      <Section className="mx-auto max-w-7xl px-4 py-16 sm:px-6" delay={0.08}>
        <h2 className="cmyk-text text-center text-4xl sm:text-5xl">Voice of The Winners</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 200, damping: 17, delay: index * 0.1 }}
            >
              <div className="speech-bubble h-full">
                <p className="text-sm leading-relaxed italic text-white/90">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-3 border-primary-yellow bg-primary-red font-bangers text-lg text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bangers text-base tracking-wide text-primary-yellow">{t.name}</p>
                    <p className="text-xs text-white/50">{t.detail}</p>
                  </div>
                </div>
                <div className="mt-2 flex gap-0.5 text-primary-yellow">
                  {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="comic-divider" />

      {/* ═══ SAMPLE PICKS ═══ */}
      <Section className="mx-auto max-w-5xl px-4 py-16 sm:px-6" delay={0.1}>
        <Card className="comic-panel relative overflow-hidden p-0">
          {/* Classified stamp overlay */}
          <div className="absolute right-6 top-6 z-20 opacity-80">
            <Image src="/classified-stamp.png" alt="Classified" width={120} height={120} className="drop-shadow-lg" />
          </div>
          <div className="p-8">
            <h3 className="font-bangers text-4xl text-primary-yellow">Today&apos;s Picks</h3>
            <p className="mt-1 text-sm text-white/50 comic-accent">Live card — updated 3pm ET daily</p>

            <div className="mt-6 space-y-3">
              {["BOS -3.5 vs MIA  |  Edge: 8.2  |  Confidence: HIGH", "DAL/PHX OVER 228.5  |  Edge: 7.6  |  Confidence: HIGH", "NYK ML + SAC +5.5 PARLAY  |  Edge: 9.1  |  Confidence: ELITE"].map((pick, i) => (
                <div key={i} className="rounded-lg border-2 border-primary-yellow/30 bg-navy-light/80 px-4 py-3 text-sm blur-[4px] select-none">
                  {pick}
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Lock className="h-5 w-5 text-primary-yellow" />
              <p className="font-bangers text-lg tracking-wide">Unlock full card with membership</p>
            </div>
          </div>
        </Card>
      </Section>

      {/* ═══ PRICING ═══ */}
      <Section id="pricing" className="mx-auto max-w-4xl px-4 py-20 sm:px-6" delay={0.12}>
        <h2 className="cmyk-text text-center text-5xl sm:text-6xl mb-10">Unlock The Arsenal</h2>

        <div className="comic-panel relative overflow-hidden p-0">
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-[14px] border-4 border-primary-yellow shadow-[0_0_30px_rgba(255,204,0,0.3)] pointer-events-none z-30" />
          <div className="ben-day-overlay opacity-25" />

          {/* Price burst */}
          <motion.div
            className="impact-burst absolute -right-6 -top-6 z-20 grid h-36 w-36 place-items-center border-[5px] border-primary-yellow bg-primary-yellow text-navy sm:h-44 sm:w-44"
            animate={{ scale: [0.95, 1.06, 0.95], rotate: [-5, 5, -5] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          >
            <div className="text-center">
              <span className="font-bangers text-3xl leading-none sm:text-4xl">$250</span>
              <br />
              <span className="comic-accent text-[10px] sm:text-xs font-bold">/MONTH</span>
            </div>
          </motion.div>

          <div className="relative z-10 p-8 sm:p-10">
            <p className="badge-red inline-block text-sm mb-3">🔥 MOST POPULAR</p>
            <h3 className="font-bangers text-4xl leading-none tracking-wide sm:text-5xl text-white">Smack&apos;em Bets Pro</h3>
            <p className="comic-accent mt-2 text-base text-white/60">Premium access to the Farrah AI picks engine</p>

            {/* Strikethrough anchor */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-white/40 line-through text-xl font-bangers">$500/mo</span>
              <span className="badge-yellow text-xs">50% OFF LAUNCH</span>
            </div>

            {/* Feature list */}
            <div className="mt-6 grid gap-3">
              {pricingFeatures.map((feat) => (
                <div key={feat} className="flex items-center gap-3 text-sm sm:text-base">
                  <Check className="h-5 w-5 text-primary-yellow flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <motion.div
                animate={{ boxShadow: ["0 0 20px rgba(255,204,0,0.2)", "0 0 40px rgba(255,204,0,0.5)", "0 0 20px rgba(255,204,0,0.2)"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block rounded-xl"
              >
                <CheckoutButton className="h-16 border-3 border-primary-yellow bg-primary-red px-10 text-xl font-bold text-white font-bangers tracking-widest shadow-[6px_6px_0_rgba(0,0,0,0.4)] hover:bg-primary-yellow hover:text-navy transition-all" />
              </motion.div>
            </div>

            {/* Trust signals */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-white/50">
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-primary-yellow" />
                <span>Secure Stripe Payment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-primary-yellow" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Image src="/guarantee-badge.png" alt="Guarantee" width={20} height={20} />
                <span>Ironclad Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ FAQ ═══ */}
      <Section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6" delay={0.14}>
        <h2 className="cmyk-text text-center text-5xl sm:text-6xl">FAQ</h2>
        <p className="text-center mt-3 text-white/50 comic-accent">Got questions? We got answers.</p>
        <div className="mt-10 space-y-5">
          {faqs.map((faq, index) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </div>
      </Section>

      {/* ═══ FINAL CTA ═══ */}
      <Section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 text-center" delay={0.15}>
        <div className="comic-panel p-10">
          <h2 className="font-bangers text-4xl sm:text-5xl text-primary-yellow">Ready to Smack The Sportsbooks?</h2>
          <p className="mt-3 text-white/70 max-w-lg mx-auto">Join the bettors who stopped guessing and started winning with Farrah AI. Your first card drops at 3pm ET.</p>
          <motion.div
            className="mt-6 inline-block"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <CheckoutButton className="h-14 border-3 border-primary-yellow bg-primary-red px-10 text-lg font-bold text-white font-bangers tracking-widest shadow-[6px_6px_0_rgba(0,0,0,0.4)] hover:bg-primary-yellow hover:text-navy transition-all" />
          </motion.div>
        </div>
      </Section>

      {/* ═══ FOOTER ═══ */}
      <footer className="mx-auto max-w-7xl border-t-4 border-primary-yellow/20 px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Smack'em Bets" width={36} height={36} className="h-9 w-9 rounded-full border-2 border-primary-yellow/50" />
            <p className="font-bangers text-lg tracking-wider text-white/70">Smack&apos;em Bets</p>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-xs text-white/40">For entertainment purposes only. Not financial advice.</p>
            <p className="text-xs text-white/40 mt-1">If you or someone you know has a gambling problem, call 1-800-GAMBLER.</p>
            <p className="comic-accent text-xs text-white/30 mt-2">© {new Date().getFullYear()} Smack&apos;em Bets. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

"use client";

import Image from "next/image";
import { AnimatePresence, animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { Brain, Sparkles, TrendingUp, Zap, Shuffle, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckoutButton } from "@/components/checkout-button";
import { FlowingWaves } from "@/components/flowing-waves";
import { HeroNodeNetwork } from "@/components/hero-node-network";
import { HexGridOverlay } from "@/components/hex-grid-overlay";

const stats = [
  { value: 835, suffix: "+", label: "Games Analyzed" },
  { value: 68.3, suffix: "%", label: "Win Rate", decimals: 1 },
  { value: 37, suffix: "", label: "Data Points / Game" },
  { value: 7.0, suffix: "+", label: "Edge Threshold", decimals: 1 }
];

const howItWorks = [
  {
    title: "Plug Into Farrah",
    text: "Subscribe and unlock Farrah, the same AI picks engine trusted by serious bettors.",
    angle: "rotate-[-2deg]"
  },
  {
    title: "Get Daily Card",
    text: "At 3pm ET, you get spreads, totals, moneylines, and parlays ranked by edge score.",
    angle: "rotate-[1.6deg]"
  },
  {
    title: "Attack The Board",
    text: "Place picks where value exists. Skip noise. Repeat with discipline.",
    angle: "rotate-[-1.4deg]"
  }
];

const features = [
  {
    icon: Brain,
    title: "Deep Learning",
    text: "Dual-model validation filters bad spots before they ever hit your inbox."
  },
  {
    icon: TrendingUp,
    title: "Live Odds Intel",
    text: "Line movement checks surface soft numbers before books fully correct."
  },
  {
    icon: Shuffle,
    title: "Parlay Builder",
    text: "Build correlated, high-confidence stacks from AI-scored legs."
  }
];

const faqs = [
  {
    question: "Who is Farrah?",
    answer:
      "Farrah is the same core sports picks AI behind Smack'em Bets. It blends gradient-boosted modeling, Elo context, and live market inputs into one confidence score."
  },
  {
    question: "Is the 68.3% win rate real?",
    answer:
      "Yes. The rate is tracked across 835+ logged games with consistent methodology."
  },
  {
    question: "What do I get daily?",
    answer:
      "A focused card of high-confidence spreads, totals, moneylines, and AI-approved parlays with rationale and edge score."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. No contracts and no friction."
  }
];

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
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, target, transformed, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {text}
      {suffix}
    </span>
  );
}

function ImpactStar({ className = "", label }: { className?: string; label: string }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`impact-burst absolute grid place-items-center border-[5px] border-comic-black bg-primary-yellow text-comic-black ${className}`}
      animate={{ scale: [0.96, 1.08, 0.96], rotate: [-8, 3, -8] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="comic-accent text-xs sm:text-sm">{label}</span>
    </motion.div>
  );
}

function Section({
  id,
  children,
  className = "",
  delay = 0
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
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
        <h4 className="font-bangers text-xl tracking-wide text-comic-black">{question}</h4>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </div>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.p
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 14 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden text-sm leading-relaxed text-text-muted"
          >
            {answer}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export function LandingPage() {
  const letters = "SMACK THE SPORTSBOOKS".split("");

  return (
    <main className="relative overflow-hidden pb-10 text-comic-black">
      <nav className="fixed left-0 top-0 z-50 w-full border-b-[5px] border-comic-black bg-primary-yellow/95 backdrop-blur-sm">
        <div className="mx-auto flex h-[82px] w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Smack'em Bets" width={50} height={50} className="h-12 w-12 rounded-full border-4 border-comic-black bg-white object-cover" />
            <div>
              <p className="font-bangers text-2xl leading-none tracking-wider">Smack&apos;em Bets</p>
              <p className="comic-accent text-xs">Farrah AI Picks</p>
            </div>
          </a>
          <div className="hidden items-center gap-6 font-semibold md:flex">
            <a href="#how" className="chromatic-hover">How It Works</a>
            <a href="#features" className="chromatic-hover">Features</a>
            <a href="#pricing" className="chromatic-hover">Pricing</a>
            <a href="#faq" className="chromatic-hover">FAQ</a>
          </div>
          <Button asChild className="border-4 border-comic-black bg-primary-red px-5 text-white shadow-[4px_4px_0_#0A0A0A] hover:bg-primary-blue">
            <a href="#pricing">Join Now</a>
          </Button>
        </div>
      </nav>

      <section id="top" className="hero-halftone relative min-h-[92vh] pt-28 sm:pt-32">
        <FlowingWaves />
        <HeroNodeNetwork />
        <HexGridOverlay />
        <div className="ben-day-overlay" />

        <ImpactStar className="right-[5%] top-28 h-28 w-28 md:h-36 md:w-36" label="POW!" />
        <ImpactStar className="bottom-20 left-[6%] h-24 w-24 md:h-32 md:w-32" label="SMACK!" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 text-center sm:px-6">
          <motion.p
            className="comic-accent mx-auto inline-block rounded-full border-4 border-comic-black bg-primary-yellow px-5 py-1.5 text-sm"
            initial={{ scale: 0.7, rotate: -7, opacity: 0 }}
            animate={{ scale: 1, rotate: -2, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 13 }}
          >
            68.3% Win Rate | 835+ Games | 37 Data Points/Game
          </motion.p>

          <motion.h1
            className="glitch-in cmyk-text mt-8 text-[clamp(2.6rem,10vw,7.5rem)] leading-[0.86]"
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
            className="mx-auto mt-6 max-w-2xl rounded-3xl border-[5px] border-comic-black bg-white/95 px-5 py-4 text-base leading-relaxed shadow-[8px_8px_0_#0A0A0A] sm:text-lg"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.65 }}
          >
            Stop guessing. Farrah scans the board and drops only high-confidence value picks. Same AI system, same discipline, built for bettors who want an edge.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8"
          >
            <CheckoutButton className="mx-auto h-14 border-4 border-comic-black bg-primary-yellow px-9 text-lg font-bold text-comic-black shadow-[6px_6px_0_#0A0A0A] hover:bg-white" />
          </motion.div>
        </div>
      </section>

      <div className="comic-divider" />

      <Section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              className="comic-panel p-5 text-center"
              initial={{ opacity: 0, y: 24, rotate: -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08, type: "spring", stiffness: 210, damping: 16 }}
            >
              <p className="font-bangers text-5xl leading-none text-primary-red">
                <Counter target={item.value} decimals={item.decimals ?? 0} suffix={item.suffix} />
              </p>
              <p className="mt-2 text-sm font-bold uppercase tracking-wider">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="comic-divider" />

      <Section id="how" className="mx-auto max-w-7xl px-4 py-20 sm:px-6" delay={0.05}>
        <h2 className="cmyk-text text-center text-5xl sm:text-6xl">How It Works</h2>
        <div className="mt-10 grid gap-7 md:grid-cols-3">
          {howItWorks.map((item, index) => (
            <motion.div
              key={item.title}
              className={`${item.angle}`}
              initial={{ scale: 0.86, opacity: 0, y: 24 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 230, damping: 17, delay: index * 0.09 }}
            >
              <Card className="comic-panel chromatic-hover h-full p-6">
                <p className="comic-accent text-sm text-primary-blue">Panel 0{index + 1}</p>
                <h3 className="mt-2 font-bangers text-3xl tracking-wide">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{item.text}</p>
                <ImpactStar className="-right-5 -top-5 h-14 w-14" label={index === 0 ? "THWIP" : index === 1 ? "BAM" : "WIN"} />
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6" delay={0.07}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="cmyk-text text-5xl sm:text-6xl">Feature Stack</h2>
            <p className="comic-accent mt-3 text-base">Quant rigor with comic-book energy.</p>
          </div>
          <div className="speech-bubble max-w-md">
            <p className="comic-accent text-sm text-primary-blue">Coach says:</p>
            <p className="mt-1 text-sm font-semibold">"Farrah doesn&apos;t chase hot takes. It hunts line value."</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24, rotate: index % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 230, damping: 16, delay: index * 0.1 }}
            >
              <Card className="comic-panel chromatic-hover h-full p-6">
                <div className="inline-flex items-center gap-2 rounded-full border-4 border-comic-black bg-primary-yellow px-4 py-1">
                  <feature.icon className="h-4 w-4" />
                  <span className="comic-accent text-xs">Farrah Module</span>
                </div>
                <h3 className="mt-4 font-bangers text-3xl leading-none">{feature.title}</h3>
                <p className="mt-3 text-sm text-text-muted">{feature.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="mx-auto max-w-5xl px-4 py-12 sm:px-6" delay={0.1}>
        <Card className="comic-panel relative p-7">
          <div className="absolute right-4 top-4 rounded-full border-4 border-comic-black bg-primary-red px-3 py-1 text-xs font-bold text-white">
            PREVIEW
          </div>
          <h3 className="font-bangers text-4xl">Today&apos;s Sample Picks</h3>
          <p className="mt-4 rounded-xl border-4 border-comic-black bg-white px-4 py-3 text-lg blur-[3px]">BOS -3.5 | DAL/PHX OVER 228.5 | NYK ML + SAC +5.5 PARLAY</p>
          <div className="mt-3 flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4" />
            Full card unlocks with membership
          </div>
        </Card>
      </Section>

      <Section id="pricing" className="mx-auto max-w-5xl px-4 py-20 sm:px-6" delay={0.12}>
        <div className="comic-panel relative overflow-hidden bg-primary-blue/95 p-8 text-white sm:p-10">
          <div className="ben-day-overlay opacity-35" />
          <motion.div
            className="impact-burst absolute -right-10 -top-12 grid h-44 w-44 place-items-center border-[5px] border-comic-black bg-primary-yellow text-comic-black"
            animate={{ scale: [0.95, 1.05, 0.95], rotate: [-6, 6, -6] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          >
            <span className="font-bangers text-3xl leading-none">$250</span>
            <span className="comic-accent text-xs">PER MONTH</span>
          </motion.div>

          <h2 className="font-bangers text-5xl leading-none tracking-wide sm:text-6xl">Smack&apos;em Bets</h2>
          <p className="comic-accent mt-2 text-lg">Premium access to Farrah AI picks</p>

          <div className="mt-7 grid gap-3 text-sm sm:text-base">
            <div className="flex items-start gap-2"><Zap className="mt-0.5 h-4 w-4" />68.3% win rate verified across 835+ games</div>
            <div className="flex items-start gap-2"><Zap className="mt-0.5 h-4 w-4" />Daily high-confidence picks + parlay ideas</div>
            <div className="flex items-start gap-2"><Zap className="mt-0.5 h-4 w-4" />Built for disciplined bettors, not hype bettors</div>
          </div>

          <div className="mt-8">
            <CheckoutButton className="h-14 border-4 border-comic-black bg-primary-yellow px-8 text-lg font-bold text-comic-black shadow-[6px_6px_0_#0A0A0A] hover:bg-white" />
          </div>
        </div>
      </Section>

      <Section id="faq" className="mx-auto max-w-5xl px-4 py-12 sm:px-6" delay={0.14}>
        <h2 className="cmyk-text text-center text-5xl sm:text-6xl">FAQ</h2>
        <div className="mt-8 space-y-6">
          {faqs.map((faq, index) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </div>
      </Section>

      <footer className="mx-auto mt-10 max-w-7xl border-t-[5px] border-comic-black px-4 py-8 text-center sm:px-6">
        <p className="font-semibold">For entertainment purposes only. Not financial advice.</p>
        <p className="comic-accent mt-2">Copyright {new Date().getFullYear()} Smack&apos;em Bets</p>
      </footer>
    </main>
  );
}

"use client";

export function FlowingWaves() {
  return (
    <div className="absolute inset-x-0 bottom-0 h-64 overflow-hidden opacity-60">
      <svg
        viewBox="0 0 1400 300"
        className="absolute bottom-0 left-0 w-full animate-wave-drift"
        style={{ filter: "blur(3px)" }}
      >
        {/* Bright cyan wave */}
        <defs>
          <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0" />
            <stop offset="30%" stopColor="#00F0FF" stopOpacity="1" />
            <stop offset="70%" stopColor="#00F0FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="greenGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
            <stop offset="30%" stopColor="#10B981" stopOpacity="1" />
            <stop offset="70%" stopColor="#10B981" stopOpacity="1" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Main cyan flow */}
        <path
          d="M0,150 Q350,50 700,150 T1400,150"
          fill="none"
          stroke="url(#cyanGlow)"
          strokeWidth="60"
          opacity="0.8"
        />
        <path
          d="M0,170 Q350,70 700,170 T1400,170"
          fill="none"
          stroke="url(#cyanGlow)"
          strokeWidth="40"
          opacity="0.6"
        />

        {/* Green flow */}
        <path
          d="M0,180 Q300,100 600,180 T1200,180"
          fill="none"
          stroke="url(#greenGlow)"
          strokeWidth="50"
          opacity="0.7"
        />
      </svg>

      {/* Additional glow effect */}
      <div className="absolute bottom-0 left-1/2 h-48 w-[800px] -translate-x-1/2 bg-gradient-to-t from-accent-cyan/20 via-accent-cyan/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-40 w-[600px] -translate-x-1/2 bg-gradient-to-t from-accent-green/15 via-accent-green/5 to-transparent blur-3xl" />
    </div>
  );
}

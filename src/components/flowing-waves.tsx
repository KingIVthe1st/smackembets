"use client";

export function FlowingWaves() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="energy-lines absolute inset-x-[-12%] top-6 h-40 rotate-[-5deg] opacity-75">
        <svg viewBox="0 0 1600 260" className="h-full w-full" preserveAspectRatio="none">
          <path d="M0 70 C220 10, 420 145, 680 76 C930 14, 1200 142, 1600 60" stroke="#00FFFF" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M0 124 C220 55, 470 175, 760 104 C990 52, 1230 178, 1600 98" stroke="#FF00FF" strokeWidth="9" fill="none" strokeLinecap="round" />
          <path d="M0 176 C180 112, 500 228, 750 156 C1000 96, 1330 223, 1600 148" stroke="#FFD700" strokeWidth="8" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

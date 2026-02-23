"use client";

export function HexGridOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="benday-dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="2" fill="#0A0A0A" fillOpacity="0.22" />
            <circle cx="10" cy="10" r="1.8" fill="#0055FF" fillOpacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#benday-dots)" />
      </svg>
    </div>
  );
}

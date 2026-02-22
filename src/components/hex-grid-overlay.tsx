"use client";

export function HexGridOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagons" width="80" height="69.28" patternUnits="userSpaceOnUse">
            <polygon
              points="40,0 73.2,20 73.2,60 40,80 6.8,60 6.8,20"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  );
}

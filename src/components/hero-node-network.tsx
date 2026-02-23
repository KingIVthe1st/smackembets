"use client";

import { useEffect, useRef } from "react";

export function HeroNodeNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dots = Array.from({ length: 260 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.7,
      drift: (Math.random() - 0.5) * 0.002
    }));

    let frame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 420;
    };

    const draw = () => {
      frame += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot, idx) => {
        const x = (dot.x + Math.sin(frame * 0.002 + idx) * dot.drift) * canvas.width;
        const y = (dot.y + Math.cos(frame * 0.0016 + idx) * dot.drift) * canvas.height;

        ctx.beginPath();
        ctx.fillStyle = idx % 7 === 0 ? "rgba(255, 215, 0, 0.42)" : "rgba(10, 10, 10, 0.34)";
        ctx.arc(x, y, dot.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-x-0 top-0 h-[420px] w-full opacity-70" />;
}

"use client";

import { useEffect, useRef, useState } from "react";

const RUN_SECONDS = [26, 32, 22, 30, 24, 36];

/* ring = index into rx/ry, angle = degrees (0 = right, clockwise) */
const layouts = [
  {
    key: "desktop",
    w: 1500,
    h: 820,
    cx: 750,
    cy: 410,
    rx: [110, 225, 340, 455, 570, 685],
    ry: [62, 127, 192, 257, 322, 387],
    items: [
      { label: "CSS", ring: 1, angle: 300 },
      { label: "HTML", ring: 1, angle: 160 },
      { label: "JavaScript", ring: 2, angle: 35 },
      { label: "Liquid", ring: 2, angle: 235 },
      { label: "React", ring: 3, angle: 100 },
      { label: "Shopify", ring: 3, angle: 320 },
      { label: "GSAP", ring: 3, angle: 205 },
      { label: "Next.js", ring: 4, angle: 245 },
      { label: "Angular", ring: 4, angle: 20 },
      { label: "n8n", ring: 4, angle: 150 },
      { label: "Figma", ring: 5, angle: 270 },
      { label: "GitHub", ring: 5, angle: 180 },
      { label: "Tailwind CSS", ring: 5, angle: 335 },
      { label: "AI Workflows", ring: 5, angle: 105 },
    ],
  },
  {
    key: "mobile",
    w: 400,
    h: 520,
    cx: 200,
    cy: 260,
    rx: [50, 95, 140, 185],
    ry: [58, 110, 165, 222],
    items: [
      { label: "HTML", ring: 0, angle: 150 },
      { label: "CSS", ring: 0, angle: 330 },
      { label: "JavaScript", ring: 1, angle: 35 },
      { label: "React", ring: 1, angle: 235 },
      { label: "Next.js", ring: 2, angle: 290 },
      { label: "Shopify", ring: 2, angle: 150 },
      { label: "Angular", ring: 2, angle: 345 },
      { label: "GitHub", ring: 2, angle: 205 },
      { label: "Figma", ring: 3, angle: 262 },
      { label: "GSAP", ring: 3, angle: 235 },
      { label: "n8n", ring: 3, angle: 315 },
      { label: "Tailwind CSS", ring: 3, angle: 70 },
      { label: "Liquid", ring: 3, angle: 115 },
      { label: "AI Workflows", ring: 3, angle: 140 },
    ],
  },
];

function point(l, ring, angle) {
  const a = (angle * Math.PI) / 180;
  return {
    x: l.cx + l.rx[ring] * Math.cos(a),
    y: l.cy + l.ry[ring] * Math.sin(a),
  };
}

export default function Skills() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`skills ${visible ? "visible" : ""}`}
    >
      <div className="head">
        <h2>Skills</h2>
        <p>Tools I use to design, build and automate.</p>
      </div>

      {layouts.map((l) => (
        <div
          key={l.key}
          className={`stage ${l.key}`}
          style={{ aspectRatio: `${l.w} / ${l.h}` }}
        >
          {/* Rings */}
          <svg
            className="rings"
            viewBox={`0 0 ${l.w} ${l.h}`}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`run-${l.key}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ff6f61" />
                <stop offset="100%" stopColor="#6ea8ff" />
              </linearGradient>
            </defs>

            {l.rx.map((rx, i) => (
              <g key={i} className="ring" style={{ "--d": `${i * 0.1}s` }}>
                <ellipse
                  className="base"
                  cx={l.cx}
                  cy={l.cy}
                  rx={rx}
                  ry={l.ry[i]}
                />
                <ellipse
                  className="run"
                  cx={l.cx}
                  cy={l.cy}
                  rx={rx}
                  ry={l.ry[i]}
                  pathLength="100"
                  stroke={`url(#run-${l.key})`}
                  style={{
                    animationDuration: `${RUN_SECONDS[i % RUN_SECONDS.length]}s`,
                    animationDirection: i % 2 ? "reverse" : "normal",
                  }}
                />
              </g>
            ))}
          </svg>

          {/* Center */}
          <div className="web">Web</div>

          {/* Skills burst out of the center */}
          {l.items.map((s, i) => {
            const p = point(l, s.ring, s.angle);
            return (
              <span
                key={s.label}
                className="pill"
                style={{
                  "--d": `${0.3 + i * 0.07}s`,
                  left: visible ? `${(p.x / l.w) * 100}%` : "50%",
                  top: visible ? `${(p.y / l.h) * 100}%` : "50%",
                }}
              >
                {s.label}
              </span>
            );
          })}
        </div>
      ))}

      <style jsx>{`
        .skills {
          --bg: #0b0d12;
          --ink: #f2f4fa;
          --muted: #a2acbd;
          --accent: #ff6f61;
          --blue: #6ea8ff;

          padding: 100px 24px;
          overflow: hidden;
          color: var(--ink);
          background: radial-gradient(
              800px 500px at 100% 0%,
              rgba(110, 168, 255, 0.12),
              transparent 60%
            ),
            radial-gradient(
              800px 500px at 0% 100%,
              rgba(255, 111, 97, 0.1),
              transparent 60%
            ),
            var(--bg);
        }

        .head {
          text-align: center;
          margin-bottom: 56px;
        }
        h2 {
          margin: 0 0 12px;
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(90deg, #ffb199, #ff6f61);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .head p {
          margin: 0;
          font-size: 1rem;
          font-style: italic;
          color: var(--muted);
        }

        /* Stage */
        .stage {
          position: relative;
          width: 100%;
          margin: 0 auto;
          font-size: clamp(10px, 1.1vw, 17px);
        }
        .desktop {
          max-width: 1500px;
        }
        .mobile {
          display: none;
          max-width: 440px;
          font-size: clamp(11px, 3.3vw, 14px);
        }

        .rings {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        /* Rings: expand from center, then keep running */
        .ring {
          transform-box: fill-box;
          transform-origin: center;
          transform: scale(0.15);
          opacity: 0;
          transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1) var(--d),
            opacity 0.7s ease var(--d);
        }
        .visible .ring {
          transform: scale(1);
          opacity: 1;
        }
        .base {
          fill: none;
          stroke: rgba(255, 255, 255, 0.14);
          stroke-width: 2;
        }
        .run {
          fill: none;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-dasharray: 12 38;
          animation: run linear infinite;
        }
        @keyframes run {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -100;
          }
        }

        /* Center "Web" */
        .web {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 3;
          width: 6.2em;
          height: 6.2em;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 1.1em;
          font-weight: 800;
          color: #0b0d12;
          background: linear-gradient(140deg, #ffb199, #ff6f61);
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .visible .web {
          transform: translate(-50%, -50%) scale(1);
          animation: pulse 2.6s ease-out 1s infinite;
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 111, 97, 0.45);
          }
          100% {
            box-shadow: 0 0 0 28px rgba(255, 111, 97, 0);
          }
        }

        /* Skill pills */
        .pill {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 2;
          padding: 0.85em 1.7em;
          border-radius: 999px;
          font-size: 1em;
          font-weight: 600;
          white-space: nowrap;
          color: var(--ink);
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          cursor: default;
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.3);
          transition: left 1.1s cubic-bezier(0.22, 1, 0.36, 1) var(--d),
            top 1.1s cubic-bezier(0.22, 1, 0.36, 1) var(--d),
            opacity 0.5s ease var(--d),
            transform 1s cubic-bezier(0.34, 1.56, 0.64, 1) var(--d),
            box-shadow 0.3s ease 0s, border-color 0.3s ease 0s;
        }
        .visible .pill {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        .pill:hover {
          border-color: rgba(110, 168, 255, 0.55);
          box-shadow: inset 0 0 20px rgba(110, 168, 255, 0.35);
        }

        /* Mobile: text-only labels, small "Web" pill */
        .mobile .pill {
          padding: 0;
          font-weight: 700;
          background: none;
          border: none;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          text-shadow: 0 0 6px var(--bg), 0 0 12px var(--bg);
        }
        .mobile .pill:hover {
          box-shadow: none;
          color: #ffb199;
        }
        .mobile .web {
          width: 4.6em;
          height: 2.6em;
          border-radius: 999px;
          font-size: 1em;
        }

        @media (max-width: 899px) {
          .skills {
            padding: 80px 16px;
          }
          .head {
            margin-bottom: 36px;
          }
          .desktop {
            display: none;
          }
          .mobile {
            display: block;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ring,
          .pill,
          .web {
            transition: none;
          }
          .run,
          .web {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
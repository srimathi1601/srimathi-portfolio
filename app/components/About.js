"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "10+", label: "Projects" },
  { value: "10+", label: "Tools" },
];

const education = {
  years: "2019 - 2022",
  degree: "B.Sc (Mathematics)",
  college: "Madurai Sivakasi Nadar’s Pioneer Meenakshi Women’s College",
};

export default function About() {
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
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`about ${visible ? "visible" : ""}`}
    >
      <div className="wrap">
        {/* Left: image */}
        <div className="image-box">
          <img src="/about-us.png" alt="Srimathi working on code" />
        </div>

        {/* Right: content */}
        <div className="content">
          <p className="eyebrow">About Me</p>

          <h2 className="text-[26px] sm:text-[26px] md:text-[40px] lg:text-[50px] font-bold leading-tight">
            Crafting interfaces that <span>work beautifully.</span>
          </h2>

          <div className="line" />

          <p className="text text-[14px] sm:text-[14px] md:text-[16px] lg:text-[16px]">
            I turn evolving product ideas and Figma designs into polished user
            experiences, then use practical AI workflows to make development
            faster and more consistent.
          </p>

          <p className="text text-[14px] sm:text-[14px] md:text-[16px] lg:text-[16px]">
            My work spans responsive product interfaces, Shopify theme
            engineering, API integrations and AI-assisted workflows. I care
            about translating changing requirements into maintainable code
            without losing visual detail or usability.
          </p>

          <div className="stats">
            {stats.map((s) => (
              <div key={s.label} className="card" tabIndex={0}>
                <h3>{s.value}</h3>
                <p>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="card edu" tabIndex={0}>
            <div className="edu-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 10 12 5 2 10l10 5 10-5z" />
                <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
              </svg>
            </div>
            <div className="edu-body">
              <p className="edu-years">{education.years}</p>
              <h3>{education.degree}</h3>
              <p className="edu-college">{education.college}</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about {
          --bg: #0b0d12;
          --ink: #f2f4fa;
          --muted: #a2acbd;
          --accent: #ff6f61;
          --accent-blue: #6ea8ff;

          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 100px 24px;
          overflow: hidden;
          background: radial-gradient(
              800px 500px at 0% 100%,
              rgba(255, 111, 97, 0.12),
              transparent 60%
            ),
            radial-gradient(
              900px 500px at 100% 0%,
              rgba(110, 168, 255, 0.12),
              transparent 60%
            ),
            var(--bg);
          color: var(--ink);
        }

        .wrap {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        /* Scroll animation */
        .image-box,
        .content {
          opacity: 0;
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .image-box {
          transform: translateX(-90px);
        }
        .content {
          transform: translateX(90px);
        }
        .visible .image-box,
        .visible .content {
          opacity: 1;
          transform: translateX(0);
        }

        /* Image */
        .image-box {
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.9);
        }
        .image-box img {
          display: block;
          width: 100%;
          height: 520px;
          object-fit: cover;
        }

        /* Content */
        .eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.26em;
          color: var(--accent-blue);
          margin-bottom: 14px;
        }

        h2 {
          // font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        h2 span {
          background: linear-gradient(90deg, #ffb199, #ff6f61);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .line {
          width: 90px;
          height: 4px;
          border-radius: 4px;
          margin: 18px 0 26px;
          background: linear-gradient(90deg, var(--accent), var(--accent-blue));
        }

        .text {
          color: var(--muted);
          // font-size: 14.5px;
          line-height: 1.75;
          margin-bottom: 18px;
        }

        /* Cards */
        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 30px;
        }

        .card {
          padding: 22px 12px;
          text-align: center;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          outline: none;
          cursor: pointer;
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .card h3 {
          font-size: 25px;
          font-weight: 800;
          color: var(--accent-blue);
        }
        .card p {
          margin-top: 4px;
          font-size: 0.85rem;
          color: var(--muted);
        }

        /* Hover = inset shadow */
        .card:hover {
          border-color: rgba(110, 168, 255, 0.5);
          box-shadow: inset 0 0 28px rgba(110, 168, 255, 0.28);
        }

        /* Focus = outer shadow */
        .card:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent),
            0 12px 32px -6px rgba(255, 111, 97, 0.45);
        }

        /* Education card */
        .edu {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-top: 16px;
          padding: 20px 22px;
          text-align: left;
        }
        .edu-icon {
          flex: 0 0 auto;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          color: #0b0d12;
          background: linear-gradient(140deg, #ffb199, #ff6f61);
        }
        .edu-body {
          min-width: 0;
        }
        .edu .edu-years {
          margin: 0 0 4px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--accent-blue);
        }
        .edu h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 800;
          color: var(--ink);
        }
        .edu .edu-college {
          margin: 4px 0 0;
          font-size: 13px;
          line-height: 1.5;
          color: var(--muted);
        }

        /* Responsive */
        @media (max-width: 900px) {
          .about {
            padding: 80px 20px;
          }
          .wrap {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .image-box img {
            height: 360px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .image-box,
          .content {
            transition: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
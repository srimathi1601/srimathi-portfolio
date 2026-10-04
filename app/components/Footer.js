"use client";

import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "mailto:ssrimathi1601@gmail.com" },
];

const EMAIL = "ssrimathi1601@gmail.com";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/srimathi-s-a26644331/?isSelfProfile=true",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.063 2.063 0 1 1 0-4.128 2.063 2.063 0 0 1 0 4.128zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/srimathi1601",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .321.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: `mailto:${EMAIL}`,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="20"
        height="20"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
];
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
export default function Footer() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={ref} className={`footer ${visible ? "visible" : ""}`}>
      <div className="inner">
        <div className="top">
          {/* Brand */}
          <div className="brand">
            <a href="#hero" className="logo">
              SRIMATHI
            </a>
            <p>
              Frontend developer crafting clean, responsive interfaces for the
              web, from Shopify themes to Next.js apps and AI-assisted
              workflows.
            </p>
          </div>

          {/* Quick links */}
          <nav className="col" aria-label="Footer navigation">
            <h4>Quick Links</h4>
            <ul className="links">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="col">
            <h4>Get in touch</h4>
            <a className="email" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <div className="socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.label === "Email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="social"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bottom">
          <p>© {new Date().getFullYear()} Srimathi S. Built with intention.</p>

          <a href="#hero" className="top-btn" aria-label="Back to top">
            <span>Back to top</span>
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 19V5" />
              <path d="m5 12 7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        .footer {
          --bg: #0b0d12;
          --ink: #f2f4fa;
          --muted: #a2acbd;
          --accent: #ff6f61;
          --blue: #6ea8ff;

          position: relative;
          padding: 72px 24px 28px;
          overflow: hidden;
          color: var(--ink);
          background: radial-gradient(
              700px 400px at 0% 100%,
              rgba(255, 111, 97, 0.1),
              transparent 60%
            ),
            radial-gradient(
              700px 400px at 100% 0%,
              rgba(110, 168, 255, 0.1),
              transparent 60%
            ),
            var(--bg);
        }

        /* gradient line on top */
        .footer::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent), var(--blue));
          opacity: 0.7;
        }

        .inner {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* reveal */
        .top,
        .bottom {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bottom {
          transition-delay: 0.15s;
        }
        .visible .top,
        .visible .bottom {
          opacity: 1;
          transform: translateY(0);
        }

        .top {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1.2fr;
          gap: 48px;
          padding-bottom: 48px;
        }

        /* Brand */
        .logo {
          display: inline-block;
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: 3px;
          color: #fff;
          text-decoration: none;
        }
        .brand p {
          max-width: 360px;
          margin: 16px 0 0;
          font-size: 0.95rem;
          line-height: 1.75;
          color: var(--muted);
        }

        /* Columns */
        .col h4 {
          margin: 0 0 18px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: var(--blue);
        }

        .links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(2, auto);
          justify-content: start;
          gap: 12px 36px;
        }
        .links a {
          display: inline-block;
          font-size: 0.95rem;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.3s, transform 0.3s;
        }
        .links a:hover,
        .links a:focus-visible {
          color: var(--accent);
          transform: translateX(4px);
          outline: none;
        }

        .email {
          display: inline-block;
          max-width: 100%;
          overflow-wrap: anywhere;
          font-size: 0.95rem;
          color: var(--ink);
          text-decoration: none;
          border-bottom: 1px solid rgba(255, 111, 97, 0.5);
          padding-bottom: 3px;
          transition: color 0.3s, border-color 0.3s;
        }
        .email:hover {
          color: var(--accent);
          border-color: var(--accent);
        }

        .socials {
          display: flex;
          gap: 10px;
          margin-top: 22px;
        }
        .social {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          color: #d6dde6;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.14);
          transition: color 0.3s, transform 0.3s, box-shadow 0.3s,
            border-color 0.3s;
        }
        .social:hover,
        .social:focus-visible {
          color: #fff;
          transform: translateY(-3px);
          border-color: rgba(110, 168, 255, 0.5);
          box-shadow: inset 0 0 18px rgba(110, 168, 255, 0.35);
          outline: none;
        }

        /* Bottom bar */
        .bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .bottom p {
          margin: 0;
          font-size: 0.88rem;
          color: var(--muted);
        }

        .top-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--ink);
          text-decoration: none;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.14);
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s,
            color 0.3s;
        }
        .top-btn:hover,
        .top-btn:focus-visible {
          color: var(--accent);
          transform: translateY(-3px);
          border-color: rgba(255, 111, 97, 0.5);
          box-shadow: inset 0 0 18px rgba(255, 111, 97, 0.3);
          outline: none;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .footer {
            padding: 60px 20px 24px;
          }
          .top {
            grid-template-columns: 1fr 1fr;
            gap: 40px 32px;
          }
          .brand {
            grid-column: 1 / -1;
          }
          .brand p {
            max-width: 520px;
          }
        }

        /* Mobile */
        @media (max-width: 560px) {
          .footer {
            padding: 52px 16px 24px;
          }
          .top {
            grid-template-columns: 1fr;
            gap: 36px;
            text-align: center;
          }
          .brand p {
            margin-inline: auto;
          }
          .links {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px 22px;
          }
          .socials {
            justify-content: center;
          }
          .bottom {
            flex-direction: column;
            text-align: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .top,
          .bottom {
            transition: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </footer>
  );
}
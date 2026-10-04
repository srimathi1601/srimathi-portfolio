"use client";

import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Project", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "mailto:ssrimathi1601@gmail.com" },
];

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
    href: "mailto:you@example.com",
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

export default function Navbar() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [open, setOpen] = useState(false);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const itemRefs = useRef([]);

  const target = hovered ?? active;

  useEffect(() => {
    const move = () => {
      const el = itemRefs.current[target];
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
    };
    move();
    document.fonts?.ready.then(move);
    window.addEventListener("resize", move);
    return () => window.removeEventListener("resize", move);
  }, [target]);

  return (
    <>
      <nav className="nav">
        <a href="#home" className="logo">
          SRIMATHI
        </a>

        <div className="menu" onMouseLeave={() => setHovered(null)}>
          <span
            className="pill"
            style={{ left: pill.left, width: pill.width }}
          />
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              ref={(el) => (itemRefs.current[i] = el)}
              className={`item ${active === i ? "active" : ""}`}
              onMouseEnter={() => setHovered(i)}
              onClick={() => setActive(i)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="socials">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="social"
            >
              {s.icon}
            </a>
          ))}
        </div>

        <button
          className={`burger ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile ${open ? "open" : ""}`}>
        {links.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            className={`mobile-link ${active === i ? "active" : ""}`}
            onClick={() => {
              setActive(i);
              setOpen(false);
            }}
          >
            {link.label}
          </a>
        ))}
        <div className="mobile-socials">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="social"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .nav {
          position: absolute;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: min(1200px, 92vw);
          height: 72px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 20px 50px rgba(0, 0, 0, 0.35);
          z-index: 1000;
        }

        .logo {
          color: #fff;
          font-weight: 700;
          letter-spacing: 3px;
          text-decoration: none;
        }

        .menu {
          position: relative;
          display: flex;
          gap: 4px;
          padding: 6px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.03);
        }

        .pill {
          position: absolute;
          top: 6px;
          height: 40px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.12);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .item {
          position: relative;
          z-index: 2;
          height: 40px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 500;
          color: #9aa4b2;
          text-decoration: none;
          transition: color 0.3s;
        }

        .item:hover,
        .item.active {
          color: #fff;
        }

        .socials {
          display: flex;
          gap: 8px;
        }

        .social {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d6dde6;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.3s;
        }

        .social:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.18);
          transform: translateY(-3px);
        }

        .burger {
          display: none;
          width: 44px;
          height: 44px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .burger span {
          width: 24px;
          height: 2px;
          background: #fff;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .burger.open span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        .burger.open span:nth-child(2) {
          opacity: 0;
        }
        .burger.open span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        .mobile {
          position: fixed;
          top: 108px;
          left: 50%;
          width: 100%;
          padding: 16px;
          border-radius: 28px;
          background: #0B0D1E;
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          opacity: 0;
          visibility: hidden;
          transform: translateX(-50%) translateY(-20px);
          transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 999;
        }

        .mobile.open {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .mobile-link {
          display: flex;
          align-items: center;
          height: 52px;
          padding: 0 18px;
          margin-bottom: 4px;
          color: #d6dde6;
          text-decoration: none;
          border-radius: 16px;
          transition: 0.3s;
        }

        .mobile-link:hover,
        .mobile-link.active {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }

        .mobile-socials {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 12px;
        }

        @media (max-width: 1000px) {
          .menu,
          .socials {
            display: none;
          }
          .burger {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "Shopify Developer Bot",
    category: "AI · Shopify",
    description:
      "An AI-powered bot built with Claude Skills that analyzes and classifies Wrike development tasks into CODE-LEVEL, ADMIN-SIDE, HUMAN-ONLY and DIAGNOSIS work.",
    image: "/shopify-bot.png",
    url: "",
  },
  {
    title: "SPORTSTECH.DE",
    category: "Shopify E-commerce",
    description:
      "Shopify theme development with Liquid, HTML, CSS and JavaScript: section redesigns, new pages and responsive UI on a live store, plus a newsletter API with form validation.",
    image: "/shopify-bot.png",
    url: "https://www.sportstech.de",
  },
  {
    title: "AI-Powered Instagram Comment Automation",
    category: "AI Automation",
    description:
      "An n8n and Groq AI workflow that classifies Instagram comments by sentiment and topic, auto-replies in multiple languages, drafts negative replies for human review and logs everything to Google Sheets.",
    image: "/instagram-automation.png",
    url: "",
  },
  {
    title: "AI Agent Platform Evaluation & POC",
    category: "AI Evaluation",
    description:
      "Evaluated OpenMausBot, Grok Bot and a self-hosted Qwen model across Slack, Teams, security and integrations, and built a QA automation bot for sportstech.de.",
    image: "/ai-agent-poc.png",
    url: "",
  },
  {
    title: "Sportstech NEO",
    category: "Product Landing Page",
    description:
      "A high-performance, responsive product landing page showcasing crypto integration in the fitness domain, built with HTML, CSS and JavaScript.",
    image: "/sportstech-neo.jpg",
    url: "https://sportstech-funnel.netlify.app/",
  },
  {
    title: "Sportstech.io",
    category: "Web3 Fitness Platform",
    description:
      "Three UI versions aligned with evolving Figma designs, built with React.js, Next.js, Tailwind CSS and GSAP, with a newsletter API and multiple stakeholder demo builds.",
    image: "/sportstech-io.png",
    url: "https://www.sportstech.io",
  },
  {
    title: "Beeyoond Gaming Website",
    category: "Madurai Branch",
    description:
      "Designed and developed the complete website from scratch without design references, delivering a fully functional UI with Next.js and Tailwind CSS.",
    image: "/beeyoond-gaming.jpg",
    url: "https://www.beeyoondgaming.com",
  },
  {
    title: "SPORTSTECH Help Center",
    category: "Support Portal",
    description:
      "A clean, responsive Help Center built from scratch with HTML, CSS and JavaScript, focused on easy navigation, structured support content and mobile responsiveness.",
    image: "/help-center.jpg",
    url: "https://help-center-sportstech-demo.netlify.app/",
  },
  {
    title: "WalkingPad Vergleich",
    category: "AI-Driven Website",
    description:
      "A multi-page affiliate website built through AI-driven workflows with Minimax AI and ChatGPT, using Next.js and Tailwind CSS and fully translated into German.",
    image: "/walkingpad.jpg",
    url: "https://www.walkingpad-vergleich.com",
  },
  {
    title: "Beelockchain.com",
    category: "Frontend & UI/UX",
    description:
      "A responsive digital transformation website built with Next.js and Tailwind CSS, with interactive animations, hover effects and scroll-based interactions.",
    image: "/beelockchain-com.png",
    url: "https://www.beelockchain.com",
  },
  {
    title: "Beelockchain.io",
    category: "AI-Assisted Development",
    description:
      "A responsive web application in Next.js, React.js and Tailwind CSS with reusable components and a scalable frontend architecture.",
    image: "/beelockchain-io.png",
    url: "https://www.beelockchain.io",
  },
  {
    title: "Pearl Dentistree",
    category: "Angular · Dental Hospital",
    description:
      "A patient management system in Angular with responsive interfaces for appointment scheduling, patient records and billing, integrated with backend APIs.",
    image: "/pearl-dentistree.jpg",
    url: "https://www.pearldentistree.com",
  },
  {
    title: "Presidential Holidays",
    category: "Angular · Hospital Management",
    description:
      "A hospital management website in Angular with responsive interfaces and backend API integration for treatment services, appointments and reviews.",
    image: "/presidential-holidays.jpg",
    url: "https://www.presidentialholidays.in/",
  },
];

// frame shapes repeat in this order (gives the staggered filmstrip look)
const shapes = [
  { ratio: "0.76", offset: "5%" },
  { ratio: "1.12", offset: "-8%" },
  { ratio: "0.86", offset: "9%" },
  { ratio: "0.7", offset: "-3%" },
];

const COPIES = 5; // the list is repeated to fake an infinite loop
const MID = Math.floor(COPIES / 2);

const OMEGA = 11; // spring stiffness
const FLING_TIME = 0.25;
const FLING_MAX = 2.2;
const DRAG_THRESHOLD = 6;
const WHEEL_SETTLE = 140;

export default function Projects() {
  const [active, setActive] = useState(0);

  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const linkRef = useRef(null);
  const api = useRef({});
  const firstRun = useRef(true);

  const count = projects.length;
  const pad = (i) => String(i + 1).padStart(2, "0");
  const current = projects[active];

  /* Text animation when the project changes */
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    [titleRef, descRef, linkRef].forEach((ref, i) => {
      const el = ref.current;
      if (!el || !el.animate) return;
      el.animate(
        [
          { opacity: 0, transform: "translateY(10px)" },
          { opacity: 1, transform: "none" },
        ],
        {
          duration: 520,
          delay: i * 70,
          easing: "cubic-bezier(.2,.7,.2,1)",
          fill: "backwards",
        }
      );
    });
  }, [active]);

  /* Filmstrip engine */
  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return;

    const frames = Array.from(track.children);
    const total = frames.length;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let centers = [];
    const distances = new Array(total).fill("");
    let ready = false;
    let stageWidth = 0;
    let frameWidth = 0;
    let pitch = 0;
    let cycle = 0;

    let position = 0;
    let target = 0;
    let velocity = 0;

    let activeIndex = -1;
    let raf = null;
    let lastTime = 0;
    let visible = true;

    let pressed = false;
    let dragging = false;
    let didDrag = false;
    let pointerId = null;
    let startX = 0;
    let lastX = 0;
    let lastMoveTime = 0;
    let dragVelocity = 0;
    let wheelTimer = 0;
    let dragResetTimer = 0;

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const mod = (n, m) => ((n % m) + m) % m;

    const positionOf = (k) =>
      stageWidth / 2 - centers[clamp(k, 0, total - 1)];
    const frameAt = (x) =>
      clamp(
        Math.round((stageWidth / 2 - x - centers[0]) / pitch),
        0,
        total - 1
      );

    function measure() {
      stageWidth = stage.clientWidth;
      if (!stageWidth || !frames.length) return;

      frameWidth = frames[0].offsetWidth;
      const trackBounds = track.getBoundingClientRect();
      centers = frames.map((f) => {
        const b = f.getBoundingClientRect();
        return b.left - trackBounds.left + b.width / 2;
      });

      pitch = frames.length > 1 ? centers[1] - centers[0] : frameWidth;
      cycle = pitch * count;
      ready = true;

      const keep = activeIndex >= 0 ? activeIndex : 0;
      target = position = positionOf(MID * count + keep);
      velocity = 0;
      distances.fill("");
      render();
    }

    function recenter() {
      const base = positionOf(MID * count);
      const n = Math.floor((position - base + cycle / 2) / cycle);
      if (!n) return;
      position -= n * cycle;
      target -= n * cycle;
    }

    function render() {
      track.style.setProperty("--film-x", `${position.toFixed(2)}px`);

      const focus = stageWidth / 2;
      const range = Math.max(stageWidth * 0.7, 1);

      for (let i = 0; i < total; i += 1) {
        const value = clamp(
          Math.abs(centers[i] + position - focus) / range,
          0,
          1
        ).toFixed(3);
        if (value !== distances[i]) {
          distances[i] = value;
          frames[i].style.setProperty("--frame-distance", value);
        }
      }

      const index = mod(frameAt(position), count);
      if (index !== activeIndex) {
        activeIndex = index;
        setActive(index);
      }
    }

    function requestTick() {
      if (raf !== null || !visible || !ready) return;
      raf = requestAnimationFrame(update);
    }

    function update(now) {
      raf = null;
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 1 / 60;
      lastTime = now;

      if (dragging || reduced.matches) {
        position = target;
        velocity = 0;
      } else {
        // critically damped spring (frame-rate independent)
        const e0 = position - target;
        const b = velocity + OMEGA * e0;
        const decay = Math.exp(-OMEGA * dt);
        position = target + (e0 + b * dt) * decay;
        velocity = (b - OMEGA * (e0 + b * dt)) * decay;
      }

      recenter();
      render();

      const settled =
        !dragging && Math.abs(target - position) < 0.15 && Math.abs(velocity) < 2;

      if (settled) {
        position = target;
        velocity = 0;
        render();
        lastTime = 0;
        return;
      }
      requestTick();
    }

    function moveToFrame(k) {
      clearTimeout(wheelTimer);
      target = positionOf(k);
      requestTick();
    }

    function moveToProject(index) {
      const cur = frameAt(target);
      let delta = mod(index - mod(cur, count), count);
      if (delta > count / 2) delta -= count; // shortest way round
      moveToFrame(cur + delta);
      stage.classList.add("has-interacted");
    }
    api.current.moveToProject = moveToProject;

    /* clicks on frames: side frame slides to center, center frame opens link */
    function onTrackClick(event) {
      const frame = event.target.closest("[data-frame]");
      if (!frame) return;

      if (didDrag) {
        event.preventDefault();
        return;
      }
      const frameIndex = Number(frame.dataset.frame);
      if (frameIndex !== frameAt(target)) {
        event.preventDefault();
        moveToFrame(frameIndex);
        stage.classList.add("has-interacted");
        return;
      }
      if (!frame.dataset.url) event.preventDefault(); // no link for this project
    }

    function onKeyDown(event) {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const cur = frameAt(target);

      if (event.key === "ArrowRight") moveToFrame(cur + 1);
      else if (event.key === "ArrowLeft") moveToFrame(cur - 1);
      else if (event.key === "Home") moveToProject(0);
      else if (event.key === "End") moveToProject(count - 1);
      else return;

      event.preventDefault();
      stage.classList.add("has-interacted");
    }

    function pointerDown(event) {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      pressed = true;
      dragging = false;
      didDrag = false;
      pointerId = event.pointerId;
      startX = lastX = event.clientX;
      lastMoveTime = performance.now();
      dragVelocity = 0;
      clearTimeout(wheelTimer);
    }

    function pointerMove(event) {
      if (!pressed || event.pointerId !== pointerId) return;

      if (!dragging) {
        if (Math.abs(event.clientX - startX) < DRAG_THRESHOLD) return;
        dragging = true;
        didDrag = true;
        stage.setPointerCapture(event.pointerId);
        stage.classList.add("is-dragging", "has-interacted");
        lastX = startX;
        lastMoveTime = performance.now() - 16;
        velocity = 0;
      }

      const now = performance.now();
      const dx = event.clientX - lastX;
      const dt = Math.max(now - lastMoveTime, 1);

      dragVelocity = dragVelocity * 0.65 + ((dx / dt) * 1000) * 0.35;
      target += dx;
      position = target;

      lastX = event.clientX;
      lastMoveTime = now;
      requestTick();
    }

    function pointerUp(event) {
      if (!pressed || event.pointerId !== pointerId) return;
      pressed = false;
      if (!dragging) return;

      dragging = false;
      stage.classList.remove("is-dragging");
      if (stage.hasPointerCapture(event.pointerId)) {
        stage.releasePointerCapture(event.pointerId);
      }

      const v = performance.now() - lastMoveTime > 90 ? 0 : dragVelocity;
      velocity = v;

      const from = frameAt(target);
      const reach = clamp(v * FLING_TIME, -pitch * FLING_MAX, pitch * FLING_MAX);
      let to = frameAt(target + reach);
      if (to === from && Math.abs(v) > 350) {
        to = clamp(from - Math.sign(v), 0, total - 1);
      }

      target = positionOf(to);
      dragResetTimer = window.setTimeout(() => {
        didDrag = false;
      }, 0);
      requestTick();
    }

    function onWheel(event) {
      // vertical wheel keeps scrolling the page; only horizontal / Shift+wheel moves the strip
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      if (!horizontal && !event.shiftKey) return;

      event.preventDefault();
      const raw = horizontal ? event.deltaX : event.deltaY;
      target -= raw * (event.deltaMode === 1 ? 32 : 1);
      stage.classList.add("has-interacted");

      clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => {
        target = positionOf(frameAt(target));
        requestTick();
      }, WHEEL_SETTLE);
      requestTick();
    }

    const preventDrag = (e) => e.preventDefault();

    track.addEventListener("click", onTrackClick);
    stage.addEventListener("pointerdown", pointerDown);
    stage.addEventListener("pointermove", pointerMove, { passive: true });
    stage.addEventListener("pointerup", pointerUp);
    stage.addEventListener("pointercancel", pointerUp);
    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("keydown", onKeyDown);
    stage.addEventListener("dragstart", preventDrag);

    const resizeObserver = new ResizeObserver(() => {
      if (
        ready &&
        stage.clientWidth === stageWidth &&
        frames[0].offsetWidth === frameWidth
      )
        return;
      measure();
    });
    resizeObserver.observe(stage);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) requestTick();
      },
      { rootMargin: "200px 0px" }
    );
    visibilityObserver.observe(stage);

    return () => {
      track.removeEventListener("click", onTrackClick);
      stage.removeEventListener("pointerdown", pointerDown);
      stage.removeEventListener("pointermove", pointerMove);
      stage.removeEventListener("pointerup", pointerUp);
      stage.removeEventListener("pointercancel", pointerUp);
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("keydown", onKeyDown);
      stage.removeEventListener("dragstart", preventDrag);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      if (raf !== null) cancelAnimationFrame(raf);
      clearTimeout(wheelTimer);
      clearTimeout(dragResetTimer);
    };
  }, [count]);

  return (
    <section id="projects" className="projects">
      
     <div className="intro">
        <p className="eyebrow text-[14px] sm:text-[14px] md:text-[16px] lg:text-[30px]">Projects</p>
      </div>
      <div className="panel">
        
        <div className="meta" aria-live="polite">
            
          <span>{pad(active)}</span>
          
          <span>{current.category}</span>
          
        </div>

        <div className="copy">
            
          <h3 ref={titleRef} className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px]">
            {current.title}
          </h3>
          <p ref={descRef} className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[18px]">
            {current.description}
          </p>
          {current.url && (
            
            <a
              ref={linkRef}
              className="link"
              href={current.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View project
              <svg aria-hidden="true" viewBox="0 0 18 18">
                <path d="M3 9h11M10 4l5 5-5 5" />
              </svg>
            </a>
          )}
          
        </div>
        <nav className="tabs" aria-label="Select a project">
            
          {projects.map((p, i) => (
            <button
              key={p.title}
              type="button"
              className="tab"
              aria-current={i === active}
              aria-label={`Show ${p.title}`}
              onClick={() => {
                api.current.moveToProject?.(i);
                stageRef.current?.focus({ preventScroll: true });
              }}
            >
              {pad(i)}
            </button>
          ))}
        </nav>
      </div>

      <div
        ref={stageRef}
        className="stage"
        role="region"
        aria-label="Project gallery. Drag or use arrow keys to browse."
        tabIndex={0}
      >
        <div className="" aria-hidden="true" />

        <div ref={trackRef} className="track">
          {Array.from({ length: COPIES }).flatMap((_, copy) =>
            projects.map((p, i) => {
              const shape = shapes[i % shapes.length];
              return (
                <a
                  key={`${copy}-${i}`}
                  className="frame"
                  data-frame={copy * count + i}
                  data-url={p.url}
                  href={p.url || "#"}
                  target={p.url ? "_blank" : undefined}
                  rel={p.url ? "noopener noreferrer" : undefined}
                  tabIndex={-1}
                  aria-hidden="true"
                  draggable={false}
                  style={{
                    "--frame-ratio": shape.ratio,
                    "--frame-offset": shape.offset,
                  }}
                >
                  <img
                    src={p.image}
                    alt=""
                    draggable={false}
                    decoding="async"
                    loading={copy === MID ? "eager" : "lazy"}
                  />
                </a>
              );
            })
          )}
        </div>

        <p className="hint" aria-hidden="true">
          Drag to explore
        </p>
      </div>

      <style jsx>{`
        .projects {
          --bg: #0b0d12;
          --ink: #f2f4fa;
          --muted: #a2acbd;
          --line: rgba(255, 255, 255, 0.12);
          --accent: #ff6f61;
          --blue: #6ea8ff;

          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: min(900px, 100svh);
          overflow: clip;
          color: var(--ink);
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
        }

        .intro {
          position: absolute;
          z-index: 3;
          top: clamp(24px, 3vw, 44px);
          left: clamp(24px, 4vw, 64px);
          display: flex;
          gap: 28px;
          align-items: baseline;
        }
        
        .lede,
        .meta,
        .tabs,
        .hint {
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .eyebrow,
        .lede {
          margin: 0;
        }
        .eyebrow {
          font-weight: 700;
          color: var(--blue);
          // font-size :30px;
        }
        .lede {
          max-width: 250px;
          color: var(--muted);
          line-height: 1.45;
        }

        .panel {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: clamp(84px, 7vw, 104px) clamp(24px, 4vw, 64px)
            clamp(28px, 3vw, 48px);
          border-right: 1px solid var(--line);
        }
        .meta {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          color: var(--muted);
        }
        .meta span:first-child {
          color: var(--accent);
          font-weight: 700;
        }
        .copy {
        //   margin-block: auto;
          padding-block: 36px 28px;
        }
        .copy h3 {
          max-width: 560px;
          margin: 0;
          // font-size: clamp(2rem, 3.4vw, 3.4rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.02;
          text-wrap: balance;
        }
        .copy p {
          max-width: 29rem;
          margin: clamp(18px, 2.4vw, 30px) 0 0;
          color: var(--muted);
          // font-size: clamp(0.95rem, 1.1vw, 1.08rem);
          line-height: 1.7;
        }

        .link {
          display: inline-flex;
          gap: 12px;
          align-items: center;
          margin-top: clamp(18px, 2.4vw, 30px);
          padding-bottom: 7px;
          border-bottom: 1px solid var(--accent);
          color: var(--accent);
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
        }
        .link:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 6px;
        }
        .link svg {
          width: 1rem;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.4;
          transition: transform 180ms ease;
        }
        .link:hover svg,
        .link:focus-visible svg {
          transform: translateX(4px);
        }

        .tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin: 0;
        }
        .tab {
          min-width: 2.45rem;
          padding: 0.54rem 0.7rem;
          border: 1px solid var(--line);
          border-radius: 99px;
          background: transparent;
          color: var(--muted);
          font: inherit;
          cursor: pointer;
          transition: background-color 180ms ease, border-color 180ms ease,
            color 180ms ease;
        }
        .tab:hover,
        .tab:focus-visible {
          border-color: var(--blue);
          color: var(--ink);
        }
        .tab:focus-visible {
          outline: 2px solid var(--blue);
          outline-offset: 2px;
        }
        .tab[aria-current="true"] {
          border-color: transparent;
          background: linear-gradient(90deg, #ffb199, #ff6f61);
          color: var(--bg);
          font-weight: 700;
        }

        .stage {
          position: relative;
          min-width: 0;
          overflow: hidden;
          isolation: isolate;
          cursor: grab;
          touch-action: pan-y;
          overscroll-behavior-x: contain;
          user-select: none;
          -webkit-user-select: none;
        }
        .stage:focus-visible {
          outline: 2px solid var(--blue);
          outline-offset: -7px;
        }
        .stage.is-dragging {
          cursor: grabbing;
        }
        .stage::before,
        .stage::after {
          position: absolute;
          z-index: 5;
          top: 0;
          bottom: 0;
          width: 12%;
          content: "";
          pointer-events: none;
        }
        .stage::before {
          left: 0;
          background: linear-gradient(90deg, var(--bg) 8%, transparent);
        }
        .stage::after {
          right: 0;
          background: linear-gradient(270deg, var(--bg) 8%, transparent);
        }

        .track {
          position: absolute;
          top: 50%;
          left: 0;
          display: flex;
          gap: clamp(6px, 0.8vw, 12px);
          align-items: center;
          width: max-content;
          padding-inline: 50vw;
          transform: translate3d(var(--film-x, 0px), -50%, 0);
          will-change: transform;
        }

        .frame {
          --frame-distance: 1;
          --frame-ratio: 0.78;
          --frame-offset: 0%;
          position: relative;
          display: block;
          flex: 0 0 clamp(210px, 19vw, 360px);
          aspect-ratio: var(--frame-ratio);
          overflow: hidden;
          border-radius: 16px;
          background: #151925;
          color: inherit;
          text-decoration: none;
          transform: translateY(var(--frame-offset))
            scale(calc(1 - var(--frame-distance) * 0.085));
          opacity: calc(1 - var(--frame-distance) * 0.5);
          -webkit-user-drag: none;
        }
        .frame::after {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 16px;
          content: "";
          pointer-events: none;
        }
        .frame img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transform: scale(calc(1.02 + var(--frame-distance) * 0.045));
          pointer-events: none;
          -webkit-user-drag: none;
        }

        .focus-line {
          position: absolute;
          z-index: 6;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 1px;
          background: rgba(255, 255, 255, 0.14);
          pointer-events: none;
        }
        .focus-line::before {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          aspect-ratio: 1;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 0 4px rgba(255, 111, 97, 0.25);
          content: "";
          transform: translate(-50%, -50%);
        }

        .hint {
          position: absolute;
          z-index: 6;
          right: 26px;
          bottom: 25px;
          margin: 0;
          color: var(--muted);
          pointer-events: none;
          transition: opacity 180ms ease;
        }
        .stage.has-interacted .hint {
          opacity: 0;
        }

        /* ---------- Tablet + Mobile ---------- */
        @media (max-width: 900px) {
          .projects {
            display: block;
            min-height: 0;
          }
          .intro {
            position: static;
            justify-content: space-between;
            padding: 22px 20px 0;
          }
          .lede {
            max-width: 12rem;
            text-align: right;
          }
          .panel {
            min-height: 0;
            padding: 18px 20px 24px;
            border-right: 0;
            border-bottom: 1px solid var(--line);
          }
          .copy {
            // min-height: 18rem;
            margin-block: 0;
            padding-block: 22px 24px;
          }
          .copy h3 {
            // font-size: clamp(1.8rem, 8vw, 2.8rem);
          }
          .copy p {
            // font-size: 0.95rem;
          }
          .tab {
            min-width: 2.1rem;
            padding: 0.42rem 0.6rem;
            font-size: 0.68rem;
          }
          .stage {
            height: min(58svh, 480px);
            min-height: 360px;
          }
          .track {
            gap: 8px;
          }
          .frame {
            flex-basis: min(62vw, 280px);
          }
          .hint {
            right: 16px;
            bottom: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .projects *,
          .projects *::before,
          .projects *::after {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
          .track {
            will-change: auto;
          }
        }
      `}</style>
    </section>
  );
}
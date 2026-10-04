"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;

    if (!hero || !stage) return;

    const layers = stage.querySelectorAll("[data-depth]");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    // parallax only on desktop layout (lg and above)
    const desktop = window.matchMedia("(min-width: 1024px)");

    let animationFrame;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    /*
      ------------------------------------------------
      HERO ENTRANCE ANIMATION
      ------------------------------------------------
    */

    const entrance = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    entrance
      .fromTo(
        ".hero-bg",
        {
          opacity: 0,
          scale: 1.08,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.4,
        }
      )
      .fromTo(
        ".hero-image",
        {
          opacity: 0,
          scale: 0.92,
          y: 35,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.15,
        },
        "-=1"
      )
      .fromTo(
        ".hero-accent",
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
        },
        "-=0.8"
      )
      .fromTo(
        ".hero-eyebrow",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.5"
      )
      .fromTo(
        ".hero-title",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
        },
        "-=0.35"
      )
      .fromTo(
        ".hero-sub",
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.5"
      )
      .fromTo(
        ".hero-actions",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.35"
      );

    /*
      ------------------------------------------------
      PARALLAX
      ------------------------------------------------
    */

    function render() {
      cx += (tx - cx) * 0.09;
      cy += (ty - cy) * 0.09;

      stage.style.transform = `
        rotateX(${(-cy * 6).toFixed(3)}deg)
        rotateY(${(cx * 8).toFixed(3)}deg)
      `;

      layers.forEach((element) => {
        const depth = parseFloat(element.dataset.depth) || 0;

        const dx = cx * depth;
        const dy = cy * depth;

        const isContent = element.classList.contains("hero-content");

        const baseTransform = isContent
          ? "translate(0, -50%)"
          : "";

        element.style.transform = `
          ${baseTransform}
          translate3d(
            ${dx.toFixed(2)}px,
            ${dy.toFixed(2)}px,
            ${depth}px
          )
        `;
      });

      if (
        Math.abs(tx - cx) > 0.0005 ||
        Math.abs(ty - cy) > 0.0005
      ) {
        animationFrame = requestAnimationFrame(render);
      } else {
        animationFrame = null;
      }
    }

    function schedule() {
      if (!animationFrame) {
        animationFrame = requestAnimationFrame(render);
      }
    }

    function handleMouseMove(event) {
      const rect = hero.getBoundingClientRect();

      tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      schedule();
    }

    function resetParallax() {
      tx = 0;
      ty = 0;

      schedule();
    }

    /*
      ------------------------------------------------
      MOBILE / TOUCH FLOAT
      ------------------------------------------------
    */

    let floatFrame;

    function autoFloat(time) {
      tx = Math.sin(time / 2600) * 0.5;
      ty = Math.cos(time / 3200) * 0.4;

      schedule();

      floatFrame = requestAnimationFrame(autoFloat);
    }

    function stopFloat() {
      if (floatFrame) {
        cancelAnimationFrame(floatFrame);
        floatFrame = null;
      }
    }

    function setupParallax() {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", resetParallax);

      stopFloat();

      tx = 0;
      ty = 0;
      cx = 0;
      cy = 0;

      stage.style.transform = "";

      layers.forEach((element) => {
        const isContent = element.classList.contains("hero-content");

        // the -50% offset only belongs to the desktop (absolute) layout
        element.style.transform =
          isContent && desktop.matches ? "translate(0, -50%)" : "";
      });

      if (prefersReducedMotion.matches) return;

      // mobile + tablet: static stacked layout, no parallax
      if (!desktop.matches) return;

      if (finePointer.matches) {
        hero.addEventListener("mousemove", handleMouseMove);
        hero.addEventListener("mouseleave", resetParallax);
      } else {
        floatFrame = requestAnimationFrame(autoFloat);
      }
    }

    setupParallax();

    finePointer.addEventListener("change", setupParallax);
    prefersReducedMotion.addEventListener("change", setupParallax);
    desktop.addEventListener("change", setupParallax);

    return () => {
      entrance.kill();

      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", resetParallax);

      finePointer.removeEventListener("change", setupParallax);
      prefersReducedMotion.removeEventListener(
        "change",
        setupParallax
      );
      desktop.removeEventListener("change", setupParallax);

      stopFloat();

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Hero banner"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0b0d12] px-6 pb-24 pt-32 text-[#f2f4fa] md:px-10 lg:py-24"
    >
      {/* Background gradients */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(
              1200px 700px at 20% 0%,
              #1c1730 0%,
              transparent 55%
            ),
            radial-gradient(
              1000px 600px at 100% 100%,
              #10283a 0%,
              transparent 55%
            ),
            #0b0d12
          `,
        }}
      />

      {/* Hero Stage */}
      <div
        ref={stageRef}
        className="relative flex w-full max-w-[1100px] flex-col items-center gap-8 px-5 py-8 md:gap-10 md:px-10 md:py-12 lg:block lg:aspect-[16/10] lg:p-0"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {/* Main background layer */}
        <div
          data-depth="12"
          className="hero-bg absolute inset-0 rounded-[24px] border border-white/[0.06] lg:-inset-[8%] lg:mt-20 lg:rounded-[32px]"
          aria-hidden="true"
          style={{
            background: `
              radial-gradient(
                600px 380px at 70% 30%,
                rgba(110,168,255,.22),
                transparent 60%
              ),
              radial-gradient(
                500px 320px at 25% 75%,
                rgba(255,111,97,.22),
                transparent 60%
              ),
              linear-gradient(160deg, #151925, #0c0e15)
            `,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,.06)",
            transformStyle: "preserve-3d",
          }}
        />

        {/* Main image */}
        <img
          data-depth="34"
          className="hero-image relative aspect-square w-[68%] max-w-[300px] rounded-[24px] border border-white/10 object-cover shadow-[0_40px_80px_-30px_rgba(0,0,0,.9)] md:w-[46%] md:max-w-[360px] lg:absolute lg:right-[6%] lg:top-[12%] lg:w-[42%] lg:max-w-none"
          src="/srimathi-developer-DtBVjhEy (1).png"
          alt=""
          aria-hidden="true"
        />

        {/* Secondary image */}
        {/* <img
          data-depth="52"
          className="hero-image absolute bottom-[8%] right-[30%] aspect-square w-[26%] rounded-[20px] border border-white/10 object-cover shadow-[0_30px_60px_-30px_rgba(0,0,0,.8)]"
          src="https://picsum.photos/seed/peak2/700/700"
          alt=""
          aria-hidden="true"
        /> */}

        {/* Coral accent */}
        {/* <span
          data-depth="70"
          className="hero-accent absolute left-[10%] top-[16%] block h-[74px] w-[74px] rounded-full"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(140deg, #ff6f61, #ffb199)",
            boxShadow:
              "0 20px 50px -12px rgba(255,111,97,.7)",
          }}
        /> */}

        {/* Blue accent (desktop only) */}
        <span
          data-depth="90"
          className="hero-accent absolute bottom-[20%] left-[22%] hidden h-[44px] w-[44px] rounded-full lg:block"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(140deg, #6ea8ff, #a5c8ff)",
            boxShadow:
              "0 16px 40px -10px rgba(110,168,255,.7)",
          }}
        />

        {/* Ring (desktop only) */}
        <span
          data-depth="60"
          className="hero-accent absolute bottom-[6%] right-[4%] hidden h-[120px] w-[120px] rounded-full border-2 border-white/25 lg:block"
          aria-hidden="true"
        />

        {/* Content */}
        <div
          data-depth="46"
          className="hero-content relative z-10 w-full max-w-[560px] text-center max-lg:!transform-none lg:absolute lg:left-[6%] lg:top-1/2 lg:w-auto lg:max-w-[500px] lg:text-left"
          style={{
            transform: "translateY(-50%)",
          }}
        >
          <p className="hero-eyebrow mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[#6ea8ff]">
            Hello, I’m Srimathi
          </p>

          <h1 className="hero-title text-[30px] font-extrabold leading-[0.98] tracking-[-0.03em] sm:text-[38px] md:text-[44px] lg:text-[50px]">
            Turning vision into{" "}
            <br className="max-md:hidden" />
            reality with{" "}
            <br className="max-md:hidden" />
            code and design.
          </h1>

          <p className="hero-sub mx-auto mt-6 max-w-[30rem] text-[clamp(1rem,1.6vw,1.15rem)] font-medium leading-[1.55] text-[#a2acbd] lg:mx-0">
            Frontend Developer building responsive, interactive
            digital experiences with React, Next.js, modern CSS,
            animation, and AI-assisted development.
          </p>

          <div className="hero-actions mt-8 flex flex-wrap justify-center gap-3.5 lg:justify-start">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-r from-[#ffb199] to-[#ff6f61] px-6 py-3.5 text-base font-bold text-[#0b0d12] shadow-[0_18px_40px_-16px_rgba(255,111,97,.7)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_50px_-16px_rgba(255,111,97,.85)]"
            >
              View my work
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-[14px] border border-white/[0.14] bg-white/[0.06] px-6 py-3.5 text-base font-bold text-[#f2f4fa] transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.12]"
            >
              Contact me
            </a>
          </div>
        </div>
      </div>

      {/* Bottom glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 120%, rgba(110,168,255,.14), transparent 70%)",
        }}
      />

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#a2acbd]/70">
          Scroll
        </span>

        <span className="h-8 w-px overflow-hidden bg-white/10">
          <span className="block h-1/2 w-full animate-pulse bg-[#6ea8ff]" />
        </span>
      </div>
    </section>
  );
}
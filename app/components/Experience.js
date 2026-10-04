"use client";

import { useEffect, useRef, useState } from "react";

const jobs = [
  {
    year: "2025",
    date: "May 2025 — Present",
    role: "Frontend Developer",
    company: "SPORTSTECH · Beeyoond Gaming · Madurai",
    text: "Building Shopify, Web3 fitness and product experiences with React, Next.js, Liquid, Tailwind CSS and GSAP, while supporting API integrations and fast stakeholder iterations.",
  },
  {
    year: "2024",
    date: "Feb 2024 — Mar 2025",
    role: "Service Delivery Executive",
    company: "Neeyamo Enterprise Solutions · Madurai",
    text: "Handled detailed verification workflows with a strong focus on accuracy, confidentiality and process improvement; recognized as a top performer with zero escalations.",
  },
  {
    year: "2022",
    date: "Jul 2022 — Jul 2023",
    role: "Junior Application Developer",
    company: "Chrono Infotech · Madurai",
    text: "Developed Angular applications for healthcare workflows including appointments, patient records, billing and reusable service integrations.",
  },
];

function Item({ job, index }) {
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
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const inverted = index % 2 === 1;

  return (
    <li
      ref={ref}
      className={`item ${inverted ? "inverted" : ""} ${
        visible ? "visible" : ""
      }`}
    >
      <div className="marker">{job.year}</div>

      <div className="panel">
        <div className="card" tabIndex={0}>
          <p className="date text-[11px] sm:text-[11px] md:text-[16px] lg:text-[16px]">{job.date}</p>
          <h4 className="role text-[16px] sm:text-[16px] md:text-[18px] lg:text-[18px]">{job.role}</h4>
          <p className="company text-[13px] sm:text-[14px] md:text-[16px] lg:text-[16px]">{job.company}</p>
          <p className="text text-[12px] sm:text-[12px] md:text-[16px] lg:text-[16px]">{job.text}</p>
        </div>
      </div>

      <style jsx>{`
        .item {
          position: relative;
          min-height: 120px;
          margin-bottom: 70px;
        }
        .item:last-child {
          margin-bottom: 0;
        }
        .item::after {
          content: "";
          display: table;
          clear: both;
        }

        .marker {
          position: absolute;
          z-index: 2;
          left: 0;
          top: 0;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-weight: 800;
          font-size: 1rem;
          color: #0b0d12;
          background: linear-gradient(140deg, #ffb199, #ff6f61);
          border: 7px solid #0b0d12;
          box-shadow: 0 0 0 2px rgba(255, 111, 97, 0.5),
            0 14px 30px -8px rgba(255, 111, 97, 0.6);
        }

        .panel {
          float: right;
          width: 100%;
          padding-left: 100px;
          opacity: 0;
          transform: translateX(80px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .visible .panel {
          opacity: 1;
          transform: translateX(0);
        }

        .card {
          padding: 24px 26px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          outline: none;
          cursor: pointer;
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .card:hover {
          border-color: rgba(110, 168, 255, 0.5);
          box-shadow: inset 0 0 28px rgba(110, 168, 255, 0.28);
        }
        .card:focus {
          border-color: #ff6f61;
          box-shadow: 0 0 0 1px #ff6f61,
            0 12px 32px -6px rgba(255, 111, 97, 0.45);
        }

        .date {
          // font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #6ea8ff;
          margin-bottom: 8px;
        }
        h4 {
          // font-size: 1.35rem;
          font-weight: 800;
          color: #f2f4fa;
          margin: 0;
        }
        .company {
          margin: 6px 0 12px;
          font-weight: 700;
          color: #ff6f61;
        }
        .text {
          margin: 0;
          // font-size: 0.98rem;
          line-height: 1.75;
          color: #a2acbd;
        }

        @media (min-width: 768px) {
          .item {
            min-height: 150px;
            margin-bottom: 90px;
          }
          .marker {
            left: 50%;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            font-size: 1.15rem;
          }
          .panel {
            float: left;
            width: 44%;
            padding: 0;
            text-align: right;
            transform: translateX(-80px);
          }
          .inverted .panel {
            float: right;
            text-align: left;
            transform: translateX(80px);
          }
          .visible .panel,
          .visible.inverted .panel {
            transform: translateX(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .panel {
            transition: none;
            opacity: 1;
            transform: none !important;
          }
        }
      `}</style>
    </li>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="container">
        <div className="head">
          <h2>Experience</h2>
          <h3>A practical, evolving path.</h3>
        </div>

        <ul className="timeline">
          {jobs.map((job, i) => (
            <Item key={job.date} job={job} index={i} />
          ))}
        </ul>
      </div>

      <style jsx>{`
        .experience {
          padding: 100px 24px;
          color: #f2f4fa;
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
            #0b0d12;
        }

        .container {
          width: 100%;
          max-width: 1140px;
          margin: 0 auto;
        }

        .head {
          text-align: center;
          margin-bottom: 70px;
        }
        h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0 0 12px;
          background: linear-gradient(90deg, #ffb199, #ff6f61);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        h3 {
          font-size: 1rem;
          font-weight: 400;
          font-style: italic;
          color: #a2acbd;
          margin: 0;
        }

        .timeline {
          position: relative;
          padding: 0;
          margin: 0;
          list-style: none;
        }
        .timeline::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 40px;
          width: 2px;
          margin-left: -1px;
          background: linear-gradient(180deg, #ff6f61, #6ea8ff);
          opacity: 0.55;
        }

        @media (min-width: 768px) {
          .timeline::before {
            left: 50%;
          }
        }
      `}</style>
    </section>
  );
}
// "use client";

// import Logo from "@/shared/ui/Logo";
// import { useEffect, useRef } from "react";

// export default function LandingPage() {
//   const navRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (navRef.current) {
//         navRef.current.classList.toggle("scrolled", window.scrollY > 20);
//       }
//     };
//     window.addEventListener("scroll", handleScroll);

//     // Reveal on scroll
//     const reveals = document.querySelectorAll(".reveal");
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) entry.target.classList.add("visible");
//         });
//       },
//       { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
//     );
//     reveals.forEach((el) => observer.observe(el));

//     // Hero immediate reveal
//     setTimeout(() => {
//       document.querySelectorAll(".hero .reveal").forEach((el, i) => {
//         setTimeout(() => el.classList.add("visible"), i * 120);
//       });
//     }, 100);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       observer.disconnect();
//     };
//   }, []);

//   return (
//     <>
//       <style>{`
//         :root {
//           --green: #00ff88;
//           --green-dim: #00cc66;
//           --green-ghost: rgba(0,255,136,0.07);
//           --green-glow: rgba(0,255,136,0.18);
//           --bg: #04070e;
//           --bg2: #060a12;
//           --bg3: #080d16;
//           --card: #0b1020;
//           --border: rgba(255,255,255,0.07);
//           --border-green: rgba(0,255,136,0.2);
//           --text-muted: rgba(255,255,255,0.45);
//           --text-dim: rgba(255,255,255,0.25);
//         }
//         .lp-root {
//           background: var(--bg);
//           color: #fff;
//           overflow-x: hidden;
//           -webkit-font-smoothing: antialiased;
//         }

//         /* NAV */
//         .lp-nav {
//           position: fixed;
//           top: 0; left: 0; right: 0;
//           z-index: 100;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 0 40px;
//           height: 64px;
//           transition: background 0.3s, border-color 0.3s;
//         }
//         .lp-nav.scrolled {
//           background: rgba(4,7,14,0.88);
//           backdrop-filter: blur(20px);
//           border-bottom: 1px solid var(--border);
//         }
//         .lp-logo {
//           display: flex; align-items: center; gap: 10px;
//           text-decoration: none; color: #fff;
//         }
//         .lp-logo-icon {
//           width: 32px; height: 32px;
//           background: linear-gradient(135deg,#00ff88,#00cc55);
//           border-radius: 8px;
//           display: flex; align-items: center; justify-content: center;
//           font-weight: 800; font-size: 16px; color: #04070e;
//         }
//         .lp-logo-text { font-weight: 700; font-size: 18px; letter-spacing: -0.5px; }
//         .lp-logo-text span { color: var(--green); }
//         .btn-nav {
//           background: var(--green); color: #04070e;
//           border: none; padding: 10px 22px; border-radius: 100px;
//           font-weight: 700; font-size: 13px; cursor: pointer;
//           transition: all 0.2s; letter-spacing: 0.3px;
//         }
//         .btn-nav:hover { background: #00ffaa; transform: translateY(-1px); }

//         /* HERO */
//         .lp-hero {
//           min-height: 100vh;
//           display: flex; flex-direction: column;
//           align-items: center; justify-content: center;
//           text-align: center;
//           padding: 120px 24px 80px;
//           position: relative; overflow: hidden;
//           background: var(--bg);
//         }
//         .hero-grid {
//           position: absolute; inset: 0;
//           background-image:
//             linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px);
//           background-size: 60px 60px;
//           mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
//           pointer-events: none;
//         }
//         .hero-glow {
//           position: absolute; top: 50%; left: 50%;
//           transform: translate(-50%, -60%);
//           width: 900px; height: 900px;
//           background: radial-gradient(circle, rgba(0,255,136,0.12) 0%, rgba(0,255,136,0.04) 40%, transparent 70%);
//           pointer-events: none;
//         }
//         .hero-ring {
//           position: absolute; top: 50%; left: 50%;
//           transform: translate(-50%, -65%);
//           border-radius: 50%;
//           border: 1px solid rgba(0,255,136,0.08);
//           pointer-events: none;
//         }
//         .hero-badge {
//           display: inline-flex; align-items: center; gap: 6px;
//           background: rgba(0,255,136,0.08);
//           border: 1px solid rgba(0,255,136,0.2);
//           color: var(--green);
//           font-size: 11px; font-weight: 600;
//           letter-spacing: 1.5px; text-transform: uppercase;
//           padding: 6px 14px; border-radius: 100px;
//           margin-bottom: 40px; position: relative;
//         }
//         .hero-badge-dot {
//           width: 6px; height: 6px;
//           background: var(--green); border-radius: 50%;
//           animation: lp-pulse 2s infinite;
//         }
//         @keyframes lp-pulse {
//           0%,100% { opacity:1; transform:scale(1); }
//           50% { opacity:0.5; transform:scale(0.8); }
//         }
//         .hero-h1 {
//           font-size: clamp(44px,7vw,88px);
//           font-weight: 800;
//           line-height: 1.0;
//           letter-spacing: -2.5px;
//           max-width: 900px;
//           margin-bottom: 28px;
//           position: relative;
//         }
//         .hero-h1 .ac { color: var(--green); }
//         .hero-h1 .ac2 {
//           color: transparent;
//           -webkit-text-stroke: 1.5px rgba(0,255,136,0.5);
//         }
//         .hero-sub {
//           font-size: 17px; color: var(--text-muted);
//           max-width: 480px; line-height: 1.7;
//           margin-bottom: 44px; position: relative;
//         }
//         .hero-sub strong { color: rgba(255,255,255,0.75); font-weight: 500; }
//         .hero-ctas {
//           display: flex; gap: 12px; flex-wrap: wrap;
//           justify-content: center; margin-bottom: 60px; position: relative;
//         }
//         .btn-primary {
//           background: var(--green); color: #04070e;
//           border: none; padding: 14px 28px; border-radius: 100px;
//           font-weight: 700; font-size: 14px; cursor: pointer;
//           transition: all 0.25s;
//           box-shadow: 0 0 32px rgba(0,255,136,0.25);
//         }
//         .btn-primary:hover { background:#00ffaa; transform:translateY(-2px); box-shadow:0 0 48px rgba(0,255,136,0.4); }
//         .btn-secondary {
//           background: transparent; color: rgba(255,255,255,0.7);
//           border: 1px solid var(--border); padding: 14px 28px;
//           border-radius: 100px; font-weight: 600; font-size: 14px;
//           cursor: pointer; transition: all 0.25s;
//         }
//         .btn-secondary:hover { border-color: var(--border-green); color: var(--green); }
//         .hero-metrics {
//           display: flex; gap: 40px; justify-content: center;
//           flex-wrap: wrap; margin-bottom: 80px; position: relative;
//         }
//         .metric-val {
//           font-size: 28px; font-weight: 800;
//           color: var(--green); letter-spacing: -1px; line-height: 1;
//         }
//         .metric-lbl {
//           font-size: 11px; color: var(--text-dim);
//           margin-top: 4px; text-transform: uppercase; letter-spacing: 1px;
//         }

//         /* DASHBOARD */
//         .dash-wrap {
//           width: 100%; max-width: 960px; margin: 0 auto; position: relative;
//         }
//         .dash-glow-bottom {
//           position: absolute; bottom: -60px; left: 50%;
//           transform: translateX(-50%);
//           width: 70%; height: 120px;
//           background: radial-gradient(ellipse, rgba(0,255,136,0.25) 0%, transparent 70%);
//           filter: blur(30px); pointer-events: none;
//         }
//         .dash-frame {
//           background: var(--card);
//           border: 1px solid rgba(0,255,136,0.15);
//           border-radius: 16px; overflow: hidden;
//           box-shadow: 0 0 0 1px rgba(0,255,136,0.08), 0 40px 120px rgba(0,0,0,0.8);
//           transform: perspective(1200px) rotateX(4deg);
//         }
//         .dash-topbar {
//           background: rgba(0,255,136,0.04);
//           border-bottom: 1px solid var(--border);
//           padding: 12px 20px;
//           display: flex; align-items: center; justify-content: space-between;
//         }
//         .dash-logo {
//           display: flex; align-items: center; gap: 8px;
//           font-size: 13px; font-weight: 700;
//         }
//         .dash-logo-icon {
//           width: 22px; height: 22px;
//           background: linear-gradient(135deg,#00ff88,#00cc55);
//           border-radius: 5px;
//           display: flex; align-items: center; justify-content: center;
//           font-size: 10px; color: #04070e; font-weight: 800;
//         }
//         .dash-tabs {
//           display: flex; gap: 4px;
//           background: rgba(255,255,255,0.04);
//           padding: 4px; border-radius: 10px;
//           border: 1px solid var(--border);
//         }
//         .dash-tab {
//           padding: 6px 14px; border-radius: 7px;
//           font-size: 11px; font-weight: 600;
//           color: rgba(255,255,255,0.35);
//         }
//         .dash-tab.active {
//           background: rgba(0,255,136,0.1);
//           color: var(--green);
//           border: 1px solid rgba(0,255,136,0.3);
//         }
//         .dash-btn-sm {
//           font-size: 11px; color: var(--green);
//           background: rgba(0,255,136,0.08);
//           border: 1px solid rgba(0,255,136,0.2);
//           padding: 5px 12px; border-radius: 6px; font-weight: 600;
//         }
//         .dash-body {
//           padding: 20px;
//           display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
//         }
//         .dc {
//           background: var(--bg3); border: 1px solid var(--border);
//           border-radius: 10px; padding: 16px;
//         }
//         .dc.wide { grid-column: span 2; }
//         .dc.ac { border-color: rgba(0,255,136,0.2); background: rgba(0,255,136,0.04); }
//         .dc-lbl {
//           font-size: 9px; font-weight: 700; text-transform: uppercase;
//           letter-spacing: 1.5px; color: var(--text-dim); margin-bottom: 10px;
//         }
//         .dc-lbl.g { color: var(--green); }
//         .dc-score { display: flex; align-items: center; gap: 16px; }
//         .dc-circle {
//           width: 64px; height: 64px; border-radius: 50%;
//           border: 3px solid var(--green);
//           display: flex; align-items: center; justify-content: center;
//           font-size: 22px; font-weight: 800;
//           box-shadow: 0 0 20px rgba(0,255,136,0.2); flex-shrink: 0;
//         }
//         .dc-bar-wrap {
//           background: rgba(255,255,255,0.08); height: 4px;
//           border-radius: 2px; overflow: hidden; margin-bottom: 6px;
//         }
//         .dc-bar { height: 100%; background: linear-gradient(90deg,#009944,#00ff88); border-radius: 2px; }
//         .dc-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 6px; }
//         .dc-tag {
//           font-size: 9px; font-weight: 700; padding: 3px 8px;
//           border-radius: 20px;
//           background: rgba(0,255,136,0.1); color: var(--green);
//           border: 1px solid rgba(0,255,136,0.2);
//         }
//         .dc-tag.b {
//           background: rgba(59,130,246,0.1); color: #60a5fa;
//           border-color: rgba(59,130,246,0.2);
//         }
//         .dc-text { font-size: 11px; color: rgba(255,255,255,0.6); line-height: 1.6; }
//         .dc-hook-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px; }
//         .dc-hook-item {
//           background: var(--bg); border: 1px solid var(--border);
//           border-radius: 7px; padding: 10px;
//         }
//         .dc-hook-lbl { font-size: 8px; color: var(--text-dim); text-transform: uppercase; letter-spacing:1px; margin-bottom:4px; }
//         .dc-hook-val { font-size: 10px; color: rgba(255,255,255,0.7); }
//         .dc-dots { display: flex; gap: 3px; margin-top: 10px; align-items: center; }
//         .dot { height: 4px; flex: 1; border-radius: 2px; }
//         .dot-f { background: var(--green); }
//         .dot-e { background: rgba(255,255,255,0.1); }
//         .dc-dna { font-size: 20px; font-weight: 800; color: var(--green); margin: 6px 0; }
//         .dc-cadeia { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-top: 8px; }
//         .cad-item {
//           background: var(--bg); border-radius: 6px; padding: 8px;
//           text-align: center; border: 1px solid var(--border);
//         }
//         .cad-lbl { font-size: 7px; color: var(--text-dim); text-transform: uppercase; letter-spacing:1px; margin-bottom:3px; }
//         .cad-val { font-size: 9px; color: rgba(255,255,255,0.6); }

//         /* SECTIONS */
//         .lp-section { padding: 140px 24px; position: relative; }
//         .lp-container { max-width: 1100px; margin: 0 auto; }
//         .sec-center { text-align: center; display: flex; flex-direction: column; align-items: center; }
//         .sec-label {
//           display: inline-block; font-size: 10px; font-weight: 700;
//           letter-spacing: 3px; text-transform: uppercase;
//           color: var(--green); margin-bottom: 20px;
//         }
//         .sec-h2 {
//           font-size: clamp(32px,5vw,60px); font-weight: 800;
//           letter-spacing: -2px; line-height: 1.05;
//           max-width: 700px; margin-bottom: 16px;
//         }
//         .sec-h2 .ac { color: var(--green); }
//         .sec-sub {
//           font-size: 16px; color: var(--text-muted);
//           max-width: 480px; line-height: 1.7; margin-bottom: 72px;
//         }

//         /* STEPS */
//         .steps { display: grid; grid-template-columns: repeat(4,1fr); gap: 2px; margin-bottom: 80px; }
//         .step {
//           background: var(--card); border: 1px solid var(--border);
//           padding: 28px 24px; position: relative; transition: border-color 0.3s;
//         }
//         .step:first-child { border-radius: 16px 0 0 16px; }
//         .step:last-child { border-radius: 0 16px 16px 0; }
//         .step:hover { border-color: var(--border-green); }
//         .step-num { font-size: 11px; font-weight: 700; color: var(--text-dim); letter-spacing:2px; text-transform:uppercase; margin-bottom:16px; }
//         .step-icon { font-size: 24px; margin-bottom: 16px; display: block; }
//         .step-title { font-size: 16px; font-weight: 700; margin-bottom: 10px; letter-spacing:-0.3px; }
//         .step-desc { font-size: 13px; color: var(--text-muted); line-height: 1.6; }
//         .step-arrow {
//           position: absolute; right: -12px; top: 50%; transform: translateY(-50%);
//           width: 22px; height: 22px; background: var(--bg);
//           border: 1px solid var(--border-green); border-radius: 50%;
//           display: flex; align-items: center; justify-content: center;
//           font-size: 9px; color: var(--green); z-index: 2;
//         }

//         /* RECURSOS */
//         .recursos-grid { display: flex; flex-direction: column; gap: 120px; }
//         .rec-row { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
//         .rec-row.rev { direction: rtl; }
//         .rec-row.rev > * { direction: ltr; }
//         .rec-icon {
//           width: 48px; height: 48px;
//           background: rgba(0,255,136,0.08);
//           border: 1px solid rgba(0,255,136,0.2);
//           border-radius: 12px; display: flex; align-items: center;
//           justify-content: center; font-size: 22px; margin-bottom: 24px;
//         }
//         .rec-h3 { font-size: clamp(24px,3vw,38px); font-weight: 800; letter-spacing:-1.5px; line-height:1.1; margin-bottom:16px; }
//         .rec-h3 .ac { color: var(--green); }
//         .rec-desc { font-size: 15px; color: var(--text-muted); line-height: 1.75; margin-bottom: 28px; }
//         .rec-items { display: flex; flex-direction: column; gap: 10px; }
//         .rec-item {
//           display: flex; align-items: center; gap: 10px;
//           font-size: 13px; color: rgba(255,255,255,0.65);
//         }
//         .rec-item::before { content: ''; width: 5px; height: 5px; background: var(--green); border-radius: 50%; flex-shrink:0; }
//         .rec-visual {
//           background: var(--card); border: 1px solid var(--border);
//           border-radius: 16px; padding: 24px; position: relative; overflow: hidden;
//         }
//         .rec-visual::before {
//           content:''; position:absolute; top:-50px; right:-50px;
//           width:200px; height:200px;
//           background: radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%);
//           pointer-events:none;
//         }

//         /* Hook visual */
//         .hook-card {
//           background: var(--bg3); border: 1px solid var(--border);
//           border-radius: 10px; padding: 14px; margin-bottom: 12px;
//         }
//         .hook-lbl { font-size: 9px; color: var(--text-dim); text-transform:uppercase; letter-spacing:1px; margin-bottom:6px; }
//         .hook-val { font-size: 14px; font-weight: 700; margin-bottom: 10px; }
//         .ibars { display: flex; gap: 3px; align-items: center; }
//         .ibar { height: 6px; flex: 1; border-radius: 3px; }
//         .hook-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

//         /* DNA visual */
//         .dna-main {
//           background: linear-gradient(135deg,rgba(0,255,136,0.08),rgba(0,255,136,0.03));
//           border: 1px solid rgba(0,255,136,0.2);
//           border-radius: 10px; padding: 16px; margin-bottom: 12px;
//         }
//         .dna-emocao { font-size: 22px; font-weight: 800; color: var(--green); margin: 6px 0 10px; }
//         .dna-chips { display: flex; gap: 6px; flex-wrap: wrap; }
//         .chip { font-size: 10px; font-weight: 600; padding: 4px 10px; border-radius: 20px; }
//         .chip-g { background:rgba(0,255,136,0.12); color:var(--green); border:1px solid rgba(0,255,136,0.25); }
//         .chip-b { background:rgba(59,130,246,0.1); color:#60a5fa; border:1px solid rgba(59,130,246,0.2); }
//         .chip-p { background:rgba(167,139,250,0.1); color:#a78bfa; border:1px solid rgba(167,139,250,0.2); }

//         /* Roteiro visual */
//         .rot-card { background: var(--bg3); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
//         .rot-header {
//           background: rgba(0,255,136,0.04); border-bottom: 1px solid var(--border);
//           padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
//         }
//         .rot-title { font-size: 13px; font-weight: 700; color: var(--green); }
//         .rot-meta { font-size: 10px; color: var(--text-dim); }
//         .rot-seg { padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.04); }
//         .rot-seg:last-child { border-bottom: none; }
//         .rot-time {
//           display: inline-block; font-size: 9px; font-weight: 700;
//           padding: 2px 8px; background: rgba(0,255,136,0.1);
//           color: var(--green); border-radius: 4px; margin-bottom: 6px;
//         }
//         .rot-fala {
//           font-size: 11px; color: rgba(255,255,255,0.75);
//           font-style: italic; line-height: 1.5;
//           border-left: 2px solid rgba(0,255,136,0.3);
//           padding-left: 10px; margin-bottom: 6px;
//         }
//         .rot-details { display: flex; gap: 12px; }
//         .rot-detail { font-size: 9px; color: var(--text-dim); }

//         /* RESULTADO */
//         .res-showcase { width: 100%; max-width: 1000px; margin: 0 auto; position: relative; }
//         .res-glow {
//           position: absolute; bottom: -80px; left: 50%; transform: translateX(-50%);
//           width: 60%; height: 160px;
//           background: radial-gradient(ellipse, rgba(0,255,136,0.22) 0%, transparent 70%);
//           filter: blur(40px); pointer-events: none;
//         }
//         .res-frame {
//           background: var(--card);
//           border: 1px solid rgba(0,255,136,0.12);
//           border-radius: 20px; overflow: hidden;
//           box-shadow: 0 0 0 1px rgba(0,255,136,0.06), 0 60px 160px rgba(0,0,0,0.9);
//         }
//         .res-header {
//           background: rgba(0,255,136,0.03);
//           border-bottom: 1px solid var(--border);
//           padding: 16px 24px;
//           display: flex; align-items: center; justify-content: space-between;
//         }
//         .res-header-title { font-size: 15px; font-weight: 700; color: rgba(255,255,255,0.8); }
//         .res-body { padding: 24px; display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
//         .rc { background: var(--bg3); border: 1px solid var(--border); border-radius: 12px; padding: 18px; }
//         .rc.span2 { grid-column: span 2; }
//         .rc.ac { border-color: rgba(0,255,136,0.2); background: rgba(0,255,136,0.04); }
//         .rc.warn { border-color: rgba(245,158,11,0.2); background: rgba(245,158,11,0.04); }
//         .rc-lbl { font-size: 9px; font-weight: 700; text-transform:uppercase; letter-spacing:1.5px; color: var(--text-dim); margin-bottom:12px; }
//         .rc-lbl.g { color: var(--green); }
//         .rc-lbl.y { color: #f59e0b; }
//         .rc-big { font-size: 52px; font-weight: 800; letter-spacing:-3px; line-height:1; }
//         .rc-sub { font-size: 10px; color: var(--text-dim); margin-top: 4px; }
//         .rc-prog { margin-top: 16px; }
//         .rc-prog-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
//         .rc-prog-lbl { font-size: 10px; color: var(--text-muted); }
//         .rc-prog-val { font-size: 10px; font-weight: 700; color: var(--green); }
//         .rc-bar-wrap { height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden; }
//         .rc-bar { height: 100%; background: linear-gradient(90deg,#009944,#00ff88); border-radius: 2px; }
//         .rc-dna-title { font-size: 18px; font-weight: 800; color: var(--green); margin-bottom: 8px; }
//         .rc-dna-text { font-size: 11px; color: var(--text-muted); line-height: 1.6; }
//         .rc-formula { font-size: 12px; color: var(--green); font-style: italic; line-height: 1.6; font-weight: 500; }

//         /* CTA */
//         .lp-cta {
//           background: var(--bg); padding: 180px 24px;
//           text-align: center; position: relative; overflow: hidden;
//         }
//         .cta-glow {
//           position: absolute; top: 50%; left: 50%;
//           transform: translate(-50%,-50%);
//           width: 800px; height: 600px;
//           background: radial-gradient(ellipse, rgba(0,255,136,0.1) 0%, transparent 65%);
//           pointer-events: none;
//         }
//         .cta-h2 {
//           font-size: clamp(40px,6vw,76px); font-weight: 800;
//           letter-spacing: -3px; line-height: 1.0;
//           max-width: 800px; margin: 0 auto 24px; position: relative;
//         }
//         .cta-h2 .ac { color: var(--green); }
//         .cta-sub { font-size: 16px; color: var(--text-muted); max-width: 440px; margin: 0 auto 48px; line-height: 1.7; position: relative; }
//         .btn-cta {
//           background: var(--green); color: #04070e; border: none;
//           padding: 18px 40px; border-radius: 100px;
//           font-weight: 800; font-size: 16px; cursor: pointer;
//           transition: all 0.25s;
//           box-shadow: 0 0 60px rgba(0,255,136,0.3);
//           position: relative;
//         }
//         .btn-cta:hover { background: #00ffaa; transform: translateY(-3px); box-shadow: 0 0 80px rgba(0,255,136,0.45); }
//         .cta-note { font-size: 12px; color: var(--text-dim); margin-top: 16px; position: relative; }

//         /* FOOTER */
//         .lp-footer {
//           border-top: 1px solid var(--border);
//           padding: 32px 40px;
//           display: flex; align-items: center; justify-content: space-between;
//           background: var(--bg);
//         }
//         .footer-note { font-size: 12px; color: var(--text-dim); }

//         /* REVEAL */
//         .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
//         .reveal.visible { opacity: 1; transform: translateY(0); }
//         .d1 { transition-delay: 0.1s; }
//         .d2 { transition-delay: 0.2s; }
//         .d3 { transition-delay: 0.3s; }
//         .d4 { transition-delay: 0.4s; }

//         /* RESPONSIVE 4K */
//         @media (min-width: 2560px) {
//           .lp-nav { height: 80px; padding: 0 60px; }
//           .lp-nav .btn-nav { padding: 14px 32px; font-size: 16px; }

//           .hero-h1 { font-size: 120px; max-width: 1200px; margin-bottom: 40px; }
//           .hero-sub { font-size: 24px; max-width: 700px; margin-bottom: 60px; }
//           .hero-ctas .btn-primary,
//           .hero-ctas .btn-secondary { padding: 20px 40px; font-size: 18px; }
//           .hero-metrics { gap: 80px; }
//           .metric-val { font-size: 40px; }
//           .metric-lbl { font-size: 14px; }

//           .dash-wrap { max-width: 1400px; }
//           .dash-topbar { padding: 18px 30px; }
//           .dash-logo { font-size: 18px; }
//           .dash-logo-icon { width: 30px; height: 30px; font-size: 14px; }
//           .dash-tabs { padding: 6px; }
//           .dash-tab { padding: 8px 20px; font-size: 14px; }
//           .dash-btn-sm { font-size: 14px; padding: 6px 16px; }
//           .dash-body { padding: 30px; gap: 20px; }
//           .dc { padding: 24px; }
//           .dc-lbl { font-size: 12px; margin-bottom: 14px; }
//           .dc-circle { width: 80px; height: 80px; font-size: 28px; }
//           .dc-text { font-size: 14px; }
//           .dc-hook-item .dc-hook-lbl { font-size: 10px; }
//           .dc-hook-item .dc-hook-val { font-size: 12px; }
//           .dc-dna { font-size: 24px; }
//           .cad-lbl { font-size: 9px; }
//           .cad-val { font-size: 11px; }

//           .lp-section { padding: 200px 40px; }
//           .lp-container { max-width: 1600px; }
//           .sec-label { font-size: 14px; margin-bottom: 30px; }
//           .sec-h2 { font-size: 70px; max-width: 1000px; }
//           .sec-sub { font-size: 22px; max-width: 700px; }

//           .steps { margin-bottom: 120px; }
//           .step { padding: 40px 32px; }
//           .step-num { font-size: 14px; }
//           .step-icon { font-size: 32px; }
//           .step-title { font-size: 20px; }
//           .step-desc { font-size: 16px; }

//           .recursos-grid { gap: 180px; }
//           .rec-row { gap: 120px; }
//           .rec-icon { width: 64px; height: 64px; font-size: 28px; }
//           .rec-h3 { font-size: 44px; }
//           .rec-desc { font-size: 18px; }
//           .rec-item { font-size: 16px; }
//           .rec-visual { padding: 32px; }
//           .hook-card .hook-lbl { font-size: 11px; }
//           .hook-card .hook-val { font-size: 16px; }
//           .dna-emocao { font-size: 26px; }
//           .chip { font-size: 12px; padding: 6px 14px; }
//           .rot-header { padding: 16px 24px; }
//           .rot-title { font-size: 16px; }
//           .rot-meta { font-size: 12px; }
//           .rot-time { font-size: 11px; }
//           .rot-fala { font-size: 14px; }
//           .rot-detail { font-size: 11px; }

//           .res-showcase { max-width: 1400px; }
//           .res-header { padding: 20px 30px; }
//           .res-header-title { font-size: 18px; }
//           .res-body { padding: 30px; gap: 24px; }
//           .rc { padding: 24px; }
//           .rc-lbl { font-size: 12px; }
//           .rc-big { font-size: 64px; }
//           .rc-sub { font-size: 12px; }
//           .rc-prog-lbl { font-size: 12px; }
//           .rc-prog-val { font-size: 12px; }
//           .rc-dna-title { font-size: 22px; }
//           .rc-dna-text { font-size: 14px; }
//           .rc-formula { font-size: 15px; }

//           .lp-cta { padding: 240px 40px; }
//           .cta-h2 { font-size: 100px; max-width: 1200px; }
//           .cta-sub { font-size: 22px; max-width: 600px; }
//           .btn-cta { padding: 24px 60px; font-size: 20px; }
//           .cta-note { font-size: 14px; }

//           .lp-footer { padding: 40px 60px; }
//           .footer-note { font-size: 14px; }
//         }

//         /* RESPONSIVE PADRÃO (já existente) */
//         @media (max-width: 900px) {
//           .lp-nav { padding: 0 20px; }
//           .steps { grid-template-columns: 1fr 1fr; }
//           .step-arrow { display: none; }
//           .rec-row { grid-template-columns: 1fr; gap: 40px; }
//           .rec-row.rev { direction: ltr; }
//           .res-body { grid-template-columns: 1fr 1fr; }
//           .rc.span2 { grid-column: span 2; }
//           .dash-body { grid-template-columns: 1fr; }
//           .dc.wide { grid-column: span 1; }
//         }
//         @media (max-width: 600px) {
//           .lp-section { padding: 80px 20px; }
//           .steps { grid-template-columns: 1fr; }
//           .step:first-child { border-radius: 16px 16px 0 0; }
//           .step:last-child { border-radius: 0 0 16px 16px; }
//           .hero-metrics { gap: 24px; }
//           .res-body { grid-template-columns: 1fr; }
//           .rc.span2 { grid-column: span 1; }
//           .lp-footer { flex-direction: column; gap: 12px; text-align: center; }
//           .dash-tabs { display: none; }
//         }
//       `}</style>

//       <div className="lp-root">
//         {/* NAV */}
//         <nav ref={navRef} className="lp-nav">
//           <a href="#" className="lp-logo">
//             <Logo />
//           </a>
//           <button className="btn-nav">Começar grátis</button>
//         </nav>

//         {/* HERO */}
//         <section className="lp-hero">
//           <div className="hero-grid" />
//           <div className="hero-glow" />
//           <div className="hero-ring" style={{ width: 600, height: 600 }} />
//           <div className="hero-ring" style={{ width: 400, height: 400 }} />

//           <h1 className="hero-h1 reveal">
//             Descubra <span className="ac">por que</span>
//             <br />
//             vídeos viralizam.
//             <br />
//             <span className="ac2">Grave o próximo.</span>
//           </h1>

//           <p className="hero-sub reveal d1">
//             O Vipe Social analisa vídeos virais com IA e gera{" "}
//             <strong>roteiros prontos</strong>, adaptados à sua realidade —
//             cidade, idade e recursos.
//           </p>

//           <div className="hero-ctas reveal d2">
//             <button className="btn-primary">
//               Começar agora —{" "}
//               <span className="text-white font-bold">Grátis</span>
//             </button>
//             <button className="btn-secondary">Ver como funciona</button>
//           </div>

//           <div className="hero-metrics reveal d3">
//             {[
//               { val: "4", lbl: "Camadas de IA" },
//               { val: "5", lbl: "Roteiros por análise" },
//               { val: "95%", lbl: "Prob. viral" },
//               { val: "menos de 2min", lbl: "Tempo de entrega" },
//             ].map((m) => (
//               <div key={m.lbl} style={{ textAlign: "center" }}>
//                 <div className="metric-val">{m.val}</div>
//                 <div className="metric-lbl">{m.lbl}</div>
//               </div>
//             ))}
//           </div>

//           {/* Dashboard Hero */}
//           <div className="dash-wrap reveal d4">
//             <div className="dash-glow-bottom" />
//             <div className="dash-frame">
//               <div className="dash-topbar">
//                 <div className="dash-logo">
//                   {/* <div className="dash-logo-icon">V</div> */}
//                   <span>
//                     {/* <span style={{ color: "var(--green)" }}>Vipe</span>Social */}
//                     <Logo />
//                   </span>
//                 </div>
//                 <div className="dash-tabs">
//                   <div className="dash-tab active">🔥 Por que Viralizou?</div>
//                   <div className="dash-tab">💡 O que Gravar</div>
//                   <div className="dash-tab">📅 Calendário</div>
//                 </div>
//                 <div className="dash-btn-sm">← Nova análise</div>
//               </div>
//               <div className="dash-body">
//                 <div className="dc ac">
//                   <div className="dc-lbl g">Índice de Execução</div>
//                   <div className="dc-score">
//                     <div className="dc-circle">64</div>
//                     <div style={{ flex: 1 }}>
//                       <div
//                         style={{
//                           fontSize: 10,
//                           color: "var(--text-dim)",
//                           textTransform: "uppercase",
//                           letterSpacing: 1,
//                           marginBottom: 6,
//                         }}
//                       >
//                         Probabilidade Viral
//                       </div>
//                       <div className="dc-bar-wrap">
//                         <div className="dc-bar" style={{ width: "80%" }} />
//                       </div>
//                       <div
//                         style={{
//                           fontSize: 10,
//                           color: "var(--green)",
//                           fontWeight: 700,
//                           marginBottom: 6,
//                         }}
//                       >
//                         80%
//                       </div>
//                       <div className="dc-tags">
//                         <span className="dc-tag">🔥 Alto Potencial</span>
//                         <span className="dc-tag b">Lifestyle</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="dc">
//                   <div className="dc-lbl">Sinal Dominante das Métricas</div>
//                   <div className="dc-text">
//                     Aprovação passiva e interação direta. O público se conectou
//                     de forma íntima, preferindo comentar do que compartilhar
//                     para terceiros.
//                   </div>
//                 </div>
//                 <div className="dc wide">
//                   <div className="dc-lbl g">🎣 Hook do Vídeo</div>
//                   <div className="dc-hook-row">
//                     <div className="dc-hook-item">
//                       <div className="dc-hook-lbl">Tipo de Hook</div>
//                       <div className="dc-hook-val">
//                         Conexão pessoal e quebra de quarta parede
//                       </div>
//                     </div>
//                     <div className="dc-hook-item">
//                       <div className="dc-hook-lbl">Explicação</div>
//                       <div className="dc-hook-val">
//                         Contato visual direto cria sensação imediata de
//                         autenticidade
//                       </div>
//                     </div>
//                   </div>
//                   <div className="dc-dots">
//                     {[...Array(6)].map((_, i) => (
//                       <div key={i} className="dot dot-f" />
//                     ))}
//                     {[...Array(4)].map((_, i) => (
//                       <div key={i} className="dot dot-e" />
//                     ))}
//                     <span
//                       style={{
//                         fontSize: 10,
//                         color: "rgba(255,255,255,0.4)",
//                         marginLeft: 6,
//                       }}
//                     >
//                       6/10
//                     </span>
//                   </div>
//                 </div>
//                 <div className="dc">
//                   <div className="dc-lbl g">🧬 DNA Emocional Puro</div>
//                   <div className="dc-dna">Identificação profunda</div>
//                   <div className="dc-text">
//                     O vídeo ativa a empatia ao tocar na ferida comum da solidão.
//                   </div>
//                 </div>
//                 <div className="dc">
//                   <div className="dc-lbl">⛓️ Cadeia Emocional</div>
//                   <div className="dc-cadeia">
//                     {[
//                       {
//                         lbl: "Entrada",
//                         color: "#3b82f6",
//                         val: "Curiosidade empática",
//                       },
//                       {
//                         lbl: "Desenvolv.",
//                         color: "#f59e0b",
//                         val: "Vulnerabilidade compartilhada",
//                       },
//                       {
//                         lbl: "Saída",
//                         color: "var(--green)",
//                         val: "Acolhimento e validação",
//                       },
//                     ].map((c) => (
//                       <div key={c.lbl} className="cad-item">
//                         <div className="cad-lbl" style={{ color: c.color }}>
//                           {c.lbl}
//                         </div>
//                         <div className="cad-val">{c.val}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* COMO FUNCIONA */}
//         <section className="lp-section" style={{ background: "var(--bg2)" }}>
//           <div className="lp-container sec-center">
//             <div className="sec-label reveal">Como funciona</div>
//             <h2 className="sec-h2 reveal d1">
//               De vídeo viral a <span className="ac">roteiro pronto</span> em
//               minutos
//             </h2>
//             <p className="sec-sub reveal d2">
//               4 camadas de IA trabalham em sequência para entregar um plano
//               completo de gravação.
//             </p>

//             <div className="steps reveal d3">
//               {[
//                 {
//                   n: "01",
//                   icon: "📤",
//                   title: "Envie o vídeo viral",
//                   desc: "Faça upload ou cole o link de um vídeo do TikTok que bombou. Informe views, likes e comentários.",
//                   arrow: true,
//                 },
//                 {
//                   n: "02",
//                   icon: "👤",
//                   title: "Preencha seu perfil",
//                   desc: "Idade, cidade e classe social. A IA precisa saber sua realidade para criar roteiros que funcionem pra você.",
//                   arrow: true,
//                 },
//                 {
//                   n: "03",
//                   icon: "🧠",
//                   title: "IA analisa o DNA viral",
//                   desc: "4 camadas de IA descobrem o hook, emoção, retenção e gatilho de ação do vídeo original.",
//                   arrow: true,
//                 },
//                 {
//                   n: "04",
//                   icon: "🎬",
//                   title: "Receba 5 roteiros prontos",
//                   desc: "Fala exata, cenário, roupa, edição, horário pra postar e erros fatais a evitar. Só gravar.",
//                   arrow: false,
//                 },
//               ].map((s) => (
//                 <div key={s.n} className="step">
//                   <div className="step-num">Passo {s.n}</div>
//                   <span className="step-icon">{s.icon}</span>
//                   <div className="step-title">{s.title}</div>
//                   <div className="step-desc">{s.desc}</div>
//                   {s.arrow && <div className="step-arrow">→</div>}
//                 </div>
//               ))}
//             </div>

//             {/* Mini dashboard */}
//             <div className="dash-wrap reveal" style={{ maxWidth: 880 }}>
//               <div className="dash-glow-bottom" />
//               <div className="dash-frame">
//                 <div className="dash-topbar">
//                   <div className="dash-logo">
//                     {/* <div className="dash-logo-icon">V</div> */}
//                     <span>
//                       {/* <span style={{ color: "var(--green)" }}>Vipe</span>Social */}
//                       <Logo />
//                     </span>
//                   </div>
//                   <div className="dash-tabs">
//                     <div className="dash-tab">🔥 Por que Viralizou?</div>
//                     <div className="dash-tab active">💡 O que Gravar</div>
//                     <div className="dash-tab">📅 Calendário</div>
//                   </div>
//                   <div className="dash-btn-sm">← Nova análise</div>
//                 </div>
//                 <div style={{ padding: 20 }}>
//                   <div
//                     style={{
//                       display: "grid",
//                       gridTemplateColumns: "repeat(3,1fr)",
//                       gap: 12,
//                     }}
//                   >
//                     {[
//                       {
//                         n: "#1",
//                         title: "Crise dos 25 na Ilha Cinza",
//                         chips: [
//                           { label: "✓ Validado", cls: "chip-g" },
//                           { label: "Série", cls: "chip-b" },
//                         ],
//                         desc: "Identificação profunda com a crise do quarto de século.",
//                         borderColor: "rgba(0,255,136,0.2)",
//                       },
//                       {
//                         n: "#2",
//                         title: "Café da Manhã Sem Filtro",
//                         chips: [{ label: "✓ Validado", cls: "chip-b" }],
//                         desc: "Vulnerabilidade compartilhada e validação da fadiga.",
//                         borderColor: "rgba(59,130,246,0.2)",
//                       },
//                       {
//                         n: "#3",
//                         title: "A Cidade Fantasma",
//                         chips: [{ label: "✓ Validado", cls: "chip-p" }],
//                         desc: "Solidão e busca por propósito.",
//                         borderColor: "rgba(167,139,250,0.2)",
//                       },
//                     ].map((r) => (
//                       <div
//                         key={r.n}
//                         className="dc"
//                         style={{ borderColor: r.borderColor }}
//                       >
//                         <div className="dc-lbl g">Roteiro {r.n}</div>
//                         <div
//                           style={{
//                             fontWeight: 700,
//                             fontSize: 14,
//                             marginBottom: 8,
//                           }}
//                         >
//                           {r.title}
//                         </div>
//                         <div className="dc-tags">
//                           {r.chips.map((c) => (
//                             <span key={c.label} className={`chip ${c.cls}`}>
//                               {c.label}
//                             </span>
//                           ))}
//                         </div>
//                         <div
//                           style={{
//                             marginTop: 10,
//                             fontSize: 10,
//                             color: "var(--text-muted)",
//                           }}
//                         >
//                           {r.desc}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* RECURSOS */}
//         <section className="lp-section" style={{ background: "var(--bg2)" }}>
//           <div className="lp-container">
//             <div className="sec-center" style={{ marginBottom: 80 }}>
//               <div className="sec-label reveal">O que você recebe</div>
//               <h2 className="sec-h2 reveal d1">
//                 Cada roteiro é uma{" "}
//                 <span className="ac">arma de viralização</span>
//               </h2>
//               <p className="sec-sub reveal d2">
//                 Não é só texto. É um plano completo de gravação, edição e
//                 publicação.
//               </p>
//             </div>
//             <div className="recursos-grid">
//               {/* Recurso 1 */}
//               <div className="rec-row reveal">
//                 <div>
//                   <div className="rec-icon">🎣</div>
//                   <h3 className="rec-h3">
//                     Hook & Retenção <span className="ac">científicos</span>
//                   </h3>
//                   <p className="rec-desc">
//                     A IA identifica o tipo de hook, intensidade e
//                     micro-recompensas que mantém o espectador até o final — e
//                     replica isso no seu roteiro.
//                   </p>
//                   <div className="rec-items">
//                     {[
//                       "Tipo de hook identificado e replicado",
//                       "Intensidade emocional por segundo",
//                       "Loop aberto e quebra de previsibilidade",
//                       "Ponto de maior tensão mapeado",
//                     ].map((t) => (
//                       <div key={t} className="rec-item">
//                         {t}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="rec-visual">
//                   <div className="hook-card">
//                     <div className="hook-lbl">Tipo de Hook</div>
//                     <div className="hook-val">
//                       Conexão pessoal e quebra de quarta parede
//                     </div>
//                     <div className="ibars">
//                       {[
//                         "#3b82f6",
//                         "#3b82f6",
//                         "#60a5fa",
//                         "#34d399",
//                         "#34d399",
//                         "#00ff88",
//                         "rgba(255,255,255,0.1)",
//                         "rgba(255,255,255,0.1)",
//                         "rgba(255,255,255,0.1)",
//                         "rgba(255,255,255,0.1)",
//                       ].map((c, i) => (
//                         <div
//                           key={i}
//                           className="ibar"
//                           style={{ background: c }}
//                         />
//                       ))}
//                     </div>
//                     <div
//                       style={{
//                         textAlign: "right",
//                         fontSize: 10,
//                         color: "rgba(255,255,255,0.4)",
//                         marginTop: 4,
//                       }}
//                     >
//                       6/10
//                     </div>
//                   </div>
//                   <div className="hook-grid">
//                     <div className="hook-card" style={{ marginBottom: 0 }}>
//                       <div className="hook-lbl">Loop Aberto</div>
//                       <div
//                         style={{
//                           fontSize: 11,
//                           color: "rgba(255,255,255,0.6)",
//                           lineHeight: 1.5,
//                         }}
//                       >
//                         Menção ao &quot;pior aniversário&quot; cria curiosidade
//                         sustentada.
//                       </div>
//                     </div>
//                     <div className="hook-card" style={{ marginBottom: 0 }}>
//                       <div className="hook-lbl">⚡ Pico de Tensão</div>
//                       <div
//                         style={{
//                           fontSize: 11,
//                           color: "#fde68a",
//                           lineHeight: 1.5,
//                           fontWeight: 500,
//                         }}
//                       >
//                         0:31 — mudança de tom casual para desabafo emocional.
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Recurso 2 */}
//               <div className="rec-row rev reveal">
//                 <div>
//                   <div className="rec-icon">🧬</div>
//                   <h3 className="rec-h3">
//                     DNA Emocional <span className="ac">do vídeo</span>
//                   </h3>
//                   <p className="rec-desc">
//                     Extrai a emoção dominante, cadeia emocional e gatilho de
//                     ação que fizeram o vídeo bombar — e adapta tudo para o seu
//                     contexto.
//                   </p>
//                   <div className="rec-items">
//                     {[
//                       "Emoção dominante e cadeia emocional completa",
//                       "Gatilho de ação que gera comentários",
//                       "Fórmula viral destilada em uma linha",
//                       "Alerta de replicação para não soar falso",
//                     ].map((t) => (
//                       <div key={t} className="rec-item">
//                         {t}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="rec-visual">
//                   <div className="dna-main">
//                     <div className="dc-lbl g">🧬 DNA Emocional Puro</div>
//                     <div className="dna-emocao">Identificação profunda</div>
//                     <div
//                       style={{
//                         fontSize: 11,
//                         color: "rgba(255,255,255,0.55)",
//                         lineHeight: 1.6,
//                         marginBottom: 12,
//                       }}
//                     >
//                       O vídeo ativa a empatia ao tocar na ferida comum da
//                       solidão e da busca por significado em datas especiais.
//                     </div>
//                     <div className="dna-chips">
//                       <span className="chip chip-g">✓ Loop Aberto</span>
//                       <span className="chip chip-b">
//                         Narrativa Confessional
//                       </span>
//                       <span className="chip chip-p">
//                         Vulnerabilidade Estratégica
//                       </span>
//                     </div>
//                   </div>
//                   <div className="hook-card" style={{ marginBottom: 0 }}>
//                     <div className="hook-lbl">🧪 Fórmula Viral</div>
//                     <div
//                       style={{
//                         fontSize: 11,
//                         color: "var(--green)",
//                         fontStyle: "italic",
//                         lineHeight: 1.6,
//                         fontWeight: 500,
//                       }}
//                     >
//                       &quot;Ativou Identificação profunda através de uma
//                       confissão vulnerável que quebra a quarta parede.&quot;
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Recurso 3 */}
//               <div className="rec-row reveal">
//                 <div>
//                   <div className="rec-icon">🎬</div>
//                   <h3 className="rec-h3">
//                     Roteiro <span className="ac">palavra por palavra</span>
//                   </h3>
//                   <p className="rec-desc">
//                     Cada roteiro vem com a fala exata, segundo a segundo. Tom de
//                     voz, expressão facial e movimento corporal incluídos.
//                   </p>
//                   <div className="rec-items">
//                     {[
//                       "Fala exata para cada bloco de tempo",
//                       "Tom de voz e expressão facial detalhados",
//                       "Cenário, roupa e setup de gravação",
//                       "Instruções de edição e horário para postar",
//                     ].map((t) => (
//                       <div key={t} className="rec-item">
//                         {t}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="rec-visual">
//                   <div className="rot-card">
//                     <div className="rot-header">
//                       <span className="rot-title">
//                         🎬 Roteiro #1 — Crise dos 25
//                       </span>
//                       <span className="rot-meta">75s · 21:30</span>
//                     </div>
//                     <div className="rot-seg">
//                       <span className="rot-time">0–3s</span>
//                       <div className="rot-fala">
//                         &quot;Mano, morar na praia parece um sonho, mas pra quem
//                         trampa com isso aqui é um pesadelo.&quot;
//                       </div>
//                       <div className="rot-details">
//                         <span className="rot-detail">
//                           🎙 Tom seco e pausado
//                         </span>
//                         <span className="rot-detail">
//                           😐 Olhar fixo na câmera
//                         </span>
//                       </div>
//                     </div>
//                     <div className="rot-seg">
//                       <span
//                         className="rot-time"
//                         style={{
//                           background: "rgba(248,113,113,0.12)",
//                           color: "#f87171",
//                         }}
//                       >
//                         36–55s ⚡
//                       </span>
//                       <div
//                         className="rot-fala"
//                         style={{
//                           borderLeftColor: "rgba(248,113,113,0.4)",
//                           color: "#fca5a5",
//                         }}
//                       >
//                         &quot;Eu sou que parece fresca, mas esse PC é minha
//                         única chance de sair daqui.&quot;
//                       </div>
//                       <div className="rot-details">
//                         <span className="rot-detail">
//                           🎙 Vulnerável e honesto
//                         </span>
//                         <span className="rot-detail">😤 Intensidade 9/10</span>
//                       </div>
//                     </div>
//                     <div className="rot-seg">
//                       <span className="rot-time">56–75s</span>
//                       <div className="rot-fala">
//                         &quot;Se você também tá no corre com o que tem, comenta
//                         aí. Bora pra cima.&quot;
//                       </div>
//                       <div className="rot-details">
//                         <span className="rot-detail">🎵 Lo-fi melancólico</span>
//                         <span className="rot-detail">
//                           👕 Moletom cinza largo
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* RESULTADO REAL */}
//         <section className="lp-section" style={{ background: "var(--bg)" }}>
//           <div className="lp-container sec-center">
//             <div className="sec-label reveal">Resultado real</div>
//             <h2 className="sec-h2 reveal d1">
//               Veja o que a IA <span className="ac">entrega pra você</span>
//             </h2>
//             <p className="sec-sub reveal d2">
//               Análise completa em menos de 2 minutos. Tudo pronto para gravar.
//             </p>

//             <div className="res-showcase reveal">
//               <div className="res-glow" />
//               <div className="res-frame">
//                 <div className="res-header">
//                   <span className="res-header-title">Resultado da Análise</span>
//                   <div className="dash-tabs">
//                     <div className="dash-tab active">🔥 Por que Viralizou?</div>
//                     <div className="dash-tab">💡 O que Gravar</div>
//                     <div className="dash-tab">📅 Calendário</div>
//                   </div>
//                   <div className="dash-btn-sm">← Nova análise</div>
//                 </div>
//                 <div className="res-body">
//                   <div className="rc ac">
//                     <div className="rc-lbl g">Índice de Execução</div>
//                     <div className="rc-big">64</div>
//                     <div className="rc-sub">de 100</div>
//                     <div className="rc-prog">
//                       <div className="rc-prog-row">
//                         <span className="rc-prog-lbl">Probabilidade Viral</span>
//                         <span className="rc-prog-val">80%</span>
//                       </div>
//                       <div className="rc-bar-wrap">
//                         <div className="rc-bar" style={{ width: "80%" }} />
//                       </div>
//                     </div>
//                     <div className="dc-tags" style={{ marginTop: 10 }}>
//                       <span className="dc-tag">🔥 Alto Potencial</span>
//                       <span className="dc-tag b">Lifestyle e rotina</span>
//                     </div>
//                   </div>
//                   <div className="rc">
//                     <div className="rc-lbl g">🧬 DNA Emocional Puro</div>
//                     <div className="rc-dna-title">Identificação profunda</div>
//                     <div className="rc-dna-text">
//                       O vídeo ativa a empatia ao tocar na ferida comum da
//                       solidão e da busca por significado em datas especiais.
//                     </div>
//                     <div className="dna-chips" style={{ marginTop: 10 }}>
//                       <span className="chip chip-g">✓ Loop Aberto</span>
//                       <span className="chip chip-b">
//                         Narrativa Confessional
//                       </span>
//                     </div>
//                   </div>
//                   <div className="rc span2">
//                     <div className="rc-lbl g">🧪 Fórmula Viral</div>
//                     <div className="rc-formula">
//                       &quot;O vídeo viralizou porque ativou Identificação
//                       profunda através de uma confissão vulnerável que quebra a
//                       quarta parede gerando no espectador a vontade de comentar
//                       para concordar ou discordar publicamente.&quot;
//                     </div>
//                   </div>
//                   <div className="rc">
//                     <div className="rc-lbl">⛓️ Cadeia Emocional</div>
//                     <div className="dc-cadeia">
//                       {[
//                         {
//                           lbl: "Entrada",
//                           color: "#3b82f6",
//                           val: "Curiosidade empática",
//                         },
//                         {
//                           lbl: "Desenvolv.",
//                           color: "#f59e0b",
//                           val: "Vulnerabilidade compartilhada",
//                         },
//                         {
//                           lbl: "Saída",
//                           color: "var(--green)",
//                           val: "Acolhimento e validação",
//                         },
//                       ].map((c) => (
//                         <div key={c.lbl} className="cad-item">
//                           <div className="cad-lbl" style={{ color: c.color }}>
//                             {c.lbl}
//                           </div>
//                           <div className="cad-val">{c.val}</div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="rc warn">
//                     <div className="rc-lbl y">⚠️ Alerta de Replicação</div>
//                     <div
//                       style={{
//                         fontSize: 11,
//                         color: "rgba(255,255,255,0.55)",
//                         lineHeight: 1.6,
//                       }}
//                     >
//                       O maior risco é a &quot;vulnerabilidade
//                       performática&quot;, onde o criador tenta fabricar um
//                       desabafo sem a crueza necessária, soando falso.
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CTA FINAL */}
//         <section className="lp-cta">
//           <div className="cta-glow" />
//           <div className="lp-container">
//             <h2 className="cta-h2 reveal">
//               Para de <span className="ac">adivinhar.</span>
//               <br />
//               Começa a <span className="ac">viralizar.</span>
//             </h2>
//             <p className="cta-sub reveal d1">
//               Chega de postar no escuro. Deixa a IA mostrar o caminho e te
//               entregar os roteiros prontos pra gravar.
//             </p>
//             <div className="reveal d2">
//               <button className="btn-cta">
//                 Criar meu primeiro roteiro viral
//               </button>
//               <p className="cta-note">
//                 Sem cartão de crédito. Comece grátis agora.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* FOOTER */}
//         <footer className="lp-footer">
//           <a href="#" className="lp-logo">
//             <Logo />
//             {/* <div className="lp-logo-icon">V</div> */}
//             {/* <div className="lp-logo-text">
//               <span>Vipe</span>Social
//             </div> */}
//           </a>
//           <p className="footer-note">
//             © 2026 VipeSocial. Todos os direitos reservados.
//           </p>
//         </footer>
//       </div>
//     </>
//   );
// }

"use client";

import { Navbar } from "./components/Navbar/Navbar";
import { HeroSection } from "./components/Hero/HeroSection";
import { HowItWorksSection } from "./components/HowItWorks/HowItWorksSection";
import { FeaturesSection } from "./components/Features/FeaturesSection";
import { ResultsSection } from "./components/Results/ResultsSection";
import { CtaSection } from "./components/Cta/CtaSection";
import { Footer } from "./components/Footer/Footer";
import styles from "./landingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.root}>
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ResultsSection />
      <CtaSection />
      <Footer />
    </div>
  );
}

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TypeAnimation } from "react-type-animation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// --- REQUIRED IMPORTS FOR ANIMATIONS & ICONS ---
import AOS from "aos";
import "aos/dist/aos.css";

// Safest imports: FontAwesome for HTML/CSS, SimpleIcons for the rest
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaPhp,
  FaJava,
  FaServer,
  FaCode,
  FaGithub,
  FaExternalLinkAlt,
  FaPlay,
  FaGraduationCap,
  FaUniversity,
  FaMedal,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaLinkedinIn
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiTailwindcss,
  SiRedux,
  SiGraphql,
  SiDocker,
  SiGit,
  SiGithub,
  SiFigma,
  SiGo,
} from "react-icons/si";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ---------- GLOBAL SCROLL PROGRESS BAR ----------
let scrollBarTween;

if (typeof window !== "undefined" && !scrollBarTween) {
  const existing = document.getElementById("scroll-progress-bar");
  if (!existing) {
    const bar = document.createElement("div");
    bar.id = "scroll-progress-bar";
    bar.style.position = "fixed";
    bar.style.top = "0";
    bar.style.left = "0";
    bar.style.height = "4px";
    bar.style.width = "0%";
    bar.style.zIndex = "99999";
    bar.style.backgroundImage = "linear-gradient(90deg, #ff8c00, #ff0055, #ffaa00)";
    bar.style.boxShadow = "0 0 20px rgba(255,140,0,0.8)";
    bar.style.transformOrigin = "left center";
    bar.style.pointerEvents = "none";
    bar.style.transition = "opacity 0.3s ease-out";
    document.body.appendChild(bar);

    scrollBarTween = gsap.to(bar, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });
  }
}

const LandingPage = () => {
  const contentRef = useRef(null);
  const mainRef = useRef(null);
  const projectsRowRef = useRef(null);

  useEffect(() => {
    // Advanced AOS with proper Fade In/Out (mirror)
    AOS.init({ 
      once: false, 
      mirror: true, 
      offset: 80,
      duration: 800,
      easing: 'ease-in-out-cubic'
    });

    // 1. Advanced cinematic reveal for Hero load (Hardware Accelerated)
    gsap.fromTo(
      contentRef.current.children,
      { y: 60, opacity: 0, filter: "blur(12px)", scale: 0.95 },
      {
        y: 0, opacity: 1, filter: "blur(0px)", scale: 1,
        duration: 1.4, stagger: 0.15, ease: "power4.out", delay: 0.2,
        force3D: true
      }
    );

    // ==========================================
    // --- ULTRA-PREMIUM GSAP SCROLL ANIMATIONS ---
    // ==========================================
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Hero Parallax (Desktop) - Smooth Shrink and fade
      gsap.to(".hero-section", {
        scale: 0.92, borderRadius: "40px", y: 40, opacity: 0.4,
        transformOrigin: "center top", ease: "power2.inOut", force3D: true,
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1.5 },
      });

      gsap.to(".hero-parallax-content", {
        yPercent: 50, opacity: 0, filter: "blur(20px)", ease: "none", force3D: true,
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "center top", scrub: 1.5 },
      });

      // Ambient Orbs
      gsap.utils.toArray(".parallax-orb").forEach((orb, i) => {
        const xDir = i % 2 === 0 ? 250 : -250;
        const yDir = -300 * (i + 1);
        gsap.to(orb, {
          x: xDir, y: yDir, rotation: 90 * (i + 1), ease: "none", force3D: true,
          scrollTrigger: { trigger: orb.parentElement, start: "top bottom", end: "bottom top", scrub: 2.5 },
        });
      });

      // Tech Stack
      gsap.fromTo(".tech-node",
        { opacity: 0, scale: 0.3, y: 150, rotationZ: () => Math.random() * 60 - 30 },
        { opacity: 1, scale: 1, y: 0, rotationZ: 0, force3D: true, stagger: { amount: 1.2, from: "center" }, ease: "back.out(2.5)", scrollTrigger: { trigger: ".tech-stack-container", start: "top 90%", end: "center center", scrub: 1.5 } }
      );

      // About Section
      gsap.fromTo(".about-profile-pic",
        { scale: 0.6, rotationX: 45, rotationY: -35, y: 150, opacity: 0 },
        { scale: 1, rotationX: 0, rotationY: 0, y: 0, opacity: 1, force3D: true, ease: "power3.out", scrollTrigger: { trigger: "#about", start: "top 85%", end: "center center", scrub: 1.5 } }
      );

      gsap.to(".scroll-ring-1", { rotation: 220, ease: "none", force3D: true, scrollTrigger: { trigger: "#about", start: "top bottom", end: "bottom top", scrub: 1.5 } });
      gsap.to(".scroll-ring-2", { rotation: -220, ease: "none", force3D: true, scrollTrigger: { trigger: "#about", start: "top bottom", end: "bottom top", scrub: 2 } });

      gsap.utils.toArray(".parallax-badge").forEach((badge, i) => {
        gsap.fromTo(badge, { y: 80, opacity: 0 }, { y: (i + 1) * -40, opacity: 1, force3D: true, ease: "power2.out", scrollTrigger: { trigger: "#about", start: "top 75%", end: "bottom top", scrub: 1.5 } });
      });

      // Timeline Cards
      gsap.fromTo(".edu-timeline-item",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, force3D: true, ease: "power3.out", scrollTrigger: { trigger: ".edu-section", start: "top 75%", end: "center center", scrub: 1.5 } }
      );

      // Horizontal Scroll for Projects on Desktop
      if (projectsRowRef.current) {
        gsap.fromTo(projectsRowRef.current,
          { x: 300, opacity: 0 },
          { x: 0, opacity: 1, force3D: true, ease: "back.out(1)", scrollTrigger: { trigger: ".projects-section", start: "top 80%", end: "center center", scrub: 1.5 } }
        );
      }

      // Simple Contact Cards Scroll Anim
      gsap.fromTo(".contact-card", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.15, force3D: true, scrollTrigger: { trigger: ".contact-section", start: "top 80%", end: "center center", scrub: 1.5 } }
      );
    });

    // Mobile MatchMedia (Optimized without gap-causing border-radius)
    mm.add("(max-width: 767px)", () => {
      gsap.to(".hero-section", { y: 20, opacity: 0.5, transformOrigin: "center top", force3D: true, ease: "power1.inOut", scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1.5 } });
      gsap.to(".hero-parallax-content", { yPercent: 40, opacity: 0, filter: "blur(10px)", ease: "none", force3D: true, scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1.5 } });
      
      gsap.fromTo(".tech-node", { opacity: 0, scale: 0.5, y: 50 }, { opacity: 1, scale: 1, y: 0, force3D: true, stagger: 0.05, ease: "back.out(1.5)", scrollTrigger: { trigger: ".tech-stack-container", start: "top 95%", end: "center 50%", scrub: 1.5 } });
      gsap.fromTo(".about-profile-pic", { scale: 0.8, opacity: 0, y: 50 }, { scale: 1, opacity: 1, y: 0, force3D: true, ease: "power3.out", scrollTrigger: { trigger: "#about", start: "top 85%", end: "center center", scrub: 1.5 } });
      gsap.fromTo(".edu-timeline-item", { x: -30, opacity: 0 }, { x: 0, opacity: 1, force3D: true, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: ".edu-section", start: "top 85%", end: "center 60%", scrub: 1.5 } });
      
      if (projectsRowRef.current) {
        gsap.fromTo(projectsRowRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1, force3D: true, ease: "power3.out", scrollTrigger: { trigger: ".projects-section", start: "top 85%", end: "center 60%", scrub: 1.5 } });
      }

      gsap.fromTo(".contact-card", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, force3D: true, scrollTrigger: { trigger: ".contact-section", start: "top 85%", end: "center 60%", scrub: 1.5 } });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative bg-[#e6e1d6] font-sans selection:bg-[#ff8c00] selection:text-white min-h-[100dvh]">
      
      {/* ========================================== */}
      {/* --- STATIC NAVBAR (MOVED OUTSIDE HERO) --- */}
      {/* ========================================== */}
      <div className="fixed top-0 left-0 w-full z-[100]">
        <Navbar />
      </div>

      {/* ========================================== */}
      {/* --- HERO SECTION --- */}
      {/* ========================================== */}
      <section className="hero-section relative min-h-[100dvh] flex flex-col w-full overflow-hidden z-20 bg-[#e6e1d6] shadow-[0_20px_50px_rgba(0,0,0,0.15)] transform-gpu will-change-transform">
        <div className="hero-parallax-bg absolute inset-0 w-full h-full z-0 pointer-events-none transform origin-center transform-gpu will-change-transform">
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
            className="absolute inset-0 w-full h-full object-cover object-[center_top] md:object-[75%_center] opacity-80 transform-gpu"
            src="/character-wave.mp4"
          ></video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#e6e1d6] via-[#e6e1d6]/50 to-transparent md:hidden transform-gpu pointer-events-none"></div>
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#e6e1d6] via-[#e6e1d6]/80 to-transparent w-[85%] lg:w-[70%] transform-gpu pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#e6e1d6] to-transparent transform-gpu pointer-events-none"></div>
        </div>

        <main className="hero-parallax-content relative z-10 flex-1 flex flex-col justify-end md:justify-center px-6 md:px-12 lg:px-24 pb-16 md:pb-0 pt-32 md:pt-24 transform-gpu will-change-transform">
          <style>{`
            @keyframes float-hero { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
            @keyframes shine-sweep { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
            @keyframes pulse-glow { 0%, 100% { transform: scale(1) translateZ(0); opacity: 0.3; } 50% { transform: scale(1.1) translateZ(0); opacity: 0.6; } }
          `}</style>

          <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-tr from-[#ff8c00]/30 via-[#ff0055]/15 to-transparent rounded-full blur-[100px] pointer-events-none animate-pulse-glow transform-gpu"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-[#ff8c00]/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow transform-gpu" style={{ animationDelay: '2s' }}></div>

          <div
            ref={contentRef}
            className="w-full sm:w-[95%] md:w-[70%] lg:w-[60%] z-20 text-left flex flex-col items-start relative transform-gpu"
          >
            <div
              style={{ animation: "float-hero 4s ease-in-out infinite" }}
              className="mb-6 md:mb-8 flex items-center gap-3 px-5 py-2 md:py-2.5 rounded-full bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] cursor-default transform-gpu w-max"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff8c00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff8c00]"></span>
              </span>
              <span className="text-[11px] md:text-sm font-black tracking-[0.25em] text-[#1a1a1a]">
                HELLO, WORLD
              </span>
            </div>

            <h1 className="text-[3.5rem] sm:text-7xl md:text-[6.5rem] lg:text-[5.5rem] font-black leading-[0.95] tracking-tighter text-[#1a1a1a] mb-6 md:mb-8 drop-shadow-sm transform-gpu">
              I'm Prathamesh <br className="hidden md:block" />
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c00] via-[#ff0055] to-[#ff8c00] inline-block pb-2 pr-2"
                style={{
                  backgroundSize: "200% auto",
                  animation: "shine-sweep 6s linear infinite",
                }}
              >
                Ingle.
              </span>
            </h1>

            <div className="max-w-2xl text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#4a4a4a] leading-tight font-medium mb-12 min-h-[140px] md:min-h-[120px] transform-gpu">
              A Passionate{" "}
              <span className="text-[#1a1a1a] font-black bg-white/50 px-3 py-1 md:py-1.5 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-white/80 backdrop-blur-xl block md:inline-block md:rotate-[-2deg] hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-pointer mt-1 md:mt-0 hover:shadow-[0_10px_30px_rgba(255,140,0,0.3)]">
                Full Stack{" "}
                <span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c00] via-[#ff0055] to-[#ff8c00] inline-block"
                  style={{
                    backgroundSize: "200% auto",
                    animation: "shine-sweep 5s linear infinite",
                  }}
                >
                  Developer
                </span>
              </span>{" "}
              <br className="hidden md:block" />
              <br className="hidden md:block mt-2" />
              <TypeAnimation
                sequence={[
                  "building seamless digital experiences.", 2000,
                  "architecting robust backend systems.", 2000,
                  "designing intuitive, modern UIs.", 2000,
                  "turning complex ideas into reality.", 2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-[#ff8c00] font-bold text-base md:text-xl lg:text-2xl mt-3 inline-block"
              />
            </div>

            <div className="flex flex-wrap justify-start gap-2 md:gap-3 mt-2 transform-gpu">
              {[
                { name: "MongoDB", color: "#47A248", icon: <SiMongodb /> },
                { name: "Express", color: "#1a1a1a", icon: <SiExpress /> },
                { name: "React", color: "#00D8FF", icon: <FaReact /> },
                { name: "Node.js", color: "#339933", icon: <FaNodeJs /> },
                { name: "PHP", color: "#777BB4", icon: <FaPhp /> },
                { name: "Java", color: "#E76F00", icon: <FaJava /> },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="group relative flex items-center justify-center px-4 md:px-5 py-2.5 md:py-3 rounded-full bg-white/70 backdrop-blur-2xl border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-2 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden transform-gpu hover:shadow-[0_15px_35px_-5px_rgba(255,140,0,0.6)]"
                  style={{ "--hover-color": tech.color }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${tech.color}90`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.9)"; }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: tech.color }}
                  ></div>
                  
                  <div className="relative flex items-center justify-center mr-2">
                    <span className="absolute w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#1a1a1a]/20 group-hover:scale-0 group-hover:opacity-0 transition-all duration-300 ease-in-out"></span>
                    <div
                      className="w-4 h-4 md:w-5 md:h-5 opacity-0 scale-50 -rotate-90 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-md flex items-center justify-center"
                      style={{ color: tech.color }}
                    >
                      {tech.icon}
                    </div>
                  </div>
                  
                  <span className="relative z-10 text-[11px] md:text-[13px] font-extrabold text-[#1a1a1a] transition-colors duration-300 group-hover:text-black">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </section>

      {/* ========================================== */}
      {/* --- TECH ARSENAL SECTION --- */}
      {/* ========================================== */}
      <section className="tech-section relative w-full bg-gradient-to-b from-[#e6e1d6] via-[#f4f1e8] to-[#fcfbf9] flex flex-col items-center justify-center pt-16 pb-20 z-10 overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#1a1a1a 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        ></div>
        <div className="parallax-orb absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-[#ff8c00]/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="parallax-orb absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] bg-[#ff0055]/15 rounded-full blur-[140px] pointer-events-none"></div>

        <div
          className="relative z-10 flex flex-col items-center text-center mb-16 px-4"
          data-aos="fade-down"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-[#ff8c00]/60"></div>
            <span className="text-[#ff8c00] font-black tracking-[0.3em] text-[10px] md:text-xs uppercase py-1.5 px-4 bg-white/70 backdrop-blur-xl rounded-full border border-white/80 shadow-sm">
              The Arsenal
            </span>
            <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-[#ff0055]/60"></div>
          </div>
          <h2 className="section-heading text-4xl md:text-6xl font-black text-[#1a1a1a] tracking-tighter drop-shadow-sm">
            Tech{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c00] to-[#ff0055]">
              Stack
            </span>
          </h2>
        </div>

        <style>{`
          @keyframes node-float-1 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
          @keyframes node-float-2 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
          @keyframes node-float-3 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        `}</style>

        <div className="tech-stack-container relative z-10 w-full max-w-[900px] px-4 md:px-8 flex flex-col items-center gap-2 md:gap-4 pointer-events-auto perspective-1000">
          {(() => {
            const rows = [
              [
                { name: "HTML5", color: "#E34F26", icon: FaHtml5, anim: "node-float-1" },
                { name: "CSS3", color: "#1572B6", icon: FaCss3Alt, anim: "node-float-2" },
                { name: "JavaScript", color: "#F7DF1E", icon: FaJsSquare, anim: "node-float-3" },
                { name: "TypeScript", color: "#3178C6", icon: SiTypescript, anim: "node-float-1" },
                { name: "React", color: "#61DAFB", icon: FaReact, anim: "node-float-2" },
                { name: "Next.js", color: "#1a1a1a", icon: SiNextdotjs, anim: "node-float-3" },
              ],
              [
                { name: "Node.js", color: "#339933", icon: FaNodeJs, anim: "node-float-3" },
                { name: "Express", color: "#1a1a1a", icon: SiExpress, anim: "node-float-1" },
                { name: "MongoDB", color: "#47A248", icon: SiMongodb, anim: "node-float-2" },
                { name: "PostgreSQL", color: "#4169E1", icon: SiPostgresql, anim: "node-float-3" },
                { name: "Firebase", color: "#FFCA28", icon: SiFirebase, anim: "node-float-1" },
              ],
              [
                { name: "Tailwind", color: "#06B6D4", icon: SiTailwindcss, anim: "node-float-2" },
                { name: "Redux", color: "#764ABC", icon: SiRedux, anim: "node-float-3" },
                { name: "GraphQL", color: "#E10098", icon: SiGraphql, anim: "node-float-1" },
                { name: "Docker", color: "#2496ED", icon: SiDocker, anim: "node-float-2" },
              ],
              [
                { name: "Git", color: "#F05032", icon: SiGit, anim: "node-float-1" },
                { name: "GitHub", color: "#1a1a1a", icon: SiGithub, anim: "node-float-2" },
                { name: "Figma", color: "#F24E1E", icon: SiFigma, anim: "node-float-3" },
              ],
              [{ name: "Go", color: "#00ADD8", icon: SiGo, anim: "node-float-1" }],
            ];

            return rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 md:gap-4 w-full"
                data-aos="fade-up"
                data-aos-delay={rowIndex * 100}
              >
                {row.map((tech) => {
                  const Icon = tech.icon;
                  const animDuration =
                    (3 + Math.random() * 2).toFixed(1) + "s";
                  return (
                    <div
                      key={tech.name}
                      className="tech-node relative flex flex-col items-center justify-center group cursor-pointer"
                      style={{
                        animation: `${tech.anim} ${animDuration} ease-in-out infinite`,
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-25 transition-all duration-500 scale-50 group-hover:scale-[1.8] pointer-events-none"
                        style={{ backgroundColor: tech.color }}
                      ></div>
                      <div
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-[72px] md:h-[72px] flex items-center justify-center rounded-full bg-white/80 border border-white shadow-[0_8px_20px_rgba(0,0,0,0.04)] backdrop-blur-2xl transition-all duration-500 group-hover:-translate-y-3 group-hover:scale-110 z-10 relative overflow-hidden"
                      >
                        <div
                          className="absolute inset-0 border-2 border-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{ borderColor: `${tech.color}50` }}
                        ></div>
                        <Icon
                          size="48%"
                          color={tech.color}
                          className="relative z-10 transition-transform duration-500 group-hover:scale-110 drop-shadow-sm group-hover:drop-shadow-lg"
                        />
                      </div>
                      <span className="absolute -bottom-10 opacity-0 group-hover:opacity-100 bg-[#1a1a1a] text-white text-[10px] md:text-xs font-black tracking-widest transition-all duration-300 translate-y-3 group-hover:translate-y-0 text-center px-4 py-2 rounded-lg shadow-xl w-max z-50 pointer-events-none">
                        {tech.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            ));
          })()}
        </div>
      </section>

      {/* ========================================== */}
      {/* --- ABOUT ME SECTION --- */}
      {/* ========================================== */}
      <section
        id="about"
        className="relative w-full bg-[#fcfbf9] flex items-center justify-center pt-20 pb-24 z-10 overflow-hidden border-t border-gray-100"
      >
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#1a1a1a 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>
        <div className="parallax-orb absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#ff8c00]/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="parallax-orb absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#ff0055]/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <div className="flex flex-col items-start" data-aos="fade-right">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#ff8c00] font-black tracking-[0.25em] text-[10px] md:text-xs uppercase py-1.5 px-4 bg-white border border-[#1a1a1a]/10 rounded-full shadow-sm">
                  The Builder
                </span>
                <div className="h-[1px] w-12 bg-gradient-to-r from-[#ff8c00]/50 to-transparent"></div>
              </div>
              <h2 className="section-heading text-4xl md:text-5xl lg:text-7xl font-black text-[#1a1a1a] tracking-tighter leading-tight drop-shadow-sm">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c00] to-[#ff0055]">
                  Me
                </span>
              </h2>
            </div>

            <div className="space-y-5 text-[#4a4a4a] text-lg leading-relaxed font-medium">
              <p data-aos="fade-up" data-aos-delay="100">
                I'm{" "}
                <strong className="text-[#1a1a1a] border-b-2 border-[#ff8c00]/30 pb-0.5">Prathamesh Ingle</strong>, a
                Full Stack Web Developer and B.Tech IT student at{" "}
                <strong className="text-[#1a1a1a]">
                  DYPCOE`28, Akurdi
                </strong>
                .
              </p>
              <p data-aos="fade-up" data-aos-delay="200">
                I build end-to-end applications specializing in the{" "}
                <strong className="text-[#ff8c00] bg-[#ff8c00]/10 px-2 py-1 rounded shadow-sm border border-[#ff8c00]/20">
                  MERN Stack
                </strong>{" "}
                . My hands-on experience includes a Web Development internship
                at{" "}
                <strong className="text-[#1a1a1a]">
                  Operand Technologies
                </strong>{" "}
                and serving as a Technical Coordinator at{" "}
                <strong className="text-[#1a1a1a]">ITESA</strong>.
              </p>
              <p data-aos="fade-up" data-aos-delay="300">
                My focus is shipping scalable, real-world products—from secure
                fintech platforms like{" "}
                <strong className="text-[#ff8c00]">PayNidhi</strong> and
                stream-based SaaS applications like{" "}
                <strong className="text-[#ff8c00]">LetsChat</strong>, to
                enterprise management systems like{" "}
                <strong className="text-[#ff0055]">Smart ERP</strong> and{" "}
                <strong className="text-[#ff0055]">Hotel Utsav</strong>.
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-2 pt-6 border-t border-gray-200" data-aos="fade-up" data-aos-delay="350">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1a1a1a]">
                Featured Projects
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col gap-2 p-4 px-5 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-sm hover:shadow-[0_10px_25px_rgba(255,140,0,0.15)] hover:border-[#ff8c00]/50 hover:-translate-y-1.5 transition-all duration-300 cursor-default">
                  <div className="flex items-center gap-2">
                    <SiReact className="text-[#ff8c00]" size={16} />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      MERN Stack
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-black text-[#1a1a1a]">
                      PayNidhi
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    <span className="text-sm font-black text-[#1a1a1a]">
                      LetsChat
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 p-4 px-5 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-sm hover:shadow-[0_10px_25px_rgba(255,0,85,0.15)] hover:border-[#ff0055]/50 hover:-translate-y-1.5 transition-all duration-300 cursor-default">
                  <div className="flex items-center gap-2">
                    <FaPhp className="text-[#ff0055]" size={18} />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      PHP & MySQL
                    </span>
                  </div>
                  <div className="flex items-center flex-wrap gap-2 mt-1">
                    <span className="text-sm font-black text-[#1a1a1a]">
                      Smart ERP
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    <span className="text-sm font-black text-[#1a1a1a]">
                      Hotel Utsav
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    <span className="text-sm font-black text-[#1a1a1a]">
                      StudyHub
                    </span>
                  </div>
                </div>
              </div>
            </div>



            <div className="flex items-center gap-5 pt-4" data-aos="fade-up" data-aos-delay="500">
              <a
                href="https://linkedin.com/in/prathamesh-ingle"
                target="_blank" rel="noreferrer"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#ff8c00] to-[#ff0055] text-white font-black text-sm tracking-widest hover:shadow-[0_15px_35px_rgba(255,140,0,0.4)] transition-all hover:-translate-y-1 duration-300"
              >
                LET'S CONNECT
              </a>
              <a
                href="#projects"
                className="px-8 py-4 rounded-full bg-white border border-[#1a1a1a]/20 text-[#1a1a1a] font-black text-sm tracking-widest hover:border-[#ff8c00] hover:text-[#ff8c00] hover:bg-gray-50 transition-all duration-300"
              >
                EXPLORE MY WORK
              </a>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Magnetic 3D Profile Presentation --- */}
          <div
            className="flex justify-center items-center order-1 lg:order-2 relative w-full h-full min-h-[350px] lg:min-h-[500px]"
            style={{ perspective: "1000px" }}
            data-aos="zoom-in"
            data-aos-duration="1200"
          >
            <div className="about-profile-pic relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[450px] lg:h-[450px] flex items-center justify-center transform-style-3d">
              <div className="scroll-ring-1 absolute inset-0 rounded-full border-[3px] border-[#ff8c00]/40 border-dashed"></div>
              <div className="scroll-ring-2 absolute inset-[-20px] sm:inset-[-30px] rounded-full border-[1.5px] border-[#ff0055]/20">
                <div className="absolute top-[15%] right-[10%] w-4 h-4 bg-[#ff0055] rounded-full shadow-[0_0_15px_#ff0055]"></div>
                <div className="absolute bottom-[20%] left-[5%] w-2 h-2 bg-[#ff8c00] rounded-full shadow-[0_0_10px_#ff8c00]"></div>
              </div>
              <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-[#ff8c00] to-[#ff0055] opacity-20 blur-3xl animate-pulse-ring"></div>
              <div
                className="relative w-[90%] h-[90%] rounded-full p-3 bg-white/60 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-white/90 overflow-hidden z-10"
                style={{ animation: "float-slow 6s ease-in-out infinite" }}
              >
                <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-white shadow-inner relative bg-gray-100 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 pointer-events-none"></div>
                  <img
                    src="/prathamesh.png"
                    alt="Prathamesh Ingle"
                    className="w-full h-full object-cover object-[center_top] transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="parallax-badge absolute -top-4 -left-4 sm:-top-8 sm:-left-12 px-5 py-3.5 bg-white/90 backdrop-blur-xl border border-white rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.08)] z-20 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#ff8c00]/10 flex items-center justify-center text-[#ff8c00]">
                  <FaServer size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-[#ff8c00] font-black uppercase tracking-widest mb-1">
                    Fintech Platform
                  </p>
                  <p className="text-sm font-black text-[#1a1a1a] leading-none">
                    PayNidhi
                  </p>
                </div>
              </div>
              <div className="parallax-badge absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-10 px-5 py-3.5 bg-white/90 backdrop-blur-xl border border-white rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.08)] z-20 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a]/5 flex items-center justify-center text-[#1a1a1a]">
                  <SiJavascript size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">
                    Stream-based SaaS
                  </p>
                  <p className="text-sm font-black text-[#1a1a1a] leading-none">
                    LetsChat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* --- EDUCATION & EXPERIENCE SECTION --- */}
      {/* ========================================== */}
      <section className="edu-section relative w-full bg-[#fcfbf9] pt-20 pb-28 z-10 overflow-hidden border-t border-gray-100">
        <div className="relative z-10 flex flex-col items-center text-center mb-16 px-4" data-aos="fade-down">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-[#ff8c00]/60"></div>
            <span className="text-[#ff8c00] font-black tracking-[0.3em] text-[10px] md:text-xs uppercase py-1.5 px-4 bg-white border border-[#1a1a1a]/5 rounded-full shadow-sm">
              Education and Experience
            </span>
            <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-[#ff0055]/60"></div>
          </div>
        </div>
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#1a1a1a 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 md:gap-16">
          {/* Column 1: Education */}
          <div className="flex-1 flex flex-col w-full">
            <div className="flex items-center gap-4 mb-10" data-aos="fade-up">
              <div className="w-10 h-[3px] bg-gradient-to-r from-[#ff8c00] to-transparent rounded-full"></div>
              <h3 className="text-2xl font-black text-[#1a1a1a] uppercase tracking-widest">Education</h3>
            </div>
            
            <div className="border-l-[3px] border-gray-200/60 pl-8 relative ml-2">
              <div className="mb-12 relative edu-timeline-item">
                <div className="absolute -left-[43px] top-1 w-6 h-6 bg-[#ff8c00] rounded-full border-[5px] border-[#fcfbf9] shadow-sm flex items-center justify-center">
                   <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(255,140,0,0.15)] border border-gray-100 hover:border-[#ff8c00]/40 transition-all duration-500 hover:-translate-y-1 cursor-default">
                  <p className="text-[#ff8c00] text-[11px] font-black mb-3 tracking-widest uppercase bg-[#ff8c00]/10 inline-block px-3 py-1 rounded-md">AUG 2025 - PRESENT</p>
                  <h4 className="text-xl font-black text-[#1a1a1a] mb-2">B.Tech, Information Technology</h4>
                  <p className="text-sm font-bold text-gray-500 mb-4">D. Y. Patil College of Engineering (DYPCOE), Akurdi</p>
                  <p className="text-[15px] text-gray-600 leading-relaxed font-medium">Focusing on advanced Web Development, Enterprise Systems, and scalable Full-Stack architecture.</p>
                </div>
              </div>

              <div className="relative edu-timeline-item">
                <div className="absolute -left-[43px] top-1 w-6 h-6 bg-[#ff8c00] rounded-full border-[5px] border-[#fcfbf9] shadow-sm flex items-center justify-center">
                   <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(255,140,0,0.15)] border border-gray-100 hover:border-[#ff8c00]/40 transition-all duration-500 hover:-translate-y-1 cursor-default">
                  <p className="text-[#ff8c00] text-[11px] font-black mb-3 tracking-widest uppercase bg-[#ff8c00]/10 inline-block px-3 py-1 rounded-md">2021 - 2025</p>
                  <h4 className="text-xl font-black text-[#1a1a1a] mb-2">Diploma in Computer Engineering</h4>
                  <p className="text-sm font-bold text-gray-500 mb-4">Swami Vivekanand Institute of Polytechnic</p>
                  <p className="text-[15px] text-gray-600 leading-relaxed font-medium">Completed with <strong className="text-[#1a1a1a]">93.57%</strong> aggregate in final year. Focused on web development, data science, and Full-Stack Development.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Experience */}
          <div className="flex-1 flex flex-col w-full">
            <div className="flex items-center gap-4 mb-10" data-aos="fade-up">
              <div className="w-10 h-[3px] bg-gradient-to-r from-[#ff0055] to-transparent rounded-full"></div>
              <h3 className="text-2xl font-black text-[#1a1a1a] uppercase tracking-widest">Experience</h3>
            </div>
            
            <div className="border-l-[3px] border-gray-200/60 pl-8 relative ml-2">
              <div className="mb-12 relative edu-timeline-item">
                <div className="absolute -left-[43px] top-1 w-6 h-6 bg-[#ff0055] rounded-full border-[5px] border-[#fcfbf9] shadow-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(255,0,85,0.15)] border border-gray-100 hover:border-[#ff0055]/40 transition-all duration-500 hover:-translate-y-1 cursor-default">
                  <p className="text-[#ff0055] text-[11px] font-black mb-3 tracking-widest uppercase bg-[#ff0055]/10 inline-block px-3 py-1 rounded-md">PRESENT</p>
                  <h4 className="text-xl font-black text-[#1a1a1a] mb-2">Web Development Intern</h4>
                  <p className="text-sm font-bold text-gray-500 mb-4">Operand Technologies</p>
                  <p className="text-[15px] text-gray-600 leading-relaxed font-medium">Building end-to-end applications specializing in MERN Stack and PHP. Developing secure and scalable real-world products.</p>
                </div>
              </div>

              <div className="relative edu-timeline-item">
                <div className="absolute -left-[43px] top-1 w-6 h-6 bg-[#ff0055] rounded-full border-[5px] border-[#fcfbf9] shadow-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(255,0,85,0.15)] border border-gray-100 hover:border-[#ff0055]/40 transition-all duration-500 hover:-translate-y-1 cursor-default">
                  <p className="text-[#ff0055] text-[11px] font-black mb-3 tracking-widest uppercase bg-[#ff0055]/10 inline-block px-3 py-1 rounded-md">2023 - 2024</p>
                  <h4 className="text-xl font-black text-[#1a1a1a] mb-2">Technical Coordinator</h4>
                  <p className="text-sm font-bold text-gray-500 mb-4">ITESA</p>
                  <p className="text-[15px] text-gray-600 leading-relaxed font-medium">Organized and coordinated technical events, workshops, and hackathons. Managed technical infrastructure and team collaborations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* --- PREMIUM PROJECTS SECTION --- */}
      {/* ========================================== */}
      <section id="projects" className="projects-section relative w-full bg-[#1a1a1a] pt-24 pb-32 z-10 overflow-hidden">
        
        {/* Dark theme subtle dots */}
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-[#ff8c00]/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-[#ff0055]/10 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center mb-10 md:mb-16 px-4" data-aos="fade-down">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-[#ff8c00]/50"></div>
            <span className="text-[#ff8c00] font-black tracking-[0.3em] text-[10px] md:text-xs uppercase py-1 px-3 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
              Portfolio
            </span>
            <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-[#ff0055]/50"></div>
          </div>
          <h2 className="section-heading text-4xl md:text-6xl font-black text-white tracking-tighter">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c00] to-[#ff0055]">Projects</span>
          </h2>
        </div>

        {/* --- HORIZONTAL SCROLL CONTAINER --- */}
        <div className="relative z-10 w-full overflow-x-auto pb-10 hide-scrollbar px-6 md:px-12 snap-x snap-mandatory scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div ref={projectsRowRef} className="flex gap-6 md:gap-8 w-max pr-6 pb-4">
            {(() => {
              const projects = [
                {
                  title: "PayNidhi",
                  desc: "An AI-powered invoice liquidity platform providing secure and instant financing for B2B businesses. Features Cron-based penalty engine and automated NOA generation.",
                  photo: "/photo/paynidhi.png",
                  tags: ["React", "Node.js", "MongoDB", "Express", "Razorpay"],
                  github: "https://github.com/PayNidhi/PayNidhi",
                  live: "https://pay-nidhi.vercel.app/",
                },
                {
                  title: "LetsChat",
                  desc: "A full‑stack, Gemini‑powered hub unifying AI symptom checking, real‑time chat, Stream‑based video calling, and creative media generation.",
                  photo: "/photo/letschat.png",
                  tags: ["React", "Stream", "Tailwind", "Node.js"],
                  github: "https://github.com/prathamesh-ingle/LetsChat",
                  live: "https://letschat-1-r5so.onrender.com/",
                },
                {
                  title: "Smart ERP",
                  desc: "An integrated college management software that automates student records, attendance, fees, timetable, and exams for large-scale operations.",
                  photo: "/photo/erp.png",
                  tags: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
                  github: "https://github.com/prathamesh-ingle/Smart-ERP-System",
                  live: "#",
                },
                {
                  title: "Hotel Utsav",
                  desc: "A user-friendly hotel booking platform simplifying stay planning with a comprehensive dashboard for both staff management and guest bookings.",
                  photo: "/photo/utsav.png",
                  tags: ["PHP", "MySQL", "HTML5", "CSS3"],
                  github: "https://github.com/prathamesh-ingle/hotel-Utsav-hotel-booking",
                  live: "#",
                },
              ];

              return projects.map((project, idx) => (
                <div 
                  key={idx} 
                  className="project-card snap-center group relative bg-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/10 hover:border-[#ff8c00]/80 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(255,140,0,0.25)] flex flex-col w-[320px] md:w-[420px] shrink-0"
                >
                  {/* --- IMAGE THUMBNAIL CONTAINER --- */}
                  <div className="relative h-48 md:h-64 w-full overflow-hidden bg-[#0a0a0a]">
                    <img
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-60 group-hover:opacity-100"
                      src={project.photo}
                      alt={project.title}
                    />

                    <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-[#1a1a1a]/90 to-transparent z-10 pointer-events-none"></div>

                    <div className="absolute top-5 right-5 flex gap-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0">
                      <a href={project.github} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#1a1a1a]/80 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#1a1a1a] transition-colors shadow-xl border border-white/20 hover:border-transparent" title="View Source">
                        <FaGithub size={16} />
                      </a>
                      {project.live !== "#" && (
                        <a href={project.live} target="_blank" rel="noreferrer" className="w-10 h-10 bg-gradient-to-tr from-[#ff8c00] to-[#ff0055] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-[0_4px_15px_rgba(255,0,85,0.4)]" title="Live Preview">
                          <FaExternalLinkAlt size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col relative z-10 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-3 group-hover:text-[#ff8c00] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium flex-1">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto pt-5 border-t border-white/10">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-white/90 bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 shadow-sm group-hover:border-[#ff8c00]/40 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>

        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        <div className="flex justify-center mt-12 md:mt-16" data-aos="fade-up">
          <a href="#projects" className="px-10 py-4 rounded-full bg-white text-[#1a1a1a] font-black text-sm tracking-widest hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-[#ff8c00]">
            VIEW ALL PROJECTS
          </a>
        </div>
      </section>

      {/* ========================================== */}
      {/* --- CONTACT SECTION --- */}
      {/* ========================================== */}
      <section id="contact" className="contact-section relative w-full bg-[#fcfbf9] pt-24 pb-32 z-10 overflow-hidden border-t border-gray-200">
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#1a1a1a 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
          
          <div className="flex flex-col items-center text-center mb-16" data-aos="fade-down">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-[#ff8c00]/50"></div>
              <span className="text-[#ff8c00] font-black tracking-[0.3em] text-[10px] md:text-xs uppercase py-1.5 px-4 bg-white border border-[#1a1a1a]/5 rounded-full shadow-sm">
                Get In Touch
              </span>
              <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-[#ff0055]/50"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#1a1a1a] tracking-tighter drop-shadow-sm">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c00] to-[#ff0055]">Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            
            {/* WhatsApp */}
            <a href="https://wa.me/919146005002" target="_blank" rel="noreferrer" className="contact-card group bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-gray-100 p-8 flex flex-col items-center justify-center hover:shadow-[0_20px_40px_rgba(37,211,102,0.15)] hover:border-[#25D366]/40 transition-all duration-500 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#25D366]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-[#25D366]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                 <FaWhatsapp size={32} className="text-[#25D366]" />
              </div>
              <h3 className="text-xl font-black text-[#1a1a1a] mb-2">WhatsApp</h3>
              <p className="text-sm text-gray-500 font-medium mb-4">Start a quick chat with us</p>
              <span className="px-5 py-2 bg-[#25D366]/10 text-[#25D366] rounded-full font-bold text-[10px] uppercase tracking-widest group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-300">Message Now</span>
            </a>

            {/* Call Us */}
            <a href="tel:+919146005002" className="contact-card group bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-gray-100 p-8 flex flex-col items-center justify-center hover:shadow-[0_20px_40px_rgba(26,26,26,0.1)] hover:border-gray-300 transition-all duration-500 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                 <FaPhoneAlt size={26} className="text-[#1a1a1a]" />
              </div>
              <h3 className="text-xl font-black text-[#1a1a1a] mb-2">Call Me</h3>
              <p className="text-sm text-gray-500 font-medium mb-4">+91 9146005002</p>
              <span className="px-5 py-2 bg-gray-100 text-[#1a1a1a] rounded-full font-bold text-[10px] uppercase tracking-widest group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors duration-300">Ring Now</span>
            </a>

            {/* Email Us */}
            <a href="mailto:prathameshingle72@gmail.com" className="contact-card group bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-gray-100 p-8 flex flex-col items-center justify-center hover:shadow-[0_20px_40px_rgba(234,67,53,0.15)] hover:border-[#EA4335]/40 transition-all duration-500 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#EA4335]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-[#EA4335]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                 <FaEnvelope size={28} className="text-[#EA4335]" />
              </div>
              <h3 className="text-xl font-black text-[#1a1a1a] mb-2">Email</h3>
              <p className="text-sm text-gray-500 font-medium mb-4">prathameshingle72@gmail.com</p>
              <span className="px-5 py-2 bg-[#EA4335]/10 text-[#EA4335] rounded-full font-bold text-[10px] uppercase tracking-widest group-hover:bg-[#EA4335] group-hover:text-white transition-colors duration-300">Send Email</span>
            </a>

            {/* LinkedIn */}
            <a href="https://linkedin.com/in/prathamesh-ingle" target="_blank" rel="noreferrer" className="contact-card group bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-gray-100 p-8 flex flex-col items-center justify-center hover:shadow-[0_20px_40px_rgba(10,102,194,0.15)] hover:border-[#0A66C2]/40 transition-all duration-500 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#0A66C2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-[#0A66C2]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                 <FaLinkedinIn size={28} className="text-[#0A66C2]" />
              </div>
              <h3 className="text-xl font-black text-[#1a1a1a] mb-2">LinkedIn</h3>
              <p className="text-sm text-gray-500 font-medium mb-4">Let's build a professional network</p>
              <span className="px-5 py-2 bg-[#0A66C2]/10 text-[#0A66C2] rounded-full font-bold text-[10px] uppercase tracking-widest group-hover:bg-[#0A66C2] group-hover:text-white transition-colors duration-300">Connect</span>
            </a>

          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* --- FOOTER --- */}
      {/* ========================================== */}
      <div className="relative z-50 w-full">
        <Footer />
      </div>

    </div>
  );
};

export default LandingPage;

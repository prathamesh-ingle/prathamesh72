import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom"; // Keeping Link for potential external routing or logo click
import gsap from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// --- 1. ADVANCED 3D JET-TRAIL PARTICLES ---
const TrailParticles = ({ parentRef }) => {
  const pointsRef = useRef();
  const maxParticles = 40; 
  
  const particles = useRef(new Array(maxParticles).fill(0).map(() => ({
    pos: new THREE.Vector3(),
    life: 0,
    maxLife: 0,
  })));

  const [geometry, material] = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(maxParticles * 3), 3));
    geom.setAttribute('opacity', new THREE.BufferAttribute(new Float32Array(maxParticles), 1));

    const mat = new THREE.PointsMaterial({
      size: 0.025, 
      color: "#ff8c00",
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    return [geom, mat];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !parentRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array;
    const opacities = pointsRef.current.geometry.attributes.opacity.array;

    const activeParticles = particles.current.filter(p => p.life > 0);
    if (activeParticles.length < maxParticles) {
      const parentPos = new THREE.Vector3();
      parentRef.current.getWorldPosition(parentPos);
      
      const availableParticle = particles.current.find(p => p.life <= 0);
      if (availableParticle) {
        availableParticle.pos.copy(parentPos);
        availableParticle.life = 0.6; 
        availableParticle.maxLife = 0.6; 
      }
    }

    for (let i = 0; i < maxParticles; i++) {
      const p = particles.current[i];
      if (p.life > 0) {
        p.life -= delta;
        positions[i * 3] = p.pos.x;
        positions[i * 3 + 1] = p.pos.y;
        positions[i * 3 + 2] = p.pos.z;
        opacities[i] = Math.max(0, p.life / p.maxLife);
      } else {
        opacities[i] = 0;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.opacity.needsUpdate = true;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
};


// --- 2. TINY THEME-MATCHED 3D PLANE ---
const AdvancedPaperPlane3D = ({ isHovered }) => {
  const orbitGroupRef = useRef(); 
  const planeRef = useRef();      
  const angleRef = useRef(0);
  const speedRef = useRef(0.8); 

  const { geometry, edges } = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      0, 0, 0.6,   0.5, 0.1, -0.4,   0, 0.05, -0.4,  
      0, 0, 0.6,   0, 0.05, -0.4,  -0.5, 0.1, -0.4,  
      0, 0, 0.6,   0, 0.05, -0.4,   0, -0.25, -0.4,  
    ]);
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.computeVertexNormals();
    
    const edgeGeom = new THREE.EdgesGeometry(geom);
    return { geometry: geom, edges: edgeGeom };
  }, []);

  useFrame((state, delta) => {
    const targetSpeed = isHovered ? 3.0 : 0.8;
    speedRef.current = THREE.MathUtils.lerp(speedRef.current, targetSpeed, 0.05);
    angleRef.current += speedRef.current * delta;
    
    const a = angleRef.current;
    const time = state.clock.getElapsedTime();
    
    const radiusX = 1.0; 
    const radiusZ = 0.85; 
    
    orbitGroupRef.current.position.x = Math.sin(a) * radiusX;
    orbitGroupRef.current.position.z = Math.cos(a) * radiusZ;
    orbitGroupRef.current.position.y = Math.sin(time * 2) * 0.12; 

    const dx = Math.cos(a) * radiusX;
    const dz = -Math.sin(a) * radiusZ;
    orbitGroupRef.current.rotation.y = Math.atan2(dx, dz); 
    
    planeRef.current.rotation.z = Math.sin(time * 2.5) * 0.25 - 0.35;
    planeRef.current.rotation.x = Math.cos(time * 1.5) * 0.2; 
  });

  return (
    <group rotation={[0.4, 0, -0.1]}>
      <group ref={orbitGroupRef}>
        <group ref={planeRef} scale={0.4}>
          <mesh geometry={geometry}>
            <meshStandardMaterial color="#1a1a1a" roughness={0.4} side={THREE.DoubleSide} />
          </mesh>
          <lineSegments geometry={edges}>
            <lineBasicMaterial color="#ff8c00" linewidth={2} />
          </lineSegments>
        </group>
      </group>
      <TrailParticles parentRef={planeRef} />
    </group>
  );
};


// --- 3. MAIN NAVBAR COMPONENT ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); 
  
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const actionsRef = useRef(null);
  const audioRef = useRef(null);

  // --- EXACT SMOOTH SCROLL LOGIC ---
  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsOpen(false); // Close mobile menu if open

    const section = document.getElementById(sectionId);
    if (section) {
      // Get the exact position of the section minus a little offset for the sticky navbar
      const yOffset = -60; 
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    const playPromise = audioRef.current?.play();
    if (playPromise !== undefined) {
      playPromise.then(() => setIsPlaying(true)).catch(() => {
        const startAudioOnInteract = () => {
          audioRef.current?.play();
          setIsPlaying(true);
          document.removeEventListener("click", startAudioOnInteract);
        };
        document.addEventListener("click", startAudioOnInteract);
      });
    }

    const tl = gsap.timeline();
    tl.fromTo(navRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.2 })
      .fromTo(logoRef.current, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .fromTo(linksRef.current, { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" }, "-=0.5")
      .fromTo(actionsRef.current, { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4");
      
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Defined sections mapped to their exact HTML IDs
  const navItems = [
    { name: 'ABOUT', id: 'about' },
    { name: 'PROJECTS', id: 'projects' },
    { name: 'CONTACT', id: 'contact' }
  ];

  return (
    <>
      <audio ref={audioRef} src="/audio/lofi.mp3" loop />

      <style>{`
        .link-hover { position: relative; color: #1a1a1a; transition: color 0.3s ease; cursor: pointer; }
        .link-hover::after {
          content: ''; position: absolute; width: 100%; height: 2px; bottom: -4px; left: 0;
          background: linear-gradient(90deg, #ff8c00, #ff0055);
          transform: scaleX(0); transform-origin: right; transition: transform 0.4s cubic-bezier(0.65, 0, 0.35, 1); border-radius: 2px;
        }
        .link-hover:hover::after { transform: scaleX(1); transform-origin: left; }
        .link-hover:hover { color: #ff8c00; }
        
        .clip-menu { clip-path: circle(0% at calc(100% - 40px) 40px); transition: clip-path 0.8s cubic-bezier(0.76, 0, 0.24, 1); }
        .clip-menu.open { clip-path: circle(150% at calc(100% - 40px) 40px); }
        
        @keyframes gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .bg-ultra-gradient { background-size: 200% 200%; animation: gradient-shift 3s ease infinite; }
      `}</style>

      {/* DYNAMIC WRAPPER */}
      <div className={`fixed top-0 left-0 w-full z-50 flex justify-center px-4 pointer-events-none transition-all duration-500 ${isScrolled ? "pt-2" : "pt-3 md:pt-4"}`}>
        
        {/* DYNAMIC NAV */}
        <nav 
          ref={navRef} 
          className={`pointer-events-auto w-full max-w-6xl flex justify-between items-center px-5 md:px-8 transition-all duration-500 rounded-full ${
            isScrolled 
              ? "py-1.5 md:py-2 bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.06)]" 
              : "py-2 md:py-3 bg-transparent border-transparent"
          }`}
        >
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            ref={logoRef}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            className={`flex items-center justify-center relative z-50 group cursor-pointer transition-all duration-500 w-10 h-10 md:w-12 md:h-12 border-none bg-transparent`}
          >
            {/* Split-color Developer Code Emblem */}
            <div className={`relative z-10 flex items-center justify-center font-mono font-black tracking-tighter transition-all duration-500 ease-out group-hover:scale-110 pointer-events-none text-lg md:text-xl`}>
              <span className="text-[#ff8c00] drop-shadow-[0_0_8px_rgba(255,140,0,0.5)]">&lt;</span>
              <span className="text-[#1a1a1a] transform -skew-x-12 mx-[1px]">/</span>
              <span className="text-[#ff0055] drop-shadow-[0_0_8px_rgba(255,0,85,0.5)]">&gt;</span>
            </div>

            {/* True 3D Three.js Engine Overlay */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 transition-all duration-500 w-[120px] h-[120px] md:w-[140px] md:h-[140px]`}>
              <Canvas camera={{ position: [0, 0.5, 3.5], fov: 45 }} gl={{ alpha: true }}>
                <ambientLight intensity={2} color="#ffffff" />
                <pointLight position={[0, 0, 0]} intensity={5} color="#ff8c00" distance={6} decay={2} />
                <AdvancedPaperPlane3D isHovered={isLogoHovered} />
              </Canvas>
            </div>
          </button>

          {/* Desktop Links - Updated for smooth scrolling */}
          <div className="hidden md:flex gap-8 lg:gap-10 items-center justify-center flex-1 ml-4">
            {navItems.map((item, index) => (
              <button 
                key={item.name} 
                onClick={(e) => handleScrollToSection(e, item.id)}
                ref={el => linksRef.current[index] = el} 
                className="link-hover font-extrabold text-[10px] md:text-xs tracking-[0.2em] bg-transparent border-none"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div ref={actionsRef} className="hidden md:flex items-center gap-3">
            
            {/* Music Player */}
            <button 
              onClick={toggleAudio}
              className="group bg-white/60 backdrop-blur-md w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_15px_rgba(255,140,0,0.3)] hover:border-[#ff8c00]/50 transition-all duration-300" 
              title={isPlaying ? "Pause Music" : "Play Lofi Audio"}
            >
              <div className="flex items-end gap-[2px] h-3.5">
                <span className={`w-[2px] rounded-t-sm transition-all duration-300 ${isPlaying ? 'bg-[#ff8c00] animate-[bounce_0.8s_infinite] h-3.5' : 'bg-[#1a1a1a] group-hover:bg-[#ff8c00] h-1.5'}`}></span>
                <span className={`w-[2px] rounded-t-sm transition-all duration-300 ${isPlaying ? 'bg-[#ff8c00] animate-[bounce_1.2s_infinite] h-2.5' : 'bg-[#1a1a1a] group-hover:bg-[#ff8c00] h-2'}`}></span>
                <span className={`w-[2px] rounded-t-sm transition-all duration-300 ${isPlaying ? 'bg-[#ff8c00] animate-[bounce_0.9s_infinite] h-3.5' : 'bg-[#1a1a1a] group-hover:bg-[#ff8c00] h-1'}`}></span>
                <span className={`w-[2px] rounded-t-sm transition-all duration-300 ${isPlaying ? 'bg-[#ff8c00] animate-[bounce_1.5s_infinite] h-1.5' : 'bg-[#1a1a1a] group-hover:bg-[#ff8c00] h-1.5'}`}></span>
              </div>
            </button>

            {/* CTA Button -> Directly to LinkedIn */}
            <a 
              href="https://linkedin.com/in/prathamesh-ingle" 
              target="_blank" 
              rel="noreferrer"
              className="relative flex items-center justify-center px-6 py-2 md:py-2.5 bg-[#1a1a1a] rounded-full overflow-hidden group shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_25px_rgba(255,140,0,0.4)] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff8c00] via-[#ff0055] to-[#ff8c00] bg-ultra-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              <div className="relative z-10 flex flex-col items-center justify-center h-3 md:h-4 overflow-hidden">
                <span className="font-extrabold text-[10px] md:text-xs tracking-widest text-white transform group-hover:-translate-y-[150%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">GET IN TOUCH</span>
                <span className="absolute font-extrabold text-[10px] md:text-xs tracking-widest text-white transform translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">LINKEDIN</span>
              </div>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden z-50 flex flex-col justify-center items-center w-10 h-10 bg-white/80 backdrop-blur-md rounded-full border border-white shadow-sm" onClick={() => setIsOpen(!isOpen)}>
            <div className="relative w-4 h-3 flex flex-col justify-between">
              <span className={`block w-full h-[2px] bg-[#1a1a1a] rounded-full origin-left transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-x-[1px] -translate-y-[0.5px]' : ''}`}></span>
              <span className={`block w-full h-[2px] bg-[#1a1a1a] rounded-full transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-full h-[2px] bg-[#1a1a1a] rounded-full origin-left transition-transform duration-300 ease-in-out ${isOpen ? '-rotate-45 translate-x-[1px] translate-y-[0.5px]' : ''}`}></span>
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay - Updated for smooth scrolling */}
      <div className={`clip-menu fixed inset-0 bg-[#1a1a1a] z-40 flex flex-col items-center justify-center gap-10 ${isOpen ? 'open pointer-events-auto' : 'pointer-events-none'}`}>
        {navItems.map((item, i) => (
          <button 
            key={item.name} 
            onClick={(e) => handleScrollToSection(e, item.id)} 
            className="group relative text-4xl sm:text-5xl font-black text-white/40 tracking-widest overflow-hidden bg-transparent border-none" 
            style={{ transition: 'all 0.4s ease', transitionDelay: isOpen ? `${0.3 + (i * 0.1)}s` : '0s', transform: isOpen ? 'translateY(0)' : 'translateY(30px)', opacity: isOpen ? 1 : 0 }}
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">{item.name}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff8c00] to-[#ff0055] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0 mix-blend-overlay"></div>
          </button>
        ))}
        
        <div className="mt-8 flex flex-col items-center gap-6" style={{ transition: 'all 0.5s ease', transitionDelay: isOpen ? '0.6s' : '0s', transform: isOpen ? 'scale(1)' : 'scale(0.8)', opacity: isOpen ? 1 : 0 }}>
          <button onClick={toggleAudio} className="flex items-center gap-3 text-[#ff8c00] hover:text-white transition-colors text-sm font-bold tracking-widest uppercase bg-transparent border-none">
            {isPlaying ? "Pause Music" : "Play Background Music"}
            <div className="flex items-end gap-[2px] h-3">
              <span className={`w-1 rounded-full bg-current transition-all duration-300 ${isPlaying ? 'animate-[bounce_0.8s_infinite] h-3' : 'h-1'}`}></span>
              <span className={`w-1 rounded-full bg-current transition-all duration-300 ${isPlaying ? 'animate-[bounce_1.2s_infinite] h-2' : 'h-1'}`}></span>
              <span className={`w-1 rounded-full bg-current transition-all duration-300 ${isPlaying ? 'animate-[bounce_0.9s_infinite] h-4' : 'h-1'}`}></span>
            </div>
          </button>
          <a 
            href="https://linkedin.com/in/prathamesh-ingle" 
            target="_blank" 
            rel="noreferrer"
            onClick={() => setIsOpen(false)} 
            className="bg-gradient-to-r from-[#ff8c00] to-[#ff0055] text-white px-12 py-4 rounded-full font-black text-xl tracking-widest hover:scale-105 transition-transform duration-300 shadow-[0_10px_40px_rgba(255,140,0,0.4)]"
          >
            LINKEDIN
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
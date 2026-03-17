import React from "react";
import { 
  FaGithub, 
  FaLinkedinIn, 
  FaTwitter, 
  FaEnvelope, 
  FaHeart, 
  FaReact,
  FaMapMarkerAlt,
  FaPhoneAlt
} from "react-icons/fa";

const Footer = () => {
  // Smooth scroll back to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socials = [
    { icon: <FaGithub size={16} />, link: "https://github.com/prathamesh-ingle", color: "hover:bg-white hover:text-[#1a1a1a] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]" },
    { icon: <FaLinkedinIn size={16} />, link: "https://www.linkedin.com/in/prathamesh-ingle-662382342", color: "hover:bg-[#0A66C2] hover:text-white hover:shadow-[0_0_20px_rgba(10,102,194,0.5)]" },
    { icon: <FaTwitter size={16} />, link: "https://twitter.com/your-twitter", color: "hover:bg-[#1DA1F2] hover:text-white hover:shadow-[0_0_20px_rgba(29,161,242,0.5)]" },
    { icon: <FaEnvelope size={16} />, link: "mailto:prathameshingle72@gmail.com", color: "hover:bg-[#ea4335] hover:text-white hover:shadow-[0_0_20px_rgba(234,67,53,0.5)]" }
  ];

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About Me", href: "#about" },
    { name: "Tech Stack", href: "#tech-stack" },
    { name: "Portfolio", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <footer className="relative w-full bg-[#1a1a1a] pt-12 pb-6 overflow-hidden z-20 border-t border-white/5">
      
      {/* --- SUBTLE BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="absolute top-0 left-[-5%] w-[300px] h-[300px] bg-[#ff8c00]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-[-5%] w-[300px] h-[300px] bg-[#ff0055]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
    

        {/* --- MAIN FOOTER GRID (TIGHTER SPACING) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-8 mb-12">
          
          {/* Brand & Bio (Spans 5) */}
          <div className="sm:col-span-2 lg:col-span-5 flex flex-col items-start text-left" data-aos="fade-right" data-aos-delay="100">
            <div className="flex items-center font-mono font-black tracking-tighter text-2xl select-none cursor-pointer group mb-4" onClick={scrollToTop}>
              <span className="text-[#ff8c00] drop-shadow-[0_0_8px_rgba(255,140,0,0.5)] group-hover:-translate-y-1 transition-transform duration-300">&lt;</span>
              <span className="text-white transform -skew-x-12 mx-1">/</span>
              <span className="text-[#ff0055] drop-shadow-[0_0_8px_rgba(255,0,85,0.5)] group-hover:translate-y-1 transition-transform duration-300">&gt;</span>
              <span className="ml-2 text-white tracking-tight font-sans group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#ff8c00] group-hover:to-[#ff0055] transition-all duration-500">
                Prathamesh.
              </span>
            </div>
            <p className="text-gray-400 font-medium text-sm leading-relaxed max-w-sm mb-6">
              A passionate Full Stack Developer architecting robust backend systems and designing seamless digital experiences.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social, index) => (
                <a 
                  key={index}
                  href={social.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className={`w-10 h-10 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 transition-all duration-300 ${social.color} hover:border-transparent hover:-translate-y-1`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links (Spans 3) */}
          <div className="flex flex-col items-start lg:col-span-3" data-aos="fade-up" data-aos-delay="200">
            <h4 className="text-white font-black tracking-[0.2em] text-[10px] uppercase mb-4 border-b-2 border-[#ff8c00]/50 pb-1">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="group relative text-gray-400 hover:text-white font-bold text-sm transition-colors duration-300 flex items-center w-max"
                >
                  <span className="text-[#ff8c00] opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mr-1.5 text-base leading-none">›</span>
                  <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info (Spans 4) */}
          <div className="flex flex-col items-start lg:col-span-4" data-aos="fade-left" data-aos-delay="300">
            <h4 className="text-white font-black tracking-[0.2em] text-[10px] uppercase mb-4 border-b-2 border-[#ff0055]/50 pb-1">Contact Details</h4>
            <div className="flex flex-col gap-4 text-gray-400 font-medium text-sm">
              <a href="mailto:prathameshingle72@gmail.com" className="flex items-center gap-3 hover:text-[#ff8c00] transition-colors duration-300 group">
                <div className="w-8 h-8 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#ff8c00] group-hover:border-[#ff8c00] transition-all duration-300 shadow-md">
                  <FaEnvelope size={12} />
                </div>
                <span className="break-all">prathameshingle72@gmail.com</span>
              </a>
              <a href="tel:+919146005002" className="flex items-center gap-3 hover:text-[#ff0055] transition-colors duration-300 group">
                <div className="w-8 h-8 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#ff0055] group-hover:border-[#ff0055] transition-all duration-300 shadow-md">
                  <FaPhoneAlt size={12} />
                </div>
                <span>+91 9146005002</span>
              </a>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-md">
                  <FaMapMarkerAlt size={12} />
                </div>
                <span>Pune, Maharashtra</span>
              </div>
            </div>
          </div>

        </div>

        {/* --- BOTTOM COPYRIGHT BAR (COMPACT) --- */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-5 border-t border-white/10 gap-4 relative">
          <p className="text-gray-500 font-bold text-[9px] uppercase tracking-[0.2em] text-center md:text-left">
            &copy; {new Date().getFullYear()} Prathamesh Ingle. All Rights Reserved.
          </p>
          
          <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
            Built with <FaReact className="text-[#00D8FF] mx-0.5 shrink-0" style={{ animation: 'spin-slow 4s linear infinite' }} size={14} /> & <FaHeart className="text-[#ff0055] mx-0.5 shrink-0 animate-pulse" size={12} />
          </div>
        </div>

      </div>

      {/* Required Animations */}
      <style>{`
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
      `}</style>
    </footer>
  );
};

export default Footer;

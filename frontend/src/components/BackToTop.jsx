import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const BackToTop = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.pageYOffset || window.scrollY || 0;
      setVisible(y > 200);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      onClick={handleBackToTop}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={
        visible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.9 }
      }
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-[100]
                 group
                 rounded-full p-[2px]
                 bg-gradient-to-br from-[#ff8c00] via-[#ff0055] to-[#ff8c00]
                 shadow-lg shadow-black/40"
      aria-label="Back to top"
    >
      {/* inner circle */}
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center
                   rounded-full
                   bg-[#1a1a1a] text-white
                   border border-white/10"
      >
        <ArrowUpRight
          size={18}
          className="-rotate-90 transition-transform duration-200 group-hover:-translate-y-0.5 text-[#ff8c00]"
        />
      </motion.div>
    </motion.button>
  );
};

export default BackToTop;
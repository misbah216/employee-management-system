import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();
  const title = 'PrabandhPro';
  const [revealed, setRevealed] = useState(0);
  const [falling, setFalling] = useState(false);

  useEffect(() => {
    const revealTimer = setInterval(() => {
      setRevealed((prev) => (prev < title.length ? prev + 1 : prev));
    }, 180);

    const totalReveal = title.length * 180 + 500;
    const fallTimer = setTimeout(() => setFalling(true), totalReveal);
    const navigateTimer = setTimeout(() => navigate('/intro', { replace: true }), totalReveal + 1200);

    return () => {
      clearInterval(revealTimer);
      clearTimeout(fallTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate, title.length]);

  const letters = useMemo(() => title.split(''), []);

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#3D2B1F] flex items-center justify-center overflow-hidden">
      <div className="text-center px-6">
        <div className="h-32 flex items-center justify-center flex-wrap gap-1">
          <AnimatePresence>
            {letters.map((letter, index) => {
              const show = index < revealed;
              return (
                <motion.span
                  key={`${letter}-${index}`}
                  initial={{ opacity: 0, y: 0, rotate: 0 }}
                  animate={falling ? { opacity: 0, y: 120 + index * 10, rotate: 12 } : { opacity: show ? 1 : 0, y: 0, rotate: 0 }}
                  transition={falling ? { duration: 0.55, delay: index * 0.04, ease: 'easeOut' } : { duration: 0.18 }}
                  className="font-[Georgia,Times_New_Roman,serif] text-4xl md:text-5xl font-black tracking-[0.18em] italic"
                >
                  {letter}
                </motion.span>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, Heart } from 'lucide-react';
import { theme } from '@/lib/theme';

const floatingElements = [
  { Icon: Star, delay: 0, x: -100, y: -100 },
  { Icon: Sparkles, delay: 0.2, x: 100, y: -50 },
  { Icon: Heart, delay: 0.4, x: -50, y: 100 },
  { Icon: Star, delay: 0.6, x: 100, y: 100 },
];

export function LoadingScreen() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 flex items-center justify-center z-50 overflow-hidden"
      >
        {/* Background animated circles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              initial={{
                scale: 0,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                scale: [0, 2, 0],
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              style={{
                width: '200px',
                height: '200px',
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative">
          {/* Floating elements */}
          {floatingElements.map(({ Icon, delay, x, y }, index) => (
            <motion.div
              key={index}
              className="absolute"
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: x,
                y: y,
              }}
              transition={{
                duration: 3,
                delay: delay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <Icon className="w-6 h-6 text-white/40" />
            </motion.div>
          ))}

          {/* Central logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 1.5,
            }}
            className="relative z-10 bg-white/10 rounded-full p-8 backdrop-blur-lg"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Star className="w-24 h-24 text-yellow-300" strokeWidth={1.5} />
            </motion.div>
          </motion.div>

          {/* Text elements */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-5xl font-bold text-white"
            >
              Tares
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 space-y-2"
            >
              <p className="text-purple-200 text-lg">
                
              </p>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center justify-center gap-2 text-purple-200/80"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, CheckSquare, Gift, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { routes } from '@/lib/routes';

const navItems = [
  { icon: Home, path: routes.home, translationKey: 'nav.home' },
  { icon: CheckSquare, path: routes.tasks, translationKey: 'nav.tasks' },
  { icon: Gift, path: routes.rewards, translationKey: 'nav.rewards' },
  { icon: Settings, path: routes.settings, translationKey: 'nav.settings' },
];

const navVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  })
};

const activeIconVariants = {
  inactive: { 
    scale: 1,
    rotate: 0 
  },
  active: { 
    scale: 1,
    rotate: 360,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

export function Navbar() {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center">
          {navItems.map(({ icon: Icon, path, translationKey }, index) => {
            const isActive = location.pathname === path;
            
            return (
              <Link
                key={path}
                to={path}
                className="relative px-4 py-2"
              >
                <motion.div
                  custom={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-1"
                >
                  <motion.div
                    variants={activeIconVariants}
                    animate={isActive ? "active" : "inactive"}
                    className="relative"
                  >
                    <Icon className={cn(
                      "w-6 h-6 transition-all duration-300",
                      isActive 
                        ? "text-violet-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" 
                        : "text-gray-500"
                    )} />
                    {isActive && (
                      <motion.div
                        layoutId="nav-glow"
                        className="absolute inset-0 blur-xl bg-violet-500/30"
                        transition={{ type: "spring", bounce: 0.2 }}
                      />
                    )}
                  </motion.div>
                  <motion.span
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      color: isActive ? "rgb(139, 92, 246)" : "rgb(107, 114, 128)"
                    }}
                    className="text-xs font-medium transition-all duration-300"
                  >
                    {t(translationKey)}
                  </motion.span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
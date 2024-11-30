import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import confetti from 'canvas-confetti';
import { Reward } from '@/lib/types';

interface RewardPurchasedDialogProps {
  reward: Reward | null;
  onClose: () => void;
}

export function RewardPurchasedDialog({ reward, onClose }: RewardPurchasedDialogProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (reward) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [reward]);

  return (
    <Dialog open={!!reward} onOpenChange={() => onClose()}>
      <DialogContent className="bg-transparent border-none shadow-none">
        <DialogHeader>
          <DialogTitle className="sr-only">{t('rewards.congratulations.title')}</DialogTitle>
        </DialogHeader>
        <AnimatePresence>
          {reward && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl text-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
                className="text-6xl mb-4"
              >
                {reward.emoji}
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">{t('rewards.congratulations.title')}</h2>
              <p className="text-lg mb-4">{t('rewards.congratulations.earned')}</p>
              <p className="text-xl font-semibold text-violet-500 mb-6">
                {reward.title}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {reward.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
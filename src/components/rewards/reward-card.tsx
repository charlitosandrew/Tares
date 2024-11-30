import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Reward } from '@/lib/types';
import { cn } from '@/lib/utils';

interface RewardCardProps {
  reward: Reward;
  points: number;
  onPurchase: (reward: Reward) => void;
  onDelete: (rewardId: string) => void;
}

export const RewardCard = forwardRef<HTMLDivElement, RewardCardProps>(
  ({ reward, points, onPurchase, onDelete }, ref) => {
    const { t } = useTranslation();

    return (
      <motion.div
        ref={ref}
        layout
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        whileHover={{ scale: 1.02 }}
        className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700"
      >
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="text-3xl p-3 bg-violet-50 dark:bg-violet-900/20 rounded-xl"
          >
            {reward.emoji}
          </motion.div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{reward.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {reward.description}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant={points >= reward.points ? "default" : "outline"}
              className={cn(
                "gap-2",
                points >= reward.points && "animate-pulse"
              )}
              disabled={points < reward.points}
              onClick={() => onPurchase(reward)}
            >
              <Sparkles className="w-4 h-4" />
              {reward.points} {t('common.points')}
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t('rewards.actions.delete')}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('rewards.actions.deleteConfirm')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('tasks.actions.cancel')}</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(reward.id)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    {t('rewards.actions.delete')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </motion.div>
    );
  }
);
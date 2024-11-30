import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AddRewardDialog } from '@/components/rewards/add-reward-dialog';
import { RewardCard } from '@/components/rewards/reward-card';
import { RewardPurchasedDialog } from '@/components/rewards/reward-purchased-dialog';
import { useAppStore } from '@/lib/store';
import { Reward } from '@/lib/types';

export function RewardsPage() {
  const [purchasedReward, setPurchasedReward] = useState<Reward | null>(null);
  const { points, rewards, addReward, deleteReward, purchaseReward } = useAppStore();
  const { t } = useTranslation();
  
  const nextReward = rewards.find(r => r.points > points) || rewards[0];
  const progress = nextReward ? (points / nextReward.points) * 100 : 0;

  const handlePurchase = (reward: Reward) => {
    purchaseReward(reward.id);
    setPurchasedReward(reward);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6 pb-24"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('rewards.title')}</h1>
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 dark:from-amber-500/20 dark:to-yellow-500/20 px-4 py-2 rounded-xl border border-amber-200/20">
          <Star className="w-5 h-5 text-amber-500" />
          <span className="font-semibold text-amber-700 dark:text-amber-300">
            {points} {t('common.points')}
          </span>
        </div>
      </div>

      {nextReward && (
        <Card className="p-6 bg-gradient-to-br from-violet-500 to-purple-600 border-0">
          <div className="flex items-center gap-4 text-white mb-4">
            <div className="p-3 bg-white/10 rounded-xl">
              <Gift className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{t('rewards.nextReward')}</h3>
              <p className="text-violet-200 text-sm">{nextReward.title}</p>
            </div>
          </div>
          <Progress value={progress} className="mb-2" />
          <p className="text-sm text-violet-200">
            {t('rewards.pointsToGo', { points: nextReward.points - points })}
          </p>
        </Card>
      )}

      <div className="flex justify-end">
        <AddRewardDialog onAddReward={addReward} />
      </div>

      <motion.div layout className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              points={points}
              onPurchase={handlePurchase}
              onDelete={deleteReward}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <RewardPurchasedDialog
        reward={purchasedReward}
        onClose={() => setPurchasedReward(null)}
      />
    </motion.div>
  );
}
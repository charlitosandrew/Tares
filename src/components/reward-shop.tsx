import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Gift } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Reward } from '@/lib/types';
import { INITIAL_REWARDS } from '@/lib/data';
import { cn } from '@/lib/utils';

interface RewardShopProps {
  points: number;
  onPurchase: (reward: Reward) => void;
}

export function RewardShop({ points, onPurchase }: RewardShopProps) {
  const [rewards, setRewards] = useState<Reward[]>(INITIAL_REWARDS);
  const [open, setOpen] = useState(false);

  const handlePurchase = (reward: Reward) => {
    if (points >= reward.points && reward.available) {
      onPurchase(reward);
      setRewards(rewards.map(r => 
        r.id === reward.id ? { ...r, available: false } : r
      ));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600"
        >
          <ShoppingBag className="h-5 w-5" />
          Reward Shop
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Reward Shop
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <AnimatePresence mode="popLayout">
            {rewards.map((reward) => (
              <motion.div
                key={reward.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={cn(
                  'p-4 rounded-xl border-2 transition-colors duration-300',
                  reward.available
                    ? points >= reward.points
                      ? 'border-emerald-500/50 bg-white dark:bg-gray-800'
                      : 'border-gray-200 bg-gray-50 dark:bg-gray-800/50'
                    : 'border-gray-200 bg-gray-100 opacity-50'
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-3xl">{reward.emoji}</span>
                  <span className="text-lg font-bold text-emerald-500">
                    {reward.points} pts
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{reward.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {reward.description}
                </p>
                <Button
                  className="w-full"
                  disabled={!reward.available || points < reward.points}
                  onClick={() => handlePurchase(reward)}
                  variant={reward.available ? 'default' : 'secondary'}
                >
                  {!reward.available
                    ? 'Claimed'
                    : points < reward.points
                    ? 'Not Enough Points'
                    : 'Claim Reward'}
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
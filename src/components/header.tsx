import { motion } from 'framer-motion';
import { Trophy, Sparkles } from 'lucide-react';
import { AddTaskDialog } from './add-task-dialog';
import { RewardShop } from './reward-shop';
import { Task, Reward } from '@/lib/types';

interface HeaderProps {
  points: number;
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  onPurchaseReward: (reward: Reward) => void;
}

export function Header({ points, onAddTask, onPurchaseReward }: HeaderProps) {
  return (
    <div className="sticky top-0 z-10 backdrop-blur-md bg-white/50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800 mb-8 py-4">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Trophy className="h-8 w-8 text-amber-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
              KidsTasks
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <motion.div
              className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-5 w-5 text-amber-500" />
              <span className="text-xl font-bold text-amber-500">{points} points</span>
            </motion.div>
            
            <div className="flex gap-2">
              <AddTaskDialog onAddTask={onAddTask} />
              <RewardShop points={points} onPurchase={onPurchaseReward} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
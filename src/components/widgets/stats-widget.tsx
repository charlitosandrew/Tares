import { motion } from 'framer-motion';
import { Trophy, Target, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsWidgetProps {
  totalTasks: number;
  completedTasks: number;
  totalPoints: number;
  streak: number;
}

export function StatsWidget({ totalTasks, completedTasks, totalPoints, streak }: StatsWidgetProps) {
  const stats = [
    {
      icon: Target,
      label: 'Completion Rate',
      value: totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0,
      suffix: '%',
      color: 'text-emerald-500',
    },
    {
      icon: Trophy,
      label: 'Total Points',
      value: totalPoints,
      suffix: 'pts',
      color: 'text-amber-500',
    },
    {
      icon: Calendar,
      label: 'Day Streak',
      value: streak,
      suffix: 'days',
      color: 'text-violet-500',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map(({ icon: Icon, label, value, suffix, color }, index) => (
        <Card key={label} className="relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4"
          >
            <Icon className={cn('w-6 h-6 mb-2', color)} />
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-2xl font-bold">
              {value}
              <span className="text-sm font-normal text-gray-500 ml-1">
                {suffix}
              </span>
            </p>
          </motion.div>
        </Card>
      ))}
    </div>
  );
}
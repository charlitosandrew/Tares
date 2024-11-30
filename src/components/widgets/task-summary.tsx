import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Task } from '@/lib/types';

interface TaskSummaryProps {
  tasks: Task[];
}

export function TaskSummary({ tasks }: TaskSummaryProps) {
  const activeTasks = tasks.filter(t => !t.completed).length;
  const completedTasks = tasks.filter(t => t.completed).length;

  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900">
          <h3 className="font-medium text-emerald-900 dark:text-emerald-100">Active Tasks</h3>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {activeTasks}
          </p>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-4 bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-900">
          <h3 className="font-medium text-violet-900 dark:text-violet-100">Completed</h3>
          <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
            {completedTasks}
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
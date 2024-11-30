import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '@/lib/types';
import { TaskCard } from './task-card';

interface TaskListProps {
  tasks: Task[];
  onComplete: (taskId: string) => void;
}

export function TaskList({ tasks, onComplete }: TaskListProps) {
  return (
    <AnimatePresence mode="popLayout">
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 dark:text-gray-400">
              No tasks yet! Click the "Add New Task" button to get started.
            </p>
          </motion.div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={onComplete}
            />
          ))
        )}
      </div>
    </AnimatePresence>
  );
}
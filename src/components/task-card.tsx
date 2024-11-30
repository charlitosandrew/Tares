import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, Clock, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onComplete: (taskId: string) => void;
}

export function TaskCard({ task, onComplete }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'relative p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800',
        'border-2 transition-all duration-300',
        task.completed ? 'border-green-500/50' : 'border-transparent hover:border-violet-500/50'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="text-4xl"
          >
            {task.emoji}
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold">{task.title}</h3>
            {task.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {task.description}
              </p>
            )}
            {task.dueDate && (
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{format(task.dueDate, 'PPP')}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1 text-amber-500 font-semibold">
            <Trophy className="w-4 h-4" />
            <span>+{task.points}</span>
          </div>
          <Button
            variant={task.completed ? "ghost" : "default"}
            size="icon"
            onClick={() => onComplete(task.id)}
            className={cn(
              'transition-all duration-300',
              task.completed ? 'text-green-500' : 'text-gray-400 hover:text-green-500'
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={task.completed ? 'completed' : 'incomplete'}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                {task.completed ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : (
                  <Circle className="h-6 w-6" />
                )}
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
      </div>
      
      {isHovered && !task.completed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-violet-500 font-medium bg-white dark:bg-gray-800 px-2 py-1 rounded-full shadow-lg"
        >
          Click to complete
        </motion.div>
      )}
    </motion.div>
  );
}
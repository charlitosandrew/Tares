import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Task } from '@/lib/types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { parseDate } from '@/lib/utils/date';

interface TimeSlotProps {
  task: Task;
  color?: 'blue' | 'pink' | 'purple' | 'orange';
}

const colorVariants = {
  blue: 'bg-blue-50 dark:bg-blue-900/20',
  pink: 'bg-pink-50 dark:bg-pink-900/20',
  purple: 'bg-violet-50 dark:bg-violet-900/20',
  orange: 'bg-orange-50 dark:bg-orange-900/20',
};

export function TimeSlot({ task, color = 'blue' }: TimeSlotProps) {
  const date = parseDate(task.dueDate);
  
  return (
    <div className={cn('rounded-xl p-4 mb-4', colorVariants[color])}>
      <div className="flex items-start gap-3">
        <div className="text-sm font-medium">
          {date && format(date, 'hh:mm a')}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{task.emoji}</span>
            <h3 className="font-medium">{task.title}</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {task.description}
          </p>
          {task.assignedTo && (
            <div className="flex -space-x-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Avatar key={i} className="h-6 w-6 border-2 border-white">
                  <AvatarImage src={`https://github.com/shadcn${i}.png`} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Clock, Trash2, RotateCcw } from 'lucide-react';
import { Task } from '@/lib/types';
import { format, parseISO } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const { t } = useTranslation();

  const getFormattedTime = (date: Date | string | undefined) => {
    if (!date) return null;
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, 'h:mm a');
  };

  const startTime = getFormattedTime(task.dueDate);
  const endTime = task.dueDate 
    ? getFormattedTime(new Date(new Date(task.dueDate).getTime() + 3600000))
    : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-violet-50 dark:bg-violet-900/20 rounded-xl">
            {task.emoji}
          </div>
          <div>
            <h3 className="font-semibold mb-1">{task.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {task.description}
            </p>
            {startTime && endTime && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{startTime} - {endTime}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggle(task.id)}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('tasks.actions.delete')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('tasks.actions.deleteConfirm')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('tasks.actions.cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(task.id)} className="bg-red-500 hover:bg-red-600">
                  {t('tasks.actions.delete')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
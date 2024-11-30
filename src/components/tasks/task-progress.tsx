import { useTranslation } from 'react-i18next';
import { Progress } from '@/components/ui/progress';
import { Rocket } from 'lucide-react';

interface TaskProgressProps {
  completed: number;
  total: number;
}

export function TaskProgress({ completed, total }: TaskProgressProps) {
  const { t } = useTranslation();
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Rocket className="h-5 w-5 text-violet-500" />
        <h2 className="font-semibold">{t('tasks.progress.title')}</h2>
      </div>
      <Progress value={percentage} className="mb-2" />
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>
          {completed}/{total} {t('tasks.progress.tasksComplete')}
        </span>
        <span>{Math.round(percentage)}%</span>
      </div>
    </div>
  );
}
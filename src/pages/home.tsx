import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/layout/header';
import { TaskProgress } from '@/components/tasks/task-progress';
import { TaskTabs, TaskFilter } from '@/components/tasks/task-tabs';
import { TaskItem } from '@/components/tasks/task-item';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { CreateTaskDialog } from '@/components/tasks/create-task-dialog';
import { useAppStore } from '@/lib/store';
import { Plus } from 'lucide-react';

export function HomePage() {
  const [activeTab, setActiveTab] = useState<TaskFilter>('today');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { tasks, completeTask, deleteTask, userSettings } = useAppStore();
  const { t } = useTranslation();
  
  const completedTasks = tasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-6">
          {t('common.welcome')} {userSettings.name}! 👋
        </h1>
        
        <TaskProgress completed={completedTasks} total={tasks.length} />
        <TaskTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">{t('tasks.myTasks')}</h2>
          <span className="text-sm text-violet-500">
            {tasks.length} {t('common.tasks')}
          </span>
        </div>

        <div className="space-y-4 pb-24">
          {tasks.length === 0 ? (
            <p className="text-center py-12 text-gray-500 dark:text-gray-400">
              {t('common.noTasks')}
            </p>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={completeTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>

        <FloatingActionButton
          icon={Plus}
          onClick={() => setCreateDialogOpen(true)}
        />

        <CreateTaskDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
        />
      </main>
    </div>
  );
}
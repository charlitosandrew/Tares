import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarHeader } from '@/components/tasks/calendar-header';
import { CalendarGrid } from '@/components/tasks/calendar-grid';
import { TimeSlot } from '@/components/tasks/time-slot';
import { CreateTaskDialog } from '@/components/tasks/create-task-dialog';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { Plus } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { addMonths, subMonths } from 'date-fns';
import { compareDates } from '@/lib/utils/date';

export function TasksPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { tasks } = useAppStore();
  const { t } = useTranslation();

  const todayTasks = tasks
    .filter(task => task.dueDate)
    .sort((a, b) => compareDates(a.dueDate, b.dueDate));

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      
      <CalendarGrid
        currentDate={currentDate}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold flex items-center gap-2">
            {t('tasks.todayTasks')}
            <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {todayTasks.length}
            </span>
          </h2>
        </div>

        <div className="space-y-4 pb-24">
          {todayTasks.map((task, index) => (
            <TimeSlot
              key={task.id}
              task={task}
              color={['blue', 'pink', 'purple', 'orange'][index % 4] as any}
            />
          ))}
        </div>
      </div>

      <FloatingActionButton
        icon={Plus}
        onClick={() => setCreateDialogOpen(true)}
      />

      <CreateTaskDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  );
}
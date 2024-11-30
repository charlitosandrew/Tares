import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { DatePicker } from '@/components/ui/date-picker';
import { TimePicker } from '@/components/tasks/time-picker';
import { TaskIconSelect } from '@/components/tasks/task-icon-select';
import { RepeatSelect } from '@/components/tasks/repeat-select';
import { useAppStore } from '@/lib/store';
import { MoreVertical, ArrowLeft } from 'lucide-react';

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTaskDialog({ open, onOpenChange }: CreateTaskDialogProps) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('📝');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [startTime, setStartTime] = useState<string>('09:00');
  const [repeat, setRepeat] = useState(false);
  const [repeatInterval, setRepeatInterval] = useState<'daily' | 'weekly'>('weekly');
  const [repeatDays, setRepeatDays] = useState<string[]>([]);

  const addTask = useAppStore((state) => state.addTask);

  const handleSubmit = () => {
    if (!title.trim()) return;

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const taskDate = selectedDate || new Date();
    taskDate.setHours(startHour, startMinute);

    addTask({
      title,
      description,
      emoji: selectedIcon,
      points: 10,
      dueDate: taskDate,
    });

    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedIcon('📝');
    setSelectedDate(undefined);
    setStartTime('09:00');
    setRepeat(false);
    setRepeatInterval('weekly');
    setRepeatDays([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="sr-only">{t('tasks.createNew')}</DialogTitle>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button onClick={handleSubmit} className="bg-violet-500 hover:bg-violet-600">
              {t('tasks.form.save')}
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div className="flex items-start gap-4">
            <TaskIconSelect value={selectedIcon} onChange={setSelectedIcon} />
            <div className="flex-1 space-y-4">
              <Input
                placeholder={t('tasks.form.titlePlaceholder')}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-medium"
              />
              <Input
                placeholder={t('tasks.form.descriptionPlaceholder')}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>{t('tasks.form.dateAndTime')}</Label>
            <DatePicker date={selectedDate} onSelect={setSelectedDate} />
            <TimePicker 
              label={t('tasks.form.startTime')} 
              value={startTime} 
              onChange={setStartTime} 
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>{t('tasks.form.repeat')}</Label>
              <Switch checked={repeat} onCheckedChange={setRepeat} />
            </div>
            {repeat && (
              <RepeatSelect
                interval={repeatInterval}
                onIntervalChange={setRepeatInterval}
                selectedDays={repeatDays}
                onDaysChange={setRepeatDays}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
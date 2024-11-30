import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const TASK_ICONS = ['📝', '🎯', '📚', '💻', '🎨', '🏃‍♂️', '🤝', '🗣️', '📅', '🎭'];

interface TaskIconSelectProps {
  value: string;
  onChange: (icon: string) => void;
}

export function TaskIconSelect({ value, onChange }: TaskIconSelectProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        "h-12 w-12 rounded-xl text-2xl",
        "bg-violet-50 dark:bg-violet-900/20 border-0"
      )}
      onClick={() => {
        const currentIndex = TASK_ICONS.indexOf(value);
        const nextIndex = (currentIndex + 1) % TASK_ICONS.length;
        onChange(TASK_ICONS[nextIndex]);
      }}
    >
      {value}
    </Button>
  );
}
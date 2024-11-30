import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface RepeatSelectProps {
  interval: 'daily' | 'weekly';
  onIntervalChange: (interval: 'daily' | 'weekly') => void;
  selectedDays: string[];
  onDaysChange: (days: string[]) => void;
}

const DAYS = [
  { key: 'sun', label: 'S' },
  { key: 'mon', label: 'M' },
  { key: 'tue', label: 'T' },
  { key: 'wed', label: 'W' },
  { key: 'thu', label: 'T' },
  { key: 'fri', label: 'F' },
  { key: 'sat', label: 'S' },
];

export function RepeatSelect({
  interval,
  onIntervalChange,
  selectedDays,
  onDaysChange,
}: RepeatSelectProps) {
  const toggleDay = (dayKey: string) => {
    onDaysChange(
      selectedDays.includes(dayKey)
        ? selectedDays.filter((d) => d !== dayKey)
        : [...selectedDays, dayKey]
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Select value={interval} onValueChange={onIntervalChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
          </SelectContent>
        </Select>

        <Select value="1">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Every 1 week</SelectItem>
            <SelectItem value="2">Every 2 weeks</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between">
        {DAYS.map(({ key, label }) => (
          <Button
            key={key}
            variant="outline"
            size="sm"
            className={cn(
              "h-8 w-8 p-0 rounded-full",
              selectedDays.includes(key) && "bg-violet-500 text-white"
            )}
            onClick={() => toggleDay(key)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
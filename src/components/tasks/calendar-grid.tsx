import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function CalendarGrid({ currentDate, selectedDate, onSelectDate }: CalendarGridProps) {
  const weekStart = startOfWeek(currentDate);
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="p-4">
      <div className="grid grid-cols-7 gap-4 mb-4">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: 7 }).map((_, index) => {
          const date = addDays(weekStart, index);
          const isSelected = isSameDay(date, selectedDate);
          const hasTask = index === 3; // Example: task on Thursday

          return (
            <button
              key={index}
              onClick={() => onSelectDate(date)}
              className={cn(
                "flex flex-col items-center justify-center h-10 w-10 rounded-full relative",
                isSelected && "bg-violet-500 text-white",
                !isSelected && "hover:bg-violet-50"
              )}
            >
              <span className="text-sm">{format(date, 'd')}</span>
              {hasTask && (
                <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-violet-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
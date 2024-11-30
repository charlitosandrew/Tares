import { ChevronLeft, ChevronRight, ChevronDown, Calendar as CalendarIcon, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function CalendarHeader({ currentDate, onPrevMonth, onNextMonth }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <div className="flex items-center gap-2">
        <CalendarIcon className="h-5 w-5" />
        <span className="font-semibold">{format(currentDate, 'MMM yyyy')}</span>
        <Button variant="ghost" size="icon">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <Button variant="ghost" size="icon">
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
}
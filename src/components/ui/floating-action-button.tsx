import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FloatingActionButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
}

export function FloatingActionButton({ icon: Icon, onClick, className }: FloatingActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className={cn(
        "fixed right-4 bottom-24 h-14 w-14 rounded-full shadow-lg",
        "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700",
        "transition-all duration-300 hover:scale-105",
        "flex items-center justify-center",
        className
      )}
    >
      <Icon className="h-6 w-6 text-white" />
    </Button>
  );
}
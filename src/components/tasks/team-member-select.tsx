import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const TEAM_MEMBERS = [
  { id: '1', name: 'John', avatar: 'https://github.com/shadcn.png' },
  { id: '2', name: 'Jane', avatar: 'https://github.com/shadcn.png' },
  { id: '3', name: 'Bob', avatar: 'https://github.com/shadcn.png' },
  { id: '4', name: 'Alice', avatar: 'https://github.com/shadcn.png' },
];

interface TeamMemberSelectProps {
  value: string[];
  onChange: (members: string[]) => void;
}

export function TeamMemberSelect({ value, onChange }: TeamMemberSelectProps) {
  const toggleMember = (id: string) => {
    onChange(
      value.includes(id)
        ? value.filter((m) => m !== id)
        : [...value, id]
    );
  };

  return (
    <div className="flex items-center gap-2">
      {TEAM_MEMBERS.map((member) => (
        <Avatar
          key={member.id}
          className={cn(
            "h-10 w-10 cursor-pointer transition-transform",
            "hover:scale-110",
            value.includes(member.id) && "ring-2 ring-violet-500"
          )}
          onClick={() => toggleMember(member.id)}
        >
          <AvatarImage src={member.avatar} />
          <AvatarFallback>{member.name[0]}</AvatarFallback>
        </Avatar>
      ))}
      <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
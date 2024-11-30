import { useState } from 'react';
import { Bell, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserSettingsDialog } from '@/components/user/user-settings-dialog';
import { useAppStore } from '@/lib/store';

export function Header() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { points, userSettings } = useAppStore();

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <Avatar 
            className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-violet-500 transition-all"
            onClick={() => setSettingsOpen(true)}
          >
            <AvatarImage src={userSettings.avatar} />
            <AvatarFallback>{userSettings.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1">
            <span className="text-amber-500">🪙</span>
            <span className="font-semibold">{points}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <UserSettingsDialog 
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </>
  );
}
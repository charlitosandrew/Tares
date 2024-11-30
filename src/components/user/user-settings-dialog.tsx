import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { UserSettings } from '@/lib/types';
import { AvatarUpload } from './avatar-upload';

interface UserSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserSettingsDialog({ open, onOpenChange }: UserSettingsDialogProps) {
  const { t } = useTranslation();
  const { userSettings, updateUserSettings } = useAppStore();
  const [settings, setSettings] = useState<UserSettings>(userSettings);

  const handleSave = () => {
    updateUserSettings(settings);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            {t('settings.profile.title', 'Profile Settings')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <Label>{t('settings.profile.avatar', 'Profile Picture')}</Label>
            <AvatarUpload
              currentAvatar={settings.avatar}
              onAvatarChange={(avatar) => setSettings({ ...settings, avatar })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">{t('settings.profile.name', 'Display Name')}</Label>
            <Input
              id="name"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t('settings.profile.email', 'Email')}</Label>
            <Input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{t('settings.profile.notifications', 'Notifications')}</Label>
              <p className="text-sm text-muted-foreground">
                {t('settings.profile.notificationsDesc', 'Receive task reminders and updates')}
              </p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, notifications: checked })
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('common.cancel', 'Cancel')}
          </Button>
          <Button onClick={handleSave}>
            {t('common.save', 'Save Changes')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
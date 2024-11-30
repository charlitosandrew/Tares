import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

const EMOJI_OPTIONS = ['🎮', '🎬', '🍕', '🎲', '🎡', '🎨', '🎭', '🎯', '🎸', '🎺', '📱', '💻', '📚', '🎁', '🌟'];

interface AddRewardDialogProps {
  onAddReward: (reward: { title: string; emoji: string; points: number; description: string }) => void;
}

export function AddRewardDialog({ onAddReward }: AddRewardDialogProps) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(EMOJI_OPTIONS[0]);
  const [points, setPoints] = useState(50);
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddReward({
      title,
      emoji: selectedEmoji,
      points,
      description,
    });
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setSelectedEmoji(EMOJI_OPTIONS[0]);
    setPoints(50);
    setDescription('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600"
        >
          <Plus className="h-5 w-5" />
          {t('rewards.addNew')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('rewards.createNew')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>{t('rewards.form.chooseEmoji')}</Label>
            <div className="grid grid-cols-5 gap-2">
              {EMOJI_OPTIONS.map((emoji) => (
                <motion.button
                  key={emoji}
                  type="button"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`text-2xl p-2 rounded-lg ${
                    selectedEmoji === emoji
                      ? 'bg-emerald-100 dark:bg-emerald-900'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">{t('rewards.form.title')}</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('rewards.form.titlePlaceholder')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="points">{t('rewards.form.points')}</Label>
            <Input
              id="points"
              type="number"
              min="1"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t('rewards.form.description')}</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('rewards.form.descriptionPlaceholder')}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            {t('rewards.form.create')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
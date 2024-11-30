import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type TaskFilter = 'recent' | 'today' | 'upcoming';

interface TaskTabsProps {
  activeTab: TaskFilter;
  onTabChange: (value: TaskFilter) => void;
}

export function TaskTabs({ activeTab, onTabChange }: TaskTabsProps) {
  const { t } = useTranslation();

  return (
    <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as TaskFilter)} className="mb-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="recent">{t('tasks.filters.recent')}</TabsTrigger>
        <TabsTrigger value="today">{t('tasks.filters.today')}</TabsTrigger>
        <TabsTrigger value="upcoming">{t('tasks.filters.upcoming')}</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
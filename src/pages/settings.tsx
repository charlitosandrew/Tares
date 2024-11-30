import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Bell, Shield, Palette, Globe, Lock, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export function SettingsPage() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  const settingsSections = [
    {
      icon: Sun,
      title: t('settings.appearance.title'),
      description: t('settings.appearance.description'),
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      options: [
        { 
          label: t('settings.appearance.darkMode'), 
          type: 'switch',
          checked: theme === 'dark',
          onCheckedChange: () => setTheme(theme === 'dark' ? 'light' : 'dark')
        },
        { 
          label: t('settings.appearance.colorTheme'), 
          type: 'button', 
          action: t('settings.actions.customize') 
        }
      ]
    },
    {
      icon: Globe,
      title: t('settings.language.title'),
      description: t('settings.language.description'),
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      options: [
        {
          label: t('settings.language.title'),
          type: 'select',
          value: i18n.language,
          onChange: (value: string) => i18n.changeLanguage(value),
          items: [
            { value: 'en', label: t('settings.language.options.en') },
            { value: 'es', label: t('settings.language.options.es') }
          ]
        }
      ]
    },
    {
      icon: Bell,
      title: t('settings.notifications.title'),
      description: t('settings.notifications.description'),
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      options: [
        { label: t('settings.notifications.push'), type: 'switch' },
        { label: t('settings.notifications.taskReminders'), type: 'switch' }
      ]
    },
    {
      icon: Lock,
      title: t('settings.privacy.title'),
      description: t('settings.privacy.description'),
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      options: [
        { label: t('settings.privacy.dataSharing'), type: 'switch' },
        { label: t('settings.privacy.privacySettings'), type: 'button', action: t('settings.actions.manage') }
      ]
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-24"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('settings.title')}</h1>
        <Button variant="ghost" size="icon">
          <HelpCircle className="w-5 h-5" />
        </Button>
      </motion.div>

      {settingsSections.map((section, index) => (
        <motion.div
          key={section.title}
          variants={itemVariants}
          custom={index}
        >
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className={cn("p-3 rounded-xl", section.bgColor)}>
                <section.icon className={cn("w-6 h-6", section.color)} />
              </div>
              <div>
                <h2 className="font-semibold text-lg">{section.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {section.description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {section.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <div className="flex items-center justify-between py-2">
                    <p className="font-medium">{option.label}</p>
                    {option.type === 'switch' ? (
                      <Switch 
                        checked={option.checked} 
                        onCheckedChange={option.onCheckedChange}
                      />
                    ) : option.type === 'select' ? (
                      <Select value={option.value} onValueChange={option.onChange}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {option.items?.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Button variant="outline" size="sm">
                        {option.action}
                      </Button>
                    )}
                  </div>
                  {optionIndex < section.options.length - 1 && (
                    <Separator className="my-2" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      ))}

      <motion.div
        variants={itemVariants}
        className="text-center space-y-2 mt-8 text-sm text-gray-500 dark:text-gray-400"
      >
        <p>{t('common.version')}</p>
        <div className="flex items-center justify-center gap-2">
          <span>{t('common.madeWith')}</span>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            ❤️
          </motion.div>
          <span>{t('common.by')}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
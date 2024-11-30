import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, Reward, UserSettings } from './types';
import { INITIAL_REWARDS } from './data';

interface AppState {
  tasks: Task[];
  rewards: Reward[];
  points: number;
  streak: number;
  theme: 'light' | 'dark' | 'system';
  userSettings: UserSettings;
  lastCompletedDate?: string;
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  deleteTask: (taskId: string) => void;
  completeTask: (taskId: string) => void;
  addReward: (reward: Omit<Reward, 'id' | 'available'>) => void;
  deleteReward: (rewardId: string) => void;
  purchaseReward: (rewardId: string) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  updateUserSettings: (settings: Partial<UserSettings>) => void;
}

const DEFAULT_USER_SETTINGS: UserSettings = {
  name: 'User',
  avatar: '',
  email: '',
  notifications: true,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      tasks: [],
      rewards: INITIAL_REWARDS,
      points: 0,
      streak: 0,
      theme: 'system',
      userSettings: DEFAULT_USER_SETTINGS,
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: crypto.randomUUID(),
              completed: false,
              dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : undefined,
            },
          ],
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== taskId),
        })),
      completeTask: (taskId) =>
        set((state) => {
          const task = state.tasks.find((t) => t.id === taskId);
          if (!task || task.completed) return state;

          const today = new Date().toDateString();
          const lastCompleted = state.lastCompletedDate;
          const isConsecutiveDay = lastCompleted === new Date(Date.now() - 86400000).toDateString();

          return {
            tasks: state.tasks.map((t) =>
              t.id === taskId ? { ...t, completed: true } : t
            ),
            points: state.points + task.points,
            streak: isConsecutiveDay ? state.streak + 1 : 1,
            lastCompletedDate: today,
          };
        }),
      addReward: (reward) =>
        set((state) => ({
          rewards: [
            ...state.rewards,
            {
              ...reward,
              id: crypto.randomUUID(),
              available: true,
            },
          ],
        })),
      deleteReward: (rewardId) =>
        set((state) => ({
          rewards: state.rewards.filter((r) => r.id !== rewardId),
        })),
      purchaseReward: (rewardId) =>
        set((state) => {
          const reward = state.rewards.find((r) => r.id === rewardId);
          if (!reward || !reward.available || state.points < reward.points) return state;
          
          return {
            points: state.points - reward.points,
            rewards: state.rewards.map((r) =>
              r.id === rewardId ? { ...r, available: false } : r
            ),
          };
        }),
      setTheme: (theme) => set({ theme }),
      updateUserSettings: (settings) =>
        set((state) => ({
          userSettings: { ...state.userSettings, ...settings },
        })),
    }),
    {
      name: 'tares-storage',
    }
  )
);
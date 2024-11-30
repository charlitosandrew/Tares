export interface Task {
  id: string;
  title: string;
  emoji: string;
  points: number;
  description?: string;
  completed: boolean;
  dueDate?: string;
  assignedTo?: string;
}

export interface Reward {
  id: string;
  title: string;
  emoji: string;
  points: number;
  description?: string;
  available: boolean;
}

export interface Child {
  id: string;
  name: string;
  avatar?: string;
  points: number;
  completedTasks: string[];
  rewards: string[];
}

export interface UserSettings {
  name: string;
  avatar: string;
  email: string;
  notifications: boolean;
}
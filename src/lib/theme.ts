// Color palette for the application
export const theme = {
  colors: {
    primary: {
      light: '#8B5CF6', // Violet
      DEFAULT: '#7C3AED',
      dark: '#6D28D9',
    },
    secondary: {
      light: '#F472B6', // Pink
      DEFAULT: '#EC4899',
      dark: '#DB2777',
    },
    accent: {
      light: '#34D399', // Emerald
      DEFAULT: '#10B981',
      dark: '#059669',
    },
    success: {
      light: '#4ADE80',
      DEFAULT: '#22C55E',
      dark: '#16A34A',
    },
    warning: {
      light: '#FCD34D',
      DEFAULT: '#F59E0B',
      dark: '#D97706',
    },
    info: {
      light: '#60A5FA',
      DEFAULT: '#3B82F6',
      dark: '#2563EB',
    },
  },
  gradients: {
    primary: 'from-violet-500 to-purple-600',
    secondary: 'from-pink-500 to-rose-500',
    accent: 'from-emerald-400 to-teal-500',
    loading: 'from-violet-600 via-purple-600 to-fuchsia-600',
  },
} as const;
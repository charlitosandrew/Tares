import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from '@/components/theme-provider';
import './lib/i18n';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="tares-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
);
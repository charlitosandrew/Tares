import { parseISO } from 'date-fns';

export function parseDate(date: string | Date | undefined): Date | undefined {
  if (!date) return undefined;
  return typeof date === 'string' ? parseISO(date) : date;
}

export function compareDates(a: string | undefined, b: string | undefined): number {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;
  
  const dateA = parseISO(a);
  const dateB = parseISO(b);
  return dateA.getTime() - dateB.getTime();
}
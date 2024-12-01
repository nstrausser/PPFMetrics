import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isSameDay, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, formatStr: string = 'PP') {
  return format(date, formatStr);
}

export function parseISODate(dateStr: string) {
  return parseISO(dateStr);
}

export function isSameDayDate(date1: Date, date2: Date) {
  return isSameDay(date1, date2);
}
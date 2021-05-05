import {
  lastDayOfMonth, startOfMonth, isSameDay, isAfter, isBefore,
} from 'date-fns';
import { Dates, CellType } from './interfaces';

export const getDaysInMonth = (date: Date): Array<Partial<number>> => {
  const lastDate = lastDayOfMonth(date).getDate();
  const startDay = startOfMonth(date).getDay();

  const dates = Array(lastDate).fill(null).map((_, index: number) => index + 1);
  const emptyArray = Array(startDay).fill(null);

  return [...emptyArray, ...dates];
};

export const getCellType = (dates: Partial<Dates>, date: Date): CellType => {
  if (!dates.endDate && !dates.startDate) {
    return 'default';
  }

  if (dates.endDate && dates.startDate) {
    if (isSameDay(dates.endDate, dates.startDate) && isSameDay(dates.startDate, date)) {
      return 'single';
    }

    if (isSameDay(dates.startDate, date)) {
      return 'start';
    }

    if (isSameDay(dates.endDate, date)) {
      return 'end';
    }

    if (isAfter(dates.endDate, date) && isBefore(dates.startDate, date)) {
      return 'middle';
    }
  } else {
    if (dates.startDate && isSameDay(dates.startDate, date)) {
      return 'start';
    }

    if (dates.endDate && isSameDay(dates.endDate, date)) {
      return 'end';
    }
  }
  return 'default';
};

export const isUnavailable = (
  unavailableDates: Array<string>,
  date: Date, minDate?: Date,
): boolean => {
  if (minDate && isAfter(minDate, date)) return true;

  return (
    unavailableDates.some((unavailableDate: string) => isSameDay(new Date(unavailableDate), date))
  );
};

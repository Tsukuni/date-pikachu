import React from 'react';
import { getDaysInMonth } from '../../utils';
import { subMonths, addMonths, isAfter, isBefore, differenceInCalendarDays, startOfDay } from 'date-fns';
import { Dates } from '../../interfaces';

export interface ReturnType {
  startDate?: Date;
  endDate?: Date;
  dates: Partial<Dates>;
  days: number[];
  currentDate: Date;
  addMonth: () => void;
  subMonth: () => void;
  handleClick: (value: number) => void;
  minDate: string;
  unavailableDates: string[];
  minPeriod: number;
}

export interface DateRangeProps {
  currentDate?: Date;
  minDate?: string;
  unavailableDates?: string[];
  minPeriod?: number;
}

export const useDateRangePicker = ({ currentDate = new Date(), minDate = '', unavailableDates = [], minPeriod = 0 }: DateRangeProps = {}): ReturnType => {
  const [dates, setDates] = React.useState<Partial<Dates>>({
    startDate: undefined,
    endDate: undefined,
  })
  const cursor = React.useRef<'start' | 'end'>('start');
  const [_currentDate, setCurrentDate] = React.useState<Date>(startOfDay(currentDate));
  const year = React.useMemo<number>(() => _currentDate.getFullYear(), [_currentDate])
  const month = React.useMemo<number>(() => _currentDate.getMonth() + 1, [_currentDate])
  const days = React.useMemo<number[]>(() => getDaysInMonth(_currentDate), [_currentDate])

  const addMonth = React.useCallback((): void => {
    setCurrentDate((date) => addMonths(date, 1));
  }, []);

  const subMonth = React.useCallback((): void => {
    setCurrentDate((date) => subMonths(date, 1));
  }, []);

  const handleClick = React.useCallback((value: number): void => {
    const selectedDate = new Date(year, month - 1, value)

    if (cursor.current === 'start') {
      if (dates.endDate && isAfter(selectedDate, dates.endDate)) {
        setDates({
          startDate: selectedDate,
          endDate: undefined,
        })
      } else {
        if (dates.endDate && differenceInCalendarDays(dates.endDate, selectedDate) < minPeriod) return;

        setDates((date) => ({
          ...date,
          startDate: selectedDate,
        }));
      }
      cursor.current = 'end'
    } else {
      if (dates.startDate && isBefore(selectedDate, dates.startDate)) {
        setDates({
          startDate: selectedDate,
          endDate: undefined,
        })
      } else {
        if (dates.startDate && differenceInCalendarDays(selectedDate, dates.startDate) < minPeriod) return;

        setDates((date) => ({
          ...date,
          endDate: selectedDate,
        }));
        cursor.current = 'start'
      }
    }
  }, [dates, year, month, minPeriod])

  return {
    startDate: dates.startDate,
    endDate: dates.endDate,
    dates,
    currentDate: _currentDate,
    days,
    addMonth,
    subMonth,
    handleClick,
    minDate,
    minPeriod,
    unavailableDates,
  }
}

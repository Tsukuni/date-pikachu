import React from 'react';
import { getDaysInMonth, getCellType, isUnavailable } from '../../utils';
import { Cell } from '../Cell';
import { Arrow } from '../Arrow';
import { subMonths, addMonths, isAfter, isBefore, differenceInCalendarDays } from 'date-fns';
import { Dates } from '../../interfaces';
import styled from 'styled-components';

const WEEK = ['日', '月', '火', '水', '木', '金', '土']

interface Props {
  unavailableDates: Array<string>;
  minPeriod?: number;
}

export const DatePicker: React.FC<Props> = ({ unavailableDates, minPeriod = 0 }) => {
  const [dates, setDates] = React.useState<Partial<Dates>>({
    startDate: undefined,
    endDate: undefined,
  })
  const cursor = React.useRef<'start' | 'end'>('start');
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
  const year = React.useMemo(() => currentDate.getFullYear(), [currentDate])
  const month = React.useMemo(() => currentDate.getMonth() + 1, [currentDate])
  const days = React.useMemo(() => getDaysInMonth(currentDate), [currentDate])

  const addMonth = React.useCallback((): void => {
    setCurrentDate((date) => addMonths(date, 1));
  }, []);

  const subMonth = React.useCallback((): void => {
    setCurrentDate((date) => subMonths(date, 1));
  }, []);

  const handleClickDate = React.useCallback((value: number): void => {
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
  }, [dates, year, month])

  return (
    <Container>
      <Caption>
        <Arrow type="left" onClick={subMonth} />
        {year}年{month}月
        <Arrow type="right" onClick={addMonth} />
      </Caption>
      <Contents>
        {WEEK.map((value: string): React.ReactNode => <Cell key={value} value={value} hoverable={false} />)}
        {days.map((value: Partial<number>, index: number): React.ReactNode =>
          <Cell
            key={index}
            value={value}
            onClick={handleClickDate}
            type={getCellType(dates, new Date(year, month - 1, value))}
            hoverable={!!value}
            unavailable={isUnavailable(unavailableDates, new Date(year, month - 1, value))}
          />
        )}
      </Contents>
    </Container>
  )
}

const Container = styled.div`
  width: 280px;
  height: 300px;
  margin: auto;
  padding: 10px;
  box-sizing: content-box;
  margin-top: 30px;
`

const Contents = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 40px);
  grid-auto-rows: 40px;
  margin: auto;
`

const Caption = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  font-weight: 600;
  margin-bottom: 8px;
`

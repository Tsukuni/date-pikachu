import React from 'react';
import { differenceInCalendarMonths, startOfDay } from 'date-fns';
import styled, { ThemeProvider } from 'styled-components';
import { getCellType, isUnavailable } from '../../utils';
import { Cell } from '../Cell';
import { Arrow } from '../Arrow';
import { Dates } from '../../interfaces';

const WEEK = ['日', '月', '火', '水', '木', '金', '土'];

const defaultTheme = {
  primary: '#8b4513',
  hover: '#f6d7c0',
  contrastText: '#fff',
};

export interface Theme {
  primary: string;
  hover: string;
  contrastText: string;
}

export interface Props {
  dates: Partial<Dates>;
  days: number[];
  currentDate: Date;
  addMonth: () => void;
  subMonth: () => void;
  handleClick: (value: number) => void;
  minDate: string;
  unavailableDates: string[];
  minPeriod: number;
  theme?: Theme;
}

export const DateRangePicker: React.FC<Props> = React.memo(({
  dates,
  currentDate,
  days,
  addMonth,
  subMonth,
  handleClick,
  minDate,
  unavailableDates,
  theme,
}) => {
  const year = React.useMemo<number>(() => currentDate.getFullYear(), [currentDate]);
  const month = React.useMemo<number>(() => currentDate.getMonth() + 1, [currentDate]);

  return (
    <ThemeProvider theme={theme || defaultTheme}>
      <Container>
        <Caption>
          <Arrow
            type="left"
            onClick={subMonth}
            disable={
              !!minDate
              && differenceInCalendarMonths(currentDate, startOfDay(new Date(minDate))) === 0
            }
          />
          {year}
          年
          {month}
          月
          <Arrow
            type="right"
            onClick={addMonth}
          />
        </Caption>
        <Contents>
          {WEEK.map((value: string): React.ReactNode => (
            <Cell
              key={value}
              value={value}
              hoverable={false}
            />
          ))}
          {days.map((value: number, index: number): React.ReactNode => (
            <Cell
              key={index}
              value={value}
              onClick={handleClick}
              type={getCellType(dates, new Date(year, month - 1, value))}
              hoverable={!!value}
              unavailable={
                isUnavailable(
                  unavailableDates,
                  startOfDay(new Date(year, month - 1, value)),
                  startOfDay(new Date(minDate)),
                )
              }
            />
          ))}
        </Contents>
      </Container>
    </ThemeProvider>
  );
});

const Container = styled.div`
  width: 280px;
  height: 300px;
  margin: auto;
  padding: 10px;
  box-sizing: content-box;
  margin-top: 30px;
`;

const Contents = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 40px);
  grid-auto-rows: 40px;
  margin: auto;
`;

const Caption = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  font-weight: 600;
  margin-bottom: 8px;
`;

import React from 'react';
import { differenceInCalendarMonths, startOfDay } from 'date-fns';
import styled, { ThemeProvider } from 'styled-components';
import { getCellType, isUnavailable } from '../../utils';
import { Cell } from '../Cell';
import { Arrow } from '../Arrow';
import { Dates } from '../../interfaces';

const WEEK = ['日', '月', '火', '水', '木', '金', '土'];

const defaultTheme = {
  primary: '#0d6780',
  hover: '#f1f7fb',
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
          <Year>
            {year}
            年
            {month}
            月
          </Year>
          <Arrow
            type="right"
            onClick={addMonth}
          />
        </Caption>
        <Weeks>
          {WEEK.map((value: string): React.ReactNode => (
            <Cell
              key={value}
              value={value}
              hoverable={false}
            />
          ))}
        </Weeks>
        <Contents>
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
  font-family: Helvetica Neue,Arial,Hiragino Kaku Gothic ProN,Meiryo,sans-serif;
  font-feature-settings: "palt";
  font-size: 14px;
  font-size: 1.4rem;
  letter-spacing: .06em;
  line-height: 1.5;
  word-break: break-all;
  word-wrap: break-word;
  color: #414141;
  width: fit-content;
  margin: auto;
  padding: 24px;
  box-sizing: content-box;  
  box-shadow: 0 2px 12px rgba(0,0,0,.15);
  border: solid 1px #ddd;
  border-radius: 12px;
`;

const Contents = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 44px);
  grid-auto-rows: 44px;
  margin: auto;
`;

const Caption = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-bottom: 8px;
`;

const Year = styled.div`
  font-family: Helvetica Neue,Arial,Hiragino Kaku Gothic ProN,Meiryo,sans-serif;
  font-feature-settings: "palt";
  font-size: 14px;
  font-size: 1.4rem;
  letter-spacing: .06em;
  font-size: 16px;
  font-weight: bold;
`;

const Weeks = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 44px);
  grid-auto-rows: 44px;
  margin: auto;
  padding: 16px 0 0 0;
  color: #888;
`;

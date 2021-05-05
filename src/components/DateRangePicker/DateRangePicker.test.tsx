import React from 'react';
import { render } from "@testing-library/react"
import { DateRangePicker, Props } from './DateRangePicker';

describe('DateRangePicker', () => {
  test('render component', () => {
    const props: Props = {
      dates: {
        startDate: undefined,
        endDate: undefined,
      },
      days: [1, 2, 3],
      currentDate: new Date(),
      addMonth: jest.fn(),
      subMonth: jest.fn(),
      handleClick: jest.fn(),
      minDate: '',
      unavailableDates: [],
      minPeriod: 0,
    }
    const { getByText } = render(<DateRangePicker {...props} />)

    getByText(`${props.currentDate.getFullYear()}年${props.currentDate.getMonth() + 1}月`);
  });
});

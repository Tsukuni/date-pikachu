import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Cell, Props } from './Cell';

describe('Arrow', () => {
  test('render component', () => {
    const props: Props = {
      value: 1,
      onClick: jest.fn(),
    };
    const { getByText } = render(<Cell {...props} />);
    getByText(props.value);
    const cell = getByText(props.value);
    fireEvent.click(cell);
    expect(props.onClick).toBeCalledTimes(1);
  });

  test('cant click', () => {
    const props: Props = {
      value: 1,
      onClick: jest.fn(),
      unavailable: true,
    };
    const { getByText } = render(<Cell {...props} />);
    getByText(props.value);
    const cell = getByText(props.value);

    fireEvent.click(cell);
    expect(props.onClick).toBeCalledTimes(0);
  });
});

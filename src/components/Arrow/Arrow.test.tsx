import React from 'react';
import { render, fireEvent } from "@testing-library/react"
import { Arrow, Props } from './Arrow';

describe('Arrow', () => {
  test('render component', () => {
    const func = jest.fn();
    const props: Props = {
      type: 'right',
      onClick: func,
    }
    const { getByText } = render(<Arrow {...props} />)
    getByText('→');
    const button = getByText('→');
    fireEvent.click(button);
    expect(func).toBeCalledTimes(1);
  });

  test('disable true', () => {
    const func = jest.fn();
    const props: Props = {
      type: 'right',
      onClick: func,
      disable: true,
    }
    const { getByText } = render(<Arrow {...props} />)
    const button = getByText('→');
    fireEvent.click(button);
    expect(func).toBeCalledTimes(0);
  })
});

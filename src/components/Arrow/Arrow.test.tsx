import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Arrow, Props } from './Arrow';

describe('Arrow', () => {
  test('render component', () => {
    const props: Props = {
      type: 'right',
      onClick: jest.fn(),
    };
    const { getByText } = render(<Arrow {...props} />);
    getByText('→');
    const button = getByText('→');
    fireEvent.click(button);
    expect(props.onClick).toBeCalledTimes(1);
  });

  test('cant click', () => {
    const props: Props = {
      type: 'right',
      onClick: jest.fn(),
      disable: true,
    };
    const { getByText } = render(<Arrow {...props} />);
    const button = getByText('→');
    fireEvent.click(button);
    expect(props.onClick).toBeCalledTimes(0);
  });
});

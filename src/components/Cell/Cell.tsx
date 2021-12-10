import React from 'react';
import styled from 'styled-components';
import { CellType } from '../../interfaces';

export interface Props {
  value?: number | string;
  hoverable?: boolean;
  onClick?: (value: number) => void;
  type?: CellType;
  unavailable?: boolean;
}

export const Cell: React.FC<Props> = ({
  value = '', hoverable = true, onClick = undefined, type = 'default', unavailable = false,
}) => (
  <Container
    hoverable={!unavailable && hoverable}
    unavailable={unavailable}
    type={value ? type : 'default'}
    onClick={() => {
      if (!unavailable && onClick) {
        onClick(value as number);
      }
    }}
  >
    {value}
  </Container>
);

const Container = styled.div<{ hoverable: boolean; type: CellType; unavailable: boolean; }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  user-select: none;
  align-items: center;
  font-size: 14px;
  cursor: ${({ hoverable }) => (hoverable ? 'pointer' : '')};
  ${({ unavailable }) => unavailable && `
    text-decoration: line-through;
    color: gray;
  `}
  font-weight: bold;
  ${({ hoverable, theme }) => hoverable && `
    :hover {
      border-radius: 100px;
      border: solid 2px ${theme.primary};
      box-sizing: border-box;
    }
  `}
  ${({ type, theme }) => {
    switch (type) {
    case 'start':
      return `
          position: relative;
          border-radius: 100px;
          background: ${theme.primary};
          color: ${theme.contrastText};
          &:before {
            position: absolute;
            top: 0;
            right: 0;
            width: 22px;
            height: 44px;
            content: '';
            background: ${theme.hover};
            z-index: -1;
          }
        `;
    case 'end':
      return `
          position: relative;
          border-radius: 100px;
          background: ${theme.primary};
          color: ${theme.contrastText};
          &:before {
            position: absolute;
            top: 0;
            left: 0;
            width: 22px;
            height: 44px;
            content: '';
            background: ${theme.hover};
            z-index: -1;
          }
        `;
    case 'middle':
      return `
          background: ${theme.hover};
        `;
    case 'single':
      return `
          border-radius: 100px;
          background: ${theme.primary};
          color: ${theme.contrastText};
        `;
    default:
      return '';
    }
  }
}
`;

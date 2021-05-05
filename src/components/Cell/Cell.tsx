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
  value = '',
  hoverable = true, onClick = undefined, type = 'default', unavailable = false,
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
  cursor: ${({ hoverable }) => (hoverable ? 'pointer' : '')};
  ${({ unavailable }) => unavailable && `
    text-decoration: line-through;
    color: gray;
  `}
  font-weight: 600;
  ${({ hoverable, theme }) => hoverable && `
    :hover {
      border-radius: 4px;
      background: ${theme.hover};
    }
  `}
  ${({ type, theme }) => {
    switch (type) {
    case 'start':
      return `
          border-radius: 4px 0px 0px 4px;
          background: ${theme.primary};
          color: ${theme.contrastText};
        `;
    case 'end':
      return `
          border-radius: 0px 2px 2px 0px;
          background: ${theme.primary};
          color: ${theme.contrastText};
        `;
    case 'middle':
      return `
          background: ${theme.hover};
        `;
    case 'single':
      return `
          border-radius: 4px;
          background: ${theme.primary};
          color: ${theme.contrastText};
        `;
    default:
      return '';
    }
  }
}
`;

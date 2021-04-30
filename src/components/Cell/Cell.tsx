import React from 'react';
import styled from 'styled-components'
import { CellType } from '../../interfaces';

interface Props {
  value?: number | string;
  hoverable?: boolean;
  onClick?: (value: number) => void;
  type?: CellType;
}

export const Cell: React.FC<Props> = ({ value = '', hoverable = true, onClick = undefined, type = 'default' }) => {
  return <Container hoverable={ !!value && hoverable} type={value ? type : 'default'} onClick={() => {
    if (value && onClick) {
      onClick(value as number);
    }
  }}>{value}</Container>
}

const Container = styled.div<{ hoverable: boolean; type: CellType }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  user-select: none;
  align-items: center;
  cursor: ${({ hoverable }) => hoverable ? 'pointer' : ''};
  font-weight: 600;
  ${({ hoverable }) => hoverable && `
    :hover {
      border-radius: 4px;
      background: #f6d7c0;
    }
  `}
  ${({ type }) => {
    switch (type) {
      case 'start':
        return  `
          border-radius: 4px 0px 0px 4px;
          background: #8b4513;
          color: #fff;
        `
      case 'end':
        return `
          border-radius: 0px 2px 2px 0px;
          background: #8b4513;
          color: #fff;
        `
      case 'middle':
        return `
          background: #f6d7c0;
        `
      case 'single':
        return `
          border-radius: 4px;
          background: #8b4513;
          color: #fff;
        `
      default:
        return '';
    }
   }
  }
`
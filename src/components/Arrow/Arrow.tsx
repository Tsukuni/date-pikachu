import React from 'react';
import styled from 'styled-components';

export interface Props {
  type: 'right' | 'left';
  onClick: () => void;
  disable?: boolean;
}

export const Arrow: React.FC<Props> = React.memo(({ type, onClick, disable = false }) => (
  <Container
    onClick={() => !disable && onClick()}
    disable={disable}
  >
    {type === 'right' ? '→' : '←' }
  </Container>
));

const Container = styled.div<{ disable: boolean }>`
  width: 44px;
  height: 44px;
  line-height: 44px;
  border-radius: 100px;
  user-select: none;
  font-size: 18px;
  cursor: ${({ disable }) => (disable ? '' : 'pointer')};
  opacity: ${({ disable }) => (disable ? 0.2 : 1)};
  &:hover {
    background: #f5f5f5;
  }
`;

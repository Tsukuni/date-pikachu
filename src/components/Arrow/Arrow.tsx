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
  width: 40px;
  height: 28px;
  border: 1px solid #c4c4c4;
  user-select: none;
  color: gray;
  font-size: 18px;
  border-radius: 2px;
  cursor: ${({ disable }) => (disable ? '' : 'pointer')};
  opacity: ${({ disable }) => (disable ? 0.2 : 1)};
`;

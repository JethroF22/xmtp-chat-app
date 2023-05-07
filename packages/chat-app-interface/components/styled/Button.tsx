import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

const StyledButton = styled.div`
  width: 6rem;
  height: 2rem;
  background-color: #629ff7;
  border: 1px solid #629ff7;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  span {
    color: #fff;
  }
`;

export function Button({ children, onClick }: ButtonProps) {
  return (
    <StyledButton onClick={onClick}>
      <span>{children}</span>
    </StyledButton>
  );
}

export default Button;

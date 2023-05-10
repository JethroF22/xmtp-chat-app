import { ReactNode } from 'react';
import styled from '@emotion/styled';

const StyledPage = styled.div`
  height: 100%;
  width: 100%;
`;

interface Props {
  children: ReactNode;
}

function Page({ children }: Props) {
  return <StyledPage>{children}</StyledPage>;
}

export default Page;

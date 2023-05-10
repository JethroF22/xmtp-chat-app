import styled from '@emotion/styled';
import { ReactNode } from 'react';

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

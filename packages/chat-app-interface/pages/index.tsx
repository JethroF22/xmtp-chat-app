import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useEthers } from '@usedapp/core';
import { useRouter } from 'next/router';

import Button from '../components/styled/Button';

const StyledPage = styled.div`
  width: 100vw
  height: 100vh

  .button {

  }
`;

export function Index() {
  const { activateBrowserWallet, account } = useEthers();
  const router = useRouter();

  useEffect(() => {
    if (account) {
      router.push('/home');
    }
  }, [account, router]);
  return (
    <StyledPage>
      <Button onClick={() => activateBrowserWallet()}>Authenticate</Button>
    </StyledPage>
  );
}

export default Index;

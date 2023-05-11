import { useContext, useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { Context } from '../context/state';

import Chat from '../components/Chat';
import Sidebar from '../components/Sidebar';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-start;

  .no-message-display {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    color: #fff;
  }
`;

export function Home() {
  const { account } = useEthers();
  const router = useRouter();
  const {
    state: { selectedAddress },
  } = useContext(Context);

  useEffect(() => {
    if (!account) {
      router.push('/');
    }
  }, []);

  return (
    <Container>
      <Sidebar />
      {selectedAddress && <Chat conversationPartner={selectedAddress} />}
      {!selectedAddress && (
        <div className="no-message-display">
          Select a conversation to get started
        </div>
      )}
    </Container>
  );
}

export default Home;

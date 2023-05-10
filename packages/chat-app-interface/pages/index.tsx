import { useContext, useEffect, useState } from 'react';
import { useEthers } from '@usedapp/core';
import { useRouter } from 'next/router';
import { Client } from '@xmtp/xmtp-js';

import { Context } from '../context/state';
import { getSigner } from '../utils/signer';

import Page from '../components/styled/Page';
import Button from '../components/styled/Button';
import { ActionTypes } from '../context/types';

export function Index() {
  const { activateBrowserWallet, account } = useEthers();
  const router = useRouter();
  const { dispatch } = useContext(Context);
  const [isLoading, setLoadingState] = useState(false);

  useEffect(() => {
    if (account) {
      const connectToClient = async () => {
        setLoadingState(true);
        const signer = await getSigner();
        const xmtp = await Client.create(signer);
        const conversations = await xmtp.conversations.list();
        dispatch({
          type: ActionTypes.SET_STATE,
          data: {
            client: xmtp,
            conversations,
          },
        });
        setLoadingState(false);
        router.push('/home');
      };
      connectToClient();
    }
  }, [account, router, dispatch]);
  return (
    <Page>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <Button onClick={() => activateBrowserWallet()}>Connect To App</Button>
      )}
    </Page>
  );
}

export default Index;

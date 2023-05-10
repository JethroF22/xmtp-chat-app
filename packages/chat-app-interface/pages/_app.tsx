import { useReducer } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { DAppProvider } from '@usedapp/core';
import { Roboto } from '@next/font/google';

import { appReducer } from '../context/reducer';
import { Context } from '../context/state';

import './styles.css';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

function CustomApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(appReducer, {
    client: null,
    conversations: [],
  });
  return (
    <>
      <Head>
        <title>Welcome to chat-app-interface!</title>
      </Head>
      <main className={roboto.className}>
        <DAppProvider config={{}}>
          <Context.Provider value={{ state, dispatch }}>
            <Component {...pageProps} />
          </Context.Provider>
        </DAppProvider>
      </main>
    </>
  );
}

export default CustomApp;

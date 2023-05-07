import { AppProps } from 'next/app';
import Head from 'next/head';
import { DAppProvider } from '@usedapp/core';
import { Roboto } from '@next/font/google';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to chat-app-interface!</title>
      </Head>
      <main className={roboto.className}>
        <DAppProvider config={{}}>
          <Component {...pageProps} />
        </DAppProvider>
      </main>
    </>
  );
}

export default CustomApp;

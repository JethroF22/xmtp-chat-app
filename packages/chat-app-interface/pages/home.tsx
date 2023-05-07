import { useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import { useRouter } from 'next/router';

export function Home() {
  const { account } = useEthers();
  const router = useRouter();

  useEffect(() => {
    if (!account) {
      router.push('/');
    }
  }, [account, router]);
  return <div>Home</div>;
}

export default Home;

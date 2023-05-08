import { providers } from 'ethers';

type WindowInstanceWithEthereum = Window &
  typeof globalThis & { ethereum?: providers.ExternalProvider };

export const getSigner = async () => {
  if (!(window as WindowInstanceWithEthereum).ethereum) {
    throw new Error(
      'Ethereum is not connected. Please download Metamask from https://metamask.io/download.html'
    );
  }
  const provider = new providers.Web3Provider(
    // @ts-ignore
    (window as WindowInstanceWithEthereum).ethereum
  );
  const signer = provider.getSigner();
  return signer;
};

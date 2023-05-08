import { useEffect, useState } from 'react';
import { useEthers } from '@usedapp/core';
import { Client, Conversation, DecodedMessage } from '@xmtp/xmtp-js';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { getSigner } from '../utils/signer';

import Button from '../components/styled/Button';
import Chat from '../components/Chat';

export function Home() {
  const { account } = useEthers();
  const router = useRouter();
  const [isLoading, setLoadingState] = useState(false);
  const [conversation, setConversation] = useState<Conversation>();
  const [messages, setMessages] = useState<DecodedMessage[]>([]);
  const [peerAddress, setPeerAddress] = useState<string>();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (formState: any) => {
    setLoadingState(true);
    setPeerAddress(formState.peerAddress);

    const signer = await getSigner();
    const xmtp = await Client.create(signer);
    const conversation = await xmtp.conversations.newConversation(
      formState.peerAddress
    );
    const messages = await conversation.messages();
    setConversation(conversation);
    setMessages(messages || []);

    setLoadingState(false);
  };

  useEffect(() => {
    if (!account) {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    if (peerAddress) {
      const streamMessages = async () => {
        const newStream = await conversation?.streamMessages();
        for await (const msg of newStream || []) {
          setMessages((prevMessages) => [...prevMessages, msg]);
        }
      };
      streamMessages();
    }
  }, [conversation, peerAddress]);

  return (
    <div>
      {!peerAddress && !isLoading && (
        <div>
          <div>
            <input
              type="text"
              placeholder="Peer Address"
              {...register('peerAddress')}
            />
          </div>
          <Button onClick={handleSubmit(onSubmit)}>Set Peer Address</Button>
        </div>
      )}
      {peerAddress && isLoading && <div>Loading...</div>}
      {peerAddress && conversation && (
        <Chat
          account={account as string}
          messages={messages}
          conversation={conversation as Conversation}
        />
      )}
    </div>
  );
}

export default Home;

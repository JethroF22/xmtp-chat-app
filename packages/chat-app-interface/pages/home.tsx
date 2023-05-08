import { useEffect, useState } from 'react';
import { useEthers } from '@usedapp/core';
import { Client, Conversation, DecodedMessage } from '@xmtp/xmtp-js';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { getSigner } from '../utils/signer';

import Button from '../components/styled/Button';

export function Home() {
  const { account } = useEthers();
  const router = useRouter();
  const [conversation, setConversation] = useState<Conversation>();
  const [messages, setMessages] = useState<DecodedMessage[]>([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (formState: any) => {
    try {
      await conversation?.send(formState.message);
    } catch (error) {
      console.log('error');
      console.log(error);
    }
  };

  useEffect(() => {
    if (!account) {
      router.push('/');
    } else {
      const connectToClient = async () => {
        const signer = await getSigner();
        const xmtp = await Client.create(signer);
        const conversation = await xmtp.conversations.newConversation(
          '0x64F8Bf6eFD1AffdE71399b0a19776336b242750D'
        );
        const messages = await conversation.messages();
        setConversation(conversation);
        setMessages(messages || []);
      };

      connectToClient();
    }
  }, []);
  return (
    <div>
      <div>
        {messages.length === 0 && <div>No messages to display</div>}
        {messages.length > 0 &&
          messages.map((message) => (
            <div key={message.id}>{message.content}</div>
          ))}
      </div>
      <div>
        <div>
          <input type="text" placeholder="Message" {...register('message')} />
        </div>
        <Button onClick={handleSubmit(onSubmit)}>Send Message</Button>
      </div>
    </div>
  );
}

export default Home;

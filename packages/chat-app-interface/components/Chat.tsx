import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DecodedMessage, Conversation } from '@xmtp/xmtp-js';

import Button from './styled/Button';

interface Props {
  messages: DecodedMessage[];
  conversation: Conversation;
  account: string;
}

function Chat({ messages, conversation, account }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isLoading, setLoadingState] = useState(false);
  const onSubmit = async (formState: any) => {
    try {
      setLoadingState(true);
      await conversation?.send(formState.message);
    } catch (error) {
      console.log('error');
      console.log(error);
    } finally {
      setLoadingState(false);
    }
  };

  const formatMessageTag = (senderAddress: string) => {
    return senderAddress === account ? 'Me: ' : `${senderAddress}: `;
  };

  return (
    <div>
      <div>
        {messages.length === 0 && <div>No messages to display</div>}
        {messages.length > 0 &&
          messages.map((message) => (
            <div key={message.id}>
              {formatMessageTag(message.senderAddress)} {message.content}
            </div>
          ))}
      </div>
      <div>
        <div>
          <input type="text" placeholder="Message" {...register('message')} />
        </div>
        {!isLoading && (
          <Button onClick={handleSubmit(onSubmit)}>Send Message</Button>
        )}
        {isLoading && <div>Loading...</div>}
      </div>
    </div>
  );
}

export default Chat;

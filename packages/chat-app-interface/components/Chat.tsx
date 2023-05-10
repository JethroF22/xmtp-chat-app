import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DecodedMessage, Conversation } from '@xmtp/xmtp-js';
import styled from '@emotion/styled';

import { Context } from '../context/state';

import Button from './styled/Button';

interface Props {
  account: string;
}

const StyledDiv = styled.div`
  color: #fff;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: left;

  div {
  }

  .messages {
    height: 90%;
    padding: 10px;
  }

  .message-form {
    padding: 10px;
    height: 10%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .message-input {
      height: 80%;
      width: 90%;
      display: flex;
      align-items: center;

      input {
        -webkit-appearance: none;
        -ms-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: none;
        height: 80%;
        width: 90%;
        background-color: #2c4555;
        color: #fff;
        border-radius: 5px;
        font-size: 18px;
        padding: 10px;
      }

      input:focused {
        border: none;
      }
    }

    .send-button {
    }
  }
`;

function Chat({ account }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const {
    state: { client, selectedAddress },
  } = useContext(Context);
  const [isLoading, setLoadingState] = useState(false);
  const [sendingMessage, setMessageSendingState] = useState(false);
  const [conversation, setConversation] = useState<Conversation>();
  const [messages, setMessages] = useState<DecodedMessage[]>([]);
  const onSubmit = async (formState: any) => {
    try {
      setMessageSendingState(true);
      await conversation?.send(formState.message);
    } catch (error) {
      console.log('error');
      console.log(error);
    } finally {
      setMessageSendingState(false);
    }
  };

  useEffect(() => {
    if (selectedAddress) {
      const getMessages = async () => {
        try {
          setLoadingState(true);
          const conversation = await client?.conversations.newConversation(
            selectedAddress
          );
          const messages = await conversation?.messages();
          setConversation(conversation);
          setMessages(messages || []);
        } catch (error) {
          console.log('error');
          console.log(error);
        } finally {
          setLoadingState(false);
        }
      };
      getMessages();
    }
  }, []);

  useEffect(() => {
    if (conversation) {
      const streamMessages = async () => {
        const newStream = await conversation?.streamMessages();
        for await (const msg of newStream || []) {
          setMessages((prevMessages) => [...prevMessages, msg]);
        }
      };
      streamMessages();
    }
  }, [conversation]);

  const formatMessageTag = (senderAddress: string) => {
    return senderAddress === account ? 'Me: ' : `${senderAddress}: `;
  };

  return (
    <StyledDiv>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <>
          <div className="messages">
            {messages.length === 0 && <div>No messages to display</div>}
            {messages.length > 0 &&
              messages.map((message) => (
                <div key={message.id}>
                  {formatMessageTag(message.senderAddress)} {message.content}
                </div>
              ))}
          </div>
          <div className="message-form">
            <div className="message-input">
              <input
                type="text"
                placeholder="Message"
                {...register('message')}
              />
            </div>
            {!sendingMessage && (
              <Button onClick={handleSubmit(onSubmit)}>Send Message</Button>
            )}
            {sendingMessage && <div>Sending Message...</div>}
          </div>
        </>
      )}
    </StyledDiv>
  );
}

export default Chat;

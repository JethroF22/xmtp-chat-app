import {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Conversation, DecodedMessage, Stream } from '@xmtp/xmtp-js';
import styled from '@emotion/styled';

import { Context } from '../context/state';
import Messages from './Messages';

const StyledDiv = styled.div`
  color: #fff;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: left;
  padding: 20px 10px;

  .message-form {
    height: 8%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: left;

    .message-input {
      height: 80%;
      width: 85%;
      display: flex;
      align-items: center;
      justify-content: center;

      input {
        -webkit-appearance: none;
        -ms-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: none;
        height: 90%;
        width: 95%;
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
      height: 70%;
      width: 15%;
      cursor: pointer;
      background-color: #629ff7;
      border: 1px solid #629ff7;
      border-radius: 5px;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .send-button-disabled {
      background-color: #2c4555;
      border: 1px solid #2c4555;
      cursor: none;
    }
  }
`;

function Chat() {
  const {
    state: { client, selectedAddress },
  } = useContext(Context);
  const [isLoading, setLoadingState] = useState(false);
  const [sendingMessage, setMessageSendingState] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Conversation>();
  const [messages, setMessages] = useState<DecodedMessage[]>([]);
  const sendMessage = async () => {
    if (!sendingMessage && message.length > 0) {
      try {
        setMessageSendingState(true);
        await conversation?.send(message);
        setMessage('');
      } catch (error) {
        console.log('error');
        console.log(error);
      } finally {
        setMessageSendingState(false);
      }
    }
  };

  const keyUpHandler = async (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      await sendMessage();
    }
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const message = event.target.value;
    setMessage(message);
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
    let stream: Stream<DecodedMessage>;
    if (conversation) {
      const streamMessages = async () => {
        stream = await conversation?.streamMessages();
        for await (const msg of stream || []) {
          setMessages((prevMessages) => [...prevMessages, msg]);
        }
      };
      streamMessages();
    }

    return () => {
      stream?.return();
    };
  }, [conversation]);

  return (
    <StyledDiv>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <>
          <Messages messages={messages} conversationPartner={selectedAddress} />
          <div className="message-form">
            <div className="message-input" onKeyUp={keyUpHandler}>
              <input
                type="text"
                placeholder="Message"
                onChange={onChangeHandler}
                value={message}
                disabled={sendingMessage ? true : false}
              />
            </div>
            {!sendingMessage && (
              <div className="send-button" onClick={sendMessage}>
                Send Message
              </div>
            )}
            {sendingMessage && (
              <div className="send-button send-button-disabled">Sending...</div>
            )}
          </div>
        </>
      )}
    </StyledDiv>
  );
}

export default Chat;

import { css } from '@emotion/react';
import { DecodedMessage } from '@xmtp/xmtp-js';
import { useEffect } from 'react';
import { animateScroll } from 'react-scroll';

interface Props {
  messages: DecodedMessage[];
  conversationPartner: string;
}

const messagesCss = css`
  height: 90%;
  width: 100%;
  overflow-y: auto;
  padding: 10px;
`;

function Messages({ messages, conversationPartner }: Props) {
  const formatMessageTag = (senderAddress: string) => {
    return senderAddress === conversationPartner
      ? `${senderAddress}: `
      : 'Me: ';
  };

  useEffect(() => {
    console.log('scrolling');
    animateScroll.scrollToBottom({ containerId: 'messages' });
  }, [messages]);

  return (
    <div id="messages" css={messagesCss}>
      {messages.length === 0 && <div>No messages to display</div>}
      {messages.length > 0 &&
        messages.map((message) => (
          <div key={message.id}>
            {formatMessageTag(message.senderAddress)} {message.content}
          </div>
        ))}
    </div>
  );
}

export default Messages;

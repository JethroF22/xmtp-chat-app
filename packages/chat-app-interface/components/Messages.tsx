import { DecodedMessage } from '@xmtp/xmtp-js';

interface Props {
  messages: DecodedMessage[];
  conversationPartner: string;
}

function Messages({ messages, conversationPartner }: Props) {
  const formatMessageTag = (senderAddress: string) => {
    return senderAddress === conversationPartner
      ? `${senderAddress}: `
      : 'Me: ';
  };

  return (
    <div className="messages">
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

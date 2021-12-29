import React from 'react';
import Message from './Message';
import MessageForm from './MessageForm';

const Messages = ({ messages, issueId, userName, userId }) => {
  const filteredMessages = messages.filter(
    (message) => message.issueId === issueId
  );
  return (
    <div>
      {filteredMessages.map((message, index) => {
        return (
          <>
            <Message key={index} message={message} />
          </>
        );
      })}
      <MessageForm issueId={issueId} userName={userName} userId={userId} />
    </div>
  );
};

export default Messages;

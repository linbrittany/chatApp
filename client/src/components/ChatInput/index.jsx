import { useState } from 'react';
import { Container, InputContainer } from './styles';

const ChatInput = () => {
  const [message, setMessage] = useState("");

  return (
    <Container>
      <InputContainer>
        <input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button type="submit">{/* <IoMdSend /> */}</button>
      </InputContainer>
    </Container>
  );
};

export default ChatInput;

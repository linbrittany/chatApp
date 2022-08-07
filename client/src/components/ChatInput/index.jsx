import { useState } from 'react';
import { Container, EmojiContainer, InputContainer } from './styles';
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <Container>
      <EmojiContainer>
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>}
        </div>
      </EmojiContainer>
      <InputContainer>
        <input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button type="submit">
          <IoMdSend/>
        </button>
      </InputContainer>
    </Container>
  );
};

export default ChatInput;

import styled from 'styled-components';
import { FiX } from 'react-icons/fi';
import { useRef, useState } from 'react';
import ChatList from './ChatList';

let arrayKey = 0;
function ChatModal(props) {
  const [chatText, setChatText] = useState([]);

  const textRef = useRef();
  const textArea = useRef();

  const pushText = e => {
    if (e.key === 'Enter' || e.type === 'click') {
      const result = {
        id: arrayKey,
        item: textRef.current.value,
      };
      arrayKey++;
      setChatText(chatText.concat(result));
      textRef.current.value = '';

      //동시에 진행되서 한박자 느리게 내려가는걸 방지
      setTimeout(() => {
        textArea.current.scrollTo(
          0,
          textArea.current.scrollHeight + textArea.current.clientHeight
        );
      }, 0.1);
    }
  };

  return (
    <>
      <ChatSection>
        <ChatHeader>
          <img src="image/logo.svg" />
          <FiX className="icon" onClick={props.chatChange} />
        </ChatHeader>
        <Wrap>
          <ChatLists ref={textArea}>
            {chatText.map((text, index) => {
              return <ChatList key={index} id={text.id} content={text.item} />;
            })}
          </ChatLists>
        </Wrap>
        <ChatInput>
          <input
            type="text"
            className="inputBox"
            placeholder="채팅을 시작해보세요!"
            ref={textRef}
            onKeyPress={pushText}
          />
          <button onClick={pushText}>전송</button>
        </ChatInput>
      </ChatSection>
    </>
  );
}

const ChatSection = styled.section`
  position: fixed;
  bottom: 30px;
  right: 120px;
  width: 360px;
  height: 600px;
  border: 1px solid #e2e2e5;
  background-color: #fdf2f0;
  z-index: 300;
`;

const ChatHeader = styled.header`
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
  img {
    margin-left: 50px;
    width: 200px;
  }
  .icon {
    font-size: 30px;
    cursor: pointer;
  }
`;

const ChatInput = styled.div`
  display: flex;
  align-items: center;
  padding-left: 30px;

  position: absolute;
  bottom: 10px;

  .inputBox {
    width: 250px;
    height: 35px;
    border: 1px solid #9f9f9f;
    padding-left: 20px;
    &:focus {
      outline: none;
    }
  }
  button {
    width: 50px;
    height: 35px;
    background-color: #9f9f9f;
    border: 0;
    outline: 0;
    color: white;
    cursor: pointer;
  }
`;

const ChatLists = styled.ul`
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding: 20px 30px 0 30px;
`;

const Wrap = styled.div`
  height: 470px;
  overflow: hidden;
`;

export default ChatModal;

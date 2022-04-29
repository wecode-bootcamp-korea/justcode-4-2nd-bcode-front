import styled from 'styled-components';
import { FiX } from 'react-icons/fi';
import { useRef, useState } from 'react';
import ChatList from './ChatList';

const socket = new WebSocket(`ws://localhost:8000`);

let arrayKey = 0;
function ChatModal(props) {
  const [chatText, setChatText] = useState([]);
  const textRef = useRef();
  const textArea = useRef();

  socket.addEventListener('open', () => {
    console.log('Connected to Server ✅');
  });
  socket.addEventListener('message', msg => {
    setChatText([...chatText, { message: msg.data }]);

    setTimeout(() => {
      textArea.current.scrollTo(
        0,
        textArea.current.scrollHeight + textArea.current.clientHeight
      );
    }, 0.3);
  });

  function makeMessage(type, payload) {
    const msg = { type, payload };
    return JSON.stringify(msg);
  }

  const pushText = e => {
    if (e.key === 'Enter' || e.type === 'click') {
      const result = {
        id: arrayKey,
        item: textRef.current.value,
      };
      arrayKey++;
      setChatText(chatText.concat(result));
      socket.send(makeMessage('new_message', textRef.current.value));
      textRef.current.value = '';
      //동시에 진행되서 한박자 느리게 내려가는걸 방지
      setTimeout(() => {
        textArea.current.scrollTo(
          0,
          textArea.current.scrollHeight + textArea.current.clientHeight
        );
      }, 0.3);
    }
  };
  return (
    <>
      <ChatSection>
        <ChatHeader>
          <img src="/image/logo.svg" />
          <FiX className="icon" onClick={props.chatChange} />
        </ChatHeader>
        <Wrap>
          <ChatLists ref={textArea}>
            {chatText.map((text, index) => {
              return (
                <ChatList
                  key={index}
                  id={text.id}
                  content={text.item}
                  message={text.message}
                />
              );
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

  @media (max-width: 375px) {
    width: 320px;
    left: 0;
  }
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
    @media (max-width: 375px) {
      margin-left: 10px;
    }
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
  @media (max-width: 375px) {
    padding-left: 10px;
  }

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
  @media (max-width: 375px) {
    padding: 0px;
  }
`;

const Wrap = styled.div`
  height: 470px;
  overflow: hidden;
`;

export default ChatModal;

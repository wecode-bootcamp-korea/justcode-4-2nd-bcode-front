import { useRef } from 'react';
import styled from 'styled-components';
const date = new Date();
const hour = date.getHours();
const minute = date.getMinutes();
const seconds = date.getSeconds();

function ChatList(props) {
  let messageResult = '';
  let name = '';
  if (props.message !== undefined) {
    messageResult = props.message.split(':');
    name = messageResult[0].split(' ');
  }
  return (
    <>
      {props.message === undefined ? (
        <ChatLeftList>
          <Wrapper>
            <LeftTime>
              {hour}.{minute}.{seconds}
            </LeftTime>
            <LeftContent>{props.content}</LeftContent>
          </Wrapper>
        </ChatLeftList>
      ) : (
        <ChatRightList>
          <ChatName>{name[1]}</ChatName>
          <Wrap>
            <ChatContent>{messageResult[1]}</ChatContent>
            <ChatTime>
              {hour}.{minute}.{seconds}
            </ChatTime>
          </Wrap>
        </ChatRightList>
      )}
    </>
  );
}

const ChatLeftList = styled.li`
  display: flex;
  padding: 15px 0 15px 40px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const LeftTime = styled.div`
  position: absolute;
  font-size: 12px;
  right: -35px;
  bottom: 5px;
`;

const LeftContent = styled.div`
  width: 200px;
  height: 100%;
  padding: 5px;
  margin: 0 10px 0 10px;
  word-break: break-all;
  color: white;
  background-color: #444444;
  border-radius: 10px;
`;

const ChatRightList = styled.li`
  display: flex;
  padding: 15px 0;
`;

const ChatName = styled.div`
  width: 45px;
  height: 25px;
  padding: 5px;
  background-color: #eb0d76;
  border-radius: 10px;
  color: white;
`;

const Wrap = styled.div`
  position: relative;
`;

const ChatContent = styled.div`
  width: 200px;
  height: 100%;
  padding: 5px;
  margin: 0 10px 0 10px;
  word-break: break-all;
  background-color: white;
  border-radius: 10px;
`;

const ChatTime = styled.div`
  position: absolute;
  font-size: 12px;
  right: -35px;
  bottom: 5px;
`;
export default ChatList;

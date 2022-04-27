import styled from 'styled-components';
const date = new Date();
const hour = date.getHours();
const minute = date.getMinutes();
const seconds = date.getSeconds();

function ChatList(props) {
  return (
    <>
      <ChatTextList>
        <ChatName>손님1</ChatName>
        <Wrap>
          <ChatContent>{props.content}</ChatContent>
          <ChatTime>
            {hour}.{minute}.{seconds}
          </ChatTime>
        </Wrap>
      </ChatTextList>
    </>
  );
}

const ChatTextList = styled.li`
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
`;

const ChatTime = styled.div`
  position: absolute;
  font-size: 12px;
  right: -35px;
  bottom: 5px;
`;
export default ChatList;

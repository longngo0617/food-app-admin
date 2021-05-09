import React from "react";
import styled from "styled-components";
interface MessageAlertProps {}

export const MessageAlert: React.FC<MessageAlertProps> = () => {
  return (
    <MessageWrap>
      <MessageElement>
        <h1>Thêm thành công</h1>
      </MessageElement>
    </MessageWrap>
  );
};
const MessageWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none !important;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const MessageElement = styled.div`
  margin-bottom: 30px;
  background-color: rgb(29, 161, 242);
  padding:12px 18px;
  border-radius:6px;
  display: flex;
  align-items: center;
  color: #fff;
`;

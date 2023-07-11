"use client";
import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.div`
  .chat-content {
    height: 350px;
    overflow-y: scroll;
  }
  .line {
    margin-top: 15px;
    display: flex;
  }
  .chat-box {
    background: #eee;
    padding: 5px;
    max-width: 200px;
  }
  .mine {
    margin-left: auto;
  }
`;

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { content: "안녕?", isMine: false },
    { content: "안녕?", isMine: true },
  ]);
  const [inputValue, setInputValue] = useState("");

  const sendMessage = () => {
    const newMessage = { content: inputValue, isMine: true };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");

    const query = `http://localhost:3000/translate?q=${inputValue}`;
    axios
      .get(query)
      .then((response) => {
        const translatedText = JSON.parse(response.data).message.result
          .translatedText;
        console.log(translatedText);
        const translatedMessage = { content: translatedText, isMine: false };
        setMessages((prevMessages) => [...prevMessages, translatedMessage]);
      })
      .catch((error) => {
        console.log("실패", error);
      });
  };

  return (
    <Wrapper>
      <div className="chat-content">
        {messages.map((message, index) => (
          <div className="line" key={index}>
            <div className={`chat-box ${message.isMine ? "mine" : ""}`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <input
        className="chat-box"
        id="input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button id="send" onClick={sendMessage}>
        전송
      </button>
    </Wrapper>
  );
};

export default ChatApp;

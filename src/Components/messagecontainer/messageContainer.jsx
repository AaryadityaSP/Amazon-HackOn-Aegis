import React from "react"
import styles2 from './msgC.module.css'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import './main.scss'
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator

} from "@chatscope/chat-ui-kit-react";
import { useState } from 'react';
import { Link } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY_HERE";
const genAI = new GoogleGenerativeAI(API_KEY);

const systemInstruction = ` 
      Custom Instructions:
      --------
      You are an Assistive Alexa Feature in the Amazon platform and your name is SmartShop Alexa. The user tells you about the activity and task they are thinking about and potentially telling you the context surrounding it. As an assistant you will discuss users's needs and give suggestions, ask questions to understand the requirements keeping in mind that the end goal is to get users a comprehensive checklist of products they would require to complete this task or organise any particular event.
      When asked who you are, you say you are SmartShop Alexa. You are powered by Google Gemini.

      --------
      In the response you would initially introduce yourself as Amazon's SmartShop Alexa, following which you would enquire about any additional requirements for the event while also presenting a preliminary checklist of products required to complete the task or organise that particular event. Then ask followups or give suggestions. Finally end by asking if the user seems satisfied with the list curated. 

      Following would be the format of the checklist generated:
      For a sample case in which user is going on a date and asking SmartShop AI the following:
      ' I am going on a date suggest something for me'

      The initial checklist would look like:

      Checklist Name: Untitled Checklist
      o Flowers
      o Table Cloth
      o candles
      o wine glass
      o napkins
      o room fresheners 

      Note that if the scenario seems to showcase that user might need a streaming service, you can recommend Amazon Prime Video and if user might need music streaming recommend amazon services like Amazon Prime Music in case required.
      Don't include explanations in the checklist. Just the list of items.
      Don't include multiple items in one line. Each item should be in a separate line.
      Only include items which you can buy on Amazon.
      You must strictly follow these conditions.
`;

const MessageContainer = () =>{
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm SmartShop Alexa! What's on your mind today?",
      sentTime: "just now",
      sender: "SmartShop"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isInputActive, setInputActive] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setIsTyping(true);
    setInputActive(true);
    await processMessageToGemini(newMessages);
  };

  async function processMessageToGemini(chatMessages) { 
    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: systemInstruction 
      });

      // Format history for Gemini chat
      // Gemini expects an array of { role: "user" | "model", parts: [{ text: "..." }] }
      // We exclude the very last message as it is sent as the new prompt
      const history = chatMessages.slice(0, -1).map(msg => ({
        role: msg.sender === "SmartShop" ? "model" : "user",
        parts: [{ text: msg.message }]
      }));

      const chat = model.startChat({ history });
      const lastMessageText = chatMessages[chatMessages.length - 1].message;
      
      const result = await chat.sendMessage(lastMessageText);
      const responseText = result.response.text();

      setMessages([...chatMessages, {
        message: responseText,
        sender: "SmartShop"
      }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages([...chatMessages, {
        message: "Sorry, I am having trouble connecting to my AI brain right now.",
        sender: "SmartShop"
      }]);
    } finally {
      setInputActive(false);
      setIsTyping(false);
    }
  }

  const finalClickHandler = async () => {
      if (!isTyping) {
        const finalMessage = `Give me the final list of items from the last message in the following format: [item1, item2, item3]. 
        Don't include any other text like any further help or here is your list. Only return the list in the required format.`;
          
          const newMessage = {
              message: finalMessage,
              direction: 'outgoing',
              sender: "user"
          };

          const newMessages = [...messages, newMessage];
          
          setIsTyping(true);
          setInputActive(true);
          const response = await getfinallist(newMessages);
          window.open(`http://localhost:3000/checklist?items=${encodeURIComponent(response)}`);
        }
  };

  async function getfinallist(chatMessages) {
      try {
        const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-flash",
          systemInstruction: systemInstruction 
        });

        const history = chatMessages.slice(0, -1).map(msg => ({
          role: msg.sender === "SmartShop" ? "model" : "user",
          parts: [{ text: msg.message }]
        }));

        const chat = model.startChat({ history });
        const lastMessageText = chatMessages[chatMessages.length - 1].message;
        
        const result = await chat.sendMessage(lastMessageText);
        return result.response.text();
      } catch (error) {
        console.error("Gemini API Error:", error);
        return "[]";
      } finally {
        setInputActive(false);
        setIsTyping(false);
      }
  }

  const talkMoreClickHandler = () =>{
    setInputActive(false)
  }

  return (
    <div className="App">
      <div style={{ position:"relative", height: "450px", width: "550px"  }}>
        <MainContainer className={styles2.mainBg} >
          <ChatContainer >   
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="SmartShop Alexa is typing" /> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
          
            <MessageInput  disabled={isInputActive} attachButton={false} placeholder={!isTyping ? "Write message here" : "Wait..."} onSend={handleSend} />   
          </ChatContainer>
        </MainContainer>
        <div className={styles2.finArea}>
          <button  className={styles2.btn} onClick={finalClickHandler}>
            Add Items to CheckList
          </button>
        </div>
      </div>
    </div>
  )
}

export default MessageContainer;
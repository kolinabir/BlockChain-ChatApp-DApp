import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MessagePortal = () => {
  const location = useLocation();
  const F_name = location.state.name;
  const navigate = useNavigate();

  const F_address = location.state.F_address;
  const { account, stateContract, userName } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [messageUpdate, setMessageUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const messageContainerRef = useRef(null);

  useEffect(() => {
    async function fetchMessages() {
      const userExist = await stateContract?.checkUser(account);
      if (!userExist) {
        navigate("/LoginState");
      }
      if (!F_address) {
        navigate("/LoginState");
      }
      setIsLoading(true);
      try {
        const messages1 = await stateContract?.readMessage(F_address);
        const sortedMessages = messages1
          .slice()
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setMessages(sortedMessages);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMessages();
  }, [F_address, stateContract, messageUpdate]);

  useEffect(() => {
    // Scroll to the bottom of the message container
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    console.log(message);
    try {
      setIsLoading(true);
      const transaction = await stateContract?.sendMessage(F_address, message);
      await transaction.wait();
      alert("Message Sent");
      setMessageUpdate(!messageUpdate);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-96 px-32 py-4 relative">
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow">
          Loading...
        </div>
      )}
      <div
        ref={messageContainerRef}
        className="message-container"
        style={{ maxHeight: "300px", overflowY: "scroll" }}
      >
        {messages.map((message) => {
          const sender = message.sender.toUpperCase();
          const userAccount = account.toUpperCase();

          if (sender === userAccount) {
            return (
              <div key={message.msg} className="chat chat-end">
                <div className="chat-image avatar"></div>
                <div className="chat-header">
                  <h2 className="chat chat-end">{userName}</h2>
                  <h1> </h1>
                  <time className="text-xs opacity-50">
                    {new Date(
                      parseInt(message.timespamp._hex, 16) * 1000
                    ).toLocaleString()}
                  </time>
                </div>
                <div className="chat-bubble">{message.msg}</div>
              </div>
            );
          } else {
            return (
              <div key={message.msg} className="chat chat-start">
                <div className="chat-image avatar"></div>
                <div className="chat-header">
                  {F_name}
                  <h1> </h1>
                  <time className="text-xs opacity-50">
                    {new Date(
                      parseInt(message.timespamp._hex, 16) * 1000
                    ).toLocaleString()}
                  </time>
                </div>
                <div className="chat-bubble">{message.msg}</div>
              </div>
            );
          }
        })}
      </div>
      <form
        onSubmit={handleSendMessage}
        className="flex justify-end gap-5 mt-5"
      >
        <input
          name="message"
          type="text"
          placeholder="Type here"
          className="input input-bordered input-lg w-full max-w-xs"
        />
        <input
          disabled={isLoading}
          type="submit"
          value={"Send"}
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
        />
      </form>
    </div>
  );
};

export default MessagePortal;

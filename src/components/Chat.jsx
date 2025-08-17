import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { FaPaperPlane } from "react-icons/fa";

const socket = io.connect("http://localhost:5000");

const Chat = ({ username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        sender: username,
        message: currentMessage,
        time: new Date(Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      await socket.emit("send_message", messageData);
      setMessages((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((list) => [...list, data]);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div className="flex flex-col w-full max-w-md h-[600px] mx-auto shadow-xl rounded-2xl overflow-hidden border border-green-600">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 text-lg font-semibold flex justify-between items-center">
        <p>Live Chat</p>
        <span className="text-sm opacity-80">Room: {room}</span>
      </div>

      {/* Chat body */}
      <div className="flex-1 bg-green-50 p-4 overflow-y-auto space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === username ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-xl px-4 py-2 max-w-[70%] text-sm shadow-md ${
                msg.sender === username
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 border border-green-200 rounded-bl-none"
              }`}
            >
              <p>{msg.message}</p>
              <div className="text-xs mt-1 flex justify-between opacity-70">
                <span>{msg.time}</span>
                <span className="ml-2">{msg.sender}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center p-3 bg-white border-t border-green-200">
        <input
          type="text"
          placeholder="Type a message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 px-4 py-2 rounded-full border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={sendMessage}
          className="ml-3 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition duration-200"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>


</div>
  );
};

export default Chat;

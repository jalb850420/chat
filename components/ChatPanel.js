'use client';
import React, { useEffect, useRef, useState } from "react";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export const ChatPanel = ({ selectedChat }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedChat) {
      setMessageList(selectedChat.messages || []);
    }
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      text: inputMessage.trim(),
      sender: "me",
      date: Date.now(),
    };

    setInputMessage("");
    setMessageList((prev) => [...prev, newMessage]);

    await updateDoc(doc(db, "chats", selectedChat.id), {
      messages: arrayUnion(newMessage),
    });
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <div className="flex items-center gap-2">
          <img
            src={selectedChat.user.picture.thumbnail}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-semibold">
            {selectedChat.user.name.first}
          </span>
        </div>
        <button className="text-blue-600 hover:underline">Perfil</button>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-2">
        {messageList.length > 0 ? (
          messageList.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 ${
                message.sender === "me" ? "justify-end" : ""
              }`}
            >
              {message.sender !== "me" && (
                <div className="w-8 h-8 bg-gray-300 flex items-center justify-center rounded-full text-xs font-bold">
                  R
                </div>
              )}
              <div
                className={`p-3 rounded-2xl max-w-xs text-sm ${
                  message.sender === "me"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {message.text}
              </div>
              {message.sender === "me" && (
                <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full text-xs font-bold">
                  T
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay mensajes aún.</p>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input de mensaje */}
      <div className="flex items-center gap-2 border-t pt-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Escribe un mensaje..."
          className="flex-1 border border-gray-300 rounded px-4 py-2"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

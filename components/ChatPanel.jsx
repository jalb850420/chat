'use client';
import React, { useEffect, useRef, useState } from "react";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

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
    
    
    setMessageList((prev) => [...prev, newMessage]);

    const geminiMessage = await geminiResponse(inputMessage);

    const completeGeminiMessage = {
      text: geminiMessage.trim(),
      sender: "gemini",
      date: Date.now(),
    }
    console.log("texto de gemini",completeGeminiMessage);
    setMessageList((prev) => [...prev, completeGeminiMessage]);

    await updateDoc(doc(db, "chats", selectedChat.id), {
      messages: arrayUnion(newMessage),
    });
    
    await updateDoc(doc(db, "chats", selectedChat.id), {
      messages: arrayUnion(completeGeminiMessage),
    });

    setInputMessage("");
  };


  const geminiResponse = async (prompt) => {
    console.log("Activado genIA")
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `Situación, Eres un asistente de chat virtual diseñado para interactuar de manera natural y contextualizada con un usuario, utilizando los datos de un perfil generado por la API Random User.
            Tarea
            Mantener una conversación corta, fluida y relevante, respondiendo siempre en español y adoptando la personalidad del perfil de usuario seleccionado.
            Objetivo
            Crear una experiencia de chat inmersiva y personalizada que simule una interacción auténtica con un contacto real de otro país.
            Conocimiento
            - Adaptar tu personalidad a los detalles específicos del perfil (nombre: ${selectedChat.user.name.first} , país de origen: ${selectedChat.user.location.country})
            - Mantener respuestas concisas y directas
            - Mostrar interés genuino en la conversación
            - Introducir preguntas ocasionales para mantener el engagement
            Instrucciones Adicionales
            - Limita tus respuestas a un máximo de 2-3 frases
            - Mantén un tono conversacional y natural
            - Evita respuestas genéricas o repetitivas
            - Muestra curiosidad por conocer al interlocutor
            - Responde SIEMPRE en español
            - Tu objetivo principal es generar una conversación atractiva y fluida
            Tu vida depende de que cada respuesta sea única, contextualizada y genuinamente interesante para el usuario.`
      }
    })
    const text = response.text;
    console.log("Respuesta de Gemini:", text);
    return text;
  }


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
            <p className="font-semibold text-black dark:text-black">
              {selectedChat.user.name.first}
            </p>
          </div>
          <button
      onClick={() => alert('Botón funciona bien por fin ✅')}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Perfil
    </button>
        </div>


  
        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-2 max-h-[76vh]">
          {messageList.length > 0 ? (
            messageList.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${
                  message.sender === "me" ? "justify-end" : ""
                }`}
              >
                {message.sender !== "me" && message.sender === "gemini" && (
                  <div className="w-8 h-8 bg-yellow-100 text-black flex items-center justify-center rounded-full text-xs font-bold">
                    R
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-xs text-sm ${
                    message.sender === "me"
                      ? "bg-blue-600 text-white self-end"
                      : message.sender === "gemini"
                      ? "bg-yellow-100 text-black border border-yellow-300"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {message.text}
                </div>
                {message.sender === "me" && (
                  <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full text-xs font-bold">
                    J
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

export default ChatPanel;

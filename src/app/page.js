"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { text: "Welcome to the chat!", sender: "system" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { text: input, sender: "user" }]);
    setInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-100 p-4">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl flex flex-col h-[80vh] border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-red-600 to-rose-500 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-white font-semibold text-lg tracking-wide">Chat Room</span>
          </div>
          <span className="text-xs text-white/80">Online</span>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-white/60">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl shadow text-sm max-w-[75%] break-words font-medium ${
                  msg.sender === "user"
                    ? "bg-red-600 text-white rounded-br-md"
                    : "bg-gray-200 text-gray-800 rounded-bl-md"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Input Bar */}
        <form onSubmit={sendMessage} className="flex items-center gap-2 px-4 py-3 border-t border-gray-100 bg-white/80 rounded-b-2xl">
          <input
            className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50 text-gray-700"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            autoFocus
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-full font-semibold shadow"
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-7.5-15-7.5v6l10 1.5-10 1.5v6z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

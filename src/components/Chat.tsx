import React, { useState, useRef, useEffect } from "react";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({ html: false, linkify: true });

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I can guide you through my projects and skills. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.offsetHeight;

      if (currentScroll >= docHeight - 50) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("https://api.cmkt.dev/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      if (!response.body) throw new Error("No response stream");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          lastMsg.content += chunk;
          return newMessages;
        });
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isOpen
          ? "inset-0 p-4 flex flex-col items-center justify-center bg-black/5 sm:bg-transparent sm:inset-auto sm:bottom-6 sm:right-6 sm:p-0 sm:block"
          : `right-6 items-end ${isAtBottom ? "bottom-16" : "bottom-6"}`
      }`}
    >
      {isOpen && (
        <div className="w-full h-full sm:w-104 sm:h-152 lg:w-md lg:h-168 bg-zinc-50 border border-zinc-300 sm:rounded-2xl rounded-xl shadow-xl flex flex-col overflow-hidden">
          <div className="bg-zinc-100 p-4 border-b border-zinc-300 flex justify-between items-center shrink-0">
            <div>
              <h3 className="font-bold text-zinc-800">cmkt.ai</h3>
              <p className="text-xs text-zinc-500">
                AI can make mistakes. Please check important info.
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-500 hover:text-zinc-800 p-2"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-slate-300 text-slate-800 rounded-br-none"
                      : "bg-zinc-300/50 text-zinc-800 rounded-bl-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: md.render(msg.content) }}
                />
              </div>
            ))}
            {isLoading && (
              <div className="text-sm text-zinc-500 animate-pulse pl-2">
                typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-zinc-300 bg-zinc-50 shrink-0"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my projects..."
                className="flex-1 px-4 py-2 bg-zinc-50 border border-zinc-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-zinc-300"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-slate-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-700 disabled:opacity-50 transition-colors"
              >
                ↑
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-zinc-50 hover:bg-zinc-700 text-zinc-500 hover:text-zinc-50 w-14 h-14 rounded-full border border-zinc-300 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.25"
              d="m3 20l1.3-3.9C1.976 12.663 2.874 8.228 6.4 5.726c3.526-2.501 8.59-2.296 11.845.48c3.255 2.777 3.695 7.266 1.029 10.501S11.659 20.922 7.7 19z"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
}

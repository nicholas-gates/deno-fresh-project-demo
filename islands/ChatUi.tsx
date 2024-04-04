import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { WebSocketService } from "../utils/websocketUtil.ts";

interface Message {
  author: "user" | "system";
  content: string;
}

const ChatUI = () => {
  const [messages, setMessages] = useState<Message[]>([{
    author: "system",
    content: "Type in your favorite wine",
  }]);

  const [input, setInput] = useState("");
  // Correctly initializing the WebSocketService state with null and specifying the type it will hold
  const [wsService, setWsService] = useState<WebSocketService | null>(null);

  useEffect(() => {
    // Ensuring WebSocketService is instantiated correctly and setting the state
    const ws = new WebSocketService(
      "ws://localhost:8000/api/ai-chat",
      (message: string) => {
        setMessages((
          msgs,
        ) => [...msgs, { author: "system", content: message }]);
      },
    );
    setWsService(ws);

    // Make sure to clean up on component unmount
    return () => {
      ws.close();
    };
  }, []);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((msgs) => [...msgs, { author: "user", content: input }]);
    wsService?.sendMessage({ content: input });
    setInput("");
  };

  return (
    <div class="chat-container max-w-xl mx-auto my-4 p-4 border rounded-lg shadow-lg bg-white">
      <ul class="chat-messages list-none overflow-auto max-h-80 p-2">
        {messages.map((msg, index) => (
          <li key={index} class={`p-2 rounded-lg ${msg.author === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
            {msg.content}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit as any} class="chat-input-form mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e: any) => setInput(e.target.value)}
          placeholder="Type your message here..."
          class="chat-input flex-1 border p-2 rounded-l-lg"
        />
        <button type="submit" class="send-button bg-blue-500 text-white p-2 rounded-r-lg">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatUI;

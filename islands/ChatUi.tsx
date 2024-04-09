import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { WebSocketService } from "../utils/websocketUtil.ts";
import { AiModelResponse } from "../routes/api/types/AiModelResponse.ts";

interface Message {
  author: "user" | "system";
  type: "appetizerPairing" | "entreePairing" | "error";
  content: string;
}

interface Stage {
  current: "askWine" | "askEntreePairing" | "showEntreePairing";
  wine?: string;
  appetizerName?: string;
}

const ChatUI = () => {
  const [messages, setMessages] = useState<Message[]>([{
    author: "system",
    type: "appetizerPairing",
    content: "Type in your favorite wine and I'll recommend a good appetizer pairing! 🍷",
  }]);

  const [input, setInput] = useState("");
  const [wsService, setWsService] = useState<WebSocketService | null>(null);
  const [stage, setStage] = useState<Stage>({ current: "askWine" });

  useEffect(() => {
    const ws = new WebSocketService("ws://localhost:8000/api/ai-chat", (message: string) => {
      const response: AiModelResponse = JSON.parse(message);

      if (response.type === "appetizerPairing") {
        setMessages(msgs => [...msgs, {
          author: "system",
          type: response.type,
          content: `${response.name}: ${response.description}`,
        }]);
        setStage({ current: "askEntreePairing", wine: stage.wine, appetizerName: response.name });
      } else if (response.type === "entreePairing") {
        setMessages(msgs => [...msgs, {
          author: "system",
          type: response.type,
          content: `${response.name}: ${response.description}`,
        }]);
        // Assuming the conversation ends here, or set to another stage as needed
      }
    });

    setWsService(ws);

    return () => ws.close();
  }, [stage.wine]); // Depend on wine to re-instantiate WebSocketService only if wine changes

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!input.trim()) return;

    debugger;
    
    let newMessage: Message;
    switch (stage.current) {
      case "askWine":
        newMessage = {
          author: "user",
          type: "appetizerPairing",
          content: input,
        };
        setStage({ current: "askEntreePairing", wine: input });
        break;
      case "askEntreePairing":
        newMessage = {
          author: "user",
          type: "entreePairing",
          content: `Would you like a dinner pairing for ${input} and ${stage.appetizerName}?`,
        };
        // Here, you might want to adjust the logic based on how the user can respond to the dinner pairing question.
        break;
      default:
        newMessage = { author: "user", type: "appetizerPairing", content: input }; // Fallback, should not happen
    }

    console.log(`Current Stage: ${stage.current}`)

    setMessages(msgs => [...msgs, newMessage]);
    wsService?.sendMessage(newMessage);
    setInput("");
  };

  return (
    <div class="chat-container max-w-xl mx-auto my-4 p-4 border rounded-lg shadow-lg bg-white">
      <ul class="chat-messages list-none overflow-auto max-h-80 p-2">
        {messages.map((msg, index) => (
          <li
            key={index}
            class={`p-2 rounded-lg ${
              msg.author === "user" ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
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
        <button
          type="submit"
          class="send-button bg-blue-500 text-white p-2 rounded-r-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatUI;

import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { WebSocketService } from "../utils/websocketUtil.ts";
import { AiModelResponse } from "../routes/api/types/AiModelResponse.ts";

interface UiState {
  stage: "askWine" | "askAppetizerPairing" | "askEntreePairing";
  prompt: string;
  wine?: string;
  appetizer?: string;
  entree?: string;
}

interface UiMessage {
  author: "system" | "user";
  type: "askWine" | "askAppetizerPairing" | "askEntreePairing" | "error";
  content: string;
}

interface ApiRequest {
  type: "setWineGetAppetizer" | "setAppetizerGetEntree";
  prompt: string;
  promptResponse: string;
}

// interface ApiResponse {
//   description: string;
//   name: string;
//   type: "appetizerPairing" | "entreePairing" | "error";
// }

const ChatUI = () => {
  const [uiState, setUiState] = useState<UiState>({
    stage: "askWine",
    prompt:
      "Type in your favorite wine and I'll recommend a good appetizer pairing! 🍷",
  });

  const [userInput, setUserInput] = useState<string>("");
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [wsService, setWsService] = useState<WebSocketService | null>(null);

  useEffect(() => {
    const ws = new WebSocketService(
      "ws://localhost:8000/api/ai-chat",
      (apiResponse: string) => {
        const response: AiModelResponse = JSON.parse(apiResponse);

const updateUiAndMessages = (newState, systemMessageContent, messageType) => {
  setUiState(newState);
  setMessages(prevMessages => [
    ...prevMessages,
    createSystemMessage(systemMessageContent, messageType)
  ]);
};

const createSystemMessage = (content, type) => ({
  author: "system",
  type,
  content
});

// Use these functions in your response handling logic
if (response.type === "error") {
  const prompt = "Oops! I couldn't find a pairing for that. Type in another wine to start again.";
  updateUiAndMessages({
    stage: "askWine",
    prompt,
    wine: undefined,
    appetizer: undefined,
    entree: undefined,
  }, prompt, "askWine");
} else if (response.type === "appetizerPairing") {
  const prompt = `Your appetizer pairing is ${response.name}. Would you like to see an entree pairing?`;
  updateUiAndMessages({
    stage: "askEntreePairing",
    prompt,
    wine: uiState.wine,
    appetizer: response.name,
  }, prompt, "askAppetizerPairing");
} else if (response.type === "entree

      },
    );

    setWsService(ws);
  }, []);

  const handleUserMessage = (e: Event) => {
    e.preventDefault();

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        author: "user",
        type: uiState.stage as
          | "askWine"
          | "askAppetizerPairing"
          | "askEntreePairing",
        content: userInput,
      },
    ]);

    if (uiState.stage === "askWine") {
      wsService?.sendMessage(
        {
          type: "setWineGetAppetizer",
          prompt: uiState.prompt,
          promptResponse: userInput,
        } as ApiRequest,
      );

      setUiState((prevState) => ({ ...prevState, wine: userInput }));
    } else if (uiState.stage === "askAppetizerPairing") {
      wsService?.sendMessage(
        {
          type: "setAppetizerGetEntree",
          prompt: uiState.prompt,
          promptResponse: userInput,
        } as ApiRequest,
      );
    }
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

      <form
        onSubmit={handleUserMessage as any}
        class="chat-input-form mt-4 flex"
      >
        <input
          type="text"
          value={userInput}
          onChange={(e: any) => setUserInput(e.target.value)}
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

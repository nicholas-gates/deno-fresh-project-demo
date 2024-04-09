import { Handlers } from "$fresh/server.ts";
// import { getCapitalCity } from "./handlers/getCapitalCity.ts";
import { getAppetizerPairing } from "./handlers/getAppetizerPairing.ts";
import { getEntreePairing } from "./handlers/getEntreePairing.ts"; // Import the new handler
import { AiModelResponse } from "./types/AiModelResponse.ts";

interface IncomingWsMessage {
  author: "user" | "system";
  type: string;
  content: string;
}

let socket: WebSocket;
// let response: Response;

export const handler: Handlers = {
  GET: (req) => {
    if (req.headers.get("upgrade") === "websocket") {
      return handleWebSocket(req);
    } else {
      return new Response("Hello, this is a WebSocket server!");
    }
  },
};

const handleWebSocket = (request: Request): Promise<Response> => {
  const { socket: ws, response } = Deno.upgradeWebSocket(request);
  console.log("🔌 Upgrading to WebSocket connection");
  socket = ws;

  socket.onopen = () => console.log("WebSocket connection opened.");
  socket.onmessage = async (event) => {
    const messageData: IncomingWsMessage = JSON.parse(event.data);
    const wsResponse = await handleMessage(messageData);
    socket.send(JSON.stringify(wsResponse));
  };

  socket.onerror = (event) => console.error("WebSocket error:", event);
  socket.onclose = () => console.log("WebSocket connection closed.");

  return Promise.resolve(response);
};

const handleMessage = async ({ type, content }: IncomingWsMessage): Promise<AiModelResponse> => {
  console.log(`Handling message: ${type}, ${content}`);
  switch (type) {
    // case "countryName":
    //   return getCapitalCity(content);
    case "appetizerPairing":
      return await getAppetizerPairing(content);
    case "entreePairing":
      return await getEntreePairing(content, "cheese"); // Handle entree pairing messages
    default:
      return { name: "Error", description: "Invalid message type received", type: "error"};
  }
};

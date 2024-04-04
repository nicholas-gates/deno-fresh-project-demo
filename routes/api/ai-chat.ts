import { Handlers } from "$fresh/server.ts";

import { getCapitalCity } from "./handlers/getCapitalCity.ts";
import { getWinePairing } from "./handlers/getWinePairing.ts";

let socket: WebSocket;

let response: Response;

export const handler: Handlers = {
  GET: (req) => {
    // Check if the request is attempting to upgrade to WebSocket
    if (req.headers.get("upgrade") === "websocket") {
      return handleWebSocket(req);
    } else {
      // Handle normal HTTP requests here
      return new Response("Hello, this is a WebSocket server!");
    }
  },
};

interface Message {
  author: "user" | "system";
  type: string;
  content: string;
}

// Function to handle WebSocket connections
const handleWebSocket = (request: Request): Promise<Response> => {
  const obj = Deno.upgradeWebSocket(request);
  console.log("🔌 🔌 🔌 Upgrading to WebSocket connection");
  socket = obj.socket;
  response = obj.response;

  socket.onopen = () => console.log("WebSocket connection opened.");

  // on socket message, call the async function
  socket.onmessage = async (event) => {
    console.log("📥 📥 📥 Received message from client:", event.data);

    // Parse the JSON string from the client to access its properties
    const messageData: Message = JSON.parse(event.data);
    // countryName = messageData.countryName;

    // desctructure the typa and content from the messageData
    // const { type, content } = messageData;

    // Echo the received message back to the client
    const wsResponse = await handleMessage(messageData);
    socket.send(wsResponse);
  };

  socket.onerror = (event) => console.error("WebSocket error:", event);

  socket.onclose = () => console.log("WebSocket connection closed.");

  // Return the response to finalize the WebSocket upgrade
  return Promise.resolve(response);
};

// Define handleMessage as an async function
const handleMessage = async ({ type, content }: Message): Promise<string> => {
  console.log(`🔵 🔵 🔵 handleMessage ... ${type}, ${content}`);

  // switch on the type of message received
  switch (type) {
    case "countryName":
      return await getCapitalCity(content);
    case "winePairing":
      return await getWinePairing(content);
    default:
      return "Invalid message type received";
  }
};

import { Handlers } from "$fresh/server.ts";

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

// Define handleMessage as an async function
const handleMessage = (): Promise<string> => {
  return new Promise((resolve) => {
    // Set a timeout to resolve the promise after 1 second
    setTimeout(() => {
      resolve('Promise resolved');
    }, 1000);
  });
};

// Function to handle WebSocket connections
const handleWebSocket = (request: Request): Promise<Response> => {
  const obj = Deno.upgradeWebSocket(request);
  socket = obj.socket;
  response = obj.response;

  socket.onopen = () => console.log("WebSocket connection opened.");

  // on socket message, call the async function
  socket.onmessage = async (event) => {
    console.log("📥 📥 📥 Received message from client:", event.data);
    // Echo the received message back to the client
    const message = await handleMessage();
    socket.send(`🦄 🦄 🦄 Server received: ${event.data} and ${message}`);
  };

  socket.onerror = (event) => console.error("WebSocket error:", event);

  socket.onclose = () => console.log("WebSocket connection closed.");

  // Return the response to finalize the WebSocket upgrade
  return Promise.resolve(response);
};

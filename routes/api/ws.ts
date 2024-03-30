import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(req) {
    // Check if the request is attempting to upgrade to WebSocket
    if (req.headers.get("upgrade") === "websocket") {
      return handleWebSocket(req);
    } else {
      // Handle normal HTTP requests here
      return new Response("Hello, this is a WebSocket server!");
    }
  },
};

const handleMessage = (event: MessageEvent)  => {
  console.log("Received message from client:", event.data);
  // Echo the received message back to the client
    socket.send(`🦄 🦄 🦄 Server received: ${event.data}`);
}

let socket: WebSocket;
let response: Response;

// Function to handle WebSocket connections
function handleWebSocket(request: Request): Promise<Response> {
  // Upgrade the HTTP request to a WebSocket connection
  // { socket, response } = Deno.upgradeWebSocket(request);

  const obj = Deno.upgradeWebSocket(request);
  socket = obj.socket;
  response = obj.response;

  socket.onopen = () => console.log("WebSocket connection opened.");

  socket.onmessage = handleMessage;

  socket.onerror = (event) => console.error("WebSocket error:", event);

  socket.onclose = () => console.log("WebSocket connection closed.");

  // Return the response to finalize the WebSocket upgrade
  return response;
}

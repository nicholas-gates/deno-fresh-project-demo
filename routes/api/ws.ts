import { Handlers } from "$fresh/server.ts";

import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "https://esm.sh/@aws-sdk/client-bedrock-runtime";

import { load } from "https://deno.land/std@0.221.0/dotenv/mod.ts";

import { getCapitalCity } from "./handlers/getCapitalCity.ts";

const env = await load();
const accessKeyId = env["AWS_ACCESS_KEY"];
const secretAccessKey = env["AWS_SECRET_KEY"];

let socket: WebSocket;

let response: Response;
const config = {
  region: "us-east-1",
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
};

const client = new BedrockRuntimeClient(config);

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
    const messageData = JSON.parse(event.data);
    // countryName = messageData.countryName;

    // desctructure the typa and value from the messageData
    const { type, value } = messageData;

    // Echo the received message back to the client
    const wsResponse = await handleMessage(type, value);
    socket.send(wsResponse);
  };

  socket.onerror = (event) => console.error("WebSocket error:", event);

  socket.onclose = () => console.log("WebSocket connection closed.");

  // Return the response to finalize the WebSocket upgrade
  return Promise.resolve(response);
};

// Define handleMessage as an async function
const handleMessage = async (type: string, value: string): Promise<string> => {
  console.log("🔵 🔵 🔵 handleMessage ...");

  // switch on the type of message received
  switch (type) {
    case "countryName":
      return await getCapitalCity(value);
    default:
      return "Invalid message type received";
  }

};

interface AiResponse {
  generation: string;
}

// This function calls the BedrockRuntimeClient to invoke the model. It returns the response from the model which is a string.
export const invokeModel = async (
  prompt: string, /*input: string*/
): Promise<AiResponse> => {
  console.log("🔵 🔵 🔵 invokeModel ...");

  console.log(`prompt ==== 🏛️ 🏛️ 🏛️ -${prompt}-`);

  const body = JSON.stringify({
    prompt: prompt,
    max_gen_len: 512,
    temperature: 0.5,
    top_p: 0.9,
  });

  const input = {
    "modelId": "meta.llama2-70b-chat-v1",
    "contentType": "application/json",
    "accept": "application/json",
    "body": body,
  };

  const command = new InvokeModelCommand(input);
  const response = await client.send(command);
  const responseJson = JSON.parse(new TextDecoder().decode(response.body));

  return responseJson;
};



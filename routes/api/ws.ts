import { Handlers } from "$fresh/server.ts";

import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "https://esm.sh/@aws-sdk/client-bedrock-runtime";

import { load } from "https://deno.land/std@0.221.0/dotenv/mod.ts";

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

// Define handleMessage as an async function
const handleMessage = async (): Promise<string> => {
  // return new Promise((resolve) => {
  //   // Set a timeout to resolve the promise after 1 second
  //   setTimeout(() => {
  //     resolve("Promise resolved");
  //   }, 1000);
  // });
  return await invokeModel();
};

// This function calls the BedrockRuntimeClient to invoke the model. It returns the response from the model which is a string.
const invokeModel = async (/*input: string*/): Promise<string> => {
  // const command = new InvokeModelCommand({
  //   ModelName: "my-model",
  //   Input: input,
  // });

  // const response = await client.send(command);
  // return response.Output;
  let input = {
    "modelId": "meta.llama2-70b-chat-v1",
    "contentType": "application/json",
    "accept": "application/json",
    "body":
      '{"prompt":"What is the capital of Japan? Answer with just the city name. Don\'t add anything else or put it in a sentence.","max_gen_len":512,"temperature":0.5,"top_p":0.9}',
  };
  let command = new InvokeModelCommand(input);
  let response = await client.send(command);
  let responseJson = JSON.parse(new TextDecoder().decode(response.body));
  let capitalCity = responseJson.generation;

  // remove all whitespace and new lines
  capitalCity = capitalCity.replace(/\s/g, "");
  console.log(`🏛️ 🏛️ 🏛️ -${capitalCity}-`);
  return capitalCity;
};

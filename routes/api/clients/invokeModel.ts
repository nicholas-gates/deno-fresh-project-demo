import { InvokeModelCommand, BedrockRuntimeClient } from "https://esm.sh/@aws-sdk/client-bedrock-runtime@3.549.0";

import { load } from "https://deno.land/std@0.221.0/dotenv/mod.ts";

// import {
//   BedrockRuntimeClient,
// } from "https://esm.sh/@aws-sdk/client-bedrock-runtime";

import { AiModelResponse } from "../types/AiModelResponse.ts";

// export interface AiResponse {
//   generation: string;
// }

const env = await load();
const accessKeyId = env["AWS_ACCESS_KEY"];
const secretAccessKey = env["AWS_SECRET_KEY"];

const config = {
  region: "us-east-1",
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
};

const client = new BedrockRuntimeClient(config);

// This function calls the BedrockRuntimeClient to invoke the model. It returns the response from the model which is a string.

export const invokeModel = async (
  prompt: string,
): Promise<AiModelResponse> => {
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

  // const command = new InvokeModelCommand(input);
  // const response = await client.send(command);
  // const responseJson = JSON.parse(new TextDecoder().decode(response.body));
  // return JSON.parse(responseJson.generation);

  const mockResponseJson: AiModelResponse = {
    type: "appetizerPairing",
    name: "Crab and Avocado Timbale",
    description: "A delicate timbale of lump crab meat and avocado, surrounded by a zesty lemon butter sauce and garnished with fresh herbs. The richness of the crab and creaminess of the avocado are perfectly balanced by the bright, citrusy notes of the Sauvignon Blanc.",
  }

  return mockResponseJson;
//   return JSON.parse(mockResponseJson);
};

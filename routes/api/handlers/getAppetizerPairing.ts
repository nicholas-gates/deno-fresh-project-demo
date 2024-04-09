import { invokeModel } from "../clients/invokeModel.ts";
import { AiModelResponse } from "../types/AiModelResponse.ts";

export const getAppetizerPairing = async (wine: string): Promise<AiModelResponse> => {
  console.log("🍷 🍷 🍷 Wine: ", wine);

  const prompt =
    `For an intimate dinner party, what appetizer pairs well with this ${wine}? Answer with a single appetizer and a brief description of it's ingredients and flavors. Your response will be a JSON object with the keys "name" and "description". Do not include any content outside the JSON object. Example: {"name": "Kim Crawford Sauvignon Blanc", "description": "A deliciously crisp and refreshing wine with flavors of tropical fruit and citrus. Perfect for pairing with seafood and salads."}`;

  const response = await invokeModel(prompt);
  response.type = "appetizerPairing";
  console.log("🤖 🤖 🤖 invokeModel Response: ", response);

  return response;
};

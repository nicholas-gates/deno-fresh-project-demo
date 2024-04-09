import { invokeModel } from "../clients/invokeModel.ts";
import { AiModelResponse } from "../types/AiModelResponse.ts";

export const getEntreePairing = async (wine: string, appetizer: string): Promise<AiModelResponse> => {
  console.log("🧆 🧆 🧆 Entree Pairing: ", wine);

  const prompt =
    `For an intimate dinner party, recommend an entree that pairs well the selected wine, ${wine} and appetizer, ${appetizer}. Answer with a single entree and a brief description of it's ingredients and flavors.  Your response will be a JSON object with the keys "name" and "description". Do not include any content outside the JSON object. Example: {"name": "Shrimp cocktail", "description": "A classic appetizer made with fresh shrimp, cocktail sauce, and lemon. Perfect for pairing with a crisp white wine."}`;

  const response = await invokeModel(prompt);
  response.type = "entreePairing";

  console.log("🤖 🤖 🤖 invokeModel Response: ", response);

  return response;
};

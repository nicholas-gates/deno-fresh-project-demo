import { invokeModel } from "../clients/invokeModel.ts";

export const getWinePairing = async (wine: string): Promise<string> => {
  console.log("🍷 🍷 🍷 Wine: ", wine);

  const prompt =
    `For an intimate dinner party, what appetizer pairs well with this ${wine}? Answer with a single appetizer and a brief description of it's ingredients and flavors.`;

  const response = await invokeModel(prompt);
  console.log("🤖 🤖 🤖 invokeModel Response: ", response);

  let answer = response;

  // remove all whitespace from the beginning and the end of the string while preserving those between words.
  answer = answer.trim();
  // remove all new lines from the beginning and the end of the string while preserving those in between.
  answer = answer.replace(/^\s+|\s+$/g, "");

  console.log(`🧆 🧆 🧆 Wine pairing: -${answer}-`);
  return answer;
};

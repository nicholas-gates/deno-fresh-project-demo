import { invokeModel } from "../clients/invokeModel.ts";

export const getWinePairing = async (wine: string): Promise<string> => {
  console.log("🔵 🔵 🔵 Country Name: ", wine);

  const prompt =
    `What is the capital of ${wine} ? Answer with just the city name. Don\'t add anything else or put it in a sentence.`;

  const response = await invokeModel(prompt);

  let capitalCity = response.generation;

  // remove all whitespace and new lines
  capitalCity = capitalCity.replace(/\s/g, "");

  console.log(`AI capitalCity === 🏛️ 🏛️ 🏛️  -${capitalCity}-`);
  return `🦄 🦄 🦄 The capital of ${wine} is ${capitalCity}`;
};

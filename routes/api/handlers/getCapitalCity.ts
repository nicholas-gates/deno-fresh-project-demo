import { invokeModel } from "../clients/invokeModel.ts";

export const getCapitalCity = async (countryName: string): Promise<string> => {
  console.log("🔵 🔵 🔵 Country Name: ", countryName);

  const prompt =
    `What is the capital of ${countryName} ? Answer with just the city name. Don\'t add anything else or put it in a sentence.`;

  const response = await invokeModel(prompt);

  let capitalCity = response.generation;

  // remove all whitespace and new lines
  capitalCity = capitalCity.replace(/\s/g, "");

  console.log(`AI capitalCity === 🏛️ 🏛️ 🏛️  -${capitalCity}-`);
  return `🦄 🦄 🦄 The capital of ${countryName} is ${capitalCity}`;
};

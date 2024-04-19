import { Handlers } from "$fresh/server.ts";

import { ChatOpenAI } from "https://esm.sh/@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

export const handler: Handlers = {
  async GET(_req) {
    const apiresponse = await getJokeResponse();

    return new Response(JSON.stringify(apiresponse), {
      headers: { "Content-Type": "application/json" },
    });
  },
};

const getJokeResponse = async () => {
  const prompt = ChatPromptTemplate.fromMessages([
    ["human", "Tell me a short joke about {topic}"],
  ]);

  const model = getOpenAiModel();

  const outputParser = new StringOutputParser();

  const chain = prompt.pipe(model).pipe(outputParser);

  const response = await chain.invoke({
    topic: "hot dogs",
  });

  console.log(response);

  const apiresponse = {
    joke: response,
  };
  return apiresponse;
};

const getOpenAiModel = () => {
  return new ChatOpenAI({
    apiKey: Deno.env.get("OPENAI_API_KEY")!,
  });
}

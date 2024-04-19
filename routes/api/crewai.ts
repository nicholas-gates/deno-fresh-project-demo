import { Handlers } from "$fresh/server.ts";

import { ChatOpenAI, OpenAI } from "https://esm.sh/@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnableConfig,
  RunnableInterface,
} from "https://esm.sh/v135/@langchain/core@0.1.57/runnables.js";
import { ChatPromptValueInterface } from "https://esm.sh/v135/@langchain/core@0.1.57/dist/prompt_values.js";
import { AIMessageChunk } from "https://esm.sh/v135/@langchain/core@0.1.57/messages.js";

// const getOpenAiModel = (): ChatOpenAI => {
//   return new ChatOpenAI({
//     apiKey: Deno.env.get("OPENAI_API_KEY")!,
//   });
// }

type EnumModelNames = "OpenAi" | "OpenAiChat";

const getModel = (modelName: EnumModelNames): OpenAI | ChatOpenAI => {
  switch (modelName) {
    case "OpenAi":
      return new OpenAI({
        apiKey: Deno.env.get("OPENAI_API_KEY")!,
      });
    case "OpenAiChat":
      return new ChatOpenAI({
        apiKey: Deno.env.get("OPENAI_API_KEY")!,
      });
    default:
      return new ChatOpenAI({
        apiKey: Deno.env.get("OPENAI_API_KEY")!,
      });
  }
};

export const handler: Handlers = {
  async GET(_req) {
    // const apiresponse = await getJokeResponse();
    const apiresponse = await getInvokeLlmResponse();

    return new Response(JSON.stringify(apiresponse), {
      headers: { "Content-Type": "application/json" },
    });
  },
};

const getJokeResponse = async () => {
  const prompt = ChatPromptTemplate.fromMessages([
    ["human", "Tell me a short joke about {topic}"],
  ]);

  // const model = getOpenAiModel();
  const model = getModel("OpenAiChat");

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

const getInvokeLlmResponse = async () => {
  const model = getModel("OpenAi");

  const prompt = "What would be a good company name a company that makes colorful socks?"

  //Calls out to the model's (OpenAI's) endpoint passing the prompt. This call returns a string
  const response = await model.invoke(
    prompt,
  );

  return {
    prompt,
    response
  }
};

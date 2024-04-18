import { Handlers } from "$fresh/server.ts";

import { ChatOpenAI } from "https://esm.sh/@langchain/openai";
import { ChatPromptTemplate } from "https://esm.sh/@langchain/core/prompts";
import { StringOutputParser } from "https://esm.sh/@langchain/core/output_parsers";

export const handler: Handlers = {
  async GET(_req) {
    const prompt = ChatPromptTemplate.fromMessages([
      ["human", "Tell me a short joke about {topic}"],
    ]);
    const model = new ChatOpenAI({
      apiKey: Deno.env.get("OPENAI_API_KEY")!,
    });
    const outputParser = new StringOutputParser();

    const chain = prompt.pipe(model).pipe(outputParser);

    const response = await chain.invoke({
      topic: "ice cream",
    });
    console.log(response);

    const apiresponse = {
      joke: response,
    };

    return new Response(JSON.stringify(apiresponse), {
      headers: { "Content-Type": "application/json" },
    });

  },
};

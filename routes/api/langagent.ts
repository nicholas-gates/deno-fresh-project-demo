import { Handlers } from "$fresh/server.ts";

import { ChatOpenAI, OpenAI } from "@langchain/openai";
// import { initializeAgentExecutor } from "npm:langchain/agents";
import { AgentExecutor, createOpenAIToolsAgent } from "npm:langchain/agents";
import { pull } from "npm:langchain/hub";

import { SerpAPI } from "npm:@langchain/community/tools/serpapi";
import { Calculator } from "npm:@langchain/community/tools/calculator";

type EnumModelNames = "OpenAi" | "OpenAiChat";

export const handler: Handlers = {
  async GET(_req) {
    const apiresponse = await getAgentOutput();

    return new Response(JSON.stringify(apiresponse), {
      headers: { "Content-Type": "application/json" },
    });
  },
};

export const getAgentOutput = async () => {
  const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo-1106",
    temperature: 0,
  });

  //Create a list of the instatiated tools
  const tools = [new SerpAPI(), new Calculator()];

  const prompt = await pull<ChatPromptTemplate>("hwchase17/openai-tools-agent");

  const agent = await createOpenAIToolsAgent({
    llm,
    tools,
    prompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
  });

  // const input = "what is LangChain?";
  const input = "Who is Beyonce's husband?" +
    " What is his current age raised to the 0.23 power?";

  const result = await agentExecutor.invoke({
    input,
  });

  console.log(`Got output ${result}`);

  return result;
};

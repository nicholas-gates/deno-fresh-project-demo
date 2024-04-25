import { Handlers } from "$fresh/server.ts";

import { ChatOpenAI, OpenAI } from "@langchain/openai";
import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

import { LLMChain } from "npm:langchain/chains";

type EnumModelNames = "OpenAi" | "OpenAiChat";

export const handler: Handlers = {
  async GET(_req) {
    // const apiresponse = await getJokeResponse();
    // const apiresponse = await getInvokeLlmResponse();
    // const apiresponse = await getTemplateOutput();
    const apiresponse = await getChainOutput();

    return new Response(JSON.stringify(apiresponse), {
      headers: { "Content-Type": "application/json" },
    });
  },
};

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

/**
 * Demo for simple ask-response model
 * @returns
 */
const getInvokeLlmResponse = async () => {
  const model = getModel("OpenAi");

  const prompt =
    "What would be a good company name a company that makes colorful socks?";

  //Calls out to the model's (OpenAI's) endpoint passing the prompt. This call returns a string
  const response = await model.invoke(
    prompt,
  );

  return {
    prompt,
    response,
  };
};

const getTemplateOutput = async () => {
  //Create the template. The template is actually a "parameterized prompt". A "parameterized prompt" is a prompt in which the input parameter names are used and the parameter values are supplied from external input
  const template = "What is a good name for a company that makes {product}?";

  const mockUserInput = "colorful socks";
  //Instantiate "PromptTemplate" passing the prompt template string initialized above and a list of variable names the final prompt template will expect
  const prompt = new PromptTemplate({ template, inputVariables: ["product"] });

  //Create a new prompt from the combination of the template and input variables. Pass the value for the variable name that was sent in the "inputVariables" list passed to "PromptTemplate" initialization call
  const res = await prompt.format({ product: mockUserInput });
  console.log({ res });

  return {
    template,
    mockUserInput,
    res,
  };
};

export const getChainOutput = async () => {
  //Instantiante the OpenAI model
  //Pass the "temperature" parameter which controls the RANDOMNESS of the model's output. A lower temperature will result in more predictable output, while a higher temperature will result in more random output. The temperature parameter is set between 0 and 1, with 0 being the most predictable and 1 being the most random
  const model = getModel("OpenAiChat");

  //Create the template. The template is actually a "parameterized prompt". A "parameterized prompt" is a prompt in which the input parameter names are used and the parameter values are supplied from external input
  const template = "What is a good name for a company that makes {product}?";

  //Instantiate "PromptTemplate" passing the prompt template string initialized above and a list of variable names the final prompt template will expect
  const prompt = new PromptTemplate({ template, inputVariables: ["product"] });

  //Instantiate LLMChain, which consists of a PromptTemplate and an LLM. Pass the result from the PromptTemplate and the OpenAI LLM model
  const chain = new LLMChain({ llm: model, prompt });

  //Run the chain. Pass the value for the variable name that was sent in the "inputVariables" list passed to "PromptTemplate" initialization call
  const res = await chain.call({ product: "colorful socks" });
  console.log({ res });

  return {
    template,
    res,
  };
};

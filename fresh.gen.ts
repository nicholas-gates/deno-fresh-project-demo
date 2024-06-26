// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $about from "./routes/about.tsx";
import * as $ai_wine_chat from "./routes/ai-wine-chat.tsx";
import * as $api_ai_chat from "./routes/api/ai-chat.ts";
import * as $api_clients_invokeModel from "./routes/api/clients/invokeModel.ts";
import * as $api_handlers_getAppetizerPairing from "./routes/api/handlers/getAppetizerPairing.ts";
import * as $api_handlers_getCapitalCity from "./routes/api/handlers/getCapitalCity.ts";
import * as $api_handlers_getEntreePairing from "./routes/api/handlers/getEntreePairing.ts";
import * as $api_joke from "./routes/api/joke.ts";
import * as $api_random_uuid from "./routes/api/random-uuid.ts";
import * as $api_types_AiModelResponse from "./routes/api/types/AiModelResponse.ts";
import * as $api_ws from "./routes/api/ws.ts";
import * as $countdown from "./routes/countdown.tsx";
import * as $country from "./routes/country.tsx";
import * as $greet_name_ from "./routes/greet/[name].tsx";
import * as $index from "./routes/index.tsx";
import * as $search from "./routes/search.tsx";
import * as $ws_form from "./routes/ws-form.tsx";
import * as $ChatUi from "./islands/ChatUi.tsx";
import * as $Countdown from "./islands/Countdown.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $CountryForm from "./islands/CountryForm.tsx";
import * as $WebSocketForm from "./islands/WebSocketForm.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/about.tsx": $about,
    "./routes/ai-wine-chat.tsx": $ai_wine_chat,
    "./routes/api/ai-chat.ts": $api_ai_chat,
    "./routes/api/clients/invokeModel.ts": $api_clients_invokeModel,
    "./routes/api/handlers/getAppetizerPairing.ts":
      $api_handlers_getAppetizerPairing,
    "./routes/api/handlers/getCapitalCity.ts": $api_handlers_getCapitalCity,
    "./routes/api/handlers/getEntreePairing.ts": $api_handlers_getEntreePairing,
    "./routes/api/joke.ts": $api_joke,
    "./routes/api/random-uuid.ts": $api_random_uuid,
    "./routes/api/types/AiModelResponse.ts": $api_types_AiModelResponse,
    "./routes/api/ws.ts": $api_ws,
    "./routes/countdown.tsx": $countdown,
    "./routes/country.tsx": $country,
    "./routes/greet/[name].tsx": $greet_name_,
    "./routes/index.tsx": $index,
    "./routes/search.tsx": $search,
    "./routes/ws-form.tsx": $ws_form,
  },
  islands: {
    "./islands/ChatUi.tsx": $ChatUi,
    "./islands/Countdown.tsx": $Countdown,
    "./islands/Counter.tsx": $Counter,
    "./islands/CountryForm.tsx": $CountryForm,
    "./islands/WebSocketForm.tsx": $WebSocketForm,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;

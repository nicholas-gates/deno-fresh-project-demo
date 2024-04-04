// File: routes/city.tsx
// import { h } from "preact";
import ChatUi from "../islands/ChatUi.tsx";

export default function City() {
  return (
    <div className="p-4 m-4 flex flex-col items-center bg-[#86efac]">
      <h1 className="text-2xl font-bold mb-2">AI Wine Chat</h1>
      <ChatUi />
    </div>
  );
}

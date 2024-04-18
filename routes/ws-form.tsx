// routes/form.tsx

/** @jsxImportSource preact */
import WebSocketForm from "../islands/WebSocketForm.tsx";

export default function FormPage() {
  return (
    <div>
      <h1>WebSocket Interaction Page</h1>
      <WebSocketForm />
    </div>
  );
}

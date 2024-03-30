// islands/WebSocketForm.tsx

/** @jsxImportSource preact */
import { useState } from 'preact/hooks';

export default function WebSocketForm() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    // Establish a WebSocket connection
    const socket = new WebSocket('wss://deno-fresh-project-demo-086adyegr5ws.deno.dev/api/ws');

    socket.onopen = () => {
      // Send the message when the connection is open
      socket.send(message);
    };

    socket.onmessage = (event) => {
      // Display the server's response
      setResponse(event.data);
      socket.close();
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setResponse('Error connecting to WebSocket server.');
    };
  };

  return (
    <div>
      <h1>WebSocket Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          placeholder="Enter a message"
          required
        />
        <button type="submit">Send</button>
      </form>
      {response && <p>Response: {response}</p>}
    </div>
  );
}

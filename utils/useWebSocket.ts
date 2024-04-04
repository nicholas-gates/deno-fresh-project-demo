import { useEffect, useState } from "preact/hooks";

type WebSocketHookReturn = {
  ws: WebSocket | null;
  response: string;
  sendMessage: (message: any) => void;
};

const useWebSocket = (url: string): WebSocketHookReturn => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [response, setResponse] = useState("");

  useEffect(() => {
    const webSocket = new WebSocket(url);

    webSocket.onmessage = (event) => {
      console.log("Message from server ", event.data);
      setResponse(event.data);
    };

    webSocket.onopen = () => console.log("WebSocket connection established");
    webSocket.onclose = () => console.log("WebSocket connection closed");
    webSocket.onerror = (error) => console.error("WebSocket error: ", error);

    setWs(webSocket);

    return () => webSocket.close();
  }, [url]);

  const sendMessage = (message: any) => {
    if (ws instanceof WebSocket && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not open. Cannot send message.");
    }
  };

  return { ws, response, sendMessage };
};

export default useWebSocket;

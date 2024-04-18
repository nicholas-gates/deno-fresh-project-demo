// Define a type for the message handler function
type MessageHandler = (data: string) => void;

export class WebSocketService {
  private ws: WebSocket;

  constructor(url: string, onMessage: MessageHandler) {
    this.ws = new WebSocket(url);

    this.ws.onmessage = (event: MessageEvent) => {
      console.log("Message from server ", event.data);
      onMessage(event.data);
    };

    this.ws.onopen = () => console.log("WebSocket connection established");
    this.ws.onerror = (error: Event) => console.error("WebSocket error: ", error);
    this.ws.onclose = () => console.log("WebSocket connection closed");
  }

  sendMessage(message: object): void {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
      console.log(`Message sent: `, message);
    } else {
      console.error("WebSocket is not open. Cannot send message.");
    }
  }

  close(): void {
    this.ws.close();
  }
}

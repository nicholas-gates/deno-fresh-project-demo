import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

function CountryForm() {
  // Corrected the function name for setting country name
  const [countryName, setCountryName] = useState<string>("");

  const [response, setResponse] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const webSocket = new WebSocket("ws://localhost:8000/api/ws");

    webSocket.onmessage = (event) => {
      console.log("Message from server ", event.data);
      setResponse(event.data);
    };

    webSocket.onopen = () => console.log("WebSocket connection established");
    webSocket.onerror = (error) => console.error("WebSocket error: ", error);
    webSocket.onclose = () => console.log("WebSocket connection closed");

    setWs(webSocket);

    return () => webSocket.close();
  }, []);

  const handleSubmit = (event: h.JSX.TargetedEvent<HTMLFormElement, Event>) => {
    event.preventDefault();

    console.log("handleSubmit Country name: ", countryName);

    // Using the state directly instead of event.currentTarget
    if (ws instanceof WebSocket && ws.readyState === WebSocket.OPEN) {

      ws.send(JSON.stringify({
        type: "countryName",
        value: countryName
      }));

      console.log(`Form submitted with country name: ${countryName}`);
    } else {
      console.error("WebSocket is not open. Cannot send message.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col items-left">
        <input
          type="text"
          value={countryName}
          onChange={(e) => setCountryName(e.currentTarget.value)}
          placeholder="Enter a Country to get the Capital"
          className="p-2 m-2 border border-gray-300 rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
      {response && <div className="mt-4">{response}</div>}
    </div>
  );
}

export default CountryForm;

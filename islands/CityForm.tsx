// File: islands/CityForm.tsx
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

function CityForm() {
    const [cityName, setCityName] = useState("");
    const [response, setResponse] = useState("");
    const [ws, setWs] = useState(null);

    useEffect(() => {
        // Initialize WebSocket connection
        const webSocket = new WebSocket("ws://deno-fresh-project-demo-086adyegr5ws.deno.dev/api/ws");

        webSocket.onmessage = (event) => {
            // Handle messages received from the server
            console.log("Message from server ", event.data);
            setResponse(event.data);
        };

        webSocket.onopen = () => {
            console.log("WebSocket connection established");
        };

        webSocket.onerror = (error) => {
            console.error("WebSocket error: ", error);
        };
        
        webSocket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        setWs(webSocket);

        // Cleanup on component unmount
        return () => {
            webSocket.close();
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Check if WebSocket is connected before sending data
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ cityName }));
            console.log(`Form submitted with city name: ${cityName}`);
        } else {
            console.error("WebSocket is not open. Cannot send message.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={cityName}
                    onChange={(e) => setCityName(e.currentTarget.value)}
                    placeholder="Enter a Capital City of a Country"
                />
                <button type="submit">Submit</button>
            </form>
            {response && <div>Response from server: {response}</div>}
        </div>
    );
}

export default CityForm;
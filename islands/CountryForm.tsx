import { h } from "preact";
import { useState } from "preact/hooks";
import useWebSocket from "../utils/useWebSocket.ts";

function CountryForm() {
  const [countryName, setCountryName] = useState("");
  const { response, sendMessage } = useWebSocket("ws://localhost:8000/api/ws");

  const handleSubmit = (event: h.JSX.TargetedEvent<HTMLFormElement, Event>) => {
    event.preventDefault();

    console.log("handleSubmit Country name: ", countryName);

    sendMessage({
      type: "countryName",
      value: countryName,
    });

    console.log(`Form submitted with country name: ${countryName}`);
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
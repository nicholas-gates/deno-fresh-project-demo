// File: routes/city.tsx
// import { h } from "preact";
import CountryForm from "../islands/CountryForm.tsx";

export default function City() {
  return (
    <div className="p-4 m-4 flex flex-col items-center bg-[#86efac]">
      <h1 className="text-2xl font-bold mb-2">AI Country Name</h1>
      <CountryForm />
    </div>
  );
}

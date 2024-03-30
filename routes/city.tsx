// File: routes/city.tsx
import { h } from "preact";
import CityForm from "../islands/CityForm.tsx";

export default function City() {
  return (
    <div>
      <h1>Submit City Name</h1>
      <CityForm />
    </div>
  );
}
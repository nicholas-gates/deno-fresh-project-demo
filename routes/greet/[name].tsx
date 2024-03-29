import { PageProps } from "$fresh/server.ts";

export default function Greet(props: PageProps) {
  return (
    <div>
      <a href="/">🔗 Home</a>
      <br />
      Hello {props.params.name}
    </div>
  );
}

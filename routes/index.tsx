/**
 * This is the home page of my app. It's based on the Fresh template and uses Preact for rendering.
 * The runtime is Deno. Styling is Tailwind CSS.
 */
import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  const count = useSignal(3);
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>
        <Counter count={count} />
        <div class="my-4">
          <a href="/search">🔗 Search</a>
          <br />
          <a href="/countdown">🔗 Countdown</a>
          <br />
          <a href="/about">🔗 About</a>
          <br />
          <a href="/greet/Nicholas">🔗 Greet</a>
          <br />
          <a href="/ws-form">🔗 Web Socket</a>
          <br />
          <a href="/country">🔗 AI Country Form</a>
          <br />
          <a href="/ai-wine-chat">🔗 AI Wine Chat</a>
          <br />
        </div>
      </div>
    </div>
  );
}

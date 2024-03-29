export const handler: Handlers = {
  async GET(_req, ctx) {
    const resp = await ctx.render();
    resp.headers.set("X-Custom-Header", "Hello!");
    return resp;
  },
};

export default function AboutPage() {
  return (
    <div>
      <a href="/">🔗 Home</a>
      <br />
      <main>
        <h1>About</h1>
        <p>This is the about page.</p>
      </main>
    </div>
  );
}

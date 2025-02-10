import { serve } from "@hono/node-server";
import { log } from "console";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
const port = 8787;

const test = async () => {
  const url = "https://dog.ceo/api/breeds/image/random";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(test);
      throw new Error(`レスポンスステータス: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    //console.error(error.message);
  }
};

app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
  })
);

app.get("/test", (c) => {
  test();
  return c.json([{ ok: "Hello Honoaaa!" }]);
});

app.post("/test/post", async (c) => {
  const { id, password } = await c.req.parseBody();

  console.log({ id, password });

  return c.text("Hello, Hono!");
});

serve({
  fetch: app.fetch,
  port,
});

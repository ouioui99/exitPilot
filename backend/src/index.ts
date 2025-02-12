import { serve } from "@hono/node-server";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
const port = 8787;

// スキーマ定義
const schema = z
  .object({
    searchValue: z.string().min(1, "検索ワードを入力してください"),
  })
  .strict(); // .strict() で未定義のキーを禁止

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
  return c.json([{ ok: "Hello Honoaaa!" }]);
});

app.post(
  "/",
  zValidator("json", schema),

  async (c) => {
    const { searchValue } = c.req.valid("json");
    return c.json({
      station: { name: "Example Station" },
      exit: { number: "3" },
      distance: 0.5,
    });
    // const { searchValue } = await c.req.json();

    // console.log({ searchValue });
    // await new Promise((resolve) => setTimeout(resolve, 1500));

    // return c.json({
    //   station: { name: "Example Station" },
    //   exit: { number: "3" },
    //   distance: 0.5,
    // });

    // ... do something
    return c.json(
      {
        message: "Created!",
      },
      201
    );
  }
);

// **💡 バリデーションエラーハンドラー**
app.onError((err, c) => {
  if (err instanceof z.ZodError) {
    return c.json({ message: err.errors[0].message }, 400);
  }
  return c.json({ message: "Internal Server Error" }, 500);
});

serve({
  fetch: app.fetch,
  port,
});

import { serve } from "@hono/node-server";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { getGeocodeingResult } from "./api/nominatim.js";
import { searchNerestExitFromSupabase } from "./api/supabase.js";
import { findNearestExit } from "./util/calculate.js";
import { stationDataList } from "./data/station.js";

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

app.post(
  "/",
  zValidator("json", schema),

  async (c) => {
    let result;
    const { searchValue } = c.req.valid("json");
    const geocodeingResult = await getGeocodeingResult(searchValue);
    console.log(geocodeingResult);
    if (geocodeingResult && "lat" in geocodeingResult) {
      console.log("aaaa");
      result = findNearestExit(
        stationDataList,
        geocodeingResult.lat,
        geocodeingResult.lon
      );
      console.log(result);
    }

    return c.json(result);
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

import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const searchNerestExitFromSupabase = async (
  destLat: number,
  destLon: number
) => {
  const { data, error } = await supabase
    .from("station_exits")
    .select(
      `
        id,
        exit_name,
        stations!inner(name),
        ST_Distance(
          ST_MakePoint(${destLon}, ${destLat})::GEOGRAPHY,
          ST_MakePoint(longitude, latitude)::GEOGRAPHY
        ) AS distance
      `
    )
    .order("distance", { ascending: true })
    .limit(1)
    .single();

  if (error) {
    console.error("Supabase error:", error);
    throw new Error("Failed to fetch nearest exit");
  }

  return {
    station: { name: data.stations.name },
    exit: { number: data.exit_name },
    distance: data.distance,
  };
};

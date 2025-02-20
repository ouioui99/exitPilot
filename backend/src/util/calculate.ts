import type { Station, Exit } from "../types.js";

/**
 * 2点間の距離を計算する関数（Haversine公式）
 * @param lat1 地点1の緯度
 * @param lon1 地点1の経度
 * @param lat2 地点2の緯度
 * @param lon2 地点2の経度
 * @returns 距離（メートル）
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // 地球の半径（メートル）
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Hubenyの公式を使用して2点間の距離を計算する関数
 * @param lat1 地点1の緯度（度数法）
 * @param lon1 地点1の経度（度数法）
 * @param lat2 地点2の緯度（度数法）
 * @param lon2 地点2の経度（度数法）
 * @returns 距離（メートル）
 */
function calculateDistanceByHubeny(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  // 定数
  const a = 6378137.0; // 赤道半径（メートル）
  const b = 6356752.31414; // 極半径（メートル）
  const e2 = (a * a - b * b) / (a * a); // 第一離心率の二乗

  // 緯度経度をラジアンに変換
  const radLat1 = (lat1 * Math.PI) / 180;
  const radLat2 = (lat2 * Math.PI) / 180;
  const radLon1 = (lon1 * Math.PI) / 180;
  const radLon2 = (lon2 * Math.PI) / 180;

  // 緯度差と経度差
  const dLat = radLat2 - radLat1;
  const dLon = radLon2 - radLon1;

  // 平均緯度
  const avgLat = (radLat1 + radLat2) / 2;

  // 子午線曲率半径
  const W = Math.sqrt(1 - e2 * Math.sin(avgLat) ** 2);
  const M = (a * (1 - e2)) / (W * W * W); // 子午線曲率半径
  const N = a / W; // 卯酉線曲率半径

  // Hubenyの公式
  const x = dLat * M;
  const y = dLon * N * Math.cos(avgLat);
  const distance = Math.sqrt(x * x + y * y);

  return distance;
}

/**
 * 目的地に最も近い出口を検索する関数
 * @param stations 駅と出口の情報
 * @param destLat 目的地の緯度
 * @param destLon 目的地の経度
 * @returns 最も近い出口の情報（駅名、出口名、距離）
 */
export function findNearestExit(
  stations: Station[],
  destLat: number,
  destLon: number
) {
  let nearestExit: Exit | null = null;
  let nearestStation: Station | null = null;
  let minDistance = Infinity;

  for (const station of stations) {
    for (const exit of station.exits) {
      const distance = calculateDistanceByHubeny(
        destLat,
        destLon,
        exit.latitude,
        exit.longitude
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestExit = exit;
        nearestStation = station;
      }
    }
  }

  if (!nearestExit || !nearestStation) {
    throw new Error("No exits found");
  }

  return {
    station: { name: nearestStation.name },
    exit: { number: nearestExit.name },
    distance: minDistance,
  };
}

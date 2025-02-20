export type Station = {
  id: number; // 駅の一意識別子
  name: string; // 駅名
  prefecture: string; // 都道府県
  address: string; // 住所
  latitude: number; // 緯度
  longitude: number; // 経度
  exits: Exit[]; // 出口情報の配列
};

export type Exit = {
  id: number; // 出口の一意識別子
  name: string; // 出口名（例: "A1出口"）
  latitude: number; // 出口の緯度
  longitude: number; // 出口の経度
  //description?: string; // 補足説明（例: "エレベーターあり"）
};

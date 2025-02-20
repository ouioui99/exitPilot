import type { Station } from "../types.js";

export const stationDataList: Station[] = [
  {
    id: 1,
    name: "渋谷駅",
    prefecture: "東京都",
    address: "東京都渋谷区道玄坂1-1-1",
    latitude: 35.658034,
    longitude: 139.701636,
    exits: [
      {
        id: 1,
        name: "A1出口",
        latitude: 35.6581,
        longitude: 139.7017,
      },
      {
        id: 2,
        name: "B2出口",
        latitude: 35.6582,
        longitude: 139.7015,
      },
    ],
  },
  {
    id: 2,
    name: "新宿駅",
    prefecture: "東京都",
    address: "東京都新宿区新宿3-38-1",
    latitude: 35.689487,
    longitude: 139.700691,
    exits: [
      {
        id: 3,
        name: "東口",
        latitude: 35.6896,
        longitude: 139.7008,
      },
      {
        id: 4,
        name: "西口",
        latitude: 35.6893,
        longitude: 139.7005,
      },
    ],
  },
  {
    id: 1,
    name: "御成門駅",
    prefecture: "東京都",
    address: "東京都新宿区新宿3-38-1",
    latitude: 35.66078,
    longitude: 139.700691,
    exits: [
      {
        id: 1,
        name: "A1",
        latitude: 35.65935,
        longitude: 139.75048,
      },
      {
        id: 1,
        name: "A2",
        latitude: 35.65986,
        longitude: 139.75111,
      },
      {
        id: 1,
        name: "A3a",
        latitude: 35.66067,
        longitude: 139.75155,
      },
      {
        id: 1,
        name: "A4",
        latitude: 35.66124,
        longitude: 139.75175,
      },
      {
        id: 1,
        name: "A5",
        latitude: 35.66121,
        longitude: 139.75138,
      },
      {
        id: 1,
        name: "A6",
        latitude: 35.66073,
        longitude: 139.75113,
      },
    ],
  },
];

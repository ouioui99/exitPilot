import React from "react";
import { fetchResultDataType } from "../App";

export default function Result({
  searchResult,
}: {
  searchResult: fetchResultDataType;
}) {
  return (
    <div className="mt-6 bg-blue-50 dark:bg-gray-700 p-4 rounded-lg shadow-inner transition-all duration-300 ease-in-out">
      <h3 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-300">
        Closest Station
      </h3>
      <div className="space-y-2">
        <p className="flex items-center text-lg text-gray-800 dark:text-gray-200">
          <span className="mr-2 text-2xl">🚇</span>
          <span className="font-medium">{searchResult.station.name}</span>
        </p>
        <p className="flex items-center text-lg text-gray-800 dark:text-gray-200">
          <span className="mr-2 text-2xl">🚪</span>
          <span>Exit {searchResult.exit.number}</span>
        </p>
        <p className="flex items-center text-lg text-gray-800 dark:text-gray-200">
          <span className="mr-2 text-2xl">📏</span>
          <span>{searchResult.distance.toFixed(2)} km</span>
        </p>
      </div>
    </div>
  );
}

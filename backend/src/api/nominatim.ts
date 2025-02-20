export const getGeocodeingResult = async (
  searchValue: string
): Promise<{ lat: number; lon: number } | { message: string } | undefined> => {
  //yahoo
  //const url = `https://map.yahooapis.jp/geocode/V1/geoCoder?appid=dj00aiZpPW5aUGZBNk5SOTh6NSZzPWNvbnN1bWVyc2VjcmV0Jng9M2Y-&query=${searchValue}&output=json&category=landmark`;

  //Nominatim
  const url = `https://nominatim.openstreetmap.org/search?q=${searchValue}&format=json`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`レスポンスステータス: ${response.status}`);
    }
    const reuslts = await response.json();

    if (reuslts.length === 1) {
      return { lat: Number(reuslts[0].lat), lon: Number(reuslts[0].lon) };
    } else if (reuslts.length === 0) {
      return { message: "結果が見つかりませんでした" };
      console.log("0");
    } else {
      return { message: "結果が複数見つかりました" };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
};

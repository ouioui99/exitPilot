import { Suspense, use, useState } from "react";
import axios from "axios";
import SearchForm from "./components/SearchForm";
import Result from "./components/Result";

export type fetchResultDataType = {
  station: { name: string };
  exit: { number: string };
  distance: number;
};

const fetchResultData = async (
  searchValue: string
): Promise<fetchResultDataType | null> => {
  try {
    const response = await axios.post<fetchResultDataType>(
      "http://localhost:8787/",
      { searchValue },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error; // フロントエンド側で適切に処理
    }
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred.");
  }
};

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<fetchResultDataType | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 追加

  const searchNearestExit = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const result = await fetchResultData(inputValue);
      if (!result) {
        throw new Error("No results found. Please try again.");
      }
      setSearchResult(result);
      setInputValue("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data.error.issues[0].message ||
            "Failed to fetch data."
        );
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Find Nearest Station
          </h2>
          <SearchForm
            inputValue={inputValue}
            setInputValue={setInputValue}
            loading={loading}
            setLoading={setLoading}
            searchNearestExit={searchNearestExit}
            errorMessage={errorMessage} // 追加
          />
          {searchResult && <Result searchResult={searchResult} />}
        </div>
      </div>
    </div>
  );
}

export default App;
